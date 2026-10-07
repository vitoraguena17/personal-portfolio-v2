"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./scroll-loop";

/**
 * Cursor próprio em telas com mouse: um ponto que acompanha exato e um anel
 * que segue com atraso. Em links o anel cresce; em [data-cursor="Texto"] vira
 * uma bolha azul com o texto. Em touch e com movimento reduzido, não existe.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    function move(e: PointerEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.current!.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      root.classList.remove("cursor-hidden");
    }

    function over(e: PointerEvent) {
      const el = e.target as Element;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      const interactive = el.closest("a, button, [role='button'], label");
      ring.current!.dataset.state = labelled ? "label" : interactive ? "link" : "";
      label.current!.textContent = labelled?.dataset.cursor ?? "";
    }

    function loop() {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      ring.current!.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(loop);
    }

    const leave = () => root.classList.add("cursor-hidden");
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="cursor pointer-events-none fixed left-0 top-0 z-[90]">
      <div ref={ring} className="cursor-ring">
        <span className="cursor-ring-shape">
          <span ref={label} className="cursor-label" />
        </span>
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
