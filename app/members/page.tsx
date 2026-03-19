import { MemberDirectoryClient } from "@/components/member-directory-client";
import { PageShell } from "@/components/page-shell";
import { allGenres, members } from "@/lib/mock-data";

export default function MembersPage() {
  const platforms = Array.from(new Set(members.map((member) => member.mainPlatform)));

  return (
    <PageShell
      eyebrow="Members"
      title="Browse the KNU_POW directory through taste, genre, and platform."
      description="닉네임 검색, 장르 태그 필터, 플랫폼 필터를 조합해 다른 동아리원의 음악 취향을 빠르게 좁혀볼 수 있습니다."
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
      <MemberDirectoryClient />
    </PageShell>
  );
}
