"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const [open, setOpen] = useState(false);

  // Đóng menu khi chuyển trang
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Khi mở: khoá cuộn nền + Esc để đóng + đóng nếu resize lên desktop
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 1280) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-mist bg-paper/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-3 sm:gap-6">
        {/* Wordmark */}
        <Link href="/" aria-label="Anhaus — trang chủ">
          <Logo />
        </Link>

        {/* Primary navigation — chỉ desktop >= 1280 */}
        <nav className="hidden items-center gap-8 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap text-[15px] font-medium transition-colors",
                  active ? "text-charcoal" : "text-graphite hover:text-bronze",
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

        {/* Nhóm phải: CTA + hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/lien-he"
            className="inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-md bg-bronze px-3 text-sm font-semibold text-paper transition-colors hover:bg-bronze-hover sm:px-4"
          >
            Đặt lịch khảo sát
          </Link>

          {/* Hamburger — ẩn ở desktop >= 1280 */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-charcoal transition-colors hover:bg-mist xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Panel menu mobile/tablet */}
      {open && (
        <div className="xl:hidden">
          {/* Nền tối để đóng khi bấm ra ngoài */}
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-16 z-30 cursor-default bg-charcoal/40"
          />
          {/* Panel trắng xổ xuống */}
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-16 z-40 border-b border-mist bg-paper shadow-lg"
          >
            <nav className="container flex flex-col py-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "border-b border-mist py-4 text-base transition-colors",
                      active
                        ? "font-semibold text-charcoal"
                        : "font-medium text-graphite hover:text-bronze",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/lien-he"
                onClick={() => setOpen(false)}
                className="mb-2 mt-4 inline-flex h-12 items-center justify-center rounded-md bg-bronze px-6 text-base font-semibold text-paper transition-colors hover:bg-bronze-hover"
              >
                Đặt lịch khảo sát →
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
