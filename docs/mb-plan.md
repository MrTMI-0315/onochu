# Onochu MB Plan v0.3

## Commit Convention

- 모든 MB 완료 직후 `commit -> push origin main`을 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 사용한다.
- 기존 번호 체계를 보존하기 위해 v0.3 기준 계획은 `MB 17`부터 이어서 사용한다.

## Completed MB 01-19

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

## MB 20

- 제목: Data Model v0.3 Alignment
- Goal:
  - 문서와 코드 사이 data model 차이를 줄인다.
- Scope:
  - `lib/types.ts`
  - `lib/mock-data.ts`
  - recommendation related components
  - `docs/shared.md`
- Deliverables:
  - `memberNickname` 반영
  - `reactionCount` / `saveCount` 반영
  - `ThemeSpotlight` mock data 정리
- Acceptance Criteria:
  - 코드와 문서의 타입이 크게 어긋나지 않는다.
  - feed UI가 문서 필드를 직접 참조할 수 있다.
  - lint/build가 유지된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 21

- 제목: Connection-First Profile / Feed Flow
- Goal:
  - 추천인에서 사람 탐색으로 이어지는 연결 경험을 더 분명하게 만든다.
- Scope:
  - `/members/[id]`
  - recommendation attribution flow
  - member summary / recent recommendation UI
- Deliverables:
  - 추천인 탐색 CTA 정리
  - 최근 추천곡 시각 강조
  - 신입 기준 relation discovery copy 강화
- Acceptance Criteria:
  - feed에서 추천인을 눌러 프로필 탐색이 자연스럽다.
  - 프로필이 정보 페이지가 아니라 대화 시작점처럼 보인다.
  - 모바일에서 사람 탐색 흐름이 과도하게 길지 않다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 22

- 제목: v0.3 Acceptance Criteria QA Pass
- Goal:
  - PRD v0.3 AC 기준으로 구현 상태를 재점검하고 남은 갭을 줄인다.
- Scope:
  - 전체 route QA
  - mobile usability
  - AC 문서 체크리스트
- Deliverables:
  - AC 체크 결과
  - gap list
  - 마지막 수정 묶음
- Acceptance Criteria:
  - route별 AC 체크가 문서화된다.
  - mobile usability를 다시 확인한다.
  - 남은 blocker가 1개 이하로 줄어든다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 23

- 제목: Vercel 배포 준비 및 최종 문서 정리
- Goal:
  - PRD v0.3 기준 MVP를 배포 가능한 상태로 닫는다.
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
