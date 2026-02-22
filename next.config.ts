import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Satisfy Next.js 16 when webpack config is present (e.g. for Docker dev)
  turbopack: {},
  // Enable polling in dev so hot reload works when running in Docker (e.g. on Windows)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        ignored: ["**/node_modules"],
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
