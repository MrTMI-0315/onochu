import { NextResponse } from "next/server";
import type { ProfileDraft } from "@/lib/types";

const SERVER_PROFILE_VERSION = 1;

type ServerProfileRecord = {
  version: number;
  ownerBrowserIdentityId: string;
  draft: ProfileDraft;
  updatedAt: string;
};

const profileRecords = new Map<string, ServerProfileRecord>();

function isValidOwner(ownerBrowserIdentityId: unknown): ownerBrowserIdentityId is string {
  return (
    typeof ownerBrowserIdentityId === "string" &&
    ownerBrowserIdentityId.trim().length > 0
  );
}

function isValidProfileDraft(draft: unknown): draft is ProfileDraft {
  if (!draft || typeof draft !== "object") {
    return false;
  }

  const candidate = draft as Partial<ProfileDraft>;

  return (
    typeof candidate.nickname === "string" &&
    typeof candidate.bio === "string" &&
    Array.isArray(candidate.favoriteGenres) &&
    typeof candidate.mainPlatform === "string" &&
    Array.isArray(candidate.playlistLinks) &&
    typeof candidate.updatedAt === "string"
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

  const record = profileRecords.get(ownerBrowserIdentityId);

  if (!record) {
    return NextResponse.json({ record: null, storageKind: "server-session" });
  }

  return NextResponse.json({
    record,
    storageKind: "server-session",
  });
}

export async function PUT(request: Request) {
  const payload = (await request.json()) as Partial<ServerProfileRecord>;

  if (!isValidOwner(payload.ownerBrowserIdentityId)) {
    return NextResponse.json(
      { error: "ownerBrowserIdentityId is required" },
      { status: 400 },
    );
  }

  if (!isValidProfileDraft(payload.draft)) {
    return NextResponse.json(
      { error: "profile draft is invalid" },
      { status: 400 },
    );
  }

  const record: ServerProfileRecord = {
    version: SERVER_PROFILE_VERSION,
    ownerBrowserIdentityId: payload.ownerBrowserIdentityId,
    draft: payload.draft,
    updatedAt: new Date().toISOString(),
  };

  profileRecords.set(payload.ownerBrowserIdentityId, record);

  return NextResponse.json({
    record,
    storageKind: "server-session",
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const ownerBrowserIdentityId = searchParams.get("ownerBrowserIdentityId");

  if (!isValidOwner(ownerBrowserIdentityId)) {
    return NextResponse.json(
      { error: "ownerBrowserIdentityId is required" },
      { status: 400 },
    );
  }

  profileRecords.delete(ownerBrowserIdentityId);

  return NextResponse.json({
    record: null,
    storageKind: "server-session",
  });
}
