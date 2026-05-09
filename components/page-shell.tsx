import type { ReactNode } from "react";

type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  aside?: ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
  aside,
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--paper)] px-6 pb-28 pt-8 text-[var(--archive-ink)] md:px-8 md:pb-16">
      <div className="mx-auto max-w-5xl border-x border-[rgba(26,24,23,0.18)] bg-[var(--archive-bg)]">
        <section className="border-b border-[var(--archive-rule)] px-6 py-6 md:px-8">
          <div className="flex items-start justify-between gap-6">
            <span className="brand-mark block h-8 w-20 bg-[var(--archive-ink)]" aria-hidden="true" />
            <p className="text-right font-mono text-[0.68rem] uppercase leading-[1.35] tracking-[0.08em] text-[var(--archive-muted)]">
              Recovery
              <br />
              Community Archive
            </p>
          </div>
        </section>

        <section className="border-b border-[var(--archive-rule)] px-6 py-12 md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:px-8 md:py-16">
          <div>
            <span className="onochu-eyebrow">{eyebrow}</span>
            <div className="mt-6 flex flex-col gap-4">
              <h1 className="onochu-display max-w-[9ch] text-[clamp(3rem,8vw,5.2rem)] font-extrabold leading-[0.96] tracking-[-0.08em] text-[var(--archive-ink)]">
                {title}
              </h1>
              <p className="max-w-[28rem] text-[1rem] leading-[1.78] text-[var(--archive-muted)]">
                {description}
              </p>
            </div>
          </div>

          {aside ? (
            <aside className="mt-8 border border-[rgba(26,24,23,0.16)] bg-[rgba(241,233,210,0.44)] p-5 md:mt-0">
              {aside}
            </aside>
          ) : null}
        </section>

        <div className="px-6 py-10 md:px-8 md:py-12">{children}</div>
      </div>
    </main>
  );
}
