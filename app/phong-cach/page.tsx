import type { Metadata } from "next";
import { RenderLibrary } from "@/components/phong-cach/RenderLibrary";
import { RenderGallery } from "@/components/RenderGallery";
import { findRender, TIER_OPTIONS } from "@/lib/renders";

export const metadata: Metadata = {
  title: "Thư viện phong cách",
  description:
    "Lọc render theo phong cách, mức đầu tư và loại phòng để chọn concept phù hợp với bạn.",
};

// Dải so sánh: cùng Indochine · Phòng khách, 3 mức Vừa/Trung/Cao (đọc từ catalog)
const COMPARISON = TIER_OPTIONS.map((t) =>
  findRender({ style: "indochine", room: "phong-khach", tier: t.slug }),
).filter((r): r is NonNullable<typeof r> => Boolean(r));

export default function PhongCachPage() {
  return (
    <>
      {/* Page header + bộ lọc + lưới */}
      <section className="container py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          THƯ VIỆN
        </p>
        <h1 className="mt-3 text-4xl font-bold text-charcoal md:text-5xl">
          Thư viện phong cách
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-graphite">
          Lọc theo phong cách, mức đầu tư và loại phòng để xem những concept phù
          hợp nhất với ngân sách của bạn.
        </p>

        <RenderLibrary />
      </section>

      {/* Dải so sánh — nền trắng đổi nhịp */}
      <section className="bg-card">
        <div className="container py-16 md:py-24">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Cùng một phòng, ba mức đầu tư
          </h2>

          <div className="mt-10">
            <RenderGallery renders={COMPARISON} priorityCount={0} />
          </div>

          <p className="mt-6 font-mono text-xs text-silver">
            Kết cấu phòng giữ nguyên — chỉ vật liệu, thiết bị, nội thất thay đổi.
          </p>
        </div>
      </section>
    </>
  );
}
