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
  title: "The Proviron underground",
  description:
    "Mesterolone (Proviron) for libido and erection quality, explained: the real Schering-era pharmacology, why it became forum folklore, what the old European and WHO trials actually showed, what DHT gel trials say about a DHT-axis androgen, the risks, and its Schedule III status in the US.",
  alternates: { canonical: "/learn/proviron-underground" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "The Proviron underground",
  url: `${SITE.url}/learn/proviron-underground`,
  description:
    "Mesterolone (Proviron) and erectile function: approved-era history, pharmacology, the forum folklore around libido and erection quality, the actual trial evidence, DHT gel trials as the closest real comparator, the risks, and US legal status.",
  about: { "@type": "Drug", name: "Mesterolone" },
  audience: { "@type": "Patient" },
};

export default function ProvironUndergroundPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "proviron-underground")} />
      <Breadcrumbs slug="proviron-underground" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        The Proviron underground
      </h1>
      <ArticleMeta
        slug="proviron-underground"
        gradeNote="Mesterolone's approved-era pharmacology is real and documented. The libido and erection-quality claims that keep it alive online are Anecdote grade: decades of consistent first-person reports, never tested in a modern trial. In the US it is a Schedule III controlled substance with no legal retail channel, so the supply is gray market."
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
          Mesterolone is <strong>not FDA-approved</strong>{" "}and is a{" "}
          <strong>Schedule III controlled substance</strong>{" "}in the United
          States. There is no licensed pharmacy channel for it here, which means
          anything sold as &quot;Proviron&quot; to a US buyer is gray market with
          unknown identity and purity. This page publishes no dose, no cycle, and
          no source. It is a map of a market and of the evidence underneath it,
          and the exit it points to is a clinician with your labs in hand.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Every long-running men&apos;s health forum has a drug that never gets
        marketed, never gets a modern trial, and never goes away. For libido and
        erection quality, that drug is mesterolone, and the brand name everyone
        uses is Proviron. We fenced it off in one paragraph at the end of{" "}
        <Link href="/learn/apomorphine-troches">the apomorphine piece</Link>.
        This is the full anatomy: where it came from, what it does, why the
        folklore formed, what the trials actually measured, and why the honest
        version of the signal ends at a lab draw rather than a package.
      </p>

      <Section title="A real drug with a real past">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Start with the part that is not folklore. Mesterolone was described in
          1966 and introduced by Schering in 1967 under a brand name the company
          had used since the 1930s for testosterone propionate. It was approved
          in Germany, the UK, Australia, South Africa, and much of the rest of
          the world as an oral androgen for{" "}
          <strong>male hypogonadism</strong>, and it was used for years as an
          adjunct in idiopathic male infertility on the theory that a mild,
          non-suppressive androgen might nudge sperm quality. It was never
          approved in the United States, Canada, or New Zealand, and it still
          isn&apos;t.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          So this is not a research chemical or a designer steroid. It is a
          legacy European prescription drug with a half-century of pharmacology
          on file. That matters, because it is exactly what makes the online
          story credible enough to survive: the compound is real, the receptor
          logic is real, and only the claim on top of it is unproven.
        </p>
      </Section>

      <Section title="The pharmacology, plainly">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Chemically, mesterolone is <strong>1-alpha-methyl-dihydrotestosterone</strong>: DHT with a
          single methyl group added at the 1 position. That small change is what
          lets it survive a trip through the liver by mouth without the
          17-alpha-alkylation that makes most oral anabolic steroids
          hepatotoxic. Because it is already a 5-alpha-reduced molecule, it{" "}
          <strong>cannot aromatize</strong>{" "}to estrogen. It is a weak
          anabolic (nobody builds muscle on it) with DHT-like activity at the
          androgen receptor, and it binds{" "}
          <strong>sex hormone-binding globulin</strong>{" "}(SHBG) with unusually
          high affinity.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Four properties, then: oral, non-aromatizing, weak anabolic, strong
          SHBG binder. Hold onto them, because every claim the forums make about
          Proviron is an inference from one of those four.
        </p>
      </Section>

      <Section title="How it became folklore">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The Proviron story did not start in men&apos;s sexual health. It
          started on bodybuilding boards in the early 2000s, where the drug was
          a cycle accessory: cheap, mild, oral, and reputed to keep libido up
          while other compounds were suppressing it. The recurring line was
          that it made everything else &quot;work better&quot; and that
          erections got harder while it was in the stack. The
          &quot;on-cycle libido&quot; reputation was the seed. When those same
          men aged into testosterone therapy and into forums about erectile
          function, the reputation came with them.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Three arguments carried it, and each one is a real mechanism pushed
          past what the evidence can hold.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The SHBG argument
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              SHBG binds testosterone tightly, and only the unbound fraction is
              biologically active. Mesterolone binds SHBG harder than
              testosterone does, so the logic runs: occupy the SHBG, displace
              the testosterone, raise{" "}
              <Link href="/learn/read-your-labs">free testosterone</Link>{" "}
              without touching the total. It is true as far as it goes. The
              small uncontrolled study that measured it found total testosterone
              and SHBG both fell while the free fraction rose, and absolute free
              testosterone did not change. A ratio moved. Whether a moved ratio
              changes how a man feels or functions was never tested.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The DHT-and-genital-tissue argument
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              DHT binds the androgen receptor more strongly than testosterone,
              genital tissue is rich in 5-alpha reductase and runs on DHT, and
              desire is androgen-dependent. Put a DHT-like molecule in the blood
              and the tissue that matters should respond. The catch, per the
              endocrinology reviews, is that androgen-sensitive tissues
              regulate their own intracellular androgen levels and those
              levels track circulating DHT poorly. More in the blood is not
              automatically more at the receptor.
            </p>
          </div>
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
              The &quot;no estrogen&quot; argument
            </h3>
            <p className="sos-prose" style={{ fontSize: "16px" }}>
              Because it can&apos;t aromatize, Proviron was sold on the boards
              as a way to get androgen signal without estrogen side effects.
              That is a real property. It is also, as the DHT gel trials below
              show, a double-edged one: estrogen does jobs in men that nobody
              on the forums was counting.
            </p>
          </div>
        </div>
        <p className="sos-note" style={{ marginTop: "16px" }}>
          Notice the shape of all three. A verifiable property of the molecule,
          a plausible mechanism, and then a jump to &quot;better erections&quot;
          that no one measured. That jump is the whole underground.
        </p>
      </Section>

      <Section title="What the trials actually say">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Mesterolone was tested, in its era, for two things: hypogonadal
          symptoms and male infertility. Neither test went the way the folklore
          would predict.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Hypogonadism.</strong>{" "}The clearest head-to-head is a small
          1980 double-blind trial from Pisa comparing oral testosterone
          undecanoate with mesterolone in hypogonadal men, scoring sexual
          activity and mood. Testosterone won, and not narrowly: after four
          weeks, libido, erections, ejaculation, and mental state were all
          significantly better on testosterone than on mesterolone. In men who
          were actually androgen-deficient, the DHT derivative was the weaker
          replacement. There is a 2014 report from Turkey in which 34 men with
          aging-male symptoms took mesterolone for two months and scored better
          on symptom questionnaires, but it had no placebo arm and no control
          group, which puts it in the same evidence tier as the forums it is
          quoted on.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Infertility.</strong>{" "}This is where the drug got its biggest
          fair trial. In 1989 the World Health Organization&apos;s infertility
          task force ran a seven-centre, randomized, double-blind,
          placebo-controlled study of six months of mesterolone in 248 couples
          with idiopathic male-factor infertility. Pregnancy rates were 9% on
          placebo and 12% and 16% on the two mesterolone arms, with confidence
          intervals that comfortably included no effect, and semen quality did
          not differ between groups. A 1991 Belgian placebo-controlled trial
          found the same thing over twelve months: sperm motility and
          morphology improved on the drug, but they also improved on placebo,
          and the pregnancy rate was numerically lower in the treated group.
          The Cochrane review that pooled eleven androgen trials in 930 men
          concluded there was no evidence of benefit. The infertility
          indication faded on its evidence.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          <strong>Erectile function.</strong>{" "}Here the record is simply empty.
          There is no randomized trial of mesterolone for erectile dysfunction,
          none for erection quality in eugonadal men, and none in men already
          on testosterone therapy, which is the exact population the modern
          folklore targets. The drug has been legally available in Europe for
          nearly sixty years and nobody has run the study, which tells you how
          the people who could run it rate the prior.
        </p>
      </Section>

      <Section title="The closest real experiment: DHT gel">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          If you want to know what a DHT-axis androgen does to sexual function
          in older men when someone actually measures it, you don&apos;t need
          Proviron trials. Transdermal DHT gel has been through several
          placebo-controlled studies, and it is the same lever: a
          non-aromatizing androgen with DHT&apos;s receptor profile.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The best-known is the Finnish trial by Kunelius and colleagues,
          published in 2002: 120 men aged 50 to 70 with andropause symptoms,
          infrequent nocturnal erections, and low-normal testosterone or high
          SHBG, randomized to six months of DHT gel or placebo. The DHT group
          reported a{" "}
          <strong>transient improvement in early-morning erections at three
          months</strong>{" "}and a modest improvement in the ability to maintain
          an erection. General well-being did not differ from placebo. Lipids
          and prostate measures were unchanged, hematocrit rose, and, this is
          the part to hold onto, testosterone, LH, FSH, and estradiol all fell
          significantly. The DHT replaced the man&apos;s own axis rather than
          adding to it.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Then the Sydney group ran the long one: 114 healthy men over 50 on
          daily DHT gel or placebo for two full years, with 33 measures of
          sexual function and mood tracked throughout. DHT completely
          suppressed native testosterone and estradiol for the duration. The
          result on sexual function was{" "}
          <strong>nothing</strong>: no effect on any measure, except a small,
          reversible decrease in overall sexual desire. Spinal bone density
          fell, because estrogen protects bone in men and this androgen makes
          none.
        </p>
        <p className="sos-note">
          Read those two trials together and the picture of a DHT-axis androgen
          is clear. In androgen-deficient men, a little transient benefit on
          erections. In healthy men, no benefit, a slight cost to desire, a
          suppressed axis, and a bone signal. That is the honest expectation
          for the class mesterolone belongs to, and it is a long way from the
          forum version.
        </p>
      </Section>

      <Section title="The risk ledger">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Because mesterolone is mild and non-hepatotoxic, it acquired a
          reputation as the &quot;safe&quot; androgen. Mild is not the same as
          free, and the bill arrives in five places.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Suppression.</strong>{" "}Every exogenous androgen, including
          a weak one, feeds back on the hypothalamus and pituitary. The DHT gel
          trials above show the class effect in full: testosterone, LH, and FSH
          fall. For a man not on testosterone therapy, that means trading some
          of his own production for a weaker substitute. For a man trying to
          conceive, it means the WHO trial&apos;s null result is the good
          outcome; see{" "}
          <Link href="/learn/trt-fertility">testosterone and fertility</Link>{" "}
          for why any androgen and sperm production are in tension.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Hair and skin.</strong>{" "}This is a DHT molecule. Acne, body
          hair, and acceleration of male-pattern hair loss in men carrying the
          susceptibility are the documented androgenic effects, and hair loss
          from a DHT-axis drug does not reliably reverse.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Lipids and blood.</strong>{" "}Oral androgens as a class push
          HDL down. The transdermal DHT trials, interestingly, did not move
          lipids, but they did raise hemoglobin and hematocrit, and in the
          two-year study several men were withdrawn for hematocrit above the
          safety line. That is the same{" "}
          <Link href="/learn/trt-high-hematocrit">hematocrit problem</Link>{" "}
          testosterone therapy has to monitor for, arriving unmonitored.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Prostate.</strong>{" "}The DHT gel trials were reassuring on
          prostate volume and PSA, and the endocrinology reviews argue that
          circulating DHT and intraprostatic DHT are largely decoupled. That is
          genuinely good news for the class. It is also a finding from
          screened, monitored trial populations, and a man with an unknown
          prostate taking an unmonitored androgen is not in that population.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          <strong>Identity and purity.</strong>{" "}This is the risk that dwarfs
          the others, because it is not pharmacological. With no US channel,
          &quot;Proviron&quot; sold to an American buyer is whatever the
          underground lab or reseller put in the blister. Underdosed,
          mislabeled, or substituted product is the norm in unregulated
          androgen markets, and a substituted 17-alkylated oral would carry
          exactly the liver risk mesterolone is praised for lacking. The{" "}
          <Link href="/learn/product-forms">product-forms</Link>{" "}
          literacy applies here in full: no licensed pharmacy, no certificate
          worth the name, no way to know.
        </p>
      </Section>

      <Section title="The legal reality">
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          In the United States, mesterolone is listed by name in the federal
          definition of &quot;anabolic steroid&quot; at 21 U.S.C. 802(41), which
          makes it a <strong>Schedule III controlled substance</strong>{" "}under
          the Anabolic Steroids Control Act. Possession without a valid
          prescription is a federal offense, and since the drug is not
          FDA-approved, there is no US prescription to be had; a compounding
          pharmacy cannot lawfully make it either. That is different from
          compounded trimix or an off-label bremelanotide script, and the
          difference is the whole point of our{" "}
          <Link href="/methodology">drug-tier guardrail</Link>: for this
          compound, no legitimate channel exists, so we build no path to one.
        </p>
      </Section>

      <Section title="The honest bridge">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Strip the folklore down and what remains is a real question wearing a
          gray-market answer. The men who swear by Proviron are almost always
          describing one of two things: low desire and soft erections with
          androgen levels they have never had properly measured, or a
          testosterone protocol that is not quite dialed in. Both are{" "}
          <strong>lab questions</strong>, and both are answerable inside the
          legal channel by someone qualified to read the result.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The SHBG argument, in particular, is a good argument for a blood
          test, not for a drug. If you suspect high SHBG is hiding a low free
          fraction, that is a hypothesis a morning total testosterone, SHBG,
          and albumin can confirm or kill. Run the numbers through the{" "}
          <Link href="/tools/free-testosterone">free testosterone
          calculator</Link>, learn to{" "}
          <Link href="/learn/read-your-labs">read the panel</Link>, and take it
          to a clinician. If the free fraction is genuinely low, that is what{" "}
          <Link href="/learn/testosterone-therapy">supervised testosterone
          therapy</Link>{" "}exists for, with the monitoring the risk ledger
          above demands. If it is not, the problem is somewhere else in the{" "}
          <Link href="/learn/ed-workup">workup</Link>, and no androgen was going
          to fix it.
        </p>
        <p className="sos-note">
          We are bullish on androgen physiology. The receptor biology the forums
          reasoned from is real, and the DHT gel trials are a genuinely
          interesting piece of endocrinology. We are sceptical of the page: a
          sixty-year-old drug with two failed indications, an empty record on
          erectile function, and a class comparator that shows no benefit in
          healthy men. When the mechanism is that good and the trial has still
          never been run, the smart move is to measure your own numbers first.
        </p>
      </Section>

      <Section title="The bottom line">
        <p className="sos-prose">
          Mesterolone is a real legacy androgen with well-understood
          pharmacology: oral, non-aromatizing, weakly anabolic, and a strong
          SHBG binder. Its two approved-era indications tested weak or null.
          Its erectile-function reputation rests entirely on first-person
          reports, and the closest controlled evidence for its class, the DHT
          gel trials, shows at most a transient effect in androgen-deficient
          men and nothing in healthy ones. In the US it is Schedule III with no
          legal supply. If the signal it points to is yours, low desire or
          erection quality that PDE5 inhibitors don&apos;t address, the move
          that actually pays is a lab draw and a{" "}
          <Link href="/learn/urologist-visit">clinician who can read it</Link>.
          The underground had the question right. It just never had the
          answer.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://en.wikipedia.org/wiki/Mesterolone" target="_blank" rel="noopener noreferrer">mesterolone history, approvals, and pharmacology</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/7000879/" target="_blank" rel="noopener noreferrer">Luisi &amp; Franchi 1980, double-blind testosterone undecanoate vs mesterolone in hypogonadal men</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/25842579/" target="_blank" rel="noopener noreferrer">Dugeroglu et al. 2014, uncontrolled mesterolone series in aging-male syndrome</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/2680994/" target="_blank" rel="noopener noreferrer">WHO Task Force 1989, mesterolone and idiopathic male infertility (double-blind RCT)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/1900485/" target="_blank" rel="noopener noreferrer">Gerris et al. 1991, placebo-controlled trial of high-dose mesterolone in male infertility</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/10796496/" target="_blank" rel="noopener noreferrer">Cochrane review, androgens vs placebo for idiopathic oligo/asthenospermia</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11932266/" target="_blank" rel="noopener noreferrer">Kunelius et al. 2002, transdermal DHT in the aging male (randomized, double-blind)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/24751323/" target="_blank" rel="noopener noreferrer">Sartorius, Ly &amp; Handelsman 2014, 24-month placebo-controlled DHT trial in healthy older men</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6459338/" target="_blank" rel="noopener noreferrer">Swerdloff et al. 2017, Endocrine Reviews: DHT biochemistry, physiology, and clinical implications</a>; and{" "}
          <a href="https://uscode.house.gov/view.xhtml?req=granuleid%3AUSC-prelim-title21-section802&num=0&edition=prelim" target="_blank" rel="noopener noreferrer">21 U.S.C. 802(41), the federal anabolic steroid definition listing mesterolone</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a treatment protocol.
          Mesterolone is not FDA-approved and is a Schedule III controlled
          substance in the United States; this page describes a market and its
          evidence, and deliberately publishes no dose, cycle, or source.
          Androgen evaluation, treatment, and monitoring belong with a licensed
          clinician who knows your history and your labs.
        </p>
      </div>
      <Faq slug="proviron-underground" />
      <RelatedArticles slug="proviron-underground" />
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
