"use client";

import Link from "next/link";
import { useState } from "react";
import { MemberCard } from "@/components/member-card";
import {
  allGenres,
  members,
  platformLabels,
  sortedRecommendations,
} from "@/lib/mock-data";
import type { MusicPlatform } from "@/lib/types";

const platforms = Array.from(new Set(members.map((member) => member.mainPlatform)));

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

function normalizeMobilePlatformLabel(platform: string): MusicPlatform | null {
  if (platform === "All") {
    return null;
  }

  if (platform === "YouTube") {
    return "youtube_music";
  }

  return platform.toLowerCase().replace(" ", "_") as MusicPlatform;
}

export function MemberDirectoryClient() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] =
    useState<MusicPlatform | null>(null);
  const [showAllGenres, setShowAllGenres] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredMembers = members.filter((member) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      member.nickname.toLowerCase().includes(normalizedQuery);
    const matchesGenre =
      selectedGenre === null || member.favoriteGenres.includes(selectedGenre);
    const matchesPlatform =
      selectedPlatform === null || member.mainPlatform === selectedPlatform;

    return matchesQuery && matchesGenre && matchesPlatform;
  });

  const activeFilters = [
    normalizedQuery.length > 0 ? `Search / ${query.trim()}` : null,
    selectedGenre ? `Genre / ${selectedGenre}` : null,
    selectedPlatform ? `Platform / ${platformLabels[selectedPlatform]}` : null,
  ].filter(Boolean);
  const visibleGenres = showAllGenres ? allGenres : allGenres.slice(0, 8);
  const mobileGenreOptions = ["All", "Jazz", "City Pop", "Electronic", "Post-Punk"];
  const mobilePlatformOptions = ["All", "Spotify", "Apple Music", "YouTube"];

  const memberTrackCounts = members.reduce<Record<string, number>>((counts, member) => {
    counts[member.id] =
      member.sharedTrackCount ??
      sortedRecommendations.filter(
        (recommendation) => recommendation.memberId === member.id,
      ).length;
    return counts;
  }, {});

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--accent-ink)]">
      <div className="md:hidden">
        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-6">
          <div className="flex items-start justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center bg-[var(--accent-ink)] px-3 py-2 font-mono text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--paper)]"
            >
              ONOCHU
            </Link>
            <p className="text-right font-mono text-[0.76rem] uppercase leading-[1.25] tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
              ESTABLISHED 2024
              <br />
              SEOUL / BARCELONA
            </p>
          </div>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-12">
          <ArchiveSectionLabel number="01" label="Club Directory" />
          <h1 className="mt-8 max-w-[8ch] text-[3.2rem] font-bold leading-[0.94] tracking-[-0.08em] text-[var(--accent-ink)]">
            소리부터 사람을 찾아보세요
          </h1>
          <p className="mt-6 max-w-[16rem] text-[1.04rem] leading-[1.72] text-[rgba(64,52,44,0.58)]">
            닉네임, 장르, 플랫폼으로 취향의 결을 좁혀가며 archive 안의 멤버를 탐색합니다.
          </p>
        </section>

        <section className="border-b border-[rgba(64,52,44,0.28)] px-5 py-9">
          <ArchiveSectionLabel number="02" label="Search the Archive" />
          <div className="relative mt-8">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgba(64,52,44,0.42)]"
              fill="none"
            >
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 16l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              id="member-search-mobile"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="닉네임으로 찾기"
              className="w-full border border-[rgba(64,52,44,0.22)] bg-transparent px-12 py-4 text-[1rem] outline-none placeholder:text-[rgba(64,52,44,0.42)]"
            />
          </div>

          <div className="mt-6">
            <p className="font-mono text-[0.76rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
              Genre
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mobileGenreOptions.map((genre) => {
                const isAll = genre === "All";
                const isActive = isAll ? selectedGenre === null : selectedGenre === genre;

                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => setSelectedGenre(isAll ? null : genre)}
                    className={`shrink-0 border px-4 py-3 text-[0.92rem] ${
                      isActive
                        ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                        : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-mono text-[0.76rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
              Platform
            </p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mobilePlatformOptions.map((platform) => {
                const normalizedPlatform = normalizeMobilePlatformLabel(platform);
                const isActive =
                  normalizedPlatform === null
                    ? selectedPlatform === null
                    : selectedPlatform === normalizedPlatform;

                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setSelectedPlatform(normalizedPlatform)}
                    className={`shrink-0 border px-4 py-3 text-[0.92rem] ${
                      isActive
                        ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                        : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                    }`}
                  >
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-0 pb-10 pt-0">
          <div className="border-b border-[rgba(64,52,44,0.28)] px-5 py-6">
            <p className="text-[1.02rem] leading-8 text-[rgba(64,52,44,0.7)]">
              <span className="font-semibold text-[var(--accent-ink)]">
                {filteredMembers.length} members
              </span>{" "}
              currently visible in the archive
            </p>
          </div>

          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                mobileSimple
                sharedTrackCount={memberTrackCounts[member.id]}
              />
            ))
          ) : (
            <div className="border-b border-[rgba(64,52,44,0.18)] px-5 py-10 text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
              검색 조건에 맞는 멤버가 없습니다.
            </div>
          )}
        </section>

        <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-20 h-1.5 bg-[var(--primary-strong)] md:hidden" />
      </div>

      <div className="hidden md:block">
        <main className="min-h-screen bg-[var(--paper)] text-[var(--accent-ink)]">
          <div className="mx-auto max-w-5xl border-x border-[rgba(64,52,44,0.28)] bg-[#EBE6D8]">
            <section className="border-b border-[rgba(64,52,44,0.28)] px-8 py-6">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center bg-[var(--accent-ink)] px-3 py-2 font-mono text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[var(--paper)]"
                >
                  ONOCHU
                </Link>
                <div className="text-right">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
                    MEMBERS
                  </p>
                  <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.48)]">
                    SEOUL / BARCELONA
                  </p>
                </div>
              </div>
            </section>

              <section className="grid border-y border-[rgba(64,52,44,0.28)] lg:grid-cols-[1.15fr_0.85fr]">
                <div className="border-r border-[rgba(64,52,44,0.28)] px-8 py-14">
                  <ArchiveSectionLabel number="01" label="Club Directory" />
                  <h1 className="mt-8 max-w-[8ch] text-[4.8rem] font-bold leading-[0.9] tracking-[-0.09em] text-[var(--accent-ink)]">
                    소리부터 사람을 찾아보세요
                  </h1>
                  <p className="mt-6 max-w-[30rem] text-[1.08rem] leading-[1.8] text-[rgba(64,52,44,0.58)]">
                    닉네임, 장르, 플랫폼 축을 따라 archive 안의 취향 네트워크를 천천히 좁혀볼 수 있게 구성했습니다.
                  </p>
                </div>

                <div className="bg-[rgba(64,52,44,0.03)] px-8 py-14">
                  <div className="grid gap-4">
                    <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                      <p className="text-[2rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                        {members.length}
                      </p>
                      <p className="mt-2 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                        total members
                      </p>
                    </div>
                    <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                      <p className="text-[2rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                        {allGenres.length}
                      </p>
                      <p className="mt-2 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                        genre clusters
                      </p>
                    </div>
                    <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                      <p className="text-[2rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                        {platforms.length}
                      </p>
                      <p className="mt-2 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                        active platforms
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid border-b border-[rgba(64,52,44,0.28)] lg:grid-cols-[1.15fr_0.85fr]">
                <div className="border-r border-[rgba(64,52,44,0.28)] px-8 py-12">
                  <ArchiveSectionLabel number="02" label="Search the Archive" />
                  <div className="relative mt-8">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[rgba(64,52,44,0.42)]"
                      fill="none"
                    >
                      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M16 16l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                      id="member-search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="닉네임으로 찾기"
                      className="w-full border border-[rgba(64,52,44,0.22)] bg-transparent px-12 py-4 text-[1rem] outline-none placeholder:text-[rgba(64,52,44,0.42)]"
                    />
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-mono text-[0.76rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                        Genre
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowAllGenres((current) => !current)}
                        className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[var(--primary-strong)]"
                      >
                        {showAllGenres ? "less" : "more"}
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedGenre(null)}
                        className={`border px-4 py-3 text-[0.92rem] ${
                          selectedGenre === null
                            ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                            : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                        }`}
                      >
                        All
                      </button>
                      {visibleGenres.map((genre) => {
                        const isActive = selectedGenre === genre;

                        return (
                          <button
                            key={genre}
                            type="button"
                            onClick={() => setSelectedGenre(isActive ? null : genre)}
                            className={`border px-4 py-3 text-[0.92rem] ${
                              isActive
                                ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                                : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                            }`}
                          >
                            {genre}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                      Platform
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPlatform(null)}
                        className={`border px-4 py-3 text-[0.92rem] ${
                          selectedPlatform === null
                            ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                            : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                        }`}
                      >
                        All
                      </button>
                      {platforms.map((platform) => {
                        const isActive = selectedPlatform === platform;

                        return (
                          <button
                            key={platform}
                            type="button"
                            onClick={() => setSelectedPlatform(isActive ? null : platform)}
                            className={`border px-4 py-3 text-[0.92rem] ${
                              isActive
                                ? "border-[rgba(64,52,44,0.86)] bg-[var(--accent-ink)] text-[var(--paper)]"
                                : "border-[rgba(64,52,44,0.22)] text-[var(--accent-ink)]"
                            }`}
                          >
                            {platformLabels[platform]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-[rgba(64,52,44,0.03)] px-8 py-12">
                  <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                    <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                      Visible now
                    </p>
                    <p className="mt-3 text-[2rem] font-bold tracking-[-0.05em] text-[var(--accent-ink)]">
                      {filteredMembers.length}
                    </p>
                    <p className="mt-2 text-[0.98rem] leading-7 text-[rgba(64,52,44,0.58)]">
                      현재 조건에 맞는 멤버 수입니다.
                    </p>
                  </div>

                  <div className="mt-4 border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.24)] p-5">
                    <p className="font-mono text-[0.74rem] uppercase tracking-[0.12em] text-[rgba(64,52,44,0.48)]">
                      Active filters
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeFilters.length > 0 ? (
                        activeFilters.map((filter) => (
                          <span
                            key={filter}
                            className="border border-[rgba(64,52,44,0.22)] bg-[rgba(64,52,44,0.04)] px-3 py-2 text-[0.82rem] text-[rgba(64,52,44,0.78)]"
                          >
                            {filter}
                          </span>
                        ))
                      ) : (
                        <span className="border border-[rgba(64,52,44,0.22)] bg-[rgba(64,52,44,0.04)] px-3 py-2 text-[0.82rem] text-[rgba(64,52,44,0.78)]">
                          All profiles
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setSelectedGenre(null);
                        setSelectedPlatform(null);
                      }}
                      className="mt-5 border border-[rgba(64,52,44,0.22)] px-4 py-3 text-[0.9rem] font-medium text-[var(--accent-ink)]"
                    >
                      필터 초기화
                    </button>
                  </div>
                </div>
              </section>

              <section className="px-8 py-10">
                {filteredMembers.length > 0 ? (
                  <div className="grid gap-4 xl:grid-cols-2">
                    {filteredMembers.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        sharedTrackCount={memberTrackCounts[member.id]}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-8 py-10 text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
                    검색 조건에 맞는 멤버가 없습니다.
                  </div>
                )}
              </section>
            </div>
        </main>
      </div>
    </main>
  );
}
