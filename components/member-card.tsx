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
  const trackCount = member.sharedTrackCount ?? sharedTrackCount ?? 0;

  if (mobileSimple) {
    return (
      <article className="border-b border-[rgba(64,52,44,0.18)] px-5 py-8">
        <Link href={`/members/${member.id}`} className="block">
          <div className="border border-[rgba(64,52,44,0.22)] bg-[rgba(255,255,255,0.18)] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[rgba(64,52,44,0.22)] bg-[rgba(64,52,44,0.05)] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.42)]">
                ART
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-[1.55rem] font-bold leading-none tracking-[-0.06em] text-[var(--accent-ink)]">
                      {member.nickname}
                    </h2>
                    <p className="mt-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.58)]">
                      {platformLabels[member.mainPlatform]}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[1rem] leading-8 text-[rgba(64,52,44,0.84)]">
                  {member.mobileTagline ?? member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {member.favoriteGenres.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="border border-[rgba(64,52,44,0.22)] px-2 py-1 text-[0.82rem] text-[rgba(64,52,44,0.76)]"
                    >
                      #{genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-dashed border-[rgba(64,52,44,0.2)] pt-4">
              <div className="flex items-center gap-4 text-[0.96rem] text-[rgba(64,52,44,0.64)]">
                <span className="text-[var(--primary-strong)]">↗</span>
                <span>{trackCount} shared tracks</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="border border-[rgba(64,52,44,0.18)] bg-[rgba(255,255,255,0.12)] p-6 transition duration-200 hover:bg-[rgba(255,255,255,0.2)] focus-within:bg-[rgba(255,255,255,0.2)]">
      <div className="flex items-start gap-5">
        <div className="flex h-18 w-18 shrink-0 items-center justify-center border border-[rgba(64,52,44,0.22)] bg-[rgba(64,52,44,0.05)] font-mono text-[0.74rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.42)] md:h-20 md:w-20">
          ART
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[2rem] font-bold leading-[0.98] tracking-[-0.07em] text-[var(--accent-ink)] md:text-[2.3rem]">
                {member.nickname}
              </h2>
              <p className="mt-2 text-[1rem] leading-7 text-[rgba(64,52,44,0.58)]">
                {platformLabels[member.mainPlatform]}
              </p>
            </div>
            <span className="border border-[rgba(64,52,44,0.18)] bg-[rgba(64,52,44,0.03)] px-3 py-2 font-mono text-[0.74rem] uppercase tracking-[0.08em] text-[rgba(64,52,44,0.5)]">
              REC. {String(trackCount).padStart(3, "0")}
            </span>
          </div>

          <p className="mt-5 max-w-[32rem] text-[1.02rem] leading-8 text-[rgba(64,52,44,0.84)]">
            {member.bio}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {member.favoriteGenres.slice(0, 4).map((genre) => (
              <span
                key={genre}
                className="border border-[rgba(64,52,44,0.22)] px-2 py-1 text-[0.82rem] text-[rgba(64,52,44,0.76)]"
              >
                #{genre}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[rgba(64,52,44,0.2)] pt-4">
            <div className="flex items-center gap-4 text-[0.96rem] text-[rgba(64,52,44,0.64)]">
              <span className="text-[var(--primary-strong)]">↗</span>
              <span>{trackCount} shared tracks</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={member.playlistLinks[0]?.url}
                target="_blank"
                rel="noreferrer"
                className="border border-[rgba(64,52,44,0.22)] px-4 py-3 text-[0.92rem] font-medium text-[var(--accent-ink)]"
              >
                플레이리스트 보기
              </a>
              <Link
                href={`/members/${member.id}`}
                className="flex items-center gap-3 border border-[rgba(64,52,44,0.82)] bg-[var(--accent-ink)] px-4 py-3 text-[0.92rem] font-medium text-[var(--paper)]"
              >
                <span>프로필 보기</span>
                <span className="font-mono text-[1rem]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
