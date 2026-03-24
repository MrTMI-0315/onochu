"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { RecommendationComposer } from "@/components/recommendation-composer";
import { appendDraftToStoredRecommendationState } from "@/lib/recommendation-drafts";
import type { MemberProfile, RecommendationDraftInput, SongRecommendation } from "@/lib/types";

type RecommendationCreateRouteProps = {
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
};

export function RecommendationCreateRoute({
  currentMember,
  initialRecommendations,
}: RecommendationCreateRouteProps) {
  const [latestDraft, setLatestDraft] = useState<SongRecommendation | null>(null);
  const [storageMessage, setStorageMessage] = useState(
    "submit creates a local draft and inserts it into the feed storage",
  );

  const moodSuggestions = useMemo(() => {
    return Array.from(
      new Set(initialRecommendations.flatMap((recommendation) => recommendation.moodTags)),
    ).slice(0, 8);
  }, [initialRecommendations]);

  function handleDraftSaved(draft: RecommendationDraftInput) {
    const nextState = appendDraftToStoredRecommendationState({
      draft,
      currentMember,
      initialRecommendations,
    });

    setLatestDraft(nextState.latestDraft);
    setStorageMessage(nextState.storageMessage);
  }

  return (
    <PageShell
      eyebrow="Recommendation Create"
      title="Post a recommendation in its own route."
      description="feed 안의 quick draft와 별개로, PRD v0.3가 요구한 독립 등록 경로를 열었습니다. 저장은 같은 browser storage를 사용하므로 등록 뒤 feed 최상단에서 바로 이어집니다."
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Posting member
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {currentMember.nickname}
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Local flow
            </p>
            <p className="mt-2 text-sm leading-7 text-white/68">
              {storageMessage}
            </p>
          </div>
          <Link
            href="/recommendations"
            className="inline-flex rounded-full border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition hover:border-[#de8eff]/30 hover:text-white"
          >
            Back to feed
          </Link>
        </div>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <RecommendationComposer
          currentMemberName={currentMember.nickname}
          moodSuggestions={moodSuggestions}
          onDraftSaved={handleDraftSaved}
        />

        <div className="space-y-6">
          <section className="onochu-panel rounded-[2rem] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#de8eff]">
              Route intent
            </p>
            <h2 className="onochu-display mt-3 text-3xl font-bold uppercase text-white">
              Faster than a chat scroll.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/68">
              곡명, 아티스트, 플랫폼, 링크, 코멘트만 있으면 등록을 끝낼 수 있게
              유지했습니다. 저장 후에는 `/recommendations`에서 draft preview와
              피드 삽입 상태를 바로 확인할 수 있습니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {moodSuggestions.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          <section className="onochu-panel rounded-[2rem] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#de8eff]">
                  Latest submission
                </p>
                <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                  Feed preview
                </h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                Local only
              </span>
            </div>

            {latestDraft ? (
              <RecommendationCard recommendation={latestDraft} linkToMember={false} />
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 bg-white/3 p-6 text-sm leading-7 text-white/55">
                아직 이 route에서 저장한 draft가 없습니다. 한 번 등록하면 같은
                browser storage를 쓰는 `/recommendations` 피드 맨 위에서 이어집니다.
              </div>
            )}
          </section>
        </div>
      </section>
    </PageShell>
  );
}
