import Link from "next/link";
import { NAV_ITEMS } from "@/lib/navigation";
import { Logo } from "@/components/Logo";
import { CONTACT } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-charcoal text-paper">
      <div className="container flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Logo inverted />
          <address className="not-italic text-sm leading-relaxed text-silver">
            {CONTACT.address}
            <br />
            <a
              href={CONTACT.phoneTel}
              className="transition-colors hover:text-paper"
            >
              {CONTACT.phoneDisplay}
            </a>
            {" · "}
            <a
              href={CONTACT.zalo}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-paper"
            >
              Zalo
            </a>
            <br />
            <a
              href={CONTACT.emailHref}
              className="transition-colors hover:text-paper"
            >
              {CONTACT.email}
            </a>
            {" · "}
            <a
              href={CONTACT.websiteUrl}
              className="transition-colors hover:text-paper"
            >
              {CONTACT.website}
            </a>
          </address>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-silver transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-graphite">
        <div className="container py-4">
          <p className="text-xs text-silver">
            © {new Date().getFullYear()} Anhaus. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
