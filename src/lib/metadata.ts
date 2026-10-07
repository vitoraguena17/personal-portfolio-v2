import type { Metadata, Viewport } from "next";
import type { Locale } from "@/content/site";
import { dictionary } from "@/content/site";

export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://vitoraguena.pages.dev");

export function buildMetadata(locale: Locale): Metadata {
  const { meta } = dictionary[locale];
  const path = locale === "pt" ? "/" : "/en";
  // Imagem de compartilhamento (WhatsApp, LinkedIn, X…), uma por idioma.
  const image = {
    url: `/og/og-${locale}.jpg`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: locale === "pt" ? "Vitor Aguena: interfaces com precisão e personalidade" : "Vitor Aguena: interfaces with precision and personality",
  };

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
      alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
      images: [image],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image] },
  };
}

/** Cor da barra do navegador no celular e do realce em alguns apps. */
export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};
