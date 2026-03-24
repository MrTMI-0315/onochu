import Image from "next/image";
import Link from "next/link";
import { MemberCard } from "@/components/member-card";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getActiveThemeSpotlight,
  members,
  sortedRecommendations,
} from "@/lib/mock-data";

const primaryActions = [
  {
    href: "/recommendations",
    label: "Browse Recs",
    description: "곡과 추천 이유부터 읽고 사람으로 이어집니다.",
  },
  {
    href: "/members",
    label: "Meet Members",
    description: "취향 태그와 최근 추천으로 대화 실마리를 찾습니다.",
  },
  {
    href: "/profile/edit",
    label: "Build Profile",
    description: "내 취향을 짧게 남기고 연결 가능한 프로필을 만듭니다.",
  },
];

const productSteps = [
  {
    title: "1. Hear the song",
    description: "링크보다 먼저 곡명, 아티스트, 추천 이유를 이해합니다.",
  },
  {
    title: "2. Meet the recommender",
    description: "추천한 사람을 눌러 취향과 플레이리스트 맥락을 이어 봅니다.",
  },
  {
    title: "3. Keep the connection",
    description: "반응, 저장, 다음 추천으로 대화가 흘러가게 만듭니다.",
  },
];

export default function HomePage() {
  const activeTheme = getActiveThemeSpotlight();
  const featuredRecommendation = sortedRecommendations[0];

  return (
    <main className="px-4 pb-28 pt-24 text-white md:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="landing-hero-shell relative overflow-hidden rounded-[2rem] border p-7 md:p-10">
            <div className="landing-hero-haze absolute -left-16 -top-16 h-56 w-56 rounded-full blur-[100px]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
              <span className="onochu-eyebrow">KNU_POW Connection Layer</span>
              <h1 className="onochu-display mt-5 text-5xl font-bold uppercase leading-[0.9] md:text-7xl">
                Stop losing
                <br />
                <span className="landing-hero-highlight bg-clip-text text-transparent">
                  the song,
                </span>
                <br />
                keep the person.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                카카오톡에 묻히던 추천을 구조화해서 남기고, 플랫폼이 달라도
                곡과 추천인을 함께 이해하게 만드는 모바일 우선 커뮤니티
                인터페이스입니다.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/recommendations"
                  className="landing-primary-cta rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
                >
                  Open recommendation feed
                </Link>
                <Link
                  href="/members"
                  className="landing-secondary-cta rounded-full border px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em]"
                >
                  Explore members
                </Link>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {primaryActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="landing-action-card rounded-[1.5rem] border p-4 transition"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                      Primary action
                    </p>
                    <h2 className="onochu-display mt-3 text-2xl font-bold uppercase text-white">
                      {action.label}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/62">
                      {action.description}
                    </p>
                  </Link>
                ))}
              </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <div className="landing-hero-art-wrap relative w-full max-w-[25rem]">
                  <div className="landing-hero-art-glow absolute inset-x-[12%] bottom-[8%] h-24 rounded-full blur-3xl" />
                  <div className="landing-hero-art-panel relative overflow-hidden rounded-[2rem] border p-5">
                    <div className="landing-hero-art-frame relative mx-auto aspect-[0.7] w-full max-w-[20rem]">
                      <Image
                        src="/landing-hero-art.png"
                        alt="Headphone-wearing DJ artwork in vintage Japanese illustration style"
                        fill
                        priority
                        className="object-contain object-center"
                        sizes="(max-width: 1024px) 70vw, 28rem"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[color:var(--outline-strong)] pt-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                          Hero artwork
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[color:var(--text-soft)]">
                          paper, lacquer, headphone, turntable
                        </p>
                      </div>
                      <span className="rounded-full border border-[color:var(--outline-strong)] bg-[color:var(--surface-veil)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--text-soft)]">
                        mood anchor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-4">
            <article className="onochu-panel rounded-[2rem] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">
                Live theme
              </p>
              <h2 className="onochu-display mt-3 text-3xl font-bold uppercase text-white">
                {activeTheme?.title ?? "Theme in motion"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65">
                {activeTheme?.description ??
                  "운영 중인 테마와 현재 커뮤니티 흐름을 한 번에 읽습니다."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeTheme?.relatedEvent ? (
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">
                    {activeTheme.relatedEvent}
                  </span>
                ) : null}
                {activeTheme?.activationWindow ? (
                  <span className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/62">
                    {activeTheme.activationWindow}
                  </span>
                ) : null}
              </div>
              <Link
                href="/recommendations"
                className="mt-6 inline-flex text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]"
              >
                Open live feed
              </Link>
            </article>

            <article className="onochu-panel rounded-[2rem] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Why this matters
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {productSteps.map((step) => (
                  <div key={step.title} className="rounded-[1.25rem] bg-white/4 p-4">
                    <p className="text-sm font-semibold text-white">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/62">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="onochu-eyebrow">Start with one track</span>
                <h2 className="onochu-display mt-2 text-3xl font-bold uppercase tracking-tight">
                  Featured recommendation
                </h2>
              </div>
              <Link
                href="/recommendations"
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]"
              >
                Open feed
              </Link>
            </div>
            <RecommendationCard
              recommendation={featuredRecommendation}
              compact
              showEngagementControls={false}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="onochu-eyebrow">People to meet</span>
                <h2 className="onochu-display mt-2 text-3xl font-bold uppercase tracking-tight">
                  Member snapshots
                </h2>
              </div>
              <Link
                href="/members"
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4">
              {members.slice(0, 2).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
