import type { MusicPlatform, PlatformLinkMap, SongRecommendation } from "@/lib/types";

const SEARCH_BASE_URLS: Partial<Record<MusicPlatform, string>> = {
  spotify: "https://open.spotify.com/search/",
  apple_music: "https://music.apple.com/us/search?term=",
  youtube_music: "https://music.youtube.com/search?q=",
  soundcloud: "https://soundcloud.com/search?q=",
  melon: "https://www.melon.com/search/total/index.htm?q=",
};

export function normalizePlatformLinkMap(
  platformLinks?: PlatformLinkMap,
  sourcePlatform?: MusicPlatform,
) {
  if (!platformLinks) {
    return undefined;
  }

  const normalizedEntries = Object.entries(platformLinks).filter(([platform, url]) => {
    if (!url || url.trim().length === 0) {
      return false;
    }

    if (sourcePlatform && platform === sourcePlatform) {
      return false;
    }

    try {
      new URL(url.trim());
      return true;
    } catch {
      return false;
    }
  });

  if (normalizedEntries.length === 0) {
    return undefined;
  }

  return Object.fromEntries(
    normalizedEntries.map(([platform, url]) => [platform, url.trim()]),
  ) as PlatformLinkMap;
}

export function createPlatformSearchUrl(
  platform: MusicPlatform,
  searchQuery: string,
) {
  const searchBaseUrl = SEARCH_BASE_URLS[platform];

  if (!searchBaseUrl) {
    return null;
  }

  return `${searchBaseUrl}${encodeURIComponent(searchQuery.trim())}`;
}

type ResolveRecommendationLinkInput = {
  recommendation: SongRecommendation;
  preferredPlatform?: MusicPlatform;
};

export function resolveRecommendationLink({
  recommendation,
  preferredPlatform,
}: ResolveRecommendationLinkInput) {
  const searchQuery =
    recommendation.searchQuery?.trim() ||
    `${recommendation.trackTitle} ${recommendation.artistName}`.trim();

  if (preferredPlatform) {
    if (preferredPlatform === recommendation.platform) {
      return {
        href: recommendation.url,
        label: `${preferredPlatform} direct`,
        helperText: "viewer preferred platform matches the source link",
        isFallback: false,
      };
    }

    const preferredAlternateLink =
      recommendation.alternatePlatformUrls?.[preferredPlatform];

    if (preferredAlternateLink) {
      return {
        href: preferredAlternateLink,
        label: `${preferredPlatform} direct`,
        helperText: "viewer preferred platform link is attached to this rec",
        isFallback: false,
      };
    }

    const preferredSearchLink = createPlatformSearchUrl(
      preferredPlatform,
      searchQuery,
    );

    if (preferredSearchLink) {
      return {
        href: preferredSearchLink,
        label: `${preferredPlatform} search`,
        helperText: "direct link is missing, so the CTA falls back to your platform search",
        isFallback: true,
      };
    }
  }

  return {
    href: recommendation.url,
    label: `${recommendation.platform} source`,
    helperText: "opening the original platform link attached by the recommender",
    isFallback: false,
  };
}
