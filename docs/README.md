# Docs Index

`docs`는 MVP 기능을 기준으로 나눈 작업용 문서 모음이다. 각 문서는 이후 구현, 이슈 분리, QA 체크의 최소 단위로 사용한다.

## Tree

```text
docs
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

## Document Purpose

- `mb-plan.md`: MB 단위 작업 계획, 완료 기준, 커밋 규칙
- `deployment.md`: Vercel 배포 설정과 smoke runbook
- `prd.md`: PRD v0.3 저장소 반영본
- `spec.md`: PRD 기반 MVP 제품 명세와 현재 갭 정리
- `qa-v0.3.md`: route별 QA 결과, mobile smoke, blocker 정리
- `landing.md`: 서비스 소개와 핵심 CTA 정의
- `member-directory.md`: 멤버 목록, 검색, 필터 요구사항 정의
- `member-profile.md`: 멤버 상세와 추천곡 연동 정의
- `recommendation-feed.md`: 최근 추천곡 피드 요구사항 정의
- `profile-edit.md`: 프로필 생성/수정 폼 요구사항 정의
- `shared.md`: 공통 타입, 라우팅, UI/상태 규칙 정의
