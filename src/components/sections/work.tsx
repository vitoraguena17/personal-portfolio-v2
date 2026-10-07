import Image from "next/image";
import type { Dictionary, Locale, Project } from "@/content/site";
import { archive, projects } from "@/content/site";
import { ArrowUpRight } from "../icons";
import { Parallax } from "../motion/parallax";
import { SectionLabel, Title } from "../title";

export function Work({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.work;

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index="01">{t.label}</SectionLabel>
          <Title
            lines={t.title}
            className="mt-6 text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          />
        </div>
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          ( {String(projects.length).padStart(2, "0")} )
        </p>
      </div>

      <div className="mt-20 space-y-24 md:mt-28 md:space-y-40">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} locale={locale} dict={dict} />
        ))}
      </div>

      <div className="mt-32 md:mt-44">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {t.archive}
        </p>
        <ul className="mt-6 border-t border-line">
          {archive.map((item, i) => (
            <li key={item.title} data-reveal style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group relative grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line py-5 sm:grid-cols-[1fr_14rem_5rem_auto]"
              >
                <span className="text-lg tracking-tight transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-2xl">
                  {item.title}
                </span>
                <span className="hidden font-mono text-xs text-muted sm:block">{item.stack}</span>
                <span className="hidden font-mono text-xs text-muted sm:block">{item.year}</span>
                <ArrowUpRight className="size-4 text-muted transition-all duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
  locale,
  dict,
}: {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group/row grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
      <a
        href={project.href ?? project.repo}
        target="_blank"
        rel="noreferrer"
        data-reveal-clip
        data-cursor={`${dict.work.visit} ↗`}
        aria-label={`${dict.work.visit}: ${project.title}`}
        className={`group relative block overflow-hidden rounded-2xl border border-line bg-ink-2 md:col-span-7 ${
          flip ? "md:order-2 md:col-start-6" : ""
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Parallax amount={7} className="absolute -inset-y-[8%] inset-x-0">
            <Image
              src={project.image.src}
              alt={project.image.alt[locale]}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover object-top transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.045]"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-blue mix-blend-color opacity-0 transition-opacity duration-700 group-hover:opacity-35" />
        </div>
        <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-fg text-ink [@media(hover:hover)]:hidden">
          <ArrowUpRight className="size-4" />
        </span>
      </a>

      <div data-reveal style={{ "--delay": "120ms" } as React.CSSProperties} className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <span className="text-blue">{number}</span>
          <span className="h-px w-6 bg-line-strong" />
          {project.year}
        </p>
        <h3 className="mt-5 text-4xl font-medium tracking-[-0.04em] transition-transform duration-700 ease-out-expo group-hover/row:translate-x-2 md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <p className="mt-2 font-serif text-xl italic text-blue-soft md:text-2xl">{project.role[locale]}</p>
        <p className="mt-6 max-w-md leading-relaxed text-muted">{project.summary[locale]}</p>

        <ul className="mt-7 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-muted">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex gap-6">
          {project.href && <TextLink href={project.href}>{dict.work.visit}</TextLink>}
          {project.repo && <TextLink href={project.repo}>{dict.work.code}</TextLink>}
        </div>
      </div>
    </article>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 text-sm text-fg"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-line-strong" />
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-blue transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
      </span>
      <ArrowUpRight className="size-3.5 text-blue transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}
