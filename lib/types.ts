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
  trackTitle: string;
  artistName: string;
  platform: MusicPlatform;
  url: string;
  comment: string;
  moodTags: string[];
  createdAt: string;
};
