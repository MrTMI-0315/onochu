"use client";

import Link from "next/link";
import { getMemberName, platformLabels } from "@/lib/mock-data";
import { resolveRecommendationLink } from "@/lib/platform-links";
import type {
  MusicPlatform,
  RecommendationEngagementAction,
  RecommendationEngagementState,
  SongRecommendation,
} from "@/lib/types";

type RecommendationCardProps = {
  recommendation: SongRecommendation;
  compact?: boolean;
  linkToMember?: boolean;
  viewerPlatform?: MusicPlatform;
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
  viewerPlatform,
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
  const resolvedLink = resolveRecommendationLink({
    recommendation,
    preferredPlatform: viewerPlatform,
  });
  const resolvedPlatformLabel = viewerPlatform
    ? platformLabels[viewerPlatform]
    : platformLabels[recommendation.platform];
  const engagementButtons = [
    {
      action: "fire" as const,
      label: "Fire",
      count: recommendation.reactionCount,
      active: resolvedEngagement.fire,
      activeClass:
        "border-[color:rgba(213,140,116,0.35)] bg-[color:rgba(213,140,116,0.16)] text-[color:var(--paper)] shadow-[0_0_30px_rgba(183,106,85,0.14)]",
    },
    {
      action: "save" as const,
      label: "Save",
      count: recommendation.saveCount,
      active: resolvedEngagement.save,
      activeClass:
        "border-[color:rgba(64,81,112,0.35)] bg-[color:rgba(64,81,112,0.18)] text-[color:var(--paper)] shadow-[0_0_30px_rgba(64,81,112,0.14)]",
    },
  ];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/6 bg-[#131313] ${
        compact ? "p-5" : "p-6"
      }`}
    >
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[color:rgba(213,140,116,0.12)] blur-3xl transition duration-300 group-hover:bg-[color:rgba(213,140,116,0.2)]" />

      <div className="relative flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          {recommendation.themeTitle ? (
            <span className="rounded-full border border-[color:rgba(213,140,116,0.2)] bg-[color:rgba(213,140,116,0.12)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              {recommendation.themePhaseLabel ?? "Theme"} / {recommendation.themeTitle}
            </span>
          ) : null}
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
            {platformLabels[recommendation.platform]}
          </span>
          <time className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            {createdAt}
          </time>
        </div>

        <div className="min-w-0">
          {linkToMember ? (
            <Link
              href={memberProfileHref}
              className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]"
            >
              Recommended by {memberName}
            </Link>
          ) : (
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
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
        </div>

        <div className="rounded-[1.25rem] bg-white/4 p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
            Why it landed
          </p>
          <p className="mt-3 text-sm leading-7 text-white/70">
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

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            {linkToMember ? (
              <Link
                href={memberProfileHref}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/72 transition hover:border-[color:rgba(213,140,116,0.32)] hover:text-white"
              >
                Meet {memberName}
              </Link>
            ) : (
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                stay on this profile thread
              </span>
            )}
            {linkToMember ? (
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                follow the taste path
              </span>
            ) : null}
            {viewerPlatform ? (
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                viewer platform: {resolvedPlatformLabel}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
            {viewerPlatform ? (
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                  resolvedLink.isFallback
                    ? "border border-amber-200/20 bg-amber-200/10 text-amber-100"
                    : "border border-white/10 bg-white/5 text-white/55"
                }`}
              >
                {resolvedLink.isFallback ? "Search fallback" : resolvedLink.label}
              </span>
            ) : null}
            <a
              href={resolvedLink.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition active:scale-[0.98]"
            >
              {resolvedLink.isFallback
                ? `Search ${resolvedPlatformLabel}`
                : compact
                  ? `Open ${resolvedPlatformLabel}`
                  : `Play on ${resolvedPlatformLabel}`}
            </a>
            {viewerPlatform ? (
              <span className="max-w-[18rem] text-right text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
                {resolvedLink.helperText}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
