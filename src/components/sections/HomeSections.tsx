import { ArrowRight, ArrowUpRight, Clock, Layers, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { PixelMark } from "@/components/brand/PixelMark";
import { PixelDissolve } from "@/components/motion/PixelDissolve";
import { Magnetic, Tilt } from "@/components/motion/effects";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { about, contact, products, whyUs } from "@/content/site";
import { productIcons } from "./icons";
import { SectionHeading } from "./SectionHeading";

const whyIcons = [Users, ShieldCheck, Layers, Clock];

export function WhyUs() {
  return (
    <ScrollReveal as="section" className="mt-6 px-2 py-14 sm:px-4">
      <SectionHeading eyebrow="Why Pixel Nest Labs" title="A small team that treats your project like its own." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {whyUs.map((w, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <div
              key={w.title}
              data-reveal
              className="group border-line relative overflow-hidden rounded-3xl border bg-white p-6"
            >
              <PixelDissolve />
              <div className="relative">
                <Icon className="text-brand group-hover:text-teal group-focus-visible:text-teal group-focus-within:text-teal size-6 transition-colors delay-150" />
                <h3 className="font-display mt-4 text-lg font-bold transition-colors delay-150 group-hover:text-white group-focus:text-white group-focus-visible:text-white">
                  {w.title}
                </h3>
                <p className="text-muted mt-1.5 text-sm transition-colors delay-150 group-hover:text-white/75 group-focus:text-white/75 group-focus-visible:text-white/75">
                  {w.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}

export function ProductsPreview() {
  return (
    <ScrollReveal
      as="section"
      id="products"
      className="border-line mt-6 rounded-[2rem] border bg-white px-6 py-14 sm:px-10"
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
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p) => {
          const Icon = productIcons[p.icon];
          return (
            <div key={p.slug} data-reveal>
              <Tilt className="h-full">
                <Link
                  href={`/products#${p.slug}`}
                  className="group border-line bg-mist relative block h-full overflow-hidden rounded-3xl border p-6"
                >
                  <PixelDissolve />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <span className="text-brand grid size-11 place-items-center rounded-xl bg-white shadow-sm">
                        <Icon className="size-5" />
                      </span>
                      <span className="bg-sun/15 group-hover:bg-sun group-focus-visible:bg-sun group-hover:text-navy group-focus-visible:text-navy rounded-full px-2.5 py-1 text-xs font-semibold text-[#9a5c00] transition-colors delay-150">
                        In development
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-lg font-bold transition-colors delay-150 group-hover:text-white group-focus-visible:text-white">
                      {p.name}
                    </h3>
                    <p className="text-muted mt-1 text-sm transition-colors delay-150 group-hover:text-white/75 group-focus-visible:text-white/75">
                      {p.summary}
                    </p>
                    <p className="text-brand group-hover:text-teal group-focus-visible:text-teal mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors delay-150">
                      Join waitlist <ArrowUpRight className="size-4" />
                    </p>
                  </div>
                </Link>
              </Tilt>
            </div>
          );
        })}
      </div>
    </ScrollReveal>
  );
}

export function About() {
  return (
    <ScrollReveal
      as="section"
      id="about"
      className="border-line mt-6 rounded-[2rem] border bg-white px-6 py-14 sm:px-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="About us" title={about.title} />
          <p data-reveal className="text-muted mt-4">
            {about.story}
          </p>
          <div data-reveal className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-mist rounded-2xl p-4">
              <p className="text-brand text-xs font-semibold tracking-wider uppercase">Mission</p>
              <p className="mt-1 text-sm">[One line on what you do for your clients.]</p>
            </div>
            <div className="bg-mist rounded-2xl p-4">
              <p className="text-brand text-xs font-semibold tracking-wider uppercase">Vision</p>
              <p className="mt-1 text-sm">[One line on where you want the studio to go.]</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {about.founders.map((f, i) => (
            <div key={i} data-reveal className="border-line bg-mist rounded-3xl border p-5">
              <div className="flex items-center gap-3">
                <span className="bg-navy grid size-14 place-items-center rounded-2xl" aria-hidden>
                  <PixelMark className="h-7 w-auto" />
                </span>
                <div>
                  <p className="font-display font-bold">{f.name}</p>
                  <p className="text-muted text-xs">{f.role}</p>
                </div>
              </div>
              <p className="text-muted mt-4 text-sm">{f.bio}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {f.skills.map((s, j) => (
                  <li key={j} className="rounded-md bg-white px-2 py-1 text-xs font-medium">
                    {s}
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
          ))}
        </div>
      </div>
      <ul
        data-reveal
        className="bg-navy mt-10 flex flex-wrap justify-center gap-x-3 gap-y-2 rounded-2xl px-5 py-4 text-sm font-semibold text-white"
      >
        {about.experienceStrip.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            {i > 0 ? <span className="bg-teal size-1.5 rounded-[2px]" aria-hidden /> : null}
            {item}
          </li>
        ))}
      </ul>
    </ScrollReveal>
  );
}

export function CTASection({
  title = "Have an idea? Let's build it, pixel by pixel.",
  text = "Tell us about your project in the form, or book a free 20-minute call.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <ScrollReveal
      as="section"
      className="bg-navy relative mt-6 overflow-hidden rounded-[2rem] px-6 py-14 text-white sm:px-10"
    >
      <div className="pixel-grid-dark absolute inset-0" aria-hidden />
      <div className="bg-teal/30 absolute -right-24 -bottom-24 size-80 rounded-full blur-[100px]" aria-hidden />
      <PixelMark className="absolute -right-6 -bottom-8 h-48 w-auto animate-[spin_40s_linear_infinite] opacity-15 sm:h-60" />
      <div className="relative max-w-xl">
        <h2 data-reveal className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p data-reveal className="mt-3 text-white/70">
          {text}
        </p>
        <div data-reveal className="mt-7 flex flex-wrap gap-3">
          <Magnetic>
            <a
              href="#contact"
              className="group bg-teal text-navy inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white"
            >
              Send a message <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          {contact.bookingUrl ? (
            <Magnetic>
              <a
                href={contact.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Book a call <ArrowUpRight className="size-4" />
              </a>
            </Magnetic>
          ) : null}
        </div>
      </div>
    </ScrollReveal>
  );
}
