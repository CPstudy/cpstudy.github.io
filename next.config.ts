import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",  // GitHub Pages deployment
  images: {
    unoptimized: true, // GitHub Pages does not support optimized images
  },
  basePath: "/cpstudy", // Change this to your repository name if different
  reactCompiler: true,
};

export default nextConfig;
