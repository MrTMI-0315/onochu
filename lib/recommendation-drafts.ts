import type {
  MemberProfile,
  RecommendationDraftInput,
  SongRecommendation,
} from "@/lib/types";

export type StoredRecommendationState = {
  version: number;
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
};

export const RECOMMENDATION_STORAGE_KEY = "onochu-recommendation-studio";
export const LEGACY_RECOMMENDATION_STORAGE_KEY =
  "onochu-recommendation-studio-v1";
export const RECOMMENDATION_STORAGE_VERSION = 2;

type LoadedRecommendationState = {
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
  storageMessage: string;
};

type PersistRecommendationStateInput = {
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
};

type AppendDraftInput = {
  draft: RecommendationDraftInput;
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
};

export function createRecommendationFromDraft(
  draft: RecommendationDraftInput,
  currentMember: MemberProfile,
): SongRecommendation {
  return {
    id: `draft-${Date.now()}`,
    memberId: currentMember.id,
    trackTitle: draft.trackTitle,
    artistName: draft.artistName,
    platform: draft.platform,
    url: draft.url,
    comment: draft.comment,
    moodTags: draft.moodTags.length > 0 ? draft.moodTags : ["fresh"],
    createdAt: new Date().toISOString(),
  };
}

export function loadStoredRecommendationState(
  initialRecommendations: SongRecommendation[],
): LoadedRecommendationState {
  try {
    const storedValue = window.localStorage.getItem(RECOMMENDATION_STORAGE_KEY);
    const legacyValue = window.localStorage.getItem(
      LEGACY_RECOMMENDATION_STORAGE_KEY,
    );

    if (!storedValue && !legacyValue) {
      return {
        recommendations: initialRecommendations,
        latestDraft: null,
        storageMessage: "browser storage active",
      };
    }

    const parsedValue = JSON.parse(storedValue ?? legacyValue ?? "null") as
      | StoredRecommendationState
      | {
          recommendations?: SongRecommendation[];
          latestDraft?: SongRecommendation | null;
        }
      | null;

    if (!parsedValue) {
      return {
        recommendations: initialRecommendations,
        latestDraft: null,
        storageMessage: "browser storage active",
      };
    }

    if ("version" in parsedValue) {
      if (parsedValue.version !== RECOMMENDATION_STORAGE_VERSION) {
        resetStoredRecommendationState();

        return {
          recommendations: initialRecommendations,
          latestDraft: null,
          storageMessage: "storage reset after version change",
        };
      }

      return {
        recommendations:
          Array.isArray(parsedValue.recommendations) &&
          parsedValue.recommendations.length > 0
            ? parsedValue.recommendations
            : initialRecommendations,
        latestDraft: parsedValue.latestDraft ?? null,
        storageMessage: "hydrated from browser storage",
      };
    }

    const recommendations =
      Array.isArray(parsedValue.recommendations) &&
      parsedValue.recommendations.length > 0
        ? parsedValue.recommendations
        : initialRecommendations;

    const latestDraft = parsedValue.latestDraft ?? null;
    const storageMessage = legacyValue
      ? "migrated legacy browser storage"
      : "browser storage active";

    if (legacyValue) {
      window.localStorage.removeItem(LEGACY_RECOMMENDATION_STORAGE_KEY);
    }

    return {
      recommendations,
      latestDraft,
      storageMessage,
    };
  } catch {
    return {
      recommendations: initialRecommendations,
      latestDraft: null,
      storageMessage: "storage parse failed, reverted to seeded feed",
    };
  }
}

export function persistStoredRecommendationState({
  recommendations,
  latestDraft,
}: PersistRecommendationStateInput) {
  window.localStorage.setItem(
    RECOMMENDATION_STORAGE_KEY,
    JSON.stringify({
      version: RECOMMENDATION_STORAGE_VERSION,
      recommendations,
      latestDraft,
    } satisfies StoredRecommendationState),
  );
}

export function appendDraftToStoredRecommendationState({
  draft,
  currentMember,
  initialRecommendations,
}: AppendDraftInput) {
  const currentState = loadStoredRecommendationState(initialRecommendations);
  const latestDraft = createRecommendationFromDraft(draft, currentMember);
  const recommendations = [latestDraft, ...currentState.recommendations];

  persistStoredRecommendationState({
    recommendations,
    latestDraft,
  });

  return {
    recommendations,
    latestDraft,
    storageMessage: "saved to browser storage",
  };
}

export function resetStoredRecommendationState() {
  window.localStorage.removeItem(RECOMMENDATION_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_RECOMMENDATION_STORAGE_KEY);
}
