import type { Locale } from "@/content/site";
import { dictionary } from "@/content/site";
import { Header } from "./header";
import { Cursor } from "./motion/cursor";
import { Preloader } from "./motion/preloader";
import { SmoothScroll } from "./motion/smooth-scroll";
import { RevealRoot } from "./reveal-root";
import { About } from "./sections/about";
import { Contact } from "./sections/contact";
import { Experience } from "./sections/experience";
import { Footer } from "./sections/footer";
import { Hero } from "./sections/hero";
import { Marquee } from "./sections/marquee";
import { Work } from "./sections/work";

const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en" };

export function Portfolio({ locale }: { locale: Locale }) {
  const dict = dictionary[locale];
  const lang = htmlLang[locale];

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-blue px-4 py-2 text-sm text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {dict.skip}
      </a>
      <Header dict={dict} home={locale === "pt" ? "/" : "/en"} />
      <main id="main">
        <Hero dict={dict} lang={lang} />
        <Marquee />
        <Work dict={dict} locale={locale} />
        <About dict={dict} locale={locale} />
        <Experience dict={dict} locale={locale} />
        <Contact dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
      <RevealRoot />
      <SmoothScroll />
      <Cursor />
      <Preloader />
    </>
  );
}
