import { useMemo } from "react";
import type { Render } from "@/lib/renders";

export type RenderSelection = {
  style: string;
  tier: string;
  /** "all" = mọi phòng */
  room: string;
};

/**
 * Lọc danh sách render theo lựa chọn phong cách / mức giá / phòng.
 * room === "all" thì bỏ qua tiêu chí phòng.
 */
export function useRenderFilter(
  renders: Render[],
  selection: RenderSelection,
): Render[] {
  const { style, tier, room } = selection;
  return useMemo(
    () =>
      renders.filter(
        (r) =>
          r.style === style &&
          r.tier === tier &&
          (room === "all" || r.room === room),
      ),
    [renders, style, tier, room],
  );
}
