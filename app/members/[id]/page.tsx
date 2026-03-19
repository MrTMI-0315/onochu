import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getMemberById,
  getRecommendationsByMemberId,
  platformLabels,
  members,
} from "@/lib/mock-data";

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
  const moodHighlights = Array.from(
    new Set(memberRecommendations.flatMap((recommendation) => recommendation.moodTags)),
  ).slice(0, 5);

  return (
    <PageShell
      eyebrow={`Member / ${member.nickname}`}
      title={`${member.nickname}'s taste profile`}
      description={`${member.bio} 이 프로필은 플레이리스트 링크와 추천곡 흐름을 함께 보여주도록 구성했습니다.`}
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Profile Snapshot</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>Main platform: {platformLabels[member.mainPlatform]}</li>
            <li>{member.favoriteGenres.length} favorite genres</li>
            <li>{memberRecommendations.length} linked recommendations</li>
          </ul>
        </div>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Favorite genres
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {member.favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-stone-100/10 px-3 py-1 text-xs text-stone-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Playlist links
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {member.playlistLinks.map((playlistLink) => (
                  <a
                    key={playlistLink.url}
                    href={playlistLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-stone-100 transition hover:border-lime-300 hover:text-lime-200"
                  >
                    {playlistLink.label}
                  </a>
                ))}
              </div>
            </div>

            {moodHighlights.length > 0 ? (
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Recommendation moods
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {moodHighlights.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <Link href="/members" className="text-sm text-lime-200 underline">
              Back to directory
            </Link>
          </div>
        </article>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Member recommendations
            </h2>
            <Link
              href="/recommendations"
              className="text-sm text-lime-200 underline"
            >
              Open full feed
            </Link>
          </div>

          {memberRecommendations.length > 0 ? (
            <div className="grid gap-4">
              {memberRecommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation.id}
                  recommendation={recommendation}
                  linkToMember={false}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-6 text-sm text-stone-400">
              아직 연결된 추천곡이 없습니다.
            </div>
          )}
        </section>
      </section>
    </PageShell>
  );
}
