import type { CSSProperties } from "react";

/**
 * Flat "sticker kit" shapes: a colour fill, an ink outline and a thick white
 * border around the whole shape, like a die-cut sticker. Decorative only.
 */
const shapes = {
  burst: "M50 4 L60 30 L88 20 L74 46 L98 58 L70 66 L78 94 L52 78 L32 98 L28 70 L2 68 L22 48 L8 22 L36 28 Z",
  spark: "M50 4 C54 36 64 46 96 50 C64 54 54 64 50 96 C46 64 36 54 4 50 C36 46 46 36 50 4 Z",
  heart:
    "M50 90 C20 70 6 52 6 34 C6 18 18 8 32 8 C40 8 46 12 50 20 C54 12 60 8 68 8 C82 8 94 18 94 34 C94 52 80 70 50 90 Z",
  smile: "M50 6 A44 44 0 1 1 49.9 6 Z",
  bolt: "M58 4 L18 56 H46 L38 96 L82 40 H54 Z",
} as const;

export type StickerKind = keyof typeof shapes;

export function Sticker({
  kind,
  color = "#f7a21b",
  className = "",
  style,
}: {
  kind: StickerKind;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const d = shapes[kind];
  return (
    <svg viewBox="-8 -8 116 116" aria-hidden className={`sticker pointer-events-none ${className}`} style={style}>
      {/* White die-cut border */}
      <path d={d} fill="#fff" stroke="#fff" strokeWidth="16" strokeLinejoin="round" />
      <path d={d} fill={color} stroke="#0a0f2c" strokeWidth="5" strokeLinejoin="round" />
      {kind === "smile" ? (
        <g fill="none" stroke="#0a0f2c" strokeWidth="6" strokeLinecap="round">
          <path d="M36 40 v6 M64 40 v6" />
          <path d="M30 60 C40 74 60 74 70 60" />
        </g>
      ) : null}
    </svg>
  );
}

/** A bent-wire paper clip, drawn in ink. */
export function PaperClip({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 80" aria-hidden className={`pointer-events-none ${className}`} fill="none">
      <path
        d="M10 22 V60 C10 70 22 70 22 60 V14 C22 4 6 4 6 14 V62 C6 78 26 78 26 62 V26"
        stroke="#7b8095"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
