import type { CSSProperties } from "react";
import { PixelAvatar } from "@/components/motion/decor";
import { CountUp } from "@/components/motion/CountUp";
import { InView } from "@/components/motion/InView";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ImageSlot } from "@/components/media/ImageSlot";
import { PixelMark } from "@/components/brand/PixelMark";
import { Doodle } from "@/components/brand/Doodle";
import { PaperClip, Sticker, type StickerKind } from "@/components/brand/Sticker";
import { about } from "@/content/site";

/** Card colour, halftone tint, sticker and slight tilt for each founder. */
const founderStyles: {
  tint: string;
  deep: string;
  sticker: [StickerKind, string];
  r: number;
}[] = [
  { tint: "#1fb89a", deep: "#179a80", sticker: ["smile", "#f7a21b"], r: -1 },
  { tint: "#f7a21b", deep: "#e08e0b", sticker: ["heart", "#e8622a"], r: 1 },
];

/** Splits "4 products in development" into 4 and the label, so the number can count up. */
function splitStat(item: string) {
  const m = item.match(/^(\d+)(\+?)\s+(.*)$/);
  return m ? { n: Number(m[1]), plus: m[2], label: m[3] } : null;
}

const HEADLINE = "Founders";

/**
 * About: a giant "FOUNDERS" headline, then a sticker-kit collage. The team photo
 * is taped over grid paper and a colour block, the story is a quote card with a
 * torn paper label, each founder gets a colour quote card with a
 * portrait popping out of it and a torn name label, and the numbers sit
 * in pills. Mission and vision close it as two quote cards.
 */
export function About() {
  return (
    <section
      id="about"
      className="border-line relative mt-6 overflow-hidden border bg-white px-4 pt-14 pb-16 sm:px-10 sm:pt-16 sm:pb-20"
    >
      <div className="grain absolute inset-0" aria-hidden />

      {/* ---------- Headline ---------- */}
      <ScrollReveal className="relative text-center">
        <p
          data-reveal
          className="text-navy flex items-center justify-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase"
        >
          <span className="flex gap-[3px]" aria-hidden>
            <span className="bg-brand size-2" />
            <span className="bg-teal size-2" />
            <span className="bg-sun size-2" />
          </span>
          About us
        </p>

        <h2 className="relative mx-auto mt-3 w-fit">
          <span className="sr-only">Meet the founders</span>
          <span
            aria-hidden
            className="font-hand relative z-10 -mb-1 block -rotate-[6deg] text-[clamp(1.6rem,5.2vw,3.75rem)] leading-none font-bold text-[#e8622a] sm:absolute sm:top-[2%] sm:-left-[4%] sm:mb-0 sm:-rotate-[8deg]"
          >
            meet the
          </span>
          <InView
            as="span"
            aria-hidden
            className="rise-letters font-condensed text-navy block overflow-hidden text-[clamp(4.5rem,20vw,15.5rem)] leading-[0.95] uppercase"
          >
            {HEADLINE.split("").map((ch, i) => (
              <span key={i} style={{ ["--i" as string]: i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </InView>
          <Sticker
            kind="burst"
            color="#f7a21b"
            className="sticker-float absolute -top-2 -right-6 size-12 sm:-right-10 sm:size-20"
          />
        </h2>

        <p data-reveal className="font-display text-navy mt-4 text-xl font-extrabold sm:text-2xl">
          {about.title}
        </p>
        <p data-reveal className="text-muted mx-auto mt-2 max-w-md">
          A small studio by design: you always know who&apos;s building your project.
        </p>
      </ScrollReveal>

      {/* ---------- Collage ---------- */}
      <div className="relative mx-auto mt-14 grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left: taped team photo + story */}
        <InView className="deal relative flex flex-col gap-12 lg:col-span-5">
          <div className="relative mx-2 sm:mx-6">
            <span aria-hidden className="grid-paper absolute -top-5 -right-5 h-3/4 w-3/4" />
            <span aria-hidden className="absolute -bottom-5 -left-5 h-1/2 w-2/3 bg-[#e8622a]" />
            <ImageSlot
              src={about.teamImage}
              video={about.teamVideo}
              alt="The Pixel Nest Labs founders"
              sizes="(min-width: 1024px) 34vw, 92vw"
              hint="the two founders together (4:3)"
              className="border-navy bg-brand relative aspect-[4/3] border-2"
              imageClassName="grayscale"
            >
              <div className="pixel-grid-dark absolute inset-0" />
              <div className="absolute inset-0 grid place-items-center text-center text-white">
                <div>
                  <PixelMark className="mx-auto h-14 w-auto" />
                  <p className="font-condensed mt-3 text-3xl leading-[0.95] uppercase sm:text-4xl">
                    Hello from
                    <br />
                    <span className="text-sun">the nest.</span>
                  </p>
                </div>
              </div>
            </ImageSlot>
            {/* Tape */}
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 bg-[#fdf3d6]/85 shadow-sm"
            />
            <Sticker kind="smile" color="#1fb89a" className="sticker-wobble absolute -right-3 -bottom-6 size-14" />
          </div>

          {/* Story: quote card with a torn label */}
          <div className="relative">
            <div className="bg-brand relative px-6 pt-6 pb-16 text-white sm:px-8 sm:pt-8">
              <span aria-hidden className="font-condensed text-sun block text-7xl leading-[0.55]">
                &ldquo;
              </span>
              <p className="mt-4 text-lg leading-relaxed font-semibold">{about.story}</p>
              <span aria-hidden className="absolute top-5 right-5 flex gap-1.5">
                <span className="size-2 rounded-full bg-white/80" />
                <span className="size-2 rounded-full bg-white/50" />
                <span className="size-2 rounded-full bg-white/25" />
              </span>
            </div>
            <div className="torn-paper text-navy absolute -bottom-6 left-5 -rotate-2 bg-[#efe9dc] px-5 pt-3 pb-4 shadow-[0_8px_18px_-8px_rgb(10_15_44/0.4)]">
              <p className="font-condensed text-2xl leading-none uppercase">Our story</p>
              <p className="text-muted mt-1 text-xs font-semibold">How Pixel Nest Labs began</p>
              <PaperClip className="absolute -top-5 right-3 h-12 w-auto rotate-12" />
            </div>
          </div>
        </InView>

        {/* Right: the founders as quote cards with a cut-out portrait and a torn name label */}
        <InView className="deal relative flex flex-col gap-20 pt-8 lg:col-span-7 lg:gap-24">
          {about.founders.map((f, i) => {
            const s = founderStyles[i % founderStyles.length];
            const flip = i % 2 === 1;
            return (
              <article
                key={i}
                className={`group relative ${flip ? "sm:mr-8" : "sm:ml-8"}`}
                style={{ ["--r" as string]: `${s.r}deg` } as CSSProperties}
              >
                {/* Ink dots scattered around the card */}
                <span aria-hidden className="pointer-events-none absolute inset-0">
                  <span
                    className={`bg-navy absolute -top-5 size-2.5 rounded-full ${flip ? "right-[48%]" : "left-[52%]"}`}
                  />
                  <span className={`bg-navy absolute top-1/3 size-1.5 rounded-full ${flip ? "-right-4" : "-left-4"}`} />
                  <span
                    className={`bg-navy absolute -bottom-6 size-2 rounded-full ${flip ? "right-1/4" : "left-1/4"}`}
                  />
                </span>

                <div
                  className={`border-navy relative grid grid-cols-1 border-2 shadow-[8px_8px_0_0_#0a0f2c] ${
                    flip ? "sm:grid-cols-[42%_1fr]" : "sm:grid-cols-[1fr_42%]"
                  }`}
                  style={{ background: s.tint, rotate: "var(--r)" }}
                >
                  {/* Quote: the bio and skills */}
                  <div className={`order-2 p-5 pt-11 pb-6 sm:p-7 ${flip ? "" : "sm:order-1"}`}>
                    <span aria-hidden className="font-condensed block text-6xl leading-[0.55] text-white">
                      &ldquo;
                    </span>
                    <p className="font-display text-navy mt-3 text-base leading-snug font-extrabold sm:text-xl">
                      {f.bio}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {f.skills.map((sk, j) => (
                        <li
                          key={j}
                          className="border-navy rounded-full border-2 bg-white px-2.5 py-0.5 text-[11px] font-semibold sm:text-xs"
                        >
                          {sk}
                        </li>
                      ))}
                    </ul>
                    {f.linkedin ? (
                      <a
                        href={f.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-navy hover:bg-brand mt-4 inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-colors"
                      >
                        LinkedIn ↗
                      </a>
                    ) : null}
                  </div>

                  {/* Portrait popping out of the top of the card */}
                  <div
                    className={`relative order-1 mx-auto w-[64%] max-w-[240px] pb-2 sm:w-auto sm:max-w-none sm:pb-8 ${
                      flip ? "sm:ml-0 sm:pl-6" : "sm:order-2 sm:mr-0 sm:pr-6"
                    }`}
                  >
                    <ImageSlot
                      src={f.image}
                      alt={f.name}
                      sizes="(min-width: 1024px) 22vw, 40vw"
                      hint={`founder ${i + 1} portrait (4:5)`}
                      className="border-navy relative -mt-10 aspect-[4/5] border-2 bg-white transition-transform duration-500 group-hover:-translate-y-2 sm:-mt-14"
                      imageClassName="grayscale contrast-110"
                    >
                      <div className="absolute inset-0" style={{ background: s.deep }} />
                      <div className="halftone absolute inset-0" />
                      <div className="absolute inset-0 grid place-items-center">
                        <PixelAvatar seed={i + 3} className="size-20! p-2.5! sm:size-28! sm:p-3!" />
                      </div>
                    </ImageSlot>

                    {/* Torn name label, clipped on */}
                    <div
                      className={`torn-paper text-navy absolute bottom-[-18px] z-10 w-[118%] max-w-[260px] bg-[#efe9dc] px-4 pt-2.5 pb-3.5 shadow-[0_8px_18px_-8px_rgb(10_15_44/0.45)] sm:px-5 ${
                        flip ? "left-2 rotate-2" : "right-2 -rotate-2"
                      }`}
                    >
                      <h3 className="font-condensed text-xl leading-none uppercase sm:text-2xl">{f.name}</h3>
                      <p className="text-muted mt-1 text-[10px] font-bold tracking-[0.14em] uppercase sm:text-[11px]">
                        {f.role}
                      </p>
                      <PaperClip
                        className={`absolute -top-5 h-11 w-auto ${flip ? "right-4 rotate-12" : "right-5 rotate-6"}`}
                      />
                    </div>
                  </div>
                </div>

                <Sticker
                  kind={s.sticker[0]}
                  color={s.sticker[1]}
                  className={`sticker-wobble absolute -top-6 z-20 size-12 sm:size-14 ${flip ? "-left-4 -rotate-12" : "-right-4 rotate-12"}`}
                />
              </article>
            );
          })}
        </InView>
      </div>

      {/* ---------- Numbers, mission and vision ---------- */}
      <InView className="deal relative mx-auto mt-20 grid max-w-6xl gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Numbers as a sticker-kit pill list */}
        <div className="bg-sun border-navy relative border-2 shadow-[8px_8px_0_0_#0a0f2c] lg:col-span-5">
          <div className="p-6 pb-7 sm:p-7">
            <p className="font-condensed text-navy text-3xl leading-none uppercase">In numbers</p>
            <ul className="mt-5 space-y-2.5">
              {about.experienceStrip.map((item, i) => {
                const stat = splitStat(item);
                return (
                  <li
                    key={i}
                    className="border-navy flex items-center gap-3 rounded-full border-2 bg-white py-1.5 pr-5 pl-2"
                  >
                    <Sticker
                      kind="spark"
                      color={["#0b57c2", "#1fb89a", "#e8622a", "#0b57c2"][i % 4]}
                      className="size-8 shrink-0"
                    />
                    {stat ? (
                      <p className="text-navy flex items-baseline gap-2">
                        <span className="font-condensed text-3xl leading-none">
                          <CountUp value={stat.n} />
                          {stat.plus}
                        </span>
                        <span className="text-sm font-semibold">{stat.label}</span>
                      </p>
                    ) : (
                      <p className="text-navy text-sm font-semibold">{item}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div aria-hidden className="grid-paper border-navy h-12 border-t-2" />
        </div>

        {/* Mission and vision as quote cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-rows-[1fr_auto]">
          {(
            [
              ["Mission", about.mission, "#e8622a", "#1fb89a"],
              ["Vision", about.vision, "#0b57c2", "#f7a21b"],
            ] as const
          ).map(([label, text, quote, mark], i) => (
            <div
              key={label}
              className="border-navy relative flex flex-col border-2 bg-[#fbf7ef] p-6 shadow-[8px_8px_0_0_#0a0f2c] sm:p-7"
            >
              <span aria-hidden className="font-condensed block text-7xl leading-[0.55]" style={{ color: quote }}>
                &ldquo;
              </span>
              <h3 className="mt-5">
                <span
                  className="font-condensed text-navy rounded-full px-3 py-0.5 text-xl uppercase"
                  style={{ background: `${mark}55` }}
                >
                  {label}
                </span>
              </h3>
              <p className="font-display text-navy mt-4 text-lg leading-snug font-bold">{text}</p>
              <p aria-hidden className="font-hand text-muted mt-auto pt-6 text-xl">
                &mdash; the Pixel Nest Labs team
              </p>
              <Sticker
                kind={i === 0 ? "burst" : "spark"}
                color={mark}
                className="sticker-wobble absolute -top-5 -right-4 size-12"
              />
            </div>
          ))}
          <Doodle
            kind="loop"
            color="#0a0f2c"
            width={2.5}
            className="hidden h-auto w-40 justify-self-end opacity-60 sm:col-span-2 sm:block"
          />
        </div>
      </InView>
    </section>
  );
}
