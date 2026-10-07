"use client";

import { useRef } from "react";
import { useScrollFrame } from "./scroll-loop";

/**
 * Faixa infinita que acelera com a velocidade do scroll e inverte o sentido
 * quando a página sobe. A lista vem duplicada para o loop não ter emenda.
 */
export function VelocityMarquee({ children, speed = 0.6 }: { children: React.ReactNode; speed?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, dir: 1 });

  useScrollFrame(({ velocity }) => {
    const el = track.current;
    if (!el) return;
    const s = state.current;
    if (Math.abs(velocity) > 0.5) s.dir = velocity > 0 ? 1 : -1;
    s.x -= (speed + Math.min(Math.abs(velocity) * 0.25, 14)) * s.dir;
    const half = el.scrollWidth / 2;
    if (s.x <= -half) s.x += half;
    if (s.x > 0) s.x -= half;
    const skew = Math.max(-8, Math.min(8, velocity * -0.25));
    el.style.transform = `translate3d(${s.x}px, 0, 0) skewX(${skew}deg)`;
  });

  return (
    <div ref={track} className="flex w-max will-change-transform">
      {children}
      {children}
    </div>
  );
}
