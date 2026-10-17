"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return base || "section";
}

/**
 * The library's zero-config table-of-contents: on mount it scans the article
 * for section headings (the long-form <h2> heads — bare or .sos-h2, never the
 * mono kicker heads that nested components render), gives each a stable id if it
 * lacks one, and builds the sticky rail + scrollspy from them. This lets every
 * article page opt into the reading shell without hand-authoring a TOC array.
 *
 * When a page has fewer than two sections a rail would be noise, so the
 * component collapses the two-column reading grid to a single column instead.
 */
export function AutoTableOfContents() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string>();

  // Pass 1: find the headings, assign ids, decide whether a rail is warranted.
  useEffect(() => {
    const article = document.querySelector(".sos-article");
    if (!article) return;
    const heads = Array.from(article.querySelectorAll("h2")).filter(
      (h) => h.classList.length === 0 || h.classList.contains("sos-h2")
    ) as HTMLElement[];

    if (heads.length < 2) {
      document.querySelector(".sos-reading")?.classList.add("sos-reading--solo");
      return;
    }

    const used = new Set<string>();
    const next: Item[] = heads.map((h) => {
      let id = h.id;
      if (!id) {
        id = slugify(h.textContent ?? "");
        let unique = id;
        let n = 2;
        while (used.has(unique)) unique = `${id}-${n++}`;
        id = unique;
        h.id = id;
      }
      used.add(id);
      return { id, label: (h.textContent ?? "").trim() };
    });
    setItems(next);
    setActive(next[0]?.id);
  }, []);

  // Pass 2: scrollspy once we have anchors in the DOM.
  useEffect(() => {
    if (!items.length) return;
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const current = items.find((it) => seen.get(it.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    for (const it of items) {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className="sos-toc" aria-label="On this page">
      <p className="sos-toc__label">On this page</p>
      <ul className="sos-toc__list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className="sos-toc__link"
              aria-current={active === it.id ? "true" : undefined}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
