import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { articles } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/support", priority: 0.8 },
    { path: "/learn", priority: 0.7 },
    { path: "/directory", priority: 0.7 },
    { path: "/about", priority: 0.5 },
  ];

  const staticEntries = staticPaths.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${SITE.url}/learn/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
