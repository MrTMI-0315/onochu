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

function getArtistLikeScore(value: string) {
  let score = 0;

  if (/[a-z][A-Z]/.test(value)) {
    score += 2;
  }

  if (/\b(feat\.|ft\.|x)\b/i.test(value) || /[,&]/.test(value)) {
    score += 1;
  }

  if (value.split(/\s+/).length <= 2) {
    score += 1;
  }

  return score;
}

function getTrackLikeScore(value: string) {
  let score = 0;

  if (/["'“”()[\]]/.test(value)) {
    score += 2;
  }

  if (
    /\b(remix|mix|version|ver\.|ost|theme|live|acoustic|demo|edit|intro|outro|pt\.?|part)\b/i.test(
      value,
    )
  ) {
    score += 2;
  }

  if (value.split(/\s+/).length >= 3) {
    score += 1;
  }

  return score;
}

function parseTrackAndArtist(value: string) {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  const quotedByMatch = normalizedValue.match(
    /^[“"']?(.*?)[”"']?\s+by\s+(.+)$/i,
  );

  if (quotedByMatch?.[1]?.trim() && quotedByMatch?.[2]?.trim()) {
    return {
      trackTitle: quotedByMatch[1].trim(),
      artistName: quotedByMatch[2].trim(),
    };
  }

  const delimiters = [" - ", " – ", " — ", " / "];

  for (const delimiter of delimiters) {
    const [leftSegment, rightSegment, ...rest] = normalizedValue.split(delimiter);

    if (
      rest.length === 0 &&
      leftSegment?.trim().length &&
      rightSegment?.trim().length
    ) {
      const left = leftSegment.trim();
      const right = rightSegment.trim();
      const leftWordCount = left.split(/\s+/).length;
      const rightWordCount = right.split(/\s+/).length;
      const leftArtistLikeScore = getArtistLikeScore(left);
      const rightArtistLikeScore = getArtistLikeScore(right);
      const leftTrackLikeScore = getTrackLikeScore(left);
      const rightTrackLikeScore = getTrackLikeScore(right);

      const shouldFlipArtistAndTrack =
        (leftArtistLikeScore > rightArtistLikeScore &&
          rightTrackLikeScore >= leftTrackLikeScore) ||
        (leftWordCount <= 3 && rightWordCount >= 4);

      return {
        trackTitle: shouldFlipArtistAndTrack ? right : left,
        artistName: shouldFlipArtistAndTrack ? left : right,
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
