// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["your-domain.com"],
//   },
//   experimental: {
//     serverActions: {}, // ✅ Must be an object, not a boolean
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Only if you're using next/image with external image domains:
  // images: {
  //   domains: ["your-cdn.com"],
  // },
};

export default nextConfig;
