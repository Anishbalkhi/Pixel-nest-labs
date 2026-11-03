import { seeded } from "@/components/brand/pixels";

const COLS = 8;
const ROWS = 6;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  delay: Math.round(seeded(i + 7) * 320),
  tone: seeded(i + 300),
}));

/**
 * A grid of squares that fills in one by one when the parent `.group` is
 * hovered or focused. Put it inside a `relative overflow-hidden group` card,
 * before the content, and give the content `relative`.
 */
export function PixelDissolve({ dark = false }: { dark?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {CELLS.map((c, i) => (
        <span
          key={i}
          className="dissolve-cell"
          style={{
            ["--d" as string]: `${c.delay}ms`,
            background: dark
              ? c.tone > 0.5
                ? "#0b57c2"
                : "#111c57"
              : c.tone > 0.82
                ? "#0b57c2"
                : c.tone > 0.12
                  ? "#0a1445"
                  : "#1fb89a",
          }}
        />
      ))}
    </div>
  );
}
