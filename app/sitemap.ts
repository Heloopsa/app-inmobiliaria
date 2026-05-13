import type { MetadataRoute } from "next";
import { MOCK_PROPERTIES } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const properties: MetadataRoute.Sitemap = MOCK_PROPERTIES.map((property) => ({
    url: `https://inmueblepro.com/property/${property.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://inmueblepro.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://inmueblepro.com/search", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://inmueblepro.com/pricing", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://inmueblepro.com/cuenta", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: "https://inmueblepro.com/dashboard", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  return [...staticPages, ...properties];
}