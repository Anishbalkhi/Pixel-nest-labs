"use client";

import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { products } from "@/content/site";
import { LoopVideo } from "@/components/media/LoopVideo";
import { ProductMock } from "./ProductMocks";

/** Colour block for each product, and the text colour that reads on it. */
const themes = [
  { bg: "#0b57c2", fg: "#ffffff" },
  { bg: "#1fb89a", fg: "#0a0f2c" },
  { bg: "#f7a21b", fg: "#0a0f2c" },
  { bg: "#0e76a6", fg: "#ffffff" },
];
const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Home "Our products" switcher. A list of the four products sits beside a
 * big colour-block stage: the product's name runs huge and faded behind a
 * mock-up of its main screen, with the summary, features and waitlist link.
 * Built as tabs: click a product, or use the arrow keys once one is focused.
 * On phones the list becomes a row of tabs you can swipe.
 */
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const p = products[active];
  const t = themes[active % themes.length];

  const select = (i: number, focus = false) => {
    const next = (i + products.length) % products.length;
    setActive(next);
    if (focus) tabs.current[next]?.focus();
    // Phones: keep the chosen tab in view in the swipeable row (without moving the page).
    const tab = tabs.current[next];
    const row = tab?.parentElement;
    if (tab && row && row.scrollWidth > row.clientWidth) {
      row.scrollTo({ left: tab.offsetLeft - 24, behavior: "smooth" });
    }
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      select(active + 1, true);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      select(active - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      select(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      select(products.length - 1, true);
    }
  };

  return (
    <div className="mt-10 grid gap-3 lg:grid-cols-[300px_1fr] lg:gap-4">
      {/* Product list (tabs) */}
      <div
        role="tablist"
        aria-label="Products"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-6 flex snap-x [scrollbar-width:none] gap-2 overflow-x-auto px-6 pb-1 sm:-mx-10 sm:px-10 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {products.map((q, i) => {
          const on = i === active;
          const qt = themes[i % themes.length];
          return (
            <button
              key={q.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative flex shrink-0 snap-start items-center gap-3 border px-4 py-3 text-left transition-colors duration-300 lg:flex-1 lg:gap-4 lg:px-5 lg:py-5 ${
                on ? "border-navy" : "border-navy/15 hover:border-navy/40 bg-white"
              }`}
              style={on ? { background: qt.bg, color: qt.fg } : undefined}
            >
              {/* Folder-tab notch on the active item */}
              <span
                aria-hidden
                className={`absolute -top-px left-4 h-1.5 w-10 transition-opacity ${on ? "opacity-100" : "opacity-0"}`}
                style={{ background: "#0a0f2c" }}
              />
              <span className={`font-condensed text-2xl leading-none lg:text-3xl ${on ? "" : "text-navy/30"}`}>
                {pad(i + 1)}
              </span>
              <span className="min-w-0">
                <span className={`block text-sm font-bold whitespace-nowrap lg:text-base ${on ? "" : "text-navy"}`}>
                  {q.name}
                </span>
                <span className={`hidden truncate text-xs lg:block ${on ? "opacity-80" : "text-muted"}`}>
                  {q.audience}
                </span>
              </span>
              <ArrowRight
                className={`ml-auto hidden size-5 shrink-0 transition-transform duration-300 lg:block ${
                  on ? "translate-x-0" : "text-navy/30 -translate-x-1 group-hover:translate-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Stage */}
      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="border-navy relative flex flex-col overflow-hidden border transition-[background-color,color] duration-500 lg:min-h-[640px]"
        style={{ background: t.bg, color: t.fg }}
      >
        <div className="pixel-grid-dark absolute inset-0" aria-hidden />

        {/* Giant faded name behind everything */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={p.slug}
            aria-hidden
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 0.14 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="font-condensed pointer-events-none absolute -bottom-[0.12em] left-0 text-[clamp(5rem,15vw,13rem)] leading-none whitespace-nowrap uppercase select-none"
          >
            {p.name}
          </motion.p>
        </AnimatePresence>

        <div className="relative flex items-center justify-between gap-3 border-b border-current/20 px-5 py-3 text-[11px] font-bold tracking-[0.14em] whitespace-nowrap uppercase sm:px-8 sm:tracking-[0.2em]">
          <span>
            <span className="hidden sm:inline">Product </span>
            {pad(active + 1)} / {pad(products.length)}
          </span>
          <span className="bg-navy px-2.5 py-1 text-white">In development</span>
        </div>

        <div className="relative grid flex-1 items-center gap-8 px-5 pt-8 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pt-10 lg:pb-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
              className="flex justify-center lg:justify-start"
            >
              {p.image || p.video ? (
                <div className="border-navy relative aspect-[4/3] w-full max-w-[460px] overflow-hidden border-2 bg-white shadow-[10px_10px_0_0_#0a0f2c]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.name} screen`}
                      fill
                      sizes="(min-width: 1024px) 460px, 90vw"
                      className="object-cover"
                    />
                  ) : (
                    // No screenshot yet: the mock-up shows until (or instead of) the video.
                    <div className="bg-mist absolute inset-0 grid place-items-center">
                      <div className="w-[118%] scale-[0.78]">
                        <ProductMock slug={p.slug} />
                      </div>
                    </div>
                  )}
                  <LoopVideo src={p.video} />
                </div>
              ) : (
                <ProductMock slug={p.slug} />
              )}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.45, ease, delay: 0.05 }}
            >
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase opacity-80">
                For {p.audience.toLowerCase()}
              </p>
              <h3 className="font-condensed mt-3 text-5xl leading-[0.92] uppercase sm:text-6xl">{p.name}</h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed opacity-90">{p.summary}</p>
              <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="bg-navy mt-0.5 grid size-4 shrink-0 place-items-center text-white">
                      <Check className="size-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/products#${p.slug}`}
                  className="group bg-navy hover:text-navy inline-flex items-center gap-2 px-5 py-3 text-[13px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:bg-white"
                >
                  Join the waitlist
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="inline-flex items-center gap-2 border border-current px-5 py-3 text-[13px] font-semibold tracking-[0.08em] uppercase transition-opacity hover:opacity-75"
                >
                  Next product <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
