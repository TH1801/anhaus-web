import Link from "next/link";

export function BeforeAfter() {
  return (
    <section className="bg-card">
      <div className="container py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
          CẢI TẠO
        </p>
        <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
          Mua cũ · Sửa mới · Nâng giá trị
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-graphite">
          Cùng một khung hình Trước / Sau để thấy rõ phần giá trị được cộng thêm
          sau cải tạo.
        </p>

        {/* Before / After comparison */}
        <div className="mt-10 grid grid-cols-2 overflow-hidden rounded-[12px] ring-1 ring-mist">
          <div className="relative flex aspect-[4/3] items-center justify-center bg-mist">
            <span className="absolute left-3 top-3 rounded-md bg-charcoal px-2.5 py-1 text-xs font-semibold text-paper">
              Trước
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-silver">
              Cập nhật sau
            </span>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center border-l border-paper bg-mist">
            <span className="absolute left-3 top-3 rounded-md bg-bronze px-2.5 py-1 text-xs font-semibold text-paper">
              Sau
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-silver">
              Cập nhật sau
            </span>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-silver">
          Ảnh dự án cải tạo — cập nhật sau.
        </p>

        <div className="mt-10">
          <Link
            href="/phong-cach"
            className="text-sm font-semibold text-bronze transition-colors hover:text-bronze-hover"
          >
            Xem các dự án cải tạo →
          </Link>
        </div>
      </div>
    </section>
  );
}
