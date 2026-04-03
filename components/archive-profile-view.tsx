"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStoredProfileDraft } from "@/lib/profile-drafts";
import { platformLabels } from "@/lib/mock-data";
import type {
  MemberProfile,
  PlaylistLink,
  ProfileDraft,
  SongRecommendation,
} from "@/lib/types";

type ArchiveProfileViewProps = {
  member: MemberProfile;
  recommendations: SongRecommendation[];
  selfView?: boolean;
  useStoredProfile?: boolean;
};

const mobileGenreLabelMap: Record<string, string> = {
  Indie: "#인디",
  "City Pop": "#시티팝",
  "Alt R&B": "#R&B",
  "Neo Soul": "#네오소울",
  "Jazz Rap": "#재즈랩",
  Soul: "#소울",
  "UK Garage": "#UK개러지",
  House: "#하우스",
  "Jersey Club": "#저지클럽",
  "Dream Pop": "#드림팝",
  "Indie R&B": "#인디R&B",
  "Lo-fi Hip-hop": "#로파이힙합",
  "Boom Bap": "#붐뱁",
  Trap: "#트랩",
  Hyperpop: "#하이퍼팝",
  Electro: "#일렉트로",
  "Alternative Hip-hop": "#얼터힙합",
  "Live Session": "#라이브세션",
  Ambient: "#앰비언트",
  Downtempo: "#다운템포",
  "Trip-hop": "#트립합",
  Experimental: "#실험음악",
  Bass: "#베이스",
  "Industrial Rap": "#인더스트리얼",
  "R&B": "#R&B",
  Funk: "#펑크",
};

function formatMobileTag(genre: string) {
  if (genre.startsWith("#")) {
    return genre;
  }

  return mobileGenreLabelMap[genre] ?? `#${genre.replace(/\s+/g, "")}`;
}

function formatHandle(member: MemberProfile) {
  return `@${member.nickname.toLowerCase().replace(/\s+/g, "_") || member.id}`;
}

function formatMobileDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(value))
    .replace(/\.\s/g, ".")
    .replace(/\.$/, "");
}

function createStoredPlaylistLinks(
  playlistLinks: string[],
  mainPlatform: MemberProfile["mainPlatform"],
): PlaylistLink[] {
  return playlistLinks.map((url, index) => ({
    label: index === 0 ? `${platformLabels[mainPlatform]} Playlist` : `Playlist ${index + 1}`,
    url,
  }));
}

function ArchiveSectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[var(--primary-strong)]">
      <span>{number}</span>
      <span className="h-px w-10 bg-[var(--primary-strong)]" />
      <span>{label}</span>
    </div>
  );
}

export function ArchiveProfileView({
  member,
  recommendations,
  selfView = false,
  useStoredProfile = false,
}: ArchiveProfileViewProps) {
  const [storedProfileDraft, setStoredProfileDraft] = useState<ProfileDraft | null>(
    null,
  );

  useEffect(() => {
    if (!useStoredProfile) {
      return;
    }

    const storedState = loadStoredProfileDraft({
      nickname: member.nickname,
      bio: member.bio,
      favoriteGenres: member.favoriteGenres,
      mainPlatform: member.mainPlatform,
      playlistLinks: member.playlistLinks.map((playlistLink) => playlistLink.url),
    });

    const hydrationFrame = window.requestAnimationFrame(() => {
      setStoredProfileDraft(storedState.draft);
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [member, useStoredProfile]);

  const displayMember: MemberProfile =
    storedProfileDraft && useStoredProfile
      ? {
          ...member,
          nickname: storedProfileDraft.nickname,
          bio: storedProfileDraft.bio,
          favoriteGenres:
            storedProfileDraft.favoriteGenres.length > 0
              ? storedProfileDraft.favoriteGenres
              : member.favoriteGenres,
          mainPlatform: storedProfileDraft.mainPlatform,
          playlistLinks:
            storedProfileDraft.playlistLinks.length > 0
              ? createStoredPlaylistLinks(
                  storedProfileDraft.playlistLinks,
                  storedProfileDraft.mainPlatform,
                )
              : member.playlistLinks,
        }
      : member;

  const featuredRecommendation = recommendations[0];
  const archiveRecommendations = recommendations.slice(0, 2);
  const primaryHref = selfView ? "/profile/edit" : "/recommendations/new";
  const primaryLabel = selfView ? "프로필 수정하기" : "추천으로 답장하기";
  const playlistHref = displayMember.playlistLinks[0]?.url || "/recommendations";
  const playlistIsExternal = playlistHref.startsWith("http");
  const archiveTitle = selfView ? "내가 남긴 추천" : "이 사람이 남긴 추천";
  const archiveMoreLabel = selfView
    ? "추천 피드에서 이어보기"
    : "이 사람의 다른 추천 더 보기";
  const summaryTitle = selfView ? "내 취향" : "이 사람의 취향";
  const conversationTitle = selfView
    ? "이렇게 대화를 시작해보세요"
    : "이 사람과 대화를 시작해보세요";
  const conversationCopy = selfView
    ? "내가 남긴 추천 중 이런 곡부터 다시 들어보면 됩니다"
    : "최근 추천 중 이런 곡부터 들어보는 걸 추천합니다";
  const footerTitle = selfView
    ? "취향은 쌓일수록 더 선명해집니다"
    : "좋은 추천은 사람을 더 잘 보이게 합니다";
  const footerCopy = selfView
    ? "내가 남긴 곡과 링크가 다음 대화의 시작점이 됩니다"
    : "이 사람의 취향을 따라가보세요";

  return (
    <div className="relative min-h-screen bg-[#EBE6D8] text-[#1A1817] md:px-6 md:py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(26, 24, 23, 0.04) 1px, transparent 1px)",
          backgroundSize: "8px 100%",
        }}
      />

      <main className="mobile-screen bg-[var(--paper)] pb-14 text-[var(--accent-ink)] md:mx-auto md:max-w-5xl md:overflow-hidden md:border md:border-[#1A1817] md:bg-[#EBE6D8] md:pb-20 md:shadow-[0_24px_60px_rgba(26,24,23,0.08)]">
      <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-6 md:px-8 md:py-7">
        <div className="flex items-start gap-4">
          <Link
            href={selfView ? "/" : "/members"}
            className="pt-0.5 font-mono text-[1.4rem] text-[var(--accent-ink)]"
          >
            ←
          </Link>
          <span className="bg-[var(--accent-ink)] px-3 py-2 font-mono text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--paper)]">
            ONOCHU
          </span>
          <p className="ml-auto pt-1 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
            PROFILE
          </p>
        </div>
      </section>

      <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-12 md:px-8 md:py-14 lg:px-10">
        <h1 className="text-[3rem] font-bold leading-[0.96] tracking-[-0.08em] text-[var(--accent-ink)]">
          {formatHandle(displayMember)}
        </h1>
        <p className="mt-6 max-w-[17rem] text-[1.04rem] leading-[1.7] text-[rgba(64,52,44,0.76)] md:max-w-[31rem] md:text-[1.08rem]">
          {selfView ? displayMember.bio : displayMember.mobileTagline ?? displayMember.bio}
        </p>
      </section>

      <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <ArchiveSectionLabel number="01" label="Taste Summary" />
        <h2 className="mt-8 text-[2.15rem] font-bold leading-[1.02] tracking-[-0.07em]">
          {summaryTitle}
        </h2>

        <div className="mt-8 space-y-6 md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(13rem,0.75fr)] md:gap-10 md:space-y-0">
          <div>
            <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[rgba(64,52,44,0.38)]">
              Tags
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {displayMember.favoriteGenres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="border border-[rgba(64,52,44,0.28)] bg-[rgba(64,52,44,0.04)] px-3 py-2 text-[0.96rem] text-[var(--accent-ink)]"
                >
                  {formatMobileTag(genre)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-[rgba(64,52,44,0.38)]">
              Main Platform
            </p>
            <p className="mt-2 text-[1.7rem] font-semibold text-[var(--accent-ink)]">
              {platformLabels[displayMember.mainPlatform]}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[rgba(64,52,44,0.28)] bg-[rgba(64,52,44,0.04)] px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <ArchiveSectionLabel number="02" label="Conversation Starter" />
        <h2 className="mt-8 max-w-[8ch] text-[2.35rem] font-bold leading-[1] tracking-[-0.07em]">
          {conversationTitle}
        </h2>
        <p className="mt-4 max-w-[32rem] text-[1rem] leading-7 text-[rgba(64,52,44,0.52)]">
          {conversationCopy}
        </p>

        {featuredRecommendation ? (
          <article className="mt-8 border border-[rgba(64,52,44,0.28)] bg-[var(--paper)] p-5 md:max-w-3xl md:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="bg-[var(--accent-ink)] px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-[var(--paper)]">
                {featuredRecommendation.id.replace("rec-", "REC. ").toUpperCase()}
              </span>
              <span className="font-mono text-[0.72rem] tracking-[0.04em] text-[rgba(64,52,44,0.48)]">
                {formatMobileDate(featuredRecommendation.createdAt)}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[var(--accent-ink)] text-[0.72rem] font-mono text-[var(--paper)]">
                TRK
              </div>
              <div className="min-w-0">
                <h3 className="text-[1.9rem] font-bold tracking-[-0.06em] text-[var(--accent-ink)]">
                  {featuredRecommendation.trackTitle}
                </h3>
                <p className="mt-1 text-[1rem] text-[rgba(64,52,44,0.58)]">
                  {featuredRecommendation.artistName}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-[rgba(64,52,44,0.24)] pt-4">
              <p className="text-[0.88rem] font-medium text-[rgba(64,52,44,0.56)]">
                이 곡을 추천한 이유
              </p>
              <p className="mt-2 flex items-start gap-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.92)]">
                <span className="font-mono text-[var(--primary-strong)]">→</span>
                <span>
                  {featuredRecommendation.mobileComment ?? featuredRecommendation.comment}
                </span>
              </p>
            </div>
          </article>
        ) : null}

        <div className="mt-6 grid gap-3 md:max-w-3xl md:grid-cols-2">
          <Link
            href={primaryHref}
            className="flex min-h-[4rem] items-center justify-between border border-[rgba(64,52,44,0.9)] bg-[var(--accent-ink)] px-5 py-4 text-[1rem] font-semibold text-[var(--paper)]"
          >
            <span>{primaryLabel}</span>
            <span className="font-mono text-[1.05rem]">→</span>
          </Link>

          <a
            href={playlistHref}
            target={playlistIsExternal ? "_blank" : undefined}
            rel={playlistIsExternal ? "noreferrer" : undefined}
            className="flex min-h-[4rem] items-center justify-between border border-[rgba(64,52,44,0.7)] border-b-[3px] border-b-[rgba(64,52,44,0.9)] bg-transparent px-5 py-4 text-[1rem] font-semibold text-[var(--accent-ink)]"
          >
            <span>플레이리스트 보기</span>
            <span className="font-mono text-[1.05rem]">↘</span>
          </a>
        </div>
      </section>

      <section className="border-b border-[rgba(64,52,44,0.28)]">
        <div className="px-5 py-10 md:px-8 md:py-12 lg:px-10">
          <ArchiveSectionLabel number="03" label="Archive" />
          <h2 className="mt-8 max-w-[8ch] text-[2.2rem] font-bold leading-[1] tracking-[-0.07em]">
            {archiveTitle}
          </h2>
        </div>

        {archiveRecommendations.length > 0 ? (
          <div className="md:grid md:grid-cols-2">
          {archiveRecommendations.map((recommendation) => (
            <article
              key={recommendation.id}
              className="border-t border-[rgba(64,52,44,0.18)] px-5 py-8 text-[var(--accent-ink)] md:px-8 md:py-10 lg:px-10"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[rgba(64,52,44,0.24)] bg-[rgba(217,210,197,0.7)] text-[0.72rem] font-mono text-[rgba(64,52,44,0.42)]">
                  ART
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.9rem] font-bold tracking-[-0.06em] text-[var(--accent-ink)]">
                    {recommendation.trackTitle}
                  </h3>
                  <p className="mt-1 text-[1rem] text-[rgba(64,52,44,0.58)]">
                    {recommendation.artistName}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[0.88rem] font-medium text-[rgba(64,52,44,0.56)]">
                  이 곡을 추천한 이유
                </p>
                <p className="mt-2 flex items-start gap-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.92)]">
                  <span className="font-mono text-[var(--primary-strong)]">→</span>
                  <span>
                    {recommendation.mobileComment ?? recommendation.comment}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {recommendation.moodTags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.04)] px-2 py-1 text-[0.82rem] text-[rgba(64,52,44,0.84)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-dashed border-[rgba(64,52,44,0.24)] pt-4 font-mono text-[0.92rem] text-[rgba(64,52,44,0.56)]">
                <span>🔥 {recommendation.reactionCount}</span>
                <span>|</span>
                <span>저장 {recommendation.saveCount}</span>
              </div>
            </article>
          ))}
          </div>
        ) : (
          <div className="border-t border-[rgba(64,52,44,0.18)] px-5 py-8 text-[1rem] text-[rgba(64,52,44,0.56)] md:px-8 lg:px-10">
            아직 남겨진 추천이 없습니다.
          </div>
        )}

        <Link
          href="/recommendations"
          className="flex items-center justify-between border-t border-[rgba(64,52,44,0.18)] px-5 py-6 text-[1rem] font-medium text-[var(--accent-ink)] md:px-8 lg:px-10"
        >
          <span>{archiveMoreLabel}</span>
          <span className="font-mono">→</span>
        </Link>
      </section>

      <section className="px-5 pb-24 pt-12 md:px-8 lg:px-10">
        <p className="text-[1.2rem] font-semibold leading-8 text-[var(--accent-ink)]">
          {footerTitle}
        </p>
        <p className="mt-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.52)]">
          {footerCopy}
        </p>
      </section>
    </main>
    </div>
  );
}
