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
    <main className="min-h-screen px-4 pb-28 pt-24 text-stone-100 md:px-6 md:pb-12 md:pt-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <section className="onochu-panel relative overflow-hidden rounded-[2rem] p-7 md:grid md:grid-cols-[1.3fr_0.7fr] md:gap-5 md:p-8">
          <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-[color:rgba(213,140,116,0.14)] blur-[100px]" />
          <div className="flex flex-col gap-4">
            <span className="onochu-eyebrow">{eyebrow}</span>
            <div className="flex flex-col gap-3">
              <h1 className="onochu-display text-4xl font-semibold uppercase leading-[0.95] text-white md:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                {description}
              </p>
            </div>
          </div>

          {aside ? (
            <aside className="onochu-panel-soft rounded-[1.75rem] p-5">
              {aside}
            </aside>
          ) : null}
        </section>

        {children}
      </div>
    </main>
  );
}
