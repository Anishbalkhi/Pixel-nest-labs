import type { MetadataRoute } from "next";
import { industriesData } from "@/content/industries";
import { servicePagesData } from "@/content/services-pages";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticDate = new Date("2026-11-25");

  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(servicePagesData).map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const industryRoutes: MetadataRoute.Sitemap = Object.keys(industriesData).map((slug) => ({
    url: `${siteUrl}/industries/${slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...coreRoutes, ...serviceRoutes, ...industryRoutes];
}
