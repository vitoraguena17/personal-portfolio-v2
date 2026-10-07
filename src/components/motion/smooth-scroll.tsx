"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { prefersReducedMotion } from "./scroll-loop";

let instance: Lenis | null = null;

/** Rola até uma âncora da página, com Lenis quando disponível. */
export function scrollToHash(hash: string) {
  const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return;
  if (instance) {
    // O Lenis já respeita o scroll-padding-top do <html> (espaço do cabeçalho).
    instance.scrollTo(target, { force: true });
  } else if (target === 0) {
    window.scrollTo({ top: 0 });
  } else {
    target.scrollIntoView();
  }
  history.replaceState(null, "", hash === "#top" ? location.pathname : hash);
}

/**
 * Rolagem suave (Lenis) e cliques em âncoras internas. O Lenis pausa sozinho
 * quando o <html> fica com overflow hidden (preloader e menu mobile).
 * Quem prefere movimento reduzido fica com a rolagem nativa.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!prefersReducedMotion()) {
      instance = new Lenis({ autoRaf: true, autoToggle: true, stopInertiaOnNavigate: true });
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href")!;
      if (hash.length < 2) return;
      event.preventDefault();
      // Dois frames: dá tempo do menu mobile fechar e liberar o scroll.
      requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(hash)));
    }

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
