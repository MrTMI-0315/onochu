# Onochu MB Plan v0.3

## Commit Convention

- 모든 MB 완료 직후 `commit -> push origin main`을 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 사용한다.
- 기존 번호 체계를 보존하기 위해 v0.3 기준 계획은 `MB 17`부터 이어서 사용한다.

## Completed MB 01-24

- `MB 01` 작업 분해와 커밋 규칙 정리
- `MB 02` Next.js App Router 스캐폴딩
- `MB 03` 공통 타입 / mock data / 라우트 뼈대
- `MB 04` landing / navigation 구현
- `MB 05` member directory 검색 / 필터
- `MB 06` member profile / recommendation feed 기본 흐름
- `MB 07` profile edit / validation
- `MB 08` Stitch 비주얼 시스템 / landing 흡수
- `MB 09` members / profile / recommendations / profile setup 리스타일
- `MB 10` weekly theme / recommendation composer 도입
- `MB 11` draft preview / local feed insertion simulation
- `MB 12` recommendation 파생 통계 재계산
- `MB 13` browser storage persistence
- `MB 14` storage version / reset control
- `MB 15` PRD v0.2 기준 문서 재정렬
- `MB 16` recommendation create route 분리
- `MB 17` PRD v0.3 기준 문서 교체
- `MB 18` recommendation reaction / save UI
- `MB 19` theme / event connection surface 강화
- `MB 20` shared data model / docs 정렬
- `MB 21` connection-first profile / feed flow 강화
- `MB 22` v0.3 acceptance criteria QA pass
- `MB 23` Vercel 배포 준비 / final runbook 정리
- `MB 24` first production deployment 실행

## MB 25

- 제목: Simplify Recommendation Feed Information Architecture
- Goal:
  - `/recommendations` 첫 스크롤에서 실제 추천 카드가 먼저 보이도록 정보 구조를 정리한다.
- Scope:
  - `components/recommendation-studio.tsx`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - feed 상단에서 hero, stats, theme, compose 중복이 줄어든다.
  - 작성은 `/recommendations/new` CTA 중심으로 유도된다.
  - 첫 추천 카드가 더 이른 위치에 노출된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 26

- 제목: Refine Recommendation Card Hierarchy
- Goal:
  - recommendation card에서 곡, 추천인, 이유, 행동 우선순위를 더 선명하게 만든다.
- Scope:
  - `components/recommendation-card.tsx`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - 카드에서 곡/추천 이유/사람 탐색 흐름이 더 직접적으로 읽힌다.
  - 보조 메타데이터가 1차 정보보다 덜 강조된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 27

- 제목: Strengthen Connection-First Member Profile
- Goal:
  - member profile을 통계 대시보드보다 대화 시작점처럼 보이도록 재정렬한다.
- Scope:
  - `app/members/[id]/page.tsx`
  - `docs/member-profile.md`
- Acceptance Criteria:
  - 추천으로 이 사람을 이해하는 흐름이 상단에서 바로 읽힌다.
  - featured recommendation / reply CTA가 더 전면에 배치된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 28

- 제목: Compress Member Directory Filters
- Goal:
  - `/members`에서 필터 부담을 줄이고 카드 스캔 속도를 높인다.
- Scope:
  - `components/member-directory-client.tsx`
  - `docs/member-directory.md`
- Acceptance Criteria:
  - 모바일에서 필터보다 카드가 먼저 읽히는 체감이 강화된다.
  - 장르 필터는 기본/확장 상태가 구분된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 29

- 제목: Reframe Landing Around Primary Actions
- Goal:
  - 랜딩을 문제 정의와 핵심 CTA 중심으로 압축한다.
- Scope:
  - `app/page.tsx`
  - `docs/landing.md`
- Acceptance Criteria:
  - 랜딩 섹션 수가 줄고 메시지 우선순위가 명확해진다.
  - recommendation/member 진입 CTA가 더 직접적으로 드러난다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 30

- 제목: Polish Contribution and Profile Forms
- Goal:
  - recommendation create / profile edit 입력 UX를 더 짧고 명확하게 다듬는다.
- Scope:
  - `components/recommendation-create-route.tsx`
  - `components/recommendation-composer.tsx`
  - `components/profile-edit-form.tsx`
  - `docs/profile-edit.md`
- Acceptance Criteria:
  - 작성/프로필 입력의 목적과 완료 경로가 더 빠르게 이해된다.
  - 보조 설명은 유지하되 시각적 부담이 줄어든다.
- Verification:
  - `npm run lint`
  - `npm run build`
