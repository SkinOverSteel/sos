import type { Metadata } from "next";
import Link from "next/link";
import { MorseSOS } from "@/components/MorseSOS";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "The ER visit nobody talks about: the stuck cock ring",
  description:
    "Constriction rings are supposed to come off after 30 minutes. When one won't, the clock is the same one as priapism: ischemia, escalating injury grades, and a shame-driven delay that decides the outcome. What the injury ladder looks like, the warning signs, and what the ER actually does.",
  alternates: { canonical: "/learn/stuck-cock-ring" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The ER visit nobody talks about: the stuck cock ring",
  url: `${SITE.url}/learn/stuck-cock-ring`,
  description:
    "Penile constriction device injuries: the 30-minute ischemia rule for constriction rings, the strangulation injury grading from the urologic case literature, warning signs, and emergency management.",
  about: { "@type": "MedicalCondition", name: "Penile strangulation" },
  audience: { "@type": "Patient" },
};

const grades: { grade: string; what: string }[] = [
  {
    grade: "Grade I",
    what: "Mild, reversible vascular obstruction and swelling. The ring comes off, the tissue recovers, and that's the end of the story.",
  },
  {
    grade: "Grade II",
    what: "Lymphedema and skin changes: persistent swelling and surface damage beyond simple congestion.",
  },
  {
    grade: "Grade III",
    what: "Loss of penile sensation and ischemic skin injury: numbness, ulceration, and partial-thickness skin loss that may need grafting.",
  },
  {
    grade: "Grade IV",
    what: "Deep ischemic damage: urethral injury and urethrocutaneous fistula, where urine finds a way out through the skin.",
  },
  {
    grade: "Grade V",
    what: "Gangrene, necrosis, or amputation of the distal penis, with sepsis possible behind it. This is the grade the 30-minute rule exists to prevent.",
  },
];

export default function StuckCockRingPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "stuck-cock-ring")} />
      <Breadcrumbs slug="stuck-cock-ring" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The ER visit nobody talks about: the stuck cock ring
      </h1>
      <ArticleMeta slug="stuck-cock-ring" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        It happens more than anyone admits, because the men it happens to are
        busy deciding that losing a penis is preferable to explaining one to a
        triage nurse. It isn&apos;t, and the nurses have seen it. The
        literature on penile strangulation goes back to 1755, and the case
        reports never stop arriving: metal rings, plastic fasteners, rubber
        bands, nuts, and objects with no business being in this story, all
        doing the same mechanical thing, all resolved by the same handful of
        techniques that every emergency team knows. This page exists for one
        reason: the outcome of a stuck ring is decided almost entirely by how
        long the man waits, and the waiting is shame, not medicine. Here is
        what the ring does hour by hour, the signs that say go now, and what
        actually happens once you&apos;re in the room.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The 30-minute rule, and why it exists
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Constriction devices work by trapping blood: the ring compresses the
          veins so the erection can&apos;t drain. That is exactly the problem
          with the arrangement. With outflow blocked, the blood inside stops
          being refreshed, the oxygen fraction falls, and the tissue goes
          ischemic. The vacuum-erection-device literature is specific about
          the number: constriction rings should stay on{" "}
          <strong>no more than 30 minutes</strong>, because past that point
          the trapped blood is starving the tissue, the same ischemia that
          drives <Link href="/learn/priapism-clock">the priapism clock</Link>,
          only delivered from the outside instead of the inside.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          A stretchy novelty ring that slips off when the erection does is a
          different object from a rigid metal one. The rigid ring doesn&apos;t
          care whether you&apos;re still erect. It holds its diameter while
          the tissue swells around it, and swelling is the trap: the longer
          it stays, the more edema forms distal to it, and the less likely it
          is to slide back over what it&apos;s strangling. Thirty minutes is
          the limit for the device working as intended. A ring still on at
          hour two, four, or eight, whether from sleep, alcohol, or a design
          flaw, is no longer a device. It&apos;s a strangulation injury in
          progress.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The injury ladder, grade by grade
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          The urologic literature grades strangulation injuries from reversible
          congestion to amputation. Which grade you land on is mostly a
          function of hours.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {grades.map((g) => (
            <div
              key={g.grade}
              className="sos-card"
              style={
                g.grade === "Grade IV" || g.grade === "Grade V"
                  ? { borderLeft: "3px solid var(--sos-emergency)" }
                  : undefined
              }
            >
              <p
                className="sos-kicker"
                style={{
                  marginBottom: "6px",
                  color:
                    g.grade === "Grade IV" || g.grade === "Grade V"
                      ? "var(--sos-emergency)"
                      : undefined,
                }}
              >
                {g.grade}
              </p>
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                {g.what}
              </p>
            </div>
          ))}
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px" }}>
          The case literature is consistent about the order: reversible
          obstruction, lymphedema, loss of sensation, ischemic skin necrosis
          and ulceration, urethral injury and fistula, gangrene,
          autoamputation, and sepsis, with each step roughly a function of
          time. In series that followed patients afterward, prompt removal
          leaves most men with no lasting complications at all: one series
          found lasting complications in 13% of patients, while a series
          dominated by late presentations saw serious complications, fistula
          and amputation included, in up to 30%. Same injury, same
          treatments. The difference is the clock.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The signs that say go now
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          A ring that&apos;s snug but removable with the erection down is a
          sizing problem for another day. These are the findings that mean the
          tissue is already losing the fight, from the case canon, and that
          the right destination is an emergency department, not another hour
          of home attempts:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Color or temperature change distal to the ring:</strong>{" "}
            pale, dusky, blue, or cool skin beyond it is the blood supply
            telling you what grade you&apos;re entering.
          </li>
          <li>
            <strong>Numbness:</strong> sensation going quiet is nerve and
            tissue ischemia, not relief.
          </li>
          <li>
            <strong>You can&apos;t urinate:</strong> retention means the
            swelling is compressing the urethra too, and that escalates the
            whole picture.
          </li>
          <li>
            <strong>Rapidly worsening swelling or pain:</strong> the edema
            spiral, tightening on every pass.
          </li>
          <li>
            <strong>It&apos;s been hours and the ring isn&apos;t moving:</strong>{" "}
            time alone is an indication. The literature&apos;s patients
            typically arrive late, after home remedies fail, and late is what
            converts Grade I into Grade IV.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px" }}>
          And one thing not to do: don&apos;t attack a rigid metal ring with
          improvised cutting tools at home. The case literature documents
          iatrogenic injuries from exactly that, and the tools it takes to
          cut hardened steel without cooking the tissue underneath, ring
          cutters, orthopedic equipment, even dental drills under irrigation,
          are the ones the hospital has and your garage doesn&apos;t.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What actually happens in the room
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Men delay because they imagine the visit is worse than the problem.
          The visit is usually the opposite: local anesthetic or sedation,
          then one of a small set of standard techniques matched to the
          object. Soft rings get cut. Rigid ones come off by decompression:
          the team aspirates the trapped blood from the corpora to shrink the
          tissue, often combined with the string technique, which compresses
          the edema back down the shaft so the ring can slide over it, and
          cutting instruments only when the material demands them. High-grade
          injuries get workups for urethral damage and follow-up for skin
          loss. Nobody is calling anyone. The standard of care is removal,
          quickly, and the case series are unambiguous that early arrival is
          what buys the uncomplicated version of this story.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          If you&apos;re reading this with a ring that won&apos;t come off,{" "}
          <Link href="/support">the support page</Link>{" "}is the fastest route
          to the right frame of mind: act on the clock, not on the
          embarrassment.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Thirty minutes is the rule when the device is doing its job, and a
          ring that stays on past its welcome is the same ischemic clock as
          priapism, wound around the outside. The injuries are graded, the
          grades are time-dependent, and the treatment has been standardized
          since before most hospitals had names. The only variable the
          literature can&apos;t fix for you is the one it keeps naming: the
          delay. Skip it.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6362780/" target="_blank" rel="noopener noreferrer">Sarkar et al., penile strangulation and removal by aspiration and string method (Urol Ann, 2019)</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3784970/" target="_blank" rel="noopener noreferrer">vacuum erection device review, 30-minute constriction-ring ischemia (Sex Med Rev)</a>;{" "}
          <a href="https://academic.oup.com/smr/article/13/2/172/8016502" target="_blank" rel="noopener noreferrer">Wang, vacuum erectile devices (Sex Med Rev, 2025)</a>;{" "}
          <a href="https://medlineplus.gov/ency/patientinstructions/000985.htm" target="_blank" rel="noopener noreferrer">MedlinePlus: vacuum erectile devices</a>; and the broader penile strangulation case canon (first report: Gauthier, 1755).
        </p>
        <p className="sos-note">
          General education on a harm-reduction footing. The strangulation
          canon is case reports and series, which is exactly why this page
          leans on patterns instead of any single story. If a constriction
          device is stuck and showing any of the warning signs above, that is
          an emergency department visit, not a home project and not a wait
          until morning.
        </p>
      </div>

      <Faq slug="stuck-cock-ring" />
      <RelatedArticles slug="stuck-cock-ring" />
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
