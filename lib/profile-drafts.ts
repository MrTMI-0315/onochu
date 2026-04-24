import type { MusicPlatform, ProfileDraft } from "@/lib/types";
import { ensureBrowserIdentity } from "@/lib/browser-identity";

export const PROFILE_STORAGE_KEY = "onochu-profile-draft";
export const PROFILE_STORAGE_VERSION = 2;

type StoredProfileDraft = {
  version: number;
  ownerBrowserIdentityId: string;
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
  browserIdentityId: string;
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
    const identityState = ensureBrowserIdentity();
    const storedValue = window.localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!storedValue) {
      return {
        draft: createProfileDraft(initialDraft),
        browserIdentityId: identityState.browserIdentityId,
        storageMessage: "profile browser storage active / anonymous identity ready",
      };
    }

    const parsedValue = JSON.parse(storedValue) as
      | StoredProfileDraft
      | {
          version?: number;
          draft?: ProfileDraft;
        }
      | null;

    if (!parsedValue || !parsedValue.draft) {
      resetStoredProfileDraft();

      return {
        draft: createProfileDraft(initialDraft),
        browserIdentityId: identityState.browserIdentityId,
        storageMessage: "profile storage reset after parse mismatch",
      };
    }

    if (
      parsedValue.version !== PROFILE_STORAGE_VERSION ||
      !("ownerBrowserIdentityId" in parsedValue) ||
      parsedValue.ownerBrowserIdentityId !== identityState.browserIdentityId
    ) {
      const migratedDraft = parsedValue.draft;

      persistStoredProfileDraft(migratedDraft);

      return {
        draft: migratedDraft,
        browserIdentityId: identityState.browserIdentityId,
        storageMessage: "migrated profile storage to anonymous identity boundary",
      };
    }

    return {
      draft: parsedValue.draft,
      browserIdentityId: identityState.browserIdentityId,
      storageMessage: "hydrated profile from browser storage",
    };
  } catch {
    const identityState = ensureBrowserIdentity();

    return {
      draft: createProfileDraft(initialDraft),
      browserIdentityId: identityState.browserIdentityId,
      storageMessage: "profile storage parse failed, reverted to seeded draft",
    };
  }
}

export function persistStoredProfileDraft(draft: ProfileDraft) {
  const identityState = ensureBrowserIdentity();

  window.localStorage.setItem(
    PROFILE_STORAGE_KEY,
    JSON.stringify({
      version: PROFILE_STORAGE_VERSION,
      ownerBrowserIdentityId: identityState.browserIdentityId,
      draft,
    } satisfies StoredProfileDraft),
  );
}

export function resetStoredProfileDraft() {
  window.localStorage.removeItem(PROFILE_STORAGE_KEY);
}
