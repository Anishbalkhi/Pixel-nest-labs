"use client";

import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { HeroPixels } from "@/components/brand/HeroPixels";
import { hero, labProjects } from "@/content/site";
import { LabEffects } from "./LabEffects";
import { LabPreview } from "./LabPreviews";

/** Background of each card in the work strip. */
const stripColors = ["#0b57c2", "#1fb89a", "#0a0f2c", "#f7a21b"];

/** The three headline lines; `tone` paints a word as a colour block. */
const lines: { text: string; tone?: "blue" | "sun" | "teal" }[][] = [
  [{ text: "We" }, { text: "build" }],
  [{ text: "digital" }, { text: "products," }],
  [
    { text: "pixel", tone: "blue" },
    { text: "by", tone: "sun" },
    { text: "pixel.", tone: "teal" },
  ],
];
const toneClass = {
  blue: "text-brand",
  sun: "bg-sun px-[0.12em]",
  teal: "bg-teal px-[0.12em]",
};

/**
 * Hero: the headline set huge across the page, the pixel logo assembling
 * beside it, a yellow ticker of what we make, and a strip of demo work that
 * slides past underneath. Thin ink rules frame each band.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -12]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  let wordIndex = 0;

  return (
    <section ref={ref} data-hero className="border-navy/15 relative mt-4 overflow-hidden border bg-white">
      <div
        className="pixel-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_65%)] opacity-70"
        aria-hidden
      />

      {/* Top rule: what we do, and that we're taking work */}
      <div className="border-navy/15 text-navy relative flex items-center justify-between gap-4 border-b px-5 py-3 text-[11px] font-bold tracking-[0.2em] uppercase sm:px-8">
        <span>{hero.eyebrow}</span>
        <span className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="bg-teal absolute inline-flex size-full animate-ping rounded-full opacity-70" />
            <span className="bg-teal relative inline-flex size-2 rounded-full" />
          </span>
          <span className="hidden sm:inline">Taking new projects</span>
          <span className="sm:hidden">Open</span>
        </span>
      </div>

      <div className="relative grid gap-8 px-5 pt-8 pb-8 sm:px-8 lg:grid-cols-[1fr_300px] lg:items-end lg:gap-12 lg:pt-12 lg:pb-10">
        <motion.h1
          style={{ y: titleY }}
          className="font-condensed text-navy text-[11vw] leading-[0.9] uppercase sm:text-[10vw] lg:text-[8vw] xl:text-[min(8.6vw,7.8rem)]"
          aria-label={hero.title}
        >
          {lines.map((line, li) => (
            <span key={li} className="block overflow-hidden pt-[0.04em]" aria-hidden>
              {line.map((w, wi) => {
                const i = wordIndex++;
                return (
                  <span key={wi}>
                    {/* CSS animation, so the headline shows before JavaScript loads */}
                    <span
                      className={`word-rise inline-block ${w.tone ? toneClass[w.tone] : ""}`}
                      style={{ ["--d" as string]: `${80 + i * 70}ms` }}
                    >
                      {w.text}
                    </span>
                    {wi < line.length - 1 ? " " : null}
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        <div className="fade-up flex flex-col gap-6" style={{ ["--d" as string]: "500ms" }}>
          <motion.div style={{ rotate: markRotate }} className="w-40 sm:w-52 lg:w-full lg:max-w-[300px] lg:self-end">
            <HeroPixels className="w-full overflow-visible" />
          </motion.div>
          <p className="text-navy/80 text-base sm:text-lg">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group bg-navy hover:bg-brand inline-flex items-center gap-2 px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors"
            >
              Start a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link
              href={hero.primaryCta.href}
              className="border-navy text-navy hover:bg-navy inline-flex items-center gap-2 border px-6 py-3.5 text-[13px] font-semibold tracking-[0.08em] uppercase transition-colors hover:text-white"
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Yellow ticker of what we make */}
      <div className="border-navy bg-sun relative overflow-hidden border-y py-3" aria-hidden>
        <ul className="animate-marquee flex w-max motion-reduce:animate-none">
          {[0, 1].flatMap((copy) =>
            [...hero.rotating, ...hero.rotating].map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className="font-condensed text-navy flex items-center gap-6 pr-6 text-2xl whitespace-nowrap uppercase sm:text-3xl"
              >
                {item}
                <span className={`size-3 ${["bg-brand", "bg-navy", "bg-teal"][i % 3]}`} />
              </li>
            )),
          )}
        </ul>
      </div>
      <p className="sr-only">We make {hero.rotating.join(", ")}.</p>

      {/* Strip of demo work sliding past. Paused off screen (LabEffects) and on hover. */}
      <div id="hero-work" data-lab className="group/strip relative overflow-hidden py-6" aria-hidden>
        <LabEffects sectionId="hero-work" />
        <ul className="flex w-max animate-[marquee_70s_linear_infinite] gap-4 pl-4 group-hover/strip:[animation-play-state:paused] motion-reduce:animate-none">
          {[...labProjects, ...labProjects, ...labProjects, ...labProjects].map((p, i) => (
            <li key={i} className="w-[280px] shrink-0 sm:w-[340px]">
              <div
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden px-4"
                style={{ background: stripColors[i % stripColors.length] }}
              >
                <div className="pixel-grid-dark absolute inset-0" />
                <div className="relative w-full scale-[0.86]">
                  <LabPreview kind={p.preview} />
                </div>
              </div>
              <div className="border-navy/15 flex items-baseline justify-between gap-3 border-b py-2.5">
                <span className="text-navy truncate text-sm font-semibold">{p.title}</span>
                <span className="text-navy/60 shrink-0 text-[10px] font-bold tracking-[0.18em] uppercase">
                  {p.label}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom rule */}
      <div className="border-navy/15 text-navy relative flex items-center justify-between gap-4 border-t px-5 py-3 text-[11px] font-bold tracking-[0.2em] uppercase sm:px-8">
        <Link href="/#lab" className="hover:text-brand transition-colors">
          See the lab →
        </Link>
        <span className="flex items-center gap-2">
          Scroll <ArrowDown className="size-3.5 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
