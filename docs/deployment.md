# Deployment Runbook

## Goal

현재 Onochu MVP를 Vercel에 올릴 때 필요한 최소 설정과 검증 순서를 남긴다.

## Current Deployment Readiness

- framework: Next.js App Router
- package manager: `npm`
- production branch: `main`
- required env vars: 없음
- verified commands:
  - `npm run lint`
  - `npm run build`
- production deployment status:
  - deployed on 2026-03-25
  - production url: [https://onochu.vercel.app](https://onochu.vercel.app)
  - deployment inspect url: [inspect build](https://vercel.com/episteme1999-9155s-projects/onochu/7E8EJTKA44973gf3HahyekBNE2dj)

## Why This Repo Is Deployable

- 현재 저장소는 repo root 기준 단일 Next.js 프로젝트다.
- `package.json`에 `dev`, `build`, `start`, `lint` 스크립트가 정의돼 있다.
- `npm run build`가 통과해 production build가 생성된다.
- 런타임에서 요구하는 secret / env var가 없다.

이 판단은 공식 Vercel 문서의 Git import 및 Next.js zero-config 흐름을 기준으로 했다.

- Git import guide:
  - [Projects and deployments](https://vercel.com/docs/getting-started-with-vercel/projects-deployments)
- Git deployment flow:
  - [Deploying Git Repositories with Vercel](https://vercel.com/docs/git)
- Next.js deployment baseline:
  - [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

## Recommended Vercel Settings

- Repository:
  - `MrTMI-0315/onochu`
- Root Directory:
  - `.`
- Framework Preset:
  - `Next.js`
  - Vercel이 자동 감지하지 못할 경우에만 수동 선택
- Install Command:
  - 기본값 사용 또는 `npm install`
- Build Command:
  - 기본값 사용 가능
  - 명시가 필요하면 `npm run build`
- Output Directory:
  - 기본값 사용
- Environment Variables:
  - 현재 없음
- Production Branch:
  - `main`

## Dashboard Deployment Steps

1. Vercel 대시보드에서 `New Project`를 연다.
2. GitHub provider를 연결하고 `MrTMI-0315/onochu` 저장소를 import 한다.
3. Root Directory가 repo root인지 확인한다.
4. Framework Preset이 `Next.js`로 감지되는지 확인한다.
5. Build Command가 기본값이거나 `npm run build`인지 확인한다.
6. Environment Variables는 비워 둔다.
7. `Deploy`를 실행한다.
8. 첫 배포 완료 후 production URL에서 아래 smoke를 진행한다.

## Actual Deployment Evidence

- deploy command:
  - `npx vercel --prod --yes`
- result:
  - production alias: [https://onochu.vercel.app](https://onochu.vercel.app)
  - production deployment url: [https://onochu-l0lt11ze0-episteme1999-9155s-projects.vercel.app](https://onochu-l0lt11ze0-episteme1999-9155s-projects.vercel.app)
- note:
  - GitHub Login Connection 부재로 repository link 단계에서 400 경고가 있었지만, CLI upload 방식으로 production 배포 자체는 성공했다.
  - 로컬에는 `.vercel`이 생성됐고 `.gitignore`에 ignore 규칙이 추가됐다.

## Post-Deploy Smoke

- `/`
  - landing hero, CTA, featured theme 노출 확인
- `/recommendations`
  - saved shelf, all/saved filter, theme participation summary, fire/save UI, viewer platform CTA 노출 확인
- `/recommendations/new`
  - active theme linked rec count, optional alternate links, theme-aware create flow 확인
- `/members`
  - directory list와 filter surface 확인
- `/members/kai`
  - conversation starter와 reply CTA 확인
- `/profile/edit`
  - profile form과 main platform save flow 확인

## Executed Production Smoke

- PASS: `/`
- PASS: `/recommendations`
- PASS: `/recommendations/new`
- PASS: `/members`
- PASS: `/members/kai`
- PASS: `/profile/edit`
- PASS: landing의 post-rebuild CTA / featured recommendation 구조 확인
- PASS: recommendation feed의 `v4` storage marker와 `3 theme-linked recs / 3 contributors` 확인
- PASS: recommendation feed의 Apple Music preferred platform CTA와 `Search fallback` 라벨 확인
- PASS: recommendation create에서 optional alternate links 입력 후 draft preview CTA가 Apple Music 기준으로 바뀌는 것 확인
- PASS: profile edit의 `v1` profile storage summary / completion / reset surface와 main platform save 확인

## CLI Fallback

대시보드 import 대신 CLI로 시작하려면 공식 문서 기준 `vercel` CLI를 사용할 수 있다.

- 예시:
  - `vercel --cwd /Users/mrtmi/Desktop/Mr_TMI/repos/onochu`

현재 저장소에서는 Git import 방식이 더 단순하고, branch 기반 preview / production 흐름도 그대로 유지할 수 있다.

## Known Limits

- theme 운영 흐름은 manual/mock 수준이다.
- persistence와 auth는 local/mock 범위에 머문다.
- GitHub Login Connection은 아직 연결되지 않아 Git-integrated import path는 미완료 상태다.
