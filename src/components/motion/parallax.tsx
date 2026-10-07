"use client";

import { useRef } from "react";
import { useScrollFrame } from "./scroll-loop";

/**
 * Desloca o conteúdo conforme o bloco atravessa a tela. `amount` é o
 * deslocamento máximo em % da própria altura (positivo = mais devagar que o scroll).
 */
export function Parallax({
  children,
  amount = 8,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(({ vh }) => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return;
    // -1 quando o bloco entra por baixo, 1 quando sai por cima
    const p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
    el.style.transform = `translate3d(0, ${(p * amount).toFixed(2)}%, 0)`;
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Some e desce suavemente enquanto o hero sai da tela. */
export function ScrollFade({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollFrame(({ y, vh }) => {
    const el = ref.current;
    if (!el || y > vh * 1.2) return;
    const t = Math.min(1, y / (vh * 0.85));
    el.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
    el.style.opacity = String(1 - t * 0.9);
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
