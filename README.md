# Onochu

Onochu는 KNU_POW 동아리원을 위한 음악 추천/발견 커뮤니티 웹앱 MVP 저장소입니다. 현재 문서 기준선은 [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md)이며, 이는 `/Users/mrtmi/Downloads/Onochu_PRD_v0.3.md`를 저장소용으로 재정리한 버전입니다.

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
- connection-first profile flow와 배포 문서 정리는 아직 남은 갭

## Documents

- [`docs/prd.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/prd.md): PRD v0.3 저장소 반영본
- [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md): MB 단위 작업 계획과 완료 기준
- [`docs/spec.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/spec.md): PRD를 구현 기준으로 재구성한 제품 명세
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
    |-- landing.md
    |-- mb-plan.md
    |-- member-directory.md
    |-- member-profile.md
    |-- prd.md
    |-- profile-edit.md
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
- 잘못된 멤버 경로는 커스텀 not-found 화면으로 복구 경로를 제공합니다.
- `/profile/edit`에서는 필수값 검증, URL 형식 검증, 저장 중/성공/실패 상태가 local flow로 동작합니다.
- `/members/[id]`에서는 추천 수 외에 reaction/save aggregate도 함께 보입니다.
- 현재 구현은 mock data 기반 MVP입니다.

## Commit Rule

- 모든 MB 완료 직후 커밋과 `origin/main` 푸시를 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 따른다.
- 현재 MB 계획은 [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md)에 정리한다.

## Recommended Next Step

1. [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md)의 `MB 21` 기준으로 recommendation attribution과 member profile 탐색 copy 강화
2. route별 acceptance criteria QA와 mobile usability 점검
3. Vercel 배포 문서와 최종 QA 근거 정리
