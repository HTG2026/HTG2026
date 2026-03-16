import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "s1.ticketm.net", pathname: "/**" },
      { protocol: "https", hostname: "media.kennedyspacecenter.com", pathname: "/**" },
      { protocol: "https", hostname: "www.gatorland.com", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
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
