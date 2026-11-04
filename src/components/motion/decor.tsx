import type { CSSProperties } from "react";
import { seeded } from "@/components/brand/pixels";

const BRAND = ["#0b57c2", "#0e76a6", "#1fb89a", "#f7a21b"];
const v = (vars: Record<string, string | number>) => vars as CSSProperties;

/** Pixels falling slowly through a dark panel. Decorative; CSS only. */
export function PixelRain({ count = 22, seed = 1 }: { count?: number; seed?: number }) {
  return (
    <div aria-hidden className="pixel-rain pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const s = seed * 100 + i;
        const size = 4 + Math.round(seeded(s + 7) * 8);
        return (
          <span
            key={i}
            className="absolute top-0 rounded-[2px]"
            style={v({
              left: `${(seeded(s) * 100).toFixed(1)}%`,
              width: size,
              height: size,
              background: BRAND[i % BRAND.length],
              "--dur": `${(6 + seeded(s + 3) * 8).toFixed(1)}s`,
              "--delay": `${(-seeded(s + 5) * 12).toFixed(1)}s`,
            })}
          />
        );
      })}
    </div>
  );
}

/** Small squares drifting around a section background. Decorative; CSS only. */
export function DriftPixels({ count = 12, seed = 1 }: { count?: number; seed?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const s = seed * 50 + i;
        const size = 6 + Math.round(seeded(s + 9) * 10);
        return (
          <span
            key={i}
            className="animate-drift absolute rounded-[3px] opacity-50"
            style={{
              left: `${(4 + seeded(s + 3) * 92).toFixed(1)}%`,
              top: `${(6 + seeded(s + 21) * 86).toFixed(1)}%`,
              width: size,
              height: size,
              background: BRAND[i % 3 === 0 ? 3 : i % 3],
              animationDelay: `${(-seeded(s) * 9).toFixed(1)}s`,
              animationDuration: `${(7 + seeded(s + 60) * 6).toFixed(1)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * A 5 × 5 symmetrical pixel avatar (like a GitHub identicon) that flies together
 * when its parent InView comes into view and shuffles on hover.
 * Replace it with a real photo whenever you like.
 */
export function PixelAvatar({ seed, className = "" }: { seed: number; className?: string }) {
  const cells: { on: boolean; color: string }[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const mirror = c > 2 ? 4 - c : c;
      const on = seeded(seed * 31 + r * 7 + mirror) > 0.45 || (r === 2 && mirror === 2);
      cells.push({ on, color: BRAND[Math.floor(seeded(seed * 13 + r * 5 + mirror) * BRAND.length)] });
    }
  }
  return (
    <span aria-hidden className={`bg-navy grid size-14 shrink-0 grid-cols-5 gap-[2px] rounded-2xl p-2 ${className}`}>
      {cells.map((cell, i) => (
        <span
          key={i}
          className={cell.on ? "avatar-px rounded-[2px]" : ""}
          style={
            cell.on
              ? v({
                  background: cell.color,
                  "--sx": `${Math.round((seeded(seed + i * 3) - 0.5) * 120)}px`,
                  "--sy": `${Math.round((seeded(seed + i * 5) - 0.5) * 120)}px`,
                  "--i": i,
                  "--jd": `${Math.round(seeded(seed + i) * 200)}ms`,
                })
              : undefined
          }
        />
      ))}
    </span>
  );
}

/** "In development" bar with moving stripes (no percentage, since there's no real number to show). */
export function DevStatus({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden className="mt-5">
      <div
        className={`flex justify-between text-xs font-medium ${dark ? "text-white/60" : "text-muted"} transition-colors delay-150 group-hover:text-white/70`}
      >
        <span>Building now</span>
        <span>Early access soon</span>
      </div>
      <div className="bg-line mt-1.5 h-1.5 overflow-hidden rounded-full transition-colors delay-150 group-hover:bg-white/15">
        <div className="progress-stripes h-full w-full rounded-full" />
      </div>
    </div>
  );
}
