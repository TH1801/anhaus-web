import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { SkeletonImage } from "@/components/SkeletonImage";
import {
  type Render,
  STYLE_LABELS,
  ROOM_LABELS,
  TIER_LABELS,
} from "@/lib/renders";

type RenderCardProps = {
  render: Render;
  /** Ưu tiên tải (dùng cho ảnh đầu, LCP). */
  priority?: boolean;
  /** Thêm affordance bấm được: nâng nhẹ khi hover + icon phóng to. */
  interactive?: boolean;
};

export function RenderCard({
  render,
  priority = false,
  interactive = false,
}: RenderCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[12px] bg-card ring-1 ring-mist transition duration-200",
        interactive && "group-hover:-translate-y-1 group-hover:shadow-xl",
      )}
    >
      <div className="relative aspect-[16/10] bg-mist">
        <SkeletonImage
          src={render.src}
          alt={render.alt}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
          priority={priority}
        />
        <span className="absolute left-3 top-3 rounded-md bg-charcoal px-2.5 py-1 text-xs font-semibold text-paper">
          {TIER_LABELS[render.tier]}
        </span>
        {interactive && (
          <span className="pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-charcoal/60 text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <ZoomIn className="h-4 w-4" />
          </span>
        )}
        <span className="pointer-events-none absolute bottom-2 right-3 font-heading text-xs font-bold tracking-[0.2em] text-bronze/40">
          ANHAUS
        </span>
      </div>
      <div className="p-5">
        <p className="font-mono text-xs uppercase tracking-wider text-silver">
          {STYLE_LABELS[render.style]} · {ROOM_LABELS[render.room]}
        </p>
        <h3 className="mt-2 text-lg font-bold text-charcoal">
          {ROOM_LABELS[render.room]} {STYLE_LABELS[render.style]}
        </h3>
        <p className="mt-1 text-sm text-bronze">concept</p>
      </div>
    </article>
  );
}
