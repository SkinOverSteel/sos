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
  title:
    "High hematocrit on TRT: the number that ends therapy, and the bad advice that follows",
  description:
    "TRT thickens the blood, and the advice that follows is a mess: the 54% guideline number, the blood-donation debate, the altitude myth, and what actually moves hematocrit.",
  alternates: { canonical: "/learn/trt-high-hematocrit" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "High hematocrit on TRT: the number that ends therapy, and the bad advice that follows",
  url: `${SITE.url}/learn/trt-high-hematocrit`,
  description:
    "Testosterone-induced erythrocytosis explained: why hematocrit and hemoglobin rise on TRT, the guideline thresholds, the blood donation and phlebotomy debate, popular myths, the ferritin crash, and what actually lowers red-cell count.",
  about: { "@type": "MedicalCondition", name: "Secondary erythrocytosis (testosterone-induced)" },
  audience: { "@type": "Patient" },
};

const myths: { claim: string; record: string; tone?: "emergency" }[] = [
  {
    claim: "\u201CJust lower your dose until it normalizes.\u201D",
    record:
      "Rarely works. A 2024 Journal of Men's Health retrospective tracked roughly 7,000 testosterone cypionate patients at one clinic over seven years, and only 60 reached a defined \u201Cstable\u201D state where the polycythemia effect had stopped, at total testosterone levels between 605 and 1051 ng/dL. That is well under 1%. Read it with the caveats (single clinic, retrospective, most patients also on anastrozole), but the direction is clear: chasing a hematocrit fix by shrinking the dose is a long-odds strategy, and the men who do \u201Cfix\u201D it this way often land in the 500s and still see erythrocytosis.",
  },
  {
    claim: "\u201CHigh hematocrit on TRT is the same as living at altitude, and those people don't donate.\u201D",
    record:
      "The comparison fails on its own numbers. Healthy young men living at 4,000 meters in Potosí, Bolivia average a hematocrit of 52.7%, with a normal range up to 61%: a plateau produced by hypoxia-driven EPO via hypoxia-inducible factor. Testosterone drives EPO harder and also acts on the marrow directly, so on TRT the number often keeps climbing instead of plateauing. And altitude populations are not exempt either: chronic mountain sickness is a real condition of excessive erythrocytosis in highlanders.",
  },
  {
    claim: "\u201CI'm just like an endurance athlete.\u201D",
    record:
      "Even the most infamous endurance athlete in history didn't run these numbers. Lance Armstrong's biological passport values, published and analyzed during the doping era, never showed a hematocrit above about 50%, and he said so himself in the same interview where he admitted to EPO use. Elite athletes manage hematocrit precisely because blood that thick is a liability, not a superpower.",
  },
  {
    claim: "\u201CA study proved donating blood doesn't help.\u201D",
    record:
      "The study usually cited for this says close to the opposite. The Canadian Blood Services review (Transfusion, 2017) followed 39 donors on TRT and found 44% of repeat donors still had hemoglobin at or above 180 g/L (hematocrit roughly 54%) at subsequent donations, concluding that repeat donation was insufficient to keep hematocrit below 54%. That is a finding that TRT keeps pushing the number back up between donations, not that donation fails to lower it. Nobody claimed one donation is a cure; the driver is continuous, so the management is continuous.",
  },
  {
    claim: "\u201CKeep it under 45 like the polycythemia vera patients.\u201D",
    record:
      "A hematocrit target below 45% is the treatment goal for polycythemia vera, a bone-marrow cancer, and it is the target the FDA cites for Mimrylo (rusfertide), approved for PV in August 2026. Testosterone-induced secondary erythrocytosis is a different condition, and the guideline number for pausing therapy is higher: 54%. Importing the PV target into TRT is how men get bled down to a hematocrit their own prescriber never asked for, and how ferritin gets crashed for no guideline reason.",
  },
  {
    claim: "\u201CThey'll turn you away from the Red Cross if you're on testosterone.\u201D",
    record:
      "Testosterone replacement appears nowhere on the Red Cross eligibility and deferral criteria, and collection organizations state directly that donors taking TRT may donate if they meet all general donor qualifications. The real bars are the hemoglobin check itself (minimum 13.0 g/dL for men, maximum 20.0) and general eligibility. One nuance worth knowing: blood centers collect donations, they do not perform therapy. If donation is medically necessary for you, that is therapeutic phlebotomy, a clinician-ordered procedure at a medical facility, and some centers decline donations that are really treatments. Answer screening questions honestly and let your prescriber order what is medical.",
  },
];

export default function TrtHighHematocritPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "trt-high-hematocrit")} />
      <Breadcrumbs slug="trt-high-hematocrit" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        High hematocrit on TRT: the number that ends therapy, and the bad advice
        that follows
      </h1>
      <ArticleMeta slug="trt-high-hematocrit" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        Erythrocytosis is the most common adverse effect of testosterone
        therapy: too many red blood cells, a rising hematocrit, blood that
        thickens. It usually shows up on the three-month labs, and from that
        moment the man is caught between two crowds who both sound confident
        and are both partly wrong. One side says stop the therapy, donate
        blood, keep it under 45. The other says never donate, your body is
        fine, it&apos;s just like living in Denver. Meanwhile his prescriber,
        trained on a 54% number from a guideline whose evidence base predates
        modern TRT practice, may not have a plan at all. This page does what
        the guidelines do plus what they don&apos;t: the actual mechanism, the
        actual thresholds, the myths with the receipts, what genuinely moves
        the number, and the ferritin crash nobody warns you about.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why testosterone thickens your blood
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          The mechanism is well mapped and it has two engines. Testosterone
          raises erythropoietin (EPO), the kidney hormone that tells the
          marrow to build red cells, and it recalibrates the EPO/hemoglobin
          set point: the body defends a higher hemoglobin level as if it were
          normal. On top of that, testosterone stimulates the marrow directly,
          independent of EPO. A 2014 study in healthy men, <em>Testosterone
          Induces Erythrocytosis via Increased Erythropoietin and Suppressed
          Hepcidin</em>, measured both effects and found something else that
          matters later on this page: alongside the 7% rise in hemoglobin,
          ferritin and hepcidin fell.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Hepcidin is the body&apos;s iron gatekeeper. More red-cell
          production means more erythroferrone from the marrow, which
          suppresses hepcidin, which opens the gates: stored iron (ferritin)
          pours out to build hemoglobin, and less iron gets stored. So the
          same therapy that raises your hematocrit quietly drains your iron
          reserves, before you have donated a single unit. That is not a
          side-note; it is why the phlebotomy conversation and the ferritin
          conversation are one conversation.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The numbers the guidelines actually say
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          The Endocrine Society&apos;s 2018 clinical practice guideline is the
          one most US prescribers follow, and its instruction is specific:
          check hematocrit at baseline, three to six months after starting,
          and then annually. If hematocrit exceeds 54%, stop therapy until it
          decreases to a safe level, evaluate the patient for hypoxia and
          sleep apnea, and reinitiate at a reduced dose. The European
          Association of Urology uses the same 54% line and adds that dose
          adjustment and/or venesection (500 mL) should be considered,
          repeating if necessary.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Two honest caveats about that 54%. First, the EAU traces it to a
          Framingham Heart Study analysis of hematocrit and cardiovascular
          mortality, in a general population with plenty of smokers, not in
          men on testosterone; the threshold is convention more than measured
          TRT risk. Second, and this is the part that helps you: the
          guideline&apos;s &quot;stop and evaluate&quot; step names sleep
          apnea and hypoxia for a reason. Untreated sleep apnea and smoking
          are independent erythrocytosis drivers, and a man on TRT with an
          unexplained hematocrit climb deserves a sleep study and an honest
          look at the other drivers before anyone reaches for the blood bag
          or the &quot;you&apos;re off testosterone&quot; stamp.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          One lab-literacy note while you&apos;re here: hematocrit is a
          ratio, red-cell volume over total blood volume, and it moves with
          hydration. A dehydrated draw reads falsely high. If your number
          jumped, retest well-hydrated before making decisions, and if your
          lab reports a hemoglobin of 18 g/dL or a hematocrit at or above
          54%, that is the guideline threshold to take seriously with your
          prescriber, not something to argue with on a forum.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The bad advice hall of fame
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          Six things men on TRT are told constantly, checked against what the
          sources actually say.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {myths.map((m) => (
            <div key={m.claim} className="sos-card">
              <p className="sos-kicker" style={{ marginBottom: "6px" }}>
                {m.claim}
              </p>
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                {m.record}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What actually moves the number
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          In rough order of evidence strength, the levers that work:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Fix the other drivers first.</strong>{" "}
            Treat sleep apnea, stop smoking, retest hydrated. The guideline
            itself says evaluate for hypoxia before anything else.
          </li>
          <li>
            <strong>Change how the testosterone is delivered.</strong>{" "}
            Injectable esters cause the most erythrocytosis because they
            spike; transdermal gels, nasal, and buccal routes are associated
            with far less of it. If injections are staying, splitting the
            weekly dose into more frequent shots flattens the peaks, and a
            trial of the subcutaneous testosterone enanthate autoinjector
            (Xyosted) found hematocrit increases about 41% lower than the
            same weekly dose given intramuscularly, roughly two hematocrit
            points at similar testosterone levels.
          </li>
          <li>
            <strong>Phlebotomy or donation, when the number says so.</strong>{" "}
            This is the lever with the most direct effect: removing red cells
            removes red cells. Whole-blood donation is allowed every 8 weeks
            and double-red (Power Red) every 16 weeks by US collection rules.
            Whether you need it at a hematocrit of 51 versus 54 is genuinely
            debated and genuinely individual; at 54% it is guideline
            territory, and at 60% it is not a debate, it is an appointment
            this week. The Canadian donor data is the honest framing:
            donation lowers the number, and TRT pushes it back up, so for
            some men this is a maintenance rhythm, not a one-time fix.
          </li>
          <li>
            <strong>Blood-pressure drugs your prescriber may choose.</strong>{" "}
            ARBs like telmisartan and losartan have literature and heavy
            community reporting behind modest hematocrit-lowering effects
            (angiotensin II feeds EPO production in the kidney), and
            telmisartan is{" "}
            <Link href="/learn/pde5-long-term">already a favorite on this site</Link>{" "}
            for men with both ED and hypertension. The evidence for
            hematocrit specifically is thin, so this is a prescriber
            conversation, not a self-prescription.
          </li>
          <li>
            <strong>Aspirin, with clear eyes.</strong>{" "}
            Low-dose aspirin does not lower hematocrit at all. What it does
            is inhibit platelet aggregation, which is why some clinicians add
            81 mg when hemoglobin climbs, as clot-event insurance. If someone
            sells you aspirin as the fix for thick blood, they are selling
            you the wrong mechanism.
          </li>
          <li>
            <strong>Rusfertide, the one to watch.</strong>{" "}
            On August 28, 2026 the FDA approved Mimrylo (rusfertide), a
            first-in-class synthetic hepcidin mimetic, for erythrocytosis in
            polycythemia vera. In the phase 3 VERIFY trial, 76.9% of
            rusfertide patients needed no phlebotomy across 32 weeks versus
            32.9% on placebo. It is approved for PV, a different disease, and
            not for testosterone-induced erythrocytosis. But it is proof the
            hepcidin pathway is druggable, and it is the closest thing to a
            real fix on the horizon for the TRT version of this problem.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The ferritin crash nobody warns you about
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Here is the trap the donation debate misses. TRT already suppresses
          hepcidin and drains ferritin, per the mechanism above. Repeated
          phlebotomy then removes iron directly, because every unit of blood
          carries roughly 200-250 mg of it out the door. Stack the two and
          you get the profile legions of TRT men report and almost nobody
          tests for: hematocrit controlled, hemoglobin fine, ferritin on the
          floor, and the man feels drained, restless, and flat. Community
          reports converge on ferritin below roughly 30 ng/mL as the
          &quot;feel like crap&quot; zone, with 50-70 restoring most men,
          though those thresholds are forum-observed, not guideline-grade.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The literacy move is simple: if you are donating or getting
          phlebotomized on TRT, ask for ferritin alongside the CBC, every
          time. If it is low, iron repletion is a clinician conversation, and
          the one thing worth saying to that clinician is that men with C282Y
          hereditary hemochromatosis must not load iron blindly; an HFE test
          settles the question cheaply. There is an elaborate community
          protocol circulating (the &quot;Vorck ferritin protocol,&quot;
          short bursts of high-dose non-heme iron aimed at spiking hepcidin
          so the body re-stores its own recycled iron rather than absorbing
          the supplement) with enthusiastic anecdotal reports and no
          controlled trials behind it. We&apos;re not going to print dosing
          steps for an unvalidated iron-loading scheme; iron overload is a
          real harm. What we will say: it exists, men report it works, it has
          not been tested the way a treatment should be, and if you pursue
          it, do it with a clinician who knows your ferritin trajectory and
          your hemochromatosis status.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          When it stops being a labs conversation
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Most elevated hematocrit is asymptomatic and managed on a schedule.
          The symptoms that change the urgency: a flushed, ruddy complexion,
          headaches, blurred vision, itching after hot showers, shortness of
          breath, and the clot signs that send you in immediately, chest
          pain, one-sided weakness, trouble speaking, a swollen painful calf.
          A hematocrit approaching 60% with symptoms is same-day medical
          territory. That is the one point in this entire debate where both
          crowds agree.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          And the meta-lesson of this page applies to the whole TRT project:
          the difference between safe therapy and drift is monitoring. If
          your program checks hematocrit at baseline, at three to six months,
          and annually, and has an actual plan for what happens when it
          climbs, you are in the supervised channel this site keeps pointing
          toward. If your hematocrit has never been mentioned to you, that is
          the finding, and it&apos;s worth more than the number itself.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Testosterone raises red cells through EPO and direct marrow
          stimulation, and suppresses hepcidin while it does it, which is why
          hematocrit climbs and ferritin falls together. The guideline number
          is 54%, not 45. Lowering the dose fixes it for well under 1% of
          men. Donation works, and works repeatedly, because the driver is
          continuous; the studies &quot;proving&quot; it fails are being
          misread. Altitude and athlete comparisons don&apos;t survive their
          own data. Change the delivery route, fix sleep apnea, retest
          hydrated, ask for ferritin every draw, and take the rusfertide
          approval as the sign it is: this problem is finally getting real
          pharmacology. Read the CBC in the context of{" "}
          <Link href="/learn/read-your-labs">your full lab panel</Link>, keep
          the monitoring honest per{" "}
          <Link href="/learn/testosterone-therapy">what safe TRT requires</Link>,
          and if your current prescriber has no answer for a climbing
          hematocrit, that is what the{" "}
          <Link href="/directory">clinic directory</Link> is for.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://academic.oup.com/jcem/article/103/5/1715/4939465" target="_blank" rel="noopener noreferrer">Bhasin et al., Endocrine Society Clinical Practice Guideline on Testosterone Therapy (JCEM, 2018), hematocrit monitoring and the &gt;54% stop rule</a>;{" "}
          <a href="https://d56bochluxqnz.cloudfront.net/media/EAU-Guidelines-on-Male-Hypogonadism-2019v2.pdf" target="_blank" rel="noopener noreferrer">EAU Guidelines on Male Hypogonadism (2019), venesection at &gt;54%</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/24158761/" target="_blank" rel="noopener noreferrer">Bachman et al., testosterone induces erythrocytosis via increased EPO and suppressed hepcidin (Am J Physiol Endocrinol Metab, 2014)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/33372284/" target="_blank" rel="noopener noreferrer">Ganz, erythroferrone, hepcidin, and iron homeostasis (J Cell Physiol, 2021)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/28150363/" target="_blank" rel="noopener noreferrer">Delage et al., blood donation and testosterone replacement therapy (Transfusion, 2017)</a>;{" "}
          <a href="https://www.jomh.org/articles/10.22514/jomh.2024.010" target="_blank" rel="noopener noreferrer">Kelleher, controlling the polycythemia effect associated with TRT (J Men&apos;s Health, 2024)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11682015/" target="_blank" rel="noopener noreferrer">normal hematological values at 4,000 m in Bolivia (High Alt Med Biol, 2001)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/34694927/" target="_blank" rel="noopener noreferrer">subcutaneous testosterone enanthate autoinjector vs IM cypionate outcomes (J Urol, 2021)</a>;{" "}
          <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-first-drug-its-kind-polycythemia-vera-rare-blood-disorder" target="_blank" rel="noopener noreferrer">FDA approval of Mimrylo (rusfertide) for polycythemia vera, VERIFY trial data (August 28, 2026)</a>;{" "}
          <a href="https://www.redcrossblood.org/donate-blood/how-to-donate/eligibility-requirements/eligibility-criteria-alphabetical.html" target="_blank" rel="noopener noreferrer">American Red Cross donor eligibility criteria and donation intervals</a>;{" "}
          <a href="https://vorck.com/erythrocytosis.html" target="_blank" rel="noopener noreferrer">the Vorck erythrocytosis and ferritin page, as the community-document this debate runs on</a>; and{" "}
          <a href="http://www.sportdw.com/2013/01/lance-armstrong-blood-passport-analysis.html" target="_blank" rel="noopener noreferrer">analyses of Armstrong&apos;s biological passport values</a>.
        </p>
        <p className="sos-note">
          General education, graded Emerging on purpose: the mechanism and the
          guideline thresholds are Established, but the management layer,
          when to donate, which delivery switch, ARB co-therapy, ferritin
          repletion, is thin-trialed and community-driven, and the page says
          so wherever it leans on that layer. Community-observed thresholds
          (the ferritin symptom numbers, telmisartan reports) are flagged as
          anecdote-grade. Not medical advice; the prescriber owns the
          hematocrit plan, and a hematocrit at or above 54% is a prescriber
          conversation this week.
        </p>
      </div>

      <Faq slug="trt-high-hematocrit" />
      <RelatedArticles slug="trt-high-hematocrit" />
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
