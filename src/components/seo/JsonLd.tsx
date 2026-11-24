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
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/opengraph-image`,
    description: site.description,
    email: site.email.includes("[") ? undefined : site.email,
    telephone: site.phone.includes("[") ? undefined : site.phone,
    sameAs: [
      site.socials.instagram.includes("[") ? undefined : site.socials.instagram,
      site.socials.linkedin.includes("[") ? undefined : site.socials.linkedin,
      site.socials.github.includes("[") ? undefined : site.socials.github,
    ].filter(Boolean),
    priceRange: "$$",
    areaServed: "Worldwide",
    serviceType: [
      "Custom Software Development",
      "Web Application Development",
      "Business Website Development",
      "CRM Development",
      "AI Automation & Intelligent Tools",
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
 * WebSite Schema for Search Engines
 */
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
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
