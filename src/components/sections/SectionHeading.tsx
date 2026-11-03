import { WordReveal } from "@/components/motion/effects";

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
  center = false,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
  center?: boolean;
  /** Use "h1" for the main heading of a page. */
  as?: "h1" | "h2";
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p
        data-reveal
        className={`flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase ${
          center ? "justify-center" : ""
        } ${dark ? "text-teal" : "text-brand"}`}
      >
        <span className="bg-sun size-2 rounded-[2px]" aria-hidden />
        {eyebrow}
      </p>
      <Heading
        className={`font-display mt-3 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl ${
          dark ? "text-white" : "text-navy"
        }`}
      >
        <WordReveal text={title} />
      </Heading>
      {text ? (
        <p data-reveal className={`mt-3 text-base ${dark ? "text-white/65" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
