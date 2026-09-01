import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Gallery } from "@/components/home/Gallery";
// Ẩn tạm đến khi có ảnh cải tạo thật:
// import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Process } from "@/components/home/Process";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Anhaus — Thiết kế & thi công nội thất trọn gói tại TP.HCM",
  description:
    "Thiết kế & thi công nội thất trọn gói cho chung cư, nhà phố, văn phòng tại TP.HCM (Bình Thạnh, Quận 1–4, Quận 7, Thủ Đức), Bình Dương, Vũng Tàu. Render 3D trong 48h.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Organization — chỉ trang chủ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <Hero />
      <Services />
      <Gallery />
      {/* Ẩn tạm section Trước/Sau — bật lại khi có ảnh cải tạo thật:
      <BeforeAfter /> */}
      <Process />
      <CtaBanner />
    </>
  );
}
