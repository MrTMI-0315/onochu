# Onochu SPEC

## 1. Document Purpose

이 문서는 `/Users/mrtmi/Downloads/Onochu_PRD_v0.1.md`를 구현 기준으로 재구성한 MVP 명세다. 제품 방향을 유지하면서도 실제 개발 시 필요한 범위, 라우트, 데이터 구조, 기능 단위 요구사항을 빠르게 참조할 수 있도록 정리한다.

## 2. Product Summary

- 제품명: Onochu
- 한 줄 설명: 동아리원들이 자신의 음악 취향과 추천곡을 프로필 기반으로 공유하고 탐색하는 모바일 우선 웹앱
- 핵심 가치: 취향 공유, 추천곡 발견, 플랫폼 무관 링크 공유
- 대상 사용자: KNU_POW 동아리원

## 3. Problem Statement

현재 카카오톡 단체방 중심의 공유 방식만으로는 아래 문제가 있다.

- 추천곡이 메시지 흐름 속에 묻힌다
- 사람별 취향이 구조적으로 쌓이지 않는다
- 검색과 발견이 어렵다
- 플랫폼이 달라 링크 경험이 파편화된다

Onochu는 음악 플랫폼 통합이 아니라, 사람의 취향을 중심으로 링크와 추천을 정리하는 커뮤니티 레이어를 제공한다.

## 4. Product Principles

- Community-first: 플랫폼보다 사람 중심의 발견 경험을 우선한다.
- Link-first MVP: OAuth나 API 연동 없이 링크 저장형 구조로 빠르게 검증한다.
- Mobile-first: 모바일 브라우저 기준 사용성을 우선한다.
- Low-friction: 입력 부담을 줄여 프로필 작성 허들을 낮춘다.
- Taste as identity: 링크 저장만이 아니라 취향이 보이는 프로필 경험을 만든다.

## 5. MVP Goals

- 사용자가 자신의 음악 취향을 프로필로 표현할 수 있다.
- 다양한 음악 플랫폼 링크를 손쉽게 등록할 수 있다.
- 추천곡과 코멘트를 통해 취향 기반 발견이 가능하다.
- 단톡방보다 더 나은 탐색성과 축적성을 제공한다.
- 링크 하나로 접속 가능한 웹앱 MVP를 빠르게 배포할 수 있다.

## 6. Non-Goals

- 플랫폼 OAuth 연동
- 실제 스트리밍 기능
- 플레이리스트 자동 import/parsing
- 추천 알고리즘
- 댓글, DM, 팔로우 같은 복잡한 소셜 기능
- 관리자 대시보드
- 네이티브 앱 배포

## 7. Primary Routes

- `/`: Landing
- `/members`: Member directory
- `/members/[id]`: Member profile detail
- `/recommendations`: Recommendation feed
- `/profile/edit`: Create/Edit profile

## 8. Core Data Model

```ts
type MusicPlatform =
  | "spotify"
  | "youtube_music"
  | "apple_music"
  | "soundcloud"
  | "other";

type PlaylistLink = {
  label: string;
  url: string;
};

type MemberProfile = {
  id: string;
  nickname: string;
  bio: string;
  favoriteGenres: string[];
  mainPlatform: MusicPlatform;
  playlistLinks: PlaylistLink[];
  avatarUrl?: string;
};

type SongRecommendation = {
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
```

## 9. Functional Scope

### 9.1 Landing

- 서비스 소개 문구가 노출되어야 한다.
- 핵심 가치가 한 화면 안에서 이해되어야 한다.
- 주요 CTA가 보여야 한다.
- CTA 후보: 멤버 둘러보기, 추천곡 보기, 프로필 만들기

### 9.2 Member Directory

- 멤버 프로필 카드 목록이 렌더링되어야 한다.
- 닉네임 검색이 가능해야 한다.
- 장르 태그 필터가 가능해야 한다.
- 플랫폼 필터가 가능해야 한다.
- 카드 클릭 시 상세 페이지로 이동해야 한다.

### 9.3 Member Profile Detail

- 닉네임, 소개, 선호 장르, 주 플랫폼이 보여야 한다.
- 플레이리스트 링크 버튼이 보여야 한다.
- 해당 멤버의 추천곡 리스트가 보여야 한다.
- 추천곡 링크는 외부 링크로 이동해야 한다.

### 9.4 Recommendation Feed

- 최근 추천곡이 카드 리스트로 보여야 한다.
- 카드에는 곡명, 아티스트, 작성자, 플랫폼, 코멘트, 무드 태그가 포함되어야 한다.
- 클릭 시 외부 링크로 이동해야 한다.

### 9.5 Create / Edit Profile

- 프로필 생성 및 수정 폼이 있어야 한다.
- 필수 입력값 검증이 있어야 한다.
- 최소 1개 이상의 플레이리스트 링크 입력이 가능해야 한다.
- 저장 성공과 실패 상태를 사용자에게 명확히 보여야 한다.
- 초기 MVP는 mock/local state 기반 구현을 허용한다.

## 10. UX Requirements

- 모바일 우선 반응형 웹이어야 한다.
- 데스크톱에서도 레이아웃이 깨지지 않아야 한다.
- 미니멀하고 세련된 카드 기반 UI를 사용한다.
- 태그 칩 UI와 명확한 링크 버튼이 필요하다.
- 입력 폼은 과도하게 길지 않아야 한다.
- empty/loading/error 상태가 최소 수준으로 정의되어야 한다.

## 11. Technical Direction

- 권장 스택: Next.js, TypeScript, Tailwind CSS, Vercel
- 초기 데이터 전략: local mock data 또는 static seed data
- 구조 원칙: 추후 Supabase 연동이 가능하도록 데이터와 UI를 분리
- 외부 플랫폼 API는 MVP에서 사용하지 않음
- SEO는 우선순위 낮음

## 12. MVP Acceptance Criteria

- [ ] 랜딩 페이지가 존재한다.
- [ ] 멤버 디렉터리 페이지가 존재한다.
- [ ] 멤버 상세 페이지가 존재한다.
- [ ] 추천곡 피드 페이지가 존재한다.
- [ ] 프로필 생성/수정 폼 페이지가 존재한다.
- [ ] 더미 데이터 기준 최소 8~12명 프로필이 렌더링된다.
- [ ] 각 멤버별 추천곡이 표시된다.
- [ ] 닉네임 검색이 동작한다.
- [ ] 장르 필터가 동작한다.
- [ ] 플랫폼 필터가 동작한다.
- [ ] 외부 링크 클릭이 정상 동작한다.
- [ ] 모바일 뷰 기준 UI가 깨지지 않는다.
- [ ] `npm run lint` 통과
- [ ] `npm run build` 통과
- [ ] Vercel 배포 가능 상태다.

## 13. Suggested Implementation Order

1. App Router 기반 초기 프로젝트 생성
2. 타입 및 mock data 정의
3. Landing 구현
4. Member directory 구현
5. Member profile detail 구현
6. Recommendation feed 구현
7. Profile create/edit 구현
8. 검색 및 필터 상태 연결
9. lint/build 검증

## 14. Risks and Guardrails

- 입력 필드가 많아지면 프로필 작성 전환이 떨어질 수 있다.
- 인증과 persistence를 너무 빨리 넣으면 MVP 범위가 무거워진다.
- 폼과 상태 관리가 과설계될 위험이 있다.

대응 원칙:

- 초기 필드는 PRD 범위 내 최소 구성 유지
- mock data로 탐색 경험 먼저 검증
- 저장소 구조는 단순하게 유지하되 데이터 레이어 분리 가능성만 열어둠

## 15. Assumption

- 현재 저장소는 문서 초기화 단계이며 앱 구현은 아직 시작되지 않았다.
- 실행 스크립트가 없으므로 본 문서는 개발 착수 기준점 역할을 한다.
