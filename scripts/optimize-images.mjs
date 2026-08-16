// Tối ưu ảnh render: đọc bản gốc PNG ở images-src/, xuất WebP nhẹ vào public/images/.
// Bản gốc được giữ nguyên (images-src/ nằm ngoài public/, không deploy).
// Chạy: node scripts/optimize-images.mjs
import sharp from "sharp";
import {
  readdirSync,
  mkdirSync,
  statSync,
} from "node:fs";
import { join } from "node:path";

const SRC = "images-src";
const OUT = "public/images";
const MAX_WIDTH = 2000; // đủ nét cho lightbox trên màn retina
const QUALITY = 82;
const STYLES = ["indochine", "modern", "neoclassical"];

const mb = (bytes) => (bytes / 1048576).toFixed(2);

let count = 0;
let totalIn = 0;
let totalOut = 0;

for (const style of STYLES) {
  const inDir = join(SRC, style);
  const outDir = join(OUT, style);
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(inDir).filter((f) => /\.png$/i.test(f));
  for (const file of files) {
    const inPath = join(inDir, file);
    const outPath = join(outDir, file.replace(/\.png$/i, ".webp"));

    await sharp(inPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    const inSize = statSync(inPath).size;
    const outSize = statSync(outPath).size;
    totalIn += inSize;
    totalOut += outSize;
    count++;
    console.log(
      `${style}/${file}  ${mb(inSize)}MB -> ${mb(outSize)}MB`,
    );
  }
}

console.log(
  `\n✓ ${count} ảnh · tổng ${mb(totalIn)}MB -> ${mb(totalOut)}MB ` +
    `(giảm ${(100 - (totalOut / totalIn) * 100).toFixed(1)}%)`,
);
