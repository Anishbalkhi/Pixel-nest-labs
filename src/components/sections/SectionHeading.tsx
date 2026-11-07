import { WordReveal } from "@/components/motion/effects";

/**
 * Section heading: a small label with three colour squares (the logo's blue,
 * teal and yellow), a big condensed uppercase title, and an optional line of text.
 */
export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  center = false,
  size = "lg",
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
  center?: boolean;
  /** "md" for sections that need the room (e.g. the pinned services row). */
  size?: "lg" | "md";
  /** Use "h1" for the main heading of a page. */
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        data-reveal
        className={`flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase ${
          center ? "justify-center" : ""
        } ${dark ? "text-white/80" : "text-navy"}`}
      >
        <span className="flex gap-[3px]" aria-hidden>
          <span className="bg-brand size-2" />
          <span className="bg-teal size-2" />
          <span className="bg-sun size-2" />
        </span>
        {eyebrow}
      </p>
      <Heading
        className={`font-condensed mt-4 leading-[0.92] tracking-[0.005em] uppercase ${
          size === "md" ? "text-[2.5rem] sm:text-5xl" : "text-[2.75rem] sm:text-6xl lg:text-7xl"
        } ${dark ? "text-white" : "text-navy"}`}
      >
        <WordReveal text={title} />
      </Heading>
      {text ? (
        <p
          data-reveal
          className={`mt-4 max-w-xl text-base ${center ? "mx-auto" : ""} ${dark ? "text-white/75" : "text-muted"}`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
