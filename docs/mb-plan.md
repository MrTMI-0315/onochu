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

## MB 31

- 제목: Define Post-Rebuild Delivery Sequence
- Goal:
  - PRD v0.3 기준으로 MB 31~40의 구현 순서를 확정한다.
- Scope:
  - `docs/mb-plan.md`
  - `docs/spec.md`
- Acceptance Criteria:
  - MB 31~40이 persistence, save flow, theme, QA, deploy 기준으로 번호화된다.
  - 현재 제품의 남은 가치 검증 축이 문서에 반영된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 32

- 제목: Add Local Profile Persistence
- Goal:
  - `/profile/edit` 저장 결과를 browser storage에 유지해 프로필 축적 경험을 만든다.
- Scope:
  - `components/profile-edit-form.tsx`
  - `lib/profile-drafts.ts`
  - `lib/types.ts`
- Acceptance Criteria:
  - 프로필 저장 후 새로고침해도 마지막 입력 상태가 복원된다.
  - validation과 local-only 설명이 유지된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 33

- 제목: Add Profile Completion and Reset Controls
- Goal:
  - 프로필 저장 상태를 더 이해하기 쉽게 completion summary와 reset action을 추가한다.
- Scope:
  - `components/profile-edit-form.tsx`
  - `docs/profile-edit.md`
- Acceptance Criteria:
  - completion summary가 보인다.
  - local reset action이 동작한다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 34

- 제목: Add Saved Recommendation Filter
- Goal:
  - `/recommendations`에서 저장한 곡만 모아 다시 보기 쉬운 필터를 추가한다.
- Scope:
  - `components/recommendation-studio.tsx`
  - `lib/recommendation-drafts.ts`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - all / saved filter가 존재한다.
  - save interaction 결과가 filter에 반영된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 35

- 제목: Surface Saved Shelf and Empty Guidance
- Goal:
  - 저장한 추천곡을 feed 상단에서 재진입 가능한 shelf로 노출한다.
- Scope:
  - `components/recommendation-studio.tsx`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - saved recommendation shelf가 생긴다.
  - 저장된 곡이 없을 때 guidance가 보인다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 36

- 제목: Attach Theme Metadata to Draft Recommendations
- Goal:
  - 새로 작성한 recommendation이 현재 active theme 맥락을 함께 가지도록 만든다.
- Scope:
  - `lib/types.ts`
  - `lib/recommendation-drafts.ts`
  - `components/recommendation-card.tsx`
- Acceptance Criteria:
  - local draft recommendation에 theme metadata가 기록된다.
  - 카드에서 theme badge를 읽을 수 있다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 37

- 제목: Show Theme Participation Summary
- Goal:
  - active theme와 연결된 추천 수와 참여 흐름을 feed/create route에서 더 직접적으로 보여 준다.
- Scope:
  - `components/recommendation-studio.tsx`
  - `components/recommendation-create-route.tsx`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - theme participation summary가 보인다.
  - create route에서 현재 테마와 작성 결과의 연결 이유가 더 명확해진다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 38

- 제목: Refresh v0.3 Route QA After Post-Rebuild Changes
- Goal:
  - MB 31~37 이후 route QA 기준선을 다시 맞춘다.
- Scope:
  - `docs/qa-v0.3.md`
- Acceptance Criteria:
  - 주요 route smoke 결과가 최신 상태로 반영된다.
  - 남은 blocker가 갱신된다.
- Verification:
  - `npm run lint`
  - `npm run build`
  - Playwright smoke

## MB 39

- 제목: Redeploy Production After UX and Persistence Updates
- Goal:
  - post-rebuild 상태를 production에 다시 배포한다.
- Scope:
  - `docs/deployment.md`
  - 필요 시 `README.md`
- Acceptance Criteria:
  - production deploy가 완료된다.
  - production smoke evidence가 남는다.
- Verification:
  - `npm run lint`
  - `npm run build`
  - `npx vercel --prod --yes`

## MB 40

- 제목: Refresh Product Baseline Docs for Phase 2
- Goal:
  - MB 31~39 결과를 바탕으로 다음 phase 기준선을 문서에 반영한다.
- Scope:
  - `docs/spec.md`
  - `docs/mb-plan.md`
  - `README.md`
- Acceptance Criteria:
  - current repository baseline과 remaining gaps가 최신화된다.
  - phase 2용 다음 MB 제안이 문서에 남는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## Completed MB 31-40

- `MB 31` post-rebuild delivery sequence 정의
- `MB 32` profile browser storage persistence
- `MB 33` profile completion summary / reset control
- `MB 34` saved recommendation filter
- `MB 35` saved shelf / empty guidance
- `MB 36` draft recommendation theme metadata 연결
- `MB 37` theme participation summary
- `MB 38` post-rebuild route QA refresh
- `MB 39` production redeploy after persistence updates
- `MB 40` Phase 2 baseline docs refresh

## Proposed Phase 2 MB 41-45

## MB 41

- 제목: Define Lightweight Identity Strategy
- Goal:
  - browser-local 상태를 넘어 recommendation/profile 소유권을 유지할 최소 identity 전략을 정한다.
- Scope:
  - `docs/spec.md`
  - `docs/shared.md`
  - 필요 시 `README.md`
- Acceptance Criteria:
  - local-only에서 서버 저장으로 넘어갈 식별 기준이 문서화된다.
  - auth를 과도하게 키우지 않는 Phase 2 진입 규칙이 정리된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 42

- 제목: Add Server-Backed Recommendation Persistence Slice
- Goal:
  - recommendation 작성/조회 중 최소 한 축을 browser-local에서 서버 저장으로 옮긴다.
- Scope:
  - recommendation data layer 관련 코드
  - `docs/spec.md`
  - `docs/recommendation-feed.md`
- Acceptance Criteria:
  - 새 recommendation이 브라우저를 넘어 유지된다.
  - local fallback 또는 migration 전략이 남는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 43

- 제목: Add Server-Backed Profile Persistence Slice
- Goal:
  - profile edit 저장을 서버 저장으로 옮겨 멤버 identity와 연결한다.
- Scope:
  - profile data layer 관련 코드
  - `docs/profile-edit.md`
  - `docs/member-profile.md`
- Acceptance Criteria:
  - profile 저장 결과가 같은 브라우저를 벗어나도 유지된다.
  - 현재 local reset / completion UX와 충돌하지 않는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 44

- 제목: Add Theme Operations Surface
- Goal:
  - active / queued theme를 문서 수정이 아닌 제품 surface에서 운영 가능한 최소 구조로 옮긴다.
- Scope:
  - theme 관련 UI / mock or data layer
  - `docs/recommendation-feed.md`
  - `docs/spec.md`
- Acceptance Criteria:
  - current theme와 next theme를 제품 안에서 관리할 진입점이 생긴다.
  - event / onboarding context가 현재 feed와 계속 정렬된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 45

- 제목: Add Product Metrics Capture Baseline
- Goal:
  - PRD v0.3 success metrics를 실제 관측 가능한 이벤트 기준으로 묶는다.
- Scope:
  - metrics capture 설계 또는 최소 instrumentation
  - `docs/spec.md`
  - `docs/qa-v0.3.md`
- Acceptance Criteria:
  - recommendation create, save, profile visit, theme participation 관련 측정 기준이 생긴다.
  - production smoke와 별개로 운영 관측 기준이 문서화된다.
- Verification:
  - `npm run lint`
  - `npm run build`
