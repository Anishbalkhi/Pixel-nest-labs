import { techStack } from "@/content/site";

const colors = ["bg-brand", "bg-teal", "bg-sun", "bg-sky"];

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <ul
        className={`flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white/85"
          >
            <span className={`size-2.5 rounded-[3px] ${colors[i % colors.length]}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  const half = Math.ceil(techStack.length / 2);
  return (
    <section
      aria-label="Technologies we use"
      className="group bg-navy relative mt-6 overflow-hidden rounded-[2rem] py-10"
    >
      <div className="pixel-grid-dark absolute inset-0" aria-hidden />
      <p className="text-teal relative mb-6 px-6 text-center text-xs font-semibold tracking-[0.18em] uppercase">
        Our tech stack
      </p>
      <div className="relative space-y-3">
        <Row items={techStack.slice(0, half)} />
        <Row items={techStack.slice(half)} reverse />
      </div>
    </section>
  );
}
