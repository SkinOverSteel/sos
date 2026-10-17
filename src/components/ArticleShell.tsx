import type { ReactNode } from "react";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";
import { AutoTableOfContents } from "@/components/AutoTableOfContents";

/**
 * The reading shell for Open Floor article pages: a scroll-progress line, a
 * sticky table-of-contents rail in the left gutter, and the article column
 * itself. The column carries .sos-article, which turns on the long-form
 * primitives (section marks, callouts, tables, pull-quotes, margin notes).
 *
 * Replaces the bare `<article className="sos-container">` wrapper.
 * - Pass `toc` for a curated rail (labels you choose).
 * - Omit `toc` to auto-build the rail from the article's section headings; a
 *   page with too few sections collapses to a single centered column at runtime.
 * - Pass `solo` to force the single-column layout with no rail.
 */
export function ArticleShell({
  toc,
  solo = false,
  children,
}: {
  toc?: TocItem[];
  solo?: boolean;
  children: ReactNode;
}) {
  const hasToc = Boolean(toc && toc.length);
  return (
    <>
      <ReadingProgress />
      <div className={`sos-reading${solo ? " sos-reading--solo" : ""}`}>
        {solo ? null : hasToc ? <TableOfContents items={toc!} /> : <AutoTableOfContents />}
        <article className="sos-article sos-reading__body">{children}</article>
      </div>
    </>
  );
}
