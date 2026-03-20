import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { RecommendationStudio } from "@/components/recommendation-studio";
import { getMemberName, members, sortedRecommendations } from "@/lib/mock-data";

const weeklyTheme = {
  label: "Current Theme",
  title: "90s NYC BOOM BAP",
  description:
    "Gritty drums, dusty samples, and the pulse of the underground. 이번 주 큐레이션은 클래식 붐뱁의 질감과 거리의 공기를 다시 꺼내는 데 집중합니다.",
};

const themeModules = [
  {
    title: "Classic Crates Vol. 1",
    subtitle: "Staff Pick",
    meta: "120 tracks",
    tone:
      "col-span-2 row-span-2 min-h-[18rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.8)_100%),linear-gradient(135deg,#4f1f65_0%,#1d1d1d_50%,#0f0f0f_100%)]",
  },
  {
    title: "MPC Essentials",
    subtitle: "Technique & Gear",
    meta: "Beat craft",
    tone: "bg-white/4",
  },
  {
    title: "Bronx Origins",
    subtitle: "Map Location",
    meta: "Street context",
    tone: "bg-white/4",
  },
];

export default function RecommendationsPage() {
  const contributorCounts = sortedRecommendations.reduce<Record<string, number>>(
    (counts, recommendation) => {
      counts[recommendation.memberId] = (counts[recommendation.memberId] ?? 0) + 1;
      return counts;
    },
    {},
  );

  const topContributors = Object.entries(contributorCounts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3);

  const moodHighlights = Array.from(
    new Set(sortedRecommendations.flatMap((recommendation) => recommendation.moodTags)),
  ).slice(0, 8);

  const topPick = sortedRecommendations[0];
  const currentMember = members[0];

  return (
    <PageShell
      eyebrow="Recommendation Feed"
      title="The feed behind this week's obsession."
      description="weekly theme, editorial picks, contributor context, 그리고 local mock composer까지 하나의 recommendation surface 안에 묶었습니다."
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-3xl font-bold text-white">
              {sortedRecommendations.length}
            </p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Total recs
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-sm leading-7 text-white/65">
              compose flow는 local mock save만 수행하고, 피드는 기존 seeded
              recommendation을 기준으로 렌더링합니다.
            </p>
          </div>
        </div>
      }
    >
      <section className="relative overflow-hidden rounded-[2rem] border border-white/6 bg-[#131313] p-4 md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(222,142,255,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
        <div className="relative flex min-h-[22rem] flex-col justify-end rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.84)_100%),linear-gradient(135deg,#44344e_0%,#1a1a1a_45%,#101010_100%)] p-6 md:min-h-[26rem] md:p-8">
          <span className="w-fit rounded-sm bg-[#de8eff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-black">
            {weeklyTheme.label}
          </span>
          <h2 className="onochu-display mt-4 max-w-2xl text-4xl font-bold uppercase leading-[0.92] text-white md:text-6xl">
            {weeklyTheme.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
            {weeklyTheme.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#compose-panel"
              className="rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
            >
              Contribute to theme
            </a>
            <Link
              href="#theme-selects"
              className="rounded-full border border-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70"
            >
              View selects
            </Link>
          </div>
        </div>
      </section>

      <section id="theme-selects" className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="onochu-display text-2xl font-bold uppercase text-white md:text-3xl">
              Theme Selects
            </h2>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
              Curated for this week
            </p>
          </div>
          <a
            href="#feed-start"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45"
          >
            View all
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {themeModules.map((module, index) => (
            <article
              key={module.title}
              className={`overflow-hidden rounded-[1.5rem] border border-white/6 p-4 ${
                module.tone
              } ${index === 0 ? "" : "aspect-square"}`}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-[#de8eff]">
                  {index === 0 ? ">" : index === 1 ? "M" : "B"}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
                    {module.subtitle}
                  </p>
                  <h3 className="onochu-display mt-2 text-lg font-bold uppercase text-white">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-white/45">
                    {module.meta}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <article className="col-span-2 flex items-center gap-4 rounded-[1.5rem] border border-white/6 bg-[linear-gradient(90deg,rgba(222,142,255,0.12),rgba(255,255,255,0.01))] p-4">
            <div className="flex -space-x-2">
              {members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] text-[10px] font-bold uppercase text-black"
                >
                  {member.nickname.slice(0, 2)}
                </div>
              ))}
            </div>
            <p className="text-sm text-white">
              <span className="font-bold">42 members</span> currently
              contributing
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="relative overflow-hidden rounded-[2rem] border border-white/6 bg-[#131313] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(222,142,255,0.18),transparent_38%)]" />
          <div className="relative flex h-full flex-col gap-5">
            <span className="onochu-eyebrow">Top editorial pick</span>
            <div>
              <h2 className="onochu-display text-4xl font-bold uppercase text-white">
                {topPick.trackTitle}
              </h2>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/40">
                {topPick.artistName}
              </p>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/68">
              &ldquo;{topPick.comment}&rdquo;
            </p>
            <div className="flex flex-wrap gap-2">
              {topPick.moodTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-[#de8eff]/20 bg-[#de8eff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <div className="grid gap-4">
          <article className="onochu-panel rounded-[1.75rem] p-5">
            <h2 className="onochu-display text-2xl font-bold uppercase text-white">
              Top contributors
            </h2>
            <div className="mt-4 grid gap-3">
              {topContributors.map(([memberId, count]) => (
                <div
                  key={memberId}
                  className="rounded-[1.25rem] bg-white/4 p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {getMemberName(memberId)}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {count} recs in the feed
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="onochu-panel rounded-[1.75rem] p-5">
            <h2 className="onochu-display text-2xl font-bold uppercase text-white">
              Mood highlights
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {moodHighlights.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-white/8 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <RecommendationStudio
        currentMember={currentMember}
        initialRecommendations={sortedRecommendations}
        moodSuggestions={moodHighlights}
      />

      <section className="onochu-panel rounded-[2rem] p-8 text-center">
        <h2 className="onochu-display text-3xl font-bold uppercase text-white">
          Shape The Vibe
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/62">
          이번 weekly theme를 정의하는 트랙이나 이야기가 있다면 compose panel에
          남겨 두고 다음 iteration에서 실제 persistence로 이어갈 수 있습니다.
        </p>
        <a
          href="#compose-panel"
          className="onochu-glow mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
        >
          Contribute to theme
        </a>
      </section>

    </PageShell>
  );
}
