"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

/** Shown if a page crashes while rendering, instead of a blank screen. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-line mt-4 flex min-h-[60dvh] flex-col items-center justify-center border bg-white px-6 py-16 text-center">
      <h1 className="font-display text-3xl font-extrabold tracking-tight">Something went wrong.</h1>
      <p className="text-muted mt-3 max-w-md">
        Please try again. If it keeps happening, use the Let&apos;s talk button to tell us.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-navy hover:bg-brand inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white"
        >
          <RotateCcw className="size-4" /> Try again
        </button>
        <Link href="/" className="border-line inline-flex items-center border px-6 py-3 text-sm font-semibold">
          Back to home
        </Link>
      </div>
    </section>
  );
}
