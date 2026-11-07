/**
 * A solid dot with a line of text running around it in a slowly turning ring,
 * like a printed stamp. Decorative: the same words should appear elsewhere.
 * Position it with `className` (e.g. "absolute -bottom-6 left-6").
 */
export function SpinBadge({
  id,
  text,
  color,
  className = "",
}: {
  /** Unique on the page: names the circle the text runs along. */
  id: string;
  text: string;
  color: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`grid size-28 place-items-center sm:size-32 ${className}`}>
      <svg viewBox="-60 -60 120 120" className="absolute inset-0 size-full animate-[badge-turn_18s_linear_infinite]">
        <defs>
          <path id={id} d="M 0 -46 A 46 46 0 1 1 0 46 A 46 46 0 1 1 0 -46" />
        </defs>
        <text className="fill-navy text-[10.5px] font-bold tracking-[0.2em] uppercase">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="size-11 rounded-full sm:size-12" style={{ background: color }} />
    </span>
  );
}
