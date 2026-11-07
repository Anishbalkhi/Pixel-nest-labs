import { Check, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { JoinWaitlistButton } from "@/components/forms/JoinWaitlistButton";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { HeroPixels } from "@/components/brand/HeroPixels";
import { SpinBadge } from "@/components/brand/SpinBadge";
import { ImageSlot } from "@/components/media/ImageSlot";
import { DevStatus, DriftPixels } from "@/components/motion/decor";
import { ScrollTextBand } from "@/components/motion/ScrollTextBand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { CTASection } from "@/components/sections/HomeSections";
import { productIcons } from "@/components/sections/icons";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { plans, products } from "@/content/site";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Path Lab, CRM, Restaurant and Admission management tools from Pixel Nest Labs. In development: join the waitlist.",
};

/** Accent per product spread (logo colours). Text uses `ink`, blocks use `block`. */
const spreadTones = ["#0b57c2", "#0f7a65", "#a86400", "#0e76a6"];
const spreadBlocks = ["#0b57c2", "#1fb89a", "#f7a21b", "#0e76a6"];

export default function ProductsPage() {
  return (
    <>
      <section
        data-hero
        className="border-line relative mt-4 grid items-center gap-8 overflow-hidden border bg-white px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.3fr_1fr]"
      >
        <div
          className="pixel-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          aria-hidden
        />
        <ScrollReveal className="relative">
          <SectionHeading
            as="h1"
            eyebrow="Products"
            title="Management tools for real businesses."
            text="We're building simple, affordable software for pathology labs, sales teams, restaurants and schools. They're in development now. Join the waitlist and help shape them."
          />
          <p
            data-reveal
            className="bg-sun/15 mt-6 inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#9a5c00]"
          >
            <Sparkles className="size-3.5" /> In development: early access opens to the waitlist first
          </p>
        </ScrollReveal>
        <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
          <HeroPixels className="w-full overflow-visible" />
        </div>
      </section>

      {/* One magazine-style spread per product, alternating sides. */}
      <div className="mt-6 space-y-6">
        {products.map((p, i) => {
          const Icon = productIcons[p.icon];
          const tone = spreadTones[i % spreadTones.length];
          const flip = i % 2 === 1;
          return (
            <ScrollReveal
              key={p.slug}
              as="section"
              id={p.slug}
              className="border-navy/15 relative grid overflow-hidden border bg-white lg:grid-cols-2"
            >
              <div className="grain absolute inset-0" aria-hidden />
              <div className={`relative flex flex-col p-6 sm:p-10 ${flip ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex items-start justify-between gap-4">
                  <p data-reveal className="font-condensed text-6xl leading-none sm:text-8xl" style={{ color: tone }}>
                    {i + 1}.
                  </p>
                  <span className="text-navy/60 mt-2 text-[11px] font-semibold tracking-[0.2em] uppercase">
                    For {p.audience.toLowerCase()}
                  </span>
                </div>
                <h2
                  data-reveal
                  className="font-condensed mt-4 text-[3.2rem] leading-[0.9] uppercase sm:mt-6 sm:text-7xl xl:text-8xl"
                  style={{ color: tone }}
                >
                  {p.name}
                </h2>
                <p data-reveal className="text-navy/75 mt-5 max-w-md">
                  {p.summary}
                </p>
                <ul
                  data-reveal
                  className="border-navy/15 mt-6 grid gap-x-6 gap-y-2 border-t pt-5 text-sm sm:grid-cols-2"
                >
                  {p.features.map((f) => (
                    <li key={f} className="text-navy flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0" style={{ color: tone }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <DevStatus />
                  <div className="mt-6">
                    <JoinWaitlistButton product={p.name} />
                  </div>
                </div>
              </div>

              <div
                className={`relative order-first min-h-[220px] sm:min-h-[320px] lg:min-h-[520px] ${flip ? "lg:order-1" : "lg:order-2"}`}
              >
                <ImageSlot
                  src={p.image}
                  alt=""
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  hint={`product ${p.slug}`}
                  className="absolute inset-0 lg:inset-4"
                  imageClassName="grayscale"
                >
                  <div className="absolute inset-0" style={{ background: spreadBlocks[i % spreadBlocks.length] }}>
                    <div className="pixel-grid-dark absolute inset-0" />
                  </div>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="bg-navy grid size-28 place-items-center text-white">
                      <Icon className="size-14" />
                    </span>
                  </span>
                </ImageSlot>
                {/* Vertical name along the outer edge, like a book spine */}
                <span
                  aria-hidden
                  className={`font-display absolute top-8 hidden text-sm font-extrabold tracking-[0.3em] text-white/80 uppercase [writing-mode:vertical-rl] lg:block ${
                    flip ? "left-10 rotate-180" : "right-10"
                  }`}
                >
                  {p.name}
                </span>
                <SpinBadge
                  id={`badge-${p.slug}`}
                  text="In development • Join the waitlist • "
                  color={tone}
                  className={`absolute bottom-6 rounded-full bg-white max-sm:hidden ${flip ? "right-6 lg:-right-8" : "left-6 lg:-left-8"} z-10`}
                />
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollTextBand words={["Path Lab", "CRM", "Restaurant", "Admission"]} />

      <ScrollReveal as="section" className="border-line mt-6 border bg-white px-6 py-14 sm:px-10">
        <SectionHeading
          eyebrow="Subscription plans"
          title="Simple monthly plans. Pricing coming soon."
          text="Each product will be offered as a subscription. Prices will be announced when early access opens."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              data-reveal
              className={`group relative rounded-3xl border p-6 transition-transform duration-300 hover:-translate-y-1.5 ${
                i === 1 ? "border-brand bg-brand overflow-hidden text-white" : "glow-border border-line bg-white"
              }`}
            >
              {i === 1 ? (
                <>
                  {/* A light that keeps circling the edge: a rotating gradient behind a navy inner panel. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[60%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_60%,#f7a21b_75%,#ffffff_85%,transparent_95%)]"
                  />
                  <span aria-hidden className="bg-brand absolute inset-[1.5px]" />
                  <span className="bg-teal text-navy absolute top-5 right-5 px-2.5 py-1 text-xs font-bold uppercase">
                    Most flexible
                  </span>
                </>
              ) : null}
              <div className="relative">
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${i === 1 ? "text-white/70" : "text-muted"}`}>{plan.text}</p>
                <p className="font-display mt-5 text-2xl font-extrabold">
                  <span className={`shimmer-text ${i === 1 ? "text-sun" : "text-brand"}`}>Coming soon</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check className={`mt-0.5 size-4 shrink-0 ${i === 1 ? "text-sun" : "text-teal-700"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal as="section" id="waitlist" className="bg-brand relative mt-6 overflow-hidden px-6 py-14 sm:px-10">
        <div className="pixel-grid-dark absolute inset-0" aria-hidden />
        <DriftPixels seed={7} />
        <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1fr] [&_.field-error]:text-red-300 [&_label]:text-white/90">
          <SectionHeading
            dark
            eyebrow="Waitlist"
            title="Be first to try them."
            text="Tell us about your business and which tool you need. We'll invite you to early access and ask for your feedback."
          />
          <div data-reveal>
            <WaitlistForm />
          </div>
        </div>
      </ScrollReveal>

      <CTASection
        title="Need a tool built just for you?"
        text="If none of these fit, we can build a custom management tool around how your team already works."
      />
    </>
  );
}
