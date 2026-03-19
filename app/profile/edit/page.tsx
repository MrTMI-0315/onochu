import { ProfileEditForm } from "@/components/profile-edit-form";
import { PageShell } from "@/components/page-shell";
import { members } from "@/lib/mock-data";

export default function ProfileEditPage() {
  const sampleMember = members[0];

  return (
    <PageShell
      eyebrow="Profile Edit"
      title="Create or revise a taste profile with minimal friction."
      description="프로필 작성은 필수값 검증과 링크 형식 검증을 거친 뒤 local mock save flow로 마무리됩니다. MVP 단계에서는 입력 부담을 낮게 유지하는 것이 우선입니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Form Scope</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>Nickname and bio</li>
            <li>Genre tags and main platform</li>
            <li>At least one playlist link field</li>
            <li>Validation and save feedback included</li>
          </ul>
        </div>
      }
    >
      <ProfileEditForm
        initialNickname={sampleMember.nickname}
        initialBio={sampleMember.bio}
        initialFavoriteGenres={sampleMember.favoriteGenres}
        initialMainPlatform={sampleMember.mainPlatform}
        initialPlaylistLinks={sampleMember.playlistLinks.map(
          (playlistLink) => playlistLink.url,
        )}
      />
    </PageShell>
  );
}
