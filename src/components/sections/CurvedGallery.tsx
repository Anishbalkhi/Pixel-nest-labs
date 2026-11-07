"use client";

import { useEffect, useRef } from "react";
import { PixelMark } from "@/components/brand/PixelMark";
import { ImageSlot } from "@/components/media/ImageSlot";
import type { ctaGallery } from "@/content/site";

type Item = (typeof ctaGallery)[number];

const tiles = [
  { bg: "#0b57c2", fg: "#fff" },
  { bg: "#1fb89a", fg: "#0a1445" },
  { bg: "#0a1445", fg: "#fff" },
  { bg: "#f7a21b", fg: "#0a1445" },
  { bg: "#0e76a6", fg: "#fff" },
];

/**
 * A strip of cards bent around a drum: the middle card faces you and the ones
 * towards the edges turn away. It drifts on its own, speeds up with the page
 * scroll and can be dragged. It pauses off screen; with reduced motion it
 * stays still (dragging still works).
 */
export function CurvedGallery({ items }: { items: Item[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = wrap.current;
    const t = track.current;
    if (!w || !t) return;
    const cards = [...t.children] as HTMLElement[];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let boost = 0; // extra speed from scrolling or a flick, fades out
    let setWidth = 0; // width of one copy of the items
    let lefts: number[] = [];
    let widths: number[] = [];
    let raf = 0;
    let running = false;
    let last = 0;
    let lastScroll = window.scrollY;
    let drag: { id: number; x: number; t: number } | null = null;

    const measure = () => {
      lefts = cards.map((c) => c.offsetLeft);
      widths = cards.map((c) => c.offsetWidth);
      setWidth = cards.length > 1 ? lefts[cards.length / 2] - lefts[0] : 0;
    };

    const paint = () => {
      if (setWidth) x = ((x % setWidth) - setWidth) % setWidth; // keep x in (-setWidth, 0]
      const half = w.clientWidth / 2;
      for (let k = 0; k < cards.length; k++) {
        const center = lefts[k] + widths[k] / 2 + x;
        const o = Math.max(-1.7, Math.min(1.7, (center - half) / half));
        cards[k].style.transform =
          `translate3d(${x}px,0,${(-Math.abs(o) * Math.abs(o) * 140).toFixed(1)}px) rotateY(${(o * 40).toFixed(2)}deg)`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(48, now - (last || now));
      last = now;
      if (!drag) {
        if (!still) x -= dt * 0.03; // slow drift
        x -= boost * dt;
        boost *= Math.pow(0.94, dt / 16);
        if (Math.abs(boost) < 0.001) boost = 0;
      }
      paint();
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (!still && running) boost = Math.max(-1.6, Math.min(1.6, boost + (y - lastScroll) * 0.004));
      lastScroll = y;
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, t: performance.now() };
      boost = 0;
      t.setPointerCapture(e.pointerId);
      t.dataset.dragging = "";
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const now = performance.now();
      const dx = e.clientX - drag.x;
      x += dx;
      // Remember the flick speed so the strip glides on after letting go.
      boost = -dx / Math.max(8, now - drag.t);
      drag = { ...drag, x: e.clientX, t: now };
      if (!running) paint();
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      delete t.dataset.dragging;
      boost = Math.max(-2, Math.min(2, boost));
    };

    measure();
    paint();
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: "100px 0px",
    });
    io.observe(w);
    const ro = new ResizeObserver(() => {
      measure();
      paint();
    });
    ro.observe(w);
    window.addEventListener("scroll", onScroll, { passive: true });
    t.addEventListener("pointerdown", onDown);
    t.addEventListener("pointermove", onMove);
    t.addEventListener("pointerup", onUp);
    t.addEventListener("pointercancel", onUp);
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      t.removeEventListener("pointerdown", onDown);
      t.removeEventListener("pointermove", onMove);
      t.removeEventListener("pointerup", onUp);
      t.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Two copies so the strip can loop without a gap.
  const loop = [...items, ...items];

  return (
    <div ref={wrap} className="relative mt-10 overflow-hidden py-6 sm:mt-14" aria-hidden>
      <div
        ref={track}
        className="flex cursor-grab touch-pan-y gap-4 select-none [perspective-origin:50%_50%] [perspective:1100px] data-[dragging]:cursor-grabbing sm:gap-6"
      >
        {loop.map((item, k) => {
          const tile = tiles[(k % items.length) % tiles.length];
          return (
            <ImageSlot
              key={k}
              src={item.image}
              alt={item.alt}
              sizes="(min-width: 640px) 22vw, 45vw"
              hint={k < items.length ? `gallery ${k + 1}` : undefined}
              className="aspect-[5/6] w-[clamp(140px,16.5vw,230px)] shrink-0 rounded-md shadow-[0_24px_40px_-24px_rgb(10_20_69/0.5)] will-change-transform"
              imageClassName="pointer-events-none"
            >
              <div className="absolute inset-0" style={{ background: tile.bg }}>
                <div className="pixel-grid-dark absolute inset-0" />
              </div>
              <PixelMark className="absolute top-4 right-4 h-8 w-auto opacity-80" />
              <p
                className="font-condensed absolute right-4 bottom-4 left-4 text-[clamp(1.35rem,2.5vw,2.4rem)] leading-[0.9] break-words uppercase"
                style={{ color: tile.fg }}
              >
                {item.label}
              </p>
            </ImageSlot>
          );
        })}
      </div>
    </div>
  );
}
