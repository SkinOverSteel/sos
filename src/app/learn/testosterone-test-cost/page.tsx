import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LabsCallout } from "@/components/LabsCallout";
import { MorseSOS } from "@/components/MorseSOS";
import { RelatedArticles } from "@/components/RelatedArticles";
import { withReview } from "@/lib/jsonld";
import { providerLink, rankedByCategory } from "@/lib/providers";
import { SITE } from "@/lib/site";

const SLUG = "testosterone-test-cost";
const TITLE = "What a testosterone blood test costs without insurance";
const DESCRIPTION =
  "Self-pay list prices for a testosterone blood test at three accredited US labs, checked November 2026: a total-testosterone test from $63 to $75, a panel with SHBG and free testosterone around $158. What each one measures and which you need.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `/learn/${SLUG}` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: TITLE,
  url: `${SITE.url}/learn/${SLUG}`,
  description: DESCRIPTION,
  audience: { "@type": "Patient" },
};

/** The day every price below was read off the lab's own product page. */
const CHECKED = "Nov 15, 2026";

type Row = {
  lab: string;
  test: string;
  measures: string;
  price: string;
  note?: string;
  href: string;
};

/**
 * List prices as published by each lab on CHECKED. These are citations, so
 * every link is the lab's plain product page, never a referral link.
 */
const ROWS: Row[] = [
  {
    lab: "Discounted Labs",
    test: "Testosterone, Free (Equilibrium Dialysis) and Total, MS",
    measures: "Total and free testosterone",
    price: "$63",
    note: "List price; shown discounted to $50 on the day checked",
    href: "https://www.discountedlabs.com/testosterone-total-lc-ms-no-upper-limit",
  },
  {
    lab: "Quest",
    test: "Testosterone Test",
    measures: "Total testosterone",
    price: "$75",
    note: "$69 plus a $6 physician service fee",
    href: "https://www.questhealth.com/product/testosterone-test-total-and-free/15983M.html",
  },
  {
    lab: "Quest",
    test: "Men's Hormone Test Panel, Basic",
    measures: "Total, free and bioavailable testosterone, SHBG, albumin",
    price: "$158",
    note: "$152 plus a $6 physician service fee",
    href: "https://www.questhealth.com/product/mens-hormone-test-panel-basic/13073M.html",
  },
  {
    lab: "Labcorp OnDemand",
    test: "Comprehensive Testosterone Test",
    measures: "Total testosterone, SHBG, albumin, calculated free testosterone",
    price: "$159",
    href: "https://www.ondemand.labcorp.com/lab-tests/comprehensive-testosterone-test",
  },
];

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};

export default function TestosteroneTestCostPage() {
  const referralLabs = rankedByCategory("lab")
    .filter((p) => providerLink(p).isReferral)
    .map((p) => p.name);

  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, SLUG)} />
      <Breadcrumbs slug={SLUG} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Money &amp; value</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        What a testosterone blood test costs without insurance
      </h1>
      <ArticleMeta slug={SLUG} />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "16px" }}>
        At the three accredited labs in our directory, a self-pay test for
        total testosterone listed at <strong>$63 to $75</strong>, and a panel
        that adds SHBG and free testosterone listed at{" "}
        <strong>about $158</strong>. You order online, the lab&apos;s
        clinician signs the order, and you have blood drawn at a local
        collection site.
      </p>
      <p className="sos-note" style={{ marginBottom: "8px" }}>
        Prices are each lab&apos;s published list price, read off its own
        product page on {CHECKED}. They change, and promotions come and go;
        check the page before you order.
      </p>

      <div className="sos-table-wrap">
        <table className="sos-table">
          <caption className="sr-only">
            Self-pay list prices for testosterone blood tests, checked {CHECKED}
          </caption>
          <thead>
            <tr>
              <th scope="col">Lab</th>
              <th scope="col">Test</th>
              <th scope="col">Measures</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.test}>
                <td>{r.lab}</td>
                <td>
                  <a href={r.href} target="_blank" rel="noopener noreferrer">
                    {r.test}
                  </a>
                </td>
                <td>{r.measures}</td>
                <td>
                  <strong style={{ color: "var(--sos-text-hi)" }}>{r.price}</strong>
                  {r.note ? (
                    <>
                      <br />
                      {r.note}
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {referralLabs.length > 0 ? (
        <p className="sos-note">
          Disclosure: {referralLabs.join(" and ")}{" "}
          {referralLabs.length === 1 ? "is a referral partner" : "are referral partners"}{" "}
          in <Link href="/directory#lab">our directory</Link>. The links in
          this table are plain links to each lab&apos;s product page, not
          referral links, and the table is ordered by price.
        </p>
      ) : null}

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Which test you need
        </h2>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Total testosterone is the starting point.</strong>{" "}It is
            the number a diagnosis is built on.
          </li>
          <li>
            <strong>Budget for two draws, not one.</strong>{" "}A diagnosis needs
            a consistently low level, measured early in the morning on two
            separate days. One low result is a reason to repeat the test, not
            an answer.
          </li>
          <li>
            <strong>SHBG is worth adding when the total is borderline.</strong>{" "}
            With total testosterone, SHBG and albumin you can{" "}
            <Link href="/tools/free-testosterone">estimate free testosterone</Link>{" "}
            yourself, which is what the larger panels are selling.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "14px" }}>
          The full baseline a clinician wants before talking about therapy is
          longer than this. It is on{" "}
          <Link href="/labs#baseline">the lab checklists</Link>, with the
          reason for each line.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What moves the price
        </h2>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Fees on top of the sticker.</strong>{" "}Quest adds a $6
            physician service fee at checkout. Read the total, not the tile.
          </li>
          <li>
            <strong>Single test or panel.</strong>{" "}The panels cost roughly
            twice the single test. Ask exactly which analytes are included
            before you pay for a name.
          </li>
          <li>
            <strong>Going through a clinic.</strong>{" "}The same draw ordered
            through a clinic is often marked up.{" "}
            <Link href="/learn/what-it-costs">What it costs</Link> walks the
            whole stack.
          </li>
          <li>
            <strong>Insurance.</strong>{" "}When there is a documented
            deficiency, monitoring labs are frequently covered. If you have
            coverage, a clinician&apos;s order may cost you less than
            self-pay. See{" "}
            <Link href="/learn/testosterone-therapy">testosterone therapy, done right</Link>.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the result is for
        </h2>
        <p className="sos-prose">
          A number you ordered yourself is a baseline to bring to a clinician,
          not a diagnosis and not a reason to start anything. Reference ranges
          differ by lab and assay, and symptoms and the trend decide what a
          value means.{" "}
          <Link href="/learn/read-your-labs">Read your labs</Link> explains
          the markers, and{" "}
          <Link href="/tools/appointment-sheet">the appointment sheet</Link>{" "}
          puts your results and questions on one page for the visit.
        </p>
      </section>

      <LabsCallout variant="baseline" />

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Prices: each lab&apos;s own product page, linked in the table, read
          on {CHECKED}. The two-draw, early-morning standard and the role of
          free testosterone are from Bhasin S, et al.{" "}
          <a href="https://doi.org/10.1210/jc.2018-00229" target="_blank" rel="noopener noreferrer">
            Endocrine Society Clinical Practice Guideline, J Clin Endocrinol
            Metab. 2018;103(5):1715&ndash;1744
          </a>
          .
        </p>
        <p className="sos-note">
          General education, not medical or financial advice. Prices vary by
          state and change without notice. We are not a lab and we sell
          nothing.
        </p>
      </div>
      <Faq slug={SLUG} />
      <RelatedArticles slug={SLUG} />
    </article>
  );
}
