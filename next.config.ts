import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático (pasta out/), publicado no Cloudflare Pages.
  output: "export",
  images: {
    // Sem servidor para otimizar: as variantes saem de `npm run images`.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
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
