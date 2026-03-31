# Onochu QA v0.3

검증 날짜: 2026-03-31

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
- hero artwork 이미지 노출과 parchment/clay palette 적용 후에도 CTA 가시성 유지 확인

### `/recommendations`

- PASS
- active theme hero, saved shelf, all/saved filter, feed cards, profile CTA, fire/save 버튼 확인
- theme-aware storage migration 후 `v4 / browser storage active`, `3 theme-linked recs / 3 contributors` 표시 확인
- save 전 empty guidance가 보이고, saved shelf가 personal revisit queue 역할을 하는 구조 확인
- profile에서 저장한 `mainPlatform` 기준으로 card CTA가 `Play on Apple Music` 또는 `Search Apple Music`으로 해석되는 것 확인
- fallback 상태에서 `Search fallback` 라벨이 surface에 보이는 것 확인

### `/recommendations/new`

- PASS
- 독립 등록 route, local-only preview 설명, active theme context, linked rec count, feed 복귀 링크 확인
- optional alternate platform links 입력이 보이고, Apple Music alternate link를 저장한 뒤 preview CTA가 Apple Music 기준으로 바뀌는 것 확인

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
- 저장한 `mainPlatform`이 recommendation feed card CTA 해석에 연결되는 것 확인

## Production Smoke

- production url:
  - [https://onochu.vercel.app](https://onochu.vercel.app)
- PASS: `/`
- PASS: production landing에서 hero artwork 이미지와 primary CTA 2종 노출 확인
- PASS: `/recommendations`
- PASS: `/recommendations/new`
- PASS: `/members`
- PASS: `/members/kai`
- PASS: `/profile/edit`
- PASS: production `/recommendations`에서 saved shelf, `v5` storage marker, `3 theme-linked recs / 3 contributors` 확인
- PASS: production `/recommendations`에서 Apple Music preferred platform 기준 CTA와 `Search fallback` 라벨 확인
- PASS: production `/recommendations/new`에서 optional alternate links 입력과 draft preview의 Apple Music CTA 확인
- PASS: production `/recommendations/new`에서 mobile `Add/Hide` 토글이 alternate links 0개 -> 3개로 바뀌는 것 확인
- PASS: production `/recommendations/new`에서 Apple Music을 main platform으로 고르면 `Apple Music link (optional)` 입력이 사라지고 `Spotify link (optional)`가 노출되는 것 확인
- PASS: production `/recommendations/new`에서 빈 submit 시 `곡명/아티스트/원본 링크/코멘트` validation message가 모두 노출되는 것 확인
- PASS: production `/recommendations/new`에서 유효한 입력 후 `draft 저장 흐름을 확인했습니다. posting member:` success message 확인
- PASS: production `/profile/edit`에서 `v1` profile storage summary, completion, reset surface와 main platform save 확인

### `not-found`

- PASS
- `/members/unknown-member`에서 custom recovery path가 보이는 것 확인
- 개발 모드에서 보이는 404 resource console error 1건은 예상 가능한 not-found 진입 로그로 분류

## Mobile Smoke

- viewport `390x844` 기준 `/recommendations` 확인
- viewport `390x844` 기준 `/recommendations/new` 확인
- viewport `390x844` 기준 `/profile/edit` 확인
- viewport `390x844` 기준 landing hero artwork와 CTA 겹침/overflow 없음 확인
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
  - exact cross-platform mapping은 user-provided alternate link 또는 platform search fallback 기준이다
  - GitHub Login Connection 부재로 Git-integrated import path는 아직 검증하지 않음

## Summary

- PRD v0.3 route 기준 주요 화면은 현재 구현 범위 안에서 탐색 가능
- production deployment와 route smoke evidence를 확보했고, cross-platform recommendation access 흐름까지 QA 기준선에 포함했다
