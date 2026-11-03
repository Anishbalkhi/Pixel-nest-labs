"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
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
      <div className="space-y-3">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className={`rounded-2xl border bg-white transition-colors ${isOpen ? "border-brand/40" : "border-line"}`}
            >
              <h3>
                <button
                  type="button"
                  id={`${uid}-q${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="font-display flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold"
                >
                  {f.q}
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
                    <p className="text-muted px-5 pb-5 text-sm">{f.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
