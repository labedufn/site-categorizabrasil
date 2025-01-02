import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "painel.categorizabrasil.com.br",
        pathname: "/assets/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*.svg",
        headers: [
          {
            key: "Content-Type",
            value: "image/svg+xml; charset=utf-8",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
