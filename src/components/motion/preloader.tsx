"use client";

import { useEffect, useState } from "react";
import { Logo } from "../logo";

import { INTRO_KEY } from "./intro-script";

/**
 * Abertura: a logo se desenha, o contador chega a 100 e a cortina sobe.
 * Aparece uma vez por sessão. O script inline do <body> já marca .intro-done
 * quando não deve aparecer (visita repetida, movimento reduzido ou timeout),
 * então não há flash. As animações do hero esperam .intro-done para começar.
 */
export function Preloader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-done")) return;

    const start = performance.now();
    const duration = 1700;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    const done = setTimeout(() => {
      root.classList.add("intro-done");
      try {
        sessionStorage.setItem(INTRO_KEY, "1");
      } catch {}
    }, duration + 250);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, []);

  return (
    <div aria-hidden className="preloader fixed inset-0 z-[100] flex-col bg-ink">
      <div className="flex flex-1 items-center justify-center px-8">
        <Logo className="preloader-logo w-[min(78vw,560px)] text-fg" />
      </div>
      <div className="flex items-end justify-between px-5 pb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:px-10 md:pb-10">
        <span>Vitor Aguena · Portfolio</span>
        <span className="text-5xl font-medium tracking-[-0.04em] text-fg tabular-nums md:text-7xl">
          {String(count).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
