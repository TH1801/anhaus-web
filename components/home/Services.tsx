import Link from "next/link";
import { Compass, HardHat, Paintbrush, type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const SERVICES: Service[] = [
  {
    icon: Compass,
    title: "Thiết kế",
    description:
      "Ý tưởng không gian, chọn vật liệu thật, render 3D theo mặt bằng của bạn.",
    href: "/phong-cach",
  },
  {
    icon: HardHat,
    title: "Thi công",
    description:
      "Đội thi công riêng, giám sát vật liệu · đúng tiến độ, đúng cam kết.",
    href: "/quy-trinh",
  },
  {
    icon: Paintbrush,
    title: "Cải tạo",
    description:
      "Mua – sửa – bán nhà cũ. Trước/Sau cùng khung để thấy rõ giá trị.",
    href: "/phong-cach",
  },
];

export function Services() {
  return (
    <section className="container py-12 md:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
        CHÚNG TÔI LÀM GÌ
      </p>
      <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
        Ba việc, một đầu mối
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="flex h-full flex-col rounded-[12px] bg-card p-8 shadow-sm ring-1 ring-mist"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-paper">
                <Icon className="h-6 w-6 text-bronze" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-charcoal">
                {service.title}
              </h3>
              <p className="mt-3 text-graphite">{service.description}</p>
              <Link
                href={service.href}
                className="mt-auto pt-6 text-sm font-semibold text-bronze transition-colors hover:text-bronze-hover"
              >
                Tìm hiểu →
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
