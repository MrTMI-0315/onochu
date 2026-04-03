import { notFound } from "next/navigation";
import { ArchiveProfileView } from "@/components/archive-profile-view";
import { getMemberById, getRecommendationsByMemberId, members } from "@/lib/mock-data";

type MemberPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return members.map((member) => ({
    id: member.id,
  }));
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const member = getMemberById(id);

  if (!member) {
    notFound();
  }

  const memberRecommendations = getRecommendationsByMemberId(member.id);

  return <ArchiveProfileView member={member} recommendations={memberRecommendations} />;
}
