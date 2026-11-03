import { ArrowLeft, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { seeded } from "@/components/brand/pixels";

export const metadata: Metadata = { title: "Page not found" };

// 3 × 5 pixel digits.
const DIGITS: Record<string, string[]> = {
  "4": ["101", "101", "111", "001", "001"],
  "0": ["111", "101", "101", "101", "111"],
};
const COLORS = ["#0b57c2", "#0e76a6", "#1fb89a", "#1fb89a", "#0b57c2"];

export default function NotFound() {
  let n = 0;
  return (
    <section className="bg-navy relative mt-4 flex min-h-[70dvh] flex-col items-center justify-center overflow-hidden rounded-[2rem] px-6 py-16 text-center text-white">
      <div className="pixel-grid-dark absolute inset-0" aria-hidden />

      <div className="relative flex gap-4 sm:gap-6" role="img" aria-label="404">
        {"404".split("").map((d, di) => (
          <div key={di} className="grid grid-cols-3 gap-1.5 sm:gap-2">
            {DIGITS[d].flatMap((row, r) =>
              row.split("").map((on, c) => {
                const i = n++;
                return (
                  <span
                    key={`${r}-${c}`}
                    className={`size-5 rounded-[4px] sm:size-8 sm:rounded-md ${on === "1" ? "pixel-glitch" : ""}`}
                    style={
                      on === "1"
                        ? {
                            background: i === 22 ? "#f7a21b" : COLORS[r],
                            animationDelay: `${(seeded(i + 40) * 4).toFixed(2)}s`,
                            animationDuration: `${(3 + seeded(i + 90) * 3).toFixed(2)}s`,
                          }
                        : undefined
                    }
                  />
                );
              }),
            )}
          </div>
        ))}
      </div>

      <h1 className="font-display relative mt-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
        This page flew the nest.
      </h1>
      <p className="relative mt-3 max-w-md text-white/70">
        The link may be old or mistyped. Head back home, or tell us what you were looking for.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-teal text-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/10"
        >
          <MessageCircle className="size-4" /> Contact us
        </a>
      </div>
    </section>
  );
}
