"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { EvidenceBadge, type Grade } from "@/components/EvidenceBadge";
import type { Article } from "@/lib/articles";

/**
 * The library, browsable. Forty articles as a flat column of identical cards
 * made the reader scroll blind; this groups them by section in reading order,
 * lets them narrow by section, evidence grade, or a word in the title, and
 * keeps every row compact enough to scan. Everything renders on the server
 * with no filter applied, so the page works (and indexes) without JS.
 */

/** Reading order for the sections: why → how to look → what's wrong → what to do → how to buy it safely. */
export const SECTION_ORDER = [
  "Why it matters",
  "Foundations",
  "The workup",
  "Conditions",
  "Treatment & pharmacology",
  "Choosing care",
  "Money & value",
  "Quality & safety",
];

const GRADES: { value: Grade | "all"; label: string }[] = [
  { value: "all", label: "All grades" },
  { value: "established", label: "Established" },
  { value: "emerging", label: "Emerging" },
  { value: "anecdote", label: "Anecdote" },
];

function sectionRank(s: string) {
  const i = SECTION_ORDER.indexOf(s);
  return i === -1 ? SECTION_ORDER.length : i;
}

function monthYear(iso: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

export function LibraryBrowser({ articles }: { articles: Article[] }) {
  const [section, setSection] = useState<string>("all");
  const [grade, setGrade] = useState<Grade | "all">("all");
  const [q, setQ] = useState("");
  const searchId = useId();
  const countId = useId();

  const sections = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) counts.set(a.section, (counts.get(a.section) ?? 0) + 1);
    return [...counts.entries()]
      .sort((a, b) => sectionRank(a[0]) - sectionRank(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, [articles]);

  const needle = q.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      articles
        .filter((a) => section === "all" || a.section === section)
        .filter((a) => grade === "all" || a.grade === grade)
        .filter(
          (a) =>
            !needle ||
            a.title.toLowerCase().includes(needle) ||
            a.deck.toLowerCase().includes(needle) ||
            a.summary.toLowerCase().includes(needle),
        )
        .slice()
        .sort(
          (a, b) =>
            sectionRank(a.section) - sectionRank(b.section) ||
            b.published.localeCompare(a.published),
        ),
    [articles, section, grade, needle],
  );

  const groups = useMemo(() => {
    const m = new Map<string, Article[]>();
    for (const a of filtered) {
      const list = m.get(a.section);
      if (list) list.push(a);
      else m.set(a.section, [a]);
    }
    return [...m.entries()];
  }, [filtered]);

  const isFiltered = section !== "all" || grade !== "all" || needle !== "";

  function reset() {
    setSection("all");
    setGrade("all");
    setQ("");
  }

  return (
    <div className="sos-lib">
      <div className="sos-lib__controls">
        <div className="sos-lib__search">
          <label htmlFor={searchId} className="sos-label">
            Find an article
          </label>
          <input
            id={searchId}
            className="sos-field"
            type="search"
            placeholder="trimix, Peyronie's, hematocrit…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
            aria-describedby={countId}
          />
        </div>

        <div className="sos-lib__chips" role="group" aria-label="Filter by section">
          <button
            type="button"
            className="sos-chip"
            aria-pressed={section === "all"}
            onClick={() => setSection("all")}
          >
            All sections <b>{articles.length}</b>
          </button>
          {sections.map((s) => (
            <button
              key={s.name}
              type="button"
              className="sos-chip"
              aria-pressed={section === s.name}
              onClick={() => setSection(section === s.name ? "all" : s.name)}
            >
              {s.name} <b>{s.count}</b>
            </button>
          ))}
        </div>

        <div className="sos-lib__row">
          <div className="sos-seg" role="group" aria-label="Filter by evidence grade">
            {GRADES.map((g) => (
              <button
                key={g.value}
                type="button"
                aria-pressed={grade === g.value}
                onClick={() => setGrade(g.value)}
              >
                {g.label}
              </button>
            ))}
          </div>
          <p id={countId} className="sos-note sos-lib__count" aria-live="polite">
            {filtered.length === articles.length
              ? `${articles.length} articles`
              : `${filtered.length} of ${articles.length} articles`}
            {isFiltered && (
              <>
                {" · "}
                <button type="button" className="sos-lib__reset" onClick={reset}>
                  Clear filters
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="sos-card sos-card--deep sos-lib__empty">
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "10px" }}>
            Nothing in the library matches that yet.
          </p>
          <p className="sos-note">
            Try a broader word, or{" "}
            <button type="button" className="sos-lib__reset" onClick={reset}>
              clear the filters
            </button>
            . If the question is urgent, <Link href="/support">Support</Link> is one tap away.
          </p>
        </div>
      ) : (
        groups.map(([name, list]) => (
          <section key={name} className="sos-lib__group" aria-labelledby={`lib-${slugify(name)}`}>
            <div className="sos-lib__head">
              <h3 id={`lib-${slugify(name)}`} className="sos-h2">
                {name}
              </h3>
              <span className="sos-note">
                {list.length} {list.length === 1 ? "article" : "articles"}
              </span>
            </div>
            <ul className="sos-lib__list">
              {list.map((a) => (
                <li key={a.slug}>
                  <Link href={`/learn/${a.slug}`} className="sos-lib__item" prefetch={false}>
                    <div className="sos-lib__meta">
                      <EvidenceBadge grade={a.grade} />
                      <span className="sos-note">Reviewed {monthYear(a.reviewed)}</span>
                      {a.reviewer && <span className="sos-note">· {a.reviewer.credentials}</span>}
                    </div>
                    <span className="sos-lib__title">{a.title}</span>
                    <span className="sos-lib__deck">{a.deck}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
