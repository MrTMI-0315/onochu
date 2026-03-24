# Onochu PRD v0.3

## 1. Source

- Source file: `/Users/mrtmi/Downloads/Onochu_PRD_v0.3.md`
- Version: `v0.3`
- Scope: KNU_POW 동아리용 Mobile-First Connection MVP

## 2. Product Overview

- Product name: Onochu
- One-line description:
  - 카카오톡 단체방에 묻히는 음악 추천을 구조화해 남기고, 플랫폼이 달라도 곡을 이해하고 반응할 수 있게 하며, 음악을 통해 동아리원들 간 연결을 더 잘 일어나게 만드는 모바일 우선 커뮤니티 웹앱
- Product type:
  - 모바일 우선 웹앱
  - 동아리 단위 커뮤니티 실험 제품
  - 스트리밍 서비스 아님
  - 플레이리스트 관리 툴 아님
  - 음악 플랫폼 통합 서비스 아님

## 3. Why This Product Exists

- 카톡방에서는 추천이 일반 대화에 묻혀 휘발된다.
- 플랫폼이 다르면 링크 청취 전환이 끊기고 곡을 다시 검색해야 한다.
- 추천이 사람 이해와 관계 형성으로 이어지지 않는다.
- 추천 문화가 주간 테마, 행사 참여, 신입 적응과 구조적으로 연결되지 않는다.

## 4. Core Product Belief

> AI era의 디지털 제품 가치는 단순 정보 전달이 아니라 사람들 사이의 맥락 있는 연결을 더 잘 일어나게 만드는 데 있다.

Onochu는 이 믿음을 음악 커뮤니티에 적용한다. 핵심은 링크 수집이 아니라:

- 추천이 묻히지 않게 하고
- 추천한 사람과 이유를 보이게 하고
- 플랫폼 차이를 넘어 곡의 정체성을 이해하게 하고
- 취향을 통해 사람을 발견하게 하고
- 그 결과로 관계와 참여를 촉진하는 것이다

## 5. Product Intent

- 카카오톡 단체방에서 휘발되는 추천을 축적 가능한 형태로 전환한다.
- 플랫폼이 달라도 추천곡을 식별하고 반응할 수 있는 경험을 만든다.
- 추천곡을 통해 사람의 취향이 프로필과 기록으로 남게 만든다.
- 음악을 통해 부원들이 서로를 더 쉽게 발견하고 연결되게 만든다.
- 이 구조가 실제로 retention 및 행사 참여율에 긍정적 영향을 주는지 검증한다.

## 6. Community Hypotheses

- 구조화된 추천 공간이 카톡방보다 음악 기반 상호작용을 늘린다.
- 플랫폼 차이 마찰을 줄이면 추천곡 소비율과 반응률이 올라간다.
- 추천곡과 프로필이 쌓이면 신입과 기존 부원 간 대화 시작점이 더 쉽게 생긴다.
- 주간 테마나 행사 연계 추천 구조가 있으면 동아리 활동 진입 장벽이 낮아진다.
- 이런 상호작용이 누적되면 retention과 행사 참여율에 긍정 신호가 나타난다.

## 7. Onochu Is / Is Not

### 7.1 Onochu Is

- 음악을 매개로 사람을 발견하게 하는 커뮤니티 인터페이스
- 추천이 묻히지 않게 만드는 구조
- 취향 기반 관계 형성을 돕는 도구
- 동아리 운영과 문화 실험을 연결하는 모바일 웹앱

### 7.2 Onochu Is Not

- 일반적인 플레이리스트 관리 앱
- 음원 스트리밍 앱
- Spotify/Apple Music 통합 플랫폼
- 기업형 SaaS 대시보드
- 단순 CRUD 링크 저장소

## 8. Target Users

- Primary:
  - KNU_POW 동아리원
  - 음악 추천과 취향 공유에 관심 있는 대학생
  - 힙합, R&B, 비트, DJing, digging 문화에 익숙한 사용자
- Secondary:
  - 새로 들어온 신입 부원
  - 주간 테마/행사 분위기 예열을 운영하는 운영진
  - 공연, 정모, 세션 전후로 참여 접점을 만들고 싶은 멤버
- Usage context:
  - 카카오톡 단톡방 링크 진입
  - 모바일에서 짧게 훑고 반응하는 사용 패턴
  - 행사 전후 추천곡 확인
  - 신입이 다른 부원 취향을 훑으며 관계 접점을 찾는 상황

## 9. Product Principles

- Mobile-first
- Song-first, not Link-first
- Community-first, not Platform-first
- Low-friction
- Connection over Decoration
- Operational Utility

## 10. MVP Goal

> 추천곡을 구조화해 남기고, 플랫폼이 달라도 곡을 이해하고 반응할 수 있게 만들면, 동아리 내 음악 기반 상호작용이 실제로 증가하는가?

## 11. Core UX Value

사용자는 Onochu 안에서:

1. 곡이 무엇인지 바로 이해한다
2. 누가 추천했는지 본다
3. 왜 추천했는지 읽는다
4. 반응하거나 저장한다
5. 추천인을 눌러 다른 취향까지 이어서 본다
6. 그 과정에서 사람과 사람 사이의 접점을 발견한다

추천 피드는 링크 모음이 아니라 사람의 취향이 축적되는 관계 지도여야 한다.

## 12. MVP Scope

### 12.1 Recommendation Feed

- 곡명
- 아티스트
- 추천인
- 추천 코멘트
- 장르/무드 태그
- 플랫폼 배지
- 원본 링크
- 가벼운 반응 또는 저장

### 12.2 Recommendation Create

- 곡명
- 아티스트
- 플랫폼
- 원본 링크
- 한 줄 코멘트
- 선택 태그

### 12.3 Member Directory

- 멤버 카드 리스트
- 닉네임 검색
- 장르 필터
- 플랫폼 필터

### 12.4 Member Profile

- 닉네임
- 짧은 소개
- 선호 장르
- 주 사용 플랫폼
- 최근 추천곡

### 12.5 Lightweight Reaction / Save

- 좋아요
- fire
- 나중에 듣기 / 저장

### 12.6 Weekly / Event Theme Slot

- 이번 주 오노추
- 행사 전 워밍업 추천
- 신입 환영 테마

## 13. Secondary but Important Features

- Profile Create / Edit:
  - 닉네임
  - 한 줄 소개
  - 선호 장르
  - 주 사용 플랫폼
- Landing Page:
  - 카톡방에서 추천이 묻힌다
  - 플랫폼 차이로 바로 못 듣는다
  - Onochu는 이를 구조화해 사람 간 연결을 돕는다
- Event / Theme Visibility:
  - 메인 홈 또는 추천 피드 상단에 주간 테마/행사 연계 영역 노출

## 14. Out of Scope

- 정식 음악 API 통합
- 자동 다중 플랫폼 링크 변환
- 스트리밍 기능
- 복잡한 댓글 스레드
- 팔로우/DM
- 정교한 추천 알고리즘
- 관리자 대시보드
- 네이티브 앱
- 복잡한 로그인 구조

## 15. Login Strategy

- MVP 1차:
  - 로그인 없이 시작하거나 매우 약한 진입 구조
- Later phase:
  - 식별과 저장 필요성이 커지면 카카오 로그인 검토

## 16. Information Architecture

- `/` — Landing
- `/recommendations` — Recommendation Feed
- `/recommendations/new` — Recommendation Create
- `/members` — Member Directory
- `/members/[id]` — Member Profile
- `/profile/edit` — Profile Create / Edit

Navigation:

- Home
- Recs
- Members
- My Profile

## 17. Design Direction

- 모바일 우선
- 카드 중심 UI
- 세로 스크롤 피드
- 빠른 탐색
- 낮은 입력 마찰
- 다크모드 선호
- 랜딩은 더 강한 브랜드 무드를 허용
- 인앱 화면은 가독성, 속도, 모바일 사용성을 우선

## 18. Initial Data Model

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

## 19. Success Metrics

### 19.1 Product Metrics

- 프로필 생성 수
- 추천곡 등록 수
- 추천곡 조회 수
- 추천곡 링크 클릭 수
- 저장 수
- 반응 수

### 19.2 Community Metrics

- 추천곡 등록 사용자 수
- 주간 활성 사용자 수
- 신입 유저 프로필 생성 비율
- 멤버 프로필 탐색 빈도
- 추천곡별 반응 수

### 19.3 Event / Retention Validation Signals

- 행사 전후 테마 참여율
- 행사 관련 추천곡 조회 수
- 앱 사용자의 행사 참여 의향 변화
- 신입 부원 중 앱 사용자 잔존 신호
- 카톡방 외부에서의 음악 대화 증가 여부

### 19.4 Core Validation Questions

- 추천곡이 실제로 덜 묻힌다고 느끼는가?
- 플랫폼이 달라도 탐색이 더 쉬워졌다고 느끼는가?
- 사람의 취향이 더 잘 보인다고 느끼는가?
- 이 앱이 동아리 문화와 행사 참여에 보조적 역할을 하는가?

## 20. Acceptance Criteria

- [ ] 랜딩 페이지가 존재한다
- [ ] 추천곡 피드가 존재한다
- [ ] 추천곡 등록 페이지가 존재한다
- [ ] 멤버 디렉토리 페이지가 존재한다
- [ ] 멤버 상세 페이지가 존재한다
- [ ] 프로필 생성/수정 페이지가 존재한다
- [ ] 추천 카드에 곡명 / 아티스트 / 추천인 / 코멘트 / 플랫폼 / 태그가 표시된다
- [ ] 가벼운 반응 또는 저장 UI가 존재한다
- [ ] 주간/행사 테마 슬롯이 존재한다
- [ ] 모바일 기준으로 사용성이 깨지지 않는다
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
- [ ] Vercel 배포 가능한 상태다
