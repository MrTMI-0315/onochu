import Link from "next/link";
import { platformLabels } from "@/lib/mock-data";
import type { MemberProfile } from "@/lib/types";

type MemberCardProps = {
  member: MemberProfile;
  mobileSimple?: boolean;
  sharedTrackCount?: number;
};

export function MemberCard({
  member,
  mobileSimple = false,
  sharedTrackCount,
}: MemberCardProps) {
  const initials = member.nickname.slice(0, mobileSimple ? 1 : 2).toUpperCase();

  if (mobileSimple) {
    return (
      <article className="mobile-card rounded-[0.2rem] p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.14rem] border border-[rgba(109,66,60,0.12)] bg-[rgba(241,233,210,0.72)] text-sm font-semibold text-[var(--primary-strong)]">
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate text-[1.05rem] font-semibold text-[var(--accent-ink)]">
                  {member.nickname}
                </h2>
              </div>
              <span className="rounded-[0.18rem] border border-[rgba(109,66,60,0.12)] bg-white px-3 py-1.5 text-[0.9rem] font-medium text-[rgba(64,52,44,0.66)]">
                {platformLabels[member.mainPlatform]}
              </span>
            </div>

            <p className="mt-2 max-w-[16rem] text-[1.02rem] font-medium leading-8 text-[rgba(64,52,44,0.78)]">
              {member.mobileTagline ?? member.bio}
            </p>

            <p className="mt-3 text-[1rem] text-[rgba(64,52,44,0.58)]">
              {member.favoriteGenres.slice(0, 3).join(" · ")}
            </p>
          </div>
        </div>

        <div className="mobile-section-rule mt-5 pt-4">
          <p className="text-[1rem] font-semibold text-[rgba(64,52,44,0.72)]">
            {member.sharedTrackCount ?? sharedTrackCount ?? 0} shared tracks
          </p>
        </div>
      </article>
    );
  }

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
