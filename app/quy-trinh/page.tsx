import type { Metadata } from "next";
import {
  Clock,
  ShieldCheck,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";
import { CtaBanner } from "@/components/home/CtaBanner";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quy trình thiết kế & thi công — nhận render 3D trong 48h | Anhaus",
  description:
    "Quy trình minh bạch của Anhaus: khảo sát, chọn phong cách, nhận render 3D trong 48h, thi công và bàn giao. Bạn thấy không gian trước khi chi tiền.",
  path: "/quy-trinh/",
});

type Step = { no: string; title: React.ReactNode };

const FAST_STEPS: Step[] = [
  { no: "01", title: "Gặp & khảo sát" },
  { no: "02", title: "Chọn phong cách & mức giá trên iPad" },
  {
    no: "03",
    title: (
      <>
        Nhận render 3D <span className="text-bronze">trong 48h</span>
      </>
    ),
  },
  { no: "04", title: "Chốt báo giá & thi công" },
];

type Stage = { no: string; title: string; desc: string };

const JOURNEY: Stage[] = [
  {
    no: "01",
    title: "Khảo sát & tư vấn",
    desc: "Đo đạc mặt bằng, lắng nghe nhu cầu, thống nhất phong cách và ngân sách.",
  },
  {
    no: "02",
    title: "Concept & render 3D",
    desc: "Dựng hình concept theo mặt bằng để bạn cảm nhận không gian trước khi chi tiền.",
  },
  {
    no: "03",
    title: "Bản vẽ thi công & báo giá chi tiết",
    desc: "Lên kích thước, kỹ thuật, vật liệu chính xác kèm báo giá minh bạch.",
  },
  {
    no: "04",
    title: "Thi công & giám sát",
    desc: "Đội thi công riêng, giám sát vật liệu và tiến độ theo cam kết.",
  },
  {
    no: "05",
    title: "Nghiệm thu & bàn giao",
    desc: "Kiểm tra từng hạng mục cùng bạn trước khi bàn giao không gian hoàn thiện.",
  },
  {
    no: "06",
    title: "Bảo hành",
    desc: "Đồng hành sau bàn giao, xử lý phát sinh trong thời gian bảo hành.",
  },
];

type Compare = { title: string; points: string[] };

const CONCEPT: Compare = {
  title: "Render concept",
  points: [
    "Để cảm nhận không gian, vật liệu, màu sắc.",
    "Làm nhanh trong 48h, dễ chỉnh.",
    "Là hình minh hoạ, không phải kích thước thi công.",
  ],
};
const SHOP_DRAWING: Compare = {
  title: "Bản vẽ thi công",
  points: [
    "Kích thước, kỹ thuật, vật liệu chính xác.",
    "Cơ sở để thi công & nghiệm thu.",
    "Lập sau khi chốt concept.",
  ],
};

type Commitment = { icon: LucideIcon; title: string; desc: string };

const PROMISES: Commitment[] = [
  {
    icon: Clock,
    title: "Render trong 48h",
    desc: "Thấy không gian nhanh, quyết định sớm.",
  },
  {
    icon: ShieldCheck,
    title: "Giám sát vật liệu",
    desc: "Đúng chủng loại đã cam kết, không đánh tráo.",
  },
  {
    icon: CalendarCheck,
    title: "Đúng tiến độ",
    desc: "Cam kết mốc thời gian và bám sát tiến độ.",
  },
];

type Faq = { q: string; a: React.ReactNode };

const FAQS: Faq[] = [
  {
    q: "Render có giống hệt lúc thi công xong không?",
    a: "Concept phản ánh đúng phong cách, bố cục và vật liệu đã chọn; chi tiết nhỏ có thể tinh chỉnh khi lên bản vẽ thi công.",
  },
  {
    q: "48h tính từ khi nào?",
    a: "Từ lúc chốt khảo sát mặt bằng và phong cách/ngân sách.",
  },
  {
    q: "Chi phí render có mất phí không?",
    a: "Không. Với khách hàng thật sự quan tâm, Anhaus thực hiện render miễn phí sau khi khảo sát trực tiếp mặt bằng. Đây là lợi thế Anhaus mang lại để quý khách hình dung rõ không gian trước khi thi công. Anhaus không nhận làm render cho các yêu cầu online chưa qua khảo sát. Lưu ý: hình render là công cụ minh họa ý tưởng thiết kế, không phải bản vẽ thi công.",
  },
  {
    q: "Có làm ngoài TP.HCM không?",
    a: "Có — TP.HCM, Bình Dương, Vũng Tàu.",
  },
];

export default function QuyTrinhPage() {
  return (
    <>
      {/* 1. Page header */}
      <section className="container py-16 md:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          QUY TRÌNH
        </p>
        <h1 className="mt-3 text-4xl font-bold text-charcoal md:text-5xl">
          Từ ý tưởng đến bàn giao
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-graphite">
          Một đầu mối, quy trình minh bạch. Bạn thấy không gian trước khi chi
          tiền, và biết chính xác điều gì diễn ra ở mỗi bước.
        </p>
      </section>

      {/* 2. 48 giờ đầu tiên */}
      <section className="container pb-16 md:pb-24">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          48 GIỜ ĐẦU TIÊN
        </p>
        <ol className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {FAST_STEPS.map((step) => (
            <li key={step.no} className="relative pt-6">
              <span className="absolute inset-x-0 top-0 border-t border-mist" />
              <span className="font-mono text-3xl font-semibold text-bronze">
                {step.no}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-charcoal">
                {step.title}
              </h3>
            </li>
          ))}
        </ol>
        <p className="mt-10 font-mono text-xs text-silver">
          Render là hình concept minh hoạ, không phải bản vẽ thi công.
        </p>
      </section>

      {/* 3. Toàn bộ hành trình — timeline dọc */}
      <section className="bg-card">
        <div className="container py-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
            TOÀN BỘ HÀNH TRÌNH
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
            Sáu giai đoạn, từ đầu đến cuối
          </h2>

          <ol className="mt-10 ml-3 space-y-10 border-l border-mist">
            {JOURNEY.map((stage) => (
              <li key={stage.no} className="relative pl-8">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-bronze ring-4 ring-card" />
                <span className="font-mono text-sm font-semibold text-bronze">
                  {stage.no}
                </span>
                <h3 className="mt-1 text-xl font-bold text-charcoal">
                  {stage.title}
                </h3>
                <p className="mt-1 max-w-xl text-graphite">{stage.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Concept ≠ thi công — dải than chì */}
      <section className="border-b border-graphite bg-charcoal">
        <div className="container py-16 md:py-24">
          <h2 className="text-3xl font-bold text-paper md:text-4xl">
            Render concept khác bản vẽ thi công
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[CONCEPT, SHOP_DRAWING].map((card) => (
              <div key={card.title} className="rounded-[12px] bg-card p-8">
                <h3 className="text-xl font-bold text-charcoal">
                  {card.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-3 text-graphite">
                      <span className="mt-1 select-none text-bronze">—</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-silver">
            Chúng tôi luôn nói rõ bạn đang xem loại bản vẽ nào ở mỗi bước.
          </p>
        </div>
      </section>

      {/* 5. Cam kết */}
      <section className="container py-16 md:py-24">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Ba điều chúng tôi giữ
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PROMISES.map((item) => {
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

      {/* 6. FAQ */}
      <section className="container pb-16 md:pb-24">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Câu hỏi hay gặp
        </h2>
        <dl className="mt-10 divide-y divide-mist border-t border-mist">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-6">
              <dt className="text-lg font-semibold text-charcoal">{faq.q}</dt>
              <dd className="mt-2 max-w-2xl text-graphite">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 7. Dải CTA */}
      <CtaBanner />
    </>
  );
}
