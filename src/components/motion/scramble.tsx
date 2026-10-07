"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll-loop";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_#*";

/**
 * Texto que embaralha e se resolve letra a letra, como um terminal.
 * Dispara no hover do elemento pai mais próximo (link ou botão) ou, com
 * `onView`, quando entra na tela. Pensado para fonte mono, sem pular largura.
 */
export function Scramble({ text, onView = false, className }: { text: string; onView?: boolean; className?: string }) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current!;
    if (prefersReducedMotion()) return;

    function run() {
      cancelAnimationFrame(frame.current);
      const start = performance.now();
      const duration = 380 + text.length * 22;
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const solved = Math.floor(t * text.length);
        setDisplay(
          text
            .split("")
            .map((ch, i) => (i < solved || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
            .join(""),
        );
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    }

    const trigger = el.closest("a, button") ?? el;
    if (onView) {
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      });
      io.observe(el);
      return () => io.disconnect();
    }
    trigger.addEventListener("pointerenter", run);
    return () => {
      trigger.removeEventListener("pointerenter", run);
      cancelAnimationFrame(frame.current);
    };
  }, [text, onView]);

  return (
    <span className={className}>
      <span aria-hidden ref={ref}>
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
