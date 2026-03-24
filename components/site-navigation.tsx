"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/members", label: "Members" },
  { href: "/recommendations", label: "Recs" },
  { href: "/profile/edit", label: "My Profile" },
];

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 hidden px-6 pt-5 md:block">
        <div className="onochu-panel mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full px-5 py-3 text-stone-100 shadow-2xl shadow-black/20">
          <Link href="/" className="justify-self-start text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Taste archive
          </Link>

          <Link href="/" className="justify-self-center">
            <span className="onochu-display text-2xl font-bold uppercase italic tracking-tight text-[var(--primary)]">
              ONOCHU
            </span>
          </Link>

          <nav className="flex items-center justify-self-end rounded-full border border-white/5 bg-black/20 p-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-strong)_100%)] text-black"
                      : "text-white/65 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 px-4 py-4 md:hidden">
        <div className="onochu-panel mx-auto grid max-w-md grid-cols-4 gap-2 rounded-[2rem] px-3 py-3">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] transition ${
                  isActive
                    ? "bg-white/8 text-[var(--primary)]"
                    : "bg-transparent text-white/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
