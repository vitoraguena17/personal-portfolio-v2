"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./scroll-loop";

/** Conta até o valor quando entra na tela. Texto não numérico fica como está. */
export function CountUp({ value }: { value: string }) {
  const n = Number(value);
  const numeric = Number.isFinite(n) && value.trim() !== "";
  const from = numeric ? Math.max(0, n - 12) : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numeric || prefersReducedMotion()) return;
    const el = ref.current!;
    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 4);
        setShown(String(Math.round(from + (n - from) * eased)));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      setShown(String(from));
      frame = requestAnimationFrame(step);
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [numeric, n, from]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
