import type { MusicPlatform, ProfileDraft } from "@/lib/types";
import { ensureBrowserIdentity } from "@/lib/browser-identity";

export const PROFILE_STORAGE_KEY = "onochu-profile-draft";
export const PROFILE_STORAGE_VERSION = 2;
const PROFILE_SERVER_ENDPOINT = "/api/profile";

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

type ServerProfileRecord = {
  version: number;
  ownerBrowserIdentityId: string;
  draft: ProfileDraft;
  updatedAt: string;
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

export async function loadServerProfileDraft(
  initialDraft: LoadProfileDraftInput,
): Promise<LoadedProfileDraft | null> {
  const identityState = ensureBrowserIdentity();
  const localState = loadStoredProfileDraft(initialDraft);
  const response = await fetch(
    `${PROFILE_SERVER_ENDPOINT}?ownerBrowserIdentityId=${encodeURIComponent(
      identityState.browserIdentityId,
    )}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("profile server persistence load failed");
  }

  const payload = (await response.json()) as {
    record?: ServerProfileRecord | null;
  };
  const record = payload.record;

  if (
    !record ||
    record.ownerBrowserIdentityId !== identityState.browserIdentityId
  ) {
    return null;
  }

  return {
    ...localState,
    draft: record.draft,
    storageMessage: "hydrated profile from server session with local fallback",
  };
}

export async function persistServerProfileDraft(draft: ProfileDraft) {
  const identityState = ensureBrowserIdentity();
  const response = await fetch(PROFILE_SERVER_ENDPOINT, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      version: PROFILE_STORAGE_VERSION,
      ownerBrowserIdentityId: identityState.browserIdentityId,
      draft,
    }),
  });

  if (!response.ok) {
    throw new Error("profile server persistence save failed");
  }

  return "saved profile to server session with local fallback";
}

export async function resetServerProfileDraft() {
  const identityState = ensureBrowserIdentity();
  const response = await fetch(
    `${PROFILE_SERVER_ENDPOINT}?ownerBrowserIdentityId=${encodeURIComponent(
      identityState.browserIdentityId,
    )}`,
    { method: "DELETE" },
  );

  if (!response.ok) {
    throw new Error("profile server persistence reset failed");
  }

  return "reset profile server session and local fallback";
}
