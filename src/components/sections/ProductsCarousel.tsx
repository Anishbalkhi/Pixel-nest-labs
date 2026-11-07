"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { products } from "@/content/site";
import { productIcons } from "./icons";

const tones = ["#0b57c2", "#1fb89a", "#f7a21b", "#0e76a6"];

/**
 * Products as a centre-focus carousel: the active card is large and lifted,
 * its neighbours shrink and fade to the sides. Arrows, dots, swipe and the
 * left/right keys move it. Every card stays a real link.
 */
export function ProductsCarousel() {
  const [active, setActive] = useState(0);
  const swipe = useRef<number | null>(null);
  const n = products.length;
  const go = (d: number) => setActive((a) => (a + d + n) % n);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  };
  const onDown = (e: PointerEvent) => (swipe.current = e.clientX);
  const onUp = (e: PointerEvent) => {
    if (swipe.current === null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className="relative mt-10"
      role="region"
      aria-roledescription="carousel"
      aria-label="Products"
      onKeyDown={onKey}
    >
      <div
        className="relative h-[430px] touch-pan-y select-none sm:h-[480px]"
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        {products.map((p, i) => {
          // Shortest distance from the active card, so the ring wraps both ways.
          let o = i - active;
          if (o > n / 2) o -= n;
          if (o < -n / 2) o += n;
          const abs = Math.abs(o);
          const Icon = productIcons[p.icon];
          const isActive = o === 0;
          return (
            <div
              key={p.slug}
              aria-hidden={!isActive}
              inert={!isActive}
              onClick={() => !isActive && setActive(i)}
              className="absolute top-0 left-1/2 w-[min(78vw,340px)] transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(calc(-50% + ${o} * min(58vw, 300px))) scale(${1 - abs * 0.16}) translateY(${abs * 26}px)`,
                opacity: abs > 1 ? 0 : 1 - abs * 0.25,
                filter: isActive ? "none" : "saturate(0.6)",
                zIndex: 10 - abs,
                cursor: isActive ? "auto" : "pointer",
              }}
            >
              <Link
                href={`/products#${p.slug}`}
                tabIndex={isActive ? 0 : -1}
                className="group block overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_70px_-40px_rgb(10_20_69/0.55)]"
                draggable={false}
              >
                <ImageSlot src={p.image} alt="" sizes="340px" hint={`product ${p.slug}`} className="aspect-[4/3]">
                  <div className="absolute inset-0" style={{ background: tones[i % tones.length] }}>
                    <div className="pixel-grid-dark absolute inset-0" />
                  </div>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid size-24 place-items-center rounded-3xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                      <Icon className="size-11" />
                    </span>
                  </div>
                </ImageSlot>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-navy text-xl font-bold">{p.name}</h3>
                    <span className="bg-sun/15 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold text-[#9a5c00]">
                      In development
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-sm">{p.summary}</p>
                  <p className="text-brand mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                    Join waitlist{" "}
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous product"
          className="border-line text-navy hover:bg-navy grid size-11 place-items-center rounded-full border bg-white transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
              className="group/dot grid h-11 w-6 place-items-center"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? "bg-navy w-5" : "bg-navy/20 group-hover/dot:bg-navy/40 w-2"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next product"
          className="border-line text-navy hover:bg-navy grid size-11 place-items-center rounded-full border bg-white transition-colors hover:text-white"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {products[active].name}, {active + 1} of {n}
      </p>
    </div>
  );
}
