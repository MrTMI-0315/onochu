"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { allGenres, platformLabels } from "@/lib/mock-data";
import {
  createProfileDraft,
  loadStoredProfileDraft,
  persistStoredProfileDraft,
  PROFILE_STORAGE_VERSION,
  resetStoredProfileDraft,
} from "@/lib/profile-drafts";
import type { MusicPlatform } from "@/lib/types";

type ProfileEditFormProps = {
  initialNickname: string;
  initialBio: string;
  initialFavoriteGenres: string[];
  initialMainPlatform: MusicPlatform;
  initialPlaylistLinks: string[];
};

type FormErrors = {
  nickname?: string;
  mainPlatform?: string;
  playlistLinks?: string;
};

type SaveStatus =
  | { type: "idle"; message: string }
  | { type: "saving"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function ProfileEditForm({
  initialNickname,
  initialBio,
  initialFavoriteGenres,
  initialMainPlatform,
  initialPlaylistLinks,
}: ProfileEditFormProps) {
  const [nickname, setNickname] = useState(initialNickname);
  const [bio, setBio] = useState(initialBio);
  const [favoriteGenres, setFavoriteGenres] = useState(
    initialFavoriteGenres.join(", "),
  );
  const [mainPlatform, setMainPlatform] =
    useState<MusicPlatform>(initialMainPlatform);
  const [playlistLinks, setPlaylistLinks] = useState(initialPlaylistLinks);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [storageMessage, setStorageMessage] = useState(
    "profile browser storage active",
  );
  const [lastPersistedAt, setLastPersistedAt] = useState<string | null>(null);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    type: "idle",
    message: "현재 저장은 local mock flow로 동작합니다.",
  });

  const platformOptions = Object.entries(platformLabels) as Array<
    [MusicPlatform, string]
  >;
  const selectedGenres = useMemo(
    () =>
      favoriteGenres
        .split(",")
        .map((genre) => genre.trim())
        .filter((genre) => genre.length > 0),
    [favoriteGenres],
  );

  useEffect(() => {
    const initialDraft = {
      nickname: initialNickname,
      bio: initialBio,
      favoriteGenres: initialFavoriteGenres,
      mainPlatform: initialMainPlatform,
      playlistLinks: initialPlaylistLinks,
    };
    const storedState = loadStoredProfileDraft(initialDraft);

    const hydrationFrame = window.requestAnimationFrame(() => {
      setNickname(storedState.draft.nickname);
      setBio(storedState.draft.bio);
      setFavoriteGenres(storedState.draft.favoriteGenres.join(", "));
      setMainPlatform(storedState.draft.mainPlatform);
      setPlaylistLinks(
        storedState.draft.playlistLinks.length > 0
          ? storedState.draft.playlistLinks
          : initialPlaylistLinks,
      );
      setLastPersistedAt(storedState.draft.updatedAt);
      setStorageMessage(storedState.storageMessage);
      setHasHydrated(true);
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

  function updatePlaylistLink(index: number, value: string) {
    setPlaylistLinks((currentLinks) =>
      currentLinks.map((link, currentIndex) =>
        currentIndex === index ? value : link,
      ),
    );
  }

  function addPlaylistLink() {
    setPlaylistLinks((currentLinks) => [...currentLinks, ""]);
  }

  function removePlaylistLink(index: number) {
    setPlaylistLinks((currentLinks) =>
      currentLinks.filter((_, currentIndex) => currentIndex !== index),
    );
  }

  function toggleGenre(genre: string) {
    const nextGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
      : [...selectedGenres, genre];

    setFavoriteGenres(nextGenres.join(", "));
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
      setSaveStatus({
        type: "error",
        message: "필수 입력값과 링크 형식을 먼저 확인해 주세요.",
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus({
      type: "saving",
      message: "프로필을 local mock state 기준으로 저장 중입니다.",
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    startTransition(() => {
      const nextDraft = createProfileDraft({
        nickname: nickname.trim(),
        bio: bio.trim(),
        favoriteGenres: selectedGenres,
        mainPlatform,
        playlistLinks: playlistLinks
          .map((link) => link.trim())
          .filter((link) => link.length > 0),
      });

      persistStoredProfileDraft(nextDraft);
      setLastPersistedAt(nextDraft.updatedAt);
      setStorageMessage("saved profile to browser storage");
      setSaveStatus({
        type: "success",
        message: `저장 흐름을 확인했습니다. 마지막 저장 시각: ${new Date().toLocaleTimeString(
          "ko-KR",
        )}`,
      });
      setErrors({});
    });

    setIsSaving(false);
  }

  function handleResetProfileDraft() {
    resetStoredProfileDraft();
    setNickname(initialNickname);
    setBio(initialBio);
    setFavoriteGenres(initialFavoriteGenres.join(", "));
    setMainPlatform(initialMainPlatform);
    setPlaylistLinks(initialPlaylistLinks);
    setErrors({});
    setLastPersistedAt(null);
    setStorageMessage("profile storage cleared and reset to seeded draft");
    setSaveStatus({
      type: "idle",
      message: "저장된 프로필 draft를 지우고 초기 상태로 되돌렸습니다.",
    });
  }

  const completionCount = [
    nickname.trim().length > 0,
    bio.trim().length > 0,
    selectedGenres.length > 0,
    Boolean(mainPlatform),
    playlistLinks.some((link) => link.trim().length > 0),
  ].filter(Boolean).length;

  const statusTone =
    saveStatus.type === "success"
      ? "border-[color:rgba(213,140,116,0.3)] bg-[color:rgba(213,140,116,0.12)] text-[color:var(--paper)]"
      : saveStatus.type === "error"
        ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
        : "border-white/10 bg-white/4 text-white/68";

  return (
    <form onSubmit={handleSubmit} className="onochu-panel rounded-[2rem] p-6 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="flex flex-col items-center gap-5 text-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-white/15 bg-[radial-gradient(circle_at_top,var(--paper)_0%,var(--primary)_28%,var(--surface)_72%)] text-3xl font-bold uppercase text-black shadow-[0_0_28px_rgba(213,140,116,0.22)]">
              {nickname.slice(0, 2).toUpperCase() || "ME"}
            </div>
            <div className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] text-[11px] font-bold uppercase text-black">
              Edit
            </div>
          </div>

          <div>
            <h2 className="onochu-display text-4xl font-bold uppercase text-white">
              Let members know
              <br />
              how to start with you.
            </h2>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-white/40">
              nickname, platform, one link first
            </p>
          </div>

          <div className={`w-full rounded-[1.25rem] border px-4 py-4 text-sm ${statusTone}`}>
            {saveStatus.message}
          </div>

          {hasHydrated ? (
            <div className="w-full rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4 text-sm text-white/68">
              v{PROFILE_STORAGE_VERSION} / {storageMessage}
              {lastPersistedAt ? (
                <span className="block pt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">
                  last persisted {new Date(lastPersistedAt).toLocaleTimeString("ko-KR")}
                </span>
              ) : null}
            </div>
          ) : null}

          <div className="grid w-full gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4 text-sm text-white/72">
              닉네임이 보여야 합니다.
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4 text-sm text-white/72">
              주 플랫폼이 보여야 합니다.
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4 text-sm text-white/72">
              링크 하나면 시작할 수 있습니다.
            </div>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[1.25rem] border border-[color:rgba(213,140,116,0.18)] bg-[color:rgba(213,140,116,0.08)] p-4 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                Completion
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {completionCount}/5
              </p>
            </div>
            <div className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
              <p className="max-w-sm text-sm leading-7 text-white/68">
                local draft가 꼬였을 때는 초기 mock profile로 바로 되돌릴 수
                있습니다.
              </p>
              <button
                type="button"
                onClick={handleResetProfileDraft}
                className="rounded-full border border-white/10 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-[color:rgba(213,140,116,0.3)] hover:text-white"
              >
                Reset profile
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-white/78">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Nickname
            </span>
            <input
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] px-4 py-4 text-white outline-none"
              name="nickname"
              placeholder="Neon curator"
            />
            {errors.nickname ? (
              <span className="text-xs text-rose-200">{errors.nickname}</span>
            ) : null}
          </label>

          <div className="flex flex-col gap-2 text-sm text-white/78">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Primary platform
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {platformOptions.map(([value, label]) => {
                const isActive = mainPlatform === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMainPlatform(value)}
                    className={`rounded-[1rem] border px-3 py-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                      isActive
                        ? "border-[color:rgba(213,140,116,0.3)] bg-[color:rgba(213,140,116,0.12)] text-[var(--primary)]"
                        : "border-white/8 bg-[#111111] text-white/55"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            {errors.mainPlatform ? (
              <span className="text-xs text-rose-200">{errors.mainPlatform}</span>
            ) : null}
            <span className="text-xs leading-6 text-white/48">
              여기서 고른 플랫폼이 recommendation feed 카드의 기본 열기 플랫폼으로
              사용됩니다.
            </span>
          </div>

          <label className="flex flex-col gap-2 text-sm text-white/78 md:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Short bio
            </span>
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              className="min-h-32 rounded-[1.25rem] border border-white/8 bg-[#111111] px-4 py-4 text-white outline-none"
              name="bio"
              placeholder="Tell the archive what kind of sound you keep returning to."
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-white/78 md:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Favorite genres
            </span>
            <input
              value={favoriteGenres}
              onChange={(event) => setFavoriteGenres(event.target.value)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] px-4 py-4 text-white outline-none"
              name="favoriteGenres"
              placeholder="Hip-hop, Jazz Rap, Cloud Rap"
            />
          </label>
        </section>

        <section className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
            Quick vibe selection
          </p>
          <div className="flex flex-wrap gap-2">
            {allGenres.slice(0, 8).map((genre) => {
              const isActive = selectedGenres.includes(genre);

              return (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={`rounded-sm px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    isActive ? "onochu-chip-active" : "onochu-chip"
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Playlist links
            </span>
            <button
              type="button"
              onClick={addPlaylistLink}
              className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/65"
            >
              Add link
            </button>
          </div>

          {playlistLinks.map((playlistLink, index) => (
            <div
              key={`playlist-link-${index + 1}`}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                value={playlistLink}
                onChange={(event) => updatePlaylistLink(index, event.target.value)}
                className="min-w-0 flex-1 rounded-[1rem] border border-white/8 bg-[#111111] px-4 py-4 text-sm text-white outline-none"
                name={`playlistLink-${index + 1}`}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => removePlaylistLink(index)}
                disabled={playlistLinks.length === 1}
                className="rounded-[1rem] border border-white/10 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/55 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Remove
              </button>
            </div>
          ))}

          {errors.playlistLinks ? (
            <span className="text-xs text-rose-200">{errors.playlistLinks}</span>
          ) : null}
        </section>

        <footer className="space-y-4 pt-2">
          <button
            type="submit"
            disabled={isSaving || isPending}
            className="onochu-glow w-full rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] px-6 py-5 text-base font-bold uppercase tracking-[0.16em] text-black disabled:opacity-60"
          >
            {isSaving || isPending ? "Saving..." : "Initialize profile"}
          </button>
          <p className="text-center text-[11px] uppercase tracking-[0.18em] text-white/35">
            실제 persistence 없이 입력과 검증 흐름만 먼저 확인합니다.
          </p>
        </footer>
      </div>
    </form>
  );
}
