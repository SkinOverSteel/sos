"use client";

import { useEffect, useState } from "react";

export type TocItem = {
  /** The id of the heading this entry links to. */
  id: string;
  label: string;
  /** A sub-section (indented one level). */
  sub?: boolean;
};

/**
 * Sticky "on this page" rail for the article reading layout. Highlights the
 * section currently in view with an IntersectionObserver scrollspy; the
 * rootMargin biases the active band to the upper third of the viewport so the
 * highlight tracks what the reader is actually looking at. Hidden below the
 * two-column breakpoint (globals.css), so it never competes with the reading
 * column on phones.
 */
export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | undefined>(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        // the first heading (document order) currently intersecting wins
        const current = els.find((el) => seen.get(el.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sos-toc" aria-label="On this page">
      <p className="sos-toc__label">On this page</p>
      <ul className="sos-toc__list">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`sos-toc__link${it.sub ? " sos-toc__link--sub" : ""}`}
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
