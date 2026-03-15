import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/destinations", destination: "/explore", permanent: true },
      { source: "/blog", destination: "/tips-guides", permanent: true },
    ];
  },
};

export default nextConfig;
