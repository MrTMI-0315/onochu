import Link from "next/link";
import { MemberCard } from "@/components/member-card";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { members, recommendations } from "@/lib/mock-data";

const quickLinks = [
  {
    href: "/members",
    label: "Members",
    description: "동아리원 프로필과 취향을 한 번에 훑어보는 공간",
  },
  {
    href: "/recommendations",
    label: "Recommendations",
    description: "최근 추천곡을 시간 순서대로 둘러보는 피드",
  },
  {
    href: "/profile/edit",
    label: "My Profile",
    description: "내 음악 취향 프로필을 입력하는 작성 화면",
  },
];

export default function HomePage() {
  return (
    <PageShell
      eyebrow="MB 03 Routes"
      title="Onochu now has shared data and all required MVP routes."
      description="문서에만 있던 라우트와 데이터 모델을 실제 코드로 옮겼습니다. 현재 화면은 mock data 기반 skeleton이며, 다음 MB에서 랜딩과 탐색 경험을 더 정교하게 다듬습니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Snapshot</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{members.length} member profiles</li>
            <li>{recommendations.length} recommendations</li>
            <li>App Router routes connected</li>
          </ul>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 transition hover:border-lime-300/30 hover:bg-white/10"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
              Route
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              {link.label}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              {link.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Featured Members</h2>
            <Link href="/members" className="text-sm text-lime-200 underline">
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
            <h2 className="text-xl font-semibold text-white">
              Recent Recommendations
            </h2>
            <Link
              href="/recommendations"
              className="text-sm text-lime-200 underline"
            >
              Open feed
            </Link>
          </div>
          <div className="grid gap-4">
            {recommendations.slice(0, 3).map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                compact
              />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
