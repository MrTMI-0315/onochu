import type { MusicPlatform, ProfileDraft } from "@/lib/types";

export const PROFILE_STORAGE_KEY = "onochu-profile-draft";
export const PROFILE_STORAGE_VERSION = 1;

type StoredProfileDraft = {
  version: number;
  draft: ProfileDraft;
};

type LoadProfileDraftInput = {
  nickname: string;
  bio: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  playlistLinks: string[];
};

type LoadedProfileDraft = {
  draft: ProfileDraft;
  storageMessage: string;
};

export function createProfileDraft(input: LoadProfileDraftInput): ProfileDraft {
  return {
    nickname: input.nickname,
    bio: input.bio,
    favoriteGenres: input.favoriteGenres,
    mainPlatform: input.mainPlatform,
    playlistLinks: input.playlistLinks,
    updatedAt: new Date().toISOString(),
  };
}

export function loadStoredProfileDraft(
  initialDraft: LoadProfileDraftInput,
): LoadedProfileDraft {
  try {
    const storedValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!storedValue) {
      return {
        draft: createProfileDraft(initialDraft),
        storageMessage: "profile browser storage active",
      };
    }

    const parsedValue = JSON.parse(storedValue) as StoredProfileDraft | null;

    if (!parsedValue || parsedValue.version !== PROFILE_STORAGE_VERSION) {
      resetStoredProfileDraft();

      return {
        draft: createProfileDraft(initialDraft),
        storageMessage: "profile storage reset after version change",
      };
    }

    return {
      draft: parsedValue.draft,
      storageMessage: "hydrated profile from browser storage",
    };
  } catch {
    return {
      draft: createProfileDraft(initialDraft),
      storageMessage: "profile storage parse failed, reverted to seeded draft",
    };
  }
}

export function persistStoredProfileDraft(draft: ProfileDraft) {
  window.localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify({
      version: PROFILE_STORAGE_VERSION,
      draft,
    } satisfies StoredProfileDraft),
  );
}

export function resetStoredProfileDraft() {
  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
}
