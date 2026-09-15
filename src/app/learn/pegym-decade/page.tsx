import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { withReview } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ten years of r/PEGym, so you don't have to",
  description:
    "A veteran's history of the male-enhancement exercise forums: Thunder's Place, MattersOfSize, PEGym, and the Reddit era. The vocabulary, the measuring rituals, the gains logs, the survivorship bias, and what the urology literature actually says about traction, jelqing, injury, and why most men who want to be bigger are already normal.",
  alternates: { canonical: "/learn/pegym-decade" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Ten years of r/PEGym, so you don't have to",
  url: `${SITE.url}/learn/pegym-decade`,
  description:
    "An ethnography of the penile enhancement exercise subculture (Thunder's Place, MattersOfSize, PEGym, Reddit) set against the clinical evidence: small-effect traction trials, no trials and documented injuries for manual exercises, and the body-image literature showing most men seeking enlargement have normal anatomy.",
  about: { "@type": "MedicalCondition", name: "Penile injury" },
  audience: { "@type": "Patient" },
};

export default function PegymDecadePage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "pegym-decade")} />
      <Breadcrumbs slug="pegym-decade" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Quality &amp; safety</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Ten years of r/PEGym, so you don&apos;t have to
      </h1>
      <ArticleMeta
        slug="pegym-decade"
        gradeNote="Graded High Risk because the practices at the center of this culture (manual stretching, jelqing, clamping, hanging) have no clinical trials and a documented injury literature. Traction devices, the one method with trials, sit at Emerging on the method map. The body-image findings are Established."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      {/* Safety callout: read first */}
      <aside
        role="note"
        className="sos-card"
        style={{
          border: "1.5px solid var(--sos-emergency)",
          background: "var(--sos-emergency-glow)",
          marginBottom: "40px",
        }}
      >
        <p className="sos-kicker" style={{ color: "var(--sos-emergency)", marginBottom: "8px" }}>
          Read this first
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          This is a history and a sociology, not a manual. You will find{" "}
          <strong>no routines, no times, no reps, and no technique</strong>{" "}
          here, on purpose: the manual methods this culture built itself around
          have no clinical trials and a real injury record. If you already do
          them and you have new pain, a bruise, a bend, numbness, a hard lump,
          or a flaccid penis that stays firm and won&apos;t relax, stop and{" "}
          <Link href="/learn/urologist-visit">see a urologist</Link>. A sudden
          pop, pain, and rapid swelling during an erection is a surgical
          emergency: emergency department, today.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Some of us spent a decade in those forums. Not lurking: posting, logging,
        measuring, arguing in the injury threads at two in the morning. We had
        handles, we had post counts, and we had a private language that would
        have been unintelligible to our own urologists, if we&apos;d ever gone
        to one. So here is the confession, written after the fact: what that
        world was, how it worked on the men inside it, and what the actual
        literature says about the thing we were all doing. We&apos;re not here
        to mock anyone. We are here to save you the ten years.
      </p>

      <Section title="Where it came from">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The male-enhancement exercise subculture (&quot;PE&quot; to its
          members, which stood for penis enlargement long before anyone used
          the same letters for premature ejaculation) predates the web, but the
          web is where it became a culture. The lineage runs through a handful
          of early-2000s message boards, and the names still carry weight:{" "}
          <strong>Thunder&apos;s Place</strong>, the ad-free elder statesman
          with its injury sub-forum and its encyclopedic archive;{" "}
          <strong>MattersOfSize</strong>, which sold a paid program and a
          membership tier and taught the scene that a routine could be a
          product; and <strong>PEGym</strong>, which arrived a little later with
          a cleaner design and a self-consciously &quot;gym&quot; framing that
          did more than anything else to make the whole enterprise sound like
          fitness.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Then Reddit ate the forums, the way it ate most of them. The
          subreddits inherited the vocabulary wholesale but lost the archive,
          the moderation depth, and the long-tenured members whose job had been
          to tell newcomers to slow down. What survived the migration was the
          part that fit in a comment: the routine, the before-and-after, the
          gains claim. What didn&apos;t survive was the part that took a decade
          to learn: the injury threads, the men who quietly stopped posting, and
          the long, unresolved argument about whether any of it worked at all.
        </p>
      </Section>

      <Section title="The vocabulary, and what it was for">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Every subculture builds a language, and the language does work. Ours
          had a canonical &quot;newbie routine&quot; that every forum
          re-published as scripture, a taxonomy of manual and device methods
          with borrowed-from-the-gym names, and a whole grammar of{" "}
          <strong>conditioning</strong>: the idea that tissue, like muscle,
          adapts to load and must be progressively overloaded. The metaphor was
          load-bearing. It made a practice with no evidence feel like a practice
          with a mechanism, because everyone already believed in progressive
          overload from the weight room.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The most elaborate piece of the folk science was the doctrine of{" "}
          <strong>&quot;PIs&quot;</strong>, physiological indicators. You were
          taught to read your own body for signs that you were doing the right
          amount: erection quality up or down, morning erections present or
          absent, color, temperature, whether the flaccid hang looked
          &quot;healthy.&quot; It had the form of clinical monitoring and none of
          the substance. Nobody had validated any of the indicators against an
          outcome. But it gave every practitioner a feedback loop to attend to,
          which is precisely what keeps people attached to a practice, and it
          let the culture reframe every injury as a failure to read the
          signs rather than a property of the method.
        </p>
        <p className="sos-note">
          The one word we had right was the one we borrowed from medicine:{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>traction</strong>.
          More on that below, because it is the single place where the forum
          folk science and the urology literature actually touch.
        </p>
      </Section>

      <Section title="The rituals: measuring, logging, and the gains thread">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          If the vocabulary was the theology, measuring was the liturgy. There
          were standardized protocols (bone-pressed versus non-bone-pressed,
          erect versus stretched, which side of the ruler), endless debates
          about them, and a shared assumption that a millimeter was a real
          thing you could earn. Then the numbers went into a{" "}
          <strong>gains log</strong>, a dated public record of starting size,
          routine, and progress, which in the good forums looked a lot like the
          n=1 protocol logs we care about on this site. The form was actually
          admirable. Structured self-tracking, dated entries, a community that
          expected you to show your work.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The content, though, had two problems the form couldn&apos;t fix.
          First, the instrument. Self-measurement of an organ whose size
          varies with temperature, arousal, time of day, and how hard you
          press the ruler is a noisy signal, and a highly motivated measurer
          will find the trend he&apos;s looking for in the noise. The clinical
          literature deals with this by having a professional measure a large
          sample under one standard procedure; the Veale 2015 nomograms in{" "}
          <em>BJU International</em>{" "}pooled seventeen such studies and up to
          15,521 men to establish what normal even looks like. No gains thread
          ever came close to that discipline. Second, and bigger: who kept
          posting.
        </p>
      </Section>

      <Section title="The social physics: reputation, gatekeeping, survivorship">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Forum reputation was earned, not bought, and that is genuinely one of
          the good things the old boards got right. Tenure showed. Post count
          showed. The men who had been there for years and had a long, tidy
          log carried weight, and they used it, mostly, to slow newcomers down.
          The gatekeeping had a protective side: &quot;read the newbie thread,
          don&apos;t skip ahead, don&apos;t add load yet.&quot; It also had an
          epistemic cost. Doubt was low-status. A member who posted &quot;I did
          this for two years and I&apos;m the same size&quot; got told he&apos;d
          done it wrong, and drifted away.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Now run the selection filter. Who is still posting in year three? Not
          the men who got hurt and left ashamed. Not the men who measured
          honestly, saw nothing, and quit. Not the men who got a bend, or
          numbness, or a flaccid penis that wouldn&apos;t relax, and found the
          forum&apos;s advice (rest, then resume) unbearable. The population
          that remains is the population that believes it worked, and that
          population writes the FAQ that the next cohort reads. This is{" "}
          <strong>survivorship bias</strong>{" "}in its cleanest possible form,
          and it means the forum&apos;s consensus is not evidence about the
          method. It is evidence about who stayed.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          We say this with affection. The community was often kind, and in the
          injury threads it was sometimes the only place a frightened
          twenty-four-year-old could say what had happened to him. But kindness
          is not a study design, and neither is a post count.
        </p>
      </Section>

      <Section title="What the evidence actually says">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "16px" }}>
          Here is the honest map, method by method, and it is shorter than the
          forums would have you believe.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Traction devices: real trials, small effects
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              This is the one method with a clinical literature, and it comes
              from urology, not from the forums. Gontero and colleagues ran a
              single-arm phase II pilot in fifteen men complaining of a short
              penis (BJU Int, 2009) and reported a mean gain of 2.3 cm flaccid
              and 1.7 cm stretched at six months, with no change in girth.
              Nikoobakht and colleagues (J Sex Med, 2011) followed 23 men for
              three months and reported flaccid length going from 8.8 to
              10.5 cm on average. The same device class has a parallel
              literature in{" "}
              <Link href="/learn/peyronies-disease">Peyronie&apos;s disease</Link>{" "}
              and after prostatectomy, where the goal is preserving or
              recovering length rather than adding it. Read the fine print:
              these are small, uncontrolled, mostly single-center studies with
              many hours of daily wear over months, measured by clinicians. The
              effect is real enough to be graded Emerging on our{" "}
              <Link href="/learn/enhancement">method map</Link>. It is also
              modest, slow, and nothing like the forum folklore of inches.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Manual methods: no trials, and an injury record
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Jelqing, manual stretching, clamping, hanging: the practices the
              culture was actually built on have{" "}
              <strong>no clinical trials at all</strong>. None. A 2025 review of
              penile enhancement in <em>Current Urology</em>{" "}doesn&apos;t
              even discuss them, because there is nothing to review. What the
              literature does contain is the injury side. The StatPearls
              reference on penile fracture lists masturbation injury and forced
              bending of the erect penis among the causes of tunica albuginea
              rupture, and describes the long-term bill: erectile dysfunction,
              curvature, fibrosis, painful erections. Clinical reviews and
              anatomists writing for the public describe the same downstream
              problems from repetitive manual trauma: plaque and scar
              formation with a Peyronie&apos;s-like curve, sensory change from
              nerve injury, and vascular injury. And the newest entry in the
              literature came straight out of the forums:{" "}
              <strong>hard flaccid syndrome</strong>, first characterized by
              urologists reading the same threads we did, now described in a
              2020 review as an acquired, chronic, painful condition typically
              following a traumatic injury at the base of an erect penis, with
              sensory change, pelvic-floor tension, and erectile loss. The
              forums had a name for it years before medicine did. That is not
              a compliment to the method.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The men doing it: mostly already normal
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              This is the finding that reframes everything. Mondaini and
              colleagues (Int J Impot Res, 2002) evaluated 67 men who came to
              an andrology clinic asking for surgical lengthening. Not one of
              them met the nomogram definition of a severely short penis, and
              none had an anatomical abnormality. Wylie and Eardley&apos;s 2007
              review in <em>BJU International</em>{" "}gave the pattern its
              clinical name, &quot;small penis syndrome,&quot; and placed it
              on a spectrum from ordinary worry through obsessive rumination
              with checking rituals to body dysmorphic disorder. Veale&apos;s
              group then showed (Sex Med, 2015) that men with body dysmorphic
              concern about size were more likely than controls to have tried
              jelqing, pumps, or stretching devices, with poor reported
              success, and more likely to have erectile difficulty. Read that
              again next to the measuring ritual and the PI doctrine. The
              culture&apos;s daily practice looks, from the outside, a great
              deal like compulsive checking.
            </p>
          </div>
        </div>
      </Section>

      <Section title="The honest psychological read">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          None of this means every man in those forums had a disorder. Most
          didn&apos;t. Wylie and Eardley are careful to say size worry is
          within the normal experience of many men, and the fix for ordinary
          worry is information: a nomogram, a clinician saying &quot;you are
          normal,&quot; and a reason to believe them. What the forums offered
          instead was a structure that took the worry and gave it a job. A
          routine to follow, numbers to track, a community that took the
          concern seriously, and a metaphor (conditioning, gains) that made the
          concern feel like ambition. That is a powerful thing to hand a
          twenty-two-year-old, and it&apos;s why so many of us stayed.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The tell, in retrospect, was that the goalposts moved. Nobody who hit
          his first target stopped. The measurement was never going to satisfy,
          because the measurement was never the problem. If you recognize
          yourself in that sentence, the smart move is not a better routine.
          It&apos;s a conversation with a clinician who sees this every week,
          who can measure you once, properly, tell you where you sit on the
          curve, and, if the worry doesn&apos;t lift when the number comes
          back normal, point you toward the kind of help that actually works
          on the worry itself. That is not a concession. It is the most
          evidence-based thing anyone in that subculture ever did.
        </p>
      </Section>

      <Section title="What we would tell our younger selves">
        <ul className="sos-prose" style={list}>
          <li>
            <strong>You are almost certainly normal.</strong>{" "}Sixty-seven out
            of sixty-seven men in the clinic study were. Check the nomogram
            before you check a forum.
          </li>
          <li>
            <strong>The gym metaphor is a metaphor.</strong>{" "}The penis is
            not skeletal muscle. Tissue that is repeatedly injured scars, and
            scar is stiffer, shorter, and less elastic than what it replaces.
            That is the Peyronie&apos;s mechanism, not a gain.
          </li>
          <li>
            <strong>The consensus you read is the survivors talking.</strong>{" "}
            The men with the bends and the numbness left. Their logs are not
            in the FAQ.
          </li>
          <li>
            <strong>
              If anything is worth a conversation, it&apos;s traction, and the
              conversation is with a urologist.
            </strong>{" "}
            Small effects, real trials, a device class urology already uses for
            Peyronie&apos;s and post-surgical recovery. That belongs inside a
            plan, not a subreddit.
          </li>
          <li>
            <strong>
              Pain, bruising, a new bend, numbness, a lump, or a firm flaccid
              penis is a stop signal,
            </strong>{" "}
            not a PI to &quot;decondition.&quot; That is a{" "}
            <Link href="/learn/urologist-visit">urology visit</Link>. A pop
            with pain and swelling during an erection is the{" "}
            <Link href="/support">emergency department</Link>.
          </li>
        </ul>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          The forums were a real community with a real language, some real
          kindness, and a folk science that borrowed the shape of medicine
          without its content. The only method they championed that has
          evidence is the one urology was studying anyway, and the effect is
          small. The methods they invented have no trials and an injury
          literature that now includes a syndrome named after their own
          threads. And the men doing all of it were, by the clinical count,
          almost entirely normal to begin with. If you want the graded map of
          every method,{" "}
          <Link href="/learn/enhancement">it&apos;s here</Link>. If you already
          have a bend or a plaque,{" "}
          <Link href="/learn/peyronies-disease">start here</Link>. And if you
          want to know where you actually stand, ask a clinician to measure you
          once. It takes thirty seconds and it&apos;s the only measurement in
          this whole story that was ever worth taking.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/18990153/" target="_blank" rel="noopener noreferrer">Gontero et al., pilot phase-II study of a penile-extender device for &apos;short penis&apos; (BJU Int, 2009)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/20102448/" target="_blank" rel="noopener noreferrer">Nikoobakht et al., penile-extender device in men with shortened penis (J Sex Med, 2011)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/19138361/" target="_blank" rel="noopener noreferrer">Gontero et al., penile extender in Peyronie&apos;s curvature (J Sex Med, 2009)</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3547530/" target="_blank" rel="noopener noreferrer">Chung &amp; Brock, penile traction therapy and Peyronie&apos;s disease review (Ther Adv Urol, 2013)</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12076428/" target="_blank" rel="noopener noreferrer">Penile enhancement: a comprehensive and current perspective (Curr Urol, 2025)</a>;{" "}
          <a href="https://www.ncbi.nlm.nih.gov/books/NBK551618/" target="_blank" rel="noopener noreferrer">StatPearls, Penile Fracture</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/32518654/" target="_blank" rel="noopener noreferrer">Abdessater et al., hard flaccid syndrome: state of current knowledge (Basic Clin Androl, 2020)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/25487360/" target="_blank" rel="noopener noreferrer">Veale et al., &quot;Am I normal?&quot; nomograms for penile length and circumference (BJU Int, 2015)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/12152118/" target="_blank" rel="noopener noreferrer">Mondaini et al., penile length is normal in most men seeking lengthening procedures (Int J Impot Res, 2002)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/17355371/" target="_blank" rel="noopener noreferrer">Wylie &amp; Eardley, penile size and the &apos;small penis syndrome&apos; (BJU Int, 2007)</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4599552/" target="_blank" rel="noopener noreferrer">Veale et al., sexual functioning in men with body dysmorphic disorder concerning penis size (Sex Med, 2015)</a>;{" "}
          <a href="https://theconversation.com/jelqing-the-latest-in-a-long-history-of-attempts-to-enlarge-the-male-member-222634" target="_blank" rel="noopener noreferrer">Taylor, jelqing and the long history of enlargement attempts (The Conversation, 2024)</a>; and{" "}
          <a href="https://en.wikipedia.org/wiki/Penis_enlargement" target="_blank" rel="noopener noreferrer">Wikipedia, penis enlargement</a>.
        </p>
        <p className="sos-note">
          General education and cultural history, not medical advice, and
          deliberately not a set of instructions. The forum history above is
          drawn from years inside those communities and their public archives;
          the clinical claims are cited to the literature. Manual enhancement
          methods carry documented injury risk and no trial evidence of
          benefit. Any device use, and any concern about size, curvature, pain,
          numbness, or erectile change, belongs with a licensed urologist who
          can examine you.
        </p>
      </div>
      <Faq slug="pegym-decade" />
      <RelatedArticles slug="pegym-decade" />
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>{title}</h2>
      {children}
    </section>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};
