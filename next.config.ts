import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
