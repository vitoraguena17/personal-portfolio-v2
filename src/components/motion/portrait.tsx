"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Retrato em preto e branco com uma "lente" que revela a cor ao redor do
 * cursor. A lente segue o mouse com uma leve inércia. No toque (ou clique),
 * alterna entre P&B e colorido.
 */
export function Portrait({ alt, hint }: { alt: string; hint: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function apply() {
    ref.current!.style.setProperty("--lx", `${pos.current.x}px`);
    ref.current!.style.setProperty("--ly", `${pos.current.y}px`);
  }

  function follow() {
    const p = pos.current;
    const t = target.current;
    p.x += (t.x - p.x) * 0.16;
    p.y += (t.y - p.y) * 0.16;
    apply();
    if (Math.abs(t.x - p.x) > 0.3 || Math.abs(t.y - p.y) > 0.3) {
      frame.current = requestAnimationFrame(follow);
    } else {
      frame.current = 0;
    }
  }

  function point(e: React.PointerEvent<HTMLDivElement>) {
    const r = ref.current!.getBoundingClientRect();
    target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onEnter(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    // A lente nasce onde o cursor entrou, sem deslizar do centro.
    point(e);
    pos.current = { ...target.current };
    apply();
  }

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    point(e);
    if (!frame.current) frame.current = requestAnimationFrame(follow);
  }

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onClick={() => setColor((v) => !v)}
      data-color={color || undefined}
      className="portrait group/portrait relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-3"
    >
      <Image
        src="/me/vitor-aguena-bw.jpg"
        alt={alt}
        fill
        sizes="(min-width: 768px) 40vw, 100vw"
        className="object-cover object-top transition-transform duration-[1.4s] ease-out-expo group-hover/portrait:scale-[1.03]"
      />
      <Image
        src="/me/vitor-aguena-color.jpg"
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 768px) 40vw, 100vw"
        className="portrait-color object-cover object-top group-hover/portrait:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
      <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg backdrop-blur-md transition-opacity duration-500 group-hover/portrait:opacity-0">
        <span className="size-1.5 rounded-full bg-gradient-to-r from-[#e8b29a] to-blue" />
        {hint}
      </span>
    </div>
  );
}
