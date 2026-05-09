# Onochu QA Baseline

검증 기준선:

- 2026-03-31: v0.3 route and production smoke
- 2026-04-03: v0.4 recommendation feed search handoff verification

## Verification Commands

- `npm run qa:brand-header`
- `npm run lint`
- `npm run build`
- `npm run dev`
- Playwright desktop smoke
- Playwright mobile smoke
- production deploy: `npx vercel --prod --yes`
- production smoke: `https://onochu.vercel.app`

## Route Checklist

### Global Header Interaction

- `ONOCHU` 브랜드 마크 클릭 시 항상 `/` 홈으로 이동해야 함
- mobile/desktop 공통 헤더에서 동일한 브랜드 배지 스타일을 유지해야 함

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

## v0.4 Feed QA Addendum

검증 날짜: 2026-04-03

### Scope

- `/recommendations`
- recommendation card search handoff surface
- recommendation create / profile edit platform option exposure

### Verified

- PASS: recommendation runtime model에 `searchQuery`가 seed 및 draft 생성 경로에 모두 반영된 상태 확인
- PASS: recommendation card에 `Search handoff` 블록과 `Copy` 액션이 추가된 상태 확인
- PASS: direct link가 없을 때 `Search Apple Music`, `Search Melon` 같은 preferred platform search handoff를 생성할 수 있는 helper 상태 확인
- PASS: recommendation create mobile platform order에 `Melon`이 노출되는 상태 확인
- PASS: profile edit mobile platform order에 `Melon`이 노출되는 상태 확인
- PASS: mobile recommendation card에서 search handoff 문구를 compact하게 줄여 카드 높이를 과도하게 늘리지 않도록 조정한 상태 확인

### Verification Commands

- `npm run lint`
- `npm run build`
- `rg -n "searchQuery|melon|Copy query|Search handoff" /Users/mrtmi/Desktop/Mr_TMI/repos/onochu/lib /Users/mrtmi/Desktop/Mr_TMI/repos/onochu/components`

### Browser Limitation

- 현재 desktop app 환경에서는 Playwright MCP가 `ENOENT: no such file or directory, mkdir '/.playwright-mcp'` 오류로 production 브라우저 시각 smoke를 직접 남기지 못했다.
- 따라서 2026-04-03 기준 v0.4 feed QA는 코드 경로 확인, lint/build 통과, live alias 응답, component diff 검토를 근거로 기록했다.
- clipboard 기반 `Copy` 동작은 브라우저 권한 정책 영향을 받으므로, production 모바일 브라우저에서 한 번 더 수동 확인하는 것이 안전하다.

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
  - Playwright MCP browser verification은 현재 로컬 `/.playwright-mcp` 생성 오류로 제한됨
  - theme 운영 흐름은 여전히 manual/mock 수준
  - persistence는 recommendation/profile 모두 browser-local 범위에 머물러 있음
  - exact cross-platform mapping은 user-provided alternate link 또는 platform search fallback 기준이다
  - GitHub Login Connection 부재로 Git-integrated import path는 아직 검증하지 않음

## Summary

- PRD v0.3 route 기준 주요 화면은 현재 구현 범위 안에서 탐색 가능
- PRD v0.4 기준 search-first cross-platform handoff는 runtime model과 UI surface까지 반영되었다
- production deployment와 route smoke evidence를 확보했고, cross-platform recommendation access 흐름까지 QA 기준선에 포함했다


## 2026-04-24 Docs Alignment Smoke

### Scope

- README / SPEC / MB plan / shared docs의 v0.4 구현 기준선 정렬
- Phase 2 lightweight identity 및 server persistence sequence 확정
- local route smoke using Playwright MCP

### Verified

- PASS: npm run qa:brand-header
- PASS: npm run lint
- PASS: npm run build
- PASS: Playwright MCP route smoke for /, /recommendations, /recommendations/new, /members, /members/kai, /profile/edit
- PASS: route smoke에서 각 route가 HTTP 200을 반환하고 핵심 텍스트가 누락 없이 노출됨
- PASS: profile draft와 recommendation storage가 anonymous browser identity boundary를 공유하도록 코드 경계가 추가됨

### Remaining Gaps

- recommendation / engagement / profile server persistence는 아직 구현 전이다.
- genre / artist collection route는 later scope로 남아 있다.

## 2026-05-09 MB53 Visual System Alignment Smoke

### Scope

- `/` main landing의 parchment / clay archive tone을 기준선으로 삼아 shared shell과 mobile nav를 정렬
- old dark glass shell이 남아 있던 `PageShell` / not-found recovery path 정리
- mobile bottom nav를 archive border / opaque parchment surface로 조정

### Verified

- PASS: `npm run qa:brand-header`
- PASS: `npm run lint`
- PASS: `npm run build`
- PASS: Playwright MCP desktop smoke for `/`
- PASS: Playwright MCP not-found smoke for `/members/unknown-member`
- PASS: Playwright MCP mobile smoke at `390x844` for `/`, `/recommendations`, `/profile/edit`
- PASS: not-found recovery route가 dark rounded glass card 대신 parchment archive shell로 렌더링됨
- PASS: mobile bottom nav가 더 작은 opaque archive surface로 표시되고 active state가 유지됨

### Notes

- `/members/unknown-member` 진입 시 개발 모드 console에 not-found resource error가 1건 보이는 것은 custom 404 route smoke에서 예상 가능한 로그로 분류한다.
- mobile bottom nav는 여전히 fixed navigation이므로 viewport 하단 콘텐츠 일부와 겹칠 수 있으나, 첫 화면의 핵심 heading / description / primary context는 가리지 않는다.

## 2026-05-09 MB54 Recommendation Draft Server-Session Smoke

### Scope

- recommendation draft와 alternate platform links를 `browserIdentityId` 기준 server API에 저장
- 기존 browser storage는 migration source와 fallback으로 유지
- `/recommendations/new`에서 저장한 draft가 `/recommendations` feed hydrate에 반영되는지 확인

### Verified

- PASS: `npm run qa:brand-header`
- PASS: `npm run lint`
- PASS: `npm run build`
- PASS: `/api/recommendations` route가 build output에 dynamic function으로 포함됨
- PASS: Playwright MCP로 `/recommendations/new`에서 `MB54 Smoke Song` draft 작성
- PASS: API `GET /api/recommendations?ownerBrowserIdentityId=...`가 `200`과 저장 record를 반환
- PASS: 저장 record에 `searchQuery`와 `themeId`가 보존됨
- PASS: 저장 record에 alternate platform link map이 보존됨
- PASS: `/recommendations` reload 후 server-session draft가 visible feed item으로 hydrate됨

### Remaining Gap

- 현재 server backing은 외부 DB 없이 가능한 in-memory server-session store다. Vercel cold start / redeploy / multi-region을 넘는 durable persistence는 MB57 전까지 별도 storage provider 결정이 필요하다.

## 2026-05-09 MB55 Recommendation Engagement Server-Session Smoke

### Scope

- fire/save active state와 count delta를 `browserIdentityId` 기준 server-session record에 포함
- server hydration 뒤 saved shelf / saved filter가 동일 engagement state를 복원하는지 확인
- duplicate toggle은 기존 boolean state 기반 delta 계산을 유지해 비정상 count 증가를 방지

### Verified

- PASS: `npm run qa:brand-header`
- PASS: `npm run lint`
- PASS: `npm run build`
- PASS: Playwright MCP로 `/recommendations`에서 save engagement toggle 후 API record 확인
- PASS: API record에 `engagementByRecommendationId`가 저장되고 대상 추천의 `save` state와 `saveCount` delta가 유지됨
- PASS: React dev/Strict 환경에서 toggle count가 중복 증가하던 updater side-effect를 제거한 뒤 0→1 delta를 재검증함
- PASS: `/recommendations` reload 후 saved filter에서 saved item이 visible feed item으로 복원됨

### Remaining Gap

- MB55도 MB54와 같은 in-memory server-session backing을 사용한다. production-grade durability는 durable provider 연결 전까지 보장하지 않는다.

## 2026-05-09 MB56 Profile Draft Server-Session Smoke

### Scope

- profile edit draft를 `browserIdentityId` 기준 server-session API에 저장
- recommendation feed/create route가 server hydrated main platform을 CTA 해석에 반영
- reset action은 local draft와 server session boundary를 함께 설명

### Verified

- PASS: `npm run qa:brand-header`
- PASS: `npm run lint`
- PASS: `npm run build`
- PASS: Playwright MCP로 `/profile/edit`에서 main platform을 Apple Music으로 저장
- PASS: API `GET /api/profile?ownerBrowserIdentityId=...`가 server profile draft와 main platform을 반환
- PASS: `/recommendations` reload 후 recommendation CTA가 server hydrated Apple Music alternate link를 우선 사용
- PASS: reset action이 local draft와 server-session reset copy를 노출
- PASS: 빈 server-session fallback은 `record:null` 200 응답으로 처리되어 Playwright console error가 남지 않음

### Remaining Gap

- profile server backing 역시 in-memory server-session store다. Vercel cold start / redeploy / multi-region durability는 MB57 durable provider 결정 전까지 보장하지 않는다.

## 2026-05-09 MB57 Visual and Persistence Migration Production Smoke

### Scope

- MB53 visual alignment 이후 production route tone baseline 재검증
- MB54~56 recommendation draft / engagement / profile server-session persistence production smoke
- Vercel production deployment evidence와 Git-integrated import fallback 상태 갱신

### Verified

- PASS: `npm run qa:brand-header`
- PASS: `npm run lint`
- PASS: `npm run build`
- PASS: `npx vercel --prod --yes`
- PASS: Vercel deployment `dpl_5EnW8kkkMfXLgVJ9HE8Ug4GEHiaC` READY
- PASS: production alias [https://onochu.vercel.app](https://onochu.vercel.app) 최신 deployment에 alias됨
- PASS: Playwright production route smoke `/`, `/recommendations`, `/recommendations/new`, `/members`, `/members/kai`, `/profile/edit` 모두 HTTP 200
- PASS: production route text와 surfaces가 parchment / clay archive tone 기준에서 벗어나지 않음
- PASS: `/profile/edit`에서 Apple Music main platform 저장 후 `GET /api/profile`이 `mainPlatform: "apple_music"` 반환
- PASS: `/recommendations/new`에서 `MB57 Production Smoke` draft 저장 후 `GET /api/recommendations` record에 반영됨
- PASS: `/recommendations` reload 후 MB57 draft가 visible feed item으로 hydrate됨
- PASS: profile server hydration 후 recommendation CTA가 Apple Music search link를 우선 사용함
- PASS: save engagement toggle이 `saveCount: 1`, `save: true`로 저장되고 saved filter reload 후 복원됨
- PASS: latest production smoke 기준 Playwright console error 0건

### Remaining Gap

- GitHub Login Connection은 아직 미연결이라 CLI upload deployment path가 fallback이다.
- server-session backing은 production smoke에서 동작했지만, in-memory Map이므로 Vercel cold start / redeploy / multi-region durability는 다음 단계에서 durable provider로 해소해야 한다.
