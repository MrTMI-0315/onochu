# Onochu PRD v0.2

## 1. Source

- Source file: `/Users/mrtmi/Downloads/Onochu_PRD_v0.2.md`
- Version: `v0.2`
- Scope: KNU_POW 동아리용 음악 추천/발견 커뮤니티 웹앱 MVP

## 2. Product Summary

- Product name: Onochu
- One-line description:
  - 카카오톡 단체방에서 묻히는 추천곡을 구조화해 남기고, 플랫폼이 달라도 곡을 식별하고 반응할 수 있게 만드는 모바일 우선 음악 커뮤니티 웹앱
- Why now:
  - 추천곡이 카톡 대화 흐름에 묻힌다
  - 플랫폼 차이 때문에 링크 소비 전환이 끊긴다
  - 추천이 사람 이해와 운영 실험으로 축적되지 않는다

## 3. Product Intent

- 추천곡을 휘발성 대화가 아니라 축적 가능한 커뮤니티 자산으로 전환한다.
- 플랫폼이 달라도 곡명, 아티스트, 추천 이유를 먼저 이해할 수 있게 만든다.
- 추천을 계기로 사람 간 상호작용을 늘리고, 이번 학기 안에 retention과 행사 참여율에 긍정 신호가 있는지 검증한다.

## 4. Community Hypotheses

- 구조화된 추천 공간이 카톡방보다 음악 기반 상호작용을 늘린다.
- 플랫폼 마찰을 줄이면 추천곡 소비율이 올라간다.
- 프로필과 추천곡이 쌓이면 신입과 기존 부원 사이 대화 시작점이 생긴다.
- 주간/행사 테마 슬롯이 있으면 운영진이 참여를 유도하기 쉬워진다.

## 5. Problems

- Recommendation loss:
  - 추천곡이 대화에 묻히고 다시 찾기 어렵다.
- Platform friction:
  - Spotify, Apple Music, YouTube Music, SoundCloud 링크가 서로 바로 소비되지 않는다.
- Weak person context:
  - 누가 어떤 취향인지 사람 단위로 남지 않는다.
- Weak operational connection:
  - 행사 전후 예열, 회고, 테마 큐레이션과 연결되기 어렵다.

## 6. Goals

- 추천곡이 묻히지 않고 남는 구조를 만든다.
- 링크보다 곡 정보와 추천 맥락이 먼저 보이게 한다.
- 추천곡에 대해 가볍게 반응하거나 저장할 수 있게 한다.
- 사람의 취향이 프로필과 최근 추천으로 보이게 한다.
- 주간/행사 테마 슬롯으로 운영 실험이 가능해야 한다.

## 7. Non-Goals

- 정식 음악 API 연동
- 자동 다중 플랫폼 변환 링크
- DM / 채팅 / 팔로우
- 고급 알림
- 복잡한 관리자 대시보드
- 정교한 추천 엔진
- 학교 인증 / SSO

## 8. Primary Users

- KNU_POW 동아리원
- 신입 부원
- 운영진 / 행사 기획진

## 9. Product Principles

- Community-first
- Song-first, not Link-first
- Low-friction
- Mobile-first
- Interaction over Decoration
- Operationally Useful

## 10. MVP Scope

### 10.1 Recommendation Feed

- 최신 추천곡 리스트
- 곡명, 아티스트, 추천인, 추천 코멘트, 태그, 플랫폼, 외부 링크
- 가벼운 반응 또는 저장 UI

### 10.2 Recommendation Create

- 곡명
- 아티스트
- 원본 플랫폼
- 원본 링크
- 한 줄 추천 이유
- 무드/장르 태그

### 10.3 Member Profile

- 닉네임
- 한 줄 소개
- 선호 장르
- 주 사용 플랫폼
- 최근 추천곡 일부

### 10.4 Member Directory

- 멤버 카드 리스트
- 닉네임 검색
- 장르 필터
- 플랫폼 필터

### 10.5 Lightweight Reaction or Save

- 좋아요
- fire
- 나중에 듣기 / 저장

### 10.6 Weekly / Event Theme Slot

- 이번 주 오노추
- 행사 전 워밍업 추천
- 행사 관련 큐레이션 슬롯

## 11. Functional Requirements

- `/`
  - 서비스 소개
  - pain point
  - CTA
- `/recommendations`
  - 최신 추천곡 피드
  - 반응/저장 UI
  - theme / featured section
- `/recommendations/new`
  - 추천곡 등록 폼
  - 낮은 입력 마찰
- `/members`
  - 멤버 디렉터리
  - 검색/필터
- `/members/[id]`
  - 프로필 정보
  - 최근 추천곡
- `/profile/edit`
  - 프로필 생성/수정
  - local/mock state 허용

## 12. Information Architecture

- `/`
- `/recommendations`
- `/recommendations/new`
- `/members`
- `/members/[id]`
- `/profile/edit`

Navigation:

- Home
- Recs
- Members
- My Profile

## 13. Initial Data Model

```ts
type MusicPlatform =
  | "spotify"
  | "apple_music"
  | "youtube_music"
  | "soundcloud"
  | "other";

type MemberProfile = {
  id: string;
  nickname: string;
  bio: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  avatarUrl?: string;
};

type SongRecommendation = {
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
  reactionCount?: number;
  saveCount?: number;
};

type ThemeSpotlight = {
  id: string;
  title: string;
  description: string;
  relatedEvent?: string;
  isActive: boolean;
};
```

## 14. Technical Direction

- Next.js
- TypeScript
- Tailwind CSS
- Vercel
- Phase 1: mock/static data
- Phase 2: Supabase persistence

## 15. Success Metrics

- 프로필 생성 수
- 추천곡 등록 수
- 추천곡 조회 수
- 링크 클릭 수
- 반응 / 저장 수
- 추천곡 등록 유저 수
- 주간 활성 사용자 수
- 테마 참여율
- 행사 참여 의사 / retention 관련 정성 신호

## 16. MVP Acceptance Criteria

- [ ] 랜딩 페이지 존재
- [ ] 추천곡 피드 페이지 존재
- [ ] 추천곡 등록 페이지 존재
- [ ] 멤버 디렉터리 페이지 존재
- [ ] 멤버 상세 페이지 존재
- [ ] 프로필 생성/수정 페이지 존재
- [ ] 추천곡 카드에 곡명 / 아티스트 / 추천인 / 코멘트 / 플랫폼 / 태그 표시
- [ ] 추천곡 등록 가능
- [ ] 멤버 검색 가능
- [ ] 장르 필터 가능
- [ ] 플랫폼 필터 가능
- [ ] 가벼운 반응 또는 저장 UI 존재
- [ ] 주간/행사 테마 슬롯 존재
- [ ] 모바일 기준 usable
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
- [ ] Vercel 배포 가능 상태
