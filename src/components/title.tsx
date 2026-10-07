import { Fragment } from "react";
import { Scramble } from "./motion/scramble";

/** Converte "*palavra*" no destaque da marca: serifa itálica em azul. */
export function Emphasis({ text }: { text: string }) {
  return text.split(/\*(.+?)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="pr-[0.06em] font-serif font-normal italic tracking-[-0.01em] text-blue">
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

type TitleProps = {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
  /** "scroll" revela ao entrar na tela; "load" anima assim que a página abre. */
  trigger?: "scroll" | "load";
};

export function Title({ lines, as: Tag = "h2", className, trigger = "scroll" }: TitleProps) {
  return (
    <Tag className={className} {...(trigger === "scroll" ? { "data-reveal-lines": "" } : {})}>
      {lines.map((line, i) => (
        <span key={line} className="line-mask">
          <span
            className={trigger === "load" ? "animate-line" : undefined}
            style={{ "--i": i, animationDelay: `${200 + i * 110}ms` } as React.CSSProperties}
          >
            <Emphasis text={line} />
          </span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p data-reveal className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
      <span className="text-blue">{index}</span>
      <span className="h-px w-10 bg-line-strong" />
      <Scramble text={children} onView />
    </p>
  );
}
