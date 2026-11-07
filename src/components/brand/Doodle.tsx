/**
 * Hand-drawn marker strokes (underline, loose circle, arrow, loop). They draw
 * themselves when a parent gets the "is-in" class (wrap them in <InView>), or
 * straight away with `drawn`. Decorative only.
 */
const paths = {
  underline: { box: "0 0 300 30", d: "M4 20 C 60 8, 120 6, 180 12 S 270 22, 296 10" },
  swash: {
    box: "0 0 300 34",
    d: "M6 22 C 70 10, 150 6, 230 14 C 260 17, 280 20, 294 26 M40 28 C 110 20, 190 20, 250 26",
  },
  circle: {
    box: "0 0 220 110",
    d: "M150 12 C 90 0, 18 18, 12 54 C 6 92, 90 104, 160 92 C 214 82, 220 34, 170 18 C 140 8, 100 10, 70 18",
  },
  arrow: { box: "0 0 120 90", d: "M8 10 C 30 60, 60 78, 104 70 M84 56 L106 70 L88 86" },
  loop: {
    box: "0 0 160 60",
    d: "M4 40 C 30 40, 40 8, 64 10 C 88 12, 78 50, 60 44 C 42 38, 70 12, 100 22 C 124 30, 130 46, 156 30",
  },
} as const;

export function Doodle({
  kind,
  className = "",
  color = "currentColor",
  width = 5,
  drawn = false,
}: {
  kind: keyof typeof paths;
  className?: string;
  color?: string;
  width?: number;
  drawn?: boolean;
}) {
  const p = paths[kind];
  return (
    <svg
      viewBox={p.box}
      aria-hidden
      className={`doodle pointer-events-none overflow-visible ${drawn ? "doodle-now" : ""} ${className}`}
      fill="none"
    >
      <path d={p.d} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}
