"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  type Render,
  STYLE_LABELS,
  ROOM_LABELS,
  TIER_LABELS,
} from "@/lib/renders";

type LightboxProps = {
  /** Danh sách render đang xem (đúng danh sách đã lọc trên lưới). */
  renders: Render[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 40;

export function Lightbox({
  renders,
  index,
  onIndexChange,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const current = renders[index];
  const hasSiblings = renders.length > 1;

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + renders.length) % renders.length);
    },
    [index, renders.length, onIndexChange],
  );

  // Bàn phím: Esc đóng, ←/→ lướt, Tab bẫy focus trong dialog.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go, onClose]);

  // Khoá cuộn nền khi mở + focus vào dialog.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm sm:p-8"
    >
      {/* Nút đóng */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Điều hướng trái/phải */}
      {hasSiblings && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Ảnh trước"
            className="fixed left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 sm:left-4"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Ảnh sau"
            className="fixed right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 sm:right-4"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Nội dung */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90vh] w-full max-w-[90vw] flex-col outline-none"
      >
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative flex min-h-0 items-center justify-center"
        >
          <Image
            key={current.id}
            src={current.src}
            alt={current.alt}
            width={1600}
            height={1000}
            className="h-auto max-h-[78vh] w-auto max-w-full rounded-[4px] object-contain"
            priority
          />
          <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-sm font-bold tracking-[0.2em] text-bronze/40">
            ANHAUS
          </span>
        </div>

        {/* Dải thông tin */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-paper px-2.5 py-1 text-xs font-semibold text-charcoal">
              {TIER_LABELS[current.tier]}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-silver">
              {STYLE_LABELS[current.style]} · {ROOM_LABELS[current.room]}
            </span>
            <span className="text-sm text-gold">concept</span>
          </div>

          <Link
            href="/lien-he"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1 rounded-md bg-bronze px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-bronze-hover"
          >
            Thích phong cách này? Đặt lịch khảo sát →
          </Link>
        </div>
      </div>
    </div>
  );
}
