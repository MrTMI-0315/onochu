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
    <main className="min-h-screen bg-stone-950 px-6 pb-28 pt-24 text-stone-100 md:pb-10 md:pt-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="grid gap-4 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-[1.3fr_0.7fr]">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-lime-200/20 bg-lime-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-lime-100">
              {eyebrow}
            </span>
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {aside ? (
            <aside className="rounded-[28px] border border-cyan-200/10 bg-cyan-200/5 p-5">
              {aside}
            </aside>
          ) : null}
        </section>

        {children}
      </div>
    </main>
  );
}
