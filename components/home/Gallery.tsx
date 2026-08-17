import Link from "next/link";
import { SkeletonImage } from "@/components/SkeletonImage";
import {
  findRender,
  STYLE_OPTIONS,
  TIER_OPTIONS,
  ROOM_OPTIONS,
  STYLE_LABELS,
  ROOM_LABELS,
  TIER_LABELS,
} from "@/lib/renders";

// Static filter pill groups (derived from catalog — logic ở bước sau)
const PILL_GROUPS: string[][] = [
  STYLE_OPTIONS.map((o) => o.label),
  TIER_OPTIONS.map((o) => o.label),
  ROOM_OPTIONS.filter((o) => o.slug !== "all").map((o) => o.label),
];

// 3 thẻ: cùng Indochine · Phòng khách, khác mức giá để thấy khác biệt vật liệu
const CARDS = TIER_OPTIONS.map((t) =>
  findRender({ style: "indochine", room: "phong-khach", tier: t.slug }),
).filter((r): r is NonNullable<typeof r> => Boolean(r));

export function Gallery() {
  return (
    <section className="container py-12 md:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
        THƯ VIỆN
      </p>
      <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
        Chọn phong cách theo ngân sách của bạn
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-graphite">
        Lọc theo phong cách, mức đầu tư và loại phòng để xem những concept phù
        hợp nhất với bạn.
      </p>

      {/* Static filter pills (chưa bấm được — logic ở bước sau) */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {PILL_GROUPS.map((group, gi) => (
          <div key={gi} className="flex flex-wrap items-center gap-2">
            {gi > 0 && (
              <span className="mx-1 hidden h-4 w-px bg-mist sm:inline-block" />
            )}
            {group.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-mist bg-card px-4 py-1.5 text-sm text-graphite"
              >
                {pill}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Render cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((card) => (
          <article
            key={card.id}
            className="overflow-hidden rounded-[12px] bg-card ring-1 ring-mist"
          >
            <div className="relative aspect-[16/10] bg-mist">
              <SkeletonImage
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-3 top-3 rounded-md bg-charcoal px-2.5 py-1 text-xs font-semibold text-paper">
                {TIER_LABELS[card.tier]}
              </span>
              <span className="pointer-events-none absolute bottom-2 right-3 font-heading text-xs font-bold tracking-[0.2em] text-bronze/40">
                ANHAUS
              </span>
            </div>
            <div className="p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-silver">
                {STYLE_LABELS[card.style]} · {ROOM_LABELS[card.room]}
              </p>
              <h3 className="mt-2 text-lg font-bold text-charcoal">
                {ROOM_LABELS[card.room]} {STYLE_LABELS[card.style]}
              </h3>
              <p className="mt-1 text-sm text-bronze">concept</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/phong-cach"
          className="text-sm font-semibold text-bronze transition-colors hover:text-bronze-hover"
        >
          Xem toàn bộ thư viện →
        </Link>
      </div>
    </section>
  );
}
