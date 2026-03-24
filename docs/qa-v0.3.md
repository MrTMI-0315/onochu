# Onochu QA v0.3

검증 날짜: 2026-03-25

## Verification Commands

- `npm run lint`
- `npm run build`
- `npm run dev`
- Playwright desktop smoke
- Playwright mobile smoke
- production deploy: `npx vercel --prod --yes`
- production smoke: `https://onochu.vercel.app`

## Route Checklist

### `/`

- PASS
- landing hero, CTA 3종, featured theme, featured members, current feed surface 확인

### `/recommendations`

- PASS
- active theme hero, saved shelf, all/saved filter, feed cards, profile CTA, fire/save 버튼 확인
- theme-aware storage migration 후 `v4 / browser storage active`, `3 theme-linked recs / 3 contributors` 표시 확인
- save 전 empty guidance가 보이고, saved shelf가 personal revisit queue 역할을 하는 구조 확인

### `/recommendations/new`

- PASS
- 독립 등록 route, local-only preview 설명, active theme context, linked rec count, feed 복귀 링크 확인

### `/members`

- PASS
- 검색 상단, active filters summary, 확장형 genre/platform filter UI, member card, profile 진입 링크 확인

### `/members/[id]`

- PASS
- featured recommendation, conversation starter, reaction/save aggregate, reply CTA 확인
- QA 중 카피 공백 누락을 발견했고 같은 날짜에 수정함

### `/profile/edit`

- PASS
- nickname, platform, bio, genre, playlist link 입력 surface와 local validation 구조 확인
- `v1 / profile browser storage active`, completion summary, reset profile action surface 확인

## Production Smoke

- production url:
  - [https://onochu.vercel.app](https://onochu.vercel.app)
- PASS: `/`
- PASS: `/recommendations`
- PASS: `/recommendations/new`
- PASS: `/members`
- PASS: `/members/kai`
- PASS: `/profile/edit`

### `not-found`

- PASS
- `/members/unknown-member`에서 custom recovery path가 보이는 것 확인
- 개발 모드에서 보이는 404 resource console error 1건은 예상 가능한 not-found 진입 로그로 분류

## Mobile Smoke

- viewport `390x844` 기준 `/recommendations` 확인
- viewport `390x844` 기준 `/recommendations/new` 확인
- viewport `390x844` 기준 `/profile/edit` 확인
- 하단 네비게이션, theme hero, saved shelf, feed card, profile persistence summary 주요 섹션이 세로 스크롤 안에서 유지되는 것 확인
- 이번 확인 범위에서는 치명적인 overflow / hidden CTA / broken layout 미발견

## Findings Fixed During QA

- `/members/[id]` 카피에서 멤버 닉네임 앞 공백이 누락돼 문장이 붙어 보이던 이슈 수정

## Remaining Gaps

- blocker:
  - 없음
- non-blocking:
  - theme 운영 흐름은 여전히 manual/mock 수준
  - persistence는 recommendation/profile 모두 browser-local 범위에 머물러 있음
  - GitHub Login Connection 부재로 Git-integrated import path는 아직 검증하지 않음

## Summary

- PRD v0.3 route 기준 주요 화면은 현재 구현 범위 안에서 탐색 가능
- production deployment와 route smoke evidence를 확보했고, post-rebuild 로컬 QA 기준선도 갱신했다
