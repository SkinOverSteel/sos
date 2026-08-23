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
  title: "TRT and fertility, without the panic",
  description:
    "Does testosterone therapy make you infertile? Mostly not a real problem: TRT suppresses sperm while you're on it, but the effect is usually reversible and often preventable with hCG or enclomiphene. The honest, non-alarmist picture.",
  alternates: { canonical: "/learn/trt-fertility" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "TRT and fertility, without the panic",
  url: `${SITE.url}/learn/trt-fertility`,
  description:
    "How testosterone replacement therapy affects male fertility: HPG-axis suppression of sperm production, its reversibility after stopping, and fertility-preserving options such as hCG and enclomiphene.",
  about: { "@type": "MedicalCondition", name: "Male infertility" },
  audience: { "@type": "Patient" },
};

export default function TrtFertilityPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "trt-fertility")} />
      <Breadcrumbs slug="trt-fertility" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        TRT and fertility, without the panic
      </h1>
      <ArticleMeta slug="trt-fertility" />

      <MorseSOS style={{ margin: "34px 0" }} />

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        The fear is blunt: testosterone therapy makes you sterile, full stop. The
        reality is calmer. Yes — straight TRT turns sperm production down while
        you&apos;re on it. But for <strong>most men it never becomes a real
        problem</strong>: they aren&apos;t trying to conceive, the effect is
        usually reversible, and when it matters it&apos;s often preventable. Here
        is the honest version — reassuring where it should be, and straight where
        it counts, which is exactly one place.
      </p>

      <section>
        <h2 className="sos-h2" style={{ marginBottom: "6px" }}>
          Why it happens — and why it usually undoes itself
        </h2>
        <p className="sos-note" style={{ marginBottom: "22px" }}>
          The same feedback loop that lowers sperm is the one that restores it.
        </p>
        <div className="sos-steps">
          <div className="sos-steps__rail" aria-hidden="true" />

          <div className="sos-step">
            <div className="sos-step__num">1</div>
            <div>
              <p className="sos-step__title">Testosterone arrives from outside</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Your body reads the level in your blood — not where it came from.
                A steady outside supply looks, to the brain, like plenty.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">2</div>
            <div>
              <p className="sos-step__title">The brain powers down its own signal</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Sensing enough, the pituitary stops sending <strong>LH and FSH</strong>{" "}
                — the messengers that actually run the testicles (the ones you can
                see on <Link href="/learn/read-your-labs">your labs</Link>).
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">3</div>
            <div>
              <p className="sos-step__title">The testicles go quiet</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Without those signals, the <strong>intratesticular</strong>{" "}
                testosterone that sperm actually need collapses — far below what
                the number on your blood test suggests.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">4</div>
            <div>
              <p className="sos-step__title">Sperm production falls</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                For most men, to very low or zero while on therapy — about
                two-thirds reach that point by four to six months. This is the
                real part.
              </p>
            </div>
          </div>

          <div className="sos-step">
            <div className="sos-step__num">5</div>
            <div>
              <p className="sos-step__title">Take the supply away, and it reboots</p>
              <p className="sos-prose" style={{ fontSize: "16px" }}>
                Stop the outside testosterone — or keep the testicles working with
                hCG — and the loop usually restarts. Sperm return over months for
                nearly everyone; roughly 90% are back within a year.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "48px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          So how much should you actually worry?
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Almost all of the answer is which camp you&apos;re in:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Not trying to conceive</strong> — where most men on TRT are.
            Practically, this is a non-issue: you aren&apos;t using the fertility
            that&apos;s being suppressed, and it&apos;s waiting for you if that
            changes.
          </li>
          <li>
            <strong>Trying now</strong> — don&apos;t just start straight TRT and
            hope. Use a fertility-preserving route (below), or hold off. This is
            the one group for whom the timing genuinely matters.
          </li>
          <li>
            <strong>Might want kids someday</strong> — say so before you start, so
            the plan is built in rather than scrambled together later.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          One honest caveat: reversible is not instant or guaranteed. Recovery
          takes months, and <strong style={{ color: "var(--sos-text-hi)" }}>older
          men and those on TRT for longer</strong>{" "}recover more slowly and less
          reliably. That&apos;s a reason to plan earlier, not to panic.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          Keeping your testosterone and your fertility at once
        </h2>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          If you want both, you usually can — the tools are well established:
        </p>
        <ul className="sos-prose" style={list}>
          <li>
            <strong>Enclomiphene or clomiphene.</strong>{" "}A pill that nudges your
            own body to make more testosterone by raising LH and FSH — so it
            lifts your level <em>without</em>{" "}switching sperm off. Often the whole
            answer for a man who wants both.
          </li>
          <li>
            <strong>hCG alongside TRT.</strong>{" "}It mimics LH, keeping the
            testicles working — and making sperm — even while you&apos;re on
            testosterone.
          </li>
          <li>
            <strong>Bank sperm first.</strong>{" "}The simple insurance when timing is
            uncertain and you&apos;d rather not think about it again.
          </li>
        </ul>
        <p className="sos-note" style={{ marginTop: "14px" }}>
          Which one — and whether at all — is a prescriber&apos;s call, and it
          belongs in the conversation <em>before</em>{" "}you start, not after. It is
          the same &quot;real diagnosis, real monitoring&quot; standard behind{" "}
          <Link href="/learn/testosterone-therapy">testosterone therapy, done right</Link>.
        </p>
      </section>

      <section style={{ marginTop: "44px" }}>
        <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
          The bottom line
        </h2>
        <p className="sos-prose">
          For most men on TRT, fertility never becomes a real problem — they&apos;re
          not trying to conceive, and the suppression is usually reversible and
          often preventable. The one thing that stays true is that straight
          testosterone turns sperm production down while you&apos;re on it — so if
          children are anywhere on the table, that&apos;s a five-minute
          conversation to have <em>first</em>. It&apos;s a reason to plan, not a
          reason to panic, and almost never a reason to skip treatment you need.
        </p>
      </section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9243576/" target="_blank" rel="noopener noreferrer">managing spermatogenesis suppression from TRT/AAS</a>;{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10890669/" target="_blank" rel="noopener noreferrer">managing male fertility in hypogonadal men on TRT</a>; and{" "}
          <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12513088/" target="_blank" rel="noopener noreferrer">strategies for reversing testosterone-induced infertility</a>.
        </p>
        <p className="sos-note">
          General education, not medical advice, and not a dosing guide. Fertility
          planning, TRT, and any preserving medication are decisions for a licensed
          clinician who knows your history and your goals.
        </p>
      </div>

      <Faq slug="trt-fertility" />
      <RelatedArticles slug="trt-fertility" />
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
