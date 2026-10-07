import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 para as capas dos projetos, que têm texto pequeno (prints e mockups).
    qualities: [75, 90],
  },
  experimental: {
    // Dois root layouts (PT e EN) pedem um 404 global próprio.
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
