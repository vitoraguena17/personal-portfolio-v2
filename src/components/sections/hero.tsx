import type { Dictionary } from "@/content/site";
import { profile } from "@/content/site";
import { Arrow } from "../icons";
import { LocalTime } from "../local-time";
import { Magnetic } from "../motion/magnetic";
import { ScrollFade } from "../motion/parallax";
import { Spotlight } from "../spotlight";
import { Title } from "../title";

export function Hero({ dict, lang }: { dict: Dictionary; lang: string }) {
  const t = dict.hero;

  return (
    <Spotlight className="group/spot relative isolate flex flex-col overflow-hidden md:min-h-svh">
      <HeroBackdrop />

      <ScrollFade className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-14 pt-28 md:px-10 md:pb-12 md:pt-36">
        <div className="flex animate-fade items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <p className="flex items-center gap-2.5">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-blue" />
            {t.eyebrow}
          </p>
          <p className="hidden sm:block">
            {profile.location} · <LocalTime timeZone={profile.timeZone} locale={lang} />
          </p>
        </div>

        <Title
          as="h1"
          trigger="load"
          lines={t.lines}
          className="mt-20 text-[13.5vw] font-medium leading-[0.9] tracking-[-0.055em] md:mt-auto md:pt-16 md:text-[clamp(3.1rem,12.5vw,10.5rem)]"
        />

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <p
            className="max-w-md animate-rise text-base leading-relaxed text-muted md:col-span-5 md:text-lg"
            style={{ animationDelay: "650ms" }}
          >
            {t.intro}
          </p>

          <div
            className="flex animate-rise flex-wrap items-center gap-3 md:col-span-4 md:col-start-6"
            style={{ animationDelay: "780ms" }}
          >
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-blue pl-6 pr-2 text-sm font-medium text-white transition-colors hover:bg-[#2f6af0]"
              >
                {t.primary}
                <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">
                  <Arrow className="size-3.5 rotate-90" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 text-sm text-fg transition-colors hover:border-fg"
              >
                {t.secondary}
              </a>
            </Magnetic>
          </div>

          <a
            href="#work"
            className="hidden animate-fade items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-fg md:col-span-3 md:flex"
            style={{ animationDelay: "1s" }}
          >
            {t.scroll}
            <span className="relative block h-10 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-blue" />
            </span>
          </a>
        </div>
      </ScrollFade>
    </Spotlight>
  );
}

/*
 * Fundo do hero: grade fina que some nas bordas, um brilho azul e três linhas
 * na mesma inclinação da logo, como rastros de velocidade.
 */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent_75%)]" />
      <div className="absolute -right-[20%] -top-[30%] size-[min(90vw,1100px)] animate-fade rounded-full bg-[radial-gradient(circle,rgb(61_123_255/0.32),rgb(12_26_68/0.25)_40%,transparent_70%)] blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full animate-fade opacity-40 md:opacity-100"
        style={{ animationDelay: "400ms" }}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="speed" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#3d7bff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#3d7bff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#3d7bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 4, 8].map((o) => (
          <line
            key={o}
            x1={52 + o}
            y1="100"
            x2={78 + o}
            y2="0"
            stroke="url(#speed)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
    </div>
  );
}
