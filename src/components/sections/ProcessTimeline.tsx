"use client";

import { ArrowLeft, ArrowRight, CodeXml, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import { useId, useState, type CSSProperties } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { InView } from "@/components/motion/InView";
import { process } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

const icons = [Search, PenTool, CodeXml, Rocket, LifeBuoy];
/** Colour block for each step, and the text colour that reads on it. */
const tones = [
  { bg: "#0b57c2", fg: "#ffffff" },
  { bg: "#1fb89a", fg: "#0a0f2c" },
  { bg: "#f7a21b", fg: "#0a0f2c" },
  { bg: "#0e76a6", fg: "#ffffff" },
  { bg: "#0a0f2c", fg: "#ffffff" },
];
const pad = (n: number) => String(n).padStart(2, "0");

function StepPhoto({ i, className }: { i: number; className: string }) {
  const Icon = icons[i % icons.length];
  const step = process[i];
  return (
    <ImageSlot
      src={step.image}
      alt=""
      sizes="200px"
      hint={`process ${step.title.toLowerCase()}`}
      className={`border-2 border-current ${className}`}
      imageClassName="grayscale"
    >
      <div className="absolute inset-0 bg-white/10">
        <div className="pixel-grid-dark absolute inset-0" />
      </div>
      <span className="absolute inset-0 grid place-items-center">
        <Icon className="size-10" />
      </span>
    </ImageSlot>
  );
}

/**
 * "How we work". Desktop: five giant numbers side by side; the open step
 * widens into a colour block with its text and what you get at the end.
 * Hover, click, or use the arrows. Phones and tablets: the steps step down
 * the page like a staircase, all open.
 */
export function ProcessTimeline() {
  const [open, setOpen] = useState(0);
  const uid = useId();
  const go = (d: number) => setOpen((o) => (o + d + process.length) % process.length);

  return (
    <section
      id="process"
      className="border-navy/15 relative mt-6 overflow-hidden border bg-white px-5 py-14 sm:px-10 sm:py-16"
    >
      <div className="relative flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="How we work"
          title="A simple process, with no surprises."
          text="Five steps from first call to long-term support. You see progress every week."
        />
        {/* Number rail + arrows (desktop) */}
        <div className="hidden items-center gap-4 lg:flex" aria-hidden>
          <ol className="flex items-center">
            {process.map((s, i) => (
              <li key={s.title} className="flex items-center">
                {i > 0 ? (
                  <span className={`h-0.5 w-6 transition-colors ${i <= open ? "bg-navy" : "bg-navy/15"}`} />
                ) : null}
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setOpen(i)}
                  className={`font-condensed grid size-9 place-items-center border text-sm transition-colors ${
                    i === open
                      ? "border-navy bg-navy text-white"
                      : i < open
                        ? "border-navy text-navy"
                        : "border-navy/20 text-navy/40"
                  }`}
                >
                  {pad(i + 1)}
                </button>
              </li>
            ))}
          </ol>
          <div className="flex gap-2">
            <button
              type="button"
              tabIndex={-1}
              onClick={() => go(-1)}
              className="border-navy text-navy hover:bg-navy grid size-11 place-items-center border transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              onClick={() => go(1)}
              className="bg-navy hover:bg-brand grid size-11 place-items-center text-white transition-colors"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop: number accordion */}
      <ol className="relative mt-10 hidden h-[480px] gap-2 lg:flex">
        {process.map((step, i) => {
          const on = i === open;
          const t = tones[i % tones.length];
          return (
            <li
              key={step.title}
              onMouseEnter={() => setOpen(i)}
              style={
                {
                  flexGrow: on ? 6 : 1,
                  background: on ? t.bg : undefined,
                  color: on ? t.fg : undefined,
                } as CSSProperties
              }
              className={`relative min-w-0 basis-0 overflow-hidden border transition-[flex-grow,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                on ? "border-navy" : "border-navy/15 text-navy hover:bg-mist bg-white"
              }`}
            >
              <h3>
                <button
                  type="button"
                  id={`${uid}-h${i}`}
                  aria-expanded={on}
                  aria-controls={`${uid}-p${i}`}
                  onClick={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  className="absolute inset-0 z-10 cursor-pointer text-left outline-offset-[-4px]"
                >
                  <span className="sr-only">
                    Step {i + 1}: {step.title}
                  </span>
                </button>
              </h3>

              {/* Giant number, always visible */}
              <span
                aria-hidden
                className={`font-condensed pointer-events-none absolute bottom-[-0.08em] left-3 text-[11rem] leading-none transition-colors duration-500 ${
                  on ? "" : "text-navy/15"
                }`}
              >
                {i + 1}
              </span>

              {/* Collapsed: the step name running up the column */}
              <span
                aria-hidden
                className={`pointer-events-none absolute top-5 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.25em] whitespace-nowrap uppercase transition-opacity duration-300 [writing-mode:vertical-rl] ${
                  on ? "opacity-0" : "opacity-100"
                }`}
              >
                {step.title}
              </span>

              {/* Open: the full step */}
              <div
                id={`${uid}-p${i}`}
                role="region"
                aria-labelledby={`${uid}-h${i}`}
                inert={!on}
                className={`pointer-events-none absolute inset-0 flex flex-col p-7 transition-opacity duration-500 ${
                  on ? "opacity-100 delay-200" : "opacity-0"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="max-w-md">
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">
                      Step {pad(i + 1)} of {pad(process.length)}
                    </p>
                    <p className="font-condensed mt-3 text-6xl leading-[0.9] uppercase">{step.title}</p>
                    <p className="mt-4 text-[15px] leading-relaxed opacity-90">{step.text}</p>
                  </div>
                  <StepPhoto i={i} className="size-36 shrink-0" />
                </div>
                <div className="mt-auto ml-auto w-[min(100%,360px)] border-t-2 border-current pt-3">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">You get</p>
                  <p className="mt-1 text-lg font-semibold">{step.gets}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Phones and tablets: staircase, every step open */}
      <InView as="ol" className="stairs relative mt-10 space-y-3 lg:hidden">
        {process.map((step, i) => {
          const t = tones[i % tones.length];
          return (
            <li
              key={step.title}
              style={{ ["--i" as string]: i, background: t.bg, color: t.fg } as CSSProperties}
              className="stair border-navy relative overflow-hidden border p-5 sm:p-6"
            >
              <span
                aria-hidden
                className="font-condensed pointer-events-none absolute -right-1 -bottom-[0.12em] text-[8rem] leading-none opacity-20"
              >
                {i + 1}
              </span>
              <div className="relative flex items-start gap-4">
                <StepPhoto i={i} className="size-16 shrink-0 sm:size-20" />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">Step {pad(i + 1)}</p>
                  <h3 className="font-condensed mt-1 text-4xl leading-none uppercase">{step.title}</h3>
                </div>
              </div>
              <p className="relative mt-4 max-w-md text-[15px] leading-relaxed opacity-90">{step.text}</p>
              <p className="relative mt-4 max-w-md border-t border-current pt-3 text-sm font-semibold">
                <span className="mr-2 text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">You get</span>
                {step.gets}
              </p>
            </li>
          );
        })}
      </InView>
    </section>
  );
}
