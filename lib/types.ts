export type MusicPlatform =
  | "spotify"
  | "youtube_music"
  | "apple_music"
  | "soundcloud"
  | "melon"
  | "other";

export type PlaylistLink = {
  label: string;
  url: string;
};

export type PlatformLinkMap = Partial<Record<MusicPlatform, string>>;

export type MemberProfile = {
  id: string;
  nickname: string;
  bio: string;
  mobileTagline?: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  playlistLinks: PlaylistLink[];
  sharedTrackCount?: number;
  avatarUrl?: string;
};

export type SongRecommendation = {
  id: string;
  memberId: string;
  memberNickname: string;
  trackTitle: string;
  artistName: string;
  platform: MusicPlatform;
  url: string;
  comment: string;
  mobileComment?: string;
  moodTags: string[];
  createdAt: string;
  reactionCount: number;
  saveCount: number;
  searchQuery?: string;
  alternatePlatformUrls?: PlatformLinkMap;
  themeId?: string;
  themeTitle?: string;
  themePhaseLabel?: string;
};

export type RecommendationDraftInput = {
  trackTitle: string;
  artistName: string;
  platform: MusicPlatform;
  url: string;
  comment: string;
  moodTags: string[];
  alternatePlatformUrls?: PlatformLinkMap;
};

export type RecommendationEngagementAction = "fire" | "save";

export type RecommendationEngagementState = {
  fire: boolean;
  save: boolean;
};

export type ThemeSpotlight = {
  id: string;
  title: string;
  description: string;
  relatedEvent?: string;
  isActive: boolean;
  phaseLabel?: string;
  activationWindow?: string;
  ctaLabel?: string;
  ctaHref?: string;
  curatorNote?: string;
  participantSummary?: string;
  highlightTags?: string[];
};

export type GenreCollection = {
  id: string;
  slug: string;
  label: string;
  recommendationIds: string[];
};

export type ArtistCollection = {
  id: string;
  slug: string;
  artistName: string;
  recommendationIds: string[];
};

export type ProfileDraft = {
  nickname: string;
  bio: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  playlistLinks: string[];
  updatedAt: string;
};
