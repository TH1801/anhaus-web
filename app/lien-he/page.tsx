import type { Metadata } from "next";
import { MapPin, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/lien-he/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Liên hệ & đặt lịch khảo sát miễn phí | Anhaus",
  description:
    "Đặt lịch khảo sát miễn phí với Anhaus tại TP.HCM, Bình Dương, Vũng Tàu. Để lại thông tin, chúng tôi phản hồi và tư vấn phong cách, ngân sách trong 24h.",
  path: "/lien-he/",
});

function BarDivider() {
  return (
    <div aria-hidden="true" className="flex gap-1.5 py-6">
      <span className="h-0.5 w-8 rounded-full bg-bronze" />
      <span className="h-0.5 w-8 rounded-full bg-gold" />
      <span className="h-0.5 w-8 rounded-full bg-silver" />
    </div>
  );
}

type Zone = { icon: LucideIcon; name: string; desc: string };

const ZONES: Zone[] = [
  {
    icon: MapPin,
    name: "TP.HCM",
    desc: "Trung tâm và các quận lân cận — khảo sát nhanh.",
  },
  {
    icon: MapPin,
    name: "Bình Dương",
    desc: "Thuận An, Dĩ An, Thủ Dầu Một và vùng phụ cận.",
  },
  {
    icon: MapPin,
    name: "Vũng Tàu",
    desc: "Nhà phố và căn hộ nghỉ dưỡng ven biển.",
  },
];

export default function LienHePage() {
  return (
    <>
      {/* 1. Page header */}
      <section className="container py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          LIÊN HỆ
        </p>
        <h1 className="mt-3 text-4xl font-bold text-charcoal md:text-5xl">
          Đặt lịch khảo sát
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-graphite">
          Để lại thông tin, chúng tôi phản hồi trong 24h. Khảo sát miễn phí tại
          TP.HCM · Bình Dương · Vũng Tàu.
        </p>
      </section>

      {/* 2. Khối chính: form + thông tin */}
      <section className="container pb-16 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-[60fr_40fr]">
          {/* Cột trái: form (mobile xuống dưới) */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Cột phải: thông tin (mobile lên trên) */}
          <div className="order-1 lg:order-2">
            {/* Liên hệ trực tiếp */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-silver">
                Liên hệ trực tiếp
              </p>
              <dl className="mt-4 space-y-3 text-graphite">
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal">Điện thoại</dt>
                  <dd className="text-silver">cập nhật</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal">Zalo</dt>
                  <dd className="text-silver">cập nhật</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal">Email</dt>
                  <dd>
                    <a
                      href="mailto:info@anhaus.vn"
                      className="text-bronze transition-colors hover:text-bronze-hover"
                    >
                      info@anhaus.vn
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <BarDivider />

            {/* Văn phòng */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-silver">
                Văn phòng
              </p>
              <address className="mt-4 space-y-2 not-italic text-graphite">
                <p className="text-charcoal">
                  280E4 Lương Định Của, P. Bình Trưng, TP.HCM
                </p>
                <p>Giờ làm việc: T2–T7, 8:00–17:30</p>
              </address>
            </div>

            <BarDivider />

            {/* Theo dõi */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-silver">
                Theo dõi
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-graphite">
                <li className="text-silver">Facebook (cập nhật)</li>
                <li className="text-silver">Zalo (cập nhật)</li>
                <li>
                  <a
                    href="https://anhaus.vn"
                    className="text-bronze transition-colors hover:text-bronze-hover"
                  >
                    anhaus.vn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dải khu vực */}
      <section className="bg-card">
        <div className="container py-16 md:py-24">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Chúng tôi phục vụ
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ZONES.map((zone) => {
              const Icon = zone.icon;
              return (
                <div
                  key={zone.name}
                  className="rounded-[12px] bg-paper p-8 ring-1 ring-mist"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-card">
                    <Icon className="h-6 w-6 text-bronze" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-charcoal">
                    {zone.name}
                  </h3>
                  <p className="mt-2 text-graphite">{zone.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Placeholder bản đồ */}
          <div className="mt-10 flex aspect-[21/9] items-center justify-center rounded-[12px] bg-mist">
            <span className="font-mono text-xs uppercase tracking-widest text-silver">
              Bản đồ Google — nhúng sau
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
