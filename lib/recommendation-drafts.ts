import type {
  MemberProfile,
  RecommendationEngagementState,
  RecommendationDraftInput,
  SongRecommendation,
  ThemeSpotlight,
} from "@/lib/types";
import { ensureBrowserIdentity } from "@/lib/browser-identity";
import { normalizePlatformLinkMap } from "@/lib/platform-links";

export type StoredRecommendationState = {
  version: number;
  ownerBrowserIdentityId: string;
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
  engagementByRecommendationId: Record<string, RecommendationEngagementState>;
};

export const RECOMMENDATION_STORAGE_KEY = "onochu-recommendation-studio";
export const LEGACY_RECOMMENDATION_STORAGE_KEY =
  "onochu-recommendation-studio-v1";
export const RECOMMENDATION_STORAGE_VERSION = 6;

type LoadedRecommendationState = {
  browserIdentityId: string;
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
  engagementByRecommendationId: Record<string, RecommendationEngagementState>;
  storageMessage: string;
};

type PersistRecommendationStateInput = {
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
  engagementByRecommendationId: Record<string, RecommendationEngagementState>;
};

type AppendDraftInput = {
  draft: RecommendationDraftInput;
  currentMember: MemberProfile;
  initialRecommendations: SongRecommendation[];
  activeTheme?: ThemeSpotlight | null;
};

export function createEmptyRecommendationEngagementState(): RecommendationEngagementState {
  return {
    fire: false,
    save: false,
  };
}

export function createRecommendationFromDraft(
  draft: RecommendationDraftInput,
  currentMember: MemberProfile,
  activeTheme?: ThemeSpotlight | null,
): SongRecommendation {
  const searchQuery = `${draft.trackTitle} ${draft.artistName}`.trim();

  return {
    id: `draft-${Date.now()}`,
    memberId: currentMember.id,
    memberNickname: currentMember.nickname,
    trackTitle: draft.trackTitle,
    artistName: draft.artistName,
    platform: draft.platform,
    url: draft.url,
    comment: draft.comment,
    moodTags: draft.moodTags.length > 0 ? draft.moodTags : ["fresh"],
    createdAt: new Date().toISOString(),
    reactionCount: 0,
    saveCount: 0,
    searchQuery,
    alternatePlatformUrls: normalizePlatformLinkMap(
      draft.alternatePlatformUrls,
      draft.platform,
    ),
    themeId: activeTheme?.id,
    themeTitle: activeTheme?.title,
    themePhaseLabel: activeTheme?.phaseLabel,
  };
}

export function loadStoredRecommendationState(
  initialRecommendations: SongRecommendation[],
): LoadedRecommendationState {
  try {
    const identityState = ensureBrowserIdentity();
    const storedValue = window.localStorage.getItem(RECOMMENDATION_STORAGE_KEY);
    const legacyValue = window.localStorage.getItem(
      LEGACY_RECOMMENDATION_STORAGE_KEY,
    );

    if (!storedValue && !legacyValue) {
      return {
        browserIdentityId: identityState.browserIdentityId,
        recommendations: initialRecommendations,
        latestDraft: null,
        engagementByRecommendationId: {},
        storageMessage: "browser storage active / anonymous identity ready",
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
        browserIdentityId: identityState.browserIdentityId,
        recommendations: initialRecommendations,
        latestDraft: null,
        engagementByRecommendationId: {},
        storageMessage: "browser storage active / anonymous identity ready",
      };
    }

    if ("version" in parsedValue) {
      if (
        parsedValue.version === RECOMMENDATION_STORAGE_VERSION &&
        "ownerBrowserIdentityId" in parsedValue &&
        parsedValue.ownerBrowserIdentityId === identityState.browserIdentityId
      ) {
        return {
          browserIdentityId: identityState.browserIdentityId,
          recommendations:
            Array.isArray(parsedValue.recommendations) &&
            parsedValue.recommendations.length > 0
              ? parsedValue.recommendations
              : initialRecommendations,
          latestDraft: parsedValue.latestDraft ?? null,
          engagementByRecommendationId:
            parsedValue.engagementByRecommendationId ?? {},
          storageMessage: "hydrated from browser storage",
        };
      }

      if (parsedValue.version === 3) {
        const recommendations =
          Array.isArray(parsedValue.recommendations) &&
          parsedValue.recommendations.length > 0
            ? parsedValue.recommendations.map((recommendation) => {
                const seededRecommendation = initialRecommendations.find(
                  (initialRecommendation) =>
                    initialRecommendation.id === recommendation.id,
                );

                if (!seededRecommendation) {
                  return recommendation;
                }

                return {
                  ...seededRecommendation,
                  ...recommendation,
                  themeId: seededRecommendation.themeId,
                  themeTitle: seededRecommendation.themeTitle,
                  themePhaseLabel: seededRecommendation.themePhaseLabel,
                };
              })
            : initialRecommendations;
        const nextState = {
          recommendations,
          latestDraft: parsedValue.latestDraft ?? null,
          engagementByRecommendationId:
            parsedValue.engagementByRecommendationId ?? {},
        };

        persistStoredRecommendationState(nextState);

        return {
          browserIdentityId: identityState.browserIdentityId,
          ...nextState,
          storageMessage:
            "migrated browser storage to anonymous identity boundary",
        };
      }

      if (parsedValue.version === 2) {
        const nextState = {
          recommendations:
            Array.isArray(parsedValue.recommendations) &&
            parsedValue.recommendations.length > 0
              ? parsedValue.recommendations
              : initialRecommendations,
          latestDraft: parsedValue.latestDraft ?? null,
          engagementByRecommendationId: {},
        };

        persistStoredRecommendationState(nextState);

        return {
          browserIdentityId: identityState.browserIdentityId,
          ...nextState,
          storageMessage:
            "migrated browser storage to anonymous identity boundary",
        };
      }

      if (parsedValue.version !== RECOMMENDATION_STORAGE_VERSION) {
        resetStoredRecommendationState();

        return {
          browserIdentityId: identityState.browserIdentityId,
          recommendations: initialRecommendations,
          latestDraft: null,
          engagementByRecommendationId: {},
          storageMessage: "storage reset after version change",
        };
      }

      const nextState = {
        recommendations:
          Array.isArray(parsedValue.recommendations) &&
          parsedValue.recommendations.length > 0
            ? parsedValue.recommendations
            : initialRecommendations,
        latestDraft: parsedValue.latestDraft ?? null,
        engagementByRecommendationId:
          parsedValue.engagementByRecommendationId ?? {},
      };

      persistStoredRecommendationState(nextState);

      return {
        browserIdentityId: identityState.browserIdentityId,
        ...nextState,
        storageMessage: "migrated browser storage to anonymous identity boundary",
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
      browserIdentityId: identityState.browserIdentityId,
      recommendations,
      latestDraft,
      engagementByRecommendationId: {},
      storageMessage: legacyValue
        ? "migrated legacy browser storage to anonymous identity boundary"
        : storageMessage,
    };
  } catch {
    const identityState = ensureBrowserIdentity();

    return {
      browserIdentityId: identityState.browserIdentityId,
      recommendations: initialRecommendations,
      latestDraft: null,
      engagementByRecommendationId: {},
      storageMessage: "storage parse failed, reverted to seeded feed",
    };
  }
}

export function persistStoredRecommendationState({
  recommendations,
  latestDraft,
  engagementByRecommendationId,
}: PersistRecommendationStateInput) {
  const identityState = ensureBrowserIdentity();

  window.localStorage.setItem(
    RECOMMENDATION_STORAGE_KEY,
    JSON.stringify({
      version: RECOMMENDATION_STORAGE_VERSION,
      ownerBrowserIdentityId: identityState.browserIdentityId,
      recommendations,
      latestDraft,
      engagementByRecommendationId,
    } satisfies StoredRecommendationState),
  );
}

export function appendDraftToStoredRecommendationState({
  draft,
  currentMember,
  initialRecommendations,
  activeTheme,
}: AppendDraftInput) {
  const currentState = loadStoredRecommendationState(initialRecommendations);
  const latestDraft = createRecommendationFromDraft(
    draft,
    currentMember,
    activeTheme,
  );
  const recommendations = [latestDraft, ...currentState.recommendations];
  const engagementByRecommendationId = {
    ...currentState.engagementByRecommendationId,
    [latestDraft.id]: createEmptyRecommendationEngagementState(),
  };

  persistStoredRecommendationState({
    recommendations,
    latestDraft,
    engagementByRecommendationId,
  });

  return {
    browserIdentityId: currentState.browserIdentityId,
    recommendations,
    latestDraft,
    engagementByRecommendationId,
    storageMessage: "saved to browser storage with anonymous identity",
  };
}

export function resetStoredRecommendationState() {
  window.localStorage.removeItem(RECOMMENDATION_STORAGE_KEY);
  window.localStorage.removeItem(LEGACY_RECOMMENDATION_STORAGE_KEY);
}
