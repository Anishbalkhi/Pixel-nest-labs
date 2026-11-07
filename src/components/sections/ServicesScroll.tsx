"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { ImageSlot } from "@/components/media/ImageSlot";
import { getLenis } from "@/components/motion/SmoothScroll";
import { services } from "@/content/site";
import { serviceIcons } from "./icons";
import { SectionHeading } from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Colour of each panel's giant number. Light enough that navy text stays readable on top. */
const numberColors = ["#f7a21b", "#1fb89a", "#7ea6e6", "#6fb7dd", "#ffc861"];
/** Colour of the built-in artwork behind each service's picture. */
const artColors = ["#0b57c2", "#0a0f2c", "#1fb89a", "#0e76a6", "#0a0f2c"];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Services: each one is a wide panel with a giant coloured number, a tall
 * condensed headline overlapping a picture, and the details on the right.
 * On desktop the section pins and the panels scroll sideways (numbers and
 * pictures move at their own speed); ticks on the right show which panel
 * you're on. On phones, tablets and with reduced motion it's a swipeable row.
 */
export function ServicesScroll() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const ticks = useRef<HTMLOListElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [shown, setShown] = useState(0);

  // Phones: work out which card is centred in the swipe row, and scroll to one on request.
  const onSwipe = () => {
    const t = track.current;
    if (!t || t.dataset.pinned !== undefined) return;
    const cards = [...t.querySelectorAll<HTMLElement>("[data-panel]")];
    const mid = t.scrollLeft + t.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (
        Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) <
        Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)
      )
        best = i;
    });
    setShown(best);
  };
  const showCard = (i: number) => {
    const t = track.current;
    const card = t?.querySelectorAll<HTMLElement>("[data-panel]")[i];
    if (t && card) t.scrollTo({ left: card.offsetLeft - (t.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)", () => {
        // The panels only overflow visibly while pinned; otherwise the row stays a normal swipeable scroller.
        track.current!.dataset.pinned = "";
        const distance = () => {
          const t = track.current!;
          return Math.max(0, t.scrollWidth - t.clientWidth);
        };
        let active = -1;
        const setActive = (progress: number) => {
          const i = Math.round(progress * (services.length - 1));
          if (i === active) return;
          active = i;
          ticks.current?.querySelectorAll("li").forEach((li, k) => li.toggleAttribute("data-on", k === i));
          if (counter.current) counter.current.textContent = pad(i + 1);
        };
        setActive(0);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: "top 72px",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(self.progress),
          },
        });
        tl.to(track.current, { x: () => -distance(), ease: "none" }, 0).fromTo(
          bar.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0,
        );
        trigger.current = tl.scrollTrigger ?? null;

        // Numbers drift against the scroll and pictures lag slightly: a little depth as panels pass.
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          const along = { trigger: panel, containerAnimation: tl, start: "left right", end: "right left", scrub: true };
          gsap.fromTo(
            panel.querySelector("[data-num]"),
            { xPercent: 40 },
            { xPercent: -40, ease: "none", scrollTrigger: along },
          );
          // The built-in artwork, or the photo once one is added (it's scaled up a little so it never shows an edge).
          const pics = panel.querySelectorAll("[data-pic], img, video");
          if (pics.length) gsap.fromTo(pics, { x: 36 }, { x: -36, ease: "none", scrollTrigger: along });
        });

        return () => {
          delete track.current?.dataset.pinned;
          trigger.current = null;
        };
      });
    },
    { scope: section },
  );

  // Keyboard users tabbing to "Get a quote" on a panel that's still off to the side:
  // scroll the page to where that panel is in view instead of letting the browser
  // shift the clipped row sideways.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    const st = trigger.current;
    const panel = (e.target as HTMLElement).closest<HTMLElement>("[data-panel]");
    if (!st || !panel || !track.current || !section.current) return;
    section.current.scrollLeft = 0;
    track.current.scrollLeft = 0;
    const max = track.current.scrollWidth - track.current.clientWidth;
    if (max <= 0) return;
    const progress = Math.min(1, Math.max(0, (panel.offsetLeft - 40) / max));
    const y = st.start + progress * (st.end - st.start);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  };

  return (
    <section
      id="services"
      ref={section}
      className="border-line relative mt-6 flex flex-col justify-center overflow-hidden border bg-white py-10 lg:min-h-[min(calc(100dvh-6rem),860px)] lg:py-10"
    >
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative flex flex-wrap items-end justify-between gap-4 px-6 sm:px-10">
        <SectionHeading
          size="md"
          eyebrow="What we do"
          title="Five ways we help your business grow."
          text="Pick one service or combine them. Every project starts with a free call."
        />
        {/* Progress: "01 / 05", a tick per service and a bar that fills as the panels pass. */}
        <div className="hidden w-48 lg:block" aria-hidden>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-muted text-xs font-medium">Scroll to explore</span>
            <span className="font-condensed text-navy text-sm tracking-wide">
              <span ref={counter}>01</span> / {pad(services.length)}
            </span>
          </div>
          <ol ref={ticks} className="mb-2 flex h-3 items-end gap-1.5">
            {services.map((s, i) => (
              <li
                key={s.slug}
                style={{ ["--c" as string]: numberColors[i] } as CSSProperties}
                className="bg-navy/20 h-1.5 flex-1 rounded-full transition-[height,background-color] duration-300 data-[on]:h-3 data-[on]:bg-[var(--c)]"
              />
            ))}
          </ol>
          <div className="bg-line h-1 overflow-hidden rounded-full">
            <div ref={bar} className="bg-navy h-full origin-left scale-x-0 rounded-full" />
          </div>
        </div>
      </div>

      <div
        ref={track}
        onFocus={onFocus}
        onScroll={onSwipe}
        className="relative mt-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto px-6 pb-4 data-[pinned]:overflow-visible sm:px-10 lg:mt-6 lg:[scrollbar-width:thin] lg:gap-20 lg:pr-24"
      >
        {services.map((s, i) => {
          const Icon = serviceIcons[s.icon];
          return (
            <article
              key={s.slug}
              data-panel
              id={s.slug}
              className="group bg-mist relative flex w-[84vw] max-w-[420px] shrink-0 snap-center flex-col overflow-hidden rounded-3xl p-5 sm:p-6 lg:block lg:h-[clamp(400px,calc(100dvh-22rem),560px)] lg:w-[min(1040px,80vw)] lg:max-w-none lg:overflow-visible lg:rounded-none lg:bg-transparent lg:p-0"
            >
              {/* Giant number. Drawn with CSS content so it isn't read out. */}
              <span
                data-num
                aria-hidden
                data-n={i + 1}
                style={{ color: numberColors[i] }}
                className="font-condensed pointer-events-none absolute -top-5 -right-2 text-[9.5rem] leading-none select-none before:content-[attr(data-n)] lg:top-1/2 lg:right-auto lg:left-[34%] lg:-translate-y-1/2 lg:text-[clamp(26rem,calc(100dvh-14rem),38rem)] lg:leading-[0.78]"
              />

              <div className="relative z-20 lg:absolute lg:top-0 lg:left-0 lg:w-[62%]">
                <p className="text-navy/70 text-[11px] font-semibold tracking-[0.2em] uppercase">
                  Service {pad(i + 1)}
                </p>
                <h3 className="font-condensed text-navy mt-2 pr-16 text-[2.6rem] leading-[0.9] uppercase lg:text-[clamp(3.5rem,6.2vw,6.5rem)] lg:leading-[0.86]">
                  {s.title}
                </h3>
              </div>

              <ImageSlot
                src={s.image}
                video={s.video}
                alt={s.title}
                sizes="(min-width: 1024px) 40vw, 86vw"
                hint={`service ${s.slug}`}
                imageClassName="scale-[1.15]"
                className="relative z-10 mt-4 aspect-[16/9] rounded-2xl shadow-[0_30px_60px_-30px_rgb(10_20_69/0.6)] lg:absolute lg:bottom-[6%] lg:left-[10%] lg:mt-0 lg:aspect-[16/10] lg:w-[50%]"
              >
                <div data-pic className="absolute -inset-x-16 inset-y-0" style={{ background: artColors[i] }}>
                  <div className="pixel-grid-dark absolute inset-0" />
                </div>
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid size-20 place-items-center rounded-3xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] lg:size-24">
                    <Icon className="size-10 lg:size-12" />
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex gap-1">
                  {numberColors.slice(0, 4).map((c, k) => (
                    <span key={k} className="size-2" style={{ background: c }} />
                  ))}
                </div>
              </ImageSlot>

              <div className="relative z-20 mt-5 flex flex-1 flex-col lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[28%] lg:pl-6">
                <div className="hidden items-start gap-3 lg:flex">
                  <span
                    className="text-navy/60 text-[10px] font-semibold tracking-[0.25em] uppercase [writing-mode:vertical-rl]"
                    aria-hidden
                  >
                    Service · {pad(i + 1)}
                  </span>
                  <p className="text-navy text-sm leading-relaxed font-medium">{s.summary}</p>
                </div>
                <p className="text-muted text-sm lg:hidden">{s.summary}</p>
                <ul className="mt-4 mb-5 space-y-1.5 text-sm lg:mt-5 lg:space-y-2">
                  {s.included.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal-700" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 hidden flex-wrap gap-1.5 lg:flex" aria-label="Technologies">
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
                  className="group/cta text-navy hover:bg-navy mt-auto inline-flex w-full items-center justify-between gap-3 bg-white px-5 py-3.5 text-xs font-bold tracking-[0.18em] uppercase shadow-[0_10px_30px_-12px_rgb(10_20_69/0.35)] transition-colors hover:text-white lg:mt-auto lg:w-fit lg:justify-start"
                >
                  Get a quote
                  <ArrowRight
                    className="size-4 transition-transform group-hover/cta:translate-x-1"
                    style={{ color: numberColors[i] }}
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Phones: which card you're on; tap a dot to jump to it */}
      <div className="relative mt-2 flex justify-center lg:hidden">
        {services.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            aria-label={`Show ${s.title}`}
            aria-current={i === shown}
            onClick={() => showCard(i)}
            className="grid size-9 place-items-center"
          >
            <span
              className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                i === shown ? "w-6" : "bg-navy/20 w-2"
              }`}
              style={i === shown ? { background: numberColors[i] } : undefined}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
