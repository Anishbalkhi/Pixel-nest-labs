"use client";

import { Play, X } from "lucide-react";
import { useRef } from "react";
import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * "Watch the reel" button that opens the brand reel in a full-screen player
 * (a native <dialog>, so Esc and focus handling come with it). The video
 * only loads when the player opens, and stops when it closes.
 */
export function ReelButton({ src, poster, className = "" }: { src: string; poster?: string; className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const open = () => {
    const d = dialog.current;
    const v = video.current;
    if (!d || !v) return;
    if (!v.getAttribute("src")) v.setAttribute("src", src);
    d.showModal();
    getLenis()?.stop();
    v.play().catch(() => {});
  };
  const onClose = () => {
    video.current?.pause();
    getLenis()?.start();
  };

  return (
    <>
      <button type="button" onClick={open} className={`group inline-flex items-center gap-2 ${className}`}>
        <span className="bg-navy group-hover:bg-brand grid size-7 place-items-center text-white transition-colors">
          <Play className="size-3.5 fill-current" />
        </span>
        Watch the reel
      </button>

      <dialog
        ref={dialog}
        onClose={onClose}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label="Pixel Nest Labs reel"
        data-lenis-prevent
        className="bg-navy m-auto w-[min(92vw,1200px)] max-w-none overflow-visible p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <form method="dialog" className="absolute -top-12 right-0">
          <button
            type="submit"
            aria-label="Close the reel"
            className="bg-sun text-navy grid size-10 place-items-center transition-transform hover:rotate-90"
          >
            <X className="size-5" />
          </button>
        </form>
        <video
          ref={video}
          poster={poster || undefined}
          controls
          playsInline
          preload="none"
          className="block aspect-video w-full bg-black"
        />
      </dialog>
    </>
  );
}
