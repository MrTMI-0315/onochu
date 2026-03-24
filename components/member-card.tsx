import Link from "next/link";
import { platformLabels } from "@/lib/mock-data";
import type { MemberProfile } from "@/lib/types";

type MemberCardProps = {
  member: MemberProfile;
};

export function MemberCard({ member }: MemberCardProps) {
  const initials = member.nickname.slice(0, 2).toUpperCase();

  return (
    <article className="group onochu-panel flex h-full flex-col gap-5 rounded-[1.75rem] p-5 transition duration-300 hover:bg-white/[0.06]">
      <div className="flex items-start gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[color:rgba(212,202,176,0.2)] bg-[radial-gradient(circle_at_top,var(--paper)_0%,var(--primary)_48%,#1f1713_100%)] text-lg font-bold uppercase text-black shadow-[0_0_30px_rgba(183,106,85,0.2)]">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="onochu-display text-2xl font-bold uppercase text-white">
                {member.nickname}
              </h2>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/35">
                Taste archive entry
              </p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              {platformLabels[member.mainPlatform]}
            </span>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/68">{member.bio}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {member.favoriteGenres.map((genre) => (
          <span
            key={genre}
            className="rounded-sm border border-white/8 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
          >
            {genre}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/6 pt-4">
        <a
          href={member.playlistLinks[0]?.url}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45 transition hover:text-white"
        >
          {member.playlistLinks[0]?.label}
        </a>
        <Link
          href={`/members/${member.id}`}
          className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--primary)] transition group-hover:translate-x-0.5"
        >
          View Studio
        </Link>
      </div>
    </article>
  );
}
