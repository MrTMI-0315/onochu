# Onochu SPEC v0.4

## 1. Document Purpose

이 문서는 [`/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md)를 구현 관점으로 재해석한 명세다. v0.4에서 강조한 **platform search handoff**, **manual curation 기반 genre/artist discovery**, **real-trust community** 방향성을 현재 저장소 기준선과 연결해 정리한다.

## 2. Product Summary

- 제품명: Onochu
- 한 줄 설명:
  - 카카오톡 단체방에 묻히는 음악 추천을 구조화해 남기고, 플랫폼이 달라도 곡을 쉽게 찾고 반응할 수 있게 하며, 음악을 통해 동아리원들 간 연결이 더 잘 일어나게 만드는 모바일 우선 커뮤니티 웹앱
- 핵심 가치:
  - recommendation retention
  - search-first cross-platform handoff
  - people discovery through taste
  - trusted club community interaction
  - manual curation archive

## 3. Core Product Belief

Onochu는 링크 전달보다 사람 사이의 맥락 있는 연결을 우선한다. v0.4 구현 판단 기준은 다음 질문이다.

- 이 화면이 추천을 덜 묻히게 만드는가
- 이 흐름이 플랫폼 차이를 넘어서 곡을 더 쉽게 찾게 만드는가
- 이 UI가 추천한 사람과 이유를 더 잘 보이게 하는가
- 이 구조가 장르/아티스트 단위 digging으로 확장될 수 있는가
- 이 경험이 익명 커뮤니티보다 신뢰도 높은 동아리 내 대화로 이어지는가

## 4. Problem Statement

- 카톡방에서는 추천이 일반 대화에 섞여 휘발된다.
- 플랫폼 차이 때문에 링크 청취 전환이 끊기고 곡을 다시 검색해야 한다.
- 검색/복사 같은 작은 마찰이 실제 청취 전환율을 떨어뜨린다.
- 추천이 사람 이해와 취향 탐색으로 이어지지 않는다.
- 주간 테마, 행사, 신입 적응과 추천 구조가 유기적으로 연결되지 않는다.
- 실명 기반 커뮤니티의 신뢰 가능한 음악 대화가 아직 구조화되어 있지 않다.

## 5. Product Intent

- 추천을 축적 가능한 커뮤니티 자산으로 남긴다.
- 플랫폼이 달라도 곡을 식별하고 검색할 수 있게 만든다.
- 자동 재생보다 현실적인 copy + search handoff를 우선 제공한다.
- 추천을 통해 사람의 취향과 최근 활동이 드러나게 만든다.
- 음악을 통해 부원들이 서로를 더 쉽게 발견하고 연결되게 만든다.
- 주간/행사 테마와 연결된 운영 실험이 가능하게 만든다.

## 6. Product Principles

- Mobile-first
- Song-first, not Link-first
- Community-first, not Platform-first
- Low-friction
- Connection over Decoration
- Operational Utility
- Search Handoff over Playback Fantasy
- Real Trust over Anonymous Noise
- Manual Curation before Heavy Automation

## 7. Target Users and Context

- Primary:
  - KNU_POW 동아리원
  - 음악 추천과 취향 공유에 관심 있는 대학생
  - 힙합, R&B, 비트, DJing, digging 문화에 익숙한 사용자
- Secondary:
  - 신입 부원
  - 운영진 / 행사 기획진
  - 특정 장르나 아티스트 취향이 확실한 멤버
- Usage context:
  - 카카오톡 링크 진입
  - 모바일 브라우저 중심
  - 짧은 시간 안에 추천 읽기, 반응, 저장, 검색 handoff, 추천인 탐색
  - 행사 전후 분위기 예열 / 신입 온보딩 / 장르별 digging

## 8. Primary Routes

- `/` — Landing
- `/recommendations` — Recommendation Feed
- `/recommendations/new` — Recommendation Create
- `/members` — Member Directory
- `/members/[id]` — Member Profile
- `/profile/edit` — Profile Create / Edit
- `/genres/[slug]` — Genre Collection (later / optional)
- `/artists/[slug]` — Artist Collection (later / optional)

## 9. Core UX Requirements

- 사용자는 링크보다 먼저 곡명, 아티스트, 추천인, 추천 이유를 이해해야 한다.
- 추천 카드에서 복사 또는 플랫폼 검색 진입이 즉시 가능해야 한다.
- viewer platform이 있어도 완전 재생 보장보다 search handoff가 명확해야 한다.
- 추천 카드에서 사람 탐색으로 자연스럽게 이어져야 한다.
- 반응 또는 저장이 낮은 마찰로 가능해야 한다.
- 모바일에서 세로 스크롤 피드와 카드 기반 탐색이 우선이어야 한다.

## 10. Functional Scope

### 10.1 Landing

- 문제 정의와 world view를 설명한다.
- CTA:
  - 추천곡 보기
  - 멤버 둘러보기
  - 첫 추천 남기기
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
  - 원본 링크
  - searchQuery 또는 복사 액션
- 가벼운 반응 / 저장 UI
- viewer platform 기준 CTA 해석
- 추천인에서 사람 탐색으로 이어지는 흐름
- theme / featured section
- search handoff UI:
  - copy title+artist
  - preferred platform search entry
  - original link fallback

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
  - alternate platform links
- 저장 시 searchQuery 생성 기준을 유지한다.
- quick draft와 독립 등록 route가 공용 저장 흐름을 사용할 수 있어야 한다.

### 10.4 Member Directory

- 멤버 카드 리스트
- 닉네임 검색
- 장르 필터
- 플랫폼 필터
- 신입이 빠르게 관계 접점을 찾을 수 있는 탐색 밀도
- later:
  - 장르/아티스트 기준 멤버 발견 확장 가능성

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
- weak-login 이전 단계의 mock/local state 허용
- 실명 기반 신뢰 커뮤니티로 확장할 수 있는 여지를 남긴다

### 10.7 Lightweight Reaction / Save

- like / fire / save 중 최소 1개 이상
- local state에서 시작 가능
- count 또는 active state 표현 필요

### 10.8 Weekly / Event Theme Slot

- 이번 주 오노추
- 행사 전 워밍업 추천
- 신입 환영 테마
- 운영진이 수동 큐레이션 가능한 구조

### 10.9 Platform Search Assist

- 곡명 + 아티스트 조합 문자열 생성
- 원클릭 복사
- 플랫폼 검색 링크 버튼
- preferred platform handoff
- direct link가 없어도 search fallback이 명확해야 한다

### 10.10 Genre / Artist Collections (Later)

- `/genres/[slug]`
- `/artists/[slug]`
- 완전 자동 분류보다 수동 큐레이션 가능성이 우선
- MVP 현재 라우트에는 없어도 shared data와 feed metadata는 이 확장을 막지 않아야 한다

## 11. Design Direction

- 인앱 화면은 가독성, 속도, 모바일 사용성을 우선
- 카드 중심 UI와 세로 스크롤 피드를 기본으로 사용
- 랜딩과 인앱의 브랜드 강도를 분리
- 피드는 링크 저장소가 아니라 취향 아카이브처럼 보여야 한다
- 장르/아티스트 확장을 고려해 태그와 탐색 레이블 hierarchy를 선명하게 유지한다

## 12. Login and Data Direction

- MVP 1차는 로그인 없이 시작하거나 매우 약한 진입 구조를 유지
- 데이터는 Phase 1 mock/static + browser storage, Phase 2 persistence로 확장
- 복잡한 auth, music API 통합, heavy admin flow는 제외
- later phase에서 카카오 로그인과 실명 기반 신뢰 구조를 검토한다

## 13. Core Data Model

```ts
type MusicPlatform =
  | "spotify"
  | "apple_music"
  | "youtube_music"
  | "soundcloud"
  | "melon"
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
  searchQuery?: string;
  alternatePlatformUrls?: Partial<Record<MusicPlatform, string>>;
};

type GenreCollection = {
  id: string;
  slug: string;
  label: string;
  recommendationIds: string[];
};

type ArtistCollection = {
  id: string;
  slug: string;
  artistName: string;
  recommendationIds: string[];
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
- 플랫폼 검색 버튼 클릭 수
- 복사 액션 사용 수
- 저장 수
- 반응 수

### 14.2 Community Metrics

- 추천곡 등록 사용자 수
- 주간 활성 사용자 수
- 신입 유저 프로필 생성 비율
- 멤버 프로필 탐색 빈도
- 추천곡별 반응 수
- 장르 컬렉션 진입 수
- 아티스트 모아보기 진입 수

### 14.3 Event / Retention Validation Signals

- 행사 전후 테마 참여율
- 행사 관련 추천곡 조회 수
- 앱 사용자의 행사 참여 의향 변화
- 신입 부원 중 앱 사용자 잔존 신호
- 카톡방 외부에서의 음악 대화 증가 여부
- 취향 기반으로 새로운 대화/친목이 시작됐다는 정성 피드백 수

## 15. Current Repository Baseline

현재 저장소에서 이미 구현된 축:

- Landing
- Recommendation Feed
- Recommendation Create
- Member Directory
- Member Profile
- Profile Edit
- weekly theme surface
- local reaction / save
- browser storage 기반 draft persistence
- viewer platform 기반 cross-platform CTA

현재 저장소에서 v0.4 기준으로 아직 문서 대비 남는 갭:

- search handoff를 copy + search UX 관점으로 더 명확히 드러내는 surface
- genre / artist collection 라우트
- 실명 기반 신뢰 구조를 위한 약한 식별 전략
- 장르/아티스트 단위 수동 큐레이션 UI

## 16. Acceptance Criteria

- [ ] 랜딩 페이지가 존재한다
- [ ] 추천곡 피드가 존재한다
- [ ] 추천곡 등록 페이지가 존재한다
- [ ] 멤버 디렉토리 페이지가 존재한다
- [ ] 멤버 상세 페이지가 존재한다
- [ ] 프로필 생성/수정 페이지가 존재한다
- [ ] 추천 카드에 곡명 / 아티스트 / 추천인 / 코멘트 / 플랫폼 / 태그가 표시된다
- [ ] 추천 카드에서 곡명/아티스트 복사 또는 플랫폼 검색 진입이 가능하다
- [ ] 가벼운 반응 또는 저장 UI가 존재한다
- [ ] 주간/행사 테마 슬롯이 존재한다
- [ ] 모바일 기준으로 사용성이 깨지지 않는다
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
- [ ] Vercel 배포 가능한 상태다
