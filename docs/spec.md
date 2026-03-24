# Onochu SPEC v0.3

## 1. Document Purpose

이 문서는 [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md)를 구현 기준으로 다시 쪼갠 명세다. v0.3에서 강조한 connection-first 관점과 현재 저장소 baseline, 남은 구현 갭을 한 번에 확인할 수 있도록 정리한다.

## 2. Product Summary

- 제품명: Onochu
- 한 줄 설명:
  - 카카오톡 단체방에 묻히는 음악 추천을 구조화해 남기고, 플랫폼이 달라도 곡을 이해하고 반응할 수 있게 하며, 음악을 통해 동아리원들 간 연결을 더 잘 일어나게 만드는 모바일 우선 커뮤니티 웹앱
- 핵심 가치:
  - recommendation retention
  - cross-platform discoverability
  - people discovery through taste
  - community activation

## 3. Core Product Belief

Onochu는 링크 전달보다 사람 사이의 맥락 있는 연결을 우선한다. 구현 판단 기준은 다음 질문이다.

- 이 화면이 추천을 덜 묻히게 만드는가
- 이 UI가 추천한 사람과 이유를 더 잘 보이게 하는가
- 이 흐름이 사람 탐색과 관계 접점을 더 쉽게 만드는가
- 이 구조가 행사/운영 실험과 연결될 여지를 남기는가

## 4. Problem Statement

- 카톡방에서는 추천이 일반 대화에 섞여 휘발된다.
- 플랫폼 차이 때문에 링크 청취 전환이 끊긴다.
- 추천이 사람 이해와 취향 탐색으로 이어지지 않는다.
- 커뮤니티 운영과 행사 흐름이 추천 구조와 유기적으로 연결되지 않는다.

## 5. Product Intent

- 추천을 축적 가능한 커뮤니티 자산으로 남긴다.
- 플랫폼이 달라도 곡과 맥락을 먼저 이해하게 만든다.
- 추천을 통해 사람의 취향과 최근 활동이 드러나게 만든다.
- 신입과 기존 부원 모두가 취향을 통해 더 쉽게 연결되게 만든다.
- 주간/행사 테마로 동아리 문화 운영 실험이 가능하게 만든다.

## 6. Product Principles

- Mobile-first
- Song-first, not Link-first
- Community-first, not Platform-first
- Low-friction
- Connection over Decoration
- Operational Utility

## 7. Target Users and Context

- Primary:
  - KNU_POW 동아리원
  - 음악 추천과 취향 공유에 관심 있는 대학생
- Secondary:
  - 신입 부원
  - 운영진 / 행사 기획진
  - 공연, 정모, 세션 전후 접점을 만들고 싶은 멤버
- Usage context:
  - 카카오톡 링크 진입
  - 모바일 브라우저 중심
  - 짧은 시간 안에 추천 읽기, 반응, 저장, 추천인 탐색
  - 행사 전후 분위기 예열 / 신입 온보딩

## 8. Primary Routes

- `/` — Landing
- `/recommendations` — Recommendation Feed
- `/recommendations/new` — Recommendation Create
- `/members` — Member Directory
- `/members/[id]` — Member Profile
- `/profile/edit` — Profile Create / Edit

## 9. Core UX Requirements

- 사용자는 곡명, 아티스트, 추천인, 추천 이유를 링크보다 먼저 이해해야 한다.
- 추천 카드에서 사람 탐색으로 자연스럽게 이어져야 한다.
- 반응 또는 저장이 낮은 마찰로 가능해야 한다.
- 추천 등록은 1분 이내, 프로필 등록은 2~3분 이내를 목표로 한다.
- 모바일에서 세로 스크롤 피드와 카드 기반 탐색이 우선이어야 한다.

## 10. Functional Scope

### 10.1 Landing

- 문제 정의와 world view를 설명한다.
- CTA:
  - 추천곡 보기
  - 멤버 둘러보기
  - 프로필 만들기
- 랜딩은 더 강한 브랜드 무드를 허용한다.

### 10.2 Recommendation Feed

- 최신 추천곡 카드 리스트
- 카드 필드:
  - 곡명
  - 아티스트
  - 추천인
  - 추천 코멘트
  - 태그
  - 플랫폼
  - 외부 링크
- 가벼운 반응 / 저장 UI
- 추천인에서 사람 탐색으로 이어지는 흐름
- theme / featured section

### 10.3 Recommendation Create

- `/recommendations/new` 독립 경로
- 필수 입력:
  - 곡명
  - 아티스트
  - 플랫폼
  - 링크
  - 코멘트
- 선택 입력:
  - 무드 / 장르 태그
- quick draft와 독립 등록 route가 공용 저장 흐름을 사용할 수 있어야 한다.

### 10.4 Member Directory

- 멤버 카드 리스트
- 닉네임 검색
- 장르 필터
- 플랫폼 필터
- 신입이 빠르게 관계 접점을 찾을 수 있는 탐색 밀도

### 10.5 Member Profile

- 닉네임
- 짧은 소개
- 선호 장르
- 주 사용 플랫폼
- reaction / save aggregate
- conversation starter summary
- recommendation create reply CTA
- 최근 추천곡
- 추천 피드에서 사람 이해로 이어지는 연결 축

### 10.6 Profile Create / Edit

- 최소 입력 구조
- mock/local state 허용
- 이후 약한 로그인 구조로 확장 가능

### 10.7 Lightweight Reaction / Save

- like / fire / save 중 최소 1개 이상
- local state에서 시작 가능
- count 또는 active state 표현 필요

### 10.8 Weekly / Event Theme Slot

- 이번 주 오노추
- 행사 전 워밍업 추천
- 신입 환영 테마
- 운영진이 수동 큐레이션 가능한 구조

## 11. Design Direction

- 앱 내부 화면은 가독성, 속도, 모바일 사용성을 우선
- 다크모드 성향을 유지
- 카드 중심 UI와 세로 스크롤 피드를 기본으로 사용
- 랜딩과 인앱의 브랜드 강도를 분리
- typography는 인앱에서 읽기 쉬운 산세리프 우선

## 12. Login and Data Direction

- MVP 1차는 로그인 없이 시작하거나 매우 약한 진입 구조를 유지
- 데이터는 Phase 1 mock/static, Phase 2 persistence로 확장
- 복잡한 auth, music API 통합, heavy admin flow는 제외

## 13. Core Data Model

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
  reactionCount: number;
  saveCount: number;
};

type ThemeSpotlight = {
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
```

## 14. Success Metrics

### 14.1 Product Metrics

- 프로필 생성 수
- 추천곡 등록 수
- 추천곡 조회 수
- 추천곡 링크 클릭 수
- 저장 수
- 반응 수

### 14.2 Community Metrics

- 추천곡 등록 사용자 수
- 주간 활성 사용자 수
- 신입 유저 프로필 생성 비율
- 멤버 프로필 탐색 빈도
- 추천곡별 반응 수

### 14.3 Event / Retention Validation Signals

- 행사 전후 테마 참여율
- 행사 관련 추천곡 조회 수
- 앱 사용자의 행사 참여 의향 변화
- 신입 부원 중 앱 사용자 잔존 신호
- 카톡방 외부에서의 음악 대화 증가 여부

## 15. Current Repository Baseline

현재 저장소에서 이미 구현된 축:

- Landing
- Recommendation feed
- Recommendation create route
- Member directory
- Member profile
- Profile edit
- weekly theme slot
- `ThemeSpotlight` mock data 기반 event-linked theme surface
- local draft preview / browser storage persistence
- profile browser storage persistence
- recommendation card profile CTA
- member profile conversation starter surface
- saved recommendation filter / saved shelf / empty guidance
- recommendation fire / save active state 및 count persistence
- active theme metadata가 draft recommendation에 연결되는 create flow
- active theme linked rec / contributor summary
- post-rebuild route QA refresh
- production redeploy and production smoke evidence

현재 PRD v0.3 대비 주요 갭:

- theme 운영은 아직 manual/mock 수준이며 admin-grade workflow는 없음
- GitHub Login Connection 부재로 Git-integrated import path는 아직 검증하지 않음
- recommendation / profile persistence가 모두 browser-local 범위에 머물러 있음
- member identity와 저장 상태가 실제 계정 체계 없이 브라우저 컨텍스트에만 묶여 있음
- theme 운영 데이터를 수정하는 별도 운영 surface가 없음
- analytics / retention validation은 아직 문서 수준이고 실제 수집 계층이 없음

## 16. MVP Acceptance Criteria

QA evidence:

- [`docs/qa-v0.3.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/qa-v0.3.md)
- [`docs/deployment.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/deployment.md)

- [x] 랜딩 페이지가 존재한다
- [x] 추천곡 피드가 존재한다
- [x] 추천곡 등록 페이지가 존재한다
- [x] 멤버 디렉토리 페이지가 존재한다
- [x] 멤버 상세 페이지가 존재한다
- [x] 프로필 생성/수정 페이지가 존재한다
- [x] 추천 카드에 곡명 / 아티스트 / 추천인 / 코멘트 / 플랫폼 / 태그가 표시된다
- [x] 가벼운 반응 또는 저장 UI가 존재한다
- [x] 주간/행사 테마 슬롯이 존재한다
- [x] 모바일 기준으로 사용성이 깨지지 않는다
- [x] `npm run lint` 통과
- [x] `npm run build` 통과
- [x] Vercel production deployment가 1회 성공했다

## 17. Implementation Guardrails

- 기능 우선순위는 사람 탐색, data/model 정렬, QA 순으로 본다.
- 저장/반응은 local state로 시작하되 후속 persistence 이관을 막지 않아야 한다.
- 추천 feed는 링크 저장소가 아니라 사람 탐색 surface라는 원칙을 유지한다.
- 운영진용 기능은 수동 큐레이션 가능한 수준까지만 허용한다.

## 18. Phase 2 Direction

- browser-local persistence를 서버 저장으로 옮길 첫 slice를 정한다.
- recommendation / profile의 약한 identity 전략을 정리해 브라우저 간 연속성을 만든다.
- theme 운영 흐름을 문서 수동 편집이 아닌 제품 surface 안에서 관리할 수 있게 한다.
- production smoke를 유지하면서 실제 사용 데이터 수집 지점을 추가한다.
