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
import type {
  MemberProfile,
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
  const [localRecommendations, setLocalRecommendations] =
    useState<SongRecommendation[]>(initialRecommendations);
  const [latestDraft, setLatestDraft] = useState<SongRecommendation | null>(null);
  const [engagementByRecommendationId, setEngagementByRecommendationId] =
    useState<Record<string, RecommendationEngagementState>>({});
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

  const moodHighlights = useMemo(() => {
    return Array.from(
      new Set(localRecommendations.flatMap((recommendation) => recommendation.moodTags)),
    ).slice(0, 8);
  }, [localRecommendations]);

  const activeTheme = getActiveThemeSpotlight() ?? themeSpotlights[0];
  const queuedThemes = themeSpotlights.filter(
    (themeSpotlight) => themeSpotlight.id !== activeTheme.id,
  );
  const contributingMembers = useMemo(() => {
    return new Set(localRecommendations.map((recommendation) => recommendation.memberId))
      .size;
  }, [localRecommendations]);
  const topPick = localRecommendations[0];
  const featuredRecommendations = localRecommendations.slice(0, 4);
  const remainingRecommendations = localRecommendations.slice(4);

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
    <main className="min-h-screen px-4 pb-28 pt-24 text-stone-100 md:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="onochu-panel relative overflow-hidden rounded-[2rem] p-6 md:p-8">
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-[#de8eff]/10 blur-[100px]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-sm bg-[#de8eff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-black">
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
                  className="rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
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
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
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
              </div>
              <button
                type="button"
                onClick={handleResetStorage}
                className="rounded-full border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[#de8eff]/30 hover:text-white"
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
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#de8eff]">
                  Latest local draft
                </p>
                <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                  Ready At The Top Of The Feed
                </h2>
              </div>
              <Link
                href="/recommendations/new"
                className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[#de8eff]/30 hover:text-white"
              >
                Open create route
              </Link>
            </div>
            <RecommendationCard recommendation={latestDraft} linkToMember={false} />
          </section>
        ) : null}

        <section id="feed-start" className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="onochu-eyebrow">Start here</span>
              <h2 className="onochu-display mt-2 text-3xl font-bold uppercase text-white md:text-4xl">
                What the club is listening to now.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62">
                첫 카드부터 곡, 이유, 추천인 흐름이 바로 보이도록 최근 추천을
                위로 올렸습니다.
              </p>
            </div>
            <Link
              href="/recommendations/new"
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#de8eff]"
            >
              Post yours
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {featuredRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
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

        <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="onochu-panel rounded-[1.75rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
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

            <article className="rounded-[1.75rem] border border-[#de8eff]/16 bg-[#de8eff]/8 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#de8eff]">
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
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/recommendations/new"
                  className="rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
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
  );
}
