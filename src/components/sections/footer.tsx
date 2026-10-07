import type { Dictionary } from "@/content/site";
import { profile } from "@/content/site";
import { LogoMark } from "../logo";
import { Magnetic } from "../motion/magnetic";
import { Scramble } from "../motion/scramble";

export function Footer({ dict }: { dict: Dictionary }) {
  const t = dict.footer;
  const links = [
    { href: "#work", label: dict.nav.work },
    { href: "#about", label: dict.nav.about },
    { href: "#experience", label: dict.nav.experience },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:grid-cols-12 md:py-20">
          <div className="col-span-2 md:col-span-5">
            <LogoMark className="h-8 w-auto text-fg" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">{t.tagline}</p>
          </div>

          <FooterList title={t.menu} className="md:col-span-2 md:col-start-7">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-fg/80 transition-colors hover:text-blue-soft">
                  <Scramble text={link.label} />
                </a>
              </li>
            ))}
          </FooterList>

          <FooterList title={t.social} className="md:col-span-2">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="text-fg/80 transition-colors hover:text-blue-soft">
                  <Scramble text={s.label} />
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} target="_blank" rel="noreferrer" className="text-fg/80 transition-colors hover:text-blue-soft">
                <Scramble text={dict.cv} />
              </a>
            </li>
          </FooterList>

          <div className="col-span-2 flex md:justify-end">
            <Magnetic strength={0.45}>
              <a
                href="#top"
                aria-label={t.top}
                data-cursor={t.top}
                className="group grid size-20 place-items-center rounded-full border border-line-strong transition-colors duration-500 hover:border-blue hover:bg-blue"
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" aria-hidden>
                  <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Vitor Aguena. {t.rights}</p>
          <p>{t.built}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{title}</p>
      <ul className="mt-5 space-y-2.5 font-mono text-xs uppercase tracking-[0.14em]">{children}</ul>
    </div>
  );
}
