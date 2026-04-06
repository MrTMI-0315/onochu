import { RecommendationCreateRoute } from "@/components/recommendation-create-route";
import { members, sortedRecommendations } from "@/lib/mock-data";
import type { MusicPlatform, RecommendationDraftInput } from "@/lib/types";

type RecommendationCreatePageProps = {
  searchParams: Promise<{
    trackTitle?: string;
    artistName?: string;
    platform?: string;
    url?: string;
    comment?: string;
    title?: string;
    text?: string;
  }>;
};

const allowedPlatforms: MusicPlatform[] = [
  "spotify",
  "apple_music",
  "youtube_music",
  "melon",
  "soundcloud",
  "other",
];

function toInitialDraft(
  searchParams: Awaited<RecommendationCreatePageProps["searchParams"]>,
): Partial<RecommendationDraftInput> | undefined {
  const sharedTitle = searchParams.title?.trim() ?? "";
  const sharedText = searchParams.text?.trim() ?? "";
  const trackTitle = searchParams.trackTitle?.trim() || sharedTitle;
  const artistName = searchParams.artistName?.trim() ?? "";
  const url = searchParams.url?.trim() ?? "";
  const comment = searchParams.comment?.trim() || sharedText;
  const platform = allowedPlatforms.includes(searchParams.platform as MusicPlatform)
    ? (searchParams.platform as MusicPlatform)
    : undefined;

  if (!trackTitle && !artistName && !url && !comment && !platform) {
    return undefined;
  }

  return {
    trackTitle,
    artistName,
    url,
    comment,
    platform,
    moodTags: [],
  };
}

export default async function RecommendationCreatePage({
  searchParams,
}: RecommendationCreatePageProps) {
  const resolvedSearchParams = await searchParams;
  const initialDraft = toInitialDraft(resolvedSearchParams);

  return (
    <RecommendationCreateRoute
      currentMember={members[0]}
      initialRecommendations={sortedRecommendations}
      initialDraft={initialDraft}
    />
  );
}
