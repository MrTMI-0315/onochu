import { getMemberName, platformLabels } from "@/lib/mock-data";
import type { SongRecommendation } from "@/lib/types";

type RecommendationCardProps = {
  recommendation: SongRecommendation;
  compact?: boolean;
};

export function RecommendationCard({
  recommendation,
  compact = false,
}: RecommendationCardProps) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-[28px] border border-white/10 bg-stone-900/80 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
            {getMemberName(recommendation.memberId)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {recommendation.trackTitle}
          </h3>
          <p className="mt-1 text-sm text-stone-300">
            {recommendation.artistName}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-300">
          {platformLabels[recommendation.platform]}
        </span>
      </div>

      <p className="text-sm leading-7 text-stone-300">{recommendation.comment}</p>

      <div className="flex flex-wrap gap-2">
        {recommendation.moodTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-4 pt-2">
        <time className="text-xs text-stone-500">
          {new Date(recommendation.createdAt).toLocaleDateString("ko-KR")}
        </time>
        <a
          href={recommendation.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-stone-100 transition hover:border-lime-300 hover:text-lime-200"
        >
          {compact ? "Open" : "Open track"}
        </a>
      </div>
    </article>
  );
}
