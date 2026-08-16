import { cn } from "@/lib/utils";

type LogoProps = {
  /** Inverted palette for dark backgrounds (charcoal footer): 3rd bar turns white. */
  inverted?: boolean;
  /** Kích thước: "sm" cho Header/Footer, "lg" để trưng bày. */
  size?: "sm" | "lg";
  className?: string;
};

const SIZES = {
  sm: { text: "text-xl", wrap: "gap-2", bars: "gap-[3px]", bar: "h-4 w-1" },
  lg: {
    text: "text-4xl md:text-5xl",
    wrap: "gap-3",
    bars: "gap-1",
    bar: "h-9 w-1.5 md:h-11",
  },
} as const;

export function Logo({ inverted = false, size = "sm", className }: LogoProps) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center", s.wrap, className)}>
      <span
        className={cn(
          "font-heading font-bold tracking-[0.2em]",
          s.text,
          inverted ? "text-paper" : "text-charcoal",
        )}
      >
        ANHAUS
      </span>
      {/* 3-bar mark: bronze · gold · silver (white when inverted) */}
      <span className={cn("flex items-end", s.bars)} aria-hidden="true">
        <span className={cn("rounded-full bg-bronze", s.bar)} />
        <span className={cn("rounded-full bg-gold", s.bar)} />
        <span
          className={cn(
            "rounded-full",
            s.bar,
            inverted ? "bg-paper" : "bg-silver",
          )}
        />
      </span>
    </span>
  );
}
