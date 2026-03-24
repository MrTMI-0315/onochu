# Onochu QA v0.3

검증 날짜: 2026-03-24

## Verification Commands

- `npm run lint`
- `npm run build`
- `npm run dev`
- Playwright desktop smoke
- Playwright mobile smoke

## Route Checklist

### `/`

- PASS
- landing hero, CTA 3종, featured theme, featured members, current feed surface 확인

### `/recommendations`

- PASS
- active theme hero, theme selects, compose panel, feed cards, profile CTA, fire/save 버튼 확인
- 첫 추천 카드의 fire 버튼 클릭 후 count 변화와 storage message 갱신 확인

### `/recommendations/new`

- PASS
- 독립 등록 route, local-only preview 설명, active theme context, feed 복귀 링크 확인

### `/members`

- PASS
- 검색/장르/플랫폼 필터 UI, member card, profile 진입 링크 확인

### `/members/[id]`

- PASS
- featured recommendation, conversation starter, reaction/save aggregate, reply CTA 확인
- QA 중 카피 공백 누락을 발견했고 같은 날짜에 수정함

### `/profile/edit`

- PASS
- nickname, platform, bio, genre, playlist link 입력 surface와 local validation 구조 확인

### `not-found`

- PASS
- `/members/unknown-member`에서 custom recovery path가 보이는 것 확인
- 개발 모드에서 보이는 404 resource console error 1건은 예상 가능한 not-found 진입 로그로 분류

## Mobile Smoke

- viewport `390x844` 기준 `/recommendations` 확인
- viewport `390x844` 기준 `/members/kai` 확인
- 하단 네비게이션, theme hero, feed card, member profile 주요 섹션이 세로 스크롤 안에서 유지되는 것 확인
- 이번 확인 범위에서는 치명적인 overflow / hidden CTA / broken layout 미발견

## Findings Fixed During QA

- `/members/[id]` 카피에서 멤버 닉네임 앞 공백이 누락돼 문장이 붙어 보이던 이슈 수정

## Remaining Gaps

- blocker:
  - Vercel 배포 문서와 운영 체크리스트가 아직 없어 배포 가능 상태 증거가 부족함
- non-blocking:
  - theme 운영 흐름은 여전히 manual/mock 수준
  - persistence와 auth는 local/mock 범위에 머물러 있음

## Summary

- PRD v0.3 route 기준 주요 화면은 현재 구현 범위 안에서 탐색 가능
- 남은 핵심 blocker는 배포/운영 문서 정리 1건으로 축소
