import { ProfileEditForm } from "@/components/profile-edit-form";
import { members } from "@/lib/mock-data";

export default function ProfileEditPage() {
  const sampleMember = members[0];

  return (
    <ProfileEditForm
      initialNickname={sampleMember.nickname}
      initialBio={sampleMember.bio}
      initialFavoriteGenres={sampleMember.favoriteGenres}
      initialMainPlatform={sampleMember.mainPlatform}
      initialPlaylistLinks={sampleMember.playlistLinks.map(
        (playlistLink) => playlistLink.url,
      )}
      mobileStandalone
    />
  );
}
