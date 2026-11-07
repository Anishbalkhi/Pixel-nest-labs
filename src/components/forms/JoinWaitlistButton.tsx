"use client";

import { ArrowRight } from "lucide-react";
import { WAITLIST_EVENT } from "./WaitlistForm";

/** Scrolls to the waitlist form and pre-selects this product. */
export function JoinWaitlistButton({ product }: { product: string }) {
  return (
    <a
      href="#waitlist"
      onClick={() => window.dispatchEvent(new CustomEvent(WAITLIST_EVENT, { detail: product }))}
      className="group/btn group-hover:bg-teal group-hover:text-navy bg-navy hover:bg-brand inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white transition-colors"
    >
      Join waitlist <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
    </a>
  );
}
