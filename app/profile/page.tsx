import Link from "next/link";
import { ArchiveProfileView } from "@/components/archive-profile-view";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getRecommendationsByMemberId,
  members,
  platformLabels,
} from "@/lib/mock-data";

export default function ProfilePage() {
  const currentMember = members[0];
  const recommendations = getRecommendationsByMemberId(currentMember.id);

  return (
    <>
      <div className="md:hidden">
        <ArchiveProfileView
          member={currentMember}
          recommendations={recommendations}
          selfView
          useStoredProfile
        />
      </div>

      <div className="hidden md:block">
        <PageShell
          eyebrow="My Profile"
          title="Keep your taste archive visible."
          description="현재 프로필은 local draft 흐름과 연결되어 있고, 추천 피드와 멤버 탐색의 시작점이 되는 정보만 먼저 보여줍니다."
          aside={
            <div className="space-y-4">
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Main platform
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {platformLabels[currentMember.mainPlatform]}
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/5 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Archive count
                </p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {recommendations.length}
                </p>
              </div>
            </div>
          }
        >
          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <article className="onochu-panel rounded-[2rem] p-6">
              <div className="flex h-full flex-col gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                    Current archive
                  </p>
                  <h2 className="mt-4 text-4xl font-bold uppercase text-white">
                    {currentMember.nickname}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/68">
                    {currentMember.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentMember.favoriteGenres.map((genre) => (
                    <span
                      key={genre}
                      className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <Link
                    href="/profile/edit"
                    className="flex items-center justify-between rounded-[1rem] border border-[rgba(213,140,116,0.2)] bg-[rgba(213,140,116,0.08)] px-4 py-4 text-sm font-semibold text-white"
                  >
                    <span>Open profile editor</span>
                    <span className="font-mono">→</span>
                  </Link>
                  <a
                    href={currentMember.playlistLinks[0]?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1rem] border border-white/10 bg-white/4 px-4 py-4 text-sm font-semibold text-white/76"
                  >
                    <span>Open playlist</span>
                    <span className="font-mono">↘</span>
                  </a>
                </div>
              </div>
            </article>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white">
                    My Recent Recs
                  </h2>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">
                    archive follows what you leave behind
                  </p>
                </div>
                <Link
                  href="/recommendations"
                  className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--primary)]"
                >
                  View feed
                </Link>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid gap-4">
                  {recommendations.map((recommendation) => (
                    <RecommendationCard
                      key={recommendation.id}
                      recommendation={recommendation}
                      linkToMember={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="onochu-panel rounded-[2rem] p-6 text-sm text-white/55">
                  아직 남겨진 추천이 없습니다.
                </div>
              )}
            </section>
          </section>
        </PageShell>
      </div>
    </>
  );
}
