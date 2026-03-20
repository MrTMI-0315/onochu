"use client";

import { useState } from "react";
import { MemberCard } from "@/components/member-card";
import { allGenres, members, platformLabels } from "@/lib/mock-data";
import type { MusicPlatform } from "@/lib/types";

const platforms = Array.from(new Set(members.map((member) => member.mainPlatform)));

export function MemberDirectoryClient() {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] =
    useState<MusicPlatform | null>(null);

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

  return (
    <div className="space-y-8">
      <section className="onochu-panel rounded-[2rem] p-6 md:p-7">
        <div className="grid gap-8 xl:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-4">
            <span className="onochu-eyebrow">Search the archive</span>
            <h2 className="onochu-display text-5xl font-bold uppercase text-white md:text-6xl">
              {filteredMembers.length}
            </h2>
            <p className="text-sm leading-7 text-white/65">
              현재 보이는 프로필 수입니다. 닉네임 검색과 취향 필터를
              조합해서 원하는 curator cluster를 빠르게 좁힐 수 있습니다.
            </p>

            <div className="rounded-[1.5rem] bg-white/4 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Active filters
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeFilters.length > 0 ? (
                  activeFilters.map((filter) => (
                    <span
                      key={filter}
                      className="onochu-chip-active rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
                    >
                      {filter}
                    </span>
                  ))
                ) : (
                  <span className="onochu-chip rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                    All profiles
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-black/20 p-4">
              <label
                htmlFor="member-search"
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45"
              >
                Nickname search
              </label>
              <input
                id="member-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Kai, Yuri, Min..."
                className="mt-3 w-full rounded-[1rem] border border-white/8 bg-[#111111] px-4 py-4 text-sm text-white outline-none placeholder:text-white/28"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Genre filter
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedGenre(null)}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#de8eff]"
                >
                  Reset
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedGenre(null)}
                  className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    selectedGenre === null ? "onochu-chip-active" : "onochu-chip"
                  }`}
                >
                  All
                </button>
                {allGenres.map((genre) => {
                  const isActive = selectedGenre === genre;

                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedGenre(isActive ? null : genre)}
                      className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        isActive ? "onochu-chip-active" : "onochu-chip"
                      }`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Platform filter
                </h2>
                <button
                  type="button"
                  onClick={() => setSelectedPlatform(null)}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#de8eff]"
                >
                  Reset
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform(null)}
                  className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    selectedPlatform === null
                      ? "onochu-chip-active"
                      : "onochu-chip"
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
                      onClick={() =>
                        setSelectedPlatform(isActive ? null : platform)
                      }
                      className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        isActive ? "onochu-chip-active" : "onochu-chip"
                      }`}
                    >
                      {platformLabels[platform]}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedGenre(null);
                setSelectedPlatform(null);
              }}
              className="rounded-full border border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[#de8eff]/40 hover:text-white"
            >
              Clear all filters
            </button>
          </div>
        </div>
      </section>

      {filteredMembers.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </section>
      ) : (
        <section className="onochu-panel rounded-[2rem] p-10 text-center">
          <h2 className="onochu-display text-3xl font-bold uppercase text-white">
            No matching profiles
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/55">
            검색어를 지우거나 장르, 플랫폼 조합을 바꾸면 더 넓은 profile
            cluster를 다시 볼 수 있습니다.
          </p>
        </section>
      )}
    </div>
  );
}
