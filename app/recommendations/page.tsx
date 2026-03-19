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

  return (
    <PageShell
      eyebrow="Recommendations"
      title="Recent recommendations are organized around people, not just links."
      description="누가 어떤 곡을 왜 추천했는지 바로 읽히도록 작성자 컨텍스트와 무드 태그를 같이 배치했습니다. 카드에서 멤버 상세로 다시 이동할 수도 있습니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Feed Stats</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{sortedRecommendations.length} total recommendations</li>
            <li>Newest first ordering</li>
            <li>Member attribution linked</li>
          </ul>
        </div>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Top contributors</h2>
          <div className="mt-4 grid gap-3">
            {topContributors.map(([memberId, count]) => (
              <div
                key={memberId}
                className="rounded-3xl border border-white/10 bg-stone-900/80 p-4"
              >
                <p className="text-sm font-semibold text-white">
                  {getMemberName(memberId)}
                </p>
                <p className="mt-2 text-sm text-stone-300">
                  {count} recommendations in current seed feed
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Mood highlights</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {moodHighlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-cyan-200/10 px-3 py-2 text-xs text-cyan-100"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
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
