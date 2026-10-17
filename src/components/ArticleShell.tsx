import type { ReactNode } from "react";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents, type TocItem } from "@/components/TableOfContents";

/**
 * The reading shell for Open Floor article pages: a scroll-progress line, an
 * optional sticky table-of-contents rail in the left gutter, and the article
 * column itself. The column carries .sos-article, which turns on the long-form
 * primitives (section marks, callouts, tables, pull-quotes, margin notes).
 *
 * Replaces the bare `<article className="sos-container">` wrapper. Pass `toc`
 * to get the two-column reading layout; omit it for a single centered column.
 */
export function ArticleShell({
  toc,
  children,
}: {
  toc?: TocItem[];
  children: ReactNode;
}) {
  const hasToc = Boolean(toc && toc.length);
  return (
    <>
      <ReadingProgress />
      <div className={`sos-reading${hasToc ? "" : " sos-reading--solo"}`}>
        {hasToc ? <TableOfContents items={toc!} /> : null}
        <article className="sos-article sos-reading__body">{children}</article>
      </div>
    </>
  );
}
