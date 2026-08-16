"use client";

import { useEffect, useRef, useState } from "react";
import { RenderCard } from "@/components/RenderCard";
import { Lightbox } from "@/components/Lightbox";
import { cn } from "@/lib/utils";
import type { Render } from "@/lib/renders";

type RenderGalleryProps = {
  renders: Render[];
  /** Số thẻ đầu được ưu tiên tải. */
  priorityCount?: number;
  /** Ghi đè class lưới nếu cần. */
  className?: string;
};

export function RenderGallery({
  renders,
  priorityCount = 3,
  className,
}: RenderGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const lastIndex = useRef(0);
  const closing = useRef(false);

  // Trả focus về thẻ vừa xem SAU khi lightbox đã unmount (tránh bị body cướp focus).
  useEffect(() => {
    if (openIndex === null && closing.current) {
      closing.current = false;
      triggers.current[lastIndex.current]?.focus();
    }
  }, [openIndex]);

  const open = (i: number) => {
    lastIndex.current = i;
    setOpenIndex(i);
  };
  const change = (next: number) => {
    lastIndex.current = next;
    setOpenIndex(next);
  };
  const close = () => {
    closing.current = true;
    setOpenIndex(null);
  };

  return (
    <>
      <div className={cn("grid gap-6 sm:grid-cols-2 xl:grid-cols-3", className)}>
        {renders.map((render, i) => (
          <button
            key={render.id}
            type="button"
            ref={(el) => {
              triggers.current[i] = el;
            }}
            onClick={() => open(i)}
            aria-haspopup="dialog"
            aria-label={`Xem lớn: ${render.alt}`}
            className="group block cursor-zoom-in rounded-[12px] text-left outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2"
          >
            <RenderCard
              render={render}
              priority={i < priorityCount}
              interactive
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          renders={renders}
          index={openIndex}
          onIndexChange={change}
          onClose={close}
        />
      )}
    </>
  );
}
