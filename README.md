# Onochu

Onochu는 KNU_POW 동아리원을 위한 음악 취향 프로필 및 추천곡 공유 웹앱 MVP 문서 저장소입니다. 현재 저장소는 구현 전 단계이며, `/Users/mrtmi/Downloads/Onochu_PRD_v0.1.md`를 기준으로 제품 요구사항과 기능별 문서를 먼저 정리한 상태입니다.

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

## Documents

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
- 현재 `/`, `/members`, `/members/[id]`, `/recommendations`, `/profile/edit` 라우트가 존재합니다.
- 공통 네비게이션은 desktop top bar와 mobile bottom bar로 동작합니다.
- `/members`에서는 닉네임 검색, 장르 필터, 플랫폼 필터 조합이 동작합니다.
- `/recommendations`에서는 작성자 링크와 무드 하이라이트가 함께 렌더링됩니다.
- 잘못된 멤버 경로는 커스텀 not-found 화면으로 복구 경로를 제공합니다.
- `/profile/edit`에서는 필수값 검증, URL 형식 검증, 저장 중/성공/실패 상태가 local flow로 동작합니다.
- 현재 구현은 mock data 기반 MVP입니다.

## Commit Rule

- 모든 MB 완료 직후 커밋과 `origin/main` 푸시를 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 따른다.
- 현재 MB 계획은 [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md)에 정리한다.

## Recommended Next Step

1. [`docs/spec.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/spec.md) 기준으로 MVP Acceptance Criteria 재점검
2. mock/local state를 실제 persistence 레이어로 옮길지 결정
3. 필요 시 Supabase 연동이나 invite flow 같은 Phase 2 범위 설계
