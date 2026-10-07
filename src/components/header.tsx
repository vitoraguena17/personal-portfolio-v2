"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/site";
import { Logo, LogoMark } from "./logo";
import { Magnetic } from "./motion/magnetic";
import { Scramble } from "./motion/scramble";
import { useScrollFrame } from "./motion/scroll-loop";

type Props = {
  dict: Pick<Dictionary, "nav" | "menu" | "switchLanguage" | "status">;
  home: string;
};

export function Header({ dict, home }: Props) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const progress = useRef<HTMLSpanElement>(null);

  const links = [
    { href: "#work", label: dict.nav.work },
    { href: "#about", label: dict.nav.about },
    { href: "#experience", label: dict.nav.experience },
    { href: "#contact", label: dict.nav.contact },
  ];

  // Esconde ao descer e volta ao subir; ganha fundo depois do topo.
  useEffect(() => {
    let last = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > last);
      last = y;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Barra de progresso da leitura.
  useScrollFrame(({ y }) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  });

  // Seção visível no momento, para marcar o link ativo.
  useEffect(() => {
    const sections = ["work", "about", "experience", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[translate,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
        hidden && !open ? "-translate-y-full" : ""
      } ${scrolled || open ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href={home} aria-label="Vitor Aguena" className="group relative z-10 text-fg" onClick={() => setOpen(false)}>
          <LogoMark className="h-7 w-auto md:hidden" />
          <Logo className="hidden h-6 w-auto transition-opacity duration-300 group-hover:opacity-80 md:block" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? "true" : undefined}
              className="group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg aria-[current]:text-fg"
            >
              <span
                className={`size-1 rounded-full bg-blue transition-all duration-500 ease-out-expo ${
                  active === link.href ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              />
              <Scramble text={link.label} />
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href={dict.switchLanguage.href}
            aria-label={dict.switchLanguage.aria}
            hrefLang={dict.switchLanguage.href === "/" ? "pt-BR" : "en"}
            className="grid h-9 place-items-center rounded-full border border-line-strong px-3 font-mono text-[11px] tracking-[0.16em] text-muted transition-colors hover:border-blue hover:text-fg"
          >
            {dict.switchLanguage.label}
          </Link>
          <div className="hidden sm:block">
            <Magnetic strength={0.25}>
              <a
                href="#contact"
                className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-4 text-sm font-medium text-ink transition-colors hover:bg-blue hover:text-white"
              >
                <span className="size-1.5 animate-pulse-dot rounded-full bg-blue" />
                {dict.nav.contact}
              </a>
            </Magnetic>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.menu.close : dict.menu.open}
            className="grid size-9 place-items-center rounded-full border border-line-strong lg:hidden"
          >
            <span className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-300 ${open ? "-translate-y-[4px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <span
        ref={progress}
        aria-hidden
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-blue"
      />

      {/* Menu em tela cheia abaixo de lg */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-16 h-[calc(100dvh-4rem)] bg-ink px-5 pb-10 pt-10 md:top-20 md:h-[calc(100dvh-5rem)] md:px-10 lg:hidden"
      >
        <nav aria-label="Menu" className="flex h-full flex-col justify-between">
          <ul className="space-y-2">
            {links.map((link, i) => (
              <li key={link.href} className="animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-2 text-5xl font-medium tracking-tight sm:text-6xl"
                >
                  <span className="font-mono text-xs text-blue">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="size-1.5 animate-pulse-dot rounded-full bg-blue" />
            {dict.status}
          </p>
        </nav>
      </div>
    </header>
  );
}
