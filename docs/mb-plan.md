# Onochu MB Plan v0.2

## Commit Convention

- 모든 MB 완료 직후 `commit -> push origin main`을 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 사용한다.
- 기존 번호 체계를 보존하기 위해 v0.2 기준 계획은 `MB 15`부터 이어서 사용한다.

## Completed MB 01-14

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

## MB 15

- 제목: PRD v0.2 기준 문서 재정렬
- Goal:
  - 새 PRD를 저장소 문서로 편입하고 SPEC 및 이후 MB를 v0.2 기준으로 다시 나눈다.
- Scope:
  - `docs/prd.md`
  - `docs/spec.md`
  - `docs/mb-plan.md`
  - `docs/README.md`
  - `README.md`
- Deliverables:
  - PRD 문서 저장소 내 편입
  - v0.2 SPEC 재작성
  - v0.2 남은 MB 재분해
- Acceptance Criteria:
  - 저장소 안에서 PRD, SPEC, MB를 모두 읽을 수 있다.
  - `docs/spec.md`가 v0.2 route/data/AC를 반영한다.
  - `docs/mb-plan.md`가 `MB 16+` 작업을 정의한다.
- Verification:
  - `sed -n '1,260p' docs/prd.md`
  - `sed -n '1,320p' docs/spec.md`
  - `sed -n '1,320p' docs/mb-plan.md`

## MB 16

- 제목: Recommendation Create Route 분리
- Goal:
  - PRD v0.2가 요구하는 `/recommendations/new` 독립 등록 경로를 만든다.
- Scope:
  - `app/recommendations/new/*`
  - recommendation composer 공용화
  - navigation / CTA 연결
- Deliverables:
  - 독립 등록 페이지
  - feed에서 create route 진입점
  - 기존 composer와 공용 로직 정리
- Acceptance Criteria:
  - `/recommendations/new`가 존재한다.
  - 필수 입력값 검증이 유지된다.
  - feed와 create route가 중복 로직 없이 연결된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 17

- 제목: Lightweight Reaction / Save UI
- Goal:
  - 추천곡 카드에 PRD v0.2가 요구한 reaction/save UI를 추가한다.
- Scope:
  - recommendation card
  - recommendation local state
  - mock data / 타입 보강
- Deliverables:
  - like / fire / save 중 최소 2개 이상 동작
  - local count 또는 active state
  - 타입에 `reactionCount` / `saveCount` 반영
- Acceptance Criteria:
  - 추천곡 카드에서 가벼운 반응 또는 저장 UI가 보인다.
  - local state 기준 상호작용이 가능하다.
  - feed 새로고침 전후 persistence 전략과 충돌하지 않는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 18

- 제목: Theme / Event 운영 슬롯 정교화
- Goal:
  - 주간/행사 테마 슬롯을 운영 실험 도구 수준으로 정리한다.
- Scope:
  - recommendation theme section
  - theme data model
  - event-related copy / metadata
- Deliverables:
  - `ThemeSpotlight` 기반 mock data
  - 관련 event metadata 표현
  - 운영진 관점 CTA / theme state 정리
- Acceptance Criteria:
  - active theme slot이 명확히 보인다.
  - 행사 연동 copy 또는 metadata를 표현할 수 있다.
  - 향후 수동 큐레이션 확장 구조가 남아 있다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 19

- 제목: Recommendation Data Model v0.2 정렬
- Goal:
  - PRD v0.2 data model을 현재 코드와 문서에 맞게 정렬한다.
- Scope:
  - `lib/types.ts`
  - `lib/mock-data.ts`
  - recommendation related components
  - `docs/shared.md`
- Deliverables:
  - `memberNickname` field 반영 여부 정리
  - reaction/save count 필드 반영
  - `ThemeSpotlight` mock data 추가
- Acceptance Criteria:
  - 코드와 문서의 recommendation/theme 타입이 크게 어긋나지 않는다.
  - feed UI에서 필요한 mock field를 직접 참조할 수 있다.
  - 타입 변경 후 lint/build가 깨지지 않는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 20

- 제목: Member Profile / Feed 연결 정교화
- Goal:
  - PRD v0.2의 “사람 이해” 축을 더 명확히 드러내도록 프로필과 피드를 연결한다.
- Scope:
  - `/members/[id]`
  - recommendation attribution flow
  - recent recommendations 표현
- Deliverables:
  - recent recommendations 시각 강조
  - 추천인 탐색 흐름 개선
  - 취향 파악 속도를 높이는 profile summary
- Acceptance Criteria:
  - 멤버 프로필에서 최근 추천곡 일부가 명확히 보인다.
  - feed에서 추천인을 눌러 사람 탐색이 자연스럽게 이어진다.
  - 신입 유저가 취향을 훑기 쉬운 구조가 유지된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 21

- 제목: v0.2 Acceptance Criteria QA Pass
- Goal:
  - PRD v0.2 AC 기준으로 실제 구현 상태를 체크하고 남은 갭을 줄인다.
- Scope:
  - 전체 route QA
  - mobile usability
  - AC 문서 체크리스트
- Deliverables:
  - AC 체크 결과
  - gap list
  - 필요한 마지막 수정 묶음
- Acceptance Criteria:
  - route별 AC 체크가 문서화된다.
  - mobile 우선 usable 상태를 다시 점검한다.
  - 남은 blocker가 1개 이하로 줄어든다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 22

- 제목: Vercel 배포 준비 및 최종 문서 정리
- Goal:
  - PRD v0.2 기준 MVP를 배포 가능한 상태로 닫는다.
- Scope:
  - README
  - 배포 설정
  - 최종 실행 가이드
- Deliverables:
  - Vercel 배포 체크
  - 실행 / 검증 / known gaps 문서화
  - final status 정리
- Acceptance Criteria:
  - `npm run lint` 통과
  - `npm run build` 통과
  - Vercel 배포 가능 상태가 문서로 정리된다.
- Verification:
  - `npm run lint`
  - `npm run build`
