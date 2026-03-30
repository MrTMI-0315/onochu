"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getActiveThemeSpotlight,
  getMemberName,
  themeSpotlights,
} from "@/lib/mock-data";
import {
  createEmptyRecommendationEngagementState,
  loadStoredRecommendationState,
  persistStoredRecommendationState,
  RECOMMENDATION_STORAGE_VERSION,
  resetStoredRecommendationState,
} from "@/lib/recommendation-drafts";
import { loadStoredProfileDraft } from "@/lib/profile-drafts";
import type {
  MemberProfile,
  MusicPlatform,
  RecommendationEngagementAction,
  RecommendationEngagementState,
  SongRecommendation,
} from "@/lib/types";

type RecommendationStudioProps = {
  allMembers: MemberProfile[];
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
};

export function RecommendationStudio({
  allMembers,
  currentMember,
  initialRecommendations,
}: RecommendationStudioProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "saved">("all");
  const [feedSearch, setFeedSearch] = useState("");
  const [mobileCategory, setMobileCategory] = useState<
    "all" | "jazz" | "electronic" | "rock" | "saved"
  >("all");
  const [localRecommendations, setLocalRecommendations] =
    useState<SongRecommendation[]>(initialRecommendations);
  const [latestDraft, setLatestDraft] = useState<SongRecommendation | null>(null);
  const [engagementByRecommendationId, setEngagementByRecommendationId] =
    useState<Record<string, RecommendationEngagementState>>({});
  const [viewerPlatform, setViewerPlatform] = useState<MusicPlatform>(
    currentMember.mainPlatform,
  );
  const [hasHydrated, setHasHydrated] = useState(false);
  const [storageMessage, setStorageMessage] = useState(
    "browser storage active",
  );
  const normalizedFeedSearch = feedSearch.trim().toLowerCase();

  useEffect(() => {
    const storedState = loadStoredRecommendationState(initialRecommendations);

    const hydrationFrame = window.requestAnimationFrame(() => {
      setLocalRecommendations(storedState.recommendations);
      setLatestDraft(storedState.latestDraft);
      setEngagementByRecommendationId(storedState.engagementByRecommendationId);
      setStorageMessage(storedState.storageMessage);
      setHasHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [initialRecommendations]);

  useEffect(() => {
    const storedProfile = loadStoredProfileDraft({
      nickname: currentMember.nickname,
      bio: currentMember.bio,
      favoriteGenres: currentMember.favoriteGenres,
      mainPlatform: currentMember.mainPlatform,
      playlistLinks: currentMember.playlistLinks.map((playlistLink) => playlistLink.url),
    });

    const hydrationFrame = window.requestAnimationFrame(() => {
      setViewerPlatform(storedProfile.draft.mainPlatform);
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [currentMember]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    persistStoredRecommendationState({
      recommendations: localRecommendations,
      latestDraft,
      engagementByRecommendationId,
    });
  }, [engagementByRecommendationId, hasHydrated, latestDraft, localRecommendations]);

  const contributorCounts = useMemo(() => {
    return localRecommendations.reduce<Record<string, number>>((counts, recommendation) => {
      counts[recommendation.memberId] = (counts[recommendation.memberId] ?? 0) + 1;
      return counts;
    }, {});
  }, [localRecommendations]);

  const topContributors = useMemo(() => {
    return Object.entries(contributorCounts)
      .sort((left, right) => right[1] - left[1])
      .slice(0, 3);
  }, [contributorCounts]);
  const memberById = useMemo(() => {
    return Object.fromEntries(
      allMembers.map((member) => [member.id, member]),
    ) as Record<string, MemberProfile>;
  }, [allMembers]);

  const moodHighlights = useMemo(() => {
    return Array.from(
      new Set(localRecommendations.flatMap((recommendation) => recommendation.moodTags)),
    ).slice(0, 8);
  }, [localRecommendations]);

  const activeTheme = getActiveThemeSpotlight() ?? themeSpotlights[0];
  const queuedThemes = themeSpotlights.filter(
    (themeSpotlight) => themeSpotlight.id !== activeTheme.id,
  );
  const savedRecommendationIds = useMemo(() => {
    return new Set(
      Object.entries(engagementByRecommendationId)
        .filter(([, engagement]) => engagement.save)
        .map(([recommendationId]) => recommendationId),
    );
  }, [engagementByRecommendationId]);
  const contributingMembers = useMemo(() => {
    return new Set(localRecommendations.map((recommendation) => recommendation.memberId))
      .size;
  }, [localRecommendations]);
  const topPick = localRecommendations[0];
  const filteredRecommendations = useMemo(() => {
    if (activeFilter === "saved") {
      return localRecommendations.filter((recommendation) =>
        savedRecommendationIds.has(recommendation.id),
      );
    }

    return localRecommendations;
  }, [activeFilter, localRecommendations, savedRecommendationIds]);
  const savedRecommendations = useMemo(() => {
    return localRecommendations.filter((recommendation) =>
      savedRecommendationIds.has(recommendation.id),
    );
  }, [localRecommendations, savedRecommendationIds]);
  const mobileFeedRecommendations = useMemo(() => {
    return localRecommendations.filter((recommendation) => {
      const member = memberById[recommendation.memberId];
      const haystack = [
        recommendation.trackTitle,
        recommendation.artistName,
        recommendation.comment,
        recommendation.memberNickname,
        member?.nickname,
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch =
        normalizedFeedSearch.length === 0 || haystack.includes(normalizedFeedSearch);

      if (!matchesSearch) {
        return false;
      }

      if (mobileCategory === "saved") {
        return savedRecommendationIds.has(recommendation.id);
      }

      if (mobileCategory === "all") {
        return true;
      }

      const genres = member?.favoriteGenres.map((genre) => genre.toLowerCase()) ?? [];

      if (mobileCategory === "jazz") {
        return genres.some(
          (genre) => genre.includes("jazz") || genre.includes("soul"),
        );
      }

      if (mobileCategory === "electronic") {
        return genres.some(
          (genre) =>
            genre.includes("electro") ||
            genre.includes("house") ||
            genre.includes("garage") ||
            genre.includes("ambient") ||
            genre.includes("hyper") ||
            genre.includes("bass"),
        );
      }

      return genres.some(
        (genre) =>
          genre.includes("rock") ||
          genre.includes("indie") ||
          genre.includes("post-punk") ||
          genre.includes("dream"),
      );
    });
  }, [
    localRecommendations,
    memberById,
    mobileCategory,
    normalizedFeedSearch,
    savedRecommendationIds,
  ]);
  const activeThemeRecommendations = useMemo(() => {
    return localRecommendations.filter(
      (recommendation) => recommendation.themeId === activeTheme.id,
    );
  }, [activeTheme.id, localRecommendations]);
  const activeThemeContributorCount = useMemo(() => {
    return new Set(
      activeThemeRecommendations.map((recommendation) => recommendation.memberId),
    ).size;
  }, [activeThemeRecommendations]);
  const featuredRecommendations = filteredRecommendations.slice(0, 4);
  const remainingRecommendations = filteredRecommendations.slice(4);

  function handleResetStorage() {
    resetStoredRecommendationState();
    setLocalRecommendations(initialRecommendations);
    setLatestDraft(null);
    setEngagementByRecommendationId({});
    setStorageMessage("storage cleared and reset to seeded feed");
  }

  function handleToggleEngagement(
    recommendationId: string,
    action: RecommendationEngagementAction,
  ) {
    setEngagementByRecommendationId((currentEngagementByRecommendationId) => {
      const currentEngagement =
        currentEngagementByRecommendationId[recommendationId] ??
        createEmptyRecommendationEngagementState();
      const nextIsActive = !currentEngagement[action];
      const nextEngagementByRecommendationId = {
        ...currentEngagementByRecommendationId,
        [recommendationId]: {
          ...currentEngagement,
          [action]: nextIsActive,
        },
      };
      const nextCountDelta = nextIsActive ? 1 : -1;

      setLocalRecommendations((currentRecommendations) =>
        currentRecommendations.map((recommendation) => {
          if (recommendation.id !== recommendationId) {
            return recommendation;
          }

          if (action === "save") {
            return {
              ...recommendation,
              saveCount: Math.max(0, recommendation.saveCount + nextCountDelta),
            };
          }

          return {
            ...recommendation,
            reactionCount: Math.max(
              0,
              recommendation.reactionCount + nextCountDelta,
            ),
          };
        }),
      );
      setStorageMessage("saved engagement to browser storage");

      return nextEngagementByRecommendationId;
    });
  }

  return (
    <>
      <main className="mobile-screen pb-24 pt-5 md:hidden">
        <div className="px-5">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[2rem] font-medium tracking-[-0.055em] text-[var(--accent-ink)]">
              Onochu
            </h1>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-[rgba(64,52,44,0.65)]"
              aria-label="More options"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <circle cx="12" cy="5.5" r="1.7" />
                <circle cx="12" cy="12" r="1.7" />
                <circle cx="12" cy="18.5" r="1.7" />
              </svg>
            </button>
          </div>

          <div className="relative mt-5">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgba(64,52,44,0.42)]"
              fill="none"
            >
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={feedSearch}
              onChange={(event) => setFeedSearch(event.target.value)}
              placeholder="Search recommendations"
              className="mobile-input w-full rounded-[0.12rem] px-12 py-4 text-[1rem] outline-none"
            />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[
              { id: "all", label: "All" },
              { id: "jazz", label: "Jazz" },
              { id: "electronic", label: "Electronic" },
              { id: "rock", label: "Rock" },
              { id: "saved", label: "Saved" },
            ].map((category) => {
              const isActive = mobileCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setMobileCategory(
                      category.id as "all" | "jazz" | "electronic" | "rock" | "saved",
                    )
                  }
                  className={`shrink-0 rounded-[0.12rem] px-5 py-3 text-[0.95rem] font-medium ${
                    isActive ? "mobile-chip-active" : "mobile-chip"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mobile-section-rule mt-5" />

        <div className="px-5 pt-7">
          <section className="relative overflow-hidden rounded-[0.08rem] border border-[var(--primary-strong)] bg-[rgba(255,250,246,0.74)] p-7">
            <div className="absolute right-0 top-0 h-28 w-28 bg-[rgba(183,106,85,0.08)] [clip-path:polygon(100%_0,0_0,100%_100%)]" />
            <span className="inline-flex rounded-[0.08rem] border border-[rgba(183,106,85,0.46)] px-4 py-2 text-[0.86rem] font-semibold tracking-[0.14em] text-[var(--primary-strong)]">
              THIS WEEK
            </span>
            <h2 className="mt-7 max-w-[12ch] text-[1.95rem] font-medium leading-[1.18] tracking-[-0.05em] text-[var(--primary-strong)]">
              {activeTheme.title}
            </h2>
            <p className="mt-5 max-w-[16rem] text-[0.98rem] leading-[1.65] text-[rgba(64,52,44,0.72)]">
              {activeTheme.description}
            </p>

            <div className="mobile-section-rule mt-6 flex items-center justify-between gap-4 pt-6">
              <p className="text-[1.02rem] text-[rgba(64,52,44,0.76)]">
                <span className="font-semibold text-[var(--primary-strong)]">
                  {activeThemeContributorCount}
                </span>{" "}
                participating
              </p>
              <Link
                href="/recommendations/new"
                className="rounded-[0.16rem] bg-[var(--primary-strong)] px-5 py-3 text-[1rem] font-semibold text-[var(--paper)]"
              >
                Join
              </Link>
            </div>
          </section>
        </div>

        <div className="px-5 pb-5 pt-10">
          <div className="flex items-center gap-4 text-[0.94rem] font-semibold uppercase tracking-[0.14em] text-[rgba(64,52,44,0.58)]">
            <div className="h-px flex-1 bg-[rgba(109,66,60,0.12)]" />
            <span>Recent</span>
            <div className="h-px flex-1 bg-[rgba(109,66,60,0.12)]" />
          </div>
        </div>

        <div className="space-y-4 px-5 pb-28">
          {mobileFeedRecommendations.length > 0 ? (
            mobileFeedRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                mobileSimple
                viewerPlatform={viewerPlatform}
                engagement={
                  engagementByRecommendationId[recommendation.id] ??
                  createEmptyRecommendationEngagementState()
                }
                onToggleEngagement={handleToggleEngagement}
              />
            ))
          ) : (
            <div className="mobile-card rounded-[0.2rem] p-6 text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
              지금 선택한 필터와 검색에 맞는 추천이 없습니다.
            </div>
          )}
        </div>
      </main>

      <div className="hidden md:block">
        <main className="min-h-screen px-4 pb-28 pt-24 text-stone-100 md:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="onochu-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-[color:rgba(213,140,116,0.14)] blur-[100px]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-sm bg-[var(--primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-black">
                  {activeTheme.phaseLabel ?? "Current Theme"}
                </span>
                {activeTheme.relatedEvent ? (
                  <span className="rounded-sm border border-white/12 bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/72">
                    {activeTheme.relatedEvent}
                  </span>
                ) : null}
              </div>
              <div>
                <span className="onochu-eyebrow">Recommendation Feed</span>
                <h1 className="onochu-display mt-4 max-w-3xl text-4xl font-semibold uppercase leading-[0.95] text-white md:text-6xl">
                  Hear the song, meet the person, keep the context.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  곡과 추천 이유를 먼저 읽고, 반응한 뒤, 추천인 프로필로
                  자연스럽게 이어지는 흐름에만 집중하도록 피드 구조를
                  압축했습니다.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeTheme.activationWindow ? (
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">
                    {activeTheme.activationWindow}
                  </span>
                ) : null}
                {activeTheme.participantSummary ? (
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">
                    {activeTheme.participantSummary}
                  </span>
                ) : null}
              </div>

              {activeTheme.curatorNote ? (
                <div className="max-w-2xl rounded-[1.25rem] border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/68">
                  {activeTheme.curatorNote}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/recommendations/new"
                  className="rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
                >
                  Add your pick
                </Link>
                <a
                  href="#feed-start"
                  className="rounded-full border border-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70"
                >
                  Jump to feed
                </a>
              </div>
            </div>

            <aside className="grid gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.25rem] bg-white/5 p-4">
                  <p className="text-3xl font-bold text-white">
                    {localRecommendations.length}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Total recs
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/5 p-4">
                  <p className="text-3xl font-bold text-white">
                    {contributingMembers}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Contributors
                  </p>
                </div>
              </div>
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Feed rule
                </p>
                <p className="mt-2 text-sm leading-7 text-white/68">
                  browse-first 구조를 유지하고 작성은 독립 route에서 처리합니다.
                  local draft와 engagement는 같은 browser storage를 공유합니다.
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                  v{RECOMMENDATION_STORAGE_VERSION} / {storageMessage}
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Current campaign
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {activeTheme.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-white/62">
                  {activeTheme.relatedEvent ?? activeTheme.participantSummary}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                  {activeThemeRecommendations.length} theme-linked recs /{" "}
                  {activeThemeContributorCount} contributors
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetStorage}
                className="rounded-full border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[color:rgba(213,140,116,0.3)] hover:text-white"
              >
                Reset local feed
              </button>
            </aside>
          </div>
        </section>

        {latestDraft ? (
          <section className="onochu-panel rounded-[2rem] p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                  Latest local draft
                </p>
                <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                  Ready At The Top Of The Feed
                </h2>
              </div>
              <Link
                href="/recommendations/new"
                className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[color:rgba(213,140,116,0.3)] hover:text-white"
              >
                Open create route
              </Link>
            </div>
            <RecommendationCard
              recommendation={latestDraft}
              linkToMember={false}
              viewerPlatform={viewerPlatform}
            />
          </section>
        ) : null}

        <section className="onochu-panel rounded-[2rem] p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                Saved shelf
              </p>
              <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                Your revisit queue
              </h2>
            </div>
            {savedRecommendations.length > 0 ? (
              <button
                type="button"
                onClick={() => setActiveFilter("saved")}
                className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[color:rgba(213,140,116,0.3)] hover:text-white"
              >
                View saved only
              </button>
            ) : null}
          </div>

          {savedRecommendations.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {savedRecommendations.slice(0, 2).map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  compact
                  viewerPlatform={viewerPlatform}
                  engagement={
                    engagementByRecommendationId[recommendation.id] ??
                    createEmptyRecommendationEngagementState()
                  }
                  linkToMember
                  onToggleEngagement={handleToggleEngagement}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/3 p-6 text-sm leading-7 text-white/55">
              아직 저장한 곡이 없습니다. 먼저 feed에서 Save를 눌러 두면 나중에
              다시 듣고 싶은 트랙을 여기서 바로 꺼낼 수 있습니다.
            </div>
          )}
        </section>

        <section id="feed-start" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="onochu-eyebrow">Start here</span>
              <h2 className="onochu-display mt-2 text-3xl font-bold uppercase text-white md:text-4xl">
                {activeFilter === "saved"
                  ? "What you saved for later."
                  : "What the club is listening to now."}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62">
                {activeFilter === "saved"
                  ? "save한 곡만 다시 꺼내 보면서 링크보다 맥락과 추천인을 먼저 이어 볼 수 있습니다."
                  : "첫 카드부터 곡, 이유, 추천인 흐름이 바로 보이도록 최근 추천을 위로 올렸습니다."}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                  activeFilter === "all"
                    ? "bg-[var(--primary)] text-black"
                    : "border border-white/10 text-white/55"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("saved")}
                className={`rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                  activeFilter === "saved"
                    ? "bg-[var(--primary)] text-black"
                    : "border border-white/10 text-white/55"
                }`}
              >
                Saved by you {savedRecommendationIds.size > 0 ? savedRecommendationIds.size : ""}
              </button>
            </div>
          </div>

          {featuredRecommendations.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {featuredRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  viewerPlatform={viewerPlatform}
                  engagement={
                    engagementByRecommendationId[recommendation.id] ??
                    createEmptyRecommendationEngagementState()
                  }
                  linkToMember
                  onToggleEngagement={handleToggleEngagement}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/3 p-6 text-sm leading-7 text-white/55">
              아직 save한 곡이 없습니다. feed 카드에서 `Save`를 누르면 여기서
              다시 꺼내 볼 수 있습니다.
            </div>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="onochu-panel rounded-[1.75rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                  Feed context
                </p>
                <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                  Top pick and queue
                </h2>
              </div>
              <Link
                href="/recommendations/new"
                className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45"
              >
                Create route
              </Link>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/4 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                Top editorial pick
              </p>
              <h3 className="onochu-display mt-3 text-3xl font-bold uppercase text-white">
                {topPick.trackTitle}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-white/40">
                {topPick.artistName}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/68">
                &ldquo;{topPick.comment}&rdquo;
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {queuedThemes.map((themeSpotlight) => (
                <article
                  key={themeSpotlight.id}
                  className="rounded-[1.25rem] border border-white/8 bg-black/20 p-4"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                    {themeSpotlight.phaseLabel ?? "Queued"}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {themeSpotlight.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/42">
                    {themeSpotlight.relatedEvent ?? "Weekly curation"}
                  </p>
                </article>
              ))}
            </div>
          </article>

          <div className="grid gap-4">
            <article className="onochu-panel rounded-[1.75rem] p-5">
              <h2 className="onochu-display text-2xl font-bold uppercase text-white">
                Top contributors
              </h2>
              <div className="mt-4 grid gap-3">
                {topContributors.map(([memberId, count]) => (
                  <div
                    key={memberId}
                    className="rounded-[1.25rem] bg-white/4 p-4"
                  >
                    <p className="text-sm font-semibold text-white">
                      {getMemberName(memberId)}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                      {count} recs in the feed
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="onochu-panel rounded-[1.75rem] p-5">
              <h2 className="onochu-display text-2xl font-bold uppercase text-white">
                Mood highlights
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {moodHighlights.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-white/8 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[1.75rem] border border-[color:rgba(213,140,116,0.16)] bg-[color:rgba(213,140,116,0.08)] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                Contribute next
              </p>
              <h2 className="onochu-display mt-3 text-2xl font-bold uppercase text-white">
                Use the dedicated create route.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/68">
                feed에서는 지금 흐르는 추천을 읽는 데 집중하고, 작성은 별도
                화면에서 빠르게 끝내도록 분리했습니다. 현재 작성자는{" "}
                {currentMember.nickname}으로 가정합니다.
              </p>
              <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-black/20 p-4 text-sm leading-7 text-white/68">
                현재 테마 <span className="font-semibold text-white">{activeTheme.title}</span>
                에는 {activeThemeRecommendations.length}개의 연결된 추천과{" "}
                {activeThemeContributorCount}명의 참여자가 있습니다.
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/recommendations/new"
                  className="rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
                >
                  Open create route
                </Link>
                <span className="rounded-full border border-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
                  {allMembers.length} member profiles seeded
                </span>
              </div>
            </article>
          </div>
        </section>

        {remainingRecommendations.length > 0 ? (
          <section className="space-y-5">
            <div>
              <span className="onochu-eyebrow">Archive continues</span>
              <h2 className="onochu-display mt-2 text-3xl font-bold uppercase text-white">
                Keep digging.
              </h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {remainingRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  viewerPlatform={viewerPlatform}
                  engagement={
                    engagementByRecommendationId[recommendation.id] ??
                    createEmptyRecommendationEngagementState()
                  }
                  linkToMember
                  onToggleEngagement={handleToggleEngagement}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
        </main>
      </div>
    </>
  );
}
