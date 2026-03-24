"use client";

import Link from "next/link";
import { getMemberName, platformLabels } from "@/lib/mock-data";
import type {
  RecommendationEngagementAction,
  RecommendationEngagementState,
  SongRecommendation,
} from "@/lib/types";

type RecommendationCardProps = {
  recommendation: SongRecommendation;
  compact?: boolean;
  linkToMember?: boolean;
  engagement?: RecommendationEngagementState;
  onToggleEngagement?: (
    recommendationId: string,
    action: RecommendationEngagementAction,
  ) => void;
  showEngagementControls?: boolean;
};

export function RecommendationCard({
  recommendation,
  compact = false,
  linkToMember = true,
  engagement,
  onToggleEngagement,
  showEngagementControls = true,
}: RecommendationCardProps) {
  const memberName =
    recommendation.memberNickname || getMemberName(recommendation.memberId);
  const memberProfileHref = `/members/${recommendation.memberId}`;
  const createdAt = new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(recommendation.createdAt));
  const resolvedEngagement = engagement ?? {
    fire: false,
    save: false,
  };
  const engagementButtons = [
    {
      action: "fire" as const,
      label: "Fire",
      count: recommendation.reactionCount,
      active: resolvedEngagement.fire,
      activeClass:
        "border-[#ff8b72]/35 bg-[#ff8b72]/14 text-[#ffc0b1] shadow-[0_0_30px_rgba(255,139,114,0.12)]",
    },
    {
      action: "save" as const,
      label: "Save",
      count: recommendation.saveCount,
      active: resolvedEngagement.save,
      activeClass:
        "border-[#de8eff]/35 bg-[#de8eff]/14 text-[#f2d7ff] shadow-[0_0_30px_rgba(222,142,255,0.12)]",
    },
  ];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/6 bg-[#131313] ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#de8eff]/10 blur-3xl transition duration-300 group-hover:bg-[#de8eff]/18" />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {linkToMember ? (
              <Link
                href={memberProfileHref}
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#de8eff]"
              >
                Recommended by {memberName}
              </Link>
            ) : (
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#de8eff]">
                Curated by {memberName}
              </p>
            )}
            <h3
              className={`onochu-display mt-3 font-bold uppercase text-white ${
                compact ? "text-2xl" : "text-3xl"
              }`}
            >
              {recommendation.trackTitle}
            </h3>
            <p className="mt-1 text-sm text-white/45">{recommendation.artistName}</p>
            {linkToMember ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href={memberProfileHref}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/72 transition hover:border-[#de8eff]/30 hover:text-white"
                >
                  Open {memberName} profile
                </Link>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                  see recent picks and playlist links
                </span>
              </div>
            ) : null}
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            {platformLabels[recommendation.platform]}
          </span>
        </div>

        <div className="rounded-[1.25rem] bg-white/4 p-4">
          <p className="text-sm leading-7 text-white/70">
            &ldquo;{recommendation.comment}&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {recommendation.moodTags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {showEngagementControls ? (
          <div className="grid grid-cols-2 gap-3">
            {engagementButtons.map((button) => (
              <button
                key={button.action}
                type="button"
                disabled={!onToggleEngagement}
                onClick={() =>
                  onToggleEngagement?.(recommendation.id, button.action)
                }
                className={`flex min-h-12 items-center justify-between rounded-[1rem] border px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.16em] transition ${
                  button.active
                    ? button.activeClass
                    : "border-white/8 bg-white/4 text-white/65 hover:border-white/14 hover:bg-white/6 hover:text-white"
                } ${onToggleEngagement ? "" : "cursor-default opacity-70"}`}
              >
                <span>{button.label}</span>
                <span>{button.count}</span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/6 pt-4">
          <time className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/35">
            {createdAt}
          </time>
          <a
            href={recommendation.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition active:scale-[0.98]"
          >
            {compact ? "Open" : "Play Now"}
          </a>
        </div>
      </div>
    </article>
  );
}
