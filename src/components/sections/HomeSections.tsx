import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { WordReveal } from "@/components/motion/effects";
import { PixelAvatar } from "@/components/motion/decor";
import { Doodle } from "@/components/brand/Doodle";
import { QuickContact } from "@/components/forms/QuickContact";
import { InView } from "@/components/motion/InView";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { contact, ctaGallery, whyUs } from "@/content/site";
import { CurvedGallery } from "./CurvedGallery";
import { ProductShowcase } from "./ProductShowcase";
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
    <section id="why-us" className="lined-paper relative mt-6 overflow-hidden px-4 py-14 sm:px-10 sm:py-16">
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
              <div className="bg-white p-3 shadow-[0_30px_50px_-28px_rgb(10_20_69/0.45),0_2px_6px_rgb(10_20_69/0.06)]">
                <div
                  className="border border-white/80 px-5 pt-6 pb-7 sm:px-6 sm:pt-7 sm:pb-8"
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
      className="border-line mt-6 overflow-hidden border bg-white px-6 py-14 sm:px-10"
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
          className="group bg-navy hover:bg-brand inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white"
        >
          See all products <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ProductShowcase />
    </ScrollReveal>
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
    <section data-hide-launcher className="border-line relative mt-6 overflow-hidden border bg-white py-14 sm:py-20">
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
