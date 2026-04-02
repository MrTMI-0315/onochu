# Recommendation Feed

## Goal

최근 등록된 추천곡을 시간 흐름에 따라 탐색하며 새로운 취향을 발견하고, 플랫폼이 달라도 **쉽게 검색·복사·반응**할 수 있게 한다.

## Route

- `/recommendations`
- `/recommendations/new`에서 독립 등록 후 feed로 복귀 가능

## Must Have

- weekly / event theme hero
- active theme relatedEvent / activationWindow / curator note
- dedicated recommendation create route 진입 CTA
- recommendation create에서 optional alternate platform links 입력
- 최근 추천곡 카드 리스트
- browse-first 정보 구조
- all / saved recommendation filter
- saved recommendation shelf
- 곡명, 아티스트, 작성자
- 추천인 프로필 진입 CTA
- 플랫폼, 코멘트, 무드 태그
- fire / save interaction
- preferred platform handoff CTA
- 원본 링크 fallback
- 곡명/아티스트 copy 또는 search handoff
- active theme에서 작성된 draft는 theme metadata를 함께 가진다

## Card Fields

- `trackTitle`
- `artistName`
- `memberNickname`
- `platform`
- `comment`
- `moodTags`
- `createdAt`
- `reactionCount`
- `saveCount`
- `searchQuery`
- `alternatePlatformUrls?`

## States

- weekly theme 기본 상태
- active theme / queued theme 상태
- default feed 상태
- saved-only filter 상태
- saved shelf empty guidance 상태
- draft preview 상태
- local feed insertion simulation 상태
- top pick / contributor / mood / total recs 재계산 상태
- localStorage hydrate / save 상태
- reaction/save active state 및 count 상태
- storage version migration 상태
- local reset 상태
- 추천곡 없음 상태

## Search Handoff Rules

- 추천 카드는 원본 링크만 보여주는 구조가 아니라 search handoff를 제공해야 한다.
- viewer `mainPlatform`이 있으면 그 플랫폼 기준으로 CTA를 해석한다.
- exact alternate link가 있으면 direct link를 우선 사용한다.
- direct link가 없으면 `searchQuery`를 기반으로 preferred platform search CTA를 제공한다.
- preferred platform search가 불가능하면 source/original link fallback을 명확히 보여준다.
- 곡명/아티스트 복사 액션은 full playback fantasy 대신 현실적인 전환 UX로 취급한다.

## Notes

- 누가 추천했는지가 카드에서 바로 보여야 한다.
- 카드의 시각적 우선순위는 곡명, 추천인, 추천 이유, 행동 순서로 유지한다.
- 추천 카드에서 프로필 이동 이유가 짧게 설명되어야 한다.
- 모바일에서 한 카드당 정보 밀도가 과하지 않도록 조정한다.
- feed는 browse-first, 작성은 `/recommendations/new` 중심으로 분리한다.
- save interaction은 다시 보기 위한 personal revisit flow로 이어져야 한다.
- 저장된 곡이 없을 때도 save 목적을 설명하는 empty guidance가 필요하다.
- 추천 등록은 원본 링크 1개로 끝낼 수 있지만, 필요하면 alternate platform links를 선택적으로 추가할 수 있어야 한다.
- 저장된 draft는 browser storage 기준으로 새로고침 이후에도 local feed 최상단에 유지된다.
- local draft가 추가되면 feed 상단 카드와 파생 통계가 함께 갱신되어야 한다.
- fire와 save는 browser storage 기준으로 새로고침 뒤에도 active state와 count 변화가 유지되어야 한다.
- active theme는 운영 맥락이 읽히도록 event name, window, curator note가 함께 보여야 한다.
- active theme에 연결된 recommendation 수와 참여자 수가 surface에서 읽혀야 한다.
- genre / artist collection은 later scope지만, 태그와 아티스트 surface는 그 확장을 막지 않아야 한다.

## Later Extensions

- `/genres/[slug]`에서 장르별 추천 모아보기
- `/artists/[slug]`에서 아티스트별 추천 모아보기
- manual curation 기반 장르/아티스트 분류 보정
- trusted real-name context를 반영한 추천인 신뢰 surface 강화
