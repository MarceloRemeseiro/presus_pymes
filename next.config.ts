import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: false
  },
  optimizeFonts: false,
  output: 'standalone'
};

export default nextConfig;
