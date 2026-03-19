"use client";

import { useState, useTransition } from "react";
import { platformLabels } from "@/lib/mock-data";
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
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    type: "idle",
    message: "현재 저장은 local mock flow로 동작합니다.",
  });

  const platformOptions = Object.entries(platformLabels) as Array<
    [MusicPlatform, string]
  >;

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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 lg:grid-cols-2"
    >
      <div className="lg:col-span-2">
        <div
          className={`rounded-3xl border px-4 py-4 text-sm ${
            saveStatus.type === "success"
              ? "border-lime-300/30 bg-lime-300/10 text-lime-100"
              : saveStatus.type === "error"
                ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
                : "border-white/10 bg-stone-900/80 text-stone-300"
          }`}
        >
          {saveStatus.message}
        </div>
      </div>

      <label className="flex flex-col gap-2 text-sm text-stone-200">
        Nickname
        <input
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
          name="nickname"
        />
        {errors.nickname ? (
          <span className="text-xs text-rose-200">{errors.nickname}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 text-sm text-stone-200">
        Main platform
        <select
          value={mainPlatform}
          onChange={(event) =>
            setMainPlatform(event.target.value as MusicPlatform)
          }
          className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
          name="mainPlatform"
        >
          {platformOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.mainPlatform ? (
          <span className="text-xs text-rose-200">{errors.mainPlatform}</span>
        ) : null}
      </label>

      <label className="flex flex-col gap-2 text-sm text-stone-200 lg:col-span-2">
        Bio
        <textarea
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="min-h-32 rounded-3xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
          name="bio"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-stone-200 lg:col-span-2">
        Favorite genres
        <input
          value={favoriteGenres}
          onChange={(event) => setFavoriteGenres(event.target.value)}
          className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
          name="favoriteGenres"
        />
      </label>

      <div className="flex flex-col gap-3 lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-stone-200">
            Playlist links
          </span>
          <button
            type="button"
            onClick={addPlaylistLink}
            className="rounded-full border border-white/10 px-3 py-2 text-xs text-stone-200 transition hover:border-lime-300 hover:text-lime-200"
          >
            Add link
          </button>
        </div>

        {playlistLinks.map((playlistLink, index) => (
          <div key={`playlist-link-${index + 1}`} className="flex gap-3">
            <input
              value={playlistLink}
              onChange={(event) => updatePlaylistLink(index, event.target.value)}
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none"
              name={`playlistLink-${index + 1}`}
              placeholder="https://..."
            />
            <button
              type="button"
              onClick={() => removePlaylistLink(index)}
              disabled={playlistLinks.length === 1}
              className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-stone-300 transition hover:border-rose-300 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Remove
            </button>
          </div>
        ))}

        {errors.playlistLinks ? (
          <span className="text-xs text-rose-200">{errors.playlistLinks}</span>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
        <button
          type="submit"
          disabled={isSaving || isPending}
          className="rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-stone-950 disabled:opacity-60"
        >
          {isSaving || isPending ? "Saving..." : "Save profile"}
        </button>
        <p className="text-sm text-stone-400">
          실제 persistence 없이 입력/검증 흐름만 먼저 확인합니다.
        </p>
      </div>
    </form>
  );
}
