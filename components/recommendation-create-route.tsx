"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RecommendationCard } from "@/components/recommendation-card";
import { RecommendationComposer } from "@/components/recommendation-composer";
import {
  getActiveThemeSpotlight,
  mobileMoodSuggestions,
} from "@/lib/mock-data";
import {
  loadStoredProfileDraft,
  loadServerProfileDraft,
} from "@/lib/profile-drafts";
import {
  appendDraftToStoredRecommendationState,
  persistServerRecommendationDraftState,
} from "@/lib/recommendation-drafts";
import type {
  MemberProfile,
  MusicPlatform,
  RecommendationDraftInput,
  SongRecommendation,
} from "@/lib/types";

type RecommendationCreateRouteProps = {
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
  initialDraft?: Partial<RecommendationDraftInput>;
};

export function RecommendationCreateRoute({
  currentMember,
  initialRecommendations,
  initialDraft,
}: RecommendationCreateRouteProps) {
  const [viewerPlatform, setViewerPlatform] = useState<MusicPlatform>(
    currentMember.mainPlatform,
  );
  const [latestDraft, setLatestDraft] = useState<SongRecommendation | null>(null);
  const [themeParticipationCount, setThemeParticipationCount] = useState(
    initialRecommendations.filter(
      (recommendation) => recommendation.themeId === getActiveThemeSpotlight()?.id,
    ).length,
  );
  const [storageMessage, setStorageMessage] = useState(
    "submit creates a server-session draft while preserving local fallback",
  );
  const activeTheme = getActiveThemeSpotlight();

  const moodSuggestions = useMemo(() => mobileMoodSuggestions, []);

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

  function handleDraftSaved(draft: RecommendationDraftInput) {
    const nextState = appendDraftToStoredRecommendationState({
      draft,
      currentMember,
      initialRecommendations,
      activeTheme,
    });

    setLatestDraft(nextState.latestDraft);
    setStorageMessage(nextState.storageMessage);
    void persistServerRecommendationDraftState({
      recommendations: nextState.recommendations,
      latestDraft: nextState.latestDraft,
    })
      .then((message) => {
        setStorageMessage(message);
      })
      .catch(() => {
        setStorageMessage(
          "saved locally / server persistence fallback retained draft",
        );
      });

    if (activeTheme) {
      setThemeParticipationCount(
        nextState.recommendations.filter(
          (recommendation) => recommendation.themeId === activeTheme.id,
        ).length,
      );
    }
  }

  return (
    <>
      <div className="md:hidden">
        <RecommendationComposer
          currentMemberName={currentMember.nickname}
          moodSuggestions={moodSuggestions}
          onDraftSaved={handleDraftSaved}
          mobile
          initialDraft={initialDraft}
        />
      </div>

      <div className="hidden md:block">
        <main className="min-h-screen bg-[var(--paper)] px-6 pb-20 pt-28 text-[#1A1817]">
          <div className="mx-auto max-w-6xl border border-[rgba(26,24,23,0.18)] bg-[#EBE6D8]">
            <section className="grid border-b border-[#1A1817] lg:grid-cols-[minmax(0,1.04fr)_minmax(22rem,0.96fr)]">
              <div className="px-10 py-14">
                <div className="mb-4 flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-[var(--primary-strong)]">
                  <span className="inline-block h-px w-8 bg-[var(--primary-strong)]" />
                  recommendation create
                </div>
                <h1 className="max-w-[7.6ch] text-[clamp(3.6rem,5.8vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.08em] text-[#1A1817]">
                  추천을 남기는 흐름도 archive 안에 둡니다
                </h1>
                <p className="mt-6 max-w-[29rem] text-[1.06rem] leading-[1.82] text-[#8C867A]">
                  피드에서 읽는 흐름과 분리하되, 같은 tone 안에서 바로 이어지게 정리했습니다.
                  등록이 끝나면 local draft는 feed 최상단 preview로 곧장 이어집니다.
                </p>
              </div>

              <div className="border-t border-[#1A1817] bg-[rgba(64,52,44,0.04)] px-10 py-14 text-[#1A1817] lg:border-l lg:border-t-0">
                <div className="space-y-4">
                  <div className="border border-[rgba(26,24,23,0.16)] bg-[rgba(255,255,255,0.22)] p-5">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(64,52,44,0.48)]">
                      Posting Member
                    </p>
                    <p className="mt-3 text-[2rem] font-bold tracking-[-0.05em] text-[#1A1817]">
                      {currentMember.nickname}
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                    <div className="border border-[rgba(26,24,23,0.16)] bg-[rgba(255,255,255,0.22)] p-5">
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(64,52,44,0.48)]">
                        Viewer Platform
                      </p>
                      <p className="mt-3 text-[1.35rem] font-semibold tracking-[-0.04em] text-[#1A1817]">
                        {viewerPlatform.replaceAll("_", " ")}
                      </p>
                    </div>
                    {activeTheme ? (
                      <div className="border border-[rgba(26,24,23,0.16)] bg-[rgba(255,255,255,0.22)] p-5">
                        <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[rgba(64,52,44,0.48)]">
                          Active Theme
                        </p>
                        <p className="mt-3 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#1A1817]">
                          {activeTheme.title}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-[rgba(64,52,44,0.64)]">
                          {activeTheme.relatedEvent ?? activeTheme.activationWindow}
                        </p>
                        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-[var(--primary)]">
                          {themeParticipationCount} linked recs
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <p className="max-w-[24rem] text-[0.98rem] leading-[1.8] text-[rgba(64,52,44,0.64)]">
                    {storageMessage}
                  </p>
                  <Link
                    href="/recommendations"
                    className="flex min-h-[4rem] max-w-[16rem] items-center justify-between border border-[#1A1817] bg-[#1A1817] px-5 py-4 text-[1rem] font-semibold text-[#EBE6D8]"
                  >
                    <span>피드로 돌아가기</span>
                    <span className="font-mono text-[1.05rem]">→</span>
                  </Link>
                </div>
              </div>
            </section>

            <section className="grid lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)]">
              <div className="border-b border-[#1A1817] px-8 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
                <RecommendationComposer
                  currentMemberName={currentMember.nickname}
                  moodSuggestions={moodSuggestions}
                  onDraftSaved={handleDraftSaved}
                  initialDraft={initialDraft}
                />
              </div>

              <div className="space-y-0">
                <section className="border-b border-[#1A1817] bg-[#E7E0D0] px-8 py-10 lg:px-10 lg:py-12">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--primary-strong)]">
                    Route Intent
                  </p>
                  <h2 className="mt-5 max-w-[10ch] text-[2.7rem] font-extrabold leading-[0.98] tracking-[-0.07em] text-[#1A1817]">
                    한 번에 남기고 바로 이어지는 submission flow
                  </h2>
                  <p className="mt-5 text-[0.98rem] leading-[1.8] text-[rgba(64,52,44,0.66)]">
                    곡명, 아티스트, 링크, 코멘트만 채우면 등록이 끝나게 유지했습니다.
                    필요하면 alternate links를 더 붙여 다른 플랫폼 사용자도 바로 이어지게 만들 수 있습니다.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {["song first", "reason second", "link last"].map((item) => (
                      <div
                        key={item}
                        className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.28)] px-4 py-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.58)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {activeTheme?.curatorNote ? (
                    <p className="mt-6 border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.3)] p-5 text-[0.94rem] leading-[1.8] text-[rgba(64,52,44,0.66)]">
                      {activeTheme.curatorNote}
                    </p>
                  ) : null}
                </section>

                <section className="px-8 py-10 lg:px-10 lg:py-12">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--primary-strong)]">
                        Feed Preview
                      </p>
                      <h2 className="mt-3 text-[2.2rem] font-extrabold leading-[0.98] tracking-[-0.06em] text-[#1A1817]">
                        지금 등록한 draft
                      </h2>
                    </div>
                    <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-4 py-3 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.52)]">
                      Server session
                    </span>
                  </div>

                  {latestDraft ? (
                    <RecommendationCard
                      recommendation={latestDraft}
                      linkToMember={false}
                      viewerPlatform={viewerPlatform}
                    />
                  ) : (
                    <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] p-6 text-[0.96rem] leading-[1.8] text-[rgba(64,52,44,0.62)]">
                      아직 이 route에서 저장한 draft가 없습니다. 한 번 등록하면 server session과
                      local fallback을 거쳐 `/recommendations` 피드 맨 위에서 이어집니다.
                    </div>
                  )}
                </section>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
