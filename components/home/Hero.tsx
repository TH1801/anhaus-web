import Link from "next/link";
import { findRender } from "@/lib/renders";
import { SkeletonImage } from "@/components/SkeletonImage";

const heroRender = findRender({
  style: "indochine",
  room: "phong-khach",
  tier: "cao",
});

export function Hero() {
  return (
    <section className="container grid items-center gap-10 py-12 md:grid-cols-[55fr_45fr] md:py-16">
      {/* Left column */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          NỘI THẤT TRỌN GÓI · THIẾT KẾ – THI CÔNG – CẢI TẠO
        </p>

        <h1 className="mt-5 text-4xl font-bold leading-[1.1] text-charcoal md:text-5xl lg:text-6xl">
          Không gian đẹp, vật liệu thật, bàn giao đúng hẹn.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">
          Anhaus mang tinh thần Bauhaus vào không gian sống Việt. Xem render theo
          phong cách và ngân sách của bạn — nhận bản 3D trong 48h.
        </p>

        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Nút chính dùng charcoal (primary); nút đồng duy nhất/trang là dải CtaBanner cuối trang */}
          <Link
            href="/lien-he"
            className="inline-flex h-12 items-center justify-center rounded-md bg-charcoal px-6 text-base font-semibold text-paper transition-colors hover:bg-graphite"
          >
            Đặt lịch khảo sát →
          </Link>
          <Link
            href="/phong-cach"
            className="inline-flex h-12 items-center justify-center rounded-md border border-charcoal px-6 text-base font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-paper"
          >
            Xem thư viện phong cách
          </Link>
        </div>

        <p className="mt-6 font-mono text-sm text-silver">
          Phục vụ TP.HCM · Bình Dương · Vũng Tàu
        </p>
      </div>

      {/* Right column — hero render */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-mist">
        {heroRender && (
          <SkeletonImage
            src={heroRender.src}
            alt={heroRender.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
            priority
          />
        )}
        <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-sm font-bold tracking-[0.2em] text-bronze/40">
          ANHAUS
        </span>
      </div>
    </section>
  );
}
