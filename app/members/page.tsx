import { MemberDirectoryClient } from "@/components/member-directory-client";
import { PageShell } from "@/components/page-shell";
import { allGenres, members } from "@/lib/mock-data";

export default function MembersPage() {
  const platforms = Array.from(new Set(members.map((member) => member.mainPlatform)));

  return (
    <PageShell
      eyebrow="Club Directory"
      title={`${members.length} members in the taste archive.`}
      description="닉네임, 장르, 플랫폼 축으로 탐색 흐름을 나눠서 KNU_POW 안의 취향 네트워크를 빠르게 훑을 수 있게 구성했습니다."
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-3xl font-bold text-white">{members.length}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Total members
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-3xl font-bold text-white">{allGenres.length}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Genre clusters
            </p>
          </div>
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-3xl font-bold text-white">{platforms.length}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Active platforms
            </p>
          </div>
        </div>
      }
    >
      <MemberDirectoryClient />
    </PageShell>
  );
}
