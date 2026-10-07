"use client";

import { useRef } from "react";

/**
 * Grade em que cada card recebe a posição do cursor (--gx, --gy) relativa a ele,
 * para um brilho que atravessa as bordas dos vizinhos.
 */
export function GlowGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    for (const card of ref.current!.querySelectorAll<HTMLElement>("[data-glow]")) {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--gx", `${e.clientX - r.left}px`);
      card.style.setProperty("--gy", `${e.clientY - r.top}px`);
    }
  }

  return (
    <div ref={ref} onPointerMove={onMove} className={`group/glow ${className ?? ""}`}>
      {children}
    </div>
  );
}
