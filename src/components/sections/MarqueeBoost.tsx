"use client";

import { useEffect } from "react";

/**
 * Speeds up the tech-stack rows with scroll speed, flips their direction when you
 * scroll up, and slows them right down on hover. The rows themselves are plain CSS
 * animations (which run off the main thread); this only changes their playback rate.
 */
export function MarqueeBoost({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = document.getElementById(sectionId);
    if (!section) return;

    const anims = [...section.querySelectorAll<HTMLElement>("[data-row]")].flatMap((row) => row.getAnimations());
    // Push each animation far along (by whole loops, so nothing visibly jumps) so it can
    // run backwards for a long time without reaching its start and stopping.
    anims.forEach((a) => {
      const loop = Number(a.effect?.getComputedTiming().duration) || 40_000;
      a.currentTime = Number(a.currentTime ?? 0) + loop * 200;
    });

    let rate = 1;
    let target = 1;
    let direction = 1;
    let hovered = false;
    let visible = false;
    let raf = 0;
    let settle = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const tick = () => {
      rate += (target - rate) * 0.12;
      if (Math.abs(target - rate) < 0.01) rate = target;
      anims.forEach((a) => (a.playbackRate = rate));
      raf = rate === target ? 0 : requestAnimationFrame(tick);
    };
    const steer = (next: number) => {
      target = next;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const speed = ((y - lastY) / Math.max(16, now - lastT)) * 1000; // px per second
      lastY = y;
      lastT = now;
      if (!visible || hovered || speed === 0) return;
      direction = Math.sign(speed);
      steer(direction * (1 + Math.min(Math.abs(speed) / 250, 6)));
      window.clearTimeout(settle);
      settle = window.setTimeout(() => !hovered && steer(direction), 160);
    };
    const onEnter = () => {
      hovered = true;
      steer(direction * 0.15);
    };
    const onLeave = () => {
      hovered = false;
      steer(direction);
    };

    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("pointerenter", onEnter);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointerenter", onEnter);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, [sectionId]);

  return null;
}
