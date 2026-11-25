import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import type { IndustryItem } from "@/content/industries";
import { siteUrl } from "@/lib/site-url";

export function IndustryPageTemplate({ data }: { data: IndustryItem }) {
  const currentUrl = `${siteUrl}/industries/${data.slug}`;

  // Schema.org Service & BreadcrumbList structured data
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
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
      },
    },
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
        name: "Industries",
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
      {/* Inject Structured Data */}
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
            <span className="text-navy/50">Industries</span>
          </li>
          <li>
            <ChevronRight className="size-3.5 opacity-50" />
          </li>
          <li className="font-semibold text-navy truncate" aria-current="page">
            {data.name}
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="border-b border-navy/10 bg-white px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-1.5 bg-brand" />
              <span className="size-1.5 bg-teal" />
              <span className="size-1.5 bg-sun" />
            </span>
            Industry Solutions · Jaipur & Rajasthan
          </p>
          <h1 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {data.heroHeadline}
          </h1>
          <p className="mt-5 text-base text-muted sm:text-lg">
            {data.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-white uppercase transition-colors hover:bg-brand"
            >
              Consult On Your Project
              <ArrowRight className="size-4" />
            </a>
            <a
              href={`https://wa.me/910000000000?text=${encodeURIComponent(`Hi Pixel Nest Labs, I'd like to discuss website/software solutions for ${data.name}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-navy/20 bg-white px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-mist"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </header>

      {/* Benefits Statistics Strip */}
      <section className="border-b border-navy/10 bg-mist py-10 px-4 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {data.benefits.map((b, i) => (
            <div key={i} className="text-center">
              <p className="font-condensed text-3xl font-bold text-navy sm:text-4xl">{b.stat}</p>
              <p className="mt-1 text-xs font-semibold text-muted uppercase tracking-wider">{b.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problems & Bottlenecks */}
      <section className="px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-brand uppercase">Challenges We Solve</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-navy sm:text-4xl">
              Common Bottlenecks in {data.name}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.problems.map((p, i) => (
              <div key={i} className="border border-navy/10 bg-white p-6 shadow-sm">
                <span className="font-condensed text-2xl font-bold text-[#e8622a]">0{i + 1}</span>
                <h3 className="font-display mt-2 text-lg font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions We Deliver */}
      <section className="border-t border-navy/10 bg-mist/50 px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest text-teal uppercase">Engineered Solutions</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-navy sm:text-4xl">
              What Pixel Nest Labs Builds for You
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {data.solutions.map((s, i) => (
              <div key={i} className="flex flex-col justify-between border border-navy/15 bg-white p-7">
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy/80">{s.desc}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-navy/10">
                  {s.tech.map((t, j) => (
                    <span key={j} className="border border-navy/15 bg-mist px-2 py-0.5 text-xs font-medium text-navy/80">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features & Use Cases */}
      <section className="px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl text-center">
            Key Capabilities & Operational Features
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.features.map((f, i) => (
              <div key={i} className="border border-navy/10 bg-white p-5">
                <Check className="size-5 text-teal-700" />
                <h3 className="font-display mt-3 text-base font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-navy/10 bg-mist/60 px-4 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl text-center">
            Frequently Asked Questions
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

      {/* CTA Box */}
      <section className="border-t border-navy/10 bg-navy px-4 py-16 text-center text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold tracking-[0.2em] text-teal uppercase">Start Your Project</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-5xl">
            Ready to Modernize Your Digital Operations in Jaipur?
          </h2>
          <p className="mt-4 text-base text-white/70">
            Speak directly with our technical founders. We provide a transparent technical roadmap, scope outline, and clear pricing for your {data.name}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-teal px-7 py-4 text-xs font-bold tracking-[0.18em] text-navy uppercase transition-colors hover:bg-white"
            >
              Request a Free Quote
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 border border-white/20 px-7 py-4 text-xs font-bold tracking-[0.18em] text-white uppercase transition-colors hover:bg-white/10"
            >
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

