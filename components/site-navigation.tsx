"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/recommendations", label: "Recommend" },
  { href: "/profile", label: "Profile" },
  { href: "/profile/edit", label: "Settings" },
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

  if (label === "Recommend") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <circle cx="12" cy="12" r="7" stroke={stroke} strokeWidth="1.9" />
        <circle cx="12" cy="12" r="2.2" fill={active ? "var(--primary-strong)" : "transparent"} stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (label === "Profile") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <circle cx="12" cy="8.5" r="3.2" stroke={stroke} strokeWidth="1.9" />
        <path d="M6.5 18c1.1-2.4 3-3.6 5.5-3.6s4.4 1.2 5.5 3.6" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M12 5.2v2.1M12 16.7v2.1M18.1 12h-2.1M8 12H5.9M16.3 7.7l-1.5 1.5M9.2 14.8l-1.5 1.5M16.3 16.3l-1.5-1.5M9.2 9.2L7.7 7.7" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke={stroke} strokeWidth="1.9" />
    </svg>
  );
}

export function SiteNavigation() {
  const pathname = usePathname();
  const isProfileRoute = pathname === "/profile";
  const isSettingsRoute = pathname === "/profile/edit";
  const isMemberDetailRoute = pathname.startsWith("/members/");
  const isMembersDirectoryRoute = pathname === "/members";
  const isRecommendationsArchiveRoute =
    pathname === "/recommendations" || pathname === "/recommendations/new";
  const hideDesktopNav =
    pathname === "/" ||
    isProfileRoute ||
    isSettingsRoute ||
    isMemberDetailRoute ||
    isMembersDirectoryRoute ||
    isRecommendationsArchiveRoute;
  const hideMobileNav = false;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 px-6 pt-5 ${
          hideDesktopNav ? "hidden" : "hidden md:block"
        }`}
      >
        <div className="onochu-panel mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center rounded-full px-5 py-3 text-stone-100 shadow-2xl shadow-black/20">
          <Link href="/" className="justify-self-start text-xs font-semibold uppercase tracking-[0.24em] text-white/45">
            Taste archive
          </Link>

          <Link href="/" className="justify-self-center">
            <span className="onochu-display text-2xl font-bold uppercase italic tracking-tight text-[var(--paper)] drop-shadow-[0_1px_0_rgba(0,0,0,0.5)]">
              ONOCHU
            </span>
          </Link>

          <nav className="flex items-center justify-self-end rounded-full border border-white/5 bg-black/20 p-1">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/recommendations"
                  ? isRecommendationsArchiveRoute
                  : item.href === "/profile"
                    ? isProfileRoute || isMemberDetailRoute || isMembersDirectoryRoute
                    : item.href === "/profile/edit"
                      ? isSettingsRoute
                      : pathname === item.href;

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
        className={`fixed inset-x-0 bottom-0 z-40 px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden ${
          hideMobileNav ? "hidden" : ""
        }`}
      >
        <div className="mx-auto grid max-w-[21rem] grid-cols-4 border border-[var(--archive-ink)] border-b-4 bg-[rgba(235,230,216,0.96)] px-2 py-2 shadow-[0_10px_24px_rgba(26,24,23,0.12)]">
            {navigationItems.map((item) => {
              const isActive =
                item.href === "/recommendations"
                  ? isRecommendationsArchiveRoute
                  : item.href === "/profile"
                    ? isProfileRoute || isMemberDetailRoute || isMembersDirectoryRoute
                    : item.href === "/profile/edit"
                      ? isSettingsRoute
                      : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-1 text-center font-mono text-[0.66rem] font-semibold uppercase tracking-[0.02em] transition ${
                  isActive
                    ? "text-[var(--primary-strong)]"
                    : "text-[rgba(64,52,44,0.62)]"
                }`}
              >
                <MobileNavIcon label={item.label} active={isActive} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
