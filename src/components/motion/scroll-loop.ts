"use client";

import { useEffect, useRef } from "react";

/**
 * Um único loop de requestAnimationFrame para tudo que reage ao scroll
 * (parallax, marquee, fade do hero). Entrega a posição e uma velocidade suavizada.
 */
export type ScrollFrame = { y: number; velocity: number; vh: number };

const subscribers = new Set<(frame: ScrollFrame) => void>();
let running = false;
let lastY = 0;
let velocity = 0;

function tick() {
  if (subscribers.size === 0) {
    running = false;
    return;
  }
  const y = window.scrollY;
  velocity += (y - lastY - velocity) * 0.18;
  lastY = y;
  const frame = { y, velocity, vh: window.innerHeight };
  subscribers.forEach((fn) => fn(frame));
  requestAnimationFrame(tick);
}

export function subscribeScroll(fn: (frame: ScrollFrame) => void) {
  subscribers.add(fn);
  if (!running) {
    running = true;
    lastY = window.scrollY;
    requestAnimationFrame(tick);
  }
  return () => {
    subscribers.delete(fn);
  };
}

export function useScrollFrame(fn: (frame: ScrollFrame) => void, enabled = true) {
  const ref = useRef(fn);
  useEffect(() => {
    ref.current = fn;
  });
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    return subscribeScroll((frame) => ref.current(frame));
  }, [enabled]);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
