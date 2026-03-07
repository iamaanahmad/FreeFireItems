import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  // Ignore image assets fetched externally preventing cache bloat inside SW, otherwise it scales indefinitely
  workboxOptions: {
    disableDevLogs: true,
  }
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export", // Enables static HTML export out of the box
  images: {
    unoptimized: true, // Required for static export
  },
};

export default withPWA(nextConfig);
