import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A spot for a photo. With `src` it shows the image, cropped to fill the box.
 * Without one it shows `children` (the built-in artwork), and in development
 * a small tag saying which photo belongs here, so slots are easy to find.
 *
 * Put photos in /public/images/... and set the path in src/content/site.ts.
 */
export function ImageSlot({
  src,
  alt = "",
  sizes,
  hint,
  className = "",
  imageClassName = "",
  children,
}: {
  src?: string;
  alt?: string;
  /** How wide the image shows, e.g. "(min-width: 768px) 40vw, 90vw". */
  sizes: string;
  /** Development-only note about what this photo should be. */
  hint?: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}) {
  // Positioned "relative" unless the caller already positions it (e.g. "absolute inset-0").
  const positioned = /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className);
  return (
    <div className={[positioned ? "" : "relative", "overflow-hidden", className].join(" ")}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${imageClassName}`} />
      ) : (
        <div className="absolute inset-0" aria-hidden>
          {children}
          {hint && process.env.NODE_ENV === "development" ? (
            <span className="absolute top-2 left-2 z-10 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[10px] text-white">
              photo: {hint}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
