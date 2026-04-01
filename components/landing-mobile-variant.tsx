import Image from "next/image";
import Link from "next/link";

const problemItems = [
  { num: "01", text: "단톡방에서 좋았던 추천도 금방 묻힙니다." },
  { num: "02", text: "다른 플랫폼 링크는 바로 들을 수 없어 흐름이 끊깁니다." },
  {
    num: "03",
    text: "누가 왜 이 곡을 추천했는지 보이지 않아, 추천이 대화로 이어지지 않습니다.",
  },
];

const howItWorksItems = [
  { num: "01", text: "내 주 사용 플랫폼을 설정합니다." },
  {
    num: "02",
    text: "멤버들이 남긴 추천을 내 플랫폼에서 바로 듣고, 그 사람의 취향까지 이어서 볼 수 있습니다.",
  },
];

type SectionHeaderProps = {
  num: string;
  label: string;
};

function SectionHeader({ num, label }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--primary-strong)]">
      <span className="font-mono">{num}</span>
      <span className="h-px w-10 bg-[var(--primary-strong)]" />
      <span>{label}</span>
    </div>
  );
}

type NumberedListProps = {
  items: { num: string; text: string }[];
};

function NumberedList({ items }: NumberedListProps) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => (
        <div key={item.num} className="flex items-start gap-4">
          <div className="min-w-6 font-mono text-[0.72rem] text-[var(--primary-strong)]">
            {item.num}
          </div>
          <p className="text-[1rem] leading-[1.65] text-[rgba(26,24,23,0.9)]">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

function CTAButton({
  href,
  label,
  kind,
}: {
  href: string;
  label: string;
  kind: "primary" | "secondary";
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between border px-5 py-[1.1rem] text-[0.95rem] font-semibold transition ${
        kind === "primary"
          ? "border-[#1A1817] bg-[#1A1817] text-[#EBE6D8]"
          : "border-[#1A1817] border-b-4 bg-[#EBE6D8] text-[#1A1817]"
      }`}
    >
      <span>{label}</span>
      <span className="font-mono text-[1rem]">
        {kind === "primary" ? "→" : "↘"}
      </span>
    </Link>
  );
}

function LandingSection({
  num,
  label,
  title,
  children,
}: {
  num: string;
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#1A1817] bg-[#EBE6D8]">
      <div className="px-6 py-10">
        <SectionHeader num={num} label={label} />
        {title ? (
          <h2 className="mb-8 max-w-[11ch] text-[clamp(1.95rem,8vw,3rem)] font-extrabold leading-[1.12] tracking-[-0.05em] text-[#1A1817]">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function LandingMobileVariant() {
  return (
    <div className="relative min-h-screen bg-[#EBE6D8] text-[#1A1817]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(26, 24, 23, 0.04) 1px, transparent 1px)",
          backgroundSize: "8px 100%",
        }}
      />

      <header className="flex items-start justify-between border-b border-[#1A1817] px-6 py-6">
        <div className="bg-[#1A1817] px-2 py-1 font-mono text-[0.82rem] font-bold uppercase tracking-[0.1em] text-[#EBE6D8]">
          ONOCHU
        </div>
        <div className="text-right font-mono text-[0.68rem] leading-tight text-[#1A1817]">
          MOBILE EDITION
          <br />
          COMMUNITY ARCHIVE
        </div>
      </header>

      <main className="bg-[#EBE6D8]">
        <section className="border-b border-[#1A1817] px-6 py-10">
          <div className="mb-4 flex items-center gap-2 font-mono text-[0.72rem] text-[var(--primary-strong)]">
            <span className="inline-block h-px w-8 bg-[var(--primary-strong)]" />
            취향이 잔향이 되는 곳, Onochu
          </div>

          <h1 className="max-w-[7.2ch] text-[clamp(3rem,13vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.07em] text-[#1A1817]">
            추천곡이
            <br />
            채팅에서
            <br />
            사라지지
            <br />
            않도록
          </h1>

          <p className="mt-6 max-w-[18rem] text-[1rem] leading-[1.7] text-[#8C867A]">
            플랫폼이 달라도, 추천곡을 이어 듣고 그 음악을 좋아한 사람까지
            발견할 수 있습니다.
          </p>
        </section>

        <section className="relative h-[25rem] overflow-hidden border-b border-[#1A1817] bg-[#D9D2C5]">
          <div className="absolute left-6 top-6 z-10 bg-[#1A1817] px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[#EBE6D8]">
            Archive No. 402 / Taste Trace
          </div>

          <div className="relative h-full w-full">
            <Image
              src="/landing-hero-art.png"
              alt="Onochu landing hero artwork"
              fill
              priority
              sizes="100vw"
              className="object-contain p-8"
              style={{
                filter: "sepia(0.16) contrast(1.08) brightness(0.92)",
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <div className="absolute bottom-6 right-6 flex flex-col gap-1">
            <div className="ml-auto h-3 w-[1.9rem] border border-[#1A1817] border-t-[3px] border-t-[var(--primary-strong)] bg-[#EBE6D8]" />
            <div className="h-3 w-10 border border-[#1A1817] bg-[#EBE6D8]" />
            <div className="h-3 w-10 border border-[#1A1817] bg-[#EBE6D8]" />
          </div>
        </section>

        <section className="flex flex-col gap-3 px-6 py-6">
          <CTAButton
            href="/recommendations"
            label="추천곡 둘러보기"
            kind="primary"
          />
          <CTAButton
            href="/members"
            label="취향 맞는 멤버 찾기"
            kind="secondary"
          />
        </section>

        <section className="grid grid-cols-2 gap-6 border-y border-[#1A1817] px-6 py-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8C867A]">
              Curated by
            </span>
            <span className="text-[0.9rem] font-semibold text-[#1A1817]">
              Community archive
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#8C867A]">
              Listening mode
            </span>
            <span className="text-[0.9rem] font-semibold text-[#1A1817]">
              Cross-platform ready
            </span>
          </div>
        </section>

        <LandingSection
          num="02"
          label="Problem"
          title="사람들이 자주 겪는 문제"
        >
          <NumberedList items={problemItems} />
        </LandingSection>

        <LandingSection
          num="03"
          label="How It Works"
          title="Onochu는 이렇게 작동합니다"
        >
          <NumberedList items={howItWorksItems} />
        </LandingSection>

        <LandingSection
          num="04"
          label="Why Onochu Feels Different"
          title="Onochu가 다른 이유"
        >
          <div className="flex flex-col gap-5">
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              Onochu는 흘러가버릴 링크만 남기는 곳이 아닙니다.
            </p>
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              누가 왜 이 곡을 추천했는지도 함께 남겨, 스쳐 지나갈 추천이
              다시 대화로 이어지게 만듭니다.
            </p>
          </div>
        </LandingSection>

        <LandingSection num="05" label="Recommendation & Playlist Sharing">
          <div className="flex flex-col gap-5">
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              한 곡 추천에는 그때의 기분과 취향이 담깁니다.
            </p>
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              플레이리스트에는 그 사람이 어떤 음악을 좋아하는지가 더 잘
              보입니다.
            </p>
          </div>
        </LandingSection>

        <LandingSection num="06" label="Where It Works Best">
          <div className="flex flex-col gap-5">
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              동아리, 소모임, 학내 커뮤니티, 크루처럼
            </p>
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              서로를 알아가야 하는 모임일수록, 취향은 가장 자연스러운 시작점이
              됩니다.
            </p>
          </div>
        </LandingSection>

        <LandingSection
          num="07"
          label="Final CTA"
          title="좋아하는 음악으로 먼저 말을 걸어보세요"
        >
          <div className="mb-10 flex flex-col gap-5">
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              처음부터 길게 소개하지 않아도 됩니다.
            </p>
            <p className="text-[1rem] leading-[1.7] text-[#1A1817]">
              추천곡 하나, 플레이리스트 하나로 대화를 시작해보세요.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <CTAButton
              href="/recommendations/new"
              label="첫 추천 남기기"
              kind="primary"
            />
            <CTAButton
              href="/recommendations"
              label="추천곡 둘러보기"
              kind="secondary"
            />
          </div>
        </LandingSection>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 h-1.5 bg-[var(--primary-strong)] md:hidden" />
    </div>
  );
}
