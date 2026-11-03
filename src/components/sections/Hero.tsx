"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { HeroPixels } from "@/components/brand/HeroPixels";
import { seeded } from "@/components/brand/pixels";
import { Magnetic } from "@/components/motion/effects";
import { hero } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const words = hero.title.split(" ");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll parallax: the mark sinks and turns, the copy lifts and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -10]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.82]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  // Soft light that follows the cursor across the hero.
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      data-hero
      onPointerMove={onPointerMove}
      className="bg-navy relative mt-4 overflow-hidden rounded-[2rem] px-6 pt-12 pb-10 text-white sm:px-10 sm:pt-16 lg:flex lg:min-h-[min(calc(100dvh-6rem),860px)] lg:items-center lg:px-14"
    >
      <div className="pixel-grid-dark absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 70%) var(--my, 40%), rgb(31 184 154 / 0.16), transparent 60%)",
        }}
      />
      <div className="bg-brand/40 absolute -top-40 -right-32 size-[30rem] rounded-full blur-[120px]" aria-hidden />
      <div className="bg-teal/25 absolute -bottom-40 -left-24 size-[26rem] rounded-full blur-[120px]" aria-hidden />
      {Array.from({ length: 14 }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="animate-drift absolute rounded-[3px] opacity-60"
          style={{
            left: `${(4 + seeded(i + 3) * 92).toFixed(1)}%`,
            top: `${(6 + seeded(i + 21) * 86).toFixed(1)}%`,
            width: 6 + Math.round(seeded(i + 9) * 10),
            height: 6 + Math.round(seeded(i + 9) * 10),
            background: ["#1fb89a", "#0b57c2", "#f7a21b"][i % 3],
            animationDelay: `${(-seeded(i) * 9).toFixed(1)}s`,
            animationDuration: `${(7 + seeded(i + 60) * 6).toFixed(1)}s`,
          }}
        />
      ))}

      <div className="relative grid w-full items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: copyY, opacity: copyOpacity }}>
          {/* Eyebrow and buttons fade up with CSS so they're in the page before JavaScript runs. */}
          <p className="fade-up text-teal inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            <span className="bg-sun size-1.5 animate-pulse rounded-[2px]" /> {hero.eyebrow}
          </p>

          <h1 className="font-display mt-5 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl xl:text-7xl">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                {/* CSS animation, so the headline shows before JavaScript loads */}
                <span
                  className={`word-rise inline-block ${word.startsWith("pixel") ? "text-teal" : ""}`}
                  style={{ ["--d" as string]: `${100 + i * 60}ms` }}
                >
                  {word}
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h1>

          <RotatingLine />

          <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">{hero.subtitle}</p>

          <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "650ms" }}>
            <Magnetic>
              <Link
                href={hero.primaryCta.href}
                className="group bg-teal text-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors hover:bg-white"
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                <MessageCircle className="size-4" /> {hero.secondaryCta.label}
              </a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          style={{ y: markY, rotate: markRotate, scale: markScale }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          <HeroPixels className="w-full overflow-visible drop-shadow-[0_20px_40px_rgb(0_0_0/0.35)]" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-4 hidden text-center text-xs text-white/40 md:block"
            aria-hidden
          >
            Move your cursor over the pixels
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold tracking-[0.2em] text-white/40 uppercase lg:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/25 pt-1.5">
          <motion.span
            className="bg-teal size-1.5 rounded-[2px]"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

/** "We make: Websites / Shopify stores / ..." with the last word flipping every couple of seconds. */
function RotatingLine() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % hero.rotating.length), 2200);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <p className="font-display mt-4 flex items-center gap-2 text-lg font-bold text-white/60 sm:text-xl">
      We make
      <span className="text-sun relative inline-flex h-[1.4em] min-w-[10ch] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={hero.rotating[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="whitespace-nowrap"
          >
            {hero.rotating[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}
