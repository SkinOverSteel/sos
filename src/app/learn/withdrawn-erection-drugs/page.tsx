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
  title: "Every erection drug that got pulled, ranked by how bad the idea was",
  description:
    "A ranked countdown of the erectile dysfunction drugs and products that were withdrawn, rejected, banned, or prosecuted: Uprima, yohimbine, Vasomax, papaverine, Topiglan and Vitaros, the nasal apomorphine that never launched, Enzyte, ExtenZe, and the gas-station Rhino wave. What each was, why it sold, why it was pulled, and what the survivors got right.",
  alternates: { canonical: "/learn/withdrawn-erection-drugs" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  name: "Every erection drug that got pulled, ranked by how bad the idea was",
  url: `${SITE.url}/learn/withdrawn-erection-drugs`,
  description:
    "Regulatory history of withdrawn, rejected, and prosecuted erectile dysfunction drugs and products, ranked by evidence at launch, harm, and honesty of marketing.",
  about: { "@type": "MedicalCondition", name: "Erectile dysfunction" },
  audience: { "@type": "Patient" },
};

export default function WithdrawnErectionDrugsPage() {
  return (
    <article className="sos-container">
      <JsonLd data={withReview(jsonLd, "withdrawn-erection-drugs")} />
      <Breadcrumbs slug="withdrawn-erection-drugs" />
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        <b>Treatment &amp; pharmacology</b>
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "18px" }}>
        Every erection drug that got pulled, ranked by how bad the idea was
      </h1>
      <ArticleMeta
        slug="withdrawn-erection-drugs"
        gradeNote="The regulatory history here is documented fact: FDA and EMA records, court filings, and the original trial reports. The ranking itself is editorial, and the rubric for it is printed below so you can disagree with it."
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
          The last entry on this list is still on shelves. &quot;Natural&quot;
          gas-station capsules with undeclared sildenafil or tadalafil analogs are
          the one category here that is actively hurting people right now, mostly
          men on nitrates who did not know they were taking a PDE5 inhibitor.
          If you have taken one and have chest pain, fainting, or an erection
          past four hours, that is an emergency room visit, not a forum post.
          Our{" "}
          <Link href="/learn/priapism-clock">priapism clock</Link>{" "}explains
          why the four-hour line matters.
        </p>
      </aside>

      <p className="sos-prose" style={{ marginBottom: "40px" }}>
        Every drug that survives has a graveyard behind it. For erectile
        function the graveyard is unusually well stocked, because the problem
        is common, the customers are motivated, and for most of the twentieth
        century nobody was checking the claims. We spent years on the forums
        watching these products arrive with a press release and leave with a
        warning letter, and after a while a pattern showed up: the ones that
        went away for honest reasons taught us something, and the ones that
        went away in handcuffs taught us more. So here they are, ranked. Not by
        how badly they failed, but by how bad the idea was when someone decided
        to sell it.
      </p>

      <Section title="The rubric, so you can argue with it">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Three questions per entry, scored zero to three, worst score wins:
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          <strong>Evidence at launch.</strong>{" "}Was there a controlled trial
          before the first customer paid?{" "}
          <strong>Harm.</strong>{" "}What actually happened to the people who used
          it?{" "}
          <strong>Honesty of marketing.</strong>{" "}Did the seller describe the
          product as it was?
        </p>
        <p className="sos-note">
          A drug can fail with a perfect score on all three. Several on this
          list did, and they are near the bottom, which is where the good ideas
          that did not work belong. The top of the list is reserved for products
          that were never really trying.
        </p>
      </Section>

      <Section title="Control group: the one that stayed">
        <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
          <h3 className="sos-h2" style={{ fontSize: "13px", marginBottom: "8px" }}>
            MUSE (alprostadil urethral pellet), approved 1996, still here
          </h3>
          <p className="sos-prose" style={{ fontSize: "16px" }}>
            Before the countdown, a reference point. MUSE is an alprostadil pellet
            placed in the urethra with an applicator, approved by the FDA in 1996
            and still carrying a current label. It is not popular, it is not
            elegant, and its label warns plainly about priapism and
            blood-pressure drops. But it went through trials, it told the truth
            about itself, and the regulator kept it. Every product below fell
            short of that bar somewhere. Keep MUSE in mind as the floor.
          </p>
        </div>
      </Section>

      <Section title="9. Topiglan and Vitaros: alprostadil cream">
        <Entry
          what="Alprostadil, the same prostaglandin used in injections and in MUSE, formulated as a topical gel or cream with a chemical absorption enhancer to carry it through skin. MacroChem's version was Topiglan; NexMed, later Apricus, built Vitaros."
          why="The pitch was obvious and honest: alprostadil works, needles are the reason men quit it, so put it in a cream. The market for a needle-free alprostadil is every man who was ever offered penile injections and said no."
          pulled="Topiglan reached Phase III around 2000, hit potency and consistency problems, and quietly disappeared after MacroChem was acquired. Vitaros was rejected by the FDA in 2008 over a carcinogenicity signal from its absorption enhancer in a mouse study, was approved in Europe in 2013, then received a second FDA complete response letter in February 2018 citing safety and manufacturing deficiencies. It is still sold in the UK and parts of Europe. It never reached the United States."
          learned="A good idea can lose on the excipient. The enhancer that made the cream work was the thing the regulator could not clear, and nobody lied about anything. This is the bottom of the list because it is barely a bad idea at all."
        />
      </Section>

      <Section title="8. Uprima: sublingual apomorphine">
        <Entry
          what="A dopamine agonist dissolved under the tongue, marketed by Abbott as Uprima and by Takeda as Ixense. A central lever on arousal rather than peripheral hydraulics. We covered the pharmacology and its compounded revival in the apomorphine troches piece."
          why="It was the first serious oral competitor to sildenafil, it worked through a different mechanism, and in more than 5,000 trial participants the 3 mg dose produced erections firm enough for intercourse in 49.4% of attempts against a 24.3% baseline. That is a real effect, honestly measured."
          pulled="Fainting. Public Citizen's June 2000 letter to the FDA counted roughly one man in thirty with syncope or hypotension at the 4 mg dose, including one who lost consciousness while driving. An FDA advisory committee had voted 9 to 3 that the benefit outweighed the risk; TAP withdrew the US application anyway. Europe approved it in May 2001, and the marketing authorisation was allowed to expire in May 2006, in the EMA's words for commercial reasons. Modest efficacy plus nausea is not a business against Viagra."
          learned="Uprima did everything right and still lost, which is the point. The trials were real, the numbers were published, the side effect was disclosed, and the market delivered the verdict. Read the apomorphine troches piece for what happened when the same molecule came back without the trials."
        />
        <p className="sos-note" style={{ marginTop: "12px" }}>
          Pharmacology and the compounded revival:{" "}
          <Link href="/learn/apomorphine-troches">Apomorphine&apos;s second act</Link>.
        </p>
      </Section>

      <Section title="7. Nasal apomorphine: the launch that never happened">
        <Entry
          what="Nastech Pharmaceutical's intranasal apomorphine spray, developed in the early 2000s for erectile dysfunction and female sexual dysfunction, meant to deliver the drug faster and with less nausea than the sublingual tablet."
          why="Uprima had proved the mechanism and demonstrated the problem. A spray that hit faster and avoided the fainting would have owned the niche. Pharmacia licensed it in 2002, then handed it back in 2003 to satisfy antitrust concerns from the Pfizer merger. A company selling Viagra could not also own Viagra's rival."
          pulled="It was never pulled because it never launched. Nastech's 2004 Phase II maximum-tolerated-dose study reported no fainting across roughly 700 doses and nausea under 2% at the lower doses, then the program went to the FDA for guidance and simply faded from the company's filings. No Phase III, no approval, no product."
          learned="A better delivery route does not fix a modest drug. The nose solved apomorphine's tolerability problem and left its efficacy problem exactly where it was, and nobody was going to fund a Phase III against a pill that already worked better."
        />
      </Section>

      <Section title="6. Papaverine: the injection before alprostadil">
        <Entry
          what="A smooth-muscle relaxant, originally an opium-poppy alkaloid, injected directly into the corpus cavernosum. Ronald Virag reported it in 1982, and for the rest of that decade it was the intracavernosal drug, often mixed with phentolamine. Papaverine is still one of the three ingredients in compounded trimix."
          why="Because it worked, and nothing else did. Before 1982 the options were implants or nothing. A drug that produced a reliable erection on demand in men with vascular disease was a genuine revolution, and every injection program since descends from it."
          pulled="Nobody banned it; alprostadil replaced it. The harm was documented in the follow-up. A 1990 Cleveland Clinic series of 100 men on papaverine with or without phentolamine found a fibrotic complication rate of 31% at twelve months, correlated with the number of injections. Priapism after a diagnostic papaverine dose ran 2.7% in a 672-man series and 5% in a 495-man series. When intracavernosal alprostadil arrived, a 1996 review put its priapism and fibrosis rates at 4% and 8%, and the field moved."
          learned="First-generation drugs pay the tuition. Papaverine's fibrosis and priapism numbers are why modern injection programs monitor, why alprostadil became the base, and why the four-hour rule is printed on every handout. The idea was excellent. The molecule was wrong."
        />
        <p className="sos-note" style={{ marginTop: "12px" }}>
          How modern injection therapy works and what it costs:{" "}
          <Link href="/learn/penile-injections">penile injections</Link>.
        </p>
      </Section>

      <Section title="5. Vasomax: oral phentolamine">
        <Entry
          what="Phentolamine, an alpha-blocker approved decades earlier for blood-pressure crises in pheochromocytoma, reformulated by Zonagen as a fast-dissolving oral tablet for mild-to-moderate erectile dysfunction, with Schering-Plough as the worldwide marketing partner from 1997."
          why="Phentolamine already worked as an injectable ingredient, it was an old molecule with a known safety file, and an oral version could reach market fast. Schering-Plough launched it in Latin America while the FDA was still reviewing the US application."
          pulled="In August 1999 the FDA put Zonagen's phentolamine trials on clinical hold after a two-year rat study showed male rats on long-term daily doses developing abnormal proliferation of brown fat tissue. Zonagen's shares fell 32.5% in a day. The hold was lifted in 2000, the FDA asked for new studies, and the product never got a US approval. Its efficacy in the published trials was, in the review literature's own word, modest."
          learned="An old drug is not a free pass. The same oral phentolamine had been marketed in the US from 1952 to 1984 for other indications with a history of hypotension and severe diarrhea, and the long-term animal toxicology had simply never been done for daily use in healthy men. Vasomax was sold across two borders before that question was answered, which is why it sits above the honest failures."
        />
      </Section>

      <Section title="4. Yohimbine: a century without a trial">
        <Entry
          what="An alpha-2 antagonist from the bark of the West African yohimbe tree, used for erectile dysfunction since the 1800s and sold in the US for decades as a prescription tablet under names like Yocon, without ever holding an FDA approval for that use."
          why="It predates the rules. Yohimbine was on the market before anyone required proof, and once sildenafil arrived in 1998 nobody was going to fund the trials for an unpatentable century-old alkaloid. Alvaro Morales's 2000 review put it plainly: meta-analyses of the few small trials favour it over placebo, and properly designed human studies have never been done."
          pulled="In two directions. In 1989 the FDA's over-the-counter aphrodisiac rule listed yohimbine and yohimbine hydrochloride by name among ingredients that cannot be generally recognized as safe and effective, and made non-compliant OTC products subject to regulatory action after January 1990. The prescription tablets lingered as unapproved drugs. Yohimbe bark then re-entered through the supplement door, where NIH's complementary-medicine center notes a 2015 analysis found most products do not state their yohimbine content, the amounts vary widely, and the compound is linked to arrhythmia, blood-pressure problems, heart attacks, and seizures."
          learned="No trial means no dose, no interaction data, and no way to know what is in the bottle. Yohimbine may even work a little; we will probably never find out, and it has been sold to men on that uncertainty for a hundred years. That is a bad idea that got grandfathered in."
        />
      </Section>

      <Section title="3. ExtenZe: enlargement in a capsule">
        <Entry
          what="An herbal capsule marketed by Biotab Nutraceuticals with a celebrity spokesman and a promise, repeated in every ad, that it would make a man larger."
          why="Because the claim is unfalsifiable at the point of sale and the category was unregulated. As a dietary supplement it needed no trial, and the enlargement promise reaches a customer who is embarrassed to ask anyone whether it is true."
          pulled="Twice by the same prosecutor. In 2006 the Orange County District Attorney obtained a $300,000 settlement against Biotab's principals over the enlargement claims, with an injunction against repeating them. In July 2011 the same office obtained $1.75 million, at the time the largest settlement in the county's history for violating a prior injunction, for continuing to make the claim without substantiation, charging customers for unordered product, failing to process refunds, and selling lots that exceeded California's lead limit without a Proposition 65 warning."
          learned="There is no oral pill that increases penile size, and there has never been one. A product that says otherwise is telling you what it thinks of you. The lead was a bonus. Our enhancement piece covers what the evidence actually supports."
        />
        <p className="sos-note" style={{ marginTop: "12px" }}>
          What the evidence says about size and enhancement:{" "}
          <Link href="/learn/enhancement">enhancement</Link>.
        </p>
      </Section>

      <Section title="2. Enzyte: Smilin&apos; Bob and the auto-ship">
        <Entry
          what={"Berkeley Premium Nutraceuticals' \"once-daily tablet for natural male enhancement,\" sold nationally from 2001 with the grinning Smilin' Bob television character, fabricated customer-satisfaction surveys reporting 96% approval, and physicians credited with the formula who did not exist."}
          why="The same customer as ExtenZe, reached at far greater scale, with a business model built on a free trial that silently enrolled buyers in recurring credit-card charges. The product barely mattered. The billing did."
          pulled="By a federal jury. In February 2008 founder Steven Warshak was convicted on 93 counts including conspiracy, mail fraud, bank fraud, and money laundering; the indictment described roughly $100 million taken from consumers and banks through the auto-ship scheme and deliberate double-charging to manipulate refund statistics. He was sentenced to 25 years, later reduced to 10, and the Department of Justice eventually returned about $24 million in forfeited funds to more than 138,000 victims."
          learned="When the ad has a fake doctor, the science was never the product. Enzyte is the template for every subscription supplement funnel that followed it, and the reason we read the cancellation terms before we read the ingredient list."
        />
      </Section>

      <Section title="1. The gas-station wave: Rhino and the hidden-drug capsules">
        <Entry
          what="Hundreds of products, mostly capsules sold at convenience stores, gas stations, and online marketplaces under names like Gold Rhino 25000, Black Rhino, Rhino 7, and countless others, labelled as herbal and found on FDA laboratory analysis to contain undeclared sildenafil, tadalafil, or chemical analogs of them such as sulfoaildenafil and dimethylsildenafil."
          why="Because the drug works and the label lies. A capsule with real PDE5 inhibitor in it produces a real effect, which generates real word of mouth for a product that never has to disclose what it contains, pass a manufacturing inspection, or warn anyone about nitrates."
          pulled="Continuously, and never entirely. The FDA's public list of tainted sexual-enhancement and energy products runs to more than four hundred notifications since 2012, and the agency states the list covers only a small fraction of what is on the market. In November 2018 it issued a blanket warning against Rhino-branded products after identifying more than 25 variants with hidden drugs since 2007, citing reports of chest pain, severe headaches, and prolonged erections that ended in surgery and hospitalisation for dangerous blood-pressure drops."
          learned="This is the worst idea on the list because it combines every failure above it: no trial, real pharmacological harm, and a label that is a lie by design. The analogs are the tell. Sulfoaildenafil exists for one reason, to be a sildenafil that a basic sildenafil test does not catch. The men hurt by these products were not reckless; most did not know they were taking a drug at all."
        />
        <p className="sos-note" style={{ marginTop: "12px" }}>
          How to read what you are actually buying, and the cousin category of
          honey sachets:{" "}
          <Link href="/learn/product-forms">product forms</Link>{" "}and{" "}
          <Link href="/learn/honey-packets">honey packets</Link>.
        </p>
      </Section>

      <Section title="What the survivors have in common">
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          Look at what is left standing. The PDE5 inhibitors, four of them now,
          each with published trials, a label that names the nitrate
          interaction, and two decades of post-market safety data. Alprostadil,
          in the vial and in the pellet, with its priapism rate printed on the
          handout. The inflatable implant, the oldest option of all and still in
          use. None of these are
          exciting. All of them survived for the same reason: someone ran the
          trial, someone published the harm, and a regulator was allowed to say
          no.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px", marginBottom: "12px" }}>
          That is the thing the graveyard actually teaches. Uprima and Topiglan
          did not fail because the system was hostile; they failed because the
          system worked, and their numbers were not good enough. Papaverine was
          retired by its own follow-up data. The products that did the most
          damage are precisely the ones that found a way around the trial:
          yohimbine by being old, ExtenZe and Enzyte by calling themselves
          supplements, and the Rhino capsules by simply lying. The evidence
          machine is not the obstacle between you and a working treatment. It is
          the reason the working treatments exist.
        </p>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          So the practical lesson is dull and we will say it anyway. If a product
          for erectile function has not been through the machine, you are the
          trial. The clinician-and-pharmacy channel is not a hoop; it is the
          entire difference between the bottom of this list and the top. Start
          with the{" "}
          <Link href="/learn/pde5-lineup">PDE5 lineup</Link>, understand the{" "}
          <Link href="/learn/product-forms">product forms</Link>{" "}you might be
          offered, and if something is not working, get the{" "}
          <Link href="/learn/ed-workup">workup</Link>{" "}rather than the next
          capsule off the counter.
        </p>
      </Section>

      <div className="sos-card sos-card--deep" style={{ marginTop: "44px" }}>
        <p className="sos-kicker" style={{ marginBottom: "10px" }}>
          Sources &amp; important note
        </p>
        <p className="sos-note" style={{ marginBottom: "12px" }}>
          Drawn from:{" "}
          <a href="https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/020700s032lbl.pdf" target="_blank" rel="noopener noreferrer">MUSE (alprostadil) prescribing information, FDA</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/12090731/" target="_blank" rel="noopener noreferrer">Topiglan development review (Curr Opin Investig Drugs, 2002)</a>;{" "}
          <a href="https://www.yahoo.com/news/fda-declines-approve-apricus-erectile-dysfunction-cream-121441866--finance.html" target="_blank" rel="noopener noreferrer">FDA declines to approve Vitaros, February 2018 (Reuters via Yahoo)</a>;{" "}
          <a href="https://www.medicines.org.uk/emc/product/13937/smpc" target="_blank" rel="noopener noreferrer">Vitaros UK summary of product characteristics</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/11741126/" target="_blank" rel="noopener noreferrer">apomorphine SL efficacy and tolerability (Urol Int, 2001)</a>;{" "}
          <a href="https://www.citizen.org/article/letter-urging-rejection-of-apomorphine-uprima/" target="_blank" rel="noopener noreferrer">Public Citizen letter on Uprima, June 2000</a>;{" "}
          <a href="https://www.ema.europa.eu/en/documents/public-statement/public-statement-uprima-non-renewal-marketing-authorisation-european-union_en.pdf" target="_blank" rel="noopener noreferrer">EMA public statement on non-renewal of Uprima, 2006</a>;{" "}
          <a href="https://www.sec.gov/Archives/edgar/data/0000737207/000095012404000790/v97246exv99w1.txt" target="_blank" rel="noopener noreferrer">Nastech intranasal apomorphine Phase II results (SEC 8-K, 2004)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/15154111/" target="_blank" rel="noopener noreferrer">intranasal apomorphine, Nastech (IDrugs, 2004)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/2342174/" target="_blank" rel="noopener noreferrer">papaverine injection therapy: results and complications (J Urol, 1990)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/20078509/" target="_blank" rel="noopener noreferrer">incidence of papaverine-induced priapism (Andrologia, 2010)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/1867493/" target="_blank" rel="noopener noreferrer">prolonged erections after diagnostic papaverine (Arch Esp Urol, 1991)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/8785470/" target="_blank" rel="noopener noreferrer">intracavernous alprostadil review (Drugs Aging, 1996)</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/12879109/" target="_blank" rel="noopener noreferrer">oral phentolamine, Vasomax (Drugs Today, 2000)</a>;{" "}
          <a href="https://www.thepharmaletter.com/zonagen-crashes-as-fda-terminates-phentolamine-studies" target="_blank" rel="noopener noreferrer">FDA clinical hold on Zonagen phentolamine trials, August 1999</a>;{" "}
          <a href="https://www.pharmaceuticalonline.com/doc/zonagen-announces-schering-plough-to-manufact-0001" target="_blank" rel="noopener noreferrer">Zonagen and Schering-Plough Vasomax agreement, 1999</a>;{" "}
          <a href="https://pubmed.ncbi.nlm.nih.gov/10845767/" target="_blank" rel="noopener noreferrer">yohimbine in erectile dysfunction: the facts (Int J Impot Res, 2000)</a>;{" "}
          <a href="https://www.law.cornell.edu/cfr/text/21/310.528" target="_blank" rel="noopener noreferrer">21 CFR 310.528, OTC aphrodisiac drug products</a>;{" "}
          <a href="https://www.nccih.nih.gov/health/yohimbe" target="_blank" rel="noopener noreferrer">NCCIH: yohimbe, usefulness and safety</a>;{" "}
          <a href="https://ocdistrictattorney.gov/press/dietary-supplement-maker-to-pay-1-75-million-for-unfair-business-practices-including-falsely-promising-male-penile-enlargement/" target="_blank" rel="noopener noreferrer">Orange County District Attorney: ExtenZe settlement, 2011</a>;{" "}
          <a href="https://www.justice.gov/archive/usao/ohs/news/05-08-12.html" target="_blank" rel="noopener noreferrer">US Attorney, Southern District of Ohio: Warshak forfeited funds returned to victims</a>;{" "}
          <a href="https://en.wikipedia.org/wiki/United_States_v._Warshak" target="_blank" rel="noopener noreferrer">United States v. Warshak</a>{" "}and{" "}
          <a href="https://en.wikipedia.org/wiki/Enzyte" target="_blank" rel="noopener noreferrer">Enzyte</a>;{" "}
          <a href="https://www.fda.gov/drugs/medication-health-fraud-notifications/sexual-enhancement-and-energy-product-notifications" target="_blank" rel="noopener noreferrer">FDA tainted sexual enhancement and energy product notifications</a>;{" "}
          <a href="https://www.fda.gov/drugs/medication-health-fraud/public-notification-control-all-natural-sexual-enhancement-contains-hidden-drug-ingredient" target="_blank" rel="noopener noreferrer">FDA notification: sulfoaildenafil and dimethylsildenafil in a &quot;natural&quot; product</a>;{" "}
          <a href="https://www.fda.gov/drugs/medication-health-fraud/public-notification-gold-rhino-25000-contains-hidden-drug-ingredient" target="_blank" rel="noopener noreferrer">FDA notification: Gold Rhino 25000</a>; and{" "}
          <a href="https://www.cbsnews.com/news/fda-warns-consumers-against-using-rhino-male-enhancement-products/" target="_blank" rel="noopener noreferrer">FDA warning on Rhino products, November 2018 (CBS News)</a>.
        </p>
        <p className="sos-note">
          General education and regulatory history, not medical advice. Nothing
          here is a recommendation to take, avoid, or source any product;
          treatment decisions belong with a licensed clinician and a licensed
          pharmacy. Rankings are editorial judgement against the printed rubric.
        </p>
      </div>
      <Faq slug="withdrawn-erection-drugs" />
      <RelatedArticles slug="withdrawn-erection-drugs" />
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

function Entry({
  what,
  why,
  pulled,
  learned,
}: {
  what: string;
  why: string;
  pulled: string;
  learned: string;
}) {
  const rows: [string, string][] = [
    ["What it was", what],
    ["Why it was sold", why],
    ["Why it was pulled", pulled],
    ["What we learned", learned],
  ];
  return (
    <div className="sos-card" style={{ borderLeft: "3px solid var(--sos-copper)" }}>
      {rows.map(([label, text], i) => (
        <div key={label} style={{ marginBottom: i === rows.length - 1 ? 0 : "14px" }}>
          <p className="sos-kicker" style={{ marginBottom: "4px" }}>{label}</p>
          <p className="sos-prose" style={{ fontSize: "16px" }}>{text}</p>
        </div>
      ))}
    </div>
  );
}
