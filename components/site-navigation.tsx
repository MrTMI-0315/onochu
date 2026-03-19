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
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-stone-950/70 px-5 py-3 text-stone-100 shadow-2xl shadow-black/20 backdrop-blur">
          <Link href="/" className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
            <span className="text-sm font-semibold tracking-[0.28em] text-stone-100">
              ONOCHU
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    isActive
                      ? "bg-lime-300 text-stone-950"
                      : "text-stone-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-stone-950/90 px-3 py-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl px-3 py-3 text-center text-xs font-semibold transition ${
                  isActive
                    ? "bg-lime-300 text-stone-950"
                    : "bg-white/5 text-stone-300"
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
