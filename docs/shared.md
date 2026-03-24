# Shared

## Purpose

기능 공통으로 사용하는 데이터 구조, 라우팅, UX 규칙을 정리한다.

## Shared Data

- `MusicPlatform`
- `PlaylistLink`
- `MemberProfile`
- `SongRecommendation`
- `RecommendationEngagementState`
- `ThemeSpotlight`

### `SongRecommendation` Required Fields

- `id`
- `memberId`
- `memberNickname`
- `trackTitle`
- `artistName`
- `platform`
- `url`
- `comment`
- `moodTags`
- `createdAt`
- `reactionCount`
- `saveCount`

### `ThemeSpotlight` Shared Metadata

- `title`
- `description`
- `relatedEvent`
- `isActive`
- `phaseLabel`
- `activationWindow`
- `ctaLabel`
- `ctaHref`
- `curatorNote`
- `participantSummary`
- `highlightTags`

## Shared UX Rules

- 모바일 우선 반응형
- 카드 기반 UI
- 태그 칩 UI
- empty/loading/error 상태 고려
- 외부 링크는 사용자가 인지 가능한 형태로 제공

## Shared Routing

- `/`
- `/members`
- `/members/[id]`
- `/recommendations`
- `/recommendations/new`
- `/profile/edit`

## Shared Implementation Notes

- 초기 데이터는 local mock data 기준
- recommendation reactions / saves와 draft state는 browser storage 기준으로 유지 가능
- active theme와 recommendation create route는 같은 `ThemeSpotlight` 기준선을 공유
- 추후 Supabase 연동 가능성을 고려해 UI와 데이터 계층을 분리
- 외부 플랫폼 API는 MVP 범위에서 제외
