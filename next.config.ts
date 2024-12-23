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
};

export default nextConfig;
