import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFoundPage() {
  return (
    <PageShell
      eyebrow="Not Found"
      title="찾으려던 프로필이나 페이지를 아직 불러오지 못했습니다."
      description="잘못된 멤버 링크이거나 현재 seed data에 없는 경로일 수 있습니다. 디렉터리나 추천곡 피드에서 다시 탐색을 이어갈 수 있습니다."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href="/members"
          className="border border-[var(--archive-ink)] bg-[rgba(241,233,210,0.38)] p-6 transition hover:bg-[rgba(26,24,23,0.04)]"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--archive-muted)]">
            Recovery Path
          </p>
          <h2 className="mt-4 text-[1.6rem] font-extrabold leading-none tracking-[-0.05em] text-[var(--archive-ink)]">
            멤버 디렉터리로 돌아가기
          </h2>
          <p className="mt-4 text-[0.95rem] leading-7 text-[var(--archive-muted)]">
            전체 멤버 목록에서 다시 프로필을 찾습니다.
          </p>
        </Link>

        <Link
          href="/recommendations"
          className="border border-[var(--archive-ink)] bg-[rgba(241,233,210,0.38)] p-6 transition hover:bg-[rgba(26,24,23,0.04)]"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--archive-muted)]">
            Recovery Path
          </p>
          <h2 className="mt-4 text-[1.6rem] font-extrabold leading-none tracking-[-0.05em] text-[var(--archive-ink)]">
            추천곡 피드 보기
          </h2>
          <p className="mt-4 text-[0.95rem] leading-7 text-[var(--archive-muted)]">
            추천곡 작성자를 통해 다시 멤버 취향을 탐색할 수 있습니다.
          </p>
        </Link>
      </section>
    </PageShell>
  );
}
