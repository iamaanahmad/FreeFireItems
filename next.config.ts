import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export", // Enables static HTML export out of the box
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
