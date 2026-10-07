import type { Dictionary } from "@/content/site";
import { profile } from "@/content/site";
import { CopyEmail } from "../copy-email";
import { ArrowUpRight, Download } from "../icons";
import { LocalTime } from "../local-time";
import { Magnetic } from "../motion/magnetic";
import { Spotlight } from "../spotlight";
import { SectionLabel, Title } from "../title";

export function Contact({ dict, lang }: { dict: Dictionary; lang: string }) {
  const t = dict.contact;

  return (
    <Spotlight className="group/spot relative isolate overflow-hidden border-t border-line">
      <section id="contact" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 left-1/2 -z-10 size-[min(120vw,1200px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(61_123_255/0.22),transparent_65%)] blur-3xl"
        />
        <SectionLabel index="04">{t.label}</SectionLabel>
        <Title
          lines={t.title}
          className="mt-6 text-[clamp(2.8rem,9vw,9rem)] font-medium leading-[0.92] tracking-[-0.055em]"
        />
        <p data-reveal className="mt-8 max-w-md text-lg text-muted">
          {t.text}
        </p>

        <div data-reveal className="mt-14 border-y border-line py-8">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center justify-between gap-6 text-[clamp(1.35rem,4.6vw,4rem)] font-medium tracking-[-0.04em]"
          >
            <span className="relative break-all">
              {profile.email}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-right scale-x-0 bg-blue transition-transform duration-700 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <Magnetic strength={0.4} className="shrink-0">
              <span className="grid size-12 place-items-center rounded-full border border-line-strong transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-blue group-hover:bg-blue md:size-20">
                <ArrowUpRight className="size-4 md:size-6" />
              </span>
            </Magnetic>
          </a>
          <div className="mt-6 flex items-center justify-between">
            <CopyEmail email={profile.email} label={t.copy} copiedLabel={t.copied} />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {t.local} · <LocalTime timeZone={profile.timeZone} locale={lang} />
            </p>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
          {profile.socials.map((s, i) => (
            <li key={s.label} data-reveal style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-blue-soft"
              >
                {s.label}
                <ArrowUpRight className="size-3.5 text-blue transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
          <li data-reveal style={{ "--delay": `${profile.socials.length * 60}ms` } as React.CSSProperties}>
            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-fg transition-colors hover:text-blue-soft"
            >
              {dict.cv}
              <Download className="size-3.5 text-blue transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5" />
            </a>
          </li>
        </ul>
      </section>
    </Spotlight>
  );
}
