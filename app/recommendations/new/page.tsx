import { RecommendationCreateRoute } from "@/components/recommendation-create-route";
import { members, sortedRecommendations } from "@/lib/mock-data";

export default function RecommendationCreatePage() {
  return (
    <RecommendationCreateRoute
      currentMember={members[0]}
      initialRecommendations={sortedRecommendations}
    />
  );
}
