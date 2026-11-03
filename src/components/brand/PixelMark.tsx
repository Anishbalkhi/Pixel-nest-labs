import { markPixels, sunPixel, VIEWBOX } from "./pixels";

/** Static SVG version of the pixel mark, for the navbar, footer and icons. */
export function PixelMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {[...markPixels, sunPixel].map((p, i) => (
        <rect
          key={i}
          x={p.x - p.size / 2}
          y={p.y - p.size / 2}
          width={p.size}
          height={p.size}
          rx={p.size * 0.17}
          fill={p.color}
        />
      ))}
    </svg>
  );
}

export function Wordmark({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <span className={`font-display font-extrabold tracking-tight ${className}`}>
      <span className={dark ? "text-white" : "text-navy"}>Pixel Nest</span>{" "}
      <span className={dark ? "text-teal" : "text-brand"}>Labs</span>
    </span>
  );
}
