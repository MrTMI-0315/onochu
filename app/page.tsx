import Link from "next/link";
import { MemberCard } from "@/components/member-card";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getActiveThemeSpotlight,
  members,
  sortedRecommendations,
} from "@/lib/mock-data";

const quickLinks = [
  {
    href: "/recommendations",
    label: "Browse Recs",
    description: "추천곡을 피드 중심으로 탐색합니다.",
  },
  {
    href: "/members",
    label: "Explore Members",
    description: "멤버 프로필과 취향 태그를 둘러봅니다.",
  },
  {
    href: "/profile/edit",
    label: "Create Profile",
    description: "내 취향과 링크를 프로필로 정리합니다.",
  },
];

export default function HomePage() {
  const topPick = sortedRecommendations[0];
  const activeTheme = getActiveThemeSpotlight();

  return (
    <main className="px-4 pb-28 pt-24 text-white md:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-black/20 p-7 md:p-10">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#de8eff]/12 blur-[100px]" />
            <span className="onochu-eyebrow">KNU_POW Music Profile Layer</span>
            <h1 className="onochu-display mt-5 text-5xl font-bold uppercase leading-[0.9] md:text-7xl">
              Stop Losing
              <br />
              <span className="bg-gradient-to-r from-[#de8eff] to-[#b90afc] bg-clip-text text-transparent">
                The Sound.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              카카오톡에서 흘러가던 추천곡, 플랫폼마다 갈라진 링크 경험,
              기억나지 않는 누군가의 취향을 Onochu 안에서 다시 연결합니다.
            </p>
            <div className="mt-8 rounded-[1.25rem] border-l-4 border-[#de8eff] bg-[#131313] p-5">
              <p className="onochu-eyebrow">The Mission</p>
              <p className="mt-2 text-sm leading-7 text-white/80">
                A dedicated space for the KNU_POW hip-hop club to share,
                discover, and connect through music.
              </p>
            </div>
          </div>

          <div className="onochu-panel rounded-[2rem] p-6">
            <p className="onochu-eyebrow">Current Snapshot</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-3xl font-bold text-white">{members.length}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                  Seeded member profiles
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-3xl font-bold text-white">
                  {sortedRecommendations.length}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                  Recommendation entries
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-sm leading-7 text-white/65">
                  {activeTheme
                    ? `${activeTheme.relatedEvent ?? activeTheme.title}가 현재 운영 중인 테마로 연결돼 있습니다.`
                    : "Weekly theme, top pick, member cards, and profile setup are now mapped to the current app routes."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex h-16 items-center justify-between rounded-full px-8 transition active:scale-[0.98] ${
                index === 0
                  ? "onochu-glow bg-gradient-to-r from-[#de8eff] to-[#b90afc] text-black"
                  : index === 1
                    ? "onochu-panel text-white"
                    : "onochu-panel-soft text-white"
              }`}
            >
              <div className="flex flex-col">
                <span className="onochu-display text-lg font-bold uppercase tracking-tight">
                  {link.label}
                </span>
                <span className="hidden text-xs text-current/70 sm:block">
                  {link.description}
                </span>
              </div>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                Go
              </span>
            </Link>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="onochu-eyebrow">Featured curation</span>
              <h2 className="onochu-display mt-2 text-4xl font-bold uppercase tracking-tight">
                The Weekly Theme
              </h2>
            </div>
            <span className="text-xs uppercase tracking-[0.24em] text-white/35">
              04 / 12
            </span>
          </div>

          <article className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#131313] p-1">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(222,142,255,0.2),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.84)_100%)]" />
            <div className="relative flex min-h-[28rem] flex-col justify-end rounded-[1.75rem] bg-[linear-gradient(135deg,#151515_0%,#232323_45%,#0e0e0e_100%)] p-8">
              <span className="w-fit rounded-sm border border-[#de8eff]/30 bg-[#de8eff]/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#de8eff]">
                {activeTheme?.phaseLabel ?? "Live Theme"}
              </span>
              <h3 className="onochu-display mt-5 max-w-lg text-5xl font-extrabold uppercase leading-none text-white">
                {activeTheme?.title ?? "THEME IN MOTION"}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
                {activeTheme?.description ??
                  "이번 주 운영 테마와 커뮤니티 큐레이션을 홈에서도 바로 읽을 수 있게 연결합니다."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
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
              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-3">
                  {members.slice(0, 3).map((member, index) => (
                    <div
                      key={member.id}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border border-black text-xs font-bold uppercase text-black ${
                        index === 0
                          ? "bg-[#de8eff]"
                          : index === 1
                            ? "bg-[#f69bf8]"
                            : "bg-[#ff928c]"
                      }`}
                    >
                      {member.nickname.slice(0, 2)}
                    </div>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black bg-[#262626] text-[10px] font-bold text-white/50">
                    +7
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/40">
                  {activeTheme?.participantSummary ?? "members listening"}
                </span>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-5">
          <h3 className="onochu-display flex items-center gap-3 text-xl font-bold uppercase tracking-tight">
            <span className="h-2 w-2 rounded-full bg-[#de8eff]" />
            Today&apos;s Top Pick
          </h3>
          <article className="onochu-panel flex items-center gap-4 rounded-[1.5rem] p-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] text-black">
              <span className="onochu-display text-xs font-bold uppercase leading-tight">
                Top
                <br />
                Pick
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-white">{topPick.trackTitle}</h4>
              <p className="mt-1 text-xs text-white/45">{topPick.artistName}</p>
              <p className="mt-2 text-sm text-white/65">{topPick.comment}</p>
            </div>
            <Link
              href="/recommendations"
              className="rounded-full bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#de8eff]"
            >
              Open
            </Link>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="onochu-display text-2xl font-bold uppercase tracking-tight">
                Featured Members
              </h2>
              <Link
                href="/members"
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#de8eff]"
              >
                View all
              </Link>
            </div>
            <div className="grid gap-4">
              {members.slice(0, 3).map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="onochu-display text-2xl font-bold uppercase tracking-tight">
                Current Feed
              </h2>
              <Link
                href="/recommendations"
                className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#de8eff]"
              >
                Open feed
              </Link>
            </div>
            <div className="grid gap-4">
              {sortedRecommendations.slice(0, 3).map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  compact
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
