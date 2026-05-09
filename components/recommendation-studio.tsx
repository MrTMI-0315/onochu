"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BrandMarkLink } from "@/components/brand-mark-link";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getActiveThemeSpotlight,
  themeSpotlights,
} from "@/lib/mock-data";
import {
  createEmptyRecommendationEngagementState,
  loadStoredRecommendationState,
  loadServerRecommendationDraftState,
  persistStoredRecommendationState,
  persistServerRecommendationDraftState,
} from "@/lib/recommendation-drafts";
import {
  loadStoredProfileDraft,
  loadServerProfileDraft,
} from "@/lib/profile-drafts";
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
  const localRecommendationsRef =
    useRef<SongRecommendation[]>(initialRecommendations);
  const engagementByRecommendationIdRef =
    useRef<Record<string, RecommendationEngagementState>>({});
  const [viewerPlatform, setViewerPlatform] = useState<MusicPlatform>(
    currentMember.mainPlatform,
  );
  const [hasHydrated, setHasHydrated] = useState(false);
  const [hasServerHydrated, setHasServerHydrated] = useState(false);
  const [, setStorageMessage] = useState("browser storage active");

  useEffect(() => {
    let isMounted = true;
    const storedState = loadStoredRecommendationState(initialRecommendations);

    const hydrationFrame = window.requestAnimationFrame(() => {
      if (!isMounted) {
        return;
      }

      setLocalRecommendations(storedState.recommendations);
      setLatestDraft(storedState.latestDraft);
      setEngagementByRecommendationId(storedState.engagementByRecommendationId);
      setStorageMessage(storedState.storageMessage);
      setHasHydrated(true);
    });

    loadServerRecommendationDraftState(initialRecommendations)
      .then((serverState) => {
        if (!isMounted) {
          return;
        }

        if (!serverState) {
          setHasServerHydrated(true);
          return;
        }

        setLocalRecommendations(serverState.recommendations);
        setLatestDraft(serverState.latestDraft);
        setEngagementByRecommendationId(
          serverState.engagementByRecommendationId,
        );
        setStorageMessage(serverState.storageMessage);
        setHasServerHydrated(true);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setStorageMessage("browser storage active / server fallback ready");
        setHasServerHydrated(true);
      });

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [initialRecommendations]);

  useEffect(() => {
    let isMounted = true;
    const storedProfile = loadStoredProfileDraft({
      nickname: currentMember.nickname,
      bio: currentMember.bio,
      favoriteGenres: currentMember.favoriteGenres,
      mainPlatform: currentMember.mainPlatform,
      playlistLinks: currentMember.playlistLinks.map((playlistLink) => playlistLink.url),
    });

    const hydrationFrame = window.requestAnimationFrame(() => {
      if (!isMounted) {
        return;
      }

      setViewerPlatform(storedProfile.draft.mainPlatform);
    });

    loadServerProfileDraft({
      nickname: currentMember.nickname,
      bio: currentMember.bio,
      favoriteGenres: currentMember.favoriteGenres,
      mainPlatform: currentMember.mainPlatform,
      playlistLinks: currentMember.playlistLinks.map((playlistLink) => playlistLink.url),
    }).then((serverProfile) => {
      if (!isMounted || !serverProfile) {
        return;
      }

      setViewerPlatform(serverProfile.draft.mainPlatform);
    }).catch(() => {
      // Keep the local fallback platform.
    });

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [currentMember]);

  useEffect(() => {
    if (!hasHydrated || !hasServerHydrated) {
      return;
    }

    persistStoredRecommendationState({
      recommendations: localRecommendations,
      latestDraft,
      engagementByRecommendationId,
    });

    persistServerRecommendationDraftState({
      recommendations: localRecommendations,
      latestDraft,
      engagementByRecommendationId,
    })
      .then((message) => {
        setStorageMessage(message);
      })
      .catch(() => {
        setStorageMessage("saved locally / server engagement fallback retained");
      });
  }, [
    engagementByRecommendationId,
    hasHydrated,
    hasServerHydrated,
    latestDraft,
    localRecommendations,
  ]);

  useEffect(() => {
    localRecommendationsRef.current = localRecommendations;
  }, [localRecommendations]);

  useEffect(() => {
    engagementByRecommendationIdRef.current = engagementByRecommendationId;
  }, [engagementByRecommendationId]);

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

  function handleToggleEngagement(
    recommendationId: string,
    action: RecommendationEngagementAction,
  ) {
    const currentEngagementByRecommendationId =
      engagementByRecommendationIdRef.current;
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
    const nextRecommendations = localRecommendationsRef.current.map(
      (recommendation) => {
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
      },
    );

    engagementByRecommendationIdRef.current = nextEngagementByRecommendationId;
    localRecommendationsRef.current = nextRecommendations;
    setEngagementByRecommendationId(nextEngagementByRecommendationId);
    setLocalRecommendations(nextRecommendations);
    setStorageMessage("syncing engagement to server session");
  }

  return (
    <>
      <main className="mobile-screen bg-[var(--paper)] pb-16 md:hidden">
        <section className="border-b border-[rgba(64,52,44,0.28)] px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <BrandMarkLink />
            <p className="text-right font-mono text-[0.68rem] uppercase leading-[1.35] tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
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
        <main className="min-h-screen bg-[var(--paper)] px-6 py-8 text-[var(--accent-ink)]">
          <div className="mx-auto max-w-6xl overflow-hidden border border-[#1A1817] bg-[#EBE6D8] shadow-[0_24px_60px_rgba(26,24,23,0.08)]">
            <header className="flex items-start justify-between border-b border-[#1A1817] px-8 py-7">
              <BrandMarkLink />
              <div className="text-right font-mono text-[0.68rem] leading-tight text-[#1A1817]">
                RECOMMENDATION ARCHIVE
                <br />
                SEOUL / BARCELONA
              </div>
            </header>

            <section className="grid border-b border-[#1A1817] lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)]">
              <div className="px-8 py-12 lg:px-10 lg:py-14">
                <div className="mb-4 flex items-center gap-2 font-mono text-[0.72rem] text-[var(--primary-strong)]">
                  <span className="inline-block h-px w-8 bg-[var(--primary-strong)]" />
                  추천이 흐르는 곳, Onochu
                </div>
                <h1 className="max-w-[7.4ch] text-[clamp(3.8rem,6.2vw,5.6rem)] font-extrabold leading-[0.96] tracking-[-0.08em] text-[#1A1817]">
                  추천은 여기서 흐릅니다
                </h1>
                <p className="mt-6 max-w-[25rem] text-[1.08rem] leading-[1.78] text-[#8C867A]">
                  단톡방에 묻힌 추천을 다시 꺼내고, 곡과 사람을 함께 발견하세요.
                </p>
              </div>

              <div className="border-t border-[#1A1817] bg-[#1A1817] px-8 py-12 text-[#EBE6D8] lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
                <MobileRecommendationSectionLabel
                  number="01"
                  label="Weekly Theme"
                  dark
                />
                <h2 className="mt-8 max-w-[8ch] text-[clamp(2.8rem,4.2vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.08em]">
                  이번 주 오노추
                </h2>
                <p className="mt-5 max-w-[25rem] text-[1.02rem] leading-[1.85] text-[rgba(235,230,216,0.74)]">
                  좋은 추천은 혼자 듣고 끝나지 않습니다. 이번 테마에 맞는 곡을 남기고, 다른 멤버의 취향을 같이 들어보세요.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/recommendations/new"
                    className="flex min-h-[4rem] min-w-[16rem] items-center justify-between border border-[#EBE6D8] bg-[#EBE6D8] px-5 py-4 text-[1rem] font-semibold text-[#1A1817]"
                  >
                    <span>이번 테마 참여하기</span>
                    <span className="font-mono text-[1.05rem]">→</span>
                  </Link>
                  <span className="font-mono text-[0.78rem] uppercase tracking-[0.08em] text-[rgba(235,230,216,0.58)]">
                    {activeTheme.participantSummary ??
                      `${activeThemeContributorCount} participating`}
                  </span>
                </div>
              </div>
            </section>

            <section className="grid border-b border-[#1A1817] lg:grid-cols-[minmax(0,1.02fr)_minmax(20rem,0.98fr)]">
              <div className="px-8 py-12 lg:px-10">
                <MobileRecommendationSectionLabel number="02" label="Share" />
                <h2 className="mt-8 max-w-[7ch] text-[clamp(2.9rem,4.6vw,4.2rem)] font-extrabold leading-[0.98] tracking-[-0.08em] text-[#1A1817]">
                  지금 듣고 있는 곡을 남겨보세요
                </h2>
                <p className="mt-5 max-w-[23rem] text-[1.04rem] leading-[1.8] text-[#8C867A]">
                  추천은 길게 설명하지 않아도 됩니다. 한 곡과 한 줄이면 충분합니다.
                </p>
                <div className="mt-8">
                  <Link
                    href="/recommendations/new"
                    className="flex min-h-[4rem] max-w-[18rem] items-center justify-between border border-[#1A1817] border-b-4 bg-[#EBE6D8] px-5 py-4 text-[1rem] font-semibold text-[#1A1817]"
                  >
                    <span>추천 남기기</span>
                    <span className="font-mono text-[1.05rem]">→</span>
                  </Link>
                </div>
              </div>

              <div className="border-t border-[#1A1817] bg-[#E7E0D0] px-8 py-12 lg:border-l lg:border-t-0 lg:px-10">
                <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[rgba(64,52,44,0.52)]">
                  Archive Note
                </div>
                <h3 className="mt-6 max-w-[11ch] text-[2.4rem] font-extrabold leading-[1] tracking-[-0.07em] text-[#1A1817]">
                  같이 들을수록 archive가 선명해집니다
                </h3>
                <p className="mt-5 max-w-[23rem] text-[1rem] leading-[1.8] text-[rgba(64,52,44,0.62)]">
                  지금 이 피드에는 {localRecommendations.length}개의 추천과 {contributingMembers}명의 흔적이 이어져 있습니다. 저장한 추천은 아래 아카이브에서 다시 꺼내 볼 수 있습니다.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.28)] px-4 py-3 font-mono text-[0.74rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.56)]">
                    {allMembers.length} member profiles
                  </span>
                  <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.28)] px-4 py-3 font-mono text-[0.74rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.56)]">
                    {savedRecommendations.length} saved picks
                  </span>
                </div>
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

            <section className="grid border-y border-[#1A1817] lg:grid-cols-2">
              <div className="px-8 py-12 lg:border-r lg:border-[#1A1817] lg:px-10">
                <MobileRecommendationSectionLabel
                  number="03"
                  label="Cross-platform"
                />
                <h2 className="mt-8 max-w-[10ch] text-[clamp(2.8rem,4.2vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.08em] text-[#1A1817]">
                  플랫폼이 달라도 괜찮습니다
                </h2>
                <p className="mt-5 max-w-[24rem] text-[1.05rem] leading-[1.8] text-[#8C867A]">
                  곡명과 아티스트로 바로 찾아 들을 수 있습니다. Onochu는 링크보다 청취 흐름이 먼저 이어지도록 설계되었습니다.
                </p>
              </div>
              <div className="border-t border-[#1A1817] bg-[#E7E0D0] px-8 py-12 lg:border-t-0 lg:px-10">
                <MobileRecommendationSectionLabel number="04" label="Archive" />
                <h2 className="mt-8 max-w-[8ch] text-[clamp(2.8rem,4.2vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.08em] text-[#1A1817]">
                  좋은 추천은 사라지지 않습니다
                </h2>
                <p className="mt-5 max-w-[24rem] text-[1.05rem] leading-[1.8] text-[#8C867A]">
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
