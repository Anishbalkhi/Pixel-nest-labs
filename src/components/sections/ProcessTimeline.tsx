"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeXml, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import { useRef, type CSSProperties } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { process } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const icons = [Search, PenTool, CodeXml, Rocket, LifeBuoy];
const tones = ["#f7a21b", "#1fb89a", "#f7a21b", "#0b57c2", "#1fb89a"];
const shapes = ["sunburst", "petals", "star", "rays", "petals"] as const;

/** Circles sit on alternating sides, as a percentage of the width. */
const X = process.map((_, i) => (i % 2 ? 72 : 28));
const ROW = 100; // height of one step in SVG units (the SVG stretches to fit)

/**
 * The winding line through every step. Between two circles it swings out past
 * each one before crossing over, so it reads as a loose hand-drawn ribbon.
 */
function windingPath() {
  const pts = X.map((x, i) => [x * 10, i * ROW + ROW / 2] as const);
  let d = `M 500 0 C 500 ${ROW * 0.25}, ${pts[0][0]} ${ROW * 0.1}, ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const dir = Math.sign(x2 - x1);
    d += ` C ${x1 - dir * 230} ${y1 + ROW * 0.55}, ${x2 + dir * 230} ${y2 - ROW * 0.55}, ${x2} ${y2}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  d += ` C ${lx} ${ly + ROW * 0.4}, 500 ${ly + ROW * 0.3}, 500 ${pts.length * ROW}`;
  return d;
}
const PATH = windingPath();

/** Decorative shapes behind each circle (sunburst, petals, star, half rays). */
function Burst({ shape, color }: { shape: (typeof shapes)[number]; color: string }) {
  const common = "absolute inset-0 size-full";
  if (shape === "sunburst")
    return (
      <svg viewBox="-100 -100 200 200" className={common}>
        {Array.from({ length: 28 }, (_, k) => (
          <rect
            key={k}
            x="-3"
            y="-98"
            width="6"
            height="34"
            rx="2"
            fill={color}
            transform={`rotate(${(k * 360) / 28})`}
          />
        ))}
      </svg>
    );
  if (shape === "rays")
    return (
      <svg viewBox="-100 -100 200 200" className={common}>
        {Array.from({ length: 13 }, (_, k) => (
          <rect
            key={k}
            x="-4"
            y="-98"
            width="8"
            height="30"
            rx="2"
            fill={color}
            transform={`rotate(${-90 + (k * 180) / 12})`}
          />
        ))}
      </svg>
    );
  if (shape === "star")
    return (
      <svg viewBox="-100 -100 200 200" className={common}>
        <path
          fill={color}
          d={
            Array.from({ length: 16 }, (_, k) => {
              const r = k % 2 ? 58 : 98;
              const a = (k * Math.PI) / 8 - Math.PI / 2;
              return `${k ? "L" : "M"} ${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
            }).join(" ") + " Z"
          }
        />
      </svg>
    );
  // petals: four rounded blocks around the circle
  return (
    <svg viewBox="-100 -100 200 200" className={common}>
      {[0, 90, 180, 270].map((r) => (
        <rect key={r} x="-30" y="-98" width="60" height="44" rx="16" fill={color} transform={`rotate(${r + 45})`} />
      ))}
    </svg>
  );
}

/** Four-point sparkle accent. */
function Sparkle({ className, color }: { className: string; color: string }) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} aria-hidden>
      <path fill={color} d="M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10 Z" />
    </svg>
  );
}

/**
 * "How we work": a thick blue line winds down the page and draws itself as you
 * scroll. Each step is a circle (a photo once you add one, in black and white)
 * with a burst of colour behind it and its name curving around the edge.
 */
export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-draw]",
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 70%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "center 72%",
            toggleClass: { targets: step, className: "is-active" },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-draw]", { clipPath: "none" });
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s) => s.classList.add("is-active"));
      });
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="border-navy/15 relative mt-6 overflow-hidden border bg-white px-3 py-14 sm:px-10 sm:py-16"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative">
        <SectionHeading
          center
          eyebrow="How we work"
          title="A simple process, with no surprises."
          text="Five steps from first call to long-term support. You see progress every week."
        />
      </div>

      <ol data-steps className="relative mx-auto mt-8 grid max-w-5xl auto-rows-[290px] sm:mt-12 md:auto-rows-[270px]">
        {/* Faint full line, then the solid line on top, revealed from the top down as you scroll */}
        {[false, true].map((solid) => (
          <svg
            key={String(solid)}
            data-draw={solid ? "" : undefined}
            viewBox={`0 0 1000 ${process.length * ROW}`}
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            aria-hidden
          >
            <path d={PATH} fill="none" stroke="#0b57c2" strokeOpacity={solid ? 1 : 0.12} className="winding" />
          </svg>
        ))}

        {process.map((step, i) => {
          const Icon = icons[i % icons.length];
          const left = i % 2 === 0;
          const tone = tones[i];
          return (
            <li
              key={step.title}
              data-step
              style={{ ["--x" as string]: `${X[i]}%`, ["--tone" as string]: tone } as CSSProperties}
              className="group relative"
            >
              {/* Circle, centred on the line */}
              <div className="step-circle absolute top-1/2 left-[var(--x)] size-[108px] -translate-x-1/2 -translate-y-1/2 sm:size-[150px]">
                {/* Pushed away from the curved label so the two don't overlap */}
                <div
                  className={`absolute -inset-[34%] ${
                    left
                      ? "translate-x-[10%] -translate-y-[8%] sm:translate-x-[16%]"
                      : "-translate-x-[10%] translate-y-[8%] sm:-translate-x-[16%]"
                  }`}
                  aria-hidden
                >
                  <div className="step-burst size-full">
                    <Burst shape={shapes[i]} color={tone} />
                  </div>
                </div>
                <Sparkle
                  color={i % 2 ? "#0b57c2" : "#1fb89a"}
                  className={`step-sparkle absolute size-8 sm:size-10 ${left ? "-top-4 -right-3" : "-bottom-3 -left-4"}`}
                />
                <ImageSlot
                  src={step.image}
                  alt=""
                  sizes="150px"
                  hint={`process ${step.title.toLowerCase()}`}
                  className="absolute inset-0 rounded-full shadow-[0_18px_40px_-18px_rgb(10_20_69/0.55)] ring-4 ring-white"
                  imageClassName="grayscale"
                >
                  <div className="bg-navy absolute inset-0">
                    <div className="pixel-grid-dark absolute inset-0" />
                  </div>
                  <span className="absolute inset-0 grid place-items-center text-white">
                    <Icon className="size-9 sm:size-12" />
                  </span>
                </ImageSlot>
                {/* Step name curving around the outside of the circle */}
                <svg viewBox="-100 -100 200 200" className="absolute -inset-[30%] overflow-visible" aria-hidden>
                  <defs>
                    <path
                      id={`arc-${i}`}
                      d={
                        left
                          ? "M -59 59 A 84 84 0 1 1 59 -59 A 84 84 0 1 1 -59 59"
                          : "M 42 -73 A 84 84 0 1 1 -42 73 A 84 84 0 1 1 42 -73"
                      }
                    />
                  </defs>
                  <text className="font-display fill-brand text-[15px] font-extrabold tracking-[0.12em] uppercase">
                    <textPath href={`#arc-${i}`}>{step.title} •</textPath>
                  </text>
                </svg>
              </div>

              {/* Number, title and text on the other side of the line */}
              <div
                className={`step-text absolute top-1/2 z-10 w-[52%] -translate-y-1/2 rounded-2xl bg-white/90 p-3 sm:w-[40%] sm:bg-transparent sm:p-0 ${
                  left ? "left-[47%]" : "right-[47%] text-right"
                }`}
              >
                <p className="font-display text-navy text-4xl leading-none font-extrabold tracking-tight sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-navy mt-2 text-lg font-bold sm:text-xl">{step.title}</h3>
                <p className="text-muted mt-1 text-sm italic">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
