type Step = {
  no: string;
  title: React.ReactNode;
};

const STEPS: Step[] = [
  { no: "01", title: "Gặp & khảo sát" },
  { no: "02", title: "Chọn phong cách & mức giá" },
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

export function Process() {
  return (
    <section className="container py-12 md:py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-bronze md:text-sm">
        QUY TRÌNH
      </p>
      <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
        Từ gặp mặt đến render chỉ 48h
      </h2>

      <ol className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {STEPS.map((step) => (
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

      <p className="mt-10 font-mono text-sm text-silver">
        Render là hình concept minh hoạ, không phải bản vẽ thi công.
      </p>
    </section>
  );
}
