import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryPageTemplate } from "@/components/templates/IndustryPageTemplate";
import { industriesData } from "@/content/industries";
import { siteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData[slug];
  if (!industry) return {};

  const pageUrl = `${siteUrl}/industries/${slug}`;

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: industry.metaTitle,
      description: industry.metaDescription,
      url: pageUrl,
      type: "website",
      siteName: "Pixel Nest Labs",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: industry.metaTitle,
      description: industry.metaDescription,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industriesData[slug];
  if (!industry) notFound();

  return <IndustryPageTemplate data={industry} />;
}
