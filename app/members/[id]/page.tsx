import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import {
  getMemberById,
  getRecommendationsByMemberId,
  members,
  platformLabels,
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
  const featuredRecommendation = memberRecommendations[0];
  const moodHighlights = Array.from(
    new Set(memberRecommendations.flatMap((recommendation) => recommendation.moodTags)),
  ).slice(0, 5);
  const totalReactionCount = memberRecommendations.reduce(
    (count, recommendation) => count + recommendation.reactionCount,
    0,
  );
  const totalSaveCount = memberRecommendations.reduce(
    (count, recommendation) => count + recommendation.saveCount,
    0,
  );
  const initials = member.nickname.slice(0, 2).toUpperCase();

  return (
    <PageShell
      eyebrow={`Member / ${member.nickname}`}
      title={`${member.nickname} taste profile`}
      description={`${member.bio} 이 프로필은 추천곡, 반응, 플레이리스트를 한 화면에 모아 대화 시작점을 더 빨리 찾도록 구성했습니다.`}
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Main platform
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {platformLabels[member.mainPlatform]}
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Recommendation count
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {memberRecommendations.length}
            </p>
          </div>
          {featuredRecommendation ? (
            <div className="rounded-[1.25rem] bg-white/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Start with
              </p>
              <p className="mt-2 text-base font-semibold text-white">
                {featuredRecommendation.trackTitle}
              </p>
              <p className="mt-2 text-sm leading-7 text-white/62">
                {featuredRecommendation.artistName} · {featuredRecommendation.comment}
              </p>
            </div>
          ) : null}
        </div>
      }
    >
      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="onochu-panel rounded-[2rem] p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#1f1f1f] bg-[radial-gradient(circle_at_top,#de8eff_0%,#b90afc_55%,#171717_100%)] text-2xl font-bold uppercase text-black shadow-[0_0_34px_rgba(188,19,254,0.25)]">
                {initials}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="onochu-display text-4xl font-bold uppercase text-white md:text-5xl">
                      {member.nickname}
                    </h2>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/35">
                      Curator / KNU_POW
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={member.playlistLinks[0]?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-[linear-gradient(135deg,#de8eff_0%,#b90afc_100%)] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black"
                    >
                      Open playlist
                    </a>
                    <Link
                      href="/recommendations/new"
                      className="rounded-full border border-white/10 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75 transition hover:border-[#de8eff]/30 hover:text-white"
                    >
                      Reply with your pick
                    </Link>
                  </div>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
                  {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-[#de8eff]/20 bg-[#de8eff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]">
                    {platformLabels[member.mainPlatform]}
                  </span>
                  {member.favoriteGenres.slice(0, 2).map((genre) => (
                    <span
                      key={genre}
                      className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-black/20 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                    Why start here
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/68">
                    이 프로필은 최근 추천, mood 태그, 반응 수를 함께 보여 줘서
                    {member.nickname}의 취향이 어떤 곡에서 커뮤니티 반응으로 이어졌는지 바로
                    읽을 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.25rem] bg-white/4 p-4 text-center">
                <p className="text-3xl font-bold text-white">
                  {memberRecommendations.length}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Recs posted
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/4 p-4 text-center">
                <p className="text-3xl font-bold text-[#ffb59d]">
                  {totalReactionCount}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Reactions earned
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/4 p-4 text-center">
                <p className="text-3xl font-bold text-[#de8eff]">
                  {totalSaveCount}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Saves earned
                </p>
              </div>
              <div className="rounded-[1.25rem] bg-white/4 p-4 text-center">
                <p className="text-3xl font-bold text-white">
                  {member.playlistLinks.length}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Playlist links
                </p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Favorite genres
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {member.favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                Playlist links
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {member.playlistLinks.map((playlistLink) => (
                  <a
                    key={playlistLink.url}
                    href={playlistLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.25rem] border border-white/8 bg-black/20 px-4 py-4 text-sm text-white/78 transition hover:border-[#de8eff]/30 hover:text-white"
                  >
                    {playlistLink.label}
                  </a>
                ))}
              </div>
            </div>

            {moodHighlights.length > 0 ? (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Mood highlights
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {moodHighlights.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-[#de8eff]/20 bg-[#de8eff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#de8eff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {memberRecommendations.length > 0 ? (
              <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Community signal
                </p>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  최근 추천 {memberRecommendations.length}개가 합쳐서 반응 {totalReactionCount}
                  회, 저장 {totalSaveCount}회를 만들었습니다. 취향이 실제 상호작용으로
                  이어지는지 보는 기준점으로 사용합니다.
                </p>
              </div>
            ) : null}

            {featuredRecommendation ? (
              <div className="rounded-[1.5rem] border border-[#de8eff]/16 bg-[#de8eff]/7 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#de8eff]">
                  Conversation starter
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  {featuredRecommendation.trackTitle} · {featuredRecommendation.artistName}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  &ldquo;{featuredRecommendation.comment}&rdquo;에서 시작하면
                  {member.nickname}가 지금 어떤 mood로 추천하는지 가장 빨리 파악할 수 있습니다.
                </p>
              </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-4 border-t border-white/6 pt-4">
              <Link
                href="/members"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/55"
              >
                Back to directory
              </Link>
              <Link
                href="/recommendations"
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#de8eff]"
              >
                Open full feed
              </Link>
            </div>
          </div>
        </article>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="onochu-display text-2xl font-bold uppercase tracking-tight text-white">
                Recent Recommendations
              </h2>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/38">
                start with the reason, then follow the person
              </p>
            </div>
            <Link
              href="/recommendations"
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#de8eff]"
            >
              View archive
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
            <div className="onochu-panel rounded-[2rem] p-6 text-sm text-white/55">
              아직 연결된 추천곡이 없습니다.
            </div>
          )}
        </section>
      </section>
    </PageShell>
  );
}
