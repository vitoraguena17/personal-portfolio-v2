"use client";

import { useState } from "react";

export function CopyEmail({ email, label, copiedLabel }: { email: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
