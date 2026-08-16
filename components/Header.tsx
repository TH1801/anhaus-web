"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/navigation";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  const p = pathname.replace(/\/+$/, "") || "/";
  const h = href.replace(/\/+$/, "") || "/";
  return p === h;
}

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-mist bg-paper/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        {/* Wordmark */}
        <Link href="/" aria-label="Anhaus — trang chủ">
          <Logo />
        </Link>

        {/* Primary navigation */}
        <nav className="hidden items-center gap-4 md:flex lg:gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap text-sm font-medium transition-colors",
                  active
                    ? "text-charcoal"
                    : "text-graphite hover:text-bronze",
                )}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-[3px]"
                  >
                    <span className="h-0.5 w-2 rounded-full bg-bronze" />
                    <span className="h-0.5 w-2 rounded-full bg-gold" />
                    <span className="h-0.5 w-2 rounded-full bg-silver" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA (chrome cố định toàn site) */}
        <Link
          href="/lien-he"
          className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-bronze px-4 text-sm font-semibold text-paper transition-colors hover:bg-bronze-hover"
        >
          Đặt lịch khảo sát
        </Link>
      </div>
    </header>
  );
}
