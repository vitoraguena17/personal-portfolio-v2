"use client";

import { useRef } from "react";

/** Puxa o elemento na direção do cursor enquanto ele está por perto. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  function onMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (e.pointerType !== "mouse") return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = "transform 0.2s ease-out";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function onLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
  }

  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
