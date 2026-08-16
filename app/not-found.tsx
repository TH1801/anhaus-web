import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      {/* Số 404 lớn, chìm như nền */}
      <span className="font-heading text-[7rem] font-bold leading-none text-mist md:text-[11rem]">
        404
      </span>

      {/* Cụm 3 vạch đồng–vàng–bạc */}
      <span aria-hidden="true" className="mt-4 flex items-end gap-1">
        <span className="h-4 w-1 rounded-full bg-bronze" />
        <span className="h-4 w-1 rounded-full bg-gold" />
        <span className="h-4 w-1 rounded-full bg-silver" />
      </span>

      <h1 className="mt-6 text-3xl font-bold text-charcoal md:text-4xl">
        Không tìm thấy trang
      </h1>
      <p className="mt-3 max-w-md text-graphite">
        Trang bạn tìm không tồn tại hoặc đã được di chuyển.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-md bg-bronze px-6 text-base font-semibold text-paper transition-colors hover:bg-bronze-hover"
        >
          Về trang chủ →
        </Link>
        <Link
          href="/lien-he"
          className="inline-flex h-12 items-center justify-center rounded-md border border-charcoal px-6 text-base font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-paper"
        >
          Liên hệ hỗ trợ
        </Link>
      </div>
    </section>
  );
}
