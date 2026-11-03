"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { markPixels, seeded, sunPixel, VIEWBOX } from "./pixels";

const ALL = [...markPixels, sunPixel];
const SUN_INDEX = ALL.length - 1;
const REPEL_RADIUS = 170;
const REPEL_FORCE = 46;

/**
 * Hero version of the mark: the squares fly in from scattered positions and
 * assemble into the logo, then drift away from the cursor and spring back.
 * Listens for pointer moves on the closest [data-hero] ancestor.
 */
export function HeroPixels({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const groups = useRef<(SVGGElement | null)[]>([]);
  const assembled = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (reduce || !svg) return;
    const host: HTMLElement = svg.closest<HTMLElement>("[data-hero]") ?? (svg as unknown as HTMLElement);
    const offsets = ALL.map(() => ({ x: 0, y: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const tick = () => {
      let moving = false;
      ALL.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        if (pointer && assembled.current) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < REPEL_RADIUS) {
            const f = (1 - d / REPEL_RADIUS) * REPEL_FORCE;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        const o = offsets[i];
        o.x += (tx - o.x) * 0.14;
        o.y += (ty - o.y) * 0.14;
        if (Math.abs(tx - o.x) > 0.15 || Math.abs(ty - o.y) > 0.15) moving = true;
        groups.current[i]?.setAttribute("transform", `translate(${o.x.toFixed(2)} ${o.y.toFixed(2)})`);
      });
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const ctm = svg.getScreenCTM();
      if (!ctm) return;
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
      pointer = { x: pt.x, y: pt.y };
      kick();
    };
    const onLeave = () => {
      pointer = null;
      kick();
    };

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <svg ref={svgRef} viewBox={VIEWBOX} className={className} role="img" aria-label="Pixel Nest Labs logo mark">
      {ALL.map((p, i) => {
        const isSun = i === SUN_INDEX;
        const initial = isSun
          ? { opacity: 0, scale: 0, rotate: -90 }
          : {
              opacity: 0,
              x: Math.round((seeded(i) - 0.5) * 1100),
              y: Math.round((seeded(i + 40) - 0.5) * 800 - 120),
              rotate: Math.round((seeded(i + 80) - 0.5) * 220),
              scale: 0.35,
            };
        return (
          <g key={i} ref={(el) => void (groups.current[i] = el)}>
            <motion.g
              initial={reduce ? false : initial}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              transition={
                isSun
                  ? { delay: 1.35, type: "spring", stiffness: 260, damping: 12 }
                  : { delay: 0.15 + seeded(i + 120) * 0.7, type: "spring", stiffness: 70, damping: 14 }
              }
              onAnimationComplete={isSun ? () => void (assembled.current = true) : undefined}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <rect
                x={p.x - p.size / 2}
                y={p.y - p.size / 2}
                width={p.size}
                height={p.size}
                rx={p.size * 0.17}
                fill={p.color}
              />
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
