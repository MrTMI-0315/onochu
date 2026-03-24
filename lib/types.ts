export type MusicPlatform =
  | "spotify"
  | "youtube_music"
  | "apple_music"
  | "soundcloud"
  | "other";

export type PlaylistLink = {
  label: string;
  url: string;
};

export type MemberProfile = {
  id: string;
  nickname: string;
  bio: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  playlistLinks: PlaylistLink[];
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
  moodTags: string[];
  createdAt: string;
  reactionCount: number;
  saveCount: number;
};

export type RecommendationDraftInput = {
  trackTitle: string;
  artistName: string;
  platform: MusicPlatform;
  url: string;
  comment: string;
  moodTags: string[];
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
