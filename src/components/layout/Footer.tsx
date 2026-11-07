import Link from "next/link";
import { InView } from "@/components/motion/InView";
import { BackToTop } from "./BackToTop";
import { PixelMark, Wordmark } from "@/components/brand/PixelMark";
import { contact, nav, services, site } from "@/content/site";

const socialIcons = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4Zm0 8.6a3.4 3.4 0 1 1 0-6.8 3.4 3.4 0 0 1 0 6.8Zm5.4-9.9a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
  ),
  linkedin: (
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5Z" />
  ),
  github: (
    <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
  ),
};

export function Footer() {
  return (
    <footer className="bg-navy relative overflow-hidden text-white">
      <div className="pixel-grid-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <PixelMark className="h-8 w-auto" />
            <Wordmark dark className="text-lg" />
          </Link>
          <p className="max-w-xs text-sm text-white/65">{site.description}</p>
        </div>

        <div>
          <h3 className="text-teal mb-3 text-xs font-semibold tracking-wider uppercase">Explore</h3>
          <ul className="space-y-1 text-sm text-white/75">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-block py-1.5 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-teal mb-3 text-xs font-semibold tracking-wider uppercase">Services</h3>
          <ul className="space-y-1 text-sm text-white/75">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="inline-block py-1.5 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* id="contact" so "#contact" links still lead somewhere useful without JavaScript. */}
        <div id="contact">
          <h3 className="text-teal mb-3 text-xs font-semibold tracking-wider uppercase">Get in touch</h3>
          <ul className="space-y-1 text-sm text-white/75">
            {contact.email ? (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-block py-1.5 break-all hover:text-white">
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact.phone ? (
              <li>
                <a
                  href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-block py-1.5 hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
            ) : null}
            {contact.location ? <li className="py-1.5">{contact.location}</li> : null}
            <li>
              <a href="#contact" className="hover:text-teal inline-block py-1.5 font-semibold text-white">
                Send us a message →
              </a>
            </li>
          </ul>
          <div className="mt-4 flex gap-2">
            {contact.socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={key[0].toUpperCase() + key.slice(1)}
                className="hover:bg-teal hover:text-navy grid size-10 place-items-center rounded-lg bg-white/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                  {socialIcons[key]}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Big wordmark that rises letter by letter as the footer comes into view */}
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-4 sm:px-6 lg:px-8" aria-hidden>
        <InView
          as="p"
          margin="0px"
          className="rise-letters font-condensed footer-word flex justify-center pb-2 text-[19vw] leading-[0.9] whitespace-nowrap uppercase select-none xl:text-[16rem]"
        >
          {"PIXEL NEST".split("").map((ch, i) => (
            <span key={i} style={{ ["--i" as string]: i }}>
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
        </InView>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-4 pt-5 pb-24 sm:px-6 md:pb-5 lg:px-8">
          <p className="text-xs text-white/60">
            © {site.name}. Demo and concept projects shown on this site are our own work, not client projects.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
