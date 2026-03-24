import { ProfileEditForm } from "@/components/profile-edit-form";
import { PageShell } from "@/components/page-shell";
import { members } from "@/lib/mock-data";

export default function ProfileEditPage() {
  const sampleMember = members[0];

  return (
    <PageShell
      eyebrow="Profile Setup"
      title="Build a taste profile with minimal friction."
      description="닉네임, 플랫폼, 링크 하나를 먼저 채우고 나머지는 천천히 덧붙이는 onboarding 형태로 정리했습니다. 현재 저장은 local mock flow로만 동작합니다."
      aside={
        <div className="space-y-4">
          <div className="rounded-[1.25rem] bg-white/5 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Current scope
            </p>
            <p className="mt-2 text-sm leading-7 text-white/68">
              nickname, bio, genre tags, main platform, playlist links, validation
              feedback
            </p>
          </div>
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
