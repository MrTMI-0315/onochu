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

const genreLabelMap: Record<string, string> = {
  Indie: "#인디",
  "City Pop": "#시티팝",
  "Alt R&B": "#R&B",
  "Neo Soul": "#R&B",
  "Jazz Rap": "#재즈",
  Soul: "#소울",
  "UK Garage": "#UK개러지",
  House: "#하우스",
  "Jersey Club": "#저지클럽",
  "Dream Pop": "#드림팝",
  "Indie R&B": "#인디R&B",
  "Lo-fi Hip-hop": "#로파이",
  "Boom Bap": "#붐뱁",
  Trap: "#트랩",
  Hyperpop: "#하이퍼팝",
  Electro: "#일렉트로니카",
  "Alternative Hip-hop": "#힙합",
  "Live Session": "#라이브",
  Ambient: "#앰비언트",
  Downtempo: "#다운템포",
  "Trip-hop": "#트립합",
  Experimental: "#실험음악",
  Bass: "#베이스",
  "Industrial Rap": "#인더스트리얼",
  "R&B": "#R&B",
  Funk: "#펑크",
};

function formatGenreTag(genre: string) {
  if (genre.startsWith("#")) {
    return genre;
  }

  return genreLabelMap[genre] ?? `#${genre.replace(/\s+/g, "")}`;
}

function formatHandle(member: MemberProfile) {
  return `@${member.nickname.toLowerCase().replace(/\s+/g, "_") || member.id}`;
}

function formatDate(value: string) {
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
    label:
      index === 0
        ? `${platformLabels[mainPlatform]} Playlist`
        : `Playlist ${index + 1}`,
    url,
  }));
}

function SectionHeader({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-[var(--primary-strong)]">
      <span>{number}</span>
      <span className="h-px w-10 bg-[var(--primary-strong)]" />
      <span>{label}</span>
    </div>
  );
}

function ProfileArchiveCard({
  recommendation,
}: {
  recommendation: SongRecommendation;
}) {
  return (
    <article className="border-b border-[rgba(26,24,23,0.18)] px-6 py-8 last:border-b-0 md:px-8">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#1A1817] bg-[rgba(64,52,44,0.06)] font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.4)]">
          ART
        </div>
        <div className="min-w-0">
          <h3 className="text-[2rem] font-bold leading-none tracking-[-0.05em] text-[#1A1817]">
            {recommendation.trackTitle}
          </h3>
          <p className="mt-2 text-[1rem] text-[#8C867A]">
            {recommendation.artistName}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[0.84rem] font-semibold text-[#8C867A]">
          이 곡을 추천한 이유
        </p>
        <p className="mt-2 flex gap-2 text-[0.98rem] leading-7 text-[#1A1817]">
          <span className="font-mono text-[var(--primary-strong)]">→</span>
          <span>{recommendation.mobileComment ?? recommendation.comment}</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {recommendation.moodTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="border border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-2 py-1 text-[0.72rem] text-[#1A1817]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-dashed border-[#1A1817] pt-4 font-mono text-[0.84rem] text-[#8C867A]">
        <span>🔥 {recommendation.reactionCount}</span>
        <span>|</span>
        <span>저장 {recommendation.saveCount}</span>
      </div>
    </article>
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
  const profileLabel = selfView ? "MY PROFILE" : "PROFILE";
  const summaryTitle = selfView ? "내 취향" : "이 사람의 취향";
  const archiveTitle = selfView ? "내가 남긴 추천" : "이 사람이 남긴 추천";
  const archiveMoreLabel = selfView ? "내 추천 더 보기" : "이 사람의 다른 추천 더 보기";
  const footerTitle = selfView
    ? "좋은 추천은 나를 더 잘 보이게 합니다"
    : "좋은 추천은 사람을 더 잘 보이게 합니다";
  const footerCopy = selfView ? "내 취향을 다시 따라가보세요" : "이 사람의 취향을 따라가보세요";
  const primaryHref = selfView ? "/profile/edit" : "/recommendations/new";
  const primaryLabel = selfView ? "프로필 수정하기" : "추천으로 답장하기";
  const playlistHref = displayMember.playlistLinks[0]?.url || "/recommendations";
  const playlistIsExternal = playlistHref.startsWith("http");
  const switchHref = selfView ? `/members/${displayMember.id}` : "/profile";

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[#1A1817]">
      <div className="mx-auto max-w-5xl border-x border-[rgba(26,24,23,0.18)] bg-[#EBE6D8]">
        <section className="border-b border-[#1A1817] px-6 py-6 md:px-8">
          <div className="flex items-center gap-4">
            {!selfView ? (
              <Link href="/members" className="font-mono text-[1.15rem] leading-none">
                ←
              </Link>
            ) : null}
            <span className="bg-[#1A1817] px-2 py-1 font-mono text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[#EBE6D8]">
              ONOCHU
            </span>
            <span className="ml-auto font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[#8C867A]">
              {profileLabel}
            </span>
          </div>
        </section>

        <section className="border-b border-[#1A1817] px-6 py-12 md:px-8 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <h1 className="max-w-[8ch] text-[3.2rem] font-bold leading-[0.95] tracking-[-0.07em] md:text-[4.9rem]">
                {formatHandle(displayMember)}
              </h1>
              <p className="mt-5 max-w-[24rem] text-[1rem] leading-[1.75] text-[#1A1817] md:text-[1.08rem]">
                {selfView ? displayMember.bio : displayMember.mobileTagline ?? displayMember.bio}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-1">
              <div className="border border-[rgba(26,24,23,0.18)] bg-[rgba(64,52,44,0.03)] p-5">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#8C867A]">
                  Main Platform
                </p>
                <p className="mt-3 text-[1.8rem] font-bold tracking-[-0.05em]">
                  {platformLabels[displayMember.mainPlatform]}
                </p>
              </div>
              <div className="border border-[rgba(26,24,23,0.18)] bg-[rgba(64,52,44,0.03)] p-5">
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#8C867A]">
                  Archive Count
                </p>
                <p className="mt-3 text-[1.8rem] font-bold tracking-[-0.05em]">
                  {recommendations.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1A1817] px-6 py-10 md:px-8 md:py-10">
          <SectionHeader number="01" label="Taste Summary" />
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_0.7fr]">
            <div>
              <h2 className="text-[2.25rem] font-bold leading-[1.03] tracking-[-0.05em] md:text-[3rem]">
                {summaryTitle}
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {displayMember.favoriteGenres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="border border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-3 py-2 text-[0.82rem]"
                  >
                    {formatGenreTag(genre)}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-[rgba(26,24,23,0.18)] bg-[rgba(64,52,44,0.03)] p-5">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[#8C867A]">
                Playlist
              </p>
              <p className="mt-3 text-[1rem] leading-7 text-[#1A1817]">
                {displayMember.playlistLinks[0]?.label ?? "Playlist link ready"}
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-6 py-10 md:px-8 md:py-10">
          <SectionHeader number="02" label="Conversation Starter" />
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <h2 className="max-w-[9ch] text-[2.45rem] font-bold leading-[1.03] tracking-[-0.06em] md:text-[3.2rem]">
                이 사람과 대화를 시작해보세요
              </h2>
              <p className="mt-4 text-[0.96rem] leading-7 text-[#8C867A]">
                최근 추천 중 이런 곡부터 들어보는 걸 추천합니다
              </p>
            </div>

            <div>
              {featuredRecommendation ? (
                <article className="border border-[#1A1817] bg-[#EBE6D8] p-6 md:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="bg-[#1A1817] px-3 py-1.5 font-mono text-[0.68rem] text-[#EBE6D8]">
                      {featuredRecommendation.id.replace("rec-", "REC. ").toUpperCase()}
                    </span>
                    <span className="font-mono text-[0.68rem] text-[#8C867A]">
                      {formatDate(featuredRecommendation.createdAt)}
                    </span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-[#1A1817] font-mono text-[0.68rem] text-[#EBE6D8]">
                      TRK
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[1.9rem] font-bold leading-none tracking-[-0.05em]">
                        {featuredRecommendation.trackTitle}
                      </h3>
                      <p className="mt-2 text-[1rem] text-[#8C867A]">
                        {featuredRecommendation.artistName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#1A1817] pt-4">
                    <p className="text-[0.82rem] font-semibold text-[#8C867A]">
                      이 곡을 추천한 이유
                    </p>
                    <p className="mt-2 flex gap-2 text-[0.96rem] leading-7">
                      <span className="font-mono text-[var(--primary-strong)]">→</span>
                      <span>
                        {featuredRecommendation.mobileComment ?? featuredRecommendation.comment}
                      </span>
                    </p>
                  </div>
                </article>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 md:max-w-[24rem]">
                <Link
                  href={primaryHref}
                  className="flex items-center justify-between border border-[#1A1817] bg-[#1A1817] px-5 py-4 text-[1rem] font-semibold text-[#EBE6D8]"
                >
                  <span>{primaryLabel}</span>
                  <span className="font-mono text-[1rem]">→</span>
                </Link>
                <a
                  href={playlistHref}
                  target={playlistIsExternal ? "_blank" : undefined}
                  rel={playlistIsExternal ? "noreferrer" : undefined}
                  className="flex items-center justify-between border border-[#1A1817] border-b-[4px] border-b-[#1A1817] bg-transparent px-5 py-4 text-[1rem] font-semibold"
                >
                  <span>플레이리스트 보기</span>
                  <span className="font-mono text-[1rem]">↘</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[#1A1817]">
          <div className="px-6 pt-10 md:px-8 md:pt-10">
            <SectionHeader number="03" label="Archive" />
            <h2 className="mt-6 text-[2.3rem] font-bold leading-[1.03] tracking-[-0.05em] md:text-[3rem]">
              {archiveTitle}
            </h2>
          </div>

          {archiveRecommendations.length > 0 ? (
            archiveRecommendations.map((recommendation) => (
              <ProfileArchiveCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))
          ) : (
            <div className="px-6 py-8 text-[0.95rem] text-[#8C867A] md:px-8">
              아직 남겨진 추천이 없습니다.
            </div>
          )}

          <Link
            href="/recommendations"
            className="flex items-center justify-between border-t border-[#1A1817] px-6 py-6 text-[0.98rem] font-semibold md:px-8"
          >
            <span>{archiveMoreLabel}</span>
            <span className="font-mono text-[1rem]">→</span>
          </Link>
        </section>

        <section className="px-6 pb-24 pt-12 md:px-8 md:pb-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[1.18rem] font-semibold leading-8">{footerTitle}</p>
              <p className="mt-2 text-[0.96rem] text-[#8C867A]">{footerCopy}</p>
            </div>

            <Link
              href={switchHref}
              className="w-fit bg-[var(--primary-strong)] px-5 py-3 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#EBE6D8] shadow-[4px_4px_0_#1A1817]"
            >
              SWITCH VIEW ↺
            </Link>
          </div>
        </section>

        <div className="h-1.5 bg-[var(--primary-strong)]" />
      </div>
    </main>
  );
}
