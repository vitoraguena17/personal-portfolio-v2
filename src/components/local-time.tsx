"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/** Hora atual em São Paulo. No servidor não há hora "certa", então fica um traço. */
export function LocalTime({ timeZone, locale }: { timeZone: string; locale: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date()),
    () => "--:--",
  );

  return <time className="tabular-nums">{time}</time>;
}
