"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A silent, looping video laid over an image slot. The picture underneath
 * stays as the poster and the fallback; the video fades in once it can play.
 *
 * It only loads on screens 768px and wider, never with reduced motion or the
 * browser's data saver on, and it plays only while on screen.
 * `src` is an MP4 in /public, e.g. "/videos/services/ai-data.mp4".
 */
export function LoopVideo({ src, className = "" }: { src?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide after mount whether this device should get the video at all.
  useEffect(() => {
    if (!src) return;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    // Deciding after mount on purpose: the server can't know the screen or settings.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(wide && !still && !saveData);
  }, [src]);

  // Play only while on screen.
  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  if (!src || !enabled) return null;
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      onCanPlay={() => setReady(true)}
      className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
