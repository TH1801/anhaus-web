# Anhaus Web — CLAUDE.md

Website giới thiệu studio thiết kế & thi công nội thất **Anhaus**.
Hosting tĩnh trên **GitHub Pages**, custom domain apex **anhaus.vn**.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v3** (design tokens trong `tailwind.config.ts`)
- **shadcn/ui** (radix, style `new-york`, CSS variables) — `components.json` đã cấu hình; thêm component bằng `npx shadcn@latest add <tên>`
- Fonts qua `next/font/google`

## Static export (GitHub Pages)

Cấu hình trong `next.config.ts`:

- `output: 'export'` — xuất HTML tĩnh ra `out/`
- `images: { unoptimized: true }` — GitHub Pages không có image optimizer
- `trailingSlash: true` — mỗi route thành `/duong-dan/index.html`
- **Không** đặt `basePath` (apex domain phục vụ từ gốc)
- `public/.nojekyll` — buộc GitHub Pages phục vụ thư mục `_next/`

Build tĩnh:

```bash
npm run build   # sinh thư mục out/
```

## Design tokens

Màu (định nghĩa trong `tailwind.config.ts`, dùng qua class Tailwind `bg-*`, `text-*`, …):

| Token          | Hex       | Vai trò                       |
| -------------- | --------- | ----------------------------- |
| `charcoal`     | `#232B33` | Nền tối / chữ đậm, footer     |
| `graphite`     | `#3E4750` | Chữ phụ, muted                |
| `silver`       | `#9AA3AB` | Chữ mờ trên nền tối           |
| `mist`         | `#E7EAED` | Viền, nền nhạt                |
| `paper`        | `#F5F6F7` | Nền trang                     |
| `bronze`       | `#AD6A34` | Màu nhấn / CTA chính          |
| `bronze-hover` | `#8F5528` | Trạng thái hover của bronze   |
| `gold`         | `#D9A63C` | Điểm nhấn phụ                 |
| `error`        | `#C0492F` | Lỗi / cảnh báo                |

Các token semantic của shadcn (`primary`, `border`, `ring`, …) được ánh xạ sang
bảng màu trên qua biến CSS (HSL) trong `app/globals.css`.

Typography (font families):

- `font-heading` → **Archivo** (tiêu đề, wordmark)
- `font-sans` → **Be Vietnam Pro** (nội dung, mặc định cho `body`)
- `font-mono` → **IBM Plex Mono** (số liệu, nhãn)

Biến font (`--font-archivo`, `--font-be-vietnam-pro`, `--font-ibm-plex-mono`)
được nạp trong `app/layout.tsx` và gắn vào `<html>`.

## Cấu trúc thư mục

```
app/                  # App Router
  layout.tsx          # Root layout: fonts + Header + Footer
  page.tsx            # / (Trang chủ)
  not-found.tsx       # 404
  phong-cach/page.tsx # /phong-cach
  quy-trinh/page.tsx  # /quy-trinh
  ve-anhaus/page.tsx  # /ve-anhaus
  lien-he/page.tsx    # /lien-he
  globals.css         # Tailwind + biến CSS theme
components/           # Component dùng chung (PascalCase)
  Header.tsx
  Footer.tsx
  ui/                 # Component shadcn (khi thêm)
lib/                  # Tiện ích
  utils.ts            # cn()
  navigation.ts       # NAV_ITEMS (dùng chung Header/Footer)
public/               # Tài nguyên tĩnh
  .nojekyll
```

## Quy ước

- **PascalCase** cho file & tên React component: `Header.tsx`, `export function Header()`.
  (Ngoại lệ: file bắt buộc của Next như `page.tsx`, `layout.tsx`, `not-found.tsx`;
  component `ui/` do shadcn sinh ra giữ tên kebab-case gốc.)
- Route folder dùng **kebab-case tiếng Việt không dấu**: `phong-cach`, `ve-anhaus`.
- Import nội bộ dùng alias `@/*` (vd `@/components/Header`, `@/lib/utils`).
- Thêm route mới → cập nhật `lib/navigation.ts` để Header/Footer tự đồng bộ.

## Lệnh

```bash
npm run dev                  # dev server (http://localhost:3000)
npm run build                # build tĩnh → out/
npm run lint                 # ESLint
node scripts/shot.mjs        # chụp full-page 3 khổ (1440/768/375) → .screenshots/
node scripts/optimize-images.mjs # ảnh gốc images-src/ → public/images/*.webp
```

## Ảnh render (thư viện)

- **Catalog:** `data/renders.json` (mỗi mục: `style · tier · room · src · alt`).
  Component đọc qua `lib/renders.ts` — **không hardcode**.
- **Nguồn gốc:** PNG 4800px (~578MB) nằm ở `images-src/` — **ngoài `public/`**, đã
  `.gitignore`, không deploy. Giữ làm bản gốc chất lượng cao.
- **Bản dùng:** WebP ≤2000px, quality 82, ở `public/images/{style}/*.webp`
  (~4MB tổng). Sinh bằng `node scripts/optimize-images.mjs`.
- Thêm/đổi ảnh gốc → chạy lại script optimize → cập nhật `src` trong catalog.
- Hiển thị bằng Next `<Image>` (unoptimized, hợp static export).

## Kiểm tra UI bằng screenshot (BẮT BUỘC)

`scripts/shot.mjs` dùng **Playwright** (Chromium) mở `http://localhost:3000`, cuộn
để kích hoạt lazy-load ảnh, rồi chụp full-page ở 3 khổ **1440 / 768 / 375** lưu
vào `.screenshots/` (thư mục này nằm trong `.gitignore`).

**Quy ước:** sau **mỗi lần thay đổi UI**, phải tự chạy `node scripts/shot.mjs`
(cần dev server đang chạy) và **tự xem cả 3 khổ 1440/768/375** để soát lệch
layout / tràn chữ / vỡ responsive **trước khi báo hoàn thành**.

Breakpoint mục tiêu: Desktop ≥1280 · Tablet 768–1279 · Mobile <768.
