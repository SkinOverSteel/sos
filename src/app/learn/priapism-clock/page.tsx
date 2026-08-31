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
  title: "The priapism clock: what a prolonged erection does, hour by hour",
  description:
    "Trapped blood turns acidotic within hours, smooth muscle starts dying by around hour twelve, and by hour thirty-six the odds of recovering an erection are grim. The ischemic priapism damage timeline from the AUA/SMSNA guideline, hour by hour, and what each hour means for the fix.",
  alternates: { canonical: "/learn/priapism-clock" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The priapism clock: what a prolonged erection does, hour by hour",
  url: `${SITE.url}/learn/priapism-clock`,
  description:
    "The hour-by-hour tissue damage timeline of ischemic priapism: blood-gas collapse, smooth muscle necrosis, fibrosis, and why the four-hour rule and early reversal are what save erectile function.",
  about: { "@type": "MedicalCondition", name: "Priapism" },
  audience: { "@type": "Patient" },
};

const clockRows: {
  window: string;
  what: string;
  tone?: "emergency";
}[] = [
  {
    window: "0 to 1 hour",
    what: "Normal operating range after an injection. The target a prescriber titrates toward is an erection that lasts under an hour. Anything past your prescriber's target is information, not a badge of honor.",
  },
  {
    window: "1 to 4 hours",
    what: "The gray zone, called a prolonged erection. Blood is pooling and losing oxygen, but clotting and true tissue starvation usually haven't set in yet. This is where the rescue ladder (ice, walking, pseudoephedrine, prescriber-directed rescue medication) actually works.",
  },
  {
    window: "4 hours",
    what: "The emergency line. This is the moment the event becomes ischemic priapism by definition: little or no blood flow, fully rigid shafts, pain, and blood that is hypoxic, hypercarbic, and acidotic. Every guideline, every drug label, every four-hour rule points at this number.",
    tone: "emergency",
  },
  {
    window: "~6 hours",
    what: "Smooth muscle edema and atrophy can begin as early as six hours, per the urologic literature the AUA/SMSNA guideline cites. The tissue that runs the erection is starting to take damage, invisibly.",
  },
  {
    window: "12 to 24 hours",
    what: "In biopsy studies of men shunted for prolonged priapism, necrosis and fibrosis were already underway in this window. The repair window is closing: shunting within 24 hours resolved priapism in 100% of cases in one series, versus 34% at 48 hours and 0% by 96.",
    tone: "emergency",
  },
  {
    window: "24 to 36 hours",
    what: "More than half of men presenting with 24 to 48 hours of unresolved priapism are left with permanent erectile dysfunction. The guideline requires clinicians to counsel that past 36 hours, the likelihood of recovering erectile function is low.",
    tone: "emergency",
  },
  {
    window: "36 to 48 hours",
    what: "Biopsies at this stage show no viable smooth muscle left in the corpora at 36 hours. In one cohort of men with priapism beyond 36 hours, none recovered erectile function. The conversation at this point shifts from saving function to pain control, shunting, or early implant.",
    tone: "emergency",
  },
  {
    window: "48 hours and beyond",
    what: "Severe, permanent erectile dysfunction in essentially every reported series, and the drugs stop working too: acidosis physically paralyzes the smooth muscle's response to phenylephrine, so the reversal that fixes most men at hour five is failing at hour fifty.",
    tone: "emergency",
  },
];

export default function PriapismClockPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "priapism-clock")} />
      <Breadcrumbs slug="priapism-clock" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The priapism clock: what a prolonged erection does, hour by hour
      </h1>
      <ArticleMeta slug="priapism-clock" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "24px" }}>
        An erection is a hydraulic event: blood flows in, the outflow valves
        clamp shut, pressure holds. A normal erection ends when the valves
        open again. Priapism is what happens when they don&apos;t: the blood
        that built the erection is now trapped in it, cut off from the lungs,
        and it starts to suffocate in place. The four-hour rule that
        surrounds <Link href="/learn/penile-injections">injection therapy</Link>{" "}
        isn&apos;t bureaucracy. It&apos;s the visible edge of a damage clock
        that is already running by then. This is that clock, hour by hour,
        drawn from the urology guideline that governs how this emergency is
        treated.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          It&apos;s compartment syndrome, not a long erection
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The ischemic kind, the kind injection therapy can cause, is a
          venous-occlusive event: inflow continues, outflow is blocked, and the
          corpora cavernosa become a sealed, rigid compartment. The guideline
          describes it as little or no cavernous blood flow with blood gases
          that read like tissue death: oxygen tension under 30&nbsp;mm&nbsp;Hg,
          carbon dioxide over 60, pH under 7.25. Acidotic. That is not an
          erection that refuses to end. That is tissue suffocating in a closed
          room, and every hour on the clock converts muscle into scar.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The clock
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          Hour by hour, what the trapped blood is doing to the tissue, and
          where each window leaves you. Times are approximate: biology is a
          slope, not a staircase, and the slope is steep.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {clockRows.map((row) => (
            <div
              key={row.window}
              className="sos-card"
              style={
                row.tone === "emergency"
                  ? { borderLeft: "3px solid var(--sos-emergency)" }
                  : undefined
              }
            >
              <p
                className="sos-kicker"
                style={{
                  marginBottom: "6px",
                  color:
                    row.tone === "emergency"
                      ? "var(--sos-emergency)"
                      : undefined,
                }}
              >
                {row.window}
              </p>
              <p className="sos-prose" style={{ fontSize: "15.5px" }}>
                {row.what}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the clock changes the fix, not just the odds
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          The reason the four-hour rule is a rule, and not a suggestion, is
          that time doesn&apos;t just raise the stakes. It changes which tools
          work. Early, a prolonged erection is still a plumbing problem: drain
          the trapped blood, put in fresh blood, add phenylephrine to make the
          vessels clamp down, and 71 to 93% of events resolve with the
          preservation of function in 70 to 92%. Late, the tissue itself is the
          problem. Acidotic smooth muscle stops answering phenylephrine,
          clotting defeats simple drainage, and the fixes that remain, shunts
          and tunneling, trade the priapism for a high likelihood of permanent
          erectile dysfunction anyway: in one shunt series, 84% of men came
          out of the procedure with ED, and nearly half with no spontaneous
          erections at all.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          That is the whole of the harm-reduction math on this page. At hour
          two or three, the rescue ladder from{" "}
          <Link href="/support">Get support now</Link>{" "}
          is still mostly in your hands. At hour four, the ladder ends at the
          emergency room, where aspiration and phenylephrine still usually
          work. Past 36 hours, even the emergency room is mostly managing the
          aftermath. The clock is the point.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The part shame keeps quiet
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Men wait. The guideline knows it: it notes that patient timelines are
          often unreliable, sometimes with substance use in the mix, and that
          embarrassment is exactly why events arrive late and function arrives
          lost. So hear this once, clearly: an ER team would rather reverse a
          four-hour erection than reconstruct a 48-hour one, and every hour of
          delay is measured in tissue, not in awkwardness. If you are reading
          this with a clock running,{" "}
          <Link href="/support">start here</Link>. The ladder is already laid
          out, and it runs by the hour.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from: the{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/diagnosis-and-management-of-priapism-aua/smsna-guideline-(2022)" target="_blank" rel="noopener noreferrer">AUA/SMSNA Priapism Guideline (2022)</a>{" "}
          and its evidence tables (Zacharakis et al., Bennett &amp; Mulhall,
          Ortac et al.); the{" "}
          <a href="https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=a295fc1e-d82c-4f44-bc2d-a552bf594c98" target="_blank" rel="noopener noreferrer">CAVERJECT (alprostadil) FDA label</a>; and the{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK542217/" target="_blank" rel="noopener noreferrer">StatPearls: Alprostadil</a>{" "}
          overview.
        </p>
        <p className="sos-note">
          General education, on a harm-reduction footing. The timeline is real
          and it is unforgiving, which is precisely why the rescue ladder and
          the emergency room exist. Nothing on this page is a substitute for
          either: if you have an erection that has outstayed its welcome, act
          on the clock, not on the reading.
        </p>
      </div>

      <Faq slug="priapism-clock" />
      <RelatedArticles slug="priapism-clock" />
    </article>
  );
}
