"use client";

import { ArrowRight } from "lucide-react";
import { useId, type FormEvent } from "react";

/** Event the contact drawer listens for. `detail.email` is filled into its form. */
export const OPEN_CONTACT = "contact:open";

/**
 * A single email box. Submitting opens the full contact form in the drawer
 * with the email already filled in, so nothing is sent from here.
 */
export function QuickContact() {
  const id = useId();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    window.dispatchEvent(new CustomEvent(OPEN_CONTACT, { detail: { email } }));
  };
  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-md">
      <div className="border-line focus-within:border-navy flex rounded-md border bg-white p-1.5 transition-colors">
        <label htmlFor={id} className="sr-only">
          Your email
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email*"
          className="text-navy placeholder:text-muted min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
        />
        <button
          type="submit"
          className="group bg-navy hover:bg-brand inline-flex items-center gap-2 rounded px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase transition-colors"
        >
          Start <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
      <p className="text-muted mt-2 text-center text-xs">
        Opens a short form. We only use your email to reply, with no newsletters.
      </p>
    </form>
  );
}
