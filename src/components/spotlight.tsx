"use client";

import { useRef } from "react";

/**
 * Brilho azul que segue o cursor dentro do bloco. Só atualiza duas variáveis
 * CSS, sem re-render do React.
 */
export function Spotlight({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--y", `${event.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={className}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 [background:radial-gradient(520px_circle_at_var(--x,50%)_var(--y,40%),rgb(61_123_255/0.13),transparent_70%)] group-hover/spot:opacity-100"
      />
      {children}
    </div>
  );
}
