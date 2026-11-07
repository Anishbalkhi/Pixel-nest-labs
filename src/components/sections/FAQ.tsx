"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { Doodle } from "@/components/brand/Doodle";
import { InView } from "@/components/motion/InView";
import { faqs } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="mt-6 grid gap-8 px-2 py-14 sm:px-4 lg:grid-cols-[0.8fr_1fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading eyebrow="FAQ" title="Questions we hear often." />
        {/* Whiteboard-style speech bubble that draws itself */}
        <InView className="relative mt-8 max-w-sm">
          <svg viewBox="0 0 320 190" className="doodle h-auto w-full overflow-visible" fill="none" aria-hidden>
            <path
              d="M40 20 C 120 6, 240 8, 292 26 C 318 36, 316 112, 290 128 C 250 150, 150 150, 92 144 L 52 178 L 62 140 C 24 132, 8 104, 10 70 C 12 40, 22 26, 40 20 Z"
              stroke="#0b57c2"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          </svg>
          <div className="absolute inset-x-8 top-6 sm:top-8">
            <p className="font-hand text-navy text-[1.7rem] leading-tight font-bold sm:text-3xl">
              Still wondering about something?
            </p>
            <a
              href="#contact"
              className="text-brand mt-2 inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
            >
              Ask us directly →
            </a>
          </div>
          <Doodle
            kind="arrow"
            color="#f7a21b"
            width={4}
            className="absolute -right-2 -bottom-4 h-14 w-16 rotate-[200deg]"
          />
        </InView>
      </div>
      <InView className="deal space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`group relative overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 ${
                isOpen
                  ? "border-brand/40 shadow-[0_18px_40px_-26px_rgb(11_87_194/0.5)]"
                  : "border-line hover:border-brand/25"
              }`}
            >
              {/* Accent bar that grows down the side of the open question */}
              <span
                aria-hidden
                className={`from-brand via-teal to-sun absolute top-0 bottom-0 left-0 w-1 origin-top bg-gradient-to-b transition-transform duration-500 ${
                  isOpen ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <h3>
                <button
                  type="button"
                  id={`${uid}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="font-display flex w-full items-center gap-4 px-5 py-4 text-left font-bold"
                >
                  <span
                    aria-hidden
                    className={`font-condensed w-8 shrink-0 text-3xl leading-none transition-colors duration-300 ${
                      isOpen ? "text-brand" : "text-navy/25 group-hover:text-brand/60"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex-1">{f.q}</span>
                  <Plus
                    className={`text-brand size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`${uid}-a${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: -8 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-muted pr-5 pb-5 pl-[4.25rem] text-[15px] leading-relaxed"
                    >
                      {f.a}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </InView>
    </section>
  );
}
