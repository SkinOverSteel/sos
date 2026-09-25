import type { Metadata } from "next";
import { MorseSOS } from "@/components/MorseSOS";
import Link from "next/link";
import { ArticleMeta } from "@/components/ArticleMeta";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { EvidenceBadge } from "@/components/EvidenceBadge";
import { withReview } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "After prostatectomy: rebuilding the erection",
  description:
    "Why erections vanish after prostate surgery, what penile rehabilitation actually protects (tissue, not the timetable), what the tadalafil, vacuum, and injection trials showed, a deep dive into pelvic floor muscle training, and the emerging science from NeuroSAFE to stem cells.",
  alternates: { canonical: "/learn/post-prostatectomy-rehabilitation" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "After prostatectomy: rebuilding the erection",
  url: `${SITE.url}/learn/post-prostatectomy-rehabilitation`,
  description:
    "Penile rehabilitation after radical prostatectomy: neuropraxia and cavernosal hypoxia, evidence for PDE5 inhibitors, vacuum erection devices and intracavernosal injections, pelvic floor muscle training for erectile function, continence and climacturia, and emerging approaches including NeuroSAFE, stem cells, nerve grafts and shockwave therapy.",
  about: { "@type": "MedicalTherapy", name: "Penile rehabilitation after radical prostatectomy" },
  mentions: [
    { "@type": "MedicalCondition", name: "Erectile dysfunction" },
    { "@type": "MedicalProcedure", name: "Radical prostatectomy" },
    { "@type": "MedicalTherapy", name: "Pelvic floor muscle training" },
  ],
  audience: { "@type": "Patient" },
};

export default function PostProstatectomyRehabilitationPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "post-prostatectomy-rehabilitation")} />
      <Breadcrumbs slug="post-prostatectomy-rehabilitation" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        After prostatectomy: rebuilding the erection
      </h1>
      <ArticleMeta slug="post-prostatectomy-rehabilitation" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The surgeon said the nerves were spared. Then the catheter came out,
        and nothing. Weeks of nothing, then months. Nobody warned you that
        &ldquo;nerve-sparing&rdquo; means <em>the nerves are still there</em>,
        not <em>the nerves still work</em>, and that the gap between those two
        sentences is a year or two of your life. This is the piece that fills
        that gap: what actually happened to the erection, what
        rehabilitation can and cannot do about it, why the pelvic floor is the
        most underused tool in the whole program, and what the next decade of
        science is bringing. The frontier here is moving, and it is moving in
        your favor.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the surgery did
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The nerves that trigger an erection run in two bundles pressed
          against the back and sides of the prostate, wrapped in the same
          fascia. Removing the prostate means peeling them off a tumor without
          cutting them, and even a perfect dissection stretches, heats, and
          bruises them. The result is <strong>neuropraxia</strong>: intact
          nerves that have stopped conducting. They recover, slowly, at the
          pace nerves regrow, which is why the honest timetable for unassisted
          erections is <strong>twelve to twenty-four months</strong>{" "}and
          why the first three months tell you almost nothing.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The second problem is what happens to the tissue while it waits. A
          healthy penis fills several times a night during sleep, and those
          nocturnal erections are how the erectile chambers get their oxygen.
          Silence the nerves and the chambers sit flaccid and underperfused
          for months. Hypoxic smooth muscle dies and is replaced with collagen,
          the sheath stiffens, the veins that should clamp shut during an
          erection stop sealing, and the penis measurably shrinks, typically
          one to two centimeters in the first six months. This is the part the
          nerves cannot undo when they wake up: a scarred chamber that leaks
          will not hold an erection no matter how good the signal.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          That is the whole logic of <strong>penile rehabilitation</strong>.
          You cannot hurry the nerves. You can keep the tissue alive,
          oxygenated, and stretched so that there is something worth
          reconnecting to when they return. Everything below is a way of doing
          that.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          What the rehabilitation trials actually showed
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The idea was born in a 1997 trial of thirty men: those given
          alprostadil injections three times a week starting a month after
          surgery recovered spontaneous erections far more often than those
          left alone. It was small and it was unblinded, but it launched a
          field. What came after is more sobering and more useful:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Nightly sildenafil</strong>{" "}(2008, 76 men, placebo-controlled):
            27% of the treated group reported the return of unassisted
            erections at a year, versus 4% on placebo. Encouraging, but the
            study was stopped early and the numbers are small.
          </li>
          <li>
            <strong>Nightly versus on-demand vardenafil</strong>{" "}(2008, 628 men,
            the REINVENT trial): on-demand use was as good as or better than a
            nightly dose while men were taking it, and after a two-month
            washout, neither beat placebo on unassisted function. The nightly
            dogma took its first real hit here.
          </li>
          <li>
            <strong>Daily tadalafil</strong>{" "}(2014, 423 men, the REACTT trial):
            daily 5 mg gave better erections than placebo during the nine
            months of treatment and, notably, <strong>reduced penile length
            loss</strong>{" "}by about 4 mm. After a six-week washout, unassisted
            recovery was the same in all three groups, roughly one in five.
          </li>
          <li>
            <strong>Early vacuum device</strong>{" "}(2007, 28 men): starting daily
            vacuum use one month after surgery, rather than six, preserved
            length and improved erectile scores at every follow-up.
          </li>
        </ul>
        <p className="sos-prose" style={{ fontSize: "16px", marginTop: "16px", marginBottom: "12px" }}>
          Put together, the pattern is consistent. PDE5 inhibitors and vacuum
          devices <strong>protect the tissue</strong>: less shrinkage, better
          assisted erections, a penis that is still structurally sound when
          the nerves return. What they have not been shown to do is{" "}
          <strong>accelerate the nerves</strong>. That distinction is why the
          AUA/SMSNA guideline says clinicians should inform men about
          rehabilitation while calling the evidence for any specific protocol
          limited, and why a good program is framed as preservation rather
          than a countdown to a fixed date.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          In practice, most programs combine the tools. A daily low-dose or
          on-demand <Link href="/learn/pde5-lineup">PDE5 inhibitor</Link>{" "}from
          the first weeks, a vacuum device used for a few minutes daily
          without the constriction ring to stretch and perfuse the chambers,
          and, if pills produce nothing by around three months,{" "}
          <Link href="/learn/penile-injections">intracavernosal injections</Link>{" "}
          that bypass the nerves entirely and produce a full erection on
          demand. Injections are the most reliable tool in the box precisely
          because they do not need a nerve signal, and the{" "}
          <Link href="/learn/priapism-clock">four-hour rule</Link>{" "}applies to
          them exactly as it does outside of rehabilitation.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The pelvic floor: the deep dive
        </h2>
        <p className="sos-kicker" style={{ marginBottom: "16px" }}>
          Continence, climacturia, and rigidity from one set of muscles
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Most men are handed a pelvic floor leaflet for the leaking and
          never told the same muscles are part of the erection. They are. Two
          striated muscles sit at the root of the penis, under conscious
          control like any skeletal muscle. The{" "}
          <strong>ischiocavernosus</strong>{" "}wraps each crus, the buried leg of
          each erectile chamber, and when it contracts it squeezes the crura
          and pushes intracavernosal pressure well above what blood pressure
          alone can supply. That is what converts a full erection into a rigid
          one. The <strong>bulbospongiosus</strong>{" "}wraps the bulb of the
          urethra and the deep dorsal vein; contracting it helps trap blood in
          the shaft and drives ejaculation. Weak or poorly coordinated, these
          muscles let blood escape, which reads clinically as{" "}
          <strong>venous leak</strong>. After a prostatectomy they have also
          just lost the internal sphincter they used to share the work with,
          which is why they matter twice.
        </p>

        <h3 className="sos-h2" style={{ fontSize: "17px", textTransform: "none", margin: "24px 0 12px" }}>
          What the trials found
        </h3>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>After prostatectomy, for erections.</strong>{" "}A 2012
            randomized trial in Brazil started biofeedback-guided pelvic floor
            training fifteen days after catheter removal. At twelve months,{" "}
            <strong>47% of the trained group were potent versus 12.5% of
            controls</strong>{" "}who got verbal instructions only. Fifty-two men,
            so treat the size of the effect with care, but a number needed to
            treat of three is hard to ignore. The same trial found continence
            status was the strongest predictor of erectile recovery, which
            fits: the muscles that hold urine are the muscles that hold blood.
          </li>
          <li>
            <strong>After prostatectomy, for climacturia.</strong>{" "}Leaking
            urine at orgasm affects a fifth to a third of men after surgery
            and is rarely mentioned in advance. A 2016 Belgian randomized trial
            in men with persistent erectile dysfunction a year after surgery
            found three months of pelvic floor training improved erectile
            scores and reduced climacturia compared with waiting.
          </li>
          <li>
            <strong>For erectile dysfunction in general.</strong>{" "}The
            foundational 2005 UK trial randomized 55 men with erectile
            dysfunction, not surgical patients, to pelvic floor training plus
            lifestyle advice versus advice alone. At six months,{" "}
            <strong>40% had regained normal erectile function and another 35%
            had improved</strong>. The authors argued it should be first-line,
            and two decades later it is still under-prescribed.
          </li>
          <li>
            <strong>For continence.</strong>{" "}Guidelines recommend training
            before and after surgery to shorten the leaking phase. Meta-analyses
            disagree on how large the benefit is, but the direction is
            consistent and the downside is nil.
          </li>
        </ul>

        <h3 className="sos-h2" style={{ fontSize: "17px", textTransform: "none", margin: "24px 0 12px" }}>
          How the training actually works
        </h3>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          The reason leaflets underperform trials is that the trials used a{" "}
          <strong>pelvic floor physiotherapist</strong>, and the difference is
          not motivation, it is targeting. Most men asked to &ldquo;do a
          Kegel&rdquo; clench the buttocks, bear down with the abdomen, or
          hold their breath, all of which train the wrong thing and can
          worsen leaking. What a good program looks like, as literacy so you
          can recognize one:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Finding the muscle.</strong>{" "}The cues that work are
            &ldquo;shorten the penis&rdquo; and &ldquo;lift the testicles,&rdquo;
            not &ldquo;stop the flow.&rdquo; A physiotherapist confirms it with
            real-time ultrasound on the lower abdomen, so you can watch the
            base of the bladder lift, or with a fingertip on the perineum.
            Biofeedback is what the positive trials used.
          </li>
          <li>
            <strong>Two kinds of contraction.</strong>{" "}Fast, maximal squeezes
            train the reflex that catches a cough or a leak. Slow holds of
            several seconds build the endurance that keeps an erection rigid.
            Programs use both, in sets, several times a day, with full
            relaxation between reps because a muscle that cannot relax cannot
            contract well either.
          </li>
          <li>
            <strong>Positions and progression.</strong>{" "}Lying first, then
            sitting, standing, and eventually during movement and during
            erection itself, where the ischiocavernosus can be felt to add
            rigidity. Higher-volume programs, on the order of a hundred-plus
            contractions a day in the first weeks, have recovered continence
            faster in trials than gentler ones.
          </li>
          <li>
            <strong>Start before surgery when possible.</strong>{" "}Learning the
            contraction while the anatomy is intact and pain-free is far
            easier than learning it with a fresh wound. Several weeks of
            prehab is the norm in centers that take this seriously.
          </li>
          <li>
            <strong>Weeks, not days.</strong>{" "}Continence gains show inside a
            few weeks. Erectile gains lag by months, in line with the trials
            above, and they compound with the tissue-protection tools rather
            than replacing them.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Ask your surgeon for a referral to a pelvic floor physiotherapist who
          treats men; the specialty exists and it is not the same as a general
          physio. Insurance coverage for post-prostatectomy pelvic floor
          rehabilitation is common in the US when a urologist orders it.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          The frontier
        </h2>
        <p style={{ marginBottom: "16px" }}>
          <EvidenceBadge grade="emerging" />
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "20px" }}>
          This is the section that gets rewritten most often, because the
          science here is arriving fast. Everything below is real research,
          graded honestly:
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "14px",
          }}
        >
          <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>NeuroSAFE</b> · sparing more nerve, safely
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              The biggest lever turns out to be in the operating room. In
              NeuroSAFE, a pathologist examines frozen sections of the
              prostate surface <em>during</em>{" "}the operation, so the surgeon
              can spare the full nerve bundle and only resect it where cancer
              actually reaches the margin. The 2025 NeuroSAFE PROOF
              randomized trial of 381 men found a mean erectile-function
              score of 12.7 versus 9.7 at twelve months, better early
              continence, and no added serious harm. The gain was largest in
              men who would otherwise not have had nerve-sparing at all. Ask
              whether your center offers it.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Stem cells</b> · phase 1, and a clue
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              A 2016 Danish phase 1 trial injected men&apos;s own
              fat-derived regenerative cells into the penis after failed
              recovery. It was safe, and eight of seventeen men recovered
              enough function for intercourse, but the responders were all
              continent; incontinent men did not improve. The signal is
              real and the continence link keeps reappearing. Larger
              placebo-controlled trials are underway; anything sold today as
              a stem cell cure is ahead of its evidence.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Nerve grafts and wraps</b> · surgical
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Sural nerve grafts to bridge a resected bundle produced mixed
              results and have mostly faded. The newer idea is a dehydrated
              amniotic membrane laid over the spared bundles as an
              anti-inflammatory scaffold; retrospective series report earlier
              return of erections and continence, and randomized trials are
              recruiting. Promising, unproven, and not something you can add
              after the fact.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Shockwave therapy</b> · tested, and it lost
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              Low-intensity shockwave is marketed hard for post-surgical
              recovery. The one randomized trial that tested it in this
              setting, 92 men given early tadalafil with or without eight
              weeks of shockwave, found no difference in recovery. Its
              evidence in mild vascular ED is modest and separate; in the
              post-prostatectomy penis it has not earned a place yet.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>Hyperbaric oxygen</b> · negative so far
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              The hypoxia story makes oxygen chambers sound logical, and
              animal data were encouraging. The small randomized human trial
              did not show benefit. Filed under &ldquo;good idea, did not
              survive contact&rdquo; unless larger studies say otherwise.
            </p>
          </div>
          <div className="sos-card">
            <p className="sos-kicker" style={{ marginBottom: "10px" }}>
              <b>The reliable endpoint</b> · the implant
            </p>
            <p className="sos-prose" style={{ fontSize: "15.5px" }}>
              If eighteen to twenty-four months pass without meaningful
              recovery, an inflatable penile prosthesis is not a failure of
              rehabilitation, it is the treatment with the highest
              satisfaction rates in the whole field. Rehabilitation done well
              keeps the chambers healthy enough to make that surgery easier
              and the result better. It is a floor, not a cliff.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The things nobody mentions
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Orgasm survives the surgery, and it is dry: no prostate, no seminal
          vesicles, no ejaculate. Some men find it more intense, some less,
          and some notice pain with orgasm in the early months that usually
          fades. Climacturia, covered above, is common, embarrassing, and
          trainable. The penis is often shorter, and rehabilitation exists
          largely to limit that. Peyronie&apos;s-type curvature can appear in
          the year after surgery in a minority of men, and it is treated the
          same way as any other{" "}
          <Link href="/learn/peyronies-disease">Peyronie&apos;s</Link>, once
          stable.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          And the relationship. The men who do best in every follow-up study
          are the ones who kept having sex, assisted and imperfect, through
          the recovery, rather than waiting for the erection to come back on
          its own before trying. Partners who are told the plan become part
          of it. A sexual-medicine clinician or sex therapist attached to the
          cancer center is not a luxury add-on; it is the part of the program
          that keeps the rest of it happening.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          Erections after prostatectomy come back on the nerves&apos;
          schedule, which is slow, and only to tissue that has been kept
          alive in the meantime. Rehabilitation is{" "}
          <strong>preservation</strong>: a PDE5 inhibitor, a vacuum device,
          injections if needed, all started early, none of them proven to hurry
          the nerves and all of them protecting what the nerves will need.
          The <strong>pelvic floor</strong>{" "}is the piece most programs
          underweight and the one with the widest payoff, from continence to
          rigidity, provided it is taught properly. The frontier is genuinely
          moving, with NeuroSAFE already changing what happens in the
          operating room and regenerative approaches behind it. Ask for the
          whole program, start it early, and bring your{" "}
          <Link href="/learn/urologist-visit">urologist</Link>{" "}a plan, not a
          hope.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.auanet.org/guidelines-and-quality/guidelines/erectile-dysfunction-(ed)-guideline" target="_blank" rel="noopener noreferrer">AUA/SMSNA Erectile Dysfunction Guideline</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/9302132/" target="_blank" rel="noopener noreferrer">Montorsi et al., early alprostadil after prostatectomy, J Urol 1997</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/18650827/" target="_blank" rel="noopener noreferrer">Padma-Nathan et al., nightly sildenafil, Int J Impot Res 2008</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/18640769/" target="_blank" rel="noopener noreferrer">Montorsi et al., REINVENT, Eur Urol 2008</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/24169081/" target="_blank" rel="noopener noreferrer">Montorsi et al., REACTT, Eur Urol 2014</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/17822466/" target="_blank" rel="noopener noreferrer">Köhler et al., early vacuum device, BJU Int 2007</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/22573231/" target="_blank" rel="noopener noreferrer">Prota et al., early pelvic floor biofeedback, Int J Impot Res 2012</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/26538105/" target="_blank" rel="noopener noreferrer">Geraerts et al., pelvic floor training for ED and climacturia, Int J Impot Res 2016</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/16104916/" target="_blank" rel="noopener noreferrer">Dorey et al., pelvic floor exercises for ED, BJU Int 2005</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/40147459/" target="_blank" rel="noopener noreferrer">Dinneen et al., NeuroSAFE PROOF, Lancet Oncol 2025</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/27077129/" target="_blank" rel="noopener noreferrer">Haahr et al., adipose-derived regenerative cells, EBioMedicine 2016</a>; and{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/32007430/" target="_blank" rel="noopener noreferrer">Baccaglini et al., shockwave after prostatectomy, J Sex Med 2020</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice. Rehabilitation protocols,
          drug choices, and timing are set by your surgical and sexual-medicine
          team, who know your cancer, your nerve-sparing status, and your
          history. Pelvic floor technique is best learned from a physiotherapist
          who treats men; the description here is to help you recognize good
          instruction, not replace it.
        </p>
      </div>

      <Faq slug="post-prostatectomy-rehabilitation" />
      <RelatedArticles slug="post-prostatectomy-rehabilitation" />
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
