import type { Metadata } from "next";
import type { Locale } from "@/content/site";
import { dictionary } from "@/content/site";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitoraguena.pages.dev");

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = dictionary[locale];
  const path = locale === "pt" ? "/" : "/en";

  return {
    metadataBase: siteUrl,
    title: meta.title,
    description: meta.description,
    authors: [{ name: "Vitor Aguena" }],
    alternates: {
      canonical: path,
      languages: { "pt-BR": "/", en: "/en" },
    },
    openGraph: {
      type: "website",
      url: path,
      title: meta.title,
      description: meta.description,
      siteName: "Vitor Aguena",
      locale: locale === "pt" ? "pt_BR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}
