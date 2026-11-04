import { ArrowRight, ArrowUpRight, Clock, Layers, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { PixelMark } from "@/components/brand/PixelMark";
import { PixelDissolve } from "@/components/motion/PixelDissolve";
import { Magnetic, Tilt, WordReveal } from "@/components/motion/effects";
import { DevStatus, PixelAvatar, PixelRain } from "@/components/motion/decor";
import { InView } from "@/components/motion/InView";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { about, contact, products, whyUs } from "@/content/site";
import { productIcons } from "./icons";
import { SectionHeading } from "./SectionHeading";

const whyIcons = [Users, ShieldCheck, Layers, Clock];

export function WhyUs() {
  return (
    <section id="why-us" className="mt-6 px-2 py-14 sm:px-4">
      <ScrollReveal>
        <SectionHeading eyebrow="Why Pixel Nest Labs" title="A small team that treats your project like its own." />
      </ScrollReveal>
      {/* Cards deal in, tilted alternately, then straighten. */}
      <InView className="deal mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {whyUs.map((w, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <div
              key={w.title}
              style={{ ["--r" as string]: `${i % 2 ? 3 : -3}deg` }}
              className="group glow-border border-line relative overflow-hidden rounded-3xl border bg-white p-6 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgb(10_20_69/0.55)]"
            >
              <PixelDissolve />
              <span
                aria-hidden
                data-num={`0${i + 1}`}
                className="font-display text-navy/[0.06] absolute top-3 right-5 text-6xl font-extrabold transition-colors delay-150 group-hover:text-white/10 before:content-[attr(data-num)]"
              />
              <div className="relative">
                <span className="relative grid size-12 place-items-center">
                  {[0, 870, 1730].map((delay, k) => (
                    <span
                      key={delay}
                      aria-hidden
                      className="orbit-px absolute size-1.5 rounded-[2px]"
                      style={{ ["--d" as string]: `-${delay}ms`, background: ["#1fb89a", "#f7a21b", "#0b57c2"][k] }}
                    />
                  ))}
                  <span className="bg-mist text-brand group-hover:text-teal grid size-12 place-items-center rounded-2xl transition-[background-color,color,transform] delay-150 duration-500 group-hover:rotate-[-8deg] group-hover:bg-white/10">
                    <Icon className="size-6" />
                  </span>
                </span>
                <h3 className="font-display mt-5 text-lg font-bold transition-colors delay-150 group-hover:text-white">
                  {w.title}
                </h3>
                <p className="text-muted mt-1.5 text-sm transition-colors delay-150 group-hover:text-white/75">
                  {w.text}
                </p>
              </div>
            </div>
          );
        })}
      </InView>
    </section>
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
      <InView className="deal mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((p) => {
          const Icon = productIcons[p.icon];
          return (
            <div key={p.slug}>
              <Tilt className="h-full">
                <Link
                  href={`/products#${p.slug}`}
                  className="group border-line bg-mist relative flex h-full flex-col overflow-hidden rounded-3xl border p-6"
                >
                  <PixelDissolve />
                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <span className="text-brand grid size-11 place-items-center rounded-xl bg-white shadow-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
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
                      Join waitlist{" "}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </p>
                    <div className="mt-auto">
                      <DevStatus />
                    </div>
                  </div>
                </Link>
              </Tilt>
            </div>
          );
        })}
      </InView>
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
            <div className="glow-border bg-mist rounded-2xl p-4">
              <p className="text-brand text-xs font-semibold tracking-wider uppercase">Mission</p>
              <p className="mt-1 text-sm">[One line on what you do for your clients.]</p>
            </div>
            <div className="glow-border bg-mist rounded-2xl p-4">
              <p className="text-brand text-xs font-semibold tracking-wider uppercase">Vision</p>
              <p className="mt-1 text-sm">[One line on where you want the studio to go.]</p>
            </div>
          </div>
        </div>
        <InView className="deal grid gap-4 sm:grid-cols-2">
          {about.founders.map((f, i) => (
            <div
              key={i}
              style={{ ["--r" as string]: `${i % 2 ? 2 : -2}deg` }}
              className="group glow-border border-line bg-mist rounded-3xl border p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <PixelAvatar seed={i + 3} />
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
        </InView>
      </div>
      <div className="bg-navy relative mt-10 overflow-hidden rounded-2xl">
        <div className="pixel-grid-dark absolute inset-0" aria-hidden />
        <InView
          as="ul"
          className="pop relative flex flex-wrap justify-center gap-x-3 gap-y-2 px-5 py-4 text-sm font-semibold text-white"
        >
          {about.experienceStrip.map((item, i) => (
            <li key={i} style={{ ["--i" as string]: i }} className="flex items-center gap-3">
              {i > 0 ? (
                <span className="bg-teal size-1.5 animate-[spin_4s_linear_infinite] rounded-[2px]" aria-hidden />
              ) : null}
              {item}
            </li>
          ))}
        </InView>
      </div>
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
      <PixelRain seed={4} />
      <div className="bg-teal/30 absolute -right-24 -bottom-24 size-80 rounded-full blur-[100px]" aria-hidden />
      <PixelMark className="absolute -right-6 -bottom-8 h-48 w-auto animate-[spin_40s_linear_infinite] opacity-15 sm:h-60" />
      <div className="relative max-w-xl">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          <WordReveal text={title} />
        </h2>
        <p data-reveal className="mt-3 text-white/70">
          {text}
        </p>
        <div data-reveal className="mt-7 flex flex-wrap gap-3">
          <Magnetic className="relative inline-block">
            {/* Soft ping ring to draw the eye to the main button */}
            <span
              aria-hidden
              className="ping-soft border-teal pointer-events-none absolute inset-0 rounded-full border-2"
            />
            <a
              href="#contact"
              className="group bg-teal text-navy relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:bg-white"
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
