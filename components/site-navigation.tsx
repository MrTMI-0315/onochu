"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/recommendations", label: "Recs" },
  { href: "/members", label: "Members" },
  { href: "/profile/edit", label: "My Profile" },
];

function MobileNavIcon({ label, active }: { label: string; active: boolean }) {
  const stroke = active ? "var(--primary-strong)" : "rgba(64, 52, 44, 0.55)";

  if (label === "Home") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path d="M4 11.5L12 5l8 6.5" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 10.5v8h9v-8" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (label === "Recs") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <circle cx="12" cy="12" r="7" stroke={stroke} strokeWidth="1.9" />
        <circle cx="12" cy="12" r="2.2" fill={active ? "var(--primary-strong)" : "transparent"} stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (label === "Members") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="5" y="5" width="14" height="14" stroke={stroke} strokeWidth="1.9" />
        <path d="M5 10.5h14M5 15h14" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="8.5" r="3.2" stroke={stroke} strokeWidth="1.9" />
      <path d="M6.5 18c1.1-2.4 3-3.6 5.5-3.6s4.4 1.2 5.5 3.6" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const hideMobileNav =
    pathname === "/" ||
    pathname === "/recommendations/new" ||
    pathname === "/profile/edit";

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

      <nav
        className={`fixed inset-x-0 bottom-0 z-40 px-4 py-4 md:hidden ${
          hideMobileNav ? "hidden" : ""
        }`}
      >
        <div className="mx-auto grid max-w-md grid-cols-4 border-t border-[color:rgba(109,66,60,0.12)] bg-[rgba(255,255,255,0.96)] px-2 py-2 shadow-[0_-6px_24px_rgba(62,52,48,0.05)] backdrop-blur-xl">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-center text-[0.78rem] font-medium transition ${
                  isActive
                    ? "text-[var(--primary-strong)]"
                    : "text-[rgba(64,52,44,0.62)]"
                }`}
              >
                <MobileNavIcon label={item.label} active={isActive} />
                <span>{item.label === "My Profile" ? "Profile" : item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
