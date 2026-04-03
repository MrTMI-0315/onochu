"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import {
  createProfileDraft,
  loadStoredProfileDraft,
  persistStoredProfileDraft,
} from "@/lib/profile-drafts";
import { platformLabels } from "@/lib/mock-data";
import type { MusicPlatform } from "@/lib/types";

type ProfileEditFormProps = {
  initialNickname: string;
  initialBio: string;
  initialFavoriteGenres: string[];
  initialMainPlatform: MusicPlatform;
  initialPlaylistLinks: string[];
  mobileStandalone?: boolean;
};

type FormErrors = {
  nickname?: string;
  mainPlatform?: string;
  playlistLinks?: string;
};

const referenceGenres = [
  { key: "Indie", label: "#인디" },
  { key: "City Pop", label: "#시티팝" },
  { key: "R&B", label: "#R&B" },
  { key: "Jazz", label: "#재즈" },
  { key: "Rock/Metal", label: "#록/메탈" },
  { key: "Electronic", label: "#일렉트로니카" },
  { key: "K-Pop", label: "#K-Pop" },
] as const;

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

export function ProfileEditForm({
  initialNickname,
  initialBio,
  initialFavoriteGenres,
  initialMainPlatform,
  initialPlaylistLinks,
}: ProfileEditFormProps) {
  const [nickname, setNickname] = useState(initialNickname);
  const [bio, setBio] = useState(initialBio);
  const [mainPlatform, setMainPlatform] =
    useState<MusicPlatform>(initialMainPlatform);
  const [playlistLinks, setPlaylistLinks] = useState(
    initialPlaylistLinks.length > 0 ? initialPlaylistLinks : [""],
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialFavoriteGenres,
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedState = loadStoredProfileDraft({
      nickname: initialNickname,
      bio: initialBio,
      favoriteGenres: initialFavoriteGenres,
      mainPlatform: initialMainPlatform,
      playlistLinks: initialPlaylistLinks,
    });

    const hydrationFrame = window.requestAnimationFrame(() => {
      setNickname(storedState.draft.nickname);
      setBio(storedState.draft.bio);
      setSelectedGenres(storedState.draft.favoriteGenres);
      setMainPlatform(storedState.draft.mainPlatform);
      setPlaylistLinks(
        storedState.draft.playlistLinks.length > 0
          ? storedState.draft.playlistLinks
          : initialPlaylistLinks.length > 0
            ? initialPlaylistLinks
            : [""],
      );
    });

    return () => {
      window.cancelAnimationFrame(hydrationFrame);
    };
  }, [
    initialBio,
    initialFavoriteGenres,
    initialMainPlatform,
    initialNickname,
    initialPlaylistLinks,
  ]);

  const platformOrder: MusicPlatform[] = [
    "spotify",
    "apple_music",
    "youtube_music",
    "soundcloud",
  ];
  const renderedPlatforms: MusicPlatform[] =
    mainPlatform === "melon" ? [...platformOrder, "melon"] : platformOrder;

  function toggleGenre(genre: string) {
    setSelectedGenres((currentGenres) =>
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre],
    );
  }

  function validateForm(): FormErrors {
    const nextErrors: FormErrors = {};
    const normalizedLinks = playlistLinks
      .map((link) => link.trim())
      .filter((link) => link.length > 0);

    if (nickname.trim().length === 0) {
      nextErrors.nickname = "닉네임은 비워둘 수 없습니다.";
    }

    if (!mainPlatform) {
      nextErrors.mainPlatform = "주 사용 플랫폼을 선택해야 합니다.";
    }

    if (normalizedLinks.length === 0) {
      nextErrors.playlistLinks = "플레이리스트 링크는 최소 1개 필요합니다.";
    } else if (
      normalizedLinks.some((link) => {
        try {
          new URL(link);
          return false;
        } catch {
          return true;
        }
      })
    ) {
      nextErrors.playlistLinks = "플레이리스트 링크는 올바른 URL 형식이어야 합니다.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSaveMessage("필수 입력값과 링크 형식을 먼저 확인해 주세요.");
      return;
    }

    setIsSaving(true);
    setSaveMessage(null);

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    startTransition(() => {
      persistStoredProfileDraft(
        createProfileDraft({
          nickname: nickname.trim(),
          bio: bio.trim(),
          favoriteGenres: selectedGenres,
          mainPlatform,
          playlistLinks: playlistLinks
            .map((link) => link.trim())
            .filter((link) => link.length > 0),
        }),
      );

      setErrors({});
      setSaveMessage("저장되었습니다. 이제 추천을 남기고, 다른 사람의 취향도 이어서 볼 수 있습니다.");
    });

    setIsSaving(false);
  }

  return (
    <div className="min-h-screen bg-[#1A1817] px-0 text-[#1A1817] md:px-8 md:py-8">
      <section className="relative mx-auto min-h-screen max-w-[390px] overflow-hidden border border-[#1A1817] bg-[#EBE6D8] md:min-h-[calc(100vh-4rem)] md:rounded-[2rem] md:shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(26, 24, 23, 0.04) 1px, transparent 1px)",
            backgroundSize: "8px 100%",
          }}
        />

        <form onSubmit={handleSubmit} className="relative">
          <header className="border-b border-[#1A1817] px-6 py-6">
            <div className="flex items-start justify-between gap-4">
              <span className="bg-[#1A1817] px-3 py-2 font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-[#EBE6D8]">
                ONOCHU
              </span>
              <p className="text-right font-mono text-[0.72rem] uppercase leading-[1.25] tracking-[0.08em] text-[#8C867A]">
                ESTABLISHED 2024
                <br />
                SEOUL / BARCELONA
              </p>
            </div>
          </header>

          <section className="border-b border-[#1A1817] px-6 py-12">
            <h1 className="max-w-[7ch] text-[3.15rem] font-bold leading-[1.02] tracking-[-0.07em]">
              내 취향을
              <br />
              남겨보세요
            </h1>
            <p className="mt-4 max-w-[17rem] text-[0.98rem] leading-[1.7] text-[#8C867A]">
              닉네임, 플랫폼, 링크 하나면 충분합니다
              <br />
              여기서부터 취향이 쌓이기 시작합니다
            </p>
          </section>

          <section className="border-b border-[#1A1817] bg-[#1A1817] px-6 py-8 text-[#EBE6D8]">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em]">
              NOTICE
            </p>
            <p className="mt-3 text-[0.95rem] font-medium leading-7 text-[rgba(235,230,216,0.9)]">
              처음이라면 간단하게 시작하세요
              <br />
              완벽하게 채우지 않아도 괜찮습니다
            </p>
          </section>

          <section className="border-b border-[#1A1817] px-6 py-10">
            <SectionHeader number="01" label="Profile Info" />

            <div className="mt-8 space-y-8">
              <label className="block">
                <span className="mb-3 block text-[1rem] font-semibold">닉네임</span>
                <input
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="다른 멤버들이 부를 이름"
                  className="w-full rounded-none border border-[#1A1817] bg-transparent px-4 py-4 text-[1rem] outline-none placeholder:text-[#9A9387]"
                />
                {errors.nickname ? (
                  <span className="mt-2 block text-sm text-[#C15843]">
                    {errors.nickname}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-3 block text-[1rem] font-semibold">한 줄 소개</span>
                <input
                  value={bio}
                  onChange={(event) => setBio(event.target.value.slice(0, 150))}
                  placeholder="요즘 듣는 음악이나 취향을 한 줄로 적어보세요"
                  className="w-full rounded-none border border-[#1A1817] bg-transparent px-4 py-4 text-[1rem] outline-none placeholder:text-[#9A9387]"
                />
              </label>

              <div>
                <span className="block text-[1rem] font-semibold">선호 장르</span>
                <p className="mt-1 text-[0.84rem] text-[#8C867A]">
                  여러 개 선택할 수 있습니다
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {referenceGenres.map((genre) => {
                    const isActive = selectedGenres.includes(genre.key);

                    return (
                      <button
                        key={genre.key}
                        type="button"
                        onClick={() => toggleGenre(genre.key)}
                        className={`border px-4 py-3 text-[0.92rem] font-medium ${
                          isActive
                            ? "border-[#1A1817] bg-[#1A1817] text-[#EBE6D8]"
                            : "border-[#1A1817] bg-transparent text-[#1A1817]"
                        }`}
                      >
                        {genre.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="block text-[1rem] font-semibold">주 사용 플랫폼</span>
                <p className="mt-1 text-[0.84rem] text-[#8C867A]">
                  추천곡을 열 때 기본으로 사용할 플랫폼입니다
                </p>
                <div className="mt-4 space-y-3">
                  {renderedPlatforms.map((platform) => {
                    const isActive = mainPlatform === platform;

                    return (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setMainPlatform(platform)}
                        className={`flex w-full items-center gap-4 border px-4 py-5 text-left ${
                          isActive
                            ? "bg-[rgba(26,24,23,0.04)]"
                            : "bg-transparent"
                        } border-[#1A1817]`}
                      >
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#1A1817]">
                          {isActive ? (
                            <span className="block h-2 w-2 rounded-full bg-[var(--primary-strong)]" />
                          ) : null}
                        </span>
                        <span className="text-[1rem] font-medium">
                          {platformLabels[platform]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.mainPlatform ? (
                  <span className="mt-2 block text-sm text-[#C15843]">
                    {errors.mainPlatform}
                  </span>
                ) : null}
              </div>

              <label className="block">
                <span className="block text-[1rem] font-semibold">플레이리스트 링크</span>
                <p className="mt-1 text-[0.84rem] text-[#8C867A]">
                  최소 1개 이상 필요합니다
                </p>
                <input
                  value={playlistLinks[0] ?? ""}
                  onChange={(event) =>
                    setPlaylistLinks([event.target.value, ...playlistLinks.slice(1)])
                  }
                  placeholder="Spotify / Apple Music / YouTube Music 등"
                  className="mt-4 w-full rounded-none border border-[#1A1817] bg-transparent px-4 py-4 text-[1rem] outline-none placeholder:text-[#9A9387]"
                />
                {errors.playlistLinks ? (
                  <span className="mt-2 block text-sm text-[#C15843]">
                    {errors.playlistLinks}
                  </span>
                ) : null}
              </label>
            </div>
          </section>

          <section className="px-6 pb-28 pt-8">
            <button
              type="submit"
              disabled={isSaving || isPending}
              className="flex w-full items-center justify-between border border-[#1A1817] bg-[#1A1817] px-5 py-5 text-[1rem] font-semibold text-[#EBE6D8] disabled:opacity-60"
            >
              <span>{isSaving || isPending ? "저장 중..." : "프로필 저장하기"}</span>
              <span className="font-mono text-[1rem]">→</span>
            </button>

            {saveMessage ? (
              <div className="mt-6 border border-[#1A1817] bg-[rgba(26,24,23,0.04)] px-4 py-4 text-[0.9rem] leading-7 text-[#1A1817]">
                {saveMessage}
              </div>
            ) : null}
          </section>
        </form>

        <Link
          href="/profile"
          className="absolute bottom-10 right-4 bg-[var(--primary-strong)] px-5 py-3 font-mono text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-[#EBE6D8] shadow-[4px_4px_0_#1A1817]"
        >
          SWITCH VIEW ↺
        </Link>

        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[var(--primary-strong)]" />
      </section>
    </div>
  );
}
