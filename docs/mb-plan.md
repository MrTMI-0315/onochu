# Onochu MB Plan v0.3

## Commit Convention

- 모든 MB 완료 직후 `commit -> push origin main`을 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 사용한다.
- 기존 번호 체계를 보존하기 위해 v0.3 기준 계획은 `MB 17`부터 이어서 사용한다.

## Completed MB 01-23

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

## MB 24

- 제목: Execute First Production Deployment
- Goal:
  - 실제 Vercel production URL을 발급하고 최종 smoke evidence를 남긴다.
- Scope:
  - Vercel dashboard or CLI deploy
  - production smoke
  - final status doc
- Deliverables:
  - production URL
  - deploy-time smoke result
  - final known gaps refresh
- Acceptance Criteria:
  - production deployment가 1회 성공한다.
  - 핵심 route smoke가 production URL에서 다시 확인된다.
  - 문서에 production URL 또는 deploy evidence가 반영된다.
- Verification:
  - `npm run lint`
  - `npm run build`
