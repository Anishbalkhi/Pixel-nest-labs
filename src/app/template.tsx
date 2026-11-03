"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { seeded } from "@/components/brand/pixels";
import { getLenis } from "@/components/motion/SmoothScroll";

const COLS = 12;
const ROWS = 8;
const COLORS = ["#0a1445", "#0a1445", "#0b57c2", "#111c57", "#1fb89a"];
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  delay: seeded(i + 500) * 0.35,
  color: COLORS[Math.floor(seeded(i + 900) * COLORS.length)],
}));

// The wipe plays on client-side navigation only, never on the first page load.
// Comparing paths (not a boolean) keeps React's double-run of effects in dev from triggering it.
let lastPath: string | null = null;
// Timers from the previous navigation, cleared when a new one starts.
let pending: number[] = [];

/** Page transition: a grid of brand-coloured pixels dissolves to reveal the new page. */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [wipe, setWipe] = useState(false);

  // No fade on the very first render, so the server HTML is visible straight away.
  const animateIn = lastPath !== null;

  useEffect(() => {
    const isFirstLoad = lastPath === null || lastPath === pathname;
    lastPath = pathname;

    // Land at the top of the new page, or at its #section when the link has one.
    // Runs after Next.js's own scroll handling, and once more for #sections because
    // the pinned services block adds height after the page mounts.
    // No cleanup on purpose: React's dev double-run would otherwise cancel this.
    const land = () => {
      const hash = window.location.hash.slice(1);
      const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target ?? 0, { offset: target ? -88 : 0, immediate: true, force: true });
      else if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    };

    if (isFirstLoad) {
      // Opening a link like /#lab directly: the browser jumps before the pinned
      // services section adds its height, so correct the position once it has.
      if (window.location.hash && pending.length === 0) pending.push(window.setTimeout(land, 600));
      return;
    }

    pending.forEach(window.clearTimeout);
    pending = [window.setTimeout(land, 60)];
    if (window.location.hash) pending.push(window.setTimeout(land, 450));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the wipe must only start after mount
    setWipe(true);
    pending.push(window.setTimeout(() => setWipe(false), 900));
  }, [pathname]);

  return (
    <>
      {wipe ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] grid"
          style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
        >
          {CELLS.map((c, i) => (
            <motion.span
              key={i}
              style={{ background: c.color }}
              initial={{ opacity: 1, scale: 1.02 }}
              animate={{ opacity: 0, scale: 0.4 }}
              transition={{ delay: c.delay, duration: 0.3, ease: "easeIn" }}
            />
          ))}
        </div>
      ) : null}
      <motion.div
        key={pathname}
        initial={animateIn ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
