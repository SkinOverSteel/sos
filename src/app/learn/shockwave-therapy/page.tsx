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
  title: "Shockwave therapy: the regenerative promise, graded",
  description:
    "Low-intensity shockwave therapy (LiSWT) for erectile dysfunction: what it does to the tissue, what the sham-controlled trials and meta-analyses found (a few IIEF points, mostly in mild vascular ED), how long it lasts, why guidelines call it investigational, the focused-versus-radial device problem, and who it might genuinely help.",
  alternates: { canonical: "/learn/shockwave-therapy" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Shockwave therapy: the regenerative promise, graded",
  url: `${SITE.url}/learn/shockwave-therapy`,
  description:
    "Low-intensity extracorporeal shockwave therapy for vasculogenic erectile dysfunction: proposed mechanism, sham-controlled randomized trial evidence, meta-analysis effect sizes, durability, guideline status, device differences between focused and radial units, cost, and use in Peyronie's disease.",
  about: {
    "@type": "MedicalTherapy",
    name: "Low-intensity extracorporeal shockwave therapy",
    alternateName: ["LiSWT", "Li-ESWT"],
  },
  mentions: [
    { "@type": "MedicalCondition", name: "Erectile dysfunction" },
    { "@type": "MedicalCondition", name: "Peyronie's disease" },
  ],
  audience: { "@type": "Patient" },
};

export default function ShockwaveTherapyPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "shockwave-therapy")} />
      <Breadcrumbs slug="shockwave-therapy" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Shockwave therapy: the regenerative promise, graded
      </h1>
      <ArticleMeta slug="shockwave-therapy" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Every other treatment for erectile dysfunction is a workaround. Pills
        amplify a signal, injections replace it, an implant makes it moot.
        Shockwave therapy is the first thing to arrive with a different claim:
        that a few sessions of sound energy can make the tissue itself grow
        new blood vessels and get <em>better</em>. That is a genuinely exciting
        idea, it has real trials behind it, and it has also become the most
        aggressively marketed procedure in men&apos;s health, sold under brand
        names in strip-mall clinics for thousands of dollars cash. Both things
        are true at once. Here is how to hold them.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What it is, and what it is supposed to do
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Low-intensity extracorporeal shockwave therapy</strong>{" "}
          (LiSWT) uses a handheld probe to deliver acoustic pressure pulses
          through the skin into the erectile chambers, at a small fraction of
          the energy used to shatter kidney stones. A typical protocol from
          the trials is six to twelve sessions over a few weeks, a few hundred
          to a few thousand pulses per session, applied along the shaft and at
          the crura where the chambers anchor to the pelvis. It does not hurt
          much; most men describe a tapping sensation.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The proposed mechanism comes from orthopedics and cardiology, where
          shockwave has a longer history. Mechanical stress on tissue triggers
          a repair response: release of growth factors, recruitment of
          progenitor cells, new capillary formation, and in animal models of
          diabetic and nerve-injured erectile tissue, regrowth of smooth muscle
          and nerve fibers. That is the <strong>regenerative</strong>{" "}
          claim, and in rats it is well supported. The question is what
          happens in a fifty-eight-year-old man with twenty years of
          endothelial wear, and that is where the trials come in.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the trials found
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The modern story starts in Haifa. A 2010 pilot was followed by the
          first randomized, double-blind, sham-controlled trial in 2012, and
          the numbers from it are the ones still quoted:
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
              <b>Shockwave</b> · 2012 sham-controlled trial
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Erectile function score rose by a mean of <strong>6.7 points</strong>{" "}
              on the 30-point IIEF-EF scale. Nineteen men who could not achieve
              a penetration-hard erection at baseline could afterward. Measured
              penile blood flow improved. No adverse events.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Sham probe</b> · same trial
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Score rose by a mean of <strong>3.0 points</strong>. Nobody
              crossed the penetration threshold. Blood flow did not change.
              The placebo response in ED trials is large, and this is what
              it looks like.
            </p>
          </div>
        </div>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The difference is real and it is smaller than it first reads. The
          minimum change on that scale that a man can actually feel is about
          four points; the treatment-versus-sham gap here is under that. Later
          trials sharpened the picture:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>PDE5 non-responders</strong>{" "}(2016, 58 men, sham-controlled):
            after shockwave, 54% could achieve a penetration-hard erection on
            their pill again, versus none in the sham group. This is the
            strongest single result in the field: not a cure, but converting a
            man for whom{" "}
            <Link href="/learn/pde5-lineup">tadalafil</Link>{" "}had stopped working
            back into one for whom it works.
          </li>
          <li>
            <strong>A second non-responder trial</strong>{" "}(2021, 76 men,
            electromagnetic device): 52% versus 28% with a functional erection
            at six months. Positive, modest, consistent with the first.
          </li>
          <li>
            <strong>Negative trials exist.</strong>{" "}A Scandinavian
            sham-controlled trial found no benefit, and a 2023 sham-controlled
            trial in moderate ED was likewise unconvincing. Publication bias is
            a live concern in a field where most trials are small and many are
            run by device makers or enthusiasts.
          </li>
          <li>
            <strong>Meta-analyses</strong>{" "}land where you would expect. The
            2017 European Urology pooled analysis of 14 studies and 833 men
            found a mean IIEF gain of <strong>2.0 points</strong>{" "}over
            control; a 2019 analysis of sham-controlled trials only, 873 men,
            found <strong>4.0 points</strong>{" "}and a fourfold higher odds of
            reaching a usable erection hardness. Both note the benefit
            concentrates in <strong>mild to moderate vascular ED</strong>{" "}
            and thins out in severe disease and diabetes.
          </li>
        </ul>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          How long it lasts
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The best durability data come from the same Haifa group following
          156 treated men for two years. Roughly <strong>two-thirds</strong>{" "}
          responded initially. Of those responders, about{" "}
          <strong>half still had the benefit at two years</strong>. The split
          was not random: men with milder ED and no diabetes had about a
          three-in-four chance of holding their gains, while every diabetic
          man with severe ED at baseline had lost his. Read that as a
          selection rule. Shockwave appears to help tissue that still has
          something to work with, and to wash out where the disease has
          already won.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          Retreatment after the effect fades has been reported, and clinics
          sell &ldquo;maintenance&rdquo; sessions on that basis, but there is
          no controlled evidence yet on whether a second course repeats the
          first.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Why the guidelines still say investigational
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The American Urological Association guideline classifies
          low-intensity shockwave as investigational. The Sexual Medicine
          Society of North America, in a 2021 position statement covering
          shockwave, platelet-rich plasma, and stem cells together, found an
          absence of robust data and said these restorative therapies should
          be offered inside clinical trials, or with explicit informed
          consent that the evidence is preliminary. The European guideline is
          a shade warmer and allows it as an option in mild vascular ED. None
          of them recommend it as first-line, and none of them say it is a
          scam. The honest reading is: <strong>a real, small, selective
          effect that has not yet been pinned down well enough to
          standardize</strong>.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The standardization problem is concrete. Trials differ on energy
          density, pulse count, session number, spacing, treatment sites, and
          device type, and nobody knows which of those matter. That makes it
          impossible to say &ldquo;shockwave works&rdquo; the way one can say
          &ldquo;tadalafil works,&rdquo; because there is no single thing
          called shockwave being tested.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The device problem, and the clinic problem
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          This is the part to take into the consultation. The positive trials
          used <strong>focused</strong>{" "}shockwave units: electrohydraulic,
          electromagnetic, or piezoelectric generators that converge a true
          shockwave at a set depth in the tissue. A large share of what is
          sold in the US under names like GAINSWave and &ldquo;acoustic
          wave therapy&rdquo; is delivered with{" "}
          <strong>radial pressure wave</strong>{" "}devices, which use a
          pneumatic hammer to make a slower, unfocused pulse that dissipates
          at the surface. They are cheaper, they are cleared for
          musculoskeletal pain, and they are physically not the thing that was
          tested. There are small studies of radial devices for ED, and some
          are positive, but the evidence base above does not transfer to them
          automatically.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Then the money. A course in the US commonly runs{" "}
          <strong>$2,000 to $6,000</strong>, cash, because nothing
          investigational is covered. That price is set by what men will pay
          for the word &ldquo;cure,&rdquo; not by the cost of running a
          machine, and it is the reason the treatment is so heavily marketed.
          Franchise clinics, chiropractors, and med-spas offer it alongside
          IV drips and testosterone pellets; some pair it with a
          platelet-rich plasma injection as a package. None of that is
          illegal, and at these energies it is very unlikely to hurt you. The
          risk is the <strong>opportunity cost</strong>: a man who spends
          four thousand dollars on sessions has often skipped the{" "}
          <Link href="/learn/ed-workup">workup</Link>{" "}that would have found
          the blood pressure, the glucose, or the low testosterone that was
          the actual problem, and that a{" "}
          <Link href="/learn/generic-pde5-value">ten-dollar generic</Link>{" "}
          would have treated in the meantime.
        </p>
        <p className="sos-note">
          Questions that sort a serious provider from a franchise: Is the
          device focused or radial, and which model? What energy density and
          pulse count, and which published protocol is it based on? Is it a
          urologist or sexual-medicine physician supervising? Will you do a
          workup first, or have I already had one? What happens if it does
          not work at three months?
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Who it might genuinely help
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Take the evidence at face value and a candidate emerges:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Mild to moderate vascular ED</strong>, diagnosed as such,
            with the cardiometabolic causes already being treated. This is
            where every meta-analysis puts the effect.
          </li>
          <li>
            <strong>A man whose pills have stopped working</strong>{" "}and who
            wants to try to get them working again before moving to{" "}
            <Link href="/learn/penile-injections">injections</Link>. The
            non-responder trials are the strongest case for the treatment.
          </li>
          <li>
            <strong>A man who wants a drug-free option</strong>{" "}and
            understands the trade: a modest, uncertain, time-limited gain,
            with essentially no physical risk, at a price that is entirely his.
          </li>
          <li>
            <strong>Inside a clinical trial</strong>, which is where the
            guideline societies would prefer to see it, and where it is often
            free.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px" }}>
          And where it has been tested and lost: after prostatectomy, where a
          randomized trial adding shockwave to early tadalafil found{" "}
          <Link href="/learn/post-prostatectomy-rehabilitation">no difference</Link>;
          in severe diabetic ED, where the two-year data show it washing out;
          and for <Link href="/learn/peyronies-disease">Peyronie&apos;s</Link>{" "}
          curvature, where a placebo-controlled trial found it relieved pain
          but did nothing to the bend.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Shockwave therapy is the first ED treatment built on the idea of
          repair, and the idea is not wrong: sham-controlled trials show a
          real, modest gain, concentrated in mild vascular disease, that lasts
          a year or two in about half the men who respond. It is also
          investigational, unstandardized, uncovered, and frequently sold with
          a different machine than the one that was studied. If you are the
          candidate the trials describe and you go in with the numbers above,
          it is a defensible experiment on yourself, with the workup done first
          and a urologist in the loop. If you are being sold a cure, the
          evidence for that does not exist yet. The frontier is real and it is
          worth watching; the trick is to arrive at it as the man the trials
          were about.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA/SMSNA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/34000480/" target="_blank" rel="noopener noreferrer">SMSNA position statement on restorative therapies, Sex Med 2021</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/22425129/" target="_blank" rel="noopener noreferrer">Vardi et al., sham-controlled trial, J Urol 2012</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/26694904/" target="_blank" rel="noopener noreferrer">Kitrey et al., PDE5 non-responders, J Urol 2016</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/29477719/" target="_blank" rel="noopener noreferrer">Kitrey et al., two-year durability, J Urol 2018</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/32696128/" target="_blank" rel="noopener noreferrer">Vinay et al., PDE5-refractory sham-controlled trial, World J Urol 2021</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/27321373/" target="_blank" rel="noopener noreferrer">Lu et al., systematic review and meta-analysis, Eur Urol 2017</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/30664671/" target="_blank" rel="noopener noreferrer">Sokolakis &amp; Hatzichristodoulou, meta-analysis of sham-controlled trials, Int J Impot Res 2019</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/32007430/" target="_blank" rel="noopener noreferrer">Baccaglini et al., shockwave after prostatectomy, J Sex Med 2020</a>; and{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/19473751/" target="_blank" rel="noopener noreferrer">Palmieri et al., shockwave in Peyronie&apos;s disease, Eur Urol 2009</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice. Whether shockwave is
          appropriate for you, and with which device and protocol, is a
          decision for a urologist or sexual-medicine physician after a proper
          evaluation of the cause of your erectile dysfunction. Costs quoted
          are typical US cash prices and vary by market.
        </p>
      </div>

      <Faq slug="shockwave-therapy" />
      <RelatedArticles slug="shockwave-therapy" />
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
