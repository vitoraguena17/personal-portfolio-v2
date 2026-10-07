import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { introScript } from "./motion/intro-script";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/**
 * <html> e <body> compartilhados pelos dois root layouts (PT em "/" e EN em "/en").
 * O script no início do <body> marca .js (e decide a abertura) antes da pintura,
 * para as animações só esconderem conteúdo quando o JavaScript de fato roda.
 */
export function RootDocument({
  lang,
  intro = true,
  children,
}: {
  lang: string;
  /** false em páginas sem abertura (404): entra direto com .intro-done. */
  intro?: boolean;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}
    >
      <body id="top" className="grain min-h-svh overflow-x-clip">
        <script
          dangerouslySetInnerHTML={{
            __html: intro ? introScript : "document.documentElement.classList.add('js','intro-done')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
