# Onochu SPEC v0.2

## 1. Document Purpose

이 문서는 [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md)를 구현 기준으로 다시 쪼갠 명세다. PRD의 의도, 현재 저장소 상태, 남은 구현 갭을 한 번에 참조할 수 있도록 정리한다.

## 2. Product Summary

- 제품명: Onochu
- 한 줄 설명:
  - 카카오톡 단체방에서 묻히는 추천곡을 구조화해 남기고, 플랫폼이 달라도 곡을 식별하고 반응할 수 있게 만드는 모바일 우선 음악 커뮤니티 웹앱
- 핵심 가치:
  - recommendation retention
  - cross-platform discoverability
  - taste-based interaction
  - community activation

## 3. Problem Statement

- 추천곡이 카톡 대화 흐름에 묻혀 다시 찾기 어렵다.
- 플랫폼이 달라 링크를 바로 소비하지 못해 청취 전환이 끊긴다.
- 추천이 사람의 취향 맥락으로 축적되지 않는다.
- 운영진이 주간/행사 큐레이션과 연결하기 어렵다.

## 4. Product Principles

- Community-first
- Song-first, not Link-first
- Low-friction
- Mobile-first
- Interaction over Decoration
- Operationally Useful

## 5. MVP Goals

- 추천곡이 묻히지 않고 남는 피드를 만든다.
- 링크보다 곡 정보와 추천 이유가 먼저 보이게 한다.
- 추천곡에 가볍게 반응하거나 저장할 수 있게 한다.
- 프로필과 최근 추천곡을 통해 사람의 취향을 빠르게 파악하게 한다.
- 주간/행사 테마 슬롯으로 운영 실험을 가능하게 한다.

## 6. Non-Goals

- 정식 음악 API 다중 연동
- 자동 다중 플랫폼 링크 변환
- DM / 채팅 / 팔로우
- 고급 알림
- 정교한 추천 엔진
- 복잡한 관리자 대시보드
- 학교 인증 / SSO

## 7. Target Users and Context

- Primary:
  - KNU_POW 동아리원
- Secondary:
  - 신입 부원
  - 운영진 / 행사 기획진
- Usage context:
  - 카카오톡 링크 진입
  - 모바일 브라우저 우선
  - 짧은 시간 안에 추천곡 확인 / 반응 / 저장 / 프로필 탐색

## 8. Primary Routes

- `/` — Landing
- `/recommendations` — Recommendation Feed
- `/recommendations/new` — Recommendation Create
- `/members` — Member Directory
- `/members/[id]` — Member Profile
- `/profile/edit` — Profile Create / Edit

## 9. Core Data Model

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

## 10. Functional Scope

### 10.1 Landing

- 서비스 소개 문구가 보여야 한다.
- 핵심 pain point와 community hypothesis가 요약되어야 한다.
- CTA:
  - 추천곡 보기
  - 멤버 둘러보기
  - 프로필 만들기

### 10.2 Recommendation Feed

- 최신 추천곡 카드 리스트
- 각 카드 필드:
  - 곡명
  - 아티스트
  - 추천인
  - 추천 코멘트
  - 태그
  - 플랫폼
  - 외부 링크
- lightweight reaction/save UI
- theme / featured section

### 10.3 Recommendation Create

- `/recommendations/new` 경로가 있어야 한다.
- 필수 입력:
  - 곡명
  - 아티스트
  - 링크
  - 플랫폼
  - 코멘트
- 선택 입력:
  - 무드 / 장르 태그
- 1분 이내 입력 완료 가능해야 한다.

### 10.4 Member Directory

- 멤버 카드 리스트
- 닉네임 검색
- 장르 필터
- 플랫폼 필터

### 10.5 Member Profile

- 닉네임
- 소개
- 주 플랫폼
- 선호 장르
- 최근 추천곡 일부
- 어떤 취향인지 빠르게 파악 가능한 레이아웃

### 10.6 Profile Create / Edit

- 최소 입력만 요구
- mock/local state 허용
- 생성/수정 공용 폼 허용

### 10.7 Theme / Featured Section

- 주간 테마 또는 행사 연동 추천 슬롯
- 운영진 수동 큐레이션 허용
- theme title, description, related event metadata 구조 필요

### 10.8 Lightweight Reaction or Save

- like / fire / save 중 최소 1개 이상 UI
- local state에서 시작 가능
- 이후 persistence 확장 가능 구조 유지

## 11. UX Requirements

- 모바일 우선 usable
- 카드 기반 UI
- 태그 중심 탐색
- 링크보다 곡 정보가 먼저 보이는 구조
- 추천 등록 1분 이내
- 프로필 등록 2~3분 이내
- 과도하게 SaaS스럽지 않은 음악 커뮤니티 톤

## 12. Technical Direction

- Stack:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Vercel
- Data strategy:
  - Phase 1: mock/static data
  - Phase 2: Supabase persistence
- Constraints:
  - 외부 플랫폼 정식 API 연동 금지
  - 이후 백엔드 연결 가능 구조 유지
  - 과도한 상태관리 금지

## 13. Success Metrics

### 13.1 Product Metrics

- 프로필 생성 수
- 추천곡 등록 수
- 추천곡 조회 수
- 추천곡 링크 클릭 수
- 저장 / 반응 수

### 13.2 Community Metrics

- 추천곡 등록 유저 수
- 주간 활성 사용자 수
- 신입 유저 프로필 생성 비율
- 멤버 프로필 탐색 빈도

### 13.3 Event / Retention Signals

- 행사 전후 테마 참여율
- 행사 관련 추천곡 조회 수
- 앱 사용자의 행사 참여 의사 차이
- 신입 사용자의 잔존 신호

## 14. Current Repository Baseline

현재 저장소에서 이미 구현된 축:

- Landing
- Recommendation feed
- Member directory
- Member profile
- Profile edit
- weekly theme slot
- local draft composer
- local draft preview / browser storage persistence

현재 PRD v0.2 대비 주요 갭:

- `/recommendations/new` 독립 경로 없음
- recommendation card의 reaction/save UI 미완료
- data model의 `memberNickname`, `reactionCount`, `saveCount`, `ThemeSpotlight`이 UI 전반에 완전히 반영되지 않음
- 운영진 관점의 event-linked theme 운영 흐름 미완료

## 15. MVP Acceptance Criteria

- [x] 랜딩 페이지가 존재한다.
- [x] 추천곡 피드 페이지가 존재한다.
- [ ] 추천곡 등록 페이지(`/recommendations/new`)가 존재한다.
- [x] 멤버 디렉터리 페이지가 존재한다.
- [x] 멤버 상세 페이지가 존재한다.
- [x] 프로필 생성/수정 페이지가 존재한다.
- [x] 추천곡 카드에 곡명 / 아티스트 / 추천인 / 코멘트 / 플랫폼 / 태그가 표시된다.
- [x] 추천곡 등록이 가능하다.
- [x] 멤버 검색이 가능하다.
- [x] 장르 필터가 가능하다.
- [x] 플랫폼 필터가 가능하다.
- [ ] 가벼운 반응 또는 저장 UI가 존재한다.
- [x] 주간/행사 테마 슬롯이 존재한다.
- [x] 모바일 기준 UI가 usable하다.
- [x] `npm run lint` 통과
- [x] `npm run build` 통과
- [ ] Vercel 배포 가능 상태다.

## 16. Implementation Guardrails

- recommendation create는 독립 route로 분리하되 현재 feed 기반 composer와 중복 로직은 공용화한다.
- reaction/save는 초기에는 local state로 시작하되 나중에 Supabase persistence로 이관 가능해야 한다.
- theme slot은 운영 실험 도구로 보되 복잡한 관리자 기능은 넣지 않는다.
- product metrics는 먼저 UI 이벤트 포인트를 정의하고, 실제 analytics는 Phase 2로 미룬다.
