# Onochu

Onochu는 KNU_POW 동아리원을 위한 음악 추천/발견 커뮤니티 웹앱 MVP 저장소입니다. 현재 문서 기준선은 [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md)의 PRD v0.4와 [`docs/spec.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/spec.md)의 구현 기준선입니다.

## Current Status

- Next.js App Router 스캐폴딩 완료
- TypeScript 및 Tailwind CSS 설정 완료
- 공통 타입과 mock data 연결 완료
- 필수 MVP 라우트 뼈대 생성 완료
- 공통 네비게이션 추가 완료
- 랜딩 CTA와 제품 소개 구조 정리 완료
- 멤버 디렉터리 검색/필터 인터랙션 완료
- 멤버 상세와 추천곡 피드 흐름 정리 완료
- 커스텀 not-found 상태 추가 완료
- 프로필 입력 검증 및 local save 상태 표현 완료
- 구현 기준 문서 작성 완료
- `npm run dev`, `npm run lint`, `npm run build` 사용 가능
- PRD v0.3 기준 문서 교체 완료
- recommendation reaction/save UI 추가 완료
- theme/event connection surface 강화 완료
- shared data model과 docs를 v0.3 기준으로 추가 정렬 완료
- connection-first profile/feed flow 강화 완료
- v0.3 route QA와 mobile pass 문서화 완료
- Vercel 배포 runbook 정리 완료
- Vercel production deployment 1회 실행 완료
- profile browser storage persistence 및 reset/completion summary 추가 완료
- saved recommendation filter / shelf / empty guidance 추가 완료
- draft recommendation의 theme metadata 연결 및 participation summary 추가 완료
- post-rebuild route QA refresh 및 production redeploy 완료
- landing hero artwork 추가와 parchment/clay palette retheme 완료
- cross-platform recommendation access model / alternate links / viewer platform CTA / search fallback 완료
- Phase 2 lightweight identity boundary와 server persistence 진입 전략 정리 완료
- shared shell / mobile nav / not-found recovery를 main landing의 parchment archive tone에 맞춰 정렬 완료
- recommendation draft, fire/save engagement, profile draft를 anonymous browser identity 기준 server-session API로 승격 완료
- MB57 production redeploy와 visual / persistence smoke 완료

## Documents

- [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md): PRD v0.4 저장소 반영본
- [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md): MB 단위 작업 계획과 완료 기준
- [`docs/spec.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/spec.md): PRD를 구현 기준으로 재구성한 제품 명세
- [`docs/qa-v0.3.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/qa-v0.3.md): route별 QA 결과와 blocker 정리
- [`docs/deployment.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/deployment.md): Vercel 배포 설정과 smoke runbook
- [`docs/README.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/README.md): 기능별 문서 트리 인덱스
- [`docs/landing.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/landing.md): 랜딩 페이지 요구사항
- [`docs/member-directory.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/member-directory.md): 멤버 디렉터리 요구사항
- [`docs/member-profile.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/member-profile.md): 멤버 상세 요구사항
- [`docs/recommendation-feed.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/recommendation-feed.md): 추천곡 피드 요구사항
- [`docs/profile-edit.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/profile-edit.md): 프로필 생성/수정 요구사항
- [`docs/shared.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/shared.md): 공통 데이터/라우팅/UX 규칙

## Repository Structure

```text
.
|-- README.md
`-- docs
    |-- README.md
    |-- deployment.md
    |-- landing.md
    |-- mb-plan.md
    |-- member-directory.md
    |-- member-profile.md
    |-- prd.md
    |-- profile-edit.md
    |-- qa-v0.3.md
    |-- recommendation-feed.md
    |-- shared.md
    `-- spec.md
```

## Execution Notes

- 패키지 매니저는 `npm` 기준으로 정리되어 있습니다.
- 기본 실행 명령은 `npm run dev`, `npm run lint`, `npm run build`입니다.
- 초기 실행:
  - `npm install`
  - `npm run dev`
- 현재 `/`, `/members`, `/members/[id]`, `/recommendations`, `/recommendations/new`, `/profile/edit` 라우트가 존재합니다.
- 공통 네비게이션은 desktop top bar와 mobile bottom bar로 동작합니다.
- `/members`에서는 닉네임 검색, 장르 필터, 플랫폼 필터 조합이 동작합니다.
- `/recommendations`에서는 작성자 링크, fire/save 인터랙션, 무드 하이라이트, active theme event metadata가 함께 렌더링됩니다.
- `/recommendations`에서는 saved shelf, all/saved filter, theme participation summary, fire/save persistence가 함께 동작합니다.
- `/recommendations`에서는 profile의 main platform을 viewer preference로 읽고, direct alternate link가 없으면 search fallback CTA를 보여줍니다.
- `/recommendations/new`에서는 원본 링크 외 optional alternate platform links를 입력할 수 있습니다.
- `/` 랜딩에서는 hero artwork와 parchment/clay 기반 톤이 적용된 CTA shell이 함께 렌더링됩니다.
- recommendation card에서는 작성자 프로필로 바로 이동하는 CTA가 함께 보입니다.
- 잘못된 멤버 경로는 커스텀 not-found 화면으로 복구 경로를 제공합니다.
- `/profile/edit`에서는 필수값 검증, URL 형식 검증, 저장 중/성공/실패 상태가 server-session + local fallback flow로 동작합니다.
- `/profile/edit`에서는 browser identity 기준 server hydrate, completion summary, server/local reset profile action이 함께 동작합니다.
- `/members/[id]`에서는 추천 수 외에 reaction/save aggregate, conversation starter, reply CTA도 함께 보입니다.
- route별 QA 결과와 남은 blocker는 [`docs/qa-v0.3.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/qa-v0.3.md)에 정리했습니다.
- Vercel import 기준 배포 절차와 smoke checklist는 [`docs/deployment.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/deployment.md)에 정리했습니다.
- 현재 production URL은 [https://onochu.vercel.app](https://onochu.vercel.app)입니다.
- 현재 구현은 mock data + anonymous browser identity + server-session API + browser storage fallback 기반 MVP입니다.

## Commit Rule

- 모든 MB 완료 직후 커밋과 `origin/main` 푸시를 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 따른다.
- 현재 MB 계획은 [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md)에 정리한다.

## Recommended Next Step

1. server-session in-memory Map을 Vercel cold start / redeploy / multi-region을 견디는 durable provider로 교체
2. Git-integrated import path를 검증하려면 Vercel GitHub Login Connection 연결 여부 확인
3. production smoke 기준을 유지하며 genre / artist collection route 같은 later scope를 확장
