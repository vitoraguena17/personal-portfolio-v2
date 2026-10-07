"use client";

import { useEffect } from "react";

/**
 * Observa todo elemento com data-reveal, data-reveal-lines ou data-reveal-clip e marca data-in
 * quando ele entra na tela. Um observer só para a página inteira.
 */
export function RevealRoot() {
  useEffect(() => {
    // Sinal para o script inline de que o React assumiu a página.
    document.documentElement.classList.add("hydrated");
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-lines], [data-reveal-clip]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
