import { NextResponse } from "next/server";
import type {
  RecommendationEngagementState,
  SongRecommendation,
} from "@/lib/types";

const SERVER_RECOMMENDATION_VERSION = 1;

type ServerRecommendationRecord = {
  version: number;
  ownerBrowserIdentityId: string;
  recommendations: SongRecommendation[];
  latestDraft: SongRecommendation | null;
  engagementByRecommendationId: Record<string, RecommendationEngagementState>;
  updatedAt: string;
};

const recommendationRecords = new Map<string, ServerRecommendationRecord>();

function isValidOwner(ownerBrowserIdentityId: unknown): ownerBrowserIdentityId is string {
  return (
    typeof ownerBrowserIdentityId === "string" &&
    ownerBrowserIdentityId.trim().length > 0
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerBrowserIdentityId = searchParams.get("ownerBrowserIdentityId");

  if (!isValidOwner(ownerBrowserIdentityId)) {
    return NextResponse.json(
      { error: "ownerBrowserIdentityId is required" },
      { status: 400 },
    );
  }

  const record = recommendationRecords.get(ownerBrowserIdentityId);

  if (!record) {
    return NextResponse.json(
      { record: null, storageKind: "server-session" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    record,
    storageKind: "server-session",
  });
}

export async function PUT(request: Request) {
  const payload = (await request.json()) as Partial<ServerRecommendationRecord>;

  if (!isValidOwner(payload.ownerBrowserIdentityId)) {
    return NextResponse.json(
      { error: "ownerBrowserIdentityId is required" },
      { status: 400 },
    );
  }

  if (!Array.isArray(payload.recommendations)) {
    return NextResponse.json(
      { error: "recommendations must be an array" },
      { status: 400 },
    );
  }

  const record: ServerRecommendationRecord = {
    version: SERVER_RECOMMENDATION_VERSION,
    ownerBrowserIdentityId: payload.ownerBrowserIdentityId,
    recommendations: payload.recommendations,
    latestDraft: payload.latestDraft ?? null,
    engagementByRecommendationId:
      payload.engagementByRecommendationId &&
      typeof payload.engagementByRecommendationId === "object"
        ? payload.engagementByRecommendationId
        : {},
    updatedAt: new Date().toISOString(),
  };

  recommendationRecords.set(payload.ownerBrowserIdentityId, record);

  return NextResponse.json({
    record,
    storageKind: "server-session",
  });
}
