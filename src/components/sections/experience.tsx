import type { Dictionary, Locale } from "@/content/site";
import { certifications, education, experience } from "@/content/site";
import { SectionLabel, Title } from "../title";

export function Experience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.experience;

  return (
    <section id="experience" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <SectionLabel index="03">{t.label}</SectionLabel>
            <Title
              lines={t.title}
              className="mt-6 text-[clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <ol className="border-t border-line">
            {experience.map((item, i) => (
              <li
                key={item.place}
                data-reveal
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
                className="group relative grid gap-4 border-b border-line py-10 sm:grid-cols-[11.5rem_1fr] md:py-12"
              >
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{item.period[locale]}</p>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{item.title[locale]}</h3>
                  <p className="mt-1 font-serif text-lg italic text-blue-soft">{item.place}</p>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted">{item.text[locale]}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-12 sm:grid-cols-2 md:mt-20">
            <div data-reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.education}</p>
              <p className="mt-5 text-xl font-medium tracking-tight">{education.title[locale]}</p>
              <p className="mt-1 font-serif text-lg italic text-blue-soft">{education.place}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">{education.period}</p>
            </div>
            <div data-reveal style={{ "--delay": "80ms" } as React.CSSProperties}>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{t.certifications}</p>
              <ul className="mt-5 space-y-2.5">
                {certifications.map((cert) => (
                  <li key={cert} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-blue" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
