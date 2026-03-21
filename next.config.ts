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
      { protocol: "https", hostname: "s3-media0.fl.yelpcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "s3-media1.fl.yelpcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "s3-media2.fl.yelpcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "s3-media3.fl.yelpcdn.com", pathname: "/**" },
      { protocol: "https", hostname: "fastly.4sqi.net", pathname: "/**" },
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
