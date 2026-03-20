# Recommendation Feed

## Goal

최근 등록된 추천곡을 시간 흐름에 따라 탐색하며 새로운 취향을 발견할 수 있게 한다.

## Route

- `/recommendations`

## Must Have

- weekly theme hero / theme selects
- local mock recommendation compose panel
- 최근 추천곡 카드 리스트
- 곡명, 아티스트, 작성자
- 플랫폼, 코멘트, 무드 태그
- 외부 링크 이동

## Card Fields

- trackTitle
- artistName
- member nickname
- platform
- comment
- moodTags
- createdAt

## States

- weekly theme 기본 상태
- compose idle / saving / success / error 상태
- 기본 피드 상태
- 추천곡 없음 상태

## Notes

- 누가 추천했는지가 카드에서 바로 보여야 한다.
- 모바일에서 한 카드당 정보 밀도가 과하지 않도록 조정한다.
- 작성 플로우는 현재 local mock validation 까지만 포함한다.
