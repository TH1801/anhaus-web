import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="border-b border-graphite bg-charcoal">
      <div className="container flex flex-col items-start gap-6 py-12 md:py-16">
        <h2 className="max-w-2xl text-3xl font-bold text-paper md:text-4xl">
          Sẵn sàng bắt đầu không gian của bạn?
        </h2>
        <p className="max-w-xl text-lg text-silver">
          Đặt lịch khảo sát để nhận tư vấn phong cách, ngân sách và bản render 3D
          trong 48h.
        </p>
        <Link
          href="/lien-he"
          className="inline-flex h-12 items-center justify-center rounded-md bg-bronze px-6 text-base font-semibold text-paper transition-colors hover:bg-bronze-hover"
        >
          Đặt lịch khảo sát →
        </Link>
      </div>
    </section>
  );
}
