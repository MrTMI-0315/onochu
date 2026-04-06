"use client";

import { useState } from "react";
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
  mobileSimple?: boolean;
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
  mobileSimple = false,
  linkToMember = true,
  viewerPlatform,
  engagement,
  onToggleEngagement,
  showEngagementControls = true,
}: RecommendationCardProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
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
  const mobileComment = recommendation.mobileComment || recommendation.comment;
  const searchQuery =
    recommendation.searchQuery?.trim() ||
    `${recommendation.trackTitle} ${recommendation.artistName}`.trim();
  const mobileRecordId = recommendation.id.startsWith("rec-")
    ? `REC. ${recommendation.id.slice(4).padStart(3, "0")}`
    : recommendation.id.toUpperCase();
  const mobileDateLabel = new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(recommendation.createdAt))
    .replace(/\.\s/g, ".")
    .replace(/\.$/, "");
  const memberHandle = `@${memberName.toLowerCase().replace(/\s+/g, "_")}`;
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

  async function handleCopySearchQuery() {
    try {
      await navigator.clipboard.writeText(searchQuery);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1600);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }

  if (mobileSimple) {
    return (
      <article className="border-b border-[rgba(64,52,44,0.18)] px-4 py-6 text-[var(--accent-ink)] transition-colors duration-200 md:px-8 md:py-8 md:hover:bg-[rgba(64,52,44,0.03)]">
        <div className="flex items-center justify-between gap-4">
          <span className="bg-[var(--accent-ink)] px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-[var(--paper)]">
            {mobileRecordId}
          </span>
          <span className="font-mono text-[0.72rem] tracking-[0.04em] text-[rgba(64,52,44,0.48)]">
            {mobileDateLabel}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4 md:mt-4 md:items-start md:gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[rgba(64,52,44,0.24)] bg-[rgba(217,210,197,0.7)] text-[0.72rem] font-mono text-[rgba(64,52,44,0.42)] md:h-[4.5rem] md:w-[4.5rem]">
            ART
          </div>
          <div className="min-w-0">
            <h3 className="text-[1.9rem] font-bold tracking-[-0.06em] text-[var(--accent-ink)] md:text-[1.8rem]">
              {recommendation.trackTitle}
            </h3>
            <p className="mt-1 text-[1rem] text-[rgba(64,52,44,0.58)] md:text-[0.96rem]">
              {recommendation.artistName}
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-4 md:mt-6 md:grid md:grid-cols-[0.95fr_1.35fr_1fr] md:gap-6 md:space-y-0">
          <li className="space-y-1">
            <p className="text-[0.88rem] font-medium text-[rgba(64,52,44,0.56)]">
              이 곡을 남긴 사람:
            </p>
            <p className="flex items-start gap-2 text-[1rem] text-[rgba(64,52,44,0.92)]">
              <span className="font-mono text-[var(--primary-strong)]">→</span>
              <span>{memberHandle}</span>
            </p>
          </li>
          <li className="space-y-1">
            <p className="text-[0.88rem] font-medium text-[rgba(64,52,44,0.56)]">
              추천 한 줄:
            </p>
            <p className="flex items-start gap-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.92)]">
              <span className="font-mono text-[var(--primary-strong)]">→</span>
              <span>{mobileComment}</span>
            </p>
          </li>
          <li className="space-y-2">
            <p className="text-[0.88rem] font-medium text-[rgba(64,52,44,0.56)]">
              태그:
            </p>
            <div className="flex items-start gap-2">
              <span className="pt-1 font-mono text-[var(--primary-strong)]">→</span>
              <div className="flex flex-wrap gap-2">
                {recommendation.moodTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.04)] px-2 py-1 text-[0.82rem] text-[rgba(64,52,44,0.84)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </li>
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-2 md:hidden">
          <a
            href={resolvedLink.href}
            target="_blank"
            rel="noreferrer"
            className="col-span-2 flex items-center justify-center border border-[rgba(64,52,44,0.9)] bg-[var(--accent-ink)] px-4 py-3 text-[0.95rem] font-semibold text-[var(--paper)] transition-colors duration-200 hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.38)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] md:col-span-4 md:min-h-[3.4rem]"
          >
            내 플랫폼에서 찾기
          </a>
          <button
            type="button"
            onClick={handleCopySearchQuery}
            className="flex items-center justify-center border border-[rgba(64,52,44,0.42)] bg-transparent px-4 py-3 text-[0.95rem] font-medium text-[var(--accent-ink)] transition-colors duration-200 hover:bg-[rgba(64,52,44,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
          >
            {copyStatus === "copied"
              ? "복사됨 ✓"
              : copyStatus === "failed"
                ? "복사 재시도"
                : "곡명/아티스트 복사"}
          </button>
          <a
            href={recommendation.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center border border-[rgba(64,52,44,0.42)] bg-transparent px-4 py-3 text-[0.95rem] font-medium text-[var(--accent-ink)] transition-colors duration-200 hover:bg-[rgba(64,52,44,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
          >
            원본 링크 열기
          </a>
          <button
            type="button"
            disabled={!onToggleEngagement}
            onClick={() => onToggleEngagement?.(recommendation.id, "fire")}
            className={`flex items-center justify-center gap-2 border px-4 py-3 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] ${
              resolvedEngagement.fire
                ? "border-[rgba(193,88,67,0.8)] bg-[rgba(193,88,67,0.08)] text-[var(--primary-strong)]"
                : "border-[rgba(64,52,44,0.42)] text-[var(--accent-ink)] hover:bg-[rgba(64,52,44,0.04)]"
            }`}
          >
            <span>🔥</span>
            <span>{resolvedEngagement.fire ? "반응함" : "반응하기"}</span>
          </button>
          <button
            type="button"
            disabled={!onToggleEngagement}
            onClick={() => onToggleEngagement?.(recommendation.id, "save")}
            className={`flex items-center justify-center border px-4 py-3 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] ${
              resolvedEngagement.save
                ? "border-[rgba(64,52,44,0.8)] bg-[rgba(64,52,44,0.08)] text-[var(--accent-ink)]"
                : "border-[rgba(64,52,44,0.42)] text-[var(--accent-ink)] hover:bg-[rgba(64,52,44,0.04)]"
            }`}
          >
            {resolvedEngagement.save ? "저장됨 ✓" : "저장하기"}
          </button>
        </div>

        <div className="mt-6 hidden md:block">
          <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(11rem,0.7fr)] gap-3">
            <a
              href={resolvedLink.href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[3.45rem] items-center justify-center border border-[rgba(64,52,44,0.9)] bg-[var(--accent-ink)] px-5 py-3 text-[0.95rem] font-semibold text-[var(--paper)] transition-colors duration-200 hover:bg-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.38)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            >
              내 플랫폼에서 찾기
            </a>
            <button
              type="button"
              disabled={!onToggleEngagement}
              onClick={() => onToggleEngagement?.(recommendation.id, "save")}
              className={`flex min-h-[3.45rem] items-center justify-center border px-4 py-3 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] ${
                resolvedEngagement.save
                  ? "border-[rgba(64,52,44,0.8)] bg-[rgba(64,52,44,0.08)] text-[var(--accent-ink)]"
                  : "border-[rgba(64,52,44,0.42)] text-[var(--accent-ink)] hover:bg-[rgba(64,52,44,0.04)]"
              }`}
            >
              {resolvedEngagement.save ? "저장됨 ✓" : "저장하기"}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.86rem] text-[rgba(64,52,44,0.62)]">
            <button
              type="button"
              onClick={handleCopySearchQuery}
              className="font-medium transition-colors duration-200 hover:text-[var(--accent-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            >
              {copyStatus === "copied"
                ? "곡명/아티스트 복사됨"
                : copyStatus === "failed"
                  ? "복사 다시 시도"
                  : "곡명/아티스트 복사"}
            </button>
            <a
              href={recommendation.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium transition-colors duration-200 hover:text-[var(--accent-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
            >
              원본 링크 열기
            </a>
            <button
              type="button"
              disabled={!onToggleEngagement}
              onClick={() => onToggleEngagement?.(recommendation.id, "fire")}
              className={`font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)] ${
                resolvedEngagement.fire
                  ? "text-[var(--primary-strong)]"
                  : "text-[rgba(64,52,44,0.62)] hover:text-[var(--accent-ink)]"
              }`}
            >
              {resolvedEngagement.fire ? "반응함" : "반응하기"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dashed border-[rgba(64,52,44,0.22)] pt-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.5)]">
            <span>{resolvedPlatformLabel}</span>
            <span>fire {recommendation.reactionCount}</span>
            <span>save {recommendation.saveCount}</span>
          </div>
        </div>

        {linkToMember ? (
          <Link
            href={memberProfileHref}
            className="mt-6 flex items-center justify-between border-t border-dashed border-[rgba(64,52,44,0.24)] pt-4 text-[0.98rem] font-medium text-[var(--accent-ink)] transition-colors duration-200 hover:text-[var(--primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(193,88,67,0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]"
          >
            <span>이 사람의 다른 추천 보기</span>
            <span className="font-mono">→</span>
          </Link>
        ) : (
          <div className="mt-6 flex items-center justify-between border-t border-dashed border-[rgba(64,52,44,0.24)] pt-4 text-[0.98rem] font-medium text-[var(--accent-ink)]">
            <span>이 프로필의 추천 흐름 유지</span>
            <span className="font-mono">→</span>
          </div>
        )}
      </article>
    );
  }

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

        <div className="rounded-[1.25rem] border border-white/8 bg-white/3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/38">
              Search handoff
            </p>
            <button
              type="button"
              onClick={handleCopySearchQuery}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/65 transition hover:border-[color:rgba(213,140,116,0.28)] hover:text-white"
            >
              {copyStatus === "copied"
                ? "Copied"
                : copyStatus === "failed"
                  ? "Retry copy"
                  : "Copy query"}
            </button>
          </div>
          <p className="mt-3 text-sm leading-7 text-white/70">{searchQuery}</p>
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
