"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { InView } from "@/components/motion/InView";
import { faqs } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section id="faq" className="mt-6 grid gap-8 px-2 py-14 sm:px-4 lg:grid-cols-[0.8fr_1fr]">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions we hear often."
        text="Can't find yours? Tap “Let's talk” and ask us."
      />
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
                    className={`grid size-8 shrink-0 place-items-center rounded-lg text-xs font-extrabold transition-colors duration-300 ${
                      isOpen ? "bg-navy text-teal" : "bg-mist text-muted group-hover:text-brand"
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
                      className="text-muted pr-5 pb-5 pl-[4.25rem] text-sm"
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
