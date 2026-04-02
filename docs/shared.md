# Shared

## Purpose

기능 공통으로 사용하는 데이터 구조, 라우팅, UX 규칙을 정리한다. v0.4에서는 **search handoff**, **manual curation collection**, **real-trust community** 확장 방향을 함께 고려한다.

## Shared Data

- `MusicPlatform`
- `PlaylistLink`
- `PlatformLinkMap`
- `MemberProfile`
- `SongRecommendation`
- `RecommendationEngagementState`
- `ThemeSpotlight`
- `GenreCollection`
- `ArtistCollection`

### `MusicPlatform`

- 현재 기준:
  - `spotify`
  - `apple_music`
  - `youtube_music`
  - `soundcloud`
  - `other`
- PRD v0.4 기준 later option:
  - `melon`

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
- `searchQuery?`
- `alternatePlatformUrls?`

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

### `GenreCollection`

- `id`
- `slug`
- `label`
- `recommendationIds`

### `ArtistCollection`

- `id`
- `slug`
- `artistName`
- `recommendationIds`

## Shared UX Rules

- 모바일 우선 반응형
- 카드 기반 UI
- 태그 칩 UI
- empty/loading/error 상태 고려
- 외부 링크는 사용자가 인지 가능한 형태로 제공
- copy + search handoff는 playback 보장보다 우선될 수 있다
- 추천은 링크보다 곡과 사람을 먼저 이해하게 만들어야 한다
- trusted club context를 해치지 않는 low-friction 구조를 유지한다

## Shared Routing

- `/`
- `/members`
- `/members/[id]`
- `/recommendations`
- `/recommendations/new`
- `/profile/edit`
- `/genres/[slug]` later / optional
- `/artists/[slug]` later / optional

## Shared Implementation Notes

- 초기 데이터는 local mock data 기준
- recommendation reactions / saves와 draft state는 browser storage 기준으로 유지 가능
- active theme와 recommendation create route는 같은 `ThemeSpotlight` 기준선을 공유
- recommendation은 원본 플랫폼 링크 외에 optional alternate platform links를 가질 수 있다
- recommendation은 `searchQuery`를 통해 copy + platform search handoff를 지원할 수 있다
- viewer는 자신의 `mainPlatform` 기준으로 recommendation CTA를 우선 해석할 수 있다
- exact direct link가 없을 때는 preferred platform search fallback을 보여줄 수 있다
- genre / artist collection은 later scope지만 현재 태그/아티스트 metadata는 이 확장을 막지 않아야 한다
- 추후 Supabase 연동 가능성을 고려해 UI와 데이터 계층을 분리
- 외부 플랫폼 API는 MVP 범위에서 제외
