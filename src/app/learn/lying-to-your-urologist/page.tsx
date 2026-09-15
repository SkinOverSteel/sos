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
  title: "A brief history of men lying to their urologist",
  description:
    "What men leave out of the ED visit (the real drug list, gray-market compounds, steroids, poppers, the supplement bag, how often it actually fails), why the research says they do it, and what each omission costs the workup: a mis-dosed Doppler, a hidden nitrate interaction, a missed hypogonadism, a wrong \"psychogenic\" label. Plus what to actually say.",
  alternates: { canonical: "/learn/lying-to-your-urologist" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "A brief history of men lying to their urologist",
  url: `${SITE.url}/learn/lying-to-your-urologist`,
  description:
    "Patient nondisclosure in the erectile dysfunction workup: what men under-report, the evidence on why, and the concrete diagnostic cost of each omission, with a practical guide to giving a complete history.",
  about: { "@type": "MedicalCondition", name: "Erectile dysfunction" },
  audience: { "@type": "Patient" },
};

export default function LyingToYourUrologistPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "lying-to-your-urologist")} />
      <Breadcrumbs slug="lying-to-your-urologist" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Choosing care</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        A brief history of men lying to their urologist
      </h1>
      <ArticleMeta
        slug="lying-to-your-urologist"
        gradeNote="The nondisclosure literature is solid: large national surveys on what patients withhold and why, clinic studies on under-reported erectile dysfunction, and repeated surveys of steroid users' disclosure rates. The diagnostic consequences described here follow directly from guideline history-taking and drug labeling."
      />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Nobody walks into the exam room planning to lie. What happens is
        smaller and more human than that. The intake form asks for
        &quot;current medications&quot; and you write down the blood pressure
        pill and leave off the two things from the internet. The doctor asks
        how often it happens and you say &quot;sometimes,&quot; which is true in
        the way that &quot;I drink socially&quot; is true. He asks about
        recreational drugs and the room goes quiet for a half-second longer
        than it should. Then the visit is over, seven minutes in, and he is
        writing a prescription for a problem you described instead of the one
        you have. This is a page about that gap: what men leave out, why the
        research says they leave it out, and what each omission actually costs
        the workup. It ends with the part that matters, which is what to say
        instead.
      </p>

      <Section title="What gets left out">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Anyone who has spent years on the forums knows the list, because we
          have all written a version of it in a thread and then said something
          very different in a clinic. Roughly in order of how often it is
          omitted:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The real drug list
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              The generic sildenafil from a telehealth site that wasn&apos;t this
              doctor. The tadalafil that arrives in a plain envelope. The
              compounded troche. The bremelanotide vial. The peptide that a guy
              with 4,000 posts swears by. And the supplement bag: the horny goat
              weed, the &quot;natural&quot; capsule from the gas station that turns
              out, on FDA testing, to contain an unlabeled PDE5 inhibitor.
              &quot;Current medications&quot; on the form gets the pharmacy list.
              The rest stays home.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Anabolic steroids, past or present
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              This is the best-measured omission in the whole field. Pope and
              colleagues interviewed weight-lifters in 2004 and found that{" "}
              <strong>56% of steroid users had never told any physician</strong>,
              and 40% trusted their dealer&apos;s information at least as much as
              their doctor&apos;s. Sixteen years later, Bonnecaze surveyed 2,385
              men who used anabolic steroids and got almost the identical
              number: <strong>56.1% had not disclosed</strong>, and of those who
              had, more than half felt discriminated against for it. The
              non-disclosure rate did not move in a generation.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Recreational drugs, poppers, and the actual drinking
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Cocaine, MDMA, cannabis, and above all alkyl nitrites
              (&quot;poppers&quot;), which a lot of men do not think of as a drug
              at all and so never mention. Alcohol gets the standard social
              discount. None of this is moral information. All of it is
              pharmacological information, and one item on this list is
              dangerous in combination with the drug the doctor is about to
              prescribe.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              How often it actually fails, and when
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              &quot;Sometimes&quot; covers everything from one bad night to
              never-firm-in-two-years. Whether morning erections still happen,
              whether it works solo and fails with a partner, whether it works
              with one partner and not another, whether there is a pattern
              around porn and masturbation: these are the questions that sort
              vascular from nerve from psychological causes, and they are the
              ones men most often answer vaguely.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The partner situation
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Who the sex is with, whether the relationship is in trouble,
              whether there is a new partner or more than one, whether the
              problem is with men, women, or both. Doctors ask about this
              because context is diagnostic, and it is the question most likely
              to get a tidy, fictional answer.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Why: the research on withholding">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The reflex is to call this shame and move on, and shame is in there.
          But the literature is more specific and more forgiving than that,
          because it turns out almost everyone does it. In the largest study of
          patient nondisclosure to date, Levy and colleagues surveyed two
          national samples totaling more than 4,500 adults and found that{" "}
          <strong>81% of the younger sample and 61% of the older sample had
          withheld at least one type of medically relevant information</strong>{" "}
          from a clinician. The top reasons, in both groups: not wanting to be
          judged or lectured (82% and 64%), not wanting to hear how harmful the
          behavior is (76% and 61%), and embarrassment (61% and 50%). Read those
          three again. Two of them are not about shame at all. They are about
          not wanting to be told to stop.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          That maps precisely onto the gray-market piece. Eisenberg&apos;s
          national survey of adults who used both conventional and
          complementary therapies found that <strong>63% to 72% did not
          disclose at least one alternative therapy to their doctor</strong>, and
          the reasons were not fear. They were &quot;it wasn&apos;t important for
          the doctor to know&quot; (61%), &quot;the doctor never asked&quot; (60%),
          &quot;none of the doctor&apos;s business&quot; (31%), and &quot;the
          doctor would not understand&quot; (20%). Swap &quot;alternative
          therapy&quot; for &quot;the peptide from the forum&quot; and you have a
          near-perfect description of how a compounded troche or a research
          vial fails to make it onto the intake form: not hidden so much as
          filed under irrelevant, with a side of &quot;he won&apos;t know what
          it is anyway.&quot;
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The steroid data adds the third motive, and it is the one the forums
          understand best: distrust of competence. In the Pope study, users
          rated physicians highly on general health, smoking, alcohol, and
          conventional drugs, and markedly lower on anabolic steroids
          specifically. Bonnecaze&apos;s 2020 respondents rated physician
          knowledge of steroids at about 4 out of 10. When a man believes the
          doctor knows less about the compound than he does, disclosure feels
          like volunteering for a lecture from someone less informed. Whether
          or not that belief is fair (and in a good sexual-medicine clinic it
          usually isn&apos;t), it drives the silence.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Then there is the chart. Anything you say becomes part of a record
          that insurers, future doctors, and in some jobs an employer can see,
          and men on testosterone or steroids know that a documented history
          can complicate a later prescription, a life-insurance exam, or a
          fertility workup. That fear is not irrational. It is also mostly
          misdirected, and we will come back to it.
        </p>
        <p className="sos-note">
          And finally the seven-minute visit. Under-reporting is not only a
          patient behavior; it is a system behavior. In the Baldwin study of
          500 men over 50 visiting a urologist for something unrelated,{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>44% had some degree of erectile dysfunction and had
          not raised it</strong>. Embarrassment was the top reason (74%), but{" "}
          <strong style={{ color: "var(--sos-text-hi)" }}>82% of the men who had never discussed it with their
          primary-care doctor said they wished the doctor had asked first</strong>.
          Most men with the problem never get as far as a visit at all: the
          Shabsigh six-country analysis of more than 32,000 men confirmed that
          only a minority with erectile dysfunction seek treatment, with the
          youngest men (20 to 39) least likely, usually because they assumed it
          would go away. The silence starts before the door, and the room
          isn&apos;t built to break it.
        </p>
      </Section>

      <Section title="What each omission costs the workup">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Here is the part that should change your mind, because it changed
          ours. The AUA guideline&apos;s first statement on erectile dysfunction
          is that every man presenting with it should get{" "}
          <strong>a thorough medical, sexual, and psychosocial history</strong>,
          a physical exam, and selective lab testing. The history is not the
          preamble to the workup. It is the workup. Every test that follows is
          chosen, dosed, and interpreted against what you said in the first
          five minutes, which means every omission is not a private matter.
          It is a wrong input to a machine that is now going to produce a
          confident wrong output.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Omit the PDE5 use, mis-steer the Doppler
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              A{" "}
              <Link href="/learn/penile-doppler-ultrasound">penile Doppler ultrasound</Link>{" "}
              works by injecting a vasoactive drug and measuring the blood-flow
              response. The injection dose and the redosing decision are made
              from your history: how severe the problem is, what you already
              respond to, what you took recently. Understate the severity and
              the first dose may be inadequate, producing a false
              &quot;venous leak&quot; picture. Leave out that you took tadalafil
              yesterday (it lasts well over a day) and the response is read
              against a baseline that isn&apos;t your baseline. Either way, a
              test that costs real money and a needle produces a number that
              doesn&apos;t mean what everyone thinks it means. The same logic
              runs through the whole{" "}
              <Link href="/learn/ed-workup">workup sequence</Link>: the history
              decides which tests are ordered at all.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-emergency)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Omit the poppers, hide the one interaction that can put you on the floor
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              This is the omission with the shortest fuse. The FDA label for
              sildenafil, and the labels for every PDE5 inhibitor after it,
              contraindicate nitrates in any form because the combination can
              drop blood pressure to unsafe levels. The patient information
              names the recreational versions explicitly: amyl nitrate, amyl
              nitrite, butyl nitrate, &quot;poppers.&quot; A man who uses poppers
              and doesn&apos;t say so walks out with a prescription for a drug
              that has a stated, label-level danger with something already in
              his bedroom drawer. The doctor cannot warn about what he was not
              told. Same for a cardiac nitrate you forgot was a nitrate. Our{" "}
              <Link href="/learn/pde5-lineup">PDE5 lineup</Link>{" "}page covers
              the drug-side of this; the history-side is you.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Omit the steroids, hide a secondary hypogonadism
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Anabolic steroid use suppresses the brain&apos;s own signal to the
              testes, and after a cycle ends that signal can stay suppressed
              for months or longer. The result, reviewed by Rahnema and
              Lipshultz in 2014, is anabolic steroid-induced hypogonadism: low
              testosterone, low LH and FSH, poor libido, erectile dysfunction,
              and often impaired fertility. A doctor who sees a low morning
              testosterone with no steroid history reads it as a testicular or
              pituitary problem and may start standard{" "}
              <Link href="/learn/testosterone-therapy">testosterone therapy</Link>,
              which deepens the suppression and, if you want children, is the
              wrong drug entirely. Told the truth, the same doctor orders LH,
              FSH, and estradiol alongside the testosterone, recognizes the
              pattern, and manages recovery instead of masking it. Your{" "}
              <Link href="/learn/read-your-labs">labs</Link>{" "}only make sense
              with the history attached.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Omit the pattern, get the wrong &quot;psychogenic&quot; label
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Psychogenic erectile dysfunction is a real diagnosis and a
              treatable one, but it is also where vague histories go to die. A
              young man who says &quot;sometimes&quot; and has a normal exam and
              normal labs is, statistically, going to be told it&apos;s in his
              head. If the actual pattern is that morning erections have
              disappeared, that it fails solo as well as with a partner, and
              that he is three months out from a steroid cycle, that label is
              wrong and the vascular or hormonal cause goes unworked-up. If
              the actual pattern is that it works fine solo and only fails
              with partners, that&apos;s a different and{" "}
              <Link href="/learn/psychogenic-ed">genuinely psychogenic</Link>{" "}
              picture, and the clinician who hears it can skip an unneeded
              Doppler. Both mistakes come from the same missing sentence. The
              history is the only tool that sorts them cheaply.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              Omit the supplement bag, mislead the prescription
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              The FDA has issued hundreds of public notifications for sexual
              enhancement supplements found to contain hidden sildenafil,
              tadalafil, or their analogues. If you are already taking one of
              those and the doctor adds a prescribed PDE5 inhibitor on top, you
              are stacking two doses nobody counted. If a compounded product
              with several actives is in the mix, the same. The doctor is
              titrating against an invisible baseline. Our{" "}
              <Link href="/learn/product-forms">product-forms</Link>{" "}page is
              about learning what is actually in the thing; this is about
              saying so out loud.
            </p>
          </div>
        </div>
      </Section>

      <Section title="On the chart, and on fear">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The chart fear deserves a straight answer rather than reassurance.
          Yes, what you say gets documented. But the thing men are usually
          afraid of, a note that says &quot;patient reports prior anabolic
          steroid use,&quot; is routine in sexual medicine and endocrinology
          and is precisely what makes a later testosterone prescription
          defensible rather than suspicious. A hypogonadism diagnosis with a
          documented cause is easier to treat and insure than a mystery low-T
          with a gap in the story. Recreational drug use is a clinical fact,
          not a legal report; clinicians are not law enforcement, and the
          confidentiality rules around your record are strong. The real
          exposure is the other direction: an inaccurate chart produces
          treatment for the wrong condition, and that follows you too.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          As for the lecture: the Levy data says the thing we most want to
          avoid is being told to stop. Here is a reframe that the veterans of
          these forums eventually arrive at. You are not asking permission.
          You are giving the doctor the inputs to do his job on your actual
          body. A good clinician takes a steroid history the way he takes a
          smoking history, as data, and if he doesn&apos;t, you have learned
          something useful about whether this is your clinician. The{" "}
          <Link href="/learn/urologist-visit">urologist visit</Link>{" "}page
          walks through how to tell a sexual-medicine practice from a
          general one; disclosure works far better in the former, and finding
          one is the smart move, not the last resort.
        </p>
      </Section>

      <Section title="What to actually say">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The trick that works is to stop treating the visit as a
          conversation and treat it as a handoff. Conversations invite
          vagueness. Handoffs invite lists. Write this down before you go,
          hand it over or read it out in the first minute, and let the doctor
          ask the follow-ups.
        </p>
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)", marginBottom: "16px" }}>
          <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
            The one-page history
          </h3>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>1. Everything you take.</strong>{" "}Prescribed, telehealth,
            compounded, gray-market, supplement. Name, source, how long, how
            much, when you last took it. &quot;I get tadalafil from an online
            pharmacy and I took it two days ago&quot; is a complete sentence.
            &quot;I use a compounded troche with three drugs in it, here is the
            label&quot; is a better one.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>2. Androgens, ever.</strong>{" "}&quot;I ran anabolic steroids
            for X years, last cycle ended in month/year, I did or did not do a
            recovery protocol, and I want children / don&apos;t.&quot; This one
            sentence changes which labs get ordered.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>3. Recreational, honestly.</strong>{" "}Alcohol as a weekly
            number, not an adjective. Cannabis, stimulants, MDMA. And poppers
            by name, because the doctor is about to prescribe the one drug
            class they are contraindicated with.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>4. The pattern, not the adjective.</strong>{" "}Onset (sudden
            or gradual), how many attempts out of ten fail, whether morning
            and nighttime erections still happen, solo versus partnered,
            whether it varies by partner or by situation, and anything about
            porn or masturbation habits you suspect is part of it. Bring a
            score from the{" "}
            <Link href="/tools/erectile-function-score">erectile function questionnaire</Link>;
            the guideline recommends validated questionnaires for exactly
            this reason.
          </p>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            <strong>5. The context.</strong>{" "}Relationship status and
            stress, new partner, sexual orientation, anything that has changed
            in the last year. Two sentences. The doctor is not grading your
            life; he is looking for the timeline.
          </p>
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          If the first thing you have to say is the hardest thing, say it
          first. &quot;Before we start, there are two things that aren&apos;t on
          the form&quot; is a sentence that has been said in a thousand exam
          rooms, and in a good one it is met with a nod and a pen. If it is
          met with a lecture instead, you have your answer about the fit, and
          the{" "}
          <Link href="/directory">directory</Link>{" "}and the{" "}
          <Link href="/learn/telemedicine-visit">telemedicine route</Link>{" "}
          exist for a reason.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The forums taught a lot of us to keep careful logs and a wall
          between the log and the clinic. The log was the right instinct. The
          wall was the mistake. The whole point of an honest n=1 record is
          that it becomes the best history any clinician has ever been handed,
          and the man who hands it over gets a workup built on his actual
          life. That is not surrender to medicine. It is using it properly.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/30646397/" target="_blank" rel="noopener noreferrer">Levy et al., prevalence of and factors associated with patient nondisclosure to clinicians (JAMA Network Open, 2018)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11529698/" target="_blank" rel="noopener noreferrer">Eisenberg et al., perceptions about complementary therapies and reasons for nondisclosure (Annals of Internal Medicine, 2001)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/12789385/" target="_blank" rel="noopener noreferrer">Baldwin et al., under-reporting of erectile dysfunction among men with unrelated urologic conditions (2003)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/15541128/" target="_blank" rel="noopener noreferrer">Shabsigh et al., drivers and barriers to seeking treatment for erectile dysfunction in six countries (BJU International, 2004)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/15317640/" target="_blank" rel="noopener noreferrer">Pope et al., anabolic steroid users&apos; attitudes towards physicians (Addiction, 2004)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/33307930/" target="_blank" rel="noopener noreferrer">Bonnecaze et al., characteristics and attitudes of 2,385 men using anabolic androgenic steroids (2020)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/24636400/" target="_blank" rel="noopener noreferrer">Rahnema et al., anabolic steroid-induced hypogonadism: diagnosis and treatment (Fertility and Sterility, 2014)</a>;{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA Erectile Dysfunction Guideline (2018)</a>;{" "}
          <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2017/020895s048lbl.pdf" target="_blank" rel="noopener noreferrer">FDA prescribing information for sildenafil (Viagra), nitrate contraindication and patient information naming poppers</a>;{" "}
          <a href="https://www.fda.gov/drugs/medication-health-fraud-notifications/sexual-enhancement-and-energy-product-notifications" target="_blank" rel="noopener noreferrer">FDA public notifications on sexual enhancement products with hidden drug ingredients</a>; and{" "}
          <a href="https://www.medlineplus.gov/druginfo/meds/a699015.html" target="_blank" rel="noopener noreferrer">MedlinePlus sildenafil information</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice. Nothing here is a protocol
          for using, combining, or stopping any drug, prescribed or otherwise.
          If you use nitrates or poppers, tell the prescriber before any PDE5
          inhibitor is started. Decisions about testing, testosterone, and
          recovery from androgen use belong with a licensed clinician who has
          your full history, which is the whole argument of this page.
        </p>
      </div>
      <Faq slug="lying-to-your-urologist" />
      <RelatedArticles slug="lying-to-your-urologist" />
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
