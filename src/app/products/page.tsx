import { Check, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { JoinWaitlistButton } from "@/components/forms/JoinWaitlistButton";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { HeroPixels } from "@/components/brand/HeroPixels";
import { DevStatus, DriftPixels } from "@/components/motion/decor";
import { Tilt } from "@/components/motion/effects";
import { ScrollTextBand } from "@/components/motion/ScrollTextBand";
import { PixelDissolve } from "@/components/motion/PixelDissolve";
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

export default function ProductsPage() {
  return (
    <>
      <section
        data-hero
        className="border-line relative mt-4 grid items-center gap-8 overflow-hidden rounded-[2rem] border bg-white px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.3fr_1fr]"
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
            className="bg-sun/15 mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-[#9a5c00]"
          >
            <Sparkles className="size-3.5" /> In development: early access opens to the waitlist first
          </p>
        </ScrollReveal>
        <div className="relative mx-auto hidden w-full max-w-[340px] lg:block">
          <HeroPixels className="w-full overflow-visible" />
        </div>
      </section>

      <ScrollReveal as="section" className="mt-6 grid gap-4 md:grid-cols-2">
        {products.map((p) => {
          const Icon = productIcons[p.icon];
          return (
            <div key={p.slug} id={p.slug} data-reveal>
              <Tilt className="h-full" max={5}>
                <article className="group border-line relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 sm:p-7">
                  <PixelDissolve />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="bg-navy text-teal grid size-12 place-items-center rounded-2xl">
                        <Icon className="size-6" />
                      </span>
                      <span className="bg-sun/15 group-hover:bg-sun group-focus-visible:bg-sun group-hover:text-navy group-focus-visible:text-navy rounded-full px-2.5 py-1 text-xs font-semibold text-[#9a5c00] transition-colors delay-150">
                        Coming soon
                      </span>
                    </div>
                    <h2 className="font-display mt-5 text-2xl font-bold tracking-tight transition-colors delay-150 group-hover:text-white group-focus-visible:text-white">
                      {p.name}
                    </h2>
                    <p className="text-brand group-hover:text-teal group-focus-visible:text-teal mt-1 text-xs font-semibold tracking-wider uppercase transition-colors delay-150">
                      For {p.audience.toLowerCase()}
                    </p>
                    <p className="text-muted mt-3 text-sm transition-colors delay-150 group-hover:text-white/75 group-focus-visible:text-white/75">
                      {p.summary}
                    </p>
                    <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-2 transition-colors delay-150 group-hover:text-white group-focus-visible:text-white"
                        >
                          <Check className="text-teal mt-0.5 size-4 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <DevStatus />
                    <div className="mt-auto pt-6">
                      <JoinWaitlistButton product={p.name} />
                    </div>
                  </div>
                </article>
              </Tilt>
            </div>
          );
        })}
      </ScrollReveal>

      <ScrollTextBand words={["Path Lab", "CRM", "Restaurant", "Admission"]} />

      <ScrollReveal as="section" className="border-line mt-6 rounded-[2rem] border bg-white px-6 py-14 sm:px-10">
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
                i === 1 ? "border-brand bg-navy overflow-hidden text-white" : "glow-border border-line bg-mist"
              }`}
            >
              {i === 1 ? (
                <>
                  {/* A light that keeps circling the edge: a rotating gradient behind a navy inner panel. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-[60%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_60%,#1fb89a_75%,#0b57c2_85%,transparent_95%)]"
                  />
                  <span aria-hidden className="bg-navy absolute inset-[1.5px] rounded-[calc(1.5rem-1.5px)]" />
                  <span className="bg-teal text-navy absolute top-5 right-5 rounded-full px-2.5 py-1 text-xs font-bold uppercase">
                    Most flexible
                  </span>
                </>
              ) : null}
              <div className="relative">
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <p className={`mt-1 text-sm ${i === 1 ? "text-white/70" : "text-muted"}`}>{plan.text}</p>
                <p className="font-display mt-5 text-2xl font-extrabold">
                  <span className={`shimmer-text ${i === 1 ? "text-teal" : "text-brand"}`}>Coming soon</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {plan.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <Check className="text-teal mt-0.5 size-4 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal
        as="section"
        id="waitlist"
        className="bg-navy relative mt-6 overflow-hidden rounded-[2rem] px-6 py-14 sm:px-10"
      >
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
