// Chụp full-page screenshot ở 3 khổ để tự kiểm layout/responsive.
// Yêu cầu: dev server đang chạy (npm run dev).
// Dùng:
//   node scripts/shot.mjs                                  -> Trang chủ (home-*.png)
//   node scripts/shot.mjs /phong-cach/ phong-cach          -> trang khác (phong-cach-*.png)
//   node scripts/shot.mjs "<url>" <tên> --lightbox         -> mở lightbox rồi chụp (<tên>-lightbox-*.png)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const arg = process.argv[2];
const BASE = arg
  ? arg.startsWith("http")
    ? arg
    : `http://localhost:3000${arg}`
  : (process.env.URL ?? "http://localhost:3000");
const NAME = process.argv[3] ?? "home";
const LIGHTBOX = process.argv.includes("--lightbox");
const OUT = ".screenshots";
const WIDTHS = [1440, 768, 375];

mkdirSync(OUT, { recursive: true });

/** Cuộn hết trang để kích hoạt lazy-load của next/image, rồi về đầu trang. */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let total = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
}

const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
    });
    await page.goto(BASE, { waitUntil: "load" });
    await autoScroll(page);
    // Đợi mọi ảnh tải xong trước khi chụp (ảnh render rất nặng ~20MB).
    await page
      .waitForFunction(
        () =>
          Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
        null,
        { timeout: 30000 },
      )
      .catch(() => console.warn(`  [${width}] một số ảnh chưa tải xong, vẫn chụp`));
    // Buộc decode để ảnh đã paint trước khi chụp (tránh ô trống giả).
    await page.evaluate(() =>
      Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {}))),
    );
    await page.waitForTimeout(400);

    if (LIGHTBOX) {
      // Mở lightbox: bấm thẻ render đầu tiên, đợi dialog xuất hiện.
      await page.locator('button[aria-label^="Xem lớn"]').first().click();
      await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
      await page.waitForTimeout(400);
      const file = `${OUT}/${NAME}-lightbox-${width}.png`;
      await page.screenshot({ path: file, fullPage: false });
      console.log(`saved ${file}`);
    } else {
      const file = `${OUT}/${NAME}-${width}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log(`saved ${file}`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
