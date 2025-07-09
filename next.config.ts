import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["your-domain.com"],
  },
  experimental: {
    serverActions: {}, // ✅ Must be an object, not a boolean
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
