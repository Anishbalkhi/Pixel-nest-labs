import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}`,
      lastModified: new Date("2026-11-24"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date("2026-11-24"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
