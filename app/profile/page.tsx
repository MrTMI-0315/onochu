import { ArchiveProfileView } from "@/components/archive-profile-view";
import { getRecommendationsByMemberId, members } from "@/lib/mock-data";

export default function ProfilePage() {
  const currentMember = members[0];
  const recommendations = getRecommendationsByMemberId(currentMember.id);

  return (
    <ArchiveProfileView
      member={currentMember}
      recommendations={recommendations}
      selfView
      useStoredProfile
    />
  );
}
