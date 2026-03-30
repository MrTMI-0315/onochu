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
    label: "Explore recommendations",
    kind: "primary" as const,
  },
  {
    href: "/members",
    label: "Explore members",
    kind: "secondary" as const,
  },
];

export default function HomePage() {
  const activeTheme = getActiveThemeSpotlight();
  const featuredRecommendation = sortedRecommendations[0];

  return (
    <main className="min-h-screen bg-[var(--paper)] px-6 pb-16 pt-8 text-[color:var(--accent-ink)] md:bg-transparent md:px-6 md:pb-12 md:pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="min-h-[calc(100svh-2.5rem)] px-0 py-4 md:min-h-0 md:rounded-[2.2rem] md:border md:border-[color:rgba(109,66,60,0.12)] md:bg-[color:rgba(241,233,210,0.74)] md:px-8 md:py-10 md:shadow-[0_20px_60px_rgba(109,66,60,0.08)] md:backdrop-blur-sm">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <div className="max-w-3xl">
              <div>
                <p className="text-[2rem] font-medium tracking-[-0.055em] text-[color:var(--accent-ink)] md:text-[2.25rem]">
                  Onochu
                </p>
                <div className="mt-3 h-px w-14 bg-[color:rgba(183,106,85,0.55)]" />
              </div>

              <h1 className="mt-16 max-w-[8.8ch] text-[clamp(2.55rem,10.7vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.08em] text-[color:var(--accent-ink)] md:mt-20 md:max-w-4xl">
                Music
                <br />
                recommendations
                <br />
                shouldn&apos;t disappear in
                <br />
                chat
              </h1>

              <p className="mt-10 max-w-[18.5rem] text-[1.02rem] leading-[1.65] text-[color:rgba(64,52,44,0.72)] md:max-w-2xl md:text-[1.25rem]">
                Platform differences create friction. Onochu structures
                recommendations so you can discover songs and the people behind
                them.
              </p>

              <div className="mt-12 flex max-w-none flex-col gap-3 md:max-w-xl">
                {primaryActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className={`flex min-h-14 items-center justify-center rounded-[0.3rem] border px-5 text-center text-[1.03rem] font-semibold transition ${
                      action.kind === "primary"
                        ? "border-[var(--primary-strong)] bg-[var(--primary-strong)] text-[color:var(--paper)]"
                        : "border-[color:rgba(109,66,60,0.16)] bg-[color:rgba(255,255,255,0.22)] text-[color:var(--accent-ink)]"
                    }`}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="hidden rounded-[1.5rem] border border-[color:rgba(109,66,60,0.12)] bg-[color:rgba(255,255,255,0.18)] p-5 lg:block">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[color:rgba(64,52,44,0.55)]">
                Live theme
              </p>
              <h2 className="mt-3 text-[1.5rem] font-semibold leading-tight text-[color:var(--accent-ink)]">
                {activeTheme?.title ?? "Theme in motion"}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:rgba(64,52,44,0.7)]">
                {activeTheme?.description ??
                  "현재 커뮤니티에서 어떤 테마로 추천이 모이고 있는지 한눈에 읽습니다."}
              </p>
              <div className="mt-5 space-y-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[color:rgba(64,52,44,0.5)]">
                {activeTheme?.relatedEvent ? <p>{activeTheme.relatedEvent}</p> : null}
                {activeTheme?.activationWindow ? (
                  <p>{activeTheme.activationWindow}</p>
                ) : null}
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[color:rgba(64,52,44,0.5)]">
                  Start with one track
                </p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--accent-ink)]">
                  Featured recommendation
                </h2>
              </div>
              <Link
                href="/recommendations"
                className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--primary-strong)]"
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[color:rgba(64,52,44,0.5)]">
                  People to meet
                </p>
                <h2 className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-[color:var(--accent-ink)]">
                  Member snapshots
                </h2>
              </div>
              <Link
                href="/members"
                className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--primary-strong)]"
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
