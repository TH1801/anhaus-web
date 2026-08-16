import type { Metadata } from "next";
import { Ruler, Layers, Minimize2, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SkeletonImage } from "@/components/SkeletonImage";
import { CtaBanner } from "@/components/home/CtaBanner";
import { findRender } from "@/lib/renders";

export const metadata: Metadata = {
  title: "Về Anhaus",
  description:
    "Anhaus là 'An' (bình an) gặp 'Haus' (ngôi nhà, tinh thần Bauhaus).",
};

const showcase = findRender({
  style: "indochine",
  tier: "cao",
  room: "phong-khach",
});

type Principle = { icon: LucideIcon; title: string; desc: string };

const PRINCIPLES: Principle[] = [
  {
    icon: Ruler,
    title: "Tỉ lệ đúng",
    desc: "Cân đối hình khối và khoảng cách để không gian dễ chịu ở mọi góc nhìn.",
  },
  {
    icon: Layers,
    title: "Vật liệu thật",
    desc: "Dùng vật liệu thành thật với chính nó — bền, đẹp theo thời gian.",
  },
  {
    icon: Minimize2,
    title: "Tối giản có chủ đích",
    desc: "Chỉ giữ những gì cần, mỗi chi tiết đều có lý do tồn tại.",
  },
];

const AUDIENCE_POINTS = [
  "48h nhận render",
  "3 khu vực phục vụ",
  "Một đầu mối, trọn gói",
];

export default function VeAnhausPage() {
  return (
    <>
      {/* 1. Hero canh giữa hẹp */}
      <section className="container py-20 text-center md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          VỀ ANHAUS
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold text-charcoal md:text-5xl lg:text-6xl">
          An trong từng đường nét.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Anhaus là “An” (bình an) gặp “Haus” (ngôi nhà, tinh thần Bauhaus).
          Chúng tôi tin một không gian tốt đến từ tỉ lệ đúng, vật liệu thật và sự
          tối giản có chủ đích — không phô trương, chỉ vừa đủ và bền.
        </p>
      </section>

      {/* 2. An + Haus */}
      <section className="bg-card">
        <div className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              An + Haus
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-graphite">
              <span className="font-semibold text-charcoal">An</span> là an tâm,
              là sự ổn định. Một ngôi nhà tốt trước hết phải khiến người ở thấy
              yên — về công năng, về chi phí, về chất lượng bàn giao.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-graphite">
              <span className="font-semibold text-charcoal">Haus</span> nhắc đến
              tinh thần Bauhaus: đề cao công năng, hình khối thuần khiết và vật
              liệu thành thật với chính nó.
            </p>
          </div>

          <div className="flex aspect-[4/3] items-center justify-center rounded-[12px] border border-mist bg-paper p-8">
            <Logo size="lg" />
          </div>
        </div>
      </section>

      {/* 3. Ba nguyên tắc */}
      <section className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Ba nguyên tắc thiết kế
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-[12px] bg-card p-8 shadow-sm ring-1 ring-mist"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-paper">
                  <Icon className="h-6 w-6 text-bronze" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-3 text-graphite">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Ánh sáng & vật liệu */}
      <section className="bg-card">
        <div className="container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-mist">
            {showcase && (
              <SkeletonImage
                src={showcase.src}
                alt={showcase.alt}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            )}
            <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-sm font-bold tracking-[0.2em] text-bronze/40">
              ANHAUS
            </span>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Ánh sáng tự nhiên, tông trung tính
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-graphite">
              Hình ảnh của Anhaus ưu tiên ánh sáng tự nhiên, bảng màu trung tính
              và vật liệu mộc. Chúng tôi để không gian tự lên tiếng — đủ ấm để
              sống, đủ tĩnh để nghỉ.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Phục vụ ai */}
      <section className="container py-16 md:py-24">
        <h2 className="max-w-3xl text-3xl font-bold text-charcoal md:text-4xl">
          Dành cho người muốn làm một lần cho tới
        </h2>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">
          Anhaus đồng hành cùng chủ nhà và chủ doanh nghiệp ở TP.HCM, Bình Dương
          và Vũng Tàu — làm nội thất trọn gói, và cải tạo những căn nhà cũ thành
          không gian đáng sống.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-8">
          {AUDIENCE_POINTS.map((point) => (
            <span
              key={point}
              className="font-mono text-sm uppercase tracking-wider text-graphite"
            >
              <span className="text-bronze">·</span> {point}
            </span>
          ))}
        </div>
      </section>

      {/* 6. Dải CTA */}
      <CtaBanner />
    </>
  );
}
