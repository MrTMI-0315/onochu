"use client";

import { useState } from "react";
import { RecommendationCard } from "@/components/recommendation-card";
import { RecommendationComposer } from "@/components/recommendation-composer";
import type {
  MemberProfile,
  RecommendationDraftInput,
  SongRecommendation,
} from "@/lib/types";

type RecommendationStudioProps = {
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
  moodSuggestions: string[];
};

export function RecommendationStudio({
  currentMember,
  initialRecommendations,
  moodSuggestions,
}: RecommendationStudioProps) {
  const [localRecommendations, setLocalRecommendations] =
    useState<SongRecommendation[]>(initialRecommendations);
  const [latestDraft, setLatestDraft] = useState<SongRecommendation | null>(null);

  function handleDraftSaved(draft: RecommendationDraftInput) {
    const nextDraft: SongRecommendation = {
      id: `draft-${Date.now()}`,
      memberId: currentMember.id,
      trackTitle: draft.trackTitle,
      artistName: draft.artistName,
      platform: draft.platform,
      url: draft.url,
      comment: draft.comment,
      moodTags: draft.moodTags.length > 0 ? draft.moodTags : ["fresh"],
      createdAt: new Date().toISOString(),
    };

    setLatestDraft(nextDraft);
    setLocalRecommendations((currentRecommendations) => [
      nextDraft,
      ...currentRecommendations,
    ]);
  }

  return (
    <>
      <RecommendationComposer
        currentMemberName={currentMember.nickname}
        moodSuggestions={moodSuggestions}
        onDraftSaved={handleDraftSaved}
      />

      {latestDraft ? (
        <section className="onochu-panel rounded-[2rem] p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#de8eff]">
                Draft preview
              </p>
              <h2 className="onochu-display mt-2 text-2xl font-bold uppercase text-white">
                Inserted At The Top
              </h2>
            </div>
            <span className="rounded-full border border-[#de8eff]/20 bg-[#de8eff]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
              Local only
            </span>
          </div>

          <RecommendationCard recommendation={latestDraft} linkToMember={false} />
        </section>
      ) : null}

      <section id="feed-start" className="grid gap-4 lg:grid-cols-2">
        {localRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            linkToMember
          />
        ))}
      </section>
    </>
  );
}
