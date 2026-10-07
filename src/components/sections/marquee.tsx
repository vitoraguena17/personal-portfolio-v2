import { VelocityMarquee } from "../motion/velocity-marquee";

const ITEMS = ["Next.js", "Angular", "TypeScript", "React", "Tailwind CSS", "Python", "SQL", "Power BI", "GSAP", "Figma", "Cloudflare", "Performance", "UI/UX"];

/** Faixa da stack: acelera com o scroll e inverte quando a página sobe. */
export function Marquee({ items = ITEMS }: { items?: string[] }) {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <VelocityMarquee>
        {items.map((item) => (
          <span key={item} className="flex items-center gap-8 pr-8 text-2xl font-medium tracking-tight text-faint md:text-3xl">
            {item}
            <span className="font-serif text-3xl italic text-blue md:text-4xl">/</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}
