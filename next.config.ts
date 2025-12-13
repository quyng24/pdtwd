import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-pdtwd-production.up.railway.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c8.alamy.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
