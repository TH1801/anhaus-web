import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Gallery } from "@/components/home/Gallery";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Process } from "@/components/home/Process";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Anhaus — Thiết kế & thi công nội thất trọn gói tại TP.HCM",
  description:
    "Studio nội thất trọn gói: thiết kế, thi công, cải tạo. Nhận render 3D trong 48h theo phong cách Indochine, Modern, Tân cổ điển. Phục vụ TP.HCM, Bình Dương, Vũng Tàu.",
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
      <BeforeAfter />
      <Process />
      <CtaBanner />
    </>
  );
}
