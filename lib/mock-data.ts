import type {
  MemberProfile,
  MusicPlatform,
  SongRecommendation,
  ThemeSpotlight,
} from "@/lib/types";

export const platformLabels: Record<MusicPlatform, string> = {
  spotify: "Spotify",
  youtube_music: "YouTube Music",
  apple_music: "Apple Music",
  soundcloud: "SoundCloud",
  other: "Other",
};

export const members: MemberProfile[] = [
  {
    id: "kai",
    nickname: "Kai",
    bio: "밤 산책할 때 킥 드럼이 선명한 곡을 주로 모아요.",
    favoriteGenres: ["Hip-hop", "Cloud Rap", "Alt R&B"],
    mainPlatform: "spotify",
    playlistLinks: [
      {
        label: "Late Drive",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd",
      },
    ],
  },
  {
    id: "yuri",
    nickname: "Yuri",
    bio: "보컬 텍스처가 예쁜 R&B와 네오소울을 자주 들어요.",
    favoriteGenres: ["Neo Soul", "R&B", "Jazz Rap"],
    mainPlatform: "apple_music",
    playlistLinks: [
      {
        label: "Velvet Notes",
        url: "https://music.apple.com/us/playlist/neo-soul-essentials/pl.6d0f0c4e3b9f4bb7b6e228ca36c6bcb1",
      },
    ],
  },
  {
    id: "min",
    nickname: "Min",
    bio: "세트 전에 BPM 올리기 좋은 UK garage랑 house를 찾습니다.",
    favoriteGenres: ["UK Garage", "House", "Jersey Club"],
    mainPlatform: "soundcloud",
    playlistLinks: [
      {
        label: "Warm Up Crates",
        url: "https://soundcloud.com/discover/sets/party",
      },
    ],
  },
  {
    id: "seo",
    nickname: "Seo",
    bio: "가사보다 무드 먼저 듣는 편이라 드림팝도 자주 섞어요.",
    favoriteGenres: ["Dream Pop", "Indie R&B", "Lo-fi Hip-hop"],
    mainPlatform: "youtube_music",
    playlistLinks: [
      {
        label: "Soft Glow",
        url: "https://music.youtube.com/playlist?list=RDCLAK5uy_n6fSxj2xodlJ8n7n5kGm3qv2iK3FknmR4",
      },
    ],
  },
  {
    id: "haneul",
    nickname: "Haneul",
    bio: "붐뱁 샘플링이랑 클래식한 드럼 질감을 좋아해요.",
    favoriteGenres: ["Boom Bap", "Jazz Rap", "Soul"],
    mainPlatform: "spotify",
    playlistLinks: [
      {
        label: "Dusty Cuts",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX8Kgdykz6OKj",
      },
    ],
  },
  {
    id: "dami",
    nickname: "Dami",
    bio: "무대 전에 에너지 올리는 트랩과 하이퍼팝을 번갈아 들어요.",
    favoriteGenres: ["Trap", "Hyperpop", "Electro"],
    mainPlatform: "spotify",
    playlistLinks: [
      {
        label: "Stage Energy",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX1clOuib1KtQ",
      },
    ],
  },
  {
    id: "woo",
    nickname: "Woo",
    bio: "한 곡을 오래 파는 편이라 라이브 버전까지 같이 저장해요.",
    favoriteGenres: ["Alternative Hip-hop", "Live Session", "Indie"],
    mainPlatform: "youtube_music",
    playlistLinks: [
      {
        label: "Live Cuts",
        url: "https://music.youtube.com/playlist?list=RDCLAK5uy_n0yI0I0JdH8rj9m22R1p2qj43ZzS7v0xU",
      },
    ],
  },
  {
    id: "jiu",
    nickname: "Jiu",
    bio: "새벽 공부할 때는 앰비언트와 다운템포를 같이 들어요.",
    favoriteGenres: ["Ambient", "Downtempo", "Trip-hop"],
    mainPlatform: "apple_music",
    playlistLinks: [
      {
        label: "After Midnight",
        url: "https://music.apple.com/us/playlist/chill-essentials/pl.7d8c0dc4d4284e4fa8b85d74d7b3fb47",
      },
    ],
  },
  {
    id: "tae",
    nickname: "Tae",
    bio: "랩보다 사운드 디자인이 재밌는 곡을 오래 찾습니다.",
    favoriteGenres: ["Experimental", "Bass", "Industrial Rap"],
    mainPlatform: "soundcloud",
    playlistLinks: [
      {
        label: "Left Field Finds",
        url: "https://soundcloud.com/discover/sets/charts-top",
      },
    ],
  },
  {
    id: "ria",
    nickname: "Ria",
    bio: "맑은 코드 진행의 시티팝과 R&B 교차 지점을 좋아해요.",
    favoriteGenres: ["City Pop", "R&B", "Funk"],
    mainPlatform: "spotify",
    playlistLinks: [
      {
        label: "Blue Window",
        url: "https://open.spotify.com/playlist/37i9dQZF1DX4UtSsGT1Sbe",
      },
    ],
  },
];

const baseRecommendations: Array<
  Omit<SongRecommendation, "memberNickname" | "reactionCount" | "saveCount">
> = [
  {
    id: "rec-001",
    memberId: "kai",
    trackTitle: "Nights Like This",
    artistName: "The Kid LAROI",
    platform: "spotify",
    url: "https://open.spotify.com/track/1TQXIltqoZ5XXyfCbAeSQQ",
    comment: "밤공기랑 패드가 자연스럽게 붙어서 산책 시작할 때 좋아요.",
    moodTags: ["night", "glow", "cruising"],
    createdAt: "2026-03-18T22:15:00+09:00",
  },
  {
    id: "rec-002",
    memberId: "yuri",
    trackTitle: "Can I Call You Rose?",
    artistName: "Thee Sacred Souls",
    platform: "apple_music",
    url: "https://music.apple.com/us/song/can-i-call-you-rose/1510011642",
    comment: "보컬 톤이 부드럽게 밀려와서 첫 인상이 정말 좋아요.",
    moodTags: ["soft", "warm", "soul"],
    createdAt: "2026-03-18T20:10:00+09:00",
  },
  {
    id: "rec-003",
    memberId: "min",
    trackTitle: "B.O.T.A. (Baddest Of Them All)",
    artistName: "Eliza Rose",
    platform: "soundcloud",
    url: "https://soundcloud.com/elizarosemusic/bota-baddest-of-them-all",
    comment: "드랍 전에 몸이 먼저 반응하는 타입의 셋업 곡이에요.",
    moodTags: ["club", "bounce", "garage"],
    createdAt: "2026-03-18T18:40:00+09:00",
  },
  {
    id: "rec-004",
    memberId: "seo",
    trackTitle: "Telepatia",
    artistName: "Kali Uchis",
    platform: "youtube_music",
    url: "https://music.youtube.com/watch?v=bn_p95HbHoQ",
    comment: "리듬은 느슨한데 집중력은 높아지는 이상한 매력이 있어요.",
    moodTags: ["floating", "late-night", "dreamy"],
    createdAt: "2026-03-17T23:20:00+09:00",
  },
  {
    id: "rec-005",
    memberId: "haneul",
    trackTitle: "Accordion",
    artistName: "Madvillain",
    platform: "spotify",
    url: "https://open.spotify.com/track/4q2lZIu8iC6W1acgA4aZfP",
    comment: "드럼보다 샘플이 먼저 꽂힐 때 다시 꺼내 듣는 곡입니다.",
    moodTags: ["dusty", "sample", "classic"],
    createdAt: "2026-03-17T21:00:00+09:00",
  },
  {
    id: "rec-006",
    memberId: "dami",
    trackTitle: "365",
    artistName: "Charli xcx",
    platform: "spotify",
    url: "https://open.spotify.com/track/2pFJ0J4pK7Hn3H4JmpqYxM",
    comment: "공연 전에 텐션 최대치로 만들 때 딱 필요한 속도감이에요.",
    moodTags: ["high-energy", "flash", "performance"],
    createdAt: "2026-03-17T19:50:00+09:00",
  },
  {
    id: "rec-007",
    memberId: "woo",
    trackTitle: "Redbone (Live)",
    artistName: "Childish Gambino",
    platform: "youtube_music",
    url: "https://music.youtube.com/watch?v=Kp7eSUU9oy8",
    comment: "라이브 질감 때문에 원곡과는 다른 온도가 생겨요.",
    moodTags: ["live", "groove", "vocals"],
    createdAt: "2026-03-17T17:30:00+09:00",
  },
  {
    id: "rec-008",
    memberId: "jiu",
    trackTitle: "Kiara",
    artistName: "Bonobo",
    platform: "apple_music",
    url: "https://music.apple.com/us/song/kiara/355898287",
    comment: "새벽 집중 구간에서 너무 튀지 않게 감정선만 올려줘요.",
    moodTags: ["focus", "deep", "ambient"],
    createdAt: "2026-03-17T15:00:00+09:00",
  },
  {
    id: "rec-009",
    memberId: "tae",
    trackTitle: "Vordhosbn",
    artistName: "Aphex Twin",
    platform: "other",
    url: "https://warp.net/products/66084-aphex-twin-drukqs",
    comment: "박자가 무너지는 것 같다가도 다시 붙는 순간이 재밌습니다.",
    moodTags: ["chaotic", "technical", "left-field"],
    createdAt: "2026-03-16T23:10:00+09:00",
  },
  {
    id: "rec-010",
    memberId: "ria",
    trackTitle: "Plastic Love",
    artistName: "Mariya Takeuchi",
    platform: "spotify",
    url: "https://open.spotify.com/track/7rU6Iebxzlvqy5t857bKFq",
    comment: "클래식하지만 질리지 않는 시티팝의 기준점 같아요.",
    moodTags: ["city", "retro", "smooth"],
    createdAt: "2026-03-16T21:45:00+09:00",
  },
  {
    id: "rec-011",
    memberId: "kai",
    trackTitle: "Cocoa",
    artistName: "Baby Keem",
    platform: "spotify",
    url: "https://open.spotify.com/track/5T2bqYVfJxKxV5g7k6v7kQ",
    comment: "저역이 넓게 깔려서 이어폰 테스트할 때 자주 틀어요.",
    moodTags: ["bass", "smoke", "low-end"],
    createdAt: "2026-03-16T19:20:00+09:00",
  },
  {
    id: "rec-012",
    memberId: "yuri",
    trackTitle: "Distance",
    artistName: "Yebba",
    platform: "apple_music",
    url: "https://music.apple.com/us/song/distance/1575704055",
    comment: "후렴보다 벌스의 숨결이 더 남는 곡이에요.",
    moodTags: ["intimate", "vocals", "slow-burn"],
    createdAt: "2026-03-16T16:55:00+09:00",
  },
];

const seededEngagementMetrics = [
  { reactionCount: 18, saveCount: 9 },
  { reactionCount: 14, saveCount: 11 },
  { reactionCount: 21, saveCount: 8 },
  { reactionCount: 16, saveCount: 12 },
  { reactionCount: 24, saveCount: 15 },
  { reactionCount: 27, saveCount: 13 },
  { reactionCount: 13, saveCount: 7 },
  { reactionCount: 11, saveCount: 10 },
  { reactionCount: 9, saveCount: 5 },
  { reactionCount: 19, saveCount: 16 },
  { reactionCount: 15, saveCount: 6 },
  { reactionCount: 12, saveCount: 9 },
];

const liveThemeRecommendationIds = new Set(["rec-001", "rec-002", "rec-003"]);

export const recommendations: SongRecommendation[] = baseRecommendations.map(
  (recommendation, index) => ({
    ...recommendation,
    memberNickname: getMemberName(recommendation.memberId),
    reactionCount: seededEngagementMetrics[index]?.reactionCount ?? 0,
    saveCount: seededEngagementMetrics[index]?.saveCount ?? 0,
    themeId: liveThemeRecommendationIds.has(recommendation.id)
      ? "theme-001"
      : undefined,
    themeTitle: liveThemeRecommendationIds.has(recommendation.id)
      ? "SPRING CYPHER WARM-UP"
      : undefined,
    themePhaseLabel: liveThemeRecommendationIds.has(recommendation.id)
      ? "Live Theme"
      : undefined,
  }),
);

export const sortedRecommendations = [...recommendations].sort((left, right) =>
  right.createdAt.localeCompare(left.createdAt),
);

export const themeSpotlights: ThemeSpotlight[] = [
  {
    id: "theme-001",
    title: "SPRING CYPHER WARM-UP",
    description:
      "행사 전 붐뱁과 crew energy를 다시 끌어올리는 트랙을 모읍니다. 추천 자체가 공연 전 대화와 팀 바이브를 예열하는 구조를 목표로 합니다.",
    relatedEvent: "Spring Cipher Night",
    isActive: true,
    phaseLabel: "Live Theme",
    activationWindow: "03.24 - 03.28",
    ctaLabel: "Warm up the set",
    ctaHref: "/recommendations/new",
    curatorNote:
      "운영진이 공연 전 mood를 정리하고 신입도 쉽게 한 곡씩 얹을 수 있도록 설계한 테마입니다.",
    participantSummary: "17 members already adding warm-up tracks",
    highlightTags: ["boom bap", "crew energy", "warm-up"],
  },
  {
    id: "theme-002",
    title: "NEW MEMBER HANDSHAKE",
    description:
      "신입이 자신의 취향을 가장 잘 설명하는 첫 곡을 남기고, 기존 멤버가 그 곡을 통해 먼저 말을 걸 수 있게 돕는 환영 슬롯입니다.",
    relatedEvent: "New Member Welcome Session",
    isActive: false,
    phaseLabel: "Queued Next",
    activationWindow: "03.29 - 04.02",
    ctaLabel: "Prep welcome picks",
    ctaHref: "/recommendations/new",
    curatorNote:
      "프로필 탐색과 추천 피드를 자연스럽게 묶어 신입 onboarding friction을 낮추는 데 초점을 둡니다.",
    participantSummary: "Ready for onboarding week",
    highlightTags: ["intro", "first pick", "welcome"],
  },
  {
    id: "theme-003",
    title: "AFTER SESSION DEBRIEF",
    description:
      "세션이나 공연 이후 여운이 남는 곡을 묶어, 행사가 끝난 뒤에도 대화를 이어가는 회고 큐레이션 슬롯입니다.",
    relatedEvent: "Post Session Debrief",
    isActive: false,
    phaseLabel: "Archive Slot",
    activationWindow: "Always available",
    ctaLabel: "Leave a debrief track",
    ctaHref: "/recommendations/new",
    curatorNote:
      "행사 후 감상을 카톡 밖에서도 이어갈 수 있게 만드는 retention 실험용 테마입니다.",
    participantSummary: "Used for post-event reflection",
    highlightTags: ["debrief", "afterglow", "reflection"],
  },
];

export const allGenres = Array.from(
  new Set(members.flatMap((member) => member.favoriteGenres)),
).sort();

export const allPlatforms = Array.from(
  new Set(members.map((member) => member.mainPlatform)),
);

export function getMemberById(id: string) {
  return members.find((member) => member.id === id);
}

export function getRecommendationsByMemberId(memberId: string) {
  return sortedRecommendations
    .filter((recommendation) => recommendation.memberId === memberId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getMemberName(memberId: string) {
  return getMemberById(memberId)?.nickname ?? "Unknown";
}

export function getActiveThemeSpotlight() {
  return themeSpotlights.find((themeSpotlight) => themeSpotlight.isActive);
}
