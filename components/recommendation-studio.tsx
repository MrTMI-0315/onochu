"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getActiveThemeSpotlight,
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

function MobileRecommendationSectionLabel({
  number,
  label,
  dark = false,
}: {
  number: string;
  label: string;
  dark?: boolean;
}) {
  const lineClass = dark
    ? "bg-[rgba(235,230,216,0.58)]"
    : "bg-[var(--primary-strong)]";
  const textClass = dark
    ? "text-[rgba(235,230,216,0.78)]"
    : "text-[var(--primary-strong)]";

  return (
    <div
      className={`flex items-center gap-3 font-mono text-[0.76rem] uppercase tracking-[0.16em] ${textClass}`}
    >
      <span>{number}</span>
      <span className={`h-px w-10 ${lineClass}`} />
      <span>{label}</span>
    </div>
  );
}

export function RecommendationStudio({
  allMembers,
  currentMember,
  initialRecommendations,
}: RecommendationStudioProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "saved">("all");
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

  const activeTheme = getActiveThemeSpotlight() ?? themeSpotlights[0];
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
  const savedRecommendations = useMemo(() => {
    return localRecommendations.filter((recommendation) =>
      savedRecommendationIds.has(recommendation.id),
    );
  }, [localRecommendations, savedRecommendationIds]);
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
  const mobileFeedRecommendations = activeFilter === "saved"
    ? savedRecommendations
    : localRecommendations;

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
      <main className="mobile-screen bg-[var(--paper)] pb-16 md:hidden">
        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-6">
          <div className="flex items-start justify-between gap-4">
            <span className="bg-[var(--accent-ink)] px-3 py-2 font-mono text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--paper)]">
              ONOCHU
            </span>
            <p className="text-right font-mono text-[0.76rem] uppercase leading-[1.25] tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
              ESTABLISHED 2024
              <br />
              SEOUL / BARCELONA
            </p>
          </div>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-12">
          <h1 className="max-w-[8ch] text-[3.25rem] font-bold leading-[0.94] tracking-[-0.08em] text-[var(--accent-ink)]">
            추천은 여기서 흐릅니다
          </h1>
          <p className="mt-6 max-w-[17rem] text-[1.04rem] leading-[1.7] text-[rgba(64,52,44,0.56)]">
            단톡방에 묻힌 추천을 다시 꺼내고, 곡과 사람을 함께 발견하세요
          </p>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] bg-[var(--accent-ink)] px-5 py-9 text-[var(--paper)]">
          <MobileRecommendationSectionLabel
            number="01"
            label="Weekly Theme"
            dark
          />
          <h2 className="mt-8 max-w-[10ch] text-[2.55rem] font-bold leading-[1] tracking-[-0.07em]">
            이번 주 오노추
          </h2>
          <p className="mt-5 max-w-[18rem] text-[1.02rem] leading-[1.78] text-[rgba(235,230,216,0.76)]">
            좋은 추천은 혼자 듣고 끝나지 않습니다
            <br />
            이번 테마에 맞는 곡을 남기고, 다른 멤버의 취향을 같이 들어보세요
          </p>
          <div className="mt-8">
            <Link
              href="/recommendations/new"
              className="flex min-h-[4rem] items-center justify-between border border-[var(--paper)] bg-[var(--paper)] px-5 py-4 text-[1rem] font-semibold text-[var(--accent-ink)]"
            >
              <span>이번 테마 참여하기</span>
              <span className="font-mono text-[1.05rem]">→</span>
            </Link>
          </div>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-9">
          <MobileRecommendationSectionLabel number="02" label="Share" />
          <h2 className="mt-8 max-w-[8ch] text-[2.45rem] font-bold leading-[1] tracking-[-0.07em] text-[var(--accent-ink)]">
            지금 듣고 있는 곡을 남겨보세요
          </h2>
          <p className="mt-5 max-w-[15rem] text-[1.02rem] leading-[1.75] text-[rgba(64,52,44,0.62)]">
            추천은 길게 설명하지 않아도 됩니다
            <br />
            한 곡과 한 줄이면 충분합니다
          </p>
          <div className="mt-8">
            <Link
              href="/recommendations/new"
              className="flex min-h-[4rem] items-center justify-between border border-[rgba(64,52,44,0.7)] border-b-[3px] border-b-[rgba(64,52,44,0.9)] bg-transparent px-5 py-4 text-[1rem] font-semibold text-[var(--accent-ink)]"
            >
              <span>추천 남기기</span>
              <span className="font-mono text-[1.05rem]">→</span>
            </Link>
          </div>
        </section>

        <div className="grid grid-cols-2 border-b border-[rgba(64,52,44,0.28)]">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`min-h-[3.85rem] border-r border-[rgba(64,52,44,0.28)] px-4 text-[1rem] font-semibold ${
              activeFilter === "all"
                ? "bg-[rgba(64,52,44,0.04)] text-[var(--accent-ink)]"
                : "text-[rgba(64,52,44,0.48)]"
            }`}
          >
            추천 피드
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("saved")}
            className={`min-h-[3.85rem] px-4 text-[1rem] font-semibold ${
              activeFilter === "saved"
                ? "bg-[rgba(64,52,44,0.04)] text-[var(--accent-ink)]"
                : "text-[rgba(64,52,44,0.48)]"
            }`}
          >
            저장한 추천
          </button>
        </div>

        <section className="pb-8">
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
            <div className="border-b border-[rgba(64,52,44,0.18)] px-5 py-12">
              <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-6 py-8 text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
                아직 저장한 추천이 없습니다. 피드에서 저장해 두면 이 섹션에서 다시 꺼내 볼 수 있습니다.
              </div>
            </div>
          )}
        </section>

        <section className="border-y border-[rgba(64,52,44,0.28)] px-5 py-9">
          <MobileRecommendationSectionLabel
            number="03"
            label="Cross-platform"
          />
          <h2 className="mt-8 max-w-[11ch] text-[2.15rem] font-bold leading-[1.08] tracking-[-0.07em] text-[var(--accent-ink)]">
            플랫폼이 달라도 괜찮습니다
          </h2>
          <p className="mt-5 max-w-[16rem] text-[1.02rem] leading-[1.75] text-[rgba(64,52,44,0.62)]">
            곡명과 아티스트로 바로 찾아 듣을 수 있습니다
          </p>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-9">
          <MobileRecommendationSectionLabel number="04" label="Archive" />
          <h2 className="mt-8 max-w-[8ch] text-[2.4rem] font-bold leading-[1.02] tracking-[-0.07em] text-[var(--accent-ink)]">
            좋은 추천은 사라지지 않습니다
          </h2>
          <p className="mt-5 max-w-[15rem] text-[1.02rem] leading-[1.75] text-[rgba(64,52,44,0.62)]">
            Onochu에서는 취향이 계속 이어집니다
          </p>
        </section>

        <div
          aria-hidden="true"
          className="fixed inset-x-0 bottom-0 z-20 h-1.5 bg-[var(--primary-strong)] md:hidden"
        />
      </main>

      <div className="hidden md:block">
        <main className="min-h-screen bg-[var(--paper)] text-[var(--accent-ink)]">
          <div className="mx-auto max-w-5xl border-x border-[rgba(64,52,44,0.28)] bg-[#EBE6D8]">
            <section className="border-b border-[rgba(64,52,44,0.28)] px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <span className="bg-[var(--accent-ink)] px-3 py-2 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--paper)]">
                  ONOCHU
                </span>
                <div className="text-right">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
                    RECOMMENDATIONS
                  </p>
                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
                    SEOUL / BARCELONA
                  </p>
                </div>
              </div>
            </section>

            <section className="grid border-y border-[rgba(64,52,44,0.28)] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-r border-[rgba(64,52,44,0.28)] px-8 py-14">
                <h1 className="max-w-[7ch] text-[4.75rem] font-bold leading-[0.92] tracking-[-0.09em] text-[var(--accent-ink)]">
                  추천은 여기서 흐릅니다
                </h1>
                <p className="mt-6 max-w-[24rem] text-[1.1rem] leading-[1.8] text-[rgba(64,52,44,0.58)]">
                  단톡방에 묻힌 추천을 다시 꺼내고, 곡과 사람을 함께 발견하세요
                </p>
              </div>
              <div className="bg-[var(--accent-ink)] px-8 py-14 text-[var(--paper)]">
                <MobileRecommendationSectionLabel
                  number="01"
                  label="Weekly Theme"
                  dark
                />
                <h2 className="mt-8 max-w-[9ch] text-[3.1rem] font-bold leading-[0.98] tracking-[-0.08em]">
                  이번 주 오노추
                </h2>
                <p className="mt-5 max-w-[24rem] text-[1.02rem] leading-[1.85] text-[rgba(235,230,216,0.76)]">
                  좋은 추천은 혼자 듣고 끝나지 않습니다. 이번 테마에 맞는 곡을 남기고, 다른 멤버의 취향을 같이 들어보세요.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    href="/recommendations/new"
                    className="flex min-h-[3.8rem] min-w-[15rem] items-center justify-between border border-[var(--paper)] bg-[var(--paper)] px-5 py-4 text-[1rem] font-semibold text-[var(--accent-ink)]"
                  >
                    <span>이번 테마 참여하기</span>
                    <span className="font-mono text-[1.05rem]">→</span>
                  </Link>
                  <span className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-[rgba(235,230,216,0.56)]">
                    {activeTheme.participantSummary ??
                      `${activeThemeContributorCount} participating`}
                  </span>
                </div>
              </div>
            </section>

            <section className="grid border-b border-[rgba(64,52,44,0.28)] lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-r border-[rgba(64,52,44,0.28)] px-8 py-12">
                <MobileRecommendationSectionLabel number="02" label="Share" />
                <h2 className="mt-8 max-w-[7ch] text-[3.25rem] font-bold leading-[0.98] tracking-[-0.08em] text-[var(--accent-ink)]">
                  지금 듣고 있는 곡을 남겨보세요
                </h2>
                <p className="mt-5 max-w-[22rem] text-[1.04rem] leading-[1.8] text-[rgba(64,52,44,0.58)]">
                  추천은 길게 설명하지 않아도 됩니다. 한 곡과 한 줄이면 충분합니다.
                </p>
                <div className="mt-8">
                  <Link
                    href="/recommendations/new"
                    className="flex min-h-[4rem] max-w-[18rem] items-center justify-between border border-[rgba(64,52,44,0.72)] border-b-[3px] border-b-[rgba(64,52,44,0.92)] px-5 py-4 text-[1rem] font-semibold text-[var(--accent-ink)]"
                  >
                    <span>추천 남기기</span>
                    <span className="font-mono text-[1.05rem]">→</span>
                  </Link>
                </div>
              </div>
              <div className="bg-[rgba(64,52,44,0.03)] px-8 py-12">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                    <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.44)]">
                      Feed status
                    </p>
                    <p className="mt-3 text-[1.8rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                      {localRecommendations.length}
                    </p>
                    <p className="mt-2 text-[0.95rem] leading-7 text-[rgba(64,52,44,0.58)]">
                      추천이 지금 archive에 쌓여 있습니다.
                    </p>
                  </div>
                  <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                    <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.44)]">
                      Community
                    </p>
                    <p className="mt-3 text-[1.8rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                      {contributingMembers}
                    </p>
                    <p className="mt-2 text-[0.95rem] leading-7 text-[rgba(64,52,44,0.58)]">
                      members have shared tracks in this feed.
                    </p>
                  </div>
                </div>

                <div className="mt-4 border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                  <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.44)]">
                    Runtime
                  </p>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[rgba(64,52,44,0.62)]">
                    v{RECOMMENDATION_STORAGE_VERSION} / {storageMessage}
                  </p>
                  <button
                    type="button"
                    onClick={handleResetStorage}
                    className="mt-5 border border-[rgba(64,52,44,0.72)] px-4 py-3 text-[0.88rem] font-semibold text-[var(--accent-ink)]"
                  >
                    local feed reset
                  </button>
                </div>

                {latestDraft ? (
                  <div className="mt-4 border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                    <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.44)]">
                      Latest draft
                    </p>
                    <p className="mt-3 text-[1.2rem] font-semibold text-[var(--accent-ink)]">
                      {latestDraft.trackTitle}
                    </p>
                    <p className="mt-2 text-[0.95rem] leading-7 text-[rgba(64,52,44,0.58)]">
                      {latestDraft.comment}
                    </p>
                  </div>
                ) : null}
              </div>
            </section>

            <div className="grid grid-cols-2 border-b border-[rgba(64,52,44,0.28)]">
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className={`min-h-[4.25rem] border-r border-[rgba(64,52,44,0.28)] px-4 text-[1.02rem] font-semibold ${
                  activeFilter === "all"
                    ? "bg-[rgba(64,52,44,0.04)] text-[var(--accent-ink)]"
                    : "text-[rgba(64,52,44,0.48)]"
                }`}
              >
                추천 피드
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("saved")}
                className={`min-h-[4.25rem] px-4 text-[1.02rem] font-semibold ${
                  activeFilter === "saved"
                    ? "bg-[rgba(64,52,44,0.04)] text-[var(--accent-ink)]"
                    : "text-[rgba(64,52,44,0.48)]"
                }`}
              >
                저장한 추천
              </button>
            </div>

            <section id="feed-start">
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
                <div className="border-b border-[rgba(64,52,44,0.18)] px-8 py-14">
                  <div className="max-w-2xl border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-8 py-10 text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
                    아직 저장한 추천이 없습니다. 추천 피드에서 저장해 두면 이 영역에서 다시 꺼내 볼 수 있습니다.
                  </div>
                </div>
              )}
            </section>

            <section className="grid border-y border-[rgba(64,52,44,0.28)] lg:grid-cols-2">
              <div className="border-r border-[rgba(64,52,44,0.28)] px-8 py-12">
                <MobileRecommendationSectionLabel
                  number="03"
                  label="Cross-platform"
                />
                <h2 className="mt-8 max-w-[10ch] text-[3.1rem] font-bold leading-[0.98] tracking-[-0.08em] text-[var(--accent-ink)]">
                  플랫폼이 달라도 괜찮습니다
                </h2>
                <p className="mt-5 max-w-[24rem] text-[1.05rem] leading-[1.8] text-[rgba(64,52,44,0.58)]">
                  곡명과 아티스트로 바로 찾아 듣을 수 있습니다. Onochu는 링크보다 청취 흐름이 먼저 이어지도록 설계되었습니다.
                </p>
              </div>
              <div className="px-8 py-12">
                <MobileRecommendationSectionLabel number="04" label="Archive" />
                <h2 className="mt-8 max-w-[8ch] text-[3.1rem] font-bold leading-[0.98] tracking-[-0.08em] text-[var(--accent-ink)]">
                  좋은 추천은 사라지지 않습니다
                </h2>
                <p className="mt-5 max-w-[24rem] text-[1.05rem] leading-[1.8] text-[rgba(64,52,44,0.58)]">
                  Onochu에서는 취향이 계속 이어집니다. 추천 하나, 사람 하나, 저장한 트랙 하나가 계속 다음 대화로 연결됩니다.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-4 py-3 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.58)]">
                    {allMembers.length} member profiles
                  </span>
                  <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-4 py-3 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.58)]">
                    {savedRecommendations.length} saved picks
                  </span>
                  <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-4 py-3 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.58)]">
                    viewing as {currentMember.nickname}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
