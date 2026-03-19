# Onochu MB Plan

## Commit Convention

- 모든 MB 완료 직후 `commit -> push origin main`을 수행한다.
- 커밋 메시지 형식은 `MB 00 : 작업 소제목 요약`을 사용한다.
- MB 번호는 아래 순서를 기준으로 올린다.

## MB 01

- 제목: 작업 분해와 저장소 운영 규칙 정리
- Goal: MVP 구현 전에 MB 단위 계획과 커밋 규칙을 고정한다.
- Scope:
  - `docs/mb-plan.md`
  - `README.md`
  - `docs/README.md`
- Deliverables:
  - MB 번호 체계 정의
  - 커밋 메시지 규칙 명시
  - 문서 인덱스에 MB 계획 링크 반영
- Acceptance Criteria:
  - MB 목록이 문서에 존재한다.
  - 커밋 규칙이 루트 문서에 명시된다.
  - 이후 작업자가 MB 순서를 바로 참조할 수 있다.
- Verification:
  - `sed -n '1,260p' docs/mb-plan.md`
  - `sed -n '1,240p' README.md`

## MB 02

- 제목: Next.js 앱 스캐폴딩과 실행 명령 정의
- Goal: 구현 가능한 최소 앱 골격과 개발 명령을 만든다.
- Scope:
  - `package.json`
  - `next.config.*`
  - `tsconfig.json`
  - `app/*`
  - 기본 설정 파일들
- Deliverables:
  - Next.js App Router 프로젝트 초기화
  - TypeScript 및 Tailwind 설정
  - `lint`, `build`, `dev` 명령 정의
- Acceptance Criteria:
  - `npm run lint` 실행 가능
  - `npm run build` 실행 가능
  - 기본 홈 화면이 렌더링된다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 03

- 제목: 공통 타입, mock data, 라우팅 뼈대 작성
- Goal: 기능 구현 전에 데이터 구조와 기본 라우팅을 고정한다.
- Scope:
  - `docs/shared.md`
  - 타입 파일
  - mock data 파일
  - 기본 페이지 라우트
- Deliverables:
  - `MusicPlatform`, `MemberProfile`, `SongRecommendation` 타입 정의
  - 최소 8~12명 더미 데이터
  - 필수 페이지 경로 파일 생성
- Acceptance Criteria:
  - 모든 필수 라우트가 생성된다.
  - 더미 데이터 기준 렌더링이 가능하다.
  - 데이터 구조가 `docs/spec.md`와 일치한다.
- Verification:
  - `find app -maxdepth 3 | sort`
  - `npm run build`

## MB 04

- 제목: Landing과 공통 네비게이션 구현
- Goal: 첫 방문자 진입 경험과 핵심 CTA를 구현한다.
- Scope:
  - 랜딩 페이지
  - 공통 레이아웃
  - 네비게이션
- Deliverables:
  - `/` 화면
  - 모바일 우선 네비게이션
  - CTA 링크 연결
- Acceptance Criteria:
  - 랜딩에서 주요 섹션과 CTA가 보인다.
  - 멤버, 추천곡, 프로필 편집으로 이동 가능하다.
  - 모바일 레이아웃이 깨지지 않는다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 05

- 제목: Member Directory와 검색/필터 구현
- Goal: 멤버 목록 탐색과 검색/필터 UX를 구현한다.
- Scope:
  - `/members`
  - 프로필 카드
  - 검색 입력
  - 장르/플랫폼 필터
- Deliverables:
  - 멤버 카드 리스트
  - 닉네임 검색
  - 장르/플랫폼 필터
  - 빈 결과 상태
- Acceptance Criteria:
  - 닉네임 검색이 동작한다.
  - 장르 필터가 동작한다.
  - 플랫폼 필터가 동작한다.
  - 카드 클릭 시 상세 페이지로 이동한다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 06

- 제목: Member Profile Detail과 Recommendation Feed 구현
- Goal: 취향 상세와 추천곡 발견 흐름을 연결한다.
- Scope:
  - `/members/[id]`
  - `/recommendations`
  - 추천곡 카드
- Deliverables:
  - 멤버 상세 화면
  - 추천곡 리스트 및 링크 버튼
  - 전체 추천곡 피드
- Acceptance Criteria:
  - 멤버별 추천곡이 상세에 노출된다.
  - 추천곡 피드에서 작성자 정보가 보인다.
  - 외부 링크 이동이 동작한다.
- Verification:
  - `npm run lint`
  - `npm run build`

## MB 07

- 제목: Profile Edit, 검증 상태, 최종 MVP 정리
- Goal: 프로필 생성/수정 플로우와 MVP 마감 검증을 마친다.
- Scope:
  - `/profile/edit`
  - 폼 검증
  - 성공/실패 상태
  - 최종 문서 정리
- Deliverables:
  - 프로필 생성/수정 폼
  - 필수 입력값 검증
  - 저장 상태 피드백
  - README 최종 실행 가이드 보강
- Acceptance Criteria:
  - 필수값 검증이 동작한다.
  - 플레이리스트 링크 최소 1개 제약이 반영된다.
  - `npm run lint`와 `npm run build`가 통과한다.
  - MVP AC 항목을 다시 점검할 수 있다.
- Verification:
  - `npm run lint`
  - `npm run build`
