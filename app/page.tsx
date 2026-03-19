import Link from "next/link";
import { MemberCard } from "@/components/member-card";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { members, recommendations } from "@/lib/mock-data";

const quickLinks = [
  {
    href: "/members",
    label: "멤버 둘러보기",
    description: "동아리원 프로필과 취향을 태그 중심으로 탐색합니다.",
  },
  {
    href: "/recommendations",
    label: "추천곡 보기",
    description: "최근 추천곡과 코멘트를 시간 순서대로 확인합니다.",
  },
  {
    href: "/profile/edit",
    label: "프로필 만들기",
    description: "내 취향과 플레이리스트 링크를 프로필 형태로 정리합니다.",
  },
];

export default function HomePage() {
  return (
    <PageShell
      eyebrow="Community-first music profile"
      title="오늘의 노래 추천을 사람의 취향 중심으로 다시 정리하는 공간."
      description="Onochu는 KNU_POW 동아리원을 위한 모바일 우선 음악 프로필 웹앱입니다. 쓰는 플랫폼이 달라도, 추천곡과 코멘트, 플레이리스트 링크를 한 곳에서 발견할 수 있게 만드는 것이 목표입니다."
      aside={
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Why Onochu</h2>
          <p className="text-sm leading-7 text-stone-300">
            카카오톡 대화 흐름에 묻히는 추천곡을 프로필과 피드 구조로
            다시 모아, 취향이 보이는 동아리 아카이브를 만듭니다.
          </p>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{members.length} seeded member profiles</li>
            <li>{recommendations.length} seeded recommendations</li>
            <li>mobile-first route flow connected</li>
          </ul>
        </div>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-lime-300/20 via-stone-900 to-cyan-300/10 p-7">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-lime-200/20 bg-lime-200/10 px-3 py-1 text-xs text-lime-100">
                취향 공유
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200">
                추천곡 발견
              </span>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100">
                플랫폼 무관 링크
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                단톡방에서 흘러가던 음악 취향을, 다시 찾을 수 있는 구조로
                바꿉니다.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                프로필, 플레이리스트 링크, 추천 코멘트를 가볍게 입력하고
                다른 동아리원의 취향 흐름을 빠르게 둘러볼 수 있습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-lime-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Core Principles</h2>
          <div className="mt-5 grid gap-3">
            {[
              {
                title: "Community-first",
                body: "플랫폼 통합보다 사람의 취향과 발견 경험을 먼저 보여줍니다.",
              },
              {
                title: "Link-first MVP",
                body: "OAuth 없이도 링크 저장만으로 빠르게 검증 가능한 구조를 택합니다.",
              },
              {
                title: "Low-friction",
                body: "입력 필드를 최소화해 프로필 작성 진입 장벽을 낮춥니다.",
              },
            ].map((principle) => (
              <div
                key={principle.title}
                className="rounded-3xl border border-white/10 bg-stone-900/80 p-4"
              >
                <h3 className="text-sm font-semibold text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <article
            key={link.href}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
              Primary CTA
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              {link.label}
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              {link.description}
            </p>
          </article>
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
