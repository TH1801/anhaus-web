"use client";

import { useState } from "react";
import Link from "next/link";
import {
  RENDERS,
  STYLE_OPTIONS,
  TIER_OPTIONS,
  ROOM_OPTIONS,
  STYLE_LABELS,
  TIER_LABELS,
  ROOM_LABELS,
  DEFAULTS,
} from "@/lib/renders";
import { useRenderFilter } from "@/lib/useRenderFilter";
import { RenderGallery } from "@/components/RenderGallery";
import { cn } from "@/lib/utils";

type FilterOption = { slug: string; label: string };

function PillGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <span className="font-mono text-xs uppercase tracking-wider text-silver sm:w-24 sm:shrink-0">
        {label}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = opt.slug === value;
          return (
            <button
              key={opt.slug}
              type="button"
              onClick={() => onChange(opt.slug)}
              aria-pressed={selected}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                selected
                  ? "border-charcoal bg-charcoal text-paper"
                  : "border-mist bg-card text-graphite hover:border-silver",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function RenderLibrary() {
  const [style, setStyle] = useState(DEFAULTS.style);
  const [tier, setTier] = useState(DEFAULTS.tier);
  const [room, setRoom] = useState(DEFAULTS.room);

  const filtered = useRenderFilter(RENDERS, { style, tier, room });

  return (
    <div className="mt-10">
      {/* Bộ lọc 3 tầng */}
      <div className="space-y-3 rounded-[12px] border border-mist bg-card/60 p-5">
        <PillGroup
          label="Phong cách"
          options={STYLE_OPTIONS}
          value={style}
          onChange={setStyle}
        />
        <PillGroup
          label="Mức giá"
          options={TIER_OPTIONS}
          value={tier}
          onChange={setTier}
        />
        <PillGroup
          label="Phòng"
          options={ROOM_OPTIONS}
          value={room}
          onChange={setRoom}
        />
      </div>

      {/* Dòng trạng thái */}
      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-graphite">
        Đang xem: {STYLE_LABELS[style]} · {TIER_LABELS[tier]} ·{" "}
        {ROOM_LABELS[room]} — {filtered.length} render
      </p>

      {/* Lưới render hoặc empty state */}
      {filtered.length > 0 ? (
        <div className="mt-6">
          <RenderGallery renders={filtered} priorityCount={3} />
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-start gap-4 rounded-[12px] border border-dashed border-mist bg-card p-10">
          <p className="text-lg font-semibold text-charcoal">
            Chưa có render cho lựa chọn này
          </p>
          <p className="text-graphite">
            Hãy thử tổ hợp khác, hoặc đặt lịch để chúng tôi dựng render riêng cho
            không gian của bạn.
          </p>
          <Link
            href="/lien-he"
            className="inline-flex h-11 items-center justify-center rounded-md bg-bronze px-5 text-sm font-semibold text-paper transition-colors hover:bg-bronze-hover"
          >
            Đặt lịch khảo sát →
          </Link>
        </div>
      )}
    </div>
  );
}
