import { ArrowUpRight, Check, FlaskConical } from "lucide-react";
import { labProjects } from "@/content/site";
import { LabEffects } from "./LabEffects";
import { LabPreview } from "./LabPreviews";
import { SectionHeading } from "./SectionHeading";

// Bento layout on large screens: wide, narrow / narrow, wide.
const WIDE = [true, false, false, true];

/**
 * "From the lab": the studio's own demo and concept builds, each with a small
 * animated preview. Rendered on the server; LabEffects adds the scroll reveal,
 * the cursor light, and pauses the previews while the section is off screen.
 */
export function LabShowcase() {
  return (
    <section id="lab" data-lab className="mt-6 px-2 py-14 sm:px-4">
      <LabEffects sectionId="lab" />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="From the lab"
          title="Demo and concept projects."
          text="We're a new studio, so instead of client logos here are things we've built to show how we work. Each one is labelled Demo or Concept."
        />
        <p className="border-line text-muted hidden max-w-xs items-start gap-2 rounded-2xl border bg-white px-4 py-3 text-xs sm:flex">
          <FlaskConical className="text-brand mt-0.5 size-4 shrink-0" />
          Built by us to explore an idea or a stack. Not client work.
        </p>
      </div>

      {/* Phones and tablets: a swipeable row. Desktop: the bento grid. */}
      <div className="-mx-2 mt-8 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-2 pb-2 sm:-mx-4 sm:px-4 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
        {labProjects.map((p, i) => {
          const wide = WIDE[i % WIDE.length];
          return (
            <article
              key={p.title}
              data-lab-card
              style={{ ["--i" as string]: i % 2 }}
              className={`group border-line hover:border-brand/40 relative flex w-[84vw] max-w-[420px] shrink-0 snap-center flex-col overflow-hidden rounded-3xl border bg-white transition-[border-color,box-shadow] duration-300 hover:shadow-[0_30px_60px_-30px_rgb(11_87_194/0.45)] lg:w-auto lg:max-w-none ${
                wide ? "lg:col-span-2 lg:flex-row" : ""
              }`}
            >
              {/* Light that follows the cursor */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(31 184 154 / 0.10), transparent 60%)",
                }}
              />

              <div
                aria-hidden
                className={`bg-navy relative flex min-h-48 items-center justify-center overflow-hidden px-5 py-8 sm:min-h-56 ${
                  wide ? "lg:w-[58%] lg:shrink-0" : ""
                }`}
              >
                <div className="pixel-grid-dark absolute inset-0" />
                <div className="bg-brand/30 absolute -top-16 -right-16 size-48 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <div className="bg-teal/20 absolute -bottom-20 -left-10 size-48 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />
                {/* Wide cards get a bigger preview so it fills the larger panel. */}
                <div className={`relative flex w-full justify-center ${wide ? "lg:scale-110 xl:scale-125" : ""}`}>
                  <LabPreview kind={p.preview} />
                </div>
              </div>

              <div className={`relative flex flex-1 flex-col p-6 sm:p-7 ${wide ? "lg:justify-center lg:p-10" : ""}`}>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide uppercase ${
                      p.label === "Demo" ? "bg-teal/15 text-teal-700" : "bg-sun/20 text-[#8a5300]"
                    }`}
                  >
                    {p.label}
                  </span>
                  <span className="text-muted text-xs">
                    {p.label === "Demo" ? "Working build" : "Idea we prototyped"}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-muted mt-2 text-sm">{p.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-700" />
                      {h}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
                  {p.tech.map((t) => (
                    <li key={t} className="bg-mist text-navy/80 rounded-md px-2 py-1 text-xs font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
                <div
                  className={`border-line flex flex-wrap ${wide ? "mt-6 lg:mt-8" : "mt-auto"} items-center gap-x-5 gap-y-2 border-t pt-4 text-sm font-semibold`}
                >
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand inline-flex items-center gap-1 hover:underline"
                    >
                      Live demo <ArrowUpRight className="size-4" />
                    </a>
                  ) : (
                    <span className="text-muted inline-flex items-center gap-2 font-medium">
                      <span className="relative flex size-2">
                        <span className="bg-sun absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                        <span className="bg-sun relative inline-flex size-2 rounded-full" />
                      </span>
                      Live demo coming soon
                    </span>
                  )}
                  {p.githubUrl ? (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand inline-flex items-center gap-1 hover:underline"
                    >
                      Code <ArrowUpRight className="size-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
