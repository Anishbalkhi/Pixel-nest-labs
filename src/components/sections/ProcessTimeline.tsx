"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LifeBuoy, PenTool, Rocket, Search, CodeXml } from "lucide-react";
import { useRef } from "react";
import { process } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const icons = [Search, PenTool, CodeXml, Rocket, LifeBuoy];

/** "How we work": the line fills as you scroll and each step lights up as it's reached. */
export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 65%", end: "bottom 65%", scrub: 0.5 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            x: 24,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 68%",
              toggleActions: "play none none reverse",
              toggleClass: { targets: step, className: "is-active" },
            },
          });
        });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-fill]", { scaleY: 1 });
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s) => s.classList.add("is-active"));
      });
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      className="mt-6 grid gap-10 rounded-[2rem] bg-white px-6 py-14 sm:px-10 lg:grid-cols-[0.8fr_1fr]"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading
          eyebrow="How we work"
          title="A simple process, with no surprises."
          text="Five steps from first call to long-term support. You see progress every week."
        />
      </div>

      <ol data-steps className="relative space-y-4 pl-14">
        <span className="bg-line absolute top-2 bottom-2 left-[22px] w-1 rounded-full" aria-hidden />
        <span
          data-fill
          className="from-brand via-teal to-sun absolute top-2 bottom-2 left-[22px] w-1 origin-top rounded-full bg-gradient-to-b"
          aria-hidden
        />
        {process.map((step, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={step.title} data-step className="group border-line bg-mist relative rounded-2xl border p-5">
              <span className="bg-line text-muted group-[.is-active]:bg-navy group-[.is-active]:text-teal absolute top-5 -left-14 grid size-12 place-items-center rounded-xl border-4 border-white transition-colors duration-500">
                <Icon className="size-5" />
              </span>
              <p className="text-brand text-xs font-semibold tracking-wider uppercase">Step {i + 1}</p>
              <h3 className="font-display mt-1 text-xl font-bold">{step.title}</h3>
              <p className="text-muted mt-1 text-sm">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
