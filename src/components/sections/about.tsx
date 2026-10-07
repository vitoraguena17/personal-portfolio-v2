import type { Dictionary, Locale } from "@/content/site";
import { capabilities } from "@/content/site";
import { CountUp } from "../motion/count-up";
import { GlowGrid } from "../motion/glow-grid";
import { Portrait } from "../motion/portrait";
import { SectionLabel, Title } from "../title";

export function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.about;

  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-ink-2/40">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid gap-14 md:grid-cols-12 md:gap-12">
          <figure data-reveal className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <Portrait alt={t.photoAlt} hint={t.photoHint} />
            <figcaption className="mt-4 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>Vitor Aguena</span>
              <span>São Paulo, BR</span>
            </figcaption>
          </figure>

          <div className="md:col-span-6 md:col-start-7 md:pt-4">
            <SectionLabel index="02">{t.label}</SectionLabel>
            <Title
              lines={t.title}
              className="mt-6 text-[clamp(2.6rem,6.5vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            />
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-muted">
              {t.paragraphs.map((p, i) => (
                <p key={i} data-reveal style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}>
                  {p}
                </p>
              ))}
            </div>

            <dl className="mt-14 grid grid-cols-3 border-t border-line">
              {t.facts.map((fact, i) => (
                <div
                  key={fact.label}
                  data-reveal
                  style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
                  className="border-r border-line pt-6 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-6"
                >
                  <dt className="sr-only">{fact.label}</dt>
                  <dd className="text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                    <CountUp value={fact.value} />
                  </dd>
                  <dd className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:text-[11px]">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-28 md:mt-40">
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {t.capabilities}
          </p>
          <GlowGrid className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((group, i) => (
              <div
                key={group.title.en}
                data-reveal
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
                data-glow
                className="group bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 md:p-8"
              >
                <p className="flex items-center justify-between">
                  <span className="text-lg font-medium tracking-tight">{group.title[locale]}</span>
                  <span className="font-mono text-[11px] text-blue">0{i + 1}</span>
                </p>
                <ul className="mt-8 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <span className="h-px w-3 bg-line-strong transition-all duration-500 group-hover:w-5 group-hover:bg-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </GlowGrid>
        </div>
      </div>
    </section>
  );
}
