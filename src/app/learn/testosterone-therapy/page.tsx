import type { Metadata } from "next";
import Link from "next/link";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testosterone therapy, done right",
  description:
    "What TRT is and isn't, the diagnosis and monitoring that keep it safe, how to make it affordable through legitimate coverage and cash levers, and the hard line between hormone replacement and anabolic enhancement.",
  alternates: { canonical: "/learn/testosterone-therapy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Testosterone therapy, done right",
  url: `${SITE.url}/learn/testosterone-therapy`,
  description:
    "Testosterone replacement therapy: diagnosis, safety monitoring, affordability, and the boundary between replacement and anabolic enhancement.",
  about: { "@type": "MedicalTherapy", name: "Testosterone replacement therapy" },
  audience: { "@type": "Patient" },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function TestosteroneTherapyPage() {
  return (
    <article className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Learn · <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Testosterone therapy, done right
      </h1>
      <EvidenceBadge grade="established" />

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
        If you&apos;re on testosterone — or weighing it — almost all of the
        difference between doing it well and drifting into the gray zone comes
        down to two things: a <strong>real diagnosis</strong> and{" "}
        <strong>real monitoring</strong>. Get those right and TRT is legitimate,
        boring, effective medicine. Skip them and it becomes something else.
      </p>

      <Section title="What TRT is — and isn't">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Testosterone replacement therapy restores a{" "}
          <strong>diagnosed deficiency</strong> back to a normal range, under
          monitoring. That&apos;s it. It is not a performance stack, and
          &quot;normal&quot; is the target — not &quot;as high as possible.&quot;
          Holding that line is the whole game, and it&apos;s the thread running
          through the rest of this page.
        </p>
      </Section>

      <Section title="The diagnosis">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A proper diagnosis rests on <strong>two low early-morning</strong> total
          testosterone measurements plus real symptoms — not a single number, and
          not symptoms alone. Baseline labs before starting typically include free
          and total testosterone, estradiol, hematocrit, and PSA. If you want to
          understand what those mean, that&apos;s exactly what{" "}
          <Link href="/learn/read-your-labs">read your labs</Link> is for — and{" "}
          <Link href="/learn/erectile-function-signal">why the workup matters</Link>{" "}
          in the first place.
        </p>
      </Section>

      <Section title="The monitoring that keeps it safe">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          This is the non-negotiable part. TRT without monitoring is where it goes
          wrong. A good program tracks:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Hematocrit</strong> — testosterone can thicken the blood
            (polycythemia). If it climbs too high (above ~54%), therapy is paused.
          </li>
          <li>
            <strong>PSA</strong> — a prostate baseline in men over 40, watched for
            meaningful rises over time.
          </li>
          <li>
            <strong>Estradiol</strong> — checked especially with breast tenderness
            or gynecomastia.
          </li>
          <li>
            <strong>Lipids, blood pressure, and your testosterone level</strong> —
            reviewed periodically, typically at least annually once you&apos;re
            settled.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "12px" }}>
          A legitimate prescriber does all of this by default — one of the green
          flags in <Link href="/learn/telemedicine-visit">what a good telemedicine visit looks like</Link>.
        </p>
      </Section>

      <Section title="Making it affordable — the legitimate levers">
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Use your insurance benefit.</strong> When there&apos;s a
            documented deficiency, both TRT and its monitoring labs are frequently
            covered — that&apos;s what the benefit is for. If a medically-indicated
            claim is denied, your clinician can help you <strong>appeal</strong>{" "}
            with the documentation.
          </li>
          <li>
            <strong>Cash + coupon when it&apos;s cheaper.</strong> Generic
            injectable testosterone is inexpensive at cash price; discount coupons
            and transparent-pricing pharmacies often beat a copay outright (the
            same logic as <Link href="/learn/generic-pde5-value">generic PDE5, filled for less</Link>).
          </li>
          <li>
            <strong>Compounding pharmacies</strong> are a legitimate route for
            specific formulations a prescriber orders — certain concentrations,
            creams, or pellets.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          The value is in paying less for the <strong style={{ color: "var(--sos-text-hi)" }}>same
          prescribed, monitored therapy</strong> — through your real benefits and
          honest cash pricing. It is never in skipping the diagnosis, the
          prescription, or the labs; those are the parts that keep you safe, not
          the parts to cut.
        </p>
      </Section>

      {/* The boundary */}
      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Where the line is: replacement vs. enhancement
        </h2>
        <div
          className="sos-card"
          style={{ borderLeft: "3px solid var(--sos-emergency)" }}
        >
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
            Some clinics and gray-market sources blur TRT into anabolic stacking —
            adding nandrolone or other anabolic steroids on top. That is{" "}
            <strong>not hormone replacement</strong>. It&apos;s supraphysiological
            anabolic use, and the risk profile is a different animal:
          </p>
          <ul className="sos-prose" style={list}>
            <li>Sharply lowered HDL and raised LDL cholesterol.</li>
            <li>
              Hypertension, cardiomyopathy, and arrhythmia risk — nandrolone
              specifically has been linked to ventricular fibrillation.
            </li>
            <li>Testicular shrinkage and impaired fertility.</li>
            <li>Controlled-substance territory, not routine care.</li>
          </ul>
          <p className="sos-prose" style={{ fontSize: "16px", marginTop: "12px" }}>
            Replacement, monitored to a normal range, is legitimate medicine.
            Consolidating anabolics into a &quot;shopping experience&quot; is the
            enhancement path this site doesn&apos;t trade in — different thing,
            different risk, and squarely a conversation to have honestly with a
            clinician, not a cart to fill.
          </p>
        </div>
      </section>

      <Section title="The bottom line">
        <p className="sos-prose">
          TRT done right is unglamorous: a real diagnosis, a prescription, and
          steady monitoring — made affordable through legitimate coverage and
          honest cash pricing. The moment it turns into &quot;add some nandrolone
          to the order,&quot; it stops being replacement and becomes a different,
          riskier game. Keep it replacement.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline" target="_blank" rel="noopener noreferrer">AUA Testosterone Deficiency Guideline</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK534853/" target="_blank" rel="noopener noreferrer">StatPearls: Androgen Replacement</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4111565/" target="_blank" rel="noopener noreferrer">cardiac &amp; metabolic effects of anabolic-steroid abuse</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8987149/" target="_blank" rel="noopener noreferrer">reproductive consequences of anabolic-steroid use</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a coverage-gaming or
          dosing guide. Diagnosis, prescribing, monitoring, and any insurance
          claim must go through a licensed clinician and honest documentation.
        </p>
      </div>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}
