# Onochu

Onochu는 KNU_POW 동아리원을 위한 음악 취향 프로필 및 추천곡 공유 웹앱 MVP 문서 저장소입니다. 현재 저장소는 구현 전 단계이며, `/Users/mrtmi/Downloads/Onochu_PRD_v0.1.md`를 기준으로 제품 요구사항과 기능별 문서를 먼저 정리한 상태입니다.

## Current Status

- 앱 코드 스캐폴딩 전 단계
- 구현 기준 문서 작성 완료
- 기능별 문서 트리 구성 완료
- 실행 스크립트 없음

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

- 현재 `package.json`, `Makefile`, `pubspec.yaml`은 없습니다.
- 따라서 실행 가능한 `lint`, `test`, `build` 명령은 아직 정의되지 않았습니다.
- 다음 단계는 Next.js App Router 기반 초기 스캐폴딩과 mock data 설계입니다.

## Commit Rule

- 모든 MB 완료 직후 커밋과 `origin/main` 푸시를 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 따른다.
- 현재 MB 계획은 [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md)에 정리한다.

## Recommended Next Step

1. [`docs/mb-plan.md`](/Users/mrtmi/Desktop/Mr_TMI/repos/onochu/docs/mb-plan.md) 순서대로 MB 진행
2. `docs/shared.md` 기준으로 타입과 mock data 정의
3. `docs` 기능 문서 순서대로 MVP 화면 구현
