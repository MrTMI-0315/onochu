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

function parseTrackAndArtist(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  const delimiters = [" - ", " – ", " — ", " / "];

  for (const delimiter of delimiters) {
    const [trackTitle, artistName, ...rest] = normalizedValue.split(delimiter);

    if (
      rest.length === 0 &&
      trackTitle?.trim().length &&
      artistName?.trim().length
    ) {
      return {
        trackTitle: trackTitle.trim(),
        artistName: artistName.trim(),
      };
    }
  }

  return null;
}

function toInitialDraft(
  searchParams: Awaited<RecommendationCreatePageProps["searchParams"]>,
): Partial<RecommendationDraftInput> | undefined {
  const explicitTrackTitle = searchParams.trackTitle?.trim() ?? "";
  const explicitArtistName = searchParams.artistName?.trim() ?? "";
  const explicitComment = searchParams.comment?.trim() ?? "";
  const sharedTitle = searchParams.title?.trim() ?? "";
  const sharedText = searchParams.text?.trim() ?? "";
  const parsedFromTitle = parseTrackAndArtist(sharedTitle);
  const parsedFromText = parseTrackAndArtist(sharedText);
  const trackTitle =
    explicitTrackTitle ||
    parsedFromTitle?.trackTitle ||
    parsedFromText?.trackTitle ||
    sharedTitle;
  const artistName =
    explicitArtistName ||
    parsedFromTitle?.artistName ||
    parsedFromText?.artistName ||
    "";
  const url = searchParams.url?.trim() ?? "";
  const comment = explicitComment || (parsedFromText ? "" : sharedText);
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
