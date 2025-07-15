import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export temporarily to test
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
