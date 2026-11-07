"use client";

import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import { OPEN_CONTACT } from "@/components/forms/QuickContact";
import { getLenis } from "@/components/motion/SmoothScroll";
import { contact } from "@/content/site";

const DESKTOP = "(min-width: 768px)";
const STRIP = [
  "#0b57c2",
  "#0b57c2",
  "#0e76a6",
  "#1fb89a",
  "#1fb89a",
  "#f7a21b",
  "#1fb89a",
  "#1fb89a",
  "#0e76a6",
  "#0b57c2",
];
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A sticky "Let's talk" button on the right edge (bottom-right on phones).
 * It opens the contact form in a drawer that slides in from the right on
 * desktop and up from the bottom on phones. Any link to "#contact" opens it too.
 *
 * Once opened, the drawer stays mounted (just hidden), so a half-written message
 * survives closing and reopening it.
 */
export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [openCount, setOpenCount] = useState(0);
  const [desktop, setDesktop] = useState(false);
  // The launcher steps aside where the page already offers a way to get in touch
  // (elements marked data-hide-launcher), and on phones it shrinks to an icon while
  // scrolling down so it covers less of the page.
  const [tucked, setTucked] = useState(false);
  const [compact, setCompact] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  // Email typed into a quick-contact box elsewhere on the page, to copy into the form.
  const pendingEmail = useRef("");

  const openDrawer = useCallback(() => {
    setDesktop(window.matchMedia(DESKTOP).matches);
    setMounted(true);
    setVisible(true);
    setOpenCount((n) => n + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Wait a tick: the launcher is inert until the closed state has rendered.
    window.setTimeout(() => launcherRef.current?.focus({ preventScroll: true }), 0);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href="#contact"], a[href="/#contact"]');
      if (!link) return;
      e.preventDefault();
      openDrawer();
    };
    const onQuick = (e: Event) => {
      pendingEmail.current = (e as CustomEvent<{ email?: string }>).detail?.email ?? "";
      openDrawer();
    };
    document.addEventListener("click", onClick);
    window.addEventListener(OPEN_CONTACT, onQuick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(OPEN_CONTACT, onQuick);
    };
  }, [openDrawer]);

  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setTucked(seen.size > 0);
    });
    document.querySelectorAll("[data-hide-launcher]").forEach((el) => io.observe(el));
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setCompact(y > last && y > 400);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    // Everything behind the drawer is unreachable by keyboard and screen readers while it's open.
    const background = [
      ...document.querySelectorAll<HTMLElement>("body > header, body > main, body > footer, body > a"),
    ];
    background.forEach((el) => (el.inert = true));
    if (pendingEmail.current) {
      const field = dialogRef.current?.querySelector<HTMLInputElement>('input[name="email"]');
      if (field && !field.value) field.value = pendingEmail.current;
      pendingEmail.current = "";
    }
    // Desktop: straight into the Name field. Phones: focus the drawer itself, so the
    // keyboard doesn't pop up over the form before the visitor has seen it.
    const t = window.setTimeout(
      () => (desktop ? nameRef.current : dialogRef.current)?.focus({ preventScroll: true }),
      350,
    );
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      background.forEach((el) => (el.inert = false));
      getLenis()?.start();
    };
  }, [open, desktop, close]);

  const closedPanel = desktop ? { x: "100%", y: 0 } : { x: 0, y: "100%" };

  return (
    <>
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={openDrawer}
        aria-haspopup="dialog"
        aria-expanded={open}
        inert={open || tucked}
        initial={{ x: 120, opacity: 0 }}
        animate={open || tucked ? { x: 120, opacity: 0 } : { x: 0, opacity: 1 }}
        transition={{ delay: open ? 0 : 1.2, type: "spring", stiffness: 220, damping: 22 }}
        className={`group bg-navy shadow-navy/30 hover:bg-brand fixed right-4 bottom-4 z-40 flex items-center gap-2.5 px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-[background-color,padding] md:top-1/2 md:right-0 md:bottom-auto md:-translate-y-1/2 md:flex-col md:gap-3 md:rounded-l-2xl md:rounded-r-none md:px-3.5 md:py-5 md:hover:pr-5 ${
          compact ? "max-md:gap-0 max-md:px-4" : ""
        }`}
      >
        <span className="nudge relative grid size-5 grid-cols-2 gap-[3px]" aria-hidden>
          <span className="bg-brand transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="bg-teal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="bg-teal transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
          <span className="bg-sun transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          <span className="bg-teal absolute -top-1 -right-1 size-2 animate-ping rounded-full" />
        </span>
        <span className={`md:rotate-180 md:[writing-mode:vertical-rl] ${compact ? "max-md:sr-only" : ""}`}>
          Let&apos;s talk
        </span>
      </motion.button>

      {mounted ? (
        <motion.div
          className={`fixed inset-0 z-50 ${visible ? "" : "pointer-events-none invisible"}`}
          inert={!open}
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={open ? { duration: 0.2 } : { duration: 0.2, delay: 0.1 }}
          onAnimationComplete={() => !open && setVisible(false)}
        >
          <button
            type="button"
            aria-label="Close contact form"
            tabIndex={-1}
            className="bg-navy/50 absolute inset-0 cursor-default backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-drawer-title"
            tabIndex={-1}
            data-lenis-prevent
            initial={closedPanel}
            animate={open ? { x: 0, y: 0 } : closedPanel}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-8 shadow-2xl outline-none md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[460px] md:rounded-none md:rounded-l-3xl md:p-8"
          >
            <div className="bg-line mx-auto mb-4 h-1.5 w-12 rounded-full md:hidden" />
            <button
              type="button"
              onClick={close}
              className="bg-mist text-navy absolute top-4 right-4 grid size-10 place-items-center rounded-full transition-transform hover:rotate-90 md:top-6 md:right-6"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>

            {/* Keyed by openCount so the little intro animation replays each time it opens. */}
            <div key={openCount}>
              <div className="mb-5 flex gap-1" aria-hidden>
                {STRIP.map((c, i) => (
                  <motion.span
                    key={i}
                    className="size-3"
                    style={{ background: c }}
                    initial={{ scale: 0, rotate: -90, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.04, type: "spring", stiffness: 400, damping: 18 }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease }}
              >
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-teal-700 uppercase">
                  <span className="relative flex size-2">
                    <span className="bg-teal absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                    <span className="bg-teal relative inline-flex size-2 rounded-full" />
                  </span>
                  Taking new projects
                </p>
                <h2 id="contact-drawer-title" className="font-display mt-1.5 text-2xl font-extrabold tracking-tight">
                  Tell us what you need
                </h2>
                <p className="text-muted mt-1 mb-5 text-sm">We reply within one working day.</p>
              </motion.div>
            </div>

            <ContactForm autoFocusRef={nameRef} />

            {contact.email || contact.phone || contact.whatsapp ? (
              <div className="border-line text-muted mt-5 flex flex-wrap gap-x-4 gap-y-1 border-t pt-4 text-xs">
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="hover:text-brand flex items-center gap-1.5 py-1">
                    <Mail className="size-3.5" /> {contact.email}
                  </a>
                ) : null}
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-brand flex items-center gap-1.5 py-1"
                  >
                    <Phone className="size-3.5" /> {contact.phone}
                  </a>
                ) : null}
                {contact.whatsapp ? (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand flex items-center gap-1.5 py-1"
                  >
                    <MessageCircle className="size-3.5" /> WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}
