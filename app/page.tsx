const nextSteps = [
  "MB 03에서 공통 타입과 mock data를 정의합니다.",
  "MB 04에서 랜딩과 공통 네비게이션을 구현합니다.",
  "MB 05부터 멤버 탐색과 추천곡 화면을 연결합니다.",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-10 text-stone-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-lime-300/20 via-stone-900 to-cyan-300/10 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6">
            <span className="w-fit rounded-full border border-lime-200/20 bg-lime-200/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-lime-100">
              MB 02 Scaffold
            </span>
            <div className="flex flex-col gap-3">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Onochu MVP scaffold is ready for feature implementation.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-stone-300 sm:text-base">
                This repository now has a working Next.js App Router baseline
                with TypeScript, Tailwind CSS, and executable development
                commands.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
          <article className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Current Focus</h2>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              The project is still in the setup phase. The next milestone will
              define shared types, mock member data, and required routes from
              the product specification.
            </p>
          </article>

          <article className="rounded-[28px] border border-cyan-200/10 bg-cyan-200/5 p-6">
            <h2 className="text-lg font-semibold text-white">Core Stack</h2>
            <ul className="mt-3 space-y-2 text-sm text-stone-300">
              <li>Next.js App Router</li>
              <li>TypeScript strict mode</li>
              <li>Tailwind CSS</li>
              <li>ESLint with Next rules</li>
            </ul>
          </article>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Next Milestones</h2>
          <ol className="mt-4 grid gap-3 text-sm text-stone-300">
            {nextSteps.map((step) => (
              <li
                key={step}
                className="rounded-2xl border border-white/10 bg-stone-900/80 px-4 py-3 leading-7"
              >
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
