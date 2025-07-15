import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production-only settings for static export
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  })
};

export default nextConfig;
