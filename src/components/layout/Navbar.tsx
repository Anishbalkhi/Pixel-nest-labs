"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PixelMark, Wordmark } from "@/components/brand/PixelMark";
import { Magnetic } from "@/components/motion/effects";
import { contact, nav, site } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    // Hide while scrolling down, show again as soon as the visitor scrolls up.
    if (y > 400 && y > prev + 2 && !open) setHidden(true);
    else if (y < prev - 2 || y <= 400) setHidden(false);
  });

  const bookHref = contact.bookingUrl || "#contact";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      // Bring the bar back if a keyboard user tabs into it while it's tucked away.
      onFocusCapture={() => setHidden(false)}
      className={`sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-line/80 border-b bg-white/75 shadow-[0_8px_30px_-20px_rgb(10_20_69/0.4)] backdrop-blur-xl"
          : "bg-mist/85 border-b border-transparent backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} home`}
          onClick={() => setOpen(false)}
        >
          <PixelMark className="h-7 w-auto transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
          <Wordmark className="text-lg" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = item.href === pathname;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`after:bg-teal hover:text-brand relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                    active ? "text-brand" : "text-navy/80"
                  }`}
                >
                  {active ? (
                    <motion.span layoutId="nav-active" className="bg-brand/10 absolute inset-0 -z-10 rounded-full" />
                  ) : null}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <a
              href={bookHref}
              target={contact.bookingUrl ? "_blank" : undefined}
              rel={contact.bookingUrl ? "noreferrer" : undefined}
              className="group bg-navy hover:bg-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors"
            >
              Book a call
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <button
            type="button"
            className="border-line grid size-10 place-items-center rounded-full border bg-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="from-brand via-teal to-sun absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gradient-to-r"
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-1 px-4 pt-2 pb-5">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display hover:bg-mist block rounded-xl px-3 py-3 text-lg font-bold"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-2">
                <a
                  href={bookHref}
                  onClick={() => setOpen(false)}
                  target={contact.bookingUrl ? "_blank" : undefined}
                  rel={contact.bookingUrl ? "noreferrer" : undefined}
                  className="bg-navy flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                >
                  Book a call <ArrowUpRight className="size-4" />
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
