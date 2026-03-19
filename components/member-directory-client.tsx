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
    normalizedQuery.length > 0 ? `search: ${query.trim()}` : null,
    selectedGenre ? `genre: ${selectedGenre}` : null,
    selectedPlatform ? `platform: ${platformLabels[selectedPlatform]}` : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="member-search"
                className="text-sm font-semibold text-white"
              >
                Nickname search
              </label>
              <input
                id="member-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="예: Kai, Yuri"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none placeholder:text-stone-500"
              />
            </div>

            <div className="rounded-3xl border border-cyan-200/10 bg-cyan-200/5 p-4">
              <h2 className="text-sm font-semibold text-white">Current result</h2>
              <p className="mt-2 text-sm leading-7 text-stone-300">
                {filteredMembers.length} / {members.length} members shown
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeFilters.length > 0 ? (
                  activeFilters.map((filter) => (
                    <span
                      key={filter}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-stone-100"
                    >
                      {filter}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-stone-300">
                    no active filters
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-white">Genre filter</h2>
                {selectedGenre ? (
                  <button
                    type="button"
                    onClick={() => setSelectedGenre(null)}
                    className="text-xs text-lime-200 underline"
                  >
                    clear genre
                  </button>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {allGenres.map((genre) => {
                  const isActive = selectedGenre === genre;

                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedGenre(isActive ? null : genre)}
                      className={`rounded-full px-3 py-2 text-xs transition ${
                        isActive
                          ? "bg-lime-300 text-stone-950"
                          : "bg-stone-100/10 text-stone-200 hover:bg-stone-100/15"
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
                <h2 className="text-sm font-semibold text-white">
                  Platform filter
                </h2>
                {selectedPlatform ? (
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform(null)}
                    className="text-xs text-lime-200 underline"
                  >
                    clear platform
                  </button>
                ) : null}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {platforms.map((platform) => {
                  const isActive = selectedPlatform === platform;

                  return (
                    <button
                      key={platform}
                      type="button"
                      onClick={() =>
                        setSelectedPlatform(isActive ? null : platform)
                      }
                      className={`rounded-full px-3 py-2 text-xs transition ${
                        isActive
                          ? "bg-cyan-200 text-stone-950"
                          : "bg-cyan-200/10 text-cyan-100 hover:bg-cyan-200/20"
                      }`}
                    >
                      {platformLabels[platform]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedGenre(null);
                  setSelectedPlatform(null);
                }}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-stone-200 transition hover:border-lime-300 hover:text-lime-200"
              >
                Clear all filters
              </button>
            </div>
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
        <section className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-10 text-center">
          <h2 className="text-lg font-semibold text-white">No matching members</h2>
          <p className="mt-3 text-sm leading-7 text-stone-400">
            검색어를 지우거나 장르, 플랫폼 필터를 다시 조합해 보세요.
          </p>
        </section>
      )}
    </div>
  );
}
