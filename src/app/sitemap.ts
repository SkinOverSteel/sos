import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { articles } from "@/lib/articles";
import { liveTools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/support", priority: 0.8 },
    { path: "/learn", priority: 0.7 },
    { path: "/tools", priority: 0.7 },
    { path: "/directory", priority: 0.7 },
    { path: "/methodology", priority: 0.6 },
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

  const toolEntries = liveTools.map((t) => ({
    url: `${SITE.url}/tools/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...articleEntries, ...toolEntries];
}
