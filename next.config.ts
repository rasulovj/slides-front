import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // webpack: (config) => {
  //   config.resolve.fallback = {
  //     fs: false,
  //     path: false,
  //   };
  //   return config;
  // },
};

export default nextConfig;
