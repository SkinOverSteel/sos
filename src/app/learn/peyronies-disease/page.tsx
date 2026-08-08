import type { Metadata } from "next";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Peyronie's disease: when it curves",
  description:
    "Peyronie's disease — curvature from a fibrous plaque — is more common than men think, and not cancer. The two phases, why treatment timing is everything, and the injection, traction, and surgical options once it stabilizes.",
  alternates: { canonical: "/learn/peyronies-disease" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Peyronie's disease: when it curves",
  url: `${SITE.url}/learn/peyronies-disease`,
  description:
    "The acute and chronic phases of Peyronie's disease, its link to erectile dysfunction and Dupuytren's contracture, and phase-dependent treatment: intralesional injections, traction therapy, and surgery.",
  about: { "@type": "MedicalCondition", name: "Peyronie's disease" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function PeyroniesDiseasePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "peyronies-disease")} />
      <Breadcrumbs slug="peyronies-disease" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Conditions</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Peyronie&apos;s disease: when it curves
      </h1>
      <ArticleMeta slug="peyronies-disease" />

      <div className="sos-morse" style={{ margin: "34px 0" }} aria-hidden="true">
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
        <i className="dash" />
        <i className="dash" />
        <i className="dash" />
        <i className="dot" />
        <i className="dot" />
        <i className="dot" />
      </div>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        A penis that has developed a curve, a bend, or a palpable lump can be
        alarming — and the internet makes it worse. So, plainly:{" "}
        <strong>Peyronie&apos;s disease is common, it is not cancer, and it is
        treatable</strong>. It&apos;s scar tissue, and the one thing that matters
        most to your outcome is understanding which <em>phase</em> you&apos;re in,
        because that decides what should — and shouldn&apos;t — happen next.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it actually is
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Peyronie&apos;s is a <strong>fibrous plaque</strong> — a patch of scar
          tissue — in the sheath that wraps the erectile chambers. It&apos;s
          thought to follow small injuries during sex that, in men who are
          predisposed, heal into scar instead of resolving. That predisposition is
          partly genetic: it overlaps with{" "}
          <strong>Dupuytren&apos;s contracture</strong> (the same kind of fibrous
          cording in the palm) in roughly a fifth of cases. It is not an
          infection, not contagious, and not a cancer.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The two phases — and why timing is everything
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          Peyronie&apos;s moves through two phases, and nearly every treatment
          decision hinges on telling them apart:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "14px",
          }}
        >
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Acute</b> · active
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Roughly the first year. The plaque is still forming — pain with
              erections, and a curve that&apos;s still <strong>changing</strong>.
              The rule here: don&apos;t operate on a curve that hasn&apos;t
              settled.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Chronic</b> · stable
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              The curve has held steady for a few months and the pain has usually
              gone. Now the deformity is a <strong>known quantity</strong> — and
              durable treatment decisions finally make sense.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What can be done
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>During the active phase</strong>, the first move is often to do
          less: reassurance, letting the plaque stabilize, and resisting the urge
          to fix a curve that&apos;s still moving. Oral pills marketed for
          Peyronie&apos;s have thin evidence behind them.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Once it&apos;s stable</strong>, real options open up — all of
          them clinician-delivered:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Injections into the plaque.</strong> An FDA-approved enzyme
            (collagenase) can reduce curves greater than 30° in men with intact
            erections; verapamil and interferon are other in-office options.
          </li>
          <li>
            <strong>Traction therapy.</strong> A medical device worn on a
            schedule under a clinician&apos;s guidance, with growing evidence for
            reducing curvature and recovering some length — often paired with
            injections.
          </li>
          <li>
            <strong>Surgery.</strong> For a severe curve, or when erectile
            dysfunction comes with it: procedures that straighten (plication or
            grafting), or a penile implant when erections no longer respond to
            other treatment.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Which path fits depends on the size of the curve, how your erections are
          doing, and your goals — a urologist&apos;s call, made once the disease
          is stable.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          When to see someone
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A new curve, pain with erections, a lump you can feel, or erections that
          have become unreliable — those are reasons to see a urologist, not to
          wait it out in silence. Peyronie&apos;s travels with{" "}
          <Link href="/learn/erectile-function-signal">erectile dysfunction</Link>{" "}
          often enough that a proper <Link href="/learn/ed-workup">workup</Link>{" "}
          should look at both at once, and a{" "}
          <Link href="/learn/telemedicine-visit">real evaluation</Link> is where
          the phase and the plan get sorted.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Peyronie&apos;s disease is common, it is <strong>not cancer</strong>,
          and it is treatable. The single most important thing to know is that{" "}
          <strong>timing rules</strong>: let the active phase settle before making
          any permanent decision, then match a treatment to the curve you&apos;re
          actually left with. Alarming as a new bend is, it runs on a well-worn
          medical path — and it starts with an exam, not a search bar.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/peyronies-disease-guideline" target="_blank" rel="noopener noreferrer">AUA Peyronie&apos;s Disease Guideline</a>;{" "}
          <a href="https://www.niddk.nih.gov/health-information/urologic-diseases/penile-curvature-peyronies-disease" target="_blank" rel="noopener noreferrer">NIDDK: Penile Curvature (Peyronie&apos;s Disease)</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK560628/" target="_blank" rel="noopener noreferrer">StatPearls: Peyronie Disease</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a substitute for
          evaluation. Diagnosis, staging, and treatment belong to a licensed
          clinician who can examine you and knows your history.
        </p>
      </div>

      <Faq slug="peyronies-disease" />
      <RelatedArticles slug="peyronies-disease" />
    </article>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};
