import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import type { ServiceItem } from "@/content/services-pages";
import { siteUrl } from "@/lib/site-url";

export function ServicePageTemplate({ data }: { data: ServiceItem }) {
  const currentUrl = `${siteUrl}/services/${data.slug}`;

  // Structured Data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${currentUrl}/#service`,
    name: data.name,
    serviceType: data.name,
    description: data.metaDescription,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: data.name,
        item: currentUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <article className="min-h-screen bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-navy/10 bg-mist/60 px-4 py-3 sm:px-8">
        <ol className="mx-auto flex max-w-6xl items-center gap-2 text-xs text-navy/70">
          <li>
            <Link href="/" className="hover:text-brand transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="size-3.5 opacity-50" />
          </li>
          <li>
            <span className="text-navy/50">Services</span>
          </li>
          <li>
            <ChevronRight className="size-3.5 opacity-50" />
          </li>
          <li className="font-semibold text-navy truncate" aria-current="page">
            {data.name}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="border-b border-navy/10 bg-white px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-teal uppercase">
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-1.5 bg-brand" />
              <span className="size-1.5 bg-teal" />
              <span className="size-1.5 bg-sun" />
            </span>
            Engineering & Growth · Jaipur, Rajasthan
          </p>
          <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {data.heroHeadline}
          </h1>
          <p className="mt-5 text-base text-muted sm:text-lg">
            {data.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand"
            >
              Get a Fixed Scope Quote
              <ArrowRight className="size-4" />
            </a>
            <a
              href="https://wa.me/910000000000?text=Hi%20Pixel%20Nest%20Labs%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy/20 bg-white px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-mist"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>

      {/* Deliverables */}
      <section className="px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-brand uppercase">What We Deliver</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-navy sm:text-4xl">
              Core Deliverables & Capabilities
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.deliverables.map((d, i) => (
              <div key={i} className="border border-navy/10 bg-white p-7 shadow-sm">
                <Check className="size-5 text-teal-700" />
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="border-t border-navy/10 bg-mist/50 px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-teal uppercase">How We Work</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-navy sm:text-4xl">
              From First Discovery to Production Delivery
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.process.map((step, i) => (
              <div key={i} className="border border-navy/15 bg-white p-6">
                <span className="font-condensed text-3xl font-bold text-brand">{step.step}</span>
                <h3 className="font-display mt-2 text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-navy/10 px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl text-center">
            Questions About {data.name}
          </h2>
          <div className="mt-10 space-y-4">
            {data.faqs.map((f, i) => (
              <div key={i} className="border border-navy/15 bg-white p-6">
                <h3 className="font-display text-base font-bold text-navy">{f.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-navy/10 bg-navy px-4 py-16 text-center text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-teal uppercase">Get In Touch</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-5xl">
            Start Your Growth Journey with Pixel Nest Labs
          </h2>
          <p className="mt-4 text-base text-white/70">
            Tell us about your requirements. You will speak directly with our core engineering team in Jaipur.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-teal px-7 py-4 text-xs font-bold tracking-[0.18em] text-navy uppercase transition-colors hover:bg-white"
            >
              Get a Proposal
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-white/20 px-7 py-4 text-xs font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-white/10"
            >
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
