"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fragment, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const dots = ["bg-brand", "bg-teal", "bg-sun"];

function Line({ words, outline }: { words: string[]; outline?: boolean }) {
  const items = [...words, ...words, ...words];
  return (
    <p
      data-band
      className={`font-display flex w-max items-center gap-6 text-5xl font-extrabold tracking-tight whitespace-nowrap sm:text-7xl ${
        outline ? "text-transparent [-webkit-text-stroke:1.5px_#0b57c2]" : "text-navy"
      }`}
    >
      {items.map((w, i) => (
        <Fragment key={i}>
          <span>{w}</span>
          <span className={`size-4 shrink-0 rounded-[4px] sm:size-5 ${dots[i % dots.length]}`} />
        </Fragment>
      ))}
    </p>
  );
}

/** Two rows of big words that slide in opposite directions as you scroll. */
export function ScrollTextBand({ words }: { words: string[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const [a, b] = gsap.utils.toArray<HTMLElement>("[data-band]");
        const scrollTrigger = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
        gsap.fromTo(a, { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger });
        gsap.fromTo(b, { xPercent: -30 }, { xPercent: 0, ease: "none", scrollTrigger: { ...scrollTrigger } });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="-mx-4 mt-10 space-y-3 overflow-hidden py-6 select-none sm:-mx-6 lg:-mx-8">
      <Line words={words} />
      <Line words={words} outline />
    </div>
  );
}
