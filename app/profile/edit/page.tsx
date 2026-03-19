import { PageShell } from "@/components/page-shell";
import { members, platformLabels } from "@/lib/mock-data";

export default function ProfileEditPage() {
  const sampleMember = members[0];
  const platformOptions = Object.entries(platformLabels);

  return (
    <PageShell
      eyebrow="Profile Edit"
      title="A form route now exists for profile creation and editing."
      description="MB 03에서는 필수 입력 필드를 가진 form skeleton과 기본 값만 연결합니다. 실제 validation과 저장 상태는 MB 07에서 구현합니다."
      aside={
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Form Scope</h2>
          <ul className="space-y-2 text-sm text-stone-300">
            <li>Nickname and bio</li>
            <li>Genre tags and main platform</li>
            <li>At least one playlist link field</li>
          </ul>
        </div>
      }
    >
      <form className="grid gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 lg:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-stone-200">
          Nickname
          <input
            defaultValue={sampleMember.nickname}
            className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
            name="nickname"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-stone-200">
          Main platform
          <select
            defaultValue={sampleMember.mainPlatform}
            className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
            name="mainPlatform"
          >
            {platformOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm text-stone-200 lg:col-span-2">
          Bio
          <textarea
            defaultValue={sampleMember.bio}
            className="min-h-32 rounded-3xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
            name="bio"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-stone-200 lg:col-span-2">
          Favorite genres
          <input
            defaultValue={sampleMember.favoriteGenres.join(", ")}
            className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
            name="favoriteGenres"
          />
        </label>

        {sampleMember.playlistLinks.map((playlistLink, index) => (
          <label
            key={playlistLink.url}
            className="flex flex-col gap-2 text-sm text-stone-200 lg:col-span-2"
          >
            Playlist link {index + 1}
            <input
              defaultValue={playlistLink.url}
              className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-stone-100 outline-none"
              name={`playlistLink-${index + 1}`}
            />
          </label>
        ))}

        <div className="flex flex-wrap items-center gap-3 lg:col-span-2">
          <button
            type="button"
            className="rounded-full bg-lime-300 px-5 py-3 text-sm font-semibold text-stone-950"
          >
            Save flow in MB 07
          </button>
          <p className="text-sm text-stone-400">
            이 화면은 필수 필드 구조 확인용 skeleton입니다.
          </p>
        </div>
      </form>
    </PageShell>
  );
}
