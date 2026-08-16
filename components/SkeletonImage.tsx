"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SkeletonImageProps = ComponentProps<typeof Image>;

/**
 * Ảnh có skeleton shimmer trong lúc tải, fade-in khi xong.
 * Cha phải là khối `relative` có kích thước cố định (vd aspect-[16/10])
 * để không gây layout shift.
 */
export function SkeletonImage({ className, ...props }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  // Ảnh đã cache có thể không kích onLoad → kiểm tra complete khi mount.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  return (
    <>
      {!loaded && (
        <span aria-hidden="true" className="skeleton absolute inset-0 z-[1]" />
      )}
      <Image
        {...props}
        ref={ref}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
}
