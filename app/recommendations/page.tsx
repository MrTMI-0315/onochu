import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { getMemberName, sortedRecommendations } from "@/lib/mock-data";

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
  ).slice(0, 6);

  const topPick = sortedRecommendations[0];

  return (
    <PageShell
      eyebrow="Recommendation Feed"
      title="The feed behind this week's obsession."
      description="곡 링크만 남기지 않고, 누가 왜 추천했는지 읽히는 편집형 피드로 정리했습니다. 멤버 컨텍스트와 mood tag를 한 화면에 묶어 둡니다."
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
              newest-first ordering, member attribution, and weekly curation
              framing are all included in the current MVP feed.
            </p>
          </div>
        </div>
      }
    >
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

      <section className="grid gap-4 lg:grid-cols-2">
        {sortedRecommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            linkToMember
          />
        ))}
      </section>
    </PageShell>
  );
}
