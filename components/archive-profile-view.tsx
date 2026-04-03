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
    <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--primary-strong)]">
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
  const archiveMoreLabel = selfView ? "내 추천 더 보기" : "이 사람의 다른 추천 더 보기";
  const summaryTitle = selfView ? "내 취향" : "이 사람의 취향";
  const conversationTitle = selfView
    ? "이렇게 대화를 시작해보세요"
    : "이 사람과 대화를 시작해보세요";
  const conversationCopy = selfView
    ? "최근 추천 중 이런 곡부터 다시 들어보는 걸 추천합니다"
    : "최근 추천 중 이런 곡부터 들어보는 걸 추천합니다";
  const footerTitle = selfView
    ? "좋은 추천은 나를 더 잘 보이게 합니다"
    : "좋은 추천은 사람을 더 잘 보이게 합니다";
  const footerCopy = selfView ? "내 취향을 다시 따라가보세요" : "이 사람의 취향을 따라가보세요";
  const switchHref = selfView ? `/members/${displayMember.id}` : "/profile/edit";

  return (
    <div className="min-h-screen bg-[#1A1817] px-0 text-[#1A1817] md:px-8 md:py-8">
      <main className="relative mx-auto min-h-screen max-w-[390px] overflow-hidden border border-[#1A1817] bg-[#EBE6D8] md:min-h-[calc(100vh-4rem)] md:rounded-[2rem] md:shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(26, 24, 23, 0.04) 1px, transparent 1px)",
            backgroundSize: "8px 100%",
          }}
        />

        <section className="relative border-b border-[#1A1817] px-6 py-6">
          <div className="flex items-center gap-4">
            {!selfView ? (
              <Link href="/members" className="font-mono text-[1.25rem] leading-none">
                ←
              </Link>
            ) : null}
            <span className="bg-[#1A1817] px-3 py-2 font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#EBE6D8]">
              ONOCHU
            </span>
            <span className="ml-auto font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[#8C867A]">
              PROFILE
            </span>
          </div>
        </section>

        <section className="relative border-b border-[#1A1817] px-6 py-12">
          <h1 className="text-[3.05rem] font-bold leading-[1.05] tracking-[-0.06em]">
            {formatHandle(displayMember)}
          </h1>
          <p className="mt-4 max-w-[17rem] text-[0.98rem] leading-[1.7] text-[#1A1817]">
            {selfView ? displayMember.bio : displayMember.mobileTagline ?? displayMember.bio}
          </p>
        </section>

        <section className="relative border-b border-[#1A1817] px-6 py-10">
          <SectionHeader number="01" label="Taste Summary" />
          <h2 className="mt-6 text-[2.15rem] font-bold leading-[1.05] tracking-[-0.05em]">
            {summaryTitle}
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[#8C867A]">
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {displayMember.favoriteGenres.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="border border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-3 py-2 text-[0.78rem]"
                  >
                    {formatGenreTag(genre)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[#8C867A]">
                Main Platform
              </p>
              <p className="mt-2 text-[1.1rem] font-bold">
                {platformLabels[displayMember.mainPlatform]}
              </p>
            </div>
          </div>
        </section>

        <section className="relative border-b border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-6 py-10">
          <SectionHeader number="02" label="Conversation Starter" />
          <h2 className="mt-6 text-[2.35rem] font-bold leading-[1.05] tracking-[-0.06em]">
            {conversationTitle.split(" ").length > 1 ? (
              <>
                {conversationTitle.includes("대화를")
                  ? "이 사람과 대화를"
                  : "이렇게 대화를"}
                <br />
                {conversationTitle.includes("시작해보세요") ? "시작해보세요" : conversationTitle}
              </>
            ) : (
              conversationTitle
            )}
          </h2>
          <p className="mt-3 text-[0.92rem] text-[#8C867A]">{conversationCopy}</p>

          {featuredRecommendation ? (
            <article className="mt-8 border border-[#1A1817] bg-[#EBE6D8] p-6">
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
                  <h3 className="text-[2rem] font-bold tracking-[-0.05em]">
                    {featuredRecommendation.trackTitle}
                  </h3>
                  <p className="mt-1 text-[1rem] text-[#8C867A]">
                    {featuredRecommendation.artistName}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#1A1817] pt-4">
                <p className="text-[0.82rem] font-semibold text-[#8C867A]">
                  이 곡을 추천한 이유
                </p>
                <p className="mt-2 flex gap-2 text-[0.95rem] leading-7">
                  <span className="font-mono text-[var(--primary-strong)]">→</span>
                  <span>
                    {featuredRecommendation.mobileComment ?? featuredRecommendation.comment}
                  </span>
                </p>
              </div>
            </article>
          ) : null}

          <div className="mt-6 flex flex-col gap-3">
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
        </section>

        <section className="relative border-b border-[#1A1817]">
          <div className="px-6 pb-0 pt-10">
            <SectionHeader number="03" label="Archive" />
            <h2 className="mt-6 text-[2.25rem] font-bold leading-[1.05] tracking-[-0.05em]">
              {archiveTitle}
            </h2>
          </div>

          {archiveRecommendations.length > 0 ? (
            archiveRecommendations.map((recommendation, index) => (
              <article
                key={recommendation.id}
                className={`px-6 py-8 ${index > 0 ? "border-t border-[#1A1817]" : ""}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[#1A1817] bg-[#D9D2C5] font-mono text-[0.68rem] text-[#8C867A]">
                    ART
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[2rem] font-bold tracking-[-0.05em]">
                      {recommendation.trackTitle}
                    </h3>
                    <p className="mt-1 text-[1rem] text-[#8C867A]">
                      {recommendation.artistName}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[0.82rem] font-semibold text-[#8C867A]">
                    이 곡을 추천한 이유
                  </p>
                  <p className="mt-2 flex gap-2 text-[0.95rem] leading-7">
                    <span className="font-mono text-[var(--primary-strong)]">→</span>
                    <span>
                      {recommendation.mobileComment ?? recommendation.comment}
                    </span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {recommendation.moodTags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-2 py-1 text-[0.72rem]"
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
            ))
          ) : (
            <div className="px-6 py-8 text-[0.95rem] text-[#8C867A]">
              아직 남겨진 추천이 없습니다.
            </div>
          )}

          <Link
            href="/recommendations"
            className="flex items-center justify-between border-t border-[#1A1817] px-6 py-6 text-[0.98rem] font-semibold"
          >
            <span>{archiveMoreLabel}</span>
            <span className="font-mono text-[1rem]">→</span>
          </Link>
        </section>

        <section className="relative px-6 pb-28 pt-12">
          <p className="text-[1.15rem] font-semibold leading-8">{footerTitle}</p>
          <p className="mt-2 text-[0.95rem] text-[#8C867A]">{footerCopy}</p>
        </section>

        <Link
          href={switchHref}
          className="absolute bottom-10 right-4 bg-[var(--primary-strong)] px-5 py-3 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#EBE6D8] shadow-[4px_4px_0_#1A1817]"
        >
          SWITCH VIEW ↺
        </Link>

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[var(--primary-strong)]" />
      </main>
    </div>
  );
}
