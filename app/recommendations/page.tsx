import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { recommendations } from "@/lib/mock-data";

export default function RecommendationsPage() {
  return (
    <PageShell
      eyebrow="Recommendations"
      title="Track discovery is now connected to the shared mock feed."
      description="추천곡 피드는 최신순 데이터 렌더링과 카드 구조를 먼저 고정합니다. 이후 MB에서 필터, 시각 밀도, 상호작용을 더 다듬습니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Feed Stats</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{recommendations.length} total recommendations</li>
            <li>Newest first ordering</li>
            <li>Member attribution included</li>
          </ul>
        </div>
      }
    >
      <section className="grid gap-4 lg:grid-cols-2">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </section>
    </PageShell>
  );
}
