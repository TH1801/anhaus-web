import catalog from "@/data/renders.json";

export type Render = {
  id: string;
  style: string;
  tier: string;
  room: string;
  src: string;
  alt: string;
};

type FilterOption = { slug: string; label: string };

export const RENDERS: Render[] = catalog.renders as Render[];

export const STYLE_OPTIONS: FilterOption[] = catalog.filters.style;
export const TIER_OPTIONS: FilterOption[] = catalog.filters.tier;
export const ROOM_OPTIONS: FilterOption[] = catalog.filters.room;

export const CATALOG_NOTE: string = catalog.meta.note;

export const DEFAULTS: { style: string; tier: string; room: string } =
  catalog.defaults;

function toLabelMap(options: FilterOption[]): Record<string, string> {
  return Object.fromEntries(options.map((o) => [o.slug, o.label]));
}

export const STYLE_LABELS = toLabelMap(STYLE_OPTIONS);
export const TIER_LABELS = toLabelMap(TIER_OPTIONS);
export const ROOM_LABELS = toLabelMap(ROOM_OPTIONS);

/** Find a single render by any subset of style/tier/room. */
export function findRender(query: {
  style?: string;
  tier?: string;
  room?: string;
}): Render | undefined {
  return RENDERS.find(
    (r) =>
      (query.style === undefined || r.style === query.style) &&
      (query.tier === undefined || r.tier === query.tier) &&
      (query.room === undefined || r.room === query.room),
  );
}

/** All renders matching a subset of style/tier/room, in catalog order. */
export function filterRenders(query: {
  style?: string;
  tier?: string;
  room?: string;
}): Render[] {
  return RENDERS.filter(
    (r) =>
      (query.style === undefined || r.style === query.style) &&
      (query.tier === undefined || r.tier === query.tier) &&
      (query.room === undefined || r.room === query.room),
  );
}
