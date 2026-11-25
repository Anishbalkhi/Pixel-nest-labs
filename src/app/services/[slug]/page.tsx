import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageTemplate } from "@/components/templates/ServicePageTemplate";
import { servicePagesData } from "@/content/services-pages";
import { siteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return Object.keys(servicePagesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePagesData[slug];
  if (!service) return {};

  const pageUrl = `${siteUrl}/services/${slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: pageUrl,
      type: "website",
      siteName: "Pixel Nest Labs",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicePagesData[slug];
  if (!service) notFound();

  return <ServicePageTemplate data={service} />;
}
