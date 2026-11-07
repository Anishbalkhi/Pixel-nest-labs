import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { WordReveal } from "@/components/motion/effects";
import { PixelAvatar } from "@/components/motion/decor";
import { CountUp } from "@/components/motion/CountUp";
import { ImageSlot } from "@/components/media/ImageSlot";
import { PixelMark } from "@/components/brand/PixelMark";
import { Doodle } from "@/components/brand/Doodle";
import { QuickContact } from "@/components/forms/QuickContact";
import { InView } from "@/components/motion/InView";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { about, contact, ctaGallery, whyUs } from "@/content/site";
import { CurvedGallery } from "./CurvedGallery";
import { ProductsCarousel } from "./ProductsCarousel";
import { SectionHeading } from "./SectionHeading";

/** Pin colour, note tint and number colour for each "Why us" note. */
const notes = [
  { pin: "#ff7a3d", tint: "linear-gradient(180deg,#ffe8db,#fff5ee)", ink: "#e8622a", r: -4 },
  { pin: "#2f6bff", tint: "linear-gradient(180deg,#e2e9ff,#f0f4ff)", ink: "#2f6bff", r: 5 },
  { pin: "#8b5cf6", tint: "linear-gradient(180deg,#efe3ff,#f8f2ff)", ink: "#7c3aed", r: -3 },
  { pin: "#1fb89a", tint: "linear-gradient(180deg,#d9f4ec,#eefaf6)", ink: "#0f7a65", r: 4 },
];

/**
 * Why us: four notes pinned to lined paper, zig-zagging down the page with
 * dashed lines between them. They drop in and settle when scrolled into view,
 * and swing a little from their pin on hover.
 */
export function WhyUs() {
  return (
    <section
      id="why-us"
      className="lined-paper relative mt-6 overflow-hidden rounded-[2rem] px-4 py-14 sm:px-10 sm:py-16"
    >
      <ScrollReveal className="relative">
        <SectionHeading
          center
          eyebrow="Why Pixel Nest Labs"
          title="A small team that treats your project like its own."
        />
      </ScrollReveal>

      <InView className="notes relative mx-auto mt-10 flex max-w-5xl flex-col gap-9 sm:mt-12 sm:gap-12 lg:block lg:h-[800px]">
        {/* Dashed lines from one note to the next (desktop layout only) */}
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden size-full lg:block"
          aria-hidden
        >
          <g
            fill="none"
            stroke="#0a1445"
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="6 7"
            className="note-links"
          >
            <path d="M 410 120 C 480 120, 520 190, 590 230" />
            <path d="M 590 340 C 480 330, 330 320, 270 352" />
            <path d="M 450 480 C 510 490, 540 560, 590 590" />
          </g>
          <path
            d="M 590 700 C 530 690, 470 715, 405 708"
            fill="none"
            stroke="#0a1445"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />
        </svg>

        {whyUs.map((w, i) => {
          const n = notes[i % notes.length];
          return (
            <div
              key={w.title}
              style={
                { ["--r" as string]: `${n.r}deg`, ["--pin" as string]: n.pin, ["--i" as string]: i } as CSSProperties
              }
              className={`note group relative w-[92%] max-w-sm sm:w-[78%] lg:absolute lg:w-[36%] lg:max-w-none ${
                [
                  "self-start lg:top-0 lg:left-[5%]",
                  "self-end lg:top-[140px] lg:left-[59%]",
                  "self-start lg:top-[340px] lg:left-[9%]",
                  "self-end lg:top-[500px] lg:left-[59%]",
                ][i % 4]
              }`}
            >
              <span className="pin absolute -top-4 left-1/2 z-10 -translate-x-1/2" aria-hidden />
              <div className="rounded-[28px] bg-white p-3 shadow-[0_30px_50px_-28px_rgb(10_20_69/0.45),0_2px_6px_rgb(10_20_69/0.06)]">
                <div
                  className="rounded-[20px] border border-white/80 px-5 pt-6 pb-7 sm:px-6 sm:pt-7 sm:pb-8"
                  style={{ background: n.tint }}
                >
                  <p className="font-hand text-4xl leading-none font-bold" style={{ color: n.ink }}>
                    0{i + 1}
                  </p>
                  <h3 className="font-display text-navy mt-3 text-xl font-bold">{w.title}</h3>
                  <p className="text-navy/70 mt-2 text-[15px] leading-relaxed">{w.text}</p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Little sign-off at the end of the chain */}
        <Link
          href="/#about"
          className="note-sign group flex items-center gap-3 self-center lg:absolute lg:top-[660px] lg:left-[18%]"
        >
          <span className="flex -space-x-3">
            <PixelAvatar seed={3} className="size-12! rounded-full! p-2.5! ring-4 ring-white" />
            <PixelAvatar seed={4} className="size-12! rounded-full! p-2.5! ring-4 ring-white" />
          </span>
          <span className="font-hand text-navy text-2xl leading-tight">
            Two founders, <span className="text-[#e8622a]">one small lab</span>.
            <span className="text-muted group-hover:text-brand block font-sans text-xs font-semibold not-italic transition-colors">
              Meet us →
            </span>
          </span>
        </Link>
      </InView>
    </section>
  );
}

export function ProductsPreview() {
  return (
    <ScrollReveal
      as="section"
      id="products"
      className="border-line mt-6 overflow-hidden rounded-[2rem] border bg-white px-6 py-14 sm:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Our products"
          title="Ready-made tools, in the making."
          text="Management software for labs, sales teams, restaurants and schools. Join the waitlist for early access."
        />
        <Link
          data-reveal
          href="/products"
          className="group bg-navy hover:bg-brand inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white"
        >
          See all products <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ProductsCarousel />
    </ScrollReveal>
  );
}

/** Splits "4 products in development" into 4 and the label, so the number can count up. */
function splitStat(item: string) {
  const m = item.match(/^(\d+)(\+?)\s+(.*)$/);
  return m ? { n: Number(m[1]), plus: m[2], label: m[3] } : null;
}

const founderBlocks = [
  { block: "#1fb89a", place: "right-[12%] top-[18%] h-[58%] w-[34%]" },
  { block: "#f7a21b", place: "left-[10%] bottom-[14%] h-[46%] w-[40%]" },
];

/**
 * About: a bento grid. A paper-coloured story tile, a tall team tile with the
 * mission and vision, a portrait tile per founder (black and white with a
 * colour block over it), and a stats tile whose numbers count up.
 */
export function About() {
  return (
    <ScrollReveal
      as="section"
      id="about"
      className="border-line relative mt-6 overflow-hidden rounded-[2rem] border bg-[#f6f5f1] px-4 py-14 sm:px-10 sm:py-16"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative">
        <SectionHeading
          center
          eyebrow="About us"
          title={about.title}
          text="A small studio by design: you always know who's building your project."
        />
        <div data-reveal className="bg-navy/15 mx-auto mt-8 h-px w-48" aria-hidden />
      </div>

      <InView className="deal relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
        {/* Story */}
        <div className="rounded-3xl bg-[#e9e2d8] p-6 sm:p-7">
          <span aria-hidden className="font-display text-brand block text-6xl leading-[0.6] font-extrabold">
            &ldquo;
          </span>
          <p className="text-navy/60 mt-4 text-xs font-semibold tracking-[0.2em] uppercase">Our story</p>
          <p className="text-navy mt-2 text-[15px] leading-relaxed">{about.story}</p>
        </div>

        {/* Team: tall tile with mission and vision */}
        <ImageSlot
          src={about.teamImage}
          alt="The Pixel Nest Labs founders"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 92vw"
          hint="the two founders together"
          className="bg-navy min-h-[260px] rounded-3xl sm:min-h-[420px] lg:row-span-2"
          imageClassName="grayscale"
        >
          <div className="pixel-grid-dark absolute inset-0" />
          <PixelRainLite />
        </ImageSlot>

        {about.founders.map((f, i) => (
          <article
            key={i}
            className={`group overflow-hidden rounded-3xl bg-white ${i === 0 ? "lg:col-start-3 lg:row-start-1" : "lg:col-start-1 lg:row-start-2"}`}
          >
            <div className="relative aspect-[16/10]">
              <ImageSlot
                src={f.image}
                alt={f.name}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 92vw"
                hint={`founder ${i + 1} portrait`}
                className="absolute inset-0"
                imageClassName="grayscale contrast-110"
              >
                <div className="absolute inset-0 bg-[#d9dbe1]" />
                <div className="absolute inset-0 grid place-items-center">
                  <PixelAvatar seed={i + 3} className="size-24! rounded-3xl! p-3!" />
                </div>
              </ImageSlot>
              {/* Colour block over the portrait, like a printed overlay */}
              <span
                aria-hidden
                className={`absolute mix-blend-multiply transition-transform duration-700 group-hover:translate-y-[-6%] ${founderBlocks[i % 2].place}`}
                style={{ background: founderBlocks[i % 2].block }}
              />
              <span aria-hidden className="bg-navy/40 absolute top-0 bottom-0 left-6 w-px" />
            </div>
            <div className="p-6">
              <h3 className="font-condensed text-navy text-3xl leading-none uppercase">{f.name}</h3>
              <p className="text-muted mt-1 text-xs font-semibold tracking-wider uppercase">{f.role}</p>
              <p className="text-muted mt-3 text-sm">{f.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {f.skills.map((sk, j) => (
                  <li key={j} className="bg-mist rounded-md px-2 py-1 text-xs font-medium">
                    {sk}
                  </li>
                ))}
              </ul>
              {f.linkedin ? (
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand mt-4 inline-block text-sm font-semibold"
                >
                  LinkedIn ↗
                </a>
              ) : null}
            </div>
          </article>
        ))}

        {/* Numbers */}
        <div className="rounded-3xl bg-[#dfe3f1] p-6 sm:p-7 lg:col-start-3 lg:row-start-2">
          <p className="text-navy/60 text-xs font-semibold tracking-[0.2em] uppercase">In numbers</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6">
            {about.experienceStrip.map((item, i) => {
              const stat = splitStat(item);
              return (
                <li key={i}>
                  {stat ? (
                    <>
                      <p className="font-display text-navy text-4xl font-extrabold tracking-tight">
                        <CountUp value={stat.n} />
                        {stat.plus}
                      </p>
                      <p className="text-muted mt-1 text-sm">{stat.label}</p>
                    </>
                  ) : (
                    <p className="text-navy text-sm font-semibold">{item}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </InView>

      {/* Mission and vision sit over the team tile on large screens; below it they read as a strip. */}
      <div className="relative mt-4 grid gap-4 sm:grid-cols-2">
        {[
          ["Mission", about.mission],
          ["Vision", about.vision],
        ].map(([label, text]) => (
          <div key={label} data-reveal className="flex items-baseline gap-4 rounded-2xl bg-white px-5 py-4">
            <span className="font-hand text-brand text-2xl font-bold">{label}</span>
            <p className="text-navy text-sm">{text}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}

/** A few slow pixels for the team tile until a photo is added. */
function PixelRainLite() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="text-center text-white">
        <PixelMark className="mx-auto h-16 w-auto" />
        <p className="font-condensed mt-4 text-4xl leading-[0.9] uppercase sm:text-5xl">
          Two founders.
          <br />
          <span className="text-teal">One small lab.</span>
        </p>
      </div>
    </div>
  );
}

export function CTASection({
  eyebrow = "Start a project",
  title = "Let's build it, pixel by pixel.",
  text = "Tell us about your idea and we'll reply within one working day. Or book a free 20-minute call.",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <section
      data-hide-launcher
      className="border-line relative mt-6 overflow-hidden rounded-[2rem] border bg-white py-14 sm:py-20"
    >
      <ScrollReveal className="relative px-6 text-center sm:px-10">
        <p data-reveal className="text-navy text-[11px] font-semibold tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-navy mx-auto mt-4 max-w-3xl text-4xl leading-[1.02] font-extrabold tracking-tight sm:text-6xl">
          <WordReveal text={title} />
        </h2>
        <InView className="mx-auto -mt-1 w-56 sm:w-80" aria-hidden>
          <Doodle kind="swash" color="#1fb89a" width={5} className="h-auto w-full" />
        </InView>
        <p data-reveal className="text-muted mx-auto mt-3 max-w-xl">
          {text}
        </p>
      </ScrollReveal>

      <CurvedGallery items={ctaGallery} />

      <div className="relative mt-8 px-6 sm:px-10">
        <QuickContact />
        {contact.bookingUrl ? (
          <p className="mt-4 text-center text-sm">
            <a
              href={contact.bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="text-brand inline-flex items-center gap-1 font-semibold hover:underline"
            >
              Or book a call <ArrowUpRight className="size-4" />
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
