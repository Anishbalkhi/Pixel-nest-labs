"use client";

import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/motion/SmoothScroll";

/** Footer button that glides back to the top of the page. */
export function BackToTop() {
  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="group hover:border-teal hover:text-teal inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-colors"
    >
      Back to top
      <span className="relative grid size-4 overflow-hidden" aria-hidden>
        <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-5" />
        <ArrowUp className="absolute size-4 translate-y-5 transition-transform duration-300 group-hover:translate-y-0" />
      </span>
    </button>
  );
}
