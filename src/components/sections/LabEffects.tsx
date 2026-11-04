"use client";

import { useEffect } from "react";

/**
 * Behaviour for the server-rendered Lab section (LabShowcase), kept tiny so the
 * cards and previews don't have to load as client-side code:
 * - pauses the looping preview animations while the section is off screen,
 * - reveals each card (and grows its chart bars) the first time it scrolls into view,
 * - moves the soft light that follows the cursor over a card.
 */
export function LabEffects({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const visibility = new IntersectionObserver(([entry]) => {
      section.toggleAttribute("data-active", entry.isIntersecting);
    });
    visibility.observe(section);

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    section.querySelectorAll("[data-lab-card]").forEach((card) => reveal.observe(card));

    const spotlight = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-lab-card]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    section.addEventListener("pointermove", spotlight);

    return () => {
      visibility.disconnect();
      reveal.disconnect();
      section.removeEventListener("pointermove", spotlight);
    };
  }, [sectionId]);

  return null;
}
