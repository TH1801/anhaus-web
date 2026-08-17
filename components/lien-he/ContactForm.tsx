"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Google Form (không cần server) ─────────────────────────────
const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSf8RXk8NKJf_WIh01Lq4iagkvR7MiQAoWhzeNR17XFKDAGt9w/formResponse";

const ENTRY = {
  hoTen: "entry.1443470160",
  soDienThoai: "entry.1774024029",
  khuVuc: "entry.2103107329",
  nganSach: "entry.552233141",
  moTa: "entry.534777052",
} as const;

// Value gửi đi — dùng VERBATIM, không chuẩn hoá/đổi dấu.
// Ngân sách dùng gạch ngang dài "–" (U+2013).
const KHU_VUC_OPTIONS = ["TP.HCM", "Bình Dương", "Vũng Tàu"] as const;
const NGAN_SACH_OPTIONS = [
  "200tr–500tr",
  "500tr–1 tỷ",
  "1–2 tỷ",
  "Trên 2 tỷ",
] as const;

type Errors = { hoTen?: string; soDienThoai?: string };

const inputBase =
  "w-full rounded-md border bg-card px-3 py-2.5 text-charcoal outline-none transition-colors placeholder:text-silver focus:border-bronze";

const borderClass = (hasError?: string) =>
  hasError ? "border-error focus:border-error" : "border-mist";

// Ngưỡng thời gian: gửi nhanh hơn mức này (ms) coi là bot.
const MIN_FILL_MS = 3000;

export function ContactForm() {
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [khuVuc, setKhuVuc] = useState("");
  const [nganSach, setNganSach] = useState("");
  const [moTa, setMoTa] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Chống spam
  const [company, setCompany] = useState(""); // honeypot — người thật để trống
  const [submitting, setSubmitting] = useState(false);
  const loadedAt = useRef(0);

  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  function validate(): Errors {
    const errs: Errors = {};
    if (!hoTen.trim()) {
      errs.hoTen = "Vui lòng nhập họ và tên.";
    }
    const phone = soDienThoai.trim();
    if (!phone) {
      errs.soDienThoai = "Vui lòng nhập số điện thoại.";
    } else if (!/^[0-9\s]+$/.test(phone)) {
      errs.soDienThoai = "Số điện thoại chỉ gồm chữ số và khoảng trắng.";
    } else if (phone.replace(/\s/g, "").length < 9) {
      errs.soDienThoai = "Số điện thoại cần tối thiểu 9 chữ số.";
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return; // chặn double-submit

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // ── Chống spam: honeypot có giá trị, hoặc gửi quá nhanh → coi là bot.
    // Im lặng: vẫn hiện trạng thái thành công nhưng KHÔNG POST (không lộ bẫy).
    const elapsed = Date.now() - loadedAt.current;
    if (company.trim() !== "" || elapsed < MIN_FILL_MS) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    const data = new URLSearchParams();
    data.append(ENTRY.hoTen, hoTen);
    data.append(ENTRY.soDienThoai, soDienThoai);
    data.append(ENTRY.khuVuc, khuVuc);
    data.append(ENTRY.nganSach, nganSach);
    data.append(ENTRY.moTa, moTa);

    // Fire-and-forget: no-cors nên phản hồi opaque, coi như đã gửi.
    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
    } catch {
      // Bỏ qua lỗi mạng — vẫn hiển thị trạng thái đã nhận.
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[12px] bg-card p-8 shadow-sm ring-1 ring-mist md:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bronze">
          <Check className="h-7 w-7 text-paper" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-bold text-charcoal">
          Đã nhận yêu cầu của bạn
        </h3>
        <p className="text-graphite">
          Chúng tôi sẽ liên hệ trong vòng 24h.
        </p>
        <Link
          href="/"
          className="text-sm font-semibold text-bronze transition-colors hover:text-bronze-hover"
        >
          Về trang chủ →
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[12px] bg-card p-6 shadow-sm ring-1 ring-mist md:p-8"
    >
      {/* Honeypot: ẩn off-screen (KHÔNG display:none) — bot điền, người thật để trống */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Họ và tên */}
        <div>
          <label htmlFor="hoTen" className="text-sm font-medium text-charcoal">
            Họ và tên
          </label>
          <input
            id="hoTen"
            type="text"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            aria-invalid={!!errors.hoTen}
            aria-describedby={errors.hoTen ? "hoTen-error" : undefined}
            className={cn("mt-1.5", inputBase, borderClass(errors.hoTen))}
          />
          {errors.hoTen && (
            <p id="hoTen-error" className="mt-1 text-sm text-error">
              {errors.hoTen}
            </p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label
            htmlFor="soDienThoai"
            className="text-sm font-medium text-charcoal"
          >
            Số điện thoại
          </label>
          <input
            id="soDienThoai"
            type="tel"
            inputMode="tel"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
            aria-invalid={!!errors.soDienThoai}
            aria-describedby={
              errors.soDienThoai ? "soDienThoai-error" : undefined
            }
            className={cn("mt-1.5", inputBase, borderClass(errors.soDienThoai))}
          />
          {errors.soDienThoai && (
            <p id="soDienThoai-error" className="mt-1 text-sm text-error">
              {errors.soDienThoai}
            </p>
          )}
        </div>

        {/* Khu vực dự án */}
        <div>
          <label htmlFor="khuVuc" className="text-sm font-medium text-charcoal">
            Khu vực dự án
          </label>
          <div className="relative mt-1.5">
            <select
              id="khuVuc"
              value={khuVuc}
              onChange={(e) => setKhuVuc(e.target.value)}
              className={cn(inputBase, borderClass(), "appearance-none pr-10")}
            >
              <option value="">— Chọn khu vực —</option>
              {KHU_VUC_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" />
          </div>
        </div>

        {/* Ngân sách dự kiến */}
        <div>
          <label htmlFor="nganSach" className="text-sm font-medium text-charcoal">
            Ngân sách dự kiến
          </label>
          <div className="relative mt-1.5">
            <select
              id="nganSach"
              value={nganSach}
              onChange={(e) => setNganSach(e.target.value)}
              className={cn(inputBase, borderClass(), "appearance-none pr-10")}
            >
              <option value="">— Chọn ngân sách —</option>
              {NGAN_SACH_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite" />
          </div>
        </div>
      </div>

      {/* Mô tả nhu cầu */}
      <div className="mt-5">
        <label htmlFor="moTa" className="text-sm font-medium text-charcoal">
          Mô tả nhu cầu
        </label>
        <textarea
          id="moTa"
          rows={4}
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          className={cn("mt-1.5 resize-y", inputBase, borderClass())}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-bronze px-6 text-base font-semibold text-paper transition-colors hover:bg-bronze-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Đang gửi…" : "Đặt lịch khảo sát →"}
      </button>

      <p className="mt-4 font-mono text-sm text-silver">
        Chúng tôi phản hồi trong 24h · Thông tin của bạn được bảo mật.
      </p>
    </form>
  );
}
