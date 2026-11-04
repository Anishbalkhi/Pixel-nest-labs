import { techStack } from "@/content/site";
import { MarqueeBoost } from "./MarqueeBoost";

const colors = ["bg-brand", "bg-teal", "bg-sun", "bg-sky"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <ul
        data-row
        className={`flex w-max shrink-0 gap-3 pr-3 motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {/* Four copies so the loop never shows a gap, even on wide screens. */}
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="hover:border-teal/60 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white/85 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            <span className={`size-2.5 rounded-[3px] ${colors[i % colors.length]}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Tech stack strip. The rows drift on their own (CSS), and MarqueeBoost speeds them
 * up with your scroll speed, flips direction when you scroll up, and slows them on hover.
 */
export function TechMarquee() {
  const third = Math.ceil(techStack.length / 3);
  return (
    <section
      id="tech-stack"
      aria-label="Technologies we use"
      className="bg-navy relative mt-6 overflow-hidden rounded-[2rem] py-10"
    >
      <MarqueeBoost sectionId="tech-stack" />
      <div className="pixel-grid-dark absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="bg-brand/30 absolute top-1/2 left-1/2 h-40 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
      />
      <p className="text-teal relative mb-6 px-6 text-center text-xs font-semibold tracking-[0.18em] uppercase">
        Our tech stack
      </p>
      <div className="relative space-y-3">
        <Row items={techStack.slice(0, third)} />
        <Row items={techStack.slice(third, third * 2)} reverse />
        <Row items={techStack.slice(third * 2)} />
      </div>
      <p className="relative mt-6 px-6 text-center text-xs text-white/50">Scroll faster and watch it speed up</p>
    </section>
  );
}
