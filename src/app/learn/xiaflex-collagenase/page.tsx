import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Xiaflex: the enzyme that eats the plaque",
  description:
    "Xiaflex (collagenase clostridium histolyticum) is the only FDA-approved drug for Peyronie's disease. What the IMPRESS trials delivered (about 17 degrees, not a straight line), the eight-injection course and modeling, the 30 to 90 degree window, the corporal-rupture risk, and the weeks of no sex that come with it.",
  alternates: { canonical: "/learn/xiaflex-collagenase" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Xiaflex: the enzyme that eats the plaque",
  url: `${SITE.url}/learn/xiaflex-collagenase`,
  description:
    "Intralesional collagenase clostridium histolyticum (Xiaflex) for Peyronie's disease: mechanism, IMPRESS trial results, the approved treatment course and penile modeling, candidacy criteria, adverse events including corporal rupture, and its use in Dupuytren's contracture.",
  about: {
    "@type": "Drug",
    name: "Collagenase clostridium histolyticum",
    alternateName: "Xiaflex",
    nonProprietaryName: "collagenase clostridium histolyticum",
    administrationRoute: "Intralesional injection",
    prescriptionStatus: "PrescriptionOnly",
  },
  mentions: [
    { "@type": "MedicalCondition", name: "Peyronie's disease" },
    { "@type": "MedicalCondition", name: "Dupuytren's contracture" },
  ],
  audience: { "@type": "Patient" },
};

export default function XiaflexCollagenasePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "xiaflex-collagenase")} />
      <Breadcrumbs slug="xiaflex-collagenase" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Xiaflex: the enzyme that eats the plaque
      </h1>
      <ArticleMeta slug="xiaflex-collagenase" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        A <Link href="/learn/peyronies-disease">Peyronie&apos;s plaque</Link>{" "}
        is collagen in the wrong place: a patch of dense scar in the sheath that
        should stretch evenly when the penis fills. For most of medical history
        the only way to deal with it was to cut around it. Then someone asked
        the obvious question. If the problem is collagen, why not inject
        something that digests collagen? That something is{" "}
        <strong>Xiaflex</strong>, a purified enzyme from a soil bacterium, and
        since 2013 it has been the only drug the FDA has ever approved for
        Peyronie&apos;s disease. It works. It also works less dramatically than
        the brochure implies, it comes with a rupture risk that earns its own
        safety program, and it is not for every curve. Here is the whole
        picture.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it is
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The generic name is{" "}
          <strong>collagenase clostridium histolyticum</strong>, usually
          shortened to CCH. It is a blend of two collagenases harvested from{" "}
          <em>Clostridium histolyticum</em>, a bacterium whose enzymes evolved to
          break down connective tissue. Purified and injected in a tiny volume
          straight into the plaque, the two enzymes cut collagen strands at
          different points along their length, so that the dense, rope-like
          scar loses its structure and can be pulled apart mechanically.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          That last part matters. Xiaflex does not dissolve a plaque into
          nothing. It weakens it, and then the urologist, and later you,
          physically stretch the weakened tissue to straighten the shaft. The
          drug and the <strong>modeling</strong>{" "}are one treatment, not two,
          and the trials that got it approved tested them together.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the trials actually delivered
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Approval rested on two identical placebo-controlled trials called{" "}
          <strong>IMPRESS I and II</strong>, published in 2013: 832 men with
          stable Peyronie&apos;s disease and a curve of 30° to 90°, randomized
          to collagenase or placebo, both arms modeled the same way. The primary
          result is the number to carry around:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "14px",
            marginBottom: "16px",
          }}
        >
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Collagenase</b> · with modeling
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Curvature improved by a mean of <strong>34%</strong>, about{" "}
              <strong>17°</strong>{" "}off a starting curve that averaged around
              50°. Bother scores, a validated questionnaire about how much the
              deformity was affecting the man, fell alongside it.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Placebo</b> · with modeling
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Curvature improved by a mean of <strong>18%</strong>, about{" "}
              <strong>9°</strong>. Modeling on its own does something, which
              is worth knowing, and which is why traction became part of the
              conversation.
            </p>
          </div>
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Read that honestly. A man who walks in at 60° and gets an average
          result walks out at around 40°. That is a different penis to live
          with, and for many men it is the difference between sex that works
          and sex that doesn&apos;t. It is not a straight line, and a urologist
          who promises one is selling. Larger curves tend to shed more degrees
          in absolute terms; the response is also uneven, with a meaningful
          minority improving very little.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The gains appear to hold. Follow-up of trial participants out to
          several years found the improvement was maintained without further
          treatment, and the American Urological Association guideline lists
          intralesional collagenase with modeling as the recommended
          injectable for stable disease in the 30° to 90° range. Verapamil and
          interferon, the older in-office injections, carry weaker
          recommendations on thinner evidence.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What a course looks like
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          The label protocol, the one the trials used, runs like this. Your
          urologist may compress it, and increasingly does, but this is the
          reference version:
        </p>
        <ol className="sos-prose" style={steps}>
          <li>
            <strong>One cycle is two injections</strong>{" "}of 0.58 mg, given one
            to three days apart, into the plaque at the point of maximum
            curvature. Injection needs a certified prescriber; more on that
            below.
          </li>
          <li>
            <strong>One to three days after the second injection</strong>, the
            urologist performs in-office modeling: a gentle, held stretch of the
            flaccid penis against the curve. It is uncomfortable rather than
            agonizing, and it is over in a minute or two.
          </li>
          <li>
            <strong>Home modeling</strong>{" "}follows, three times a day for
            six weeks, taught in the office. This is the part that rewards
            discipline.
          </li>
          <li>
            <strong>Cycles repeat about six weeks apart</strong>, up to four
            cycles, so up to eight injections over roughly six months. Men
            who reach a curve under 15° can stop early.
          </li>
        </ol>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "20px", marginBottom: "12px" }}>
          Two things have shifted since 2013. <strong>Shortened protocols</strong>{" "}
          (for example three injections at four-week intervals, one per visit)
          have reported results comparable to the eight-injection course with
          far fewer appointments, and many centers use a variation of them.
          And <strong>traction</strong>{" "}devices worn between cycles, which
          turn the six-week gap into a continuous mechanical pull, have shown
          added curvature and length gains in prospective studies. Ask which
          protocol your urologist uses and why; the answer tells you how
          current their practice is.
        </p>
        <p className="sos-note">
          Doses and schedules here are the manufacturer&apos;s label and the
          published protocols, given as literacy so you can follow the plan you
          are handed. Selecting the protocol, the injection site, and when to
          stop is the injecting urologist&apos;s call.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Who it is for, and who it is not
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The candidate the evidence describes is specific, and it is worth
          checking yourself against it before the consultation so the
          conversation starts in the right place:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Stable disease.</strong>{" "}The curve has stopped changing
            and the pain has settled, usually at least a year in. Injecting an
            active plaque is treating a moving target, and the phase logic from
            the <Link href="/learn/peyronies-disease">Peyronie&apos;s primer</Link>{" "}
            applies in full.
          </li>
          <li>
            <strong>A curve of 30° to 90°.</strong>{" "}Under 30° rarely
            justifies the risk; over 90° was not studied and usually points
            toward surgery.
          </li>
          <li>
            <strong>Dorsal or lateral curvature.</strong>{" "}Upward or sideways.
            Ventral (downward) curves were excluded from the trials because the
            urethra runs along the underside, and the label warns against
            injecting near it.
          </li>
          <li>
            <strong>A palpable, non-calcified plaque.</strong>{" "}Calcified
            plaques, the kind that show up as bone-white on ultrasound, do not
            respond; the enzyme has nothing soft to cut.
          </li>
          <li>
            <strong>Erections that work.</strong>{" "}Trial entry required
            erectile function adequate for sex, with or without a{" "}
            <Link href="/learn/pde5-lineup">PDE5 inhibitor</Link>. If erections
            have already failed, straightening a shaft that no longer fills
            solves the wrong problem, and the conversation turns toward an
            implant, which straightens as a side effect.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px" }}>
          An hourglass deformity or indentation without a curve is also outside
          the label. Some urologists treat combined deformities off-label; that
          is a judgment call to have out loud, not a reason to shop for a
          yes.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The risks, and the one that gets its own program
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Expect to be bruised. In the trials, penile bruising or hematoma,
          swelling, and pain at the injection site affected the large majority
          of treated men, and a swollen, purple shaft for a week or two after
          each cycle is normal rather than a complication. Itching, blood
          blisters, and small skin splits happen less often. Nearly all of it
          resolves on its own.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The serious one is <strong>corporal rupture</strong>: a tear of the
          tunica, the same sheath the plaque sits in, which the enzyme has just
          weakened. In the trials it occurred in about 1 in 200 collagenase-treated
          men, along with a handful of hematomas severe enough to need
          intervention. A rupture presents as a sudden pop, sharp pain, and
          rapid swelling, typically during an erection or sex, and it needs
          surgical repair, promptly. That is why the manufacturer&apos;s label
          has an FDA-mandated{" "}
          <strong>Risk Evaluation and Mitigation Strategy</strong>{" "}(REMS)
          for the Peyronie&apos;s indication: only urologists who have completed
          the certification can prescribe and inject it, and the drug ships
          only to certified sites. If someone offering it is not a urologist,
          that is your answer.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The other consequence is the <strong>sex embargo</strong>. No sexual
          activity, including masturbation, for at least four weeks after the
          second injection of each cycle, and not until pain and swelling have
          gone. Across a full course that adds up to a lot of the year, and it
          is the single most common reason men underestimate what they are
          signing up for. Plan for it, and tell a partner, because a rupture
          from sex at week two is the avoidable version of the worst outcome.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Rarer still: allergic reactions, including anaphylaxis, have been
          reported, which is part of why injections happen in an office and not
          at home. Xiaflex is never a self-administered drug, and there is no
          legitimate channel for obtaining a vial outside a certified
          clinic.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The cost question
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Each injection is a single-use vial, and vials are expensive: list
          prices run in the low thousands of dollars apiece, so a full
          eight-injection course reaches well into five figures before the
          office visits. Most US insurers, including Medicare, cover it for
          Peyronie&apos;s when the candidacy criteria above are documented,
          which is one more reason the criteria are worth knowing. Prior
          authorization is the norm; a shortened protocol reduces the bill
          roughly in proportion to the vials it saves. Our{" "}
          <Link href="/learn/what-it-costs">cost primer</Link>{" "}covers how to
          get a real number before the first appointment.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The same vial, in the hand
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Xiaflex was approved for Peyronie&apos;s three years after its first
          indication, <strong>Dupuytren&apos;s contracture</strong>, the fibrous
          cord in the palm that curls a finger toward it. The two conditions are
          cousins: the same disordered collagen deposition, a shared genetic
          tendency, and an overlap in about a fifth of men with Peyronie&apos;s.
          In the hand, a single injection into the cord followed by a
          straightening manipulation a day or two later releases most treated
          joints, and the drug is now a standard alternative to open surgery
          there, with recurrence over the following years as its main
          limitation.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          If you have a bent finger and a bent penis, say so at the
          consultation. It changes nothing about the injection, but it confirms
          the diagnosis, it may explain a family history, and it means the
          urologist and the hand surgeon are treating one disease from two
          ends.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Xiaflex is a real drug for a condition that had none: an enzyme that
          weakens the plaque so that modeling can straighten it, backed by two
          placebo-controlled trials, a guideline recommendation, and years of
          follow-up. Expect a <strong>partial correction</strong>, on the order
          of a third of the curve, over roughly six months of cycles and sex
          embargoes, with a small but genuine rupture risk that is why only
          certified urologists give it. It fits a specific man: stable disease,
          30° to 90°, not ventral, not calcified, erections intact. If that is
          you, it belongs at the top of the non-surgical list. If it is not,
          the honest answer is a different treatment, and a good{" "}
          <Link href="/learn/urologist-visit">urologist</Link>{" "}will say so.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=805cecd0-fd1f-11dd-87af-0800200c9a66" target="_blank" rel="noopener noreferrer">Xiaflex prescribing information (DailyMed)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/23376148/" target="_blank" rel="noopener noreferrer">Gelbard et al., IMPRESS I and II, J Urol 2013</a>;{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/peyronies-disease-guideline" target="_blank" rel="noopener noreferrer">AUA Peyronie&apos;s Disease Guideline</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/28612401/" target="_blank" rel="noopener noreferrer">Abdel Raheem et al., shortened CCH protocol, BJU Int 2017</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/19726771/" target="_blank" rel="noopener noreferrer">Hurst et al., CORD I (Dupuytren&apos;s), NEJM 2009</a>; and{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK560628/" target="_blank" rel="noopener noreferrer">StatPearls: Peyronie Disease</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice. Trial figures are averages
          from the populations studied; your result, candidacy, protocol, and
          risk profile are for a certified urologist who has examined you.
          Xiaflex is administered only in a clinical setting.
        </p>
      </div>

      <Faq slug="xiaflex-collagenase" />
      <RelatedArticles slug="xiaflex-collagenase" />
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

const steps: React.CSSProperties = {
  paddingLeft: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};
