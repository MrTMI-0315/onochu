import { MemberCard } from "@/components/member-card";
import { PageShell } from "@/components/page-shell";
import { allGenres, members, platformLabels } from "@/lib/mock-data";

export default function MembersPage() {
  const platforms = Array.from(new Set(members.map((member) => member.mainPlatform)));

  return (
    <PageShell
      eyebrow="Members"
      title="Browse the KNU_POW directory through taste, genre, and platform."
      description="MB 03에서는 검색과 필터 로직 대신, 이후 구현에 사용할 데이터 구조와 카드 레이아웃을 먼저 고정합니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Directory Stats</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>{members.length} total members</li>
            <li>{allGenres.length} unique genres</li>
            <li>{platforms.length} active platforms</li>
          </ul>
        </div>
      }
    >
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-lg font-semibold text-white">Genres in seed data</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {allGenres.map((genre) => (
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
            <h2 className="text-lg font-semibold text-white">
              Platforms in seed data
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100"
                >
                  {platformLabels[platform]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </section>
    </PageShell>
  );
}
