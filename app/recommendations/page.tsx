import { RecommendationStudio } from "@/components/recommendation-studio";
import { members, sortedRecommendations } from "@/lib/mock-data";

export default function RecommendationsPage() {
  return (
    <RecommendationStudio
      allMembers={members}
      currentMember={members[0]}
      initialRecommendations={sortedRecommendations}
    />
  );
}
