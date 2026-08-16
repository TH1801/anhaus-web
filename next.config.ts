import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (apex custom domain anhaus.vn)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Apex custom domain serves from root, so no basePath / assetPrefix needed.
  // Hide the dev overlay indicator so screenshots stay clean.
  devIndicators: false,
};

export default nextConfig;
