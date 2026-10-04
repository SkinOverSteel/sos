import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { articles } from "@/lib/articles";
import { liveTools } from "@/lib/tools";
import { METROS, STATES } from "@/lib/nearme";
import { citiesWithPages } from "@/lib/nearme-cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/support", priority: 0.8 },
    { path: "/learn", priority: 0.7 },
    { path: "/tools", priority: 0.7 },
    { path: "/log", priority: 0.7 },
    { path: "/directory", priority: 0.7 },
    { path: "/near-me", priority: 0.8 },
    { path: "/map", priority: 0.7 },
    { path: "/near-me/methodology", priority: 0.5 },
    { path: "/methodology", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/privacy", priority: 0.3 },
  ];

  const staticEntries = staticPaths.map(({ path, priority }) => ({
    url: `${SITE.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${SITE.url}/learn/${a.slug}`,
    lastModified: new Date(a.reviewed),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const toolEntries = liveTools.map((t) => ({
    url: `${SITE.url}/tools/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const regionEntries = [...METROS.map((m) => m.slug), ...STATES.map((s) => s.slug)].map((slug) => ({
    url: `${SITE.url}/map/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const cityEntries = (["trt", "glp1"] as const).flatMap((kind) =>
    citiesWithPages(kind).map((c) => ({
      url: `${SITE.url}/${kind}/${c.state.toLowerCase()}/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  return [...staticEntries, ...articleEntries, ...toolEntries, ...regionEntries, ...cityEntries];
}
