"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { useRef, type FocusEvent } from "react";
import { getLenis } from "@/components/motion/SmoothScroll";
import { Tilt } from "@/components/motion/effects";
import { services } from "@/content/site";
import { serviceIcons } from "./icons";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const accents = ["#0b57c2", "#1fb89a", "#0e76a6", "#f7a21b", "#0a1445"];

/**
 * Services: on desktop the section pins and the cards scroll sideways as you
 * scroll down. On small screens and with reduced motion it's a swipeable row.
 */
export function ServicesScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)", () => {
        // The cards only overflow visibly while pinned; otherwise the row stays a normal swipeable scroller.
        track.current!.dataset.pinned = "";
        const distance = () => {
          const t = track.current!;
          return Math.max(0, t.scrollWidth - t.clientWidth);
        };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top 72px",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track.current, { x: () => -distance(), ease: "none" }, 0).fromTo(
          bar.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
        trigger.current = tl.scrollTrigger ?? null;
        return () => {
          delete track.current?.dataset.pinned;
          trigger.current = null;
        };
      });
    },
    { scope: section },
  );

  // Keyboard users tabbing to "Get a quote" on a card that's still off to the side:
  // scroll the page to where that card is in view instead of letting the browser
  // shift the clipped row sideways.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const st = trigger.current;
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!st || !card || !track.current || !section.current) return;
    section.current.scrollLeft = 0;
    track.current.scrollLeft = 0;
    const max = track.current.scrollWidth - track.current.clientWidth;
    if (max <= 0) return;
    const progress = Math.min(1, Math.max(0, (card.offsetLeft - 40) / max));
    const y = st.start + progress * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  return (
    <section
      id="services"
      ref={section}
      className="border-line relative mt-6 flex flex-col justify-center overflow-hidden rounded-[2rem] border bg-white py-10 md:min-h-[min(calc(100dvh-6rem),820px)] md:py-12"
    >
      <div
        className="pixel-grid absolute inset-x-0 top-0 h-48 [mask-image:linear-gradient(black,transparent)]"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-end justify-between gap-4 px-6 sm:px-10">
        <SectionHeading
          eyebrow="What we do"
          title="Five ways we help your business grow."
          text="Pick one service or combine them. Every project starts with a free call."
        />
        <div className="hidden w-40 md:block" aria-hidden>
          <p className="text-muted mb-2 text-xs font-medium">Scroll to explore</p>
          <div className="bg-line h-1 overflow-hidden rounded-full">
            <div ref={bar} className="bg-teal h-full origin-left scale-x-0 rounded-full" />
          </div>
        </div>
      </div>

      <p className="text-muted relative mt-6 px-6 text-xs font-medium sm:px-10 md:hidden" aria-hidden>
        Swipe to see all {services.length} services →
      </p>
      <div
        ref={track}
        onFocus={onFocus}
        className="relative mt-4 flex snap-x snap-mandatory [scrollbar-width:thin] gap-5 overflow-x-auto px-6 pb-4 data-[pinned]:overflow-visible sm:px-10 md:mt-8"
      >
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon];
          return (
            <Tilt key={s.slug} className="w-[82vw] max-w-[400px] shrink-0 snap-start md:w-[380px]">
              <article
                data-card
                id={s.slug}
                className="group border-line bg-mist hover:border-brand/40 relative flex h-full flex-col rounded-3xl border p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgb(11_87_194/0.5)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg]"
                    style={{ background: accents[i % accents.length] }}
                  >
                    <Icon className="size-6" />
                  </span>
                  {/* Decorative number drawn with CSS so it isn't read out or checked as text. */}
                  <span
                    aria-hidden
                    data-num={`0${i + 1}`}
                    className="font-display text-navy/10 text-4xl font-extrabold before:content-[attr(data-num)]"
                  />
                </div>
                <h3 className="font-display mt-5 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="text-muted mt-2 text-sm">{s.summary}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {s.tech.map((t) => (
                    <li
                      key={t}
                      className="border-line text-navy/80 rounded-md border bg-white px-2 py-1 text-xs font-medium"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="text-brand mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold"
                >
                  Get a quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            </Tilt>
          );
        })}
      </div>
    </section>
  );
}
