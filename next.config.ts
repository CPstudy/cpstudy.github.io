import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",  // GitHub Pages deployment
  images: {
    unoptimized: true, // GitHub Pages does not support optimized images
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  reactCompiler: true,
};

export default nextConfig;
