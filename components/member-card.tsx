import Link from "next/link";
import { platformLabels } from "@/lib/mock-data";
import type { MemberProfile } from "@/lib/types";

type MemberCardProps = {
  member: MemberProfile;
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{member.nickname}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-300">{member.bio}</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
          {platformLabels[member.mainPlatform]}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {member.favoriteGenres.map((genre) => (
          <span
            key={genre}
            className="rounded-full bg-stone-100/10 px-3 py-1 text-xs text-stone-200"
          >
            {genre}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        <Link
          href={`/members/${member.id}`}
          className="rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-lime-200"
        >
          View profile
        </Link>
        <a
          href={member.playlistLinks[0]?.url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-stone-300 underline decoration-stone-600 underline-offset-4"
        >
          {member.playlistLinks[0]?.label}
        </a>
      </div>
    </article>
  );
}
