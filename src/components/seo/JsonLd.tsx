import { faqs, products, services, site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Organization & Local Business Schema
 */
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organization`,
    name: site.name,
    alternateName: ["Pixel Nest", "PixelNestLabs"],
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image`,
    description:
      "Pixel Nest Labs is a technology and digital solutions company helping businesses worldwide build custom software, web applications, AI automation, and digital growth systems.",
    email: site.email.includes("[") ? undefined : site.email,
    telephone: site.phone.includes("[") ? undefined : site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "26.9124",
      longitude: "75.7873",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide" },
    ],
    sameAs: [
      site.socials.instagram.includes("[") ? undefined : site.socials.instagram,
      site.socials.linkedin.includes("[") ? undefined : site.socials.linkedin,
      site.socials.github.includes("[") ? undefined : site.socials.github,
    ].filter(Boolean),
    priceRange: "$$",
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "Website Development & Design",
      "Digital Marketing & SEO Services",
      "AI Automation & Intelligent Systems",
      "Business Management Applications & CRMs",
      "E-commerce & Shopify Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * WebSite Schema for Search Engines (Powers Google Search Site Name)
 */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: "Pixel Nest Labs",
    alternateName: ["Pixel Nest", "PixelNestLabs"],
    description: site.description,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema for rich snippet eligibility
 */
export function FAQJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Services Schema listing core engineering capabilities
 */
export function ServicesJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pixel Nest Labs Services",
    itemListElement: services.map((s, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Products Schema for SaaS & internal software preview
 */
export function ProductsJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Pixel Nest Labs Software Products",
    itemListElement: products.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.name,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: p.summary,
        url: `${siteUrl}/products#${p.slug}`,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/PreOrder",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
