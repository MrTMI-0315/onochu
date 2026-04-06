"use client";

import { useState, useTransition } from "react";
import { platformLabels } from "@/lib/mock-data";
import { normalizePlatformLinkMap } from "@/lib/platform-links";
import type {
  MusicPlatform,
  PlatformLinkMap,
  RecommendationDraftInput,
} from "@/lib/types";

type RecommendationComposerProps = {
  currentMemberName: string;
  moodSuggestions: string[];
  onDraftSaved?: (draft: RecommendationDraftInput) => void;
  mobile?: boolean;
  initialDraft?: Partial<RecommendationDraftInput>;
};

type ComposerErrors = {
  trackTitle?: string;
  artistName?: string;
  url?: string;
  comment?: string;
  alternatePlatformUrls?: string;
};

type SaveStatus =
  | { type: "idle"; message: string }
  | { type: "saving"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const MAX_COMMENT_LENGTH = 200;
const platformDescriptions: Partial<Record<MusicPlatform, string>> = {
  spotify: "Most popular streaming platform",
  apple_music: "High-quality audio",
  youtube_music: "Largest music library",
  melon: "Korean streaming staple",
  soundcloud: "Independent artists",
  other: "Bring your own link",
};
const mobilePlatformOrder: MusicPlatform[] = [
  "spotify",
  "apple_music",
  "youtube_music",
  "melon",
  "soundcloud",
];

export function RecommendationComposer({
  currentMemberName,
  moodSuggestions,
  onDraftSaved,
  mobile = false,
  initialDraft,
}: RecommendationComposerProps) {
  const [trackTitle, setTrackTitle] = useState(initialDraft?.trackTitle ?? "");
  const [artistName, setArtistName] = useState(initialDraft?.artistName ?? "");
  const [platform, setPlatform] = useState<MusicPlatform>(
    initialDraft?.platform ?? "spotify",
  );
  const [url, setUrl] = useState(initialDraft?.url ?? "");
  const [alternatePlatformUrls, setAlternatePlatformUrls] = useState<PlatformLinkMap>(
    initialDraft?.alternatePlatformUrls ?? {},
  );
  const [comment, setComment] = useState(initialDraft?.comment ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialDraft?.moodTags ?? [],
  );
  const [showAlternateLinks, setShowAlternateLinks] = useState(
    Boolean(initialDraft?.alternatePlatformUrls),
  );
  const [errors, setErrors] = useState<ComposerErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({
    type: "idle",
    message: "현재 작성은 local mock flow로 동작합니다.",
  });

  const platformOptions = Object.entries(platformLabels) as Array<
    [MusicPlatform, string]
  >;
  const alternatePlatformOptions = platformOptions.filter(
    ([value]) => value !== "other",
  );
  const hasAlternateLinks = mobilePlatformOrder.some(
    (value) =>
      value !== platform && (alternatePlatformUrls[value]?.trim().length ?? 0) > 0,
  );
  const shouldShowAlternateLinks =
    showAlternateLinks || hasAlternateLinks || Boolean(errors.alternatePlatformUrls);

  function clearFormFields() {
    setTrackTitle("");
    setArtistName("");
    setPlatform("spotify");
    setUrl("");
    setAlternatePlatformUrls({});
    setComment("");
    setSelectedTags([]);
    setShowAlternateLinks(false);
  }

  function resetForm() {
    clearFormFields();
    setErrors({});
    setSaveStatus({
      type: "idle",
      message: "초안을 초기 상태로 되돌렸습니다.",
    });
  }

  function toggleTag(tag: string) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  }

  function updateAlternatePlatformUrl(targetPlatform: MusicPlatform, value: string) {
    setAlternatePlatformUrls((currentLinks) => ({
      ...currentLinks,
      [targetPlatform]: value,
    }));
  }

  function validateForm() {
    const nextErrors: ComposerErrors = {};

    if (trackTitle.trim().length === 0) {
      nextErrors.trackTitle = "곡명은 비워둘 수 없습니다.";
    }

    if (artistName.trim().length === 0) {
      nextErrors.artistName = "아티스트명은 비워둘 수 없습니다.";
    }

    if (url.trim().length === 0) {
      nextErrors.url = "원본 링크는 최소 1개 필요합니다.";
    } else {
      try {
        new URL(url.trim());
      } catch {
        nextErrors.url = "원본 링크는 올바른 URL 형식이어야 합니다.";
      }
    }

    if (comment.trim().length === 0) {
      nextErrors.comment = "한 줄 코멘트는 비워둘 수 없습니다.";
    }

    const hasInvalidAlternateLink = Object.entries(alternatePlatformUrls).some(
      ([targetPlatform, value]) => {
        if (targetPlatform === platform || value.trim().length === 0) {
          return false;
        }

        try {
          new URL(value.trim());
          return false;
        } catch {
          return true;
        }
      },
    );

    if (hasInvalidAlternateLink) {
      nextErrors.alternatePlatformUrls =
        "선택 입력인 alternate platform links도 올바른 URL 형식이어야 합니다.";
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
      message: "추천곡 draft를 local mock state 기준으로 저장 중입니다.",
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 700);
    });

    const normalizedDraft: RecommendationDraftInput = {
      trackTitle: trackTitle.trim(),
      artistName: artistName.trim(),
      platform,
      url: url.trim(),
      comment: comment.trim(),
      moodTags: selectedTags,
      alternatePlatformUrls: normalizePlatformLinkMap(
        alternatePlatformUrls,
        platform,
      ),
    };

    startTransition(() => {
      onDraftSaved?.(normalizedDraft);
      setSaveStatus({
        type: "success",
        message: `draft 저장 흐름을 확인했습니다. posting member: ${currentMemberName}`,
      });
      clearFormFields();
      setErrors({});
    });

    setIsSaving(false);
  }

  const statusTone =
    saveStatus.type === "success"
      ? "border-[color:rgba(213,140,116,0.3)] bg-[color:rgba(213,140,116,0.12)] text-[color:var(--paper)]"
      : saveStatus.type === "error"
        ? "border-rose-300/30 bg-rose-300/10 text-rose-100"
        : "border-white/10 bg-white/4 text-white/68";

  if (mobile) {
    return (
      <section className="mobile-screen pb-12 text-[var(--accent-ink)]">
        <form onSubmit={handleSubmit}>
          <header className="mobile-section-rule sticky top-0 z-20 flex items-center justify-between bg-[rgba(247,243,236,0.96)] px-5 py-5 backdrop-blur-xl">
            <button
              type="button"
              onClick={resetForm}
              className="text-[1.9rem] font-light text-[rgba(64,52,44,0.7)]"
              aria-label="Close composer"
            >
              ×
            </button>
            <h1 className="text-[1.15rem] font-semibold tracking-[-0.03em]">
              Share Recommendation
            </h1>
            <button
              type="submit"
              disabled={isSaving || isPending}
              className="text-[1rem] font-semibold text-[var(--primary-strong)] disabled:opacity-50"
            >
              Share
            </button>
          </header>

          <div className="px-6 pb-10 pt-8">
            <p className="text-center text-[1rem] leading-8 text-[rgba(64,52,44,0.68)]">
              Share a song and tell us why it matters to you
            </p>

            <div className="mobile-section-rule mt-8" />

            <div className="mt-8 space-y-7">
              <label className="block">
                <span className="mb-3 block text-[1rem] font-semibold">Track title</span>
                <input
                  value={trackTitle}
                  onChange={(event) => setTrackTitle(event.target.value)}
                  className="mobile-input w-full rounded-[0.14rem] px-5 py-4 text-[1rem] outline-none"
                  placeholder="Song name"
                />
                {errors.trackTitle ? (
                  <span className="mt-2 block text-sm text-rose-500">{errors.trackTitle}</span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-3 block text-[1rem] font-semibold">Artist</span>
                <input
                  value={artistName}
                  onChange={(event) => setArtistName(event.target.value)}
                  className="mobile-input w-full rounded-[0.14rem] px-5 py-4 text-[1rem] outline-none"
                  placeholder="Artist name"
                />
                {errors.artistName ? (
                  <span className="mt-2 block text-sm text-rose-500">{errors.artistName}</span>
                ) : null}
              </label>
            </div>

            <div className="mobile-section-rule mt-10" />

            <div className="mt-10">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[1rem] font-semibold">Your story</span>
                <span className="text-[0.95rem] text-[rgba(64,52,44,0.54)]">
                  {comment.length}/{MAX_COMMENT_LENGTH}
                </span>
              </div>
              <textarea
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH))
                }
                className="mobile-input min-h-36 w-full rounded-[0.14rem] px-5 py-4 text-[1rem] leading-8 outline-none"
                placeholder="Why does this song matter to you? When do you listen to it?"
              />
              {errors.comment ? (
                <span className="mt-2 block text-sm text-rose-500">{errors.comment}</span>
              ) : null}
            </div>

            <div className="mobile-section-rule mt-10" />

            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[1rem] font-semibold">Mood</span>
                <span className="text-[0.95rem] text-[rgba(64,52,44,0.54)]">
                  Select up to 5
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {moodSuggestions.map((tag) => {
                  const isActive = selectedTags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-[0.14rem] px-4 py-3 text-[0.98rem] font-medium ${
                        isActive ? "mobile-chip-active" : "mobile-chip"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mobile-section-rule mt-10" />

            <div className="mt-10">
              <span className="mb-4 block text-[1rem] font-semibold">Main platform</span>
              <div className="space-y-3">
                {mobilePlatformOrder.map((value) => {
                    const label = platformLabels[value];
                    const isActive = platform === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setPlatform(value)}
                        className={`mobile-platform-option flex w-full items-center justify-between rounded-[0.14rem] px-5 py-5 text-left ${
                          isActive ? "mobile-platform-option-active" : ""
                        }`}
                      >
                        <div>
                          <p
                            className={`text-[1.02rem] font-semibold ${
                              isActive
                                ? "text-[var(--primary-strong)]"
                                : "text-[var(--accent-ink)]"
                            }`}
                          >
                            {label}
                          </p>
                          <p className="mt-1 text-[0.95rem] text-[rgba(64,52,44,0.58)]">
                            {platformDescriptions[value]}
                          </p>
                        </div>
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                            isActive
                              ? "border-[var(--primary-strong)] text-[var(--primary-strong)]"
                              : "border-[rgba(109,66,60,0.18)] text-transparent"
                          }`}
                        >
                          <span
                            className={`block h-3.5 w-3.5 rounded-full ${
                              isActive ? "bg-[var(--primary-strong)]" : "bg-transparent"
                            }`}
                          />
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="mobile-section-rule mt-10" />

            <div className="mt-10 space-y-5">
              <label className="block">
                <span className="mb-3 block text-[1rem] font-semibold">Main link</span>
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  className="mobile-input w-full rounded-[0.14rem] px-5 py-4 text-[1rem] outline-none"
                  placeholder="https://open.spotify.com/track/..."
                  type="url"
                />
                {errors.url ? (
                  <span className="mt-2 block text-sm text-rose-500">{errors.url}</span>
                ) : null}
              </label>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-[1rem] font-semibold">
                      Alternate platform links
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-[rgba(64,52,44,0.54)]">
                      Optional shortcuts for listeners on other apps
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowAlternateLinks((currentValue) => !currentValue)
                    }
                    className="rounded-[0.12rem] border border-[rgba(109,66,60,0.14)] px-4 py-2 text-[0.92rem] font-medium text-[var(--primary-strong)]"
                  >
                    {shouldShowAlternateLinks ? "Hide" : "Add"}
                  </button>
                </div>
                {shouldShowAlternateLinks ? (
                  <div className="mt-4 space-y-3">
                    {mobilePlatformOrder
                      .filter((value) => value !== platform)
                      .map((value) => (
                        <input
                          key={value}
                          value={alternatePlatformUrls[value] ?? ""}
                          onChange={(event) =>
                            updateAlternatePlatformUrl(value, event.target.value)
                          }
                          className="mobile-input w-full rounded-[0.14rem] px-5 py-4 text-[1rem] outline-none"
                          placeholder={`${platformLabels[value]} link (optional)`}
                          type="url"
                        />
                      ))}
                  </div>
                ) : (
                  <p className="mt-4 text-[0.96rem] leading-7 text-[rgba(64,52,44,0.62)]">
                    Add Apple Music, YouTube Music, Melon, or SoundCloud links only
                    if you want cross-platform listeners to jump in faster.
                  </p>
                )}
                {errors.alternatePlatformUrls ? (
                  <span className="mt-2 block text-sm text-rose-500">
                    {errors.alternatePlatformUrls}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mobile-section-rule mt-10" />

            <div className="mt-10 space-y-4">
              <button
                type="submit"
                disabled={isSaving || isPending}
                className="w-full rounded-[0.16rem] bg-[var(--primary-strong)] px-5 py-4 text-[1.05rem] font-semibold text-[var(--paper)] disabled:opacity-60"
              >
                {isSaving || isPending ? "Sharing..." : "Share recommendation"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="mobile-input w-full rounded-[0.16rem] px-5 py-4 text-[1.05rem] font-medium"
              >
                Cancel
              </button>
            </div>

            <p className="mt-12 text-center text-[1rem] leading-8 text-[rgba(64,52,44,0.52)]">
              Your recommendations help others discover you
            </p>

            <p className="mt-4 text-center text-sm text-[rgba(64,52,44,0.52)]">
              {saveStatus.message.replace(currentMemberName, "you")}
            </p>
          </div>
        </form>
      </section>
    );
  }

  return (
    <section id="compose-panel" className="onochu-panel rounded-[2rem] p-6 md:p-8">
      <header className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
          New Recommendation
        </p>
        <h2 className="onochu-display mt-3 text-4xl font-bold uppercase leading-[0.9] text-white md:text-5xl">
          Post a track
          <br />
          in under a minute.
        </h2>
        <div className="mt-5 h-1 w-12 bg-[var(--primary)]" />
        <p className="mt-5 text-sm leading-7 text-white/65">
          현재 로그인 개념은 없어서 local mock 기준 작성자는 {currentMemberName}
          으로 가정합니다. 중요한 건 곡, 왜 골랐는지, 어디서 들을지 세 가지입니다.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              01
            </p>
            <p className="mt-2 text-sm text-white/72">곡명과 아티스트</p>
          </div>
          <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              02
            </p>
            <p className="mt-2 text-sm text-white/72">왜 이 곡인지 한 줄</p>
          </div>
          <div className="rounded-[1.25rem] border border-white/8 bg-white/4 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              03
            </p>
            <p className="mt-2 text-sm text-white/72">
              원본 링크와 optional alternate links
            </p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className={`rounded-[1.25rem] border px-4 py-4 text-sm ${statusTone}`}>
          {saveStatus.message}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Song title
            </span>
            <input
              value={trackTitle}
              onChange={(event) => setTrackTitle(event.target.value)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none placeholder:text-white/20"
              placeholder="e.g. Midnight City"
            />
            {errors.trackTitle ? (
              <span className="text-xs text-rose-200">{errors.trackTitle}</span>
            ) : null}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Artist
            </span>
            <input
              value={artistName}
              onChange={(event) => setArtistName(event.target.value)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none placeholder:text-white/20"
              placeholder="e.g. M83"
            />
            {errors.artistName ? (
              <span className="text-xs text-rose-200">{errors.artistName}</span>
            ) : null}
          </label>
        </div>

        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Platform
            </span>
            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value as MusicPlatform)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none"
            >
              {platformOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Original link
            </span>
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none placeholder:text-white/20"
              placeholder="https://open.spotify.com/track/..."
              type="url"
            />
            {errors.url ? (
              <span className="text-xs text-rose-200">{errors.url}</span>
            ) : null}
          </label>
        </div>

        <section className="space-y-4 rounded-[1.5rem] border border-white/8 bg-white/3 p-5">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Alternate platform links
            </span>
            <p className="text-sm leading-7 text-white/58">
              선택 입력입니다. 추천을 보는 멤버가 자기 플랫폼으로 바로 이어질 수
              있게 필요한 링크만 더 붙일 수 있습니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {alternatePlatformOptions.map(([value, label]) => {
              const isSourcePlatform = value === platform;

              return (
                <label key={value} className="flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                    {label}
                    {isSourcePlatform ? " (source handled above)" : " (optional)"}
                  </span>
                  <input
                    value={alternatePlatformUrls[value] ?? ""}
                    onChange={(event) =>
                      updateAlternatePlatformUrl(value, event.target.value)
                    }
                    className="rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none placeholder:text-white/20 disabled:cursor-not-allowed disabled:opacity-45"
                    placeholder={
                      isSourcePlatform
                        ? "Original link already covers this platform"
                        : `Paste ${label} link if you have it`
                    }
                    type="url"
                    disabled={isSourcePlatform}
                  />
                </label>
              );
            })}
          </div>

          {errors.alternatePlatformUrls ? (
            <span className="text-xs text-rose-200">
              {errors.alternatePlatformUrls}
            </span>
          ) : null}
        </section>

        <label className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
              Why this track
            </span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
              {comment.length}/{MAX_COMMENT_LENGTH}
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value.slice(0, MAX_COMMENT_LENGTH))}
            className="min-h-28 rounded-[1rem] border border-white/8 bg-[#111111] p-4 text-white outline-none placeholder:text-white/20"
            placeholder="Tell the members why this track hits different..."
          />
          {errors.comment ? (
            <span className="text-xs text-rose-200">{errors.comment}</span>
          ) : null}
        </label>

        <div className="space-y-4">
          <span className="text-[11px] uppercase tracking-[0.16em] text-white/45">
            Add mood tags
          </span>
          <div className="flex flex-wrap gap-2">
            {moodSuggestions.map((tag) => {
              const isActive = selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                    isActive ? "onochu-chip-active" : "onochu-chip"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <button
            type="button"
            onClick={resetForm}
            className="flex-1 rounded-full bg-white/6 px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving || isPending}
            className="onochu-glow flex-[1.4] rounded-full bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] px-8 py-5 text-sm font-extrabold uppercase tracking-[0.2em] text-black disabled:opacity-60"
          >
            {isSaving || isPending ? "Posting..." : "Post now"}
          </button>
        </div>
      </form>
    </section>
  );
}
