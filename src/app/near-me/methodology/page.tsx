import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CARE_KINDS, KINDS, KIND_SHORT, META, METROS, SCORED_KINDS, kindCount } from "@/lib/nearme";

export const metadata: Metadata = {
  title: "Near me: how the map is built",
  description:
    "Sources, confidence rules, the Metabolic Infrastructure Index formula, the care layers that are counted but never scored, price aggregation, moderation, snapshots, and the uses we forbid. Businesses only, never residents.",
  alternates: { canonical: "/near-me/methodology" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Near me: how the metabolic infrastructure map is built",
  url: `${SITE.url}/near-me/methodology`,
  dateModified: META.built,
  publisher: { "@id": `${SITE.url}/#org` },
};

const SOURCES: { layer: string; source: string; keep: string; drop: string }[] = [
  {
    layer: "TRT clinics",
    source: "NPI registry, monthly NPPES file, all states: endocrinology 207RE0101X, urology 208800000X, general preventive medicine 2083P0901X; family and internal medicine only on a name-keyword hit (testosterone, hormone, low T, men's health, andropause, anti-aging, longevity). Deactivated NPIs skipped. (Builds before v3 used 208U00000X and 2083X0100X, which are clinical pharmacology and occupational medicine; corrected.)",
    keep: "Practice-location address, organization name, taxonomy codes.",
    drop: "Individual practitioners' names (a solo office is labelled by specialty only), mailing addresses, phone numbers.",
  },
  {
    layer: "GLP-1 prescribers",
    source: "NPI obesity medicine 207RB0002X and weight-loss name keywords; CMS Open Payments general payments from Novo Nordisk and Eli Lilly tied to Ozempic, Wegovy, Mounjaro, Zepbound, Rybelsus, Saxenda, Victoza, grouped to distinct business addresses per state, then joined to the NPI registry's organizations at the same street line, suite and zip.",
    keep: "Practice address; the registered organization's legal business name when exactly one organization is registered at that suite.",
    drop: "Recipient name, NPI, payment amounts, payment nature. Individuals are never used to name an address; a multi-tenant building with no suite match stays generic.",
  },
  {
    layer: "Compounding pharmacies",
    source: "NPI registry organizations declaring the compounding-pharmacy taxonomy 3336C0004X, all states (a registry match, not a license; builds before v3 read 3336C0002X, clinic pharmacy, corrected); FDA registered outsourcing facilities (503B), all states; state boards of pharmacy license exports (503A), one CSV per state as operators add them, which verify a registry row by name and zip; OpenStreetMap name search inside metros for candidates.",
    keep: "Name, address, license class.",
    drop: "Nothing hidden: a registry match or an unverified candidate is labelled as such, never as licensed.",
  },
  {
    layer: "Gyms",
    source: "OpenStreetMap fitness centres and sport tags inside metro boxes; optional Google Places text search.",
    keep: "Name, address, coordinates, tag words (CrossFit, powerlifting, barbell, strength, strongman; independent fitness centres at lower confidence).",
    drop: "Big-box chains, reviews, photos.",
  },
];

/** The care layers: counted per hex and per region, listed in the lookup, never weighted into the index. */
const CARE_SOURCES: { layer: string; source: string; keep: string; drop: string }[] = [
  {
    layer: "Urologists",
    source: "NPI registry, urology 208800000X, all states, organizations and individual practice locations. Pediatric urology 2088P0231X and any pediatric or children's name excluded.",
    keep: "Practice-location address, organization name, taxonomy code.",
    drop: "Individual practitioners' names (a solo office is 'Urology practice'), subspecialty claims we cannot verify.",
  },
  {
    layer: "Endocrinologists",
    source: "NPI registry, endocrinology, diabetes and metabolism 207RE0101X, all states. Pediatric endocrinology 2080P0205X excluded. The same record also feeds the TRT layer at a lower confidence; here it is the specialty itself.",
    keep: "Practice-location address, organization name.",
    drop: "Individual names; any claim that the practice runs a testosterone program.",
  },
  {
    layer: "Penile implant practices",
    source: "CMS Open Payments general payments from Boston Scientific (AMS 700, Ambicor, Spectra, Tactra) and Coloplast (Titan, Genesis) tied to a penile prosthesis, grouped to distinct business addresses per state and named from the NPI organization registered at that suite; plus urology organizations whose registered name says penile implant or prosthetic urology.",
    keep: "Practice address; the registered organization's legal business name when exactly one is registered at that suite; the maker.",
    drop: "Recipient name, NPI, payment amounts, payment nature. A device record is a proxy for implant surgery being offered at that practice, never a claim about a named surgeon or a case count.",
  },
  {
    layer: "Shockwave and PRP clinics",
    source: "Organization names only: ED-specific brands (GAINSWave, P-shot, Priapus) stand alone; generic wave or PRP words count only next to a men's-health word, so orthopaedic and podiatry shockwave stays out. NPI registry nationwide; OpenStreetMap and optional Google Places inside metros.",
    keep: "Name, address, the keyword that matched.",
    drop: "Any claim about the device (focused or radial), protocol, or outcome. The evidence grade is EMERGING and the clinic device is often not the trial device; the lookup says so above every list.",
  },
  {
    layer: "Vacuum erection device suppliers",
    source: "NPI registry durable medical equipment suppliers 332B00000X whose name says vacuum, erection, impotence or the device (0.65) or urology / men's health (0.45); OpenStreetMap medical-supply shops and optional Google Places inside metros, same name rule.",
    keep: "Name, address.",
    drop: "Product claims. Most devices ship by mail, so this layer is thin by nature and says so.",
  },
  {
    layer: "Sleep medicine and sleep labs",
    source: "NPI registry, all states: sleep-disorder diagnostic centers 261QS1200X; sleep-medicine physicians 207RS0012X, 207QS1201X, 2084S0012X, 207YS0012X; sleep specialists (PhD) 173F00000X at lower confidence. Pediatric sleep medicine 2080S0012X excluded.",
    keep: "Practice-location address, organization name.",
    drop: "Individual names; accreditation claims (the registry does not carry them).",
  },
  {
    layer: "Labs and draw sites",
    source: "NPI registry clinical medical laboratories 291U00000X, all states: national draw-site brands (Quest, Labcorp, Sonora Quest, Any Lab Test Now, BioReference, CPL, ARUP, Mayo) at 0.85 and flagged; other labs only when the name says patient service, draw, phlebotomy, blood or diagnostics (0.55). Genetics, toxicology, pathology-only, research, veterinary and dental labs excluded. OpenStreetMap laboratories inside metros for the brands.",
    keep: "Name, address, brand flag.",
    drop: "Test menus, prices, hours (go to the brand's site; the directory lists the testing services we have reviewed).",
  },
  {
    layer: "Sexual medicine and sex therapy",
    source: "NPI registry organizations in behavioral-health, physician, clinic, group or advanced-practice taxonomies whose registered name says sex therapy or sexology (0.6), sexual medicine, sexual dysfunction, sexual wellness, men's sexual or intimacy (0.55), or sexual health (0.4); names with assault, abuse, offender, violence, crisis, HIV/STI testing or fertility excluded. Individual therapists are never listed by name. OpenStreetMap and optional Google Places inside metros.",
    keep: "Organization name, address.",
    drop: "Individual practitioners (an individual NPI has no business name and contributes nothing here), credentials we cannot verify (AASECT certification is a member directory of people, which we do not scrape).",
  },
];

export default function NearMeMethodologyPage() {
  return (
    <div className="sos-container">
      <JsonLd data={jsonLd} />
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        Near me · <b>methodology</b> · v3 · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>How the map is built</h1>

      <p className="sos-prose" style={{ marginBottom: 28, maxWidth: "64ch" }}>
        A map of businesses that treat, supply, or support men&apos;s metabolic, hormonal and
        sexual health. Every state is covered by the public registries; {META.metros} metros are also
        mapped at street scale. Each hexagon gets a Metabolic Infrastructure Index from 0 to 100 from
        four metabolic layers; eight care layers (urologists, endocrinologists, implant practices,
        shockwave clinics, device suppliers, sleep medicine, labs, sex therapy) are listed and counted
        alongside, never scored. This page is the whole method, stated plainly enough that you can
        hold us to it.
      </p>

      <Section title="What it is not">
        <ul className="sos-prose" style={ul}>
          <li>
            <strong>Not about people.</strong> Every layer describes a business or a building. No
            layer uses, infers, or stores anything about residents: no census person data, no
            voter data, no demographics, no one&apos;s health status.
          </li>
          <li>
            <strong>Not a referral.</strong> A listing means a public registry says the business
            exists under a relevant category. Reviewed providers live in the{" "}
            <Link href="/directory">directory</Link>, where the trust criteria are published.
          </li>
          <li>
            <strong>Not a legal opinion.</strong> Compounding, telehealth, and controlled-substance
            rules differ by state. The pharmacy layer asserts licensure or FDA registration only,
            never that a particular prescription is lawful in a particular state.
          </li>
          <li>
            <strong>Not for housing, lending, or insurance.</strong> The index must not be used in,
            or marketed toward, any decision about a person&apos;s housing, credit, or insurability.
            The data license (CC BY-NC 4.0) and this page say so.
          </li>
        </ul>
      </Section>

      <Section title="Coverage">
        <ul className="sos-note" style={{ ...ul, gap: 6 }}>
          <li><b style={{ color: "var(--sos-text-hi)" }}>National overview</b> · TRT, GLP-1, pharmacy · H3 r4–r5 · scored against the national distribution.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>Every state</b> · the registry layers, plus gyms inside metros · H3 r6–r7 · scored nationally.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>{META.metros} metros</b> · all four scored layers · H3 r7–r9 · scored against the metro&apos;s own distribution, with the national score alongside.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>Care layers</b> · registry matches every state; name search inside metros for shockwave, device suppliers, sex therapy and the lab brands · counted per hex, listed in the lookup, never scored.</li>
        </ul>
        <p className="sos-note" style={{ marginTop: 10 }}>
          Metros: {METROS.map((m) => m.name).join(", ")}. The gym layer and the OpenStreetMap
          pharmacy candidates exist only inside these boxes; outside them the index uses the three
          registry layers with their weights renormalised, and the hex says so.
        </p>
      </Section>

      <Section title="Sources (public, business-level)">
        <p className="sos-note" style={{ marginBottom: 10 }}>The four layers that score the index.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {SOURCES.map((s) => (
            <div key={s.layer} className="sos-card" style={{ padding: "14px 16px" }}>
              <p className="sos-h2" style={{ marginBottom: 6 }}>{s.layer}</p>
              <p className="sos-note" style={{ color: "var(--sos-text-md)" }}>{s.source}</p>
              <p className="sos-note" style={{ marginTop: 6 }}>Keep: {s.keep}</p>
              <p className="sos-note">Drop: {s.drop}</p>
            </div>
          ))}
        </div>
        <p className="sos-note" style={{ margin: "18px 0 10px" }}>The care layers, counted and listed but never scored.</p>
        <div style={{ display: "grid", gap: 10 }}>
          {CARE_SOURCES.map((s) => (
            <div key={s.layer} className="sos-card" style={{ padding: "14px 16px" }}>
              <p className="sos-h2" style={{ marginBottom: 6 }}>{s.layer}</p>
              <p className="sos-note" style={{ color: "var(--sos-text-md)" }}>{s.source}</p>
              <p className="sos-note" style={{ marginTop: 6 }}>Keep: {s.keep}</p>
              <p className="sos-note">Drop: {s.drop}</p>
            </div>
          ))}
        </div>
        <p className="sos-note" style={{ marginTop: 12 }}>
          Taxonomy codes are checked against the NUCC Health Care Provider Taxonomy code set (v26.1)
          before each refresh. Zips resolve to Census ZCTA centroids (2023 Gazetteer), with GeoNames filling names and
          non-ZCTA zips. Street geocoding uses the Census Bureau batch geocoder; rows it cannot match
          stay at their zip centroid and are labelled as such wherever they appear. Inside metros,
          Nominatim fills some gaps under its usage policy. Distances are great-circle miles from the
          zip centroid.
        </p>
      </Section>

      <Section title="Confidence">
        <ul className="sos-note" style={{ ...ul, gap: 6 }}>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.85 and up</b> · licensed or verified: a TSBP/FDA license, or a specialty match plus a name keyword.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.6 to 0.85</b> · specialty match: the registry taxonomy alone.</li>
          <li><b style={{ color: "var(--sos-text-hi)" }}>0.3 to 0.6</b> · keyword match: a generalist whose name says hormones or weight loss, an unlicensed pharmacy candidate, a shockwave or sex-therapy name hit, a device-record proxy for implant surgery.</li>
        </ul>
        <p className="sos-note" style={{ marginTop: 10 }}>
          Rows under 0.3 are not published. Confidence weights the index and breaks distance ties. It
          is never moved by money.
        </p>
      </Section>

      <Section title="The index">
        <p className="sos-prose" style={{ fontSize: 16, marginBottom: 12 }}>
          For each H3 hexagon and each of the four metabolic layers that covers it:
        </p>
        <pre className="sos-note" style={{ background: "var(--sos-e1)", border: "1px solid var(--sos-line)", borderRadius: 8, padding: 14, overflowX: "auto", color: "var(--sos-text-md)" }}>
{`raw_k  = Σ confidence inside the hex + 0.5 × Σ confidence in the 6 neighbours
comp_k = min(1, ln(1 + raw_k) / ln(1 + P95_k))     P95 over the scoring region
MII    = 100 × Σ w_k·comp_k / Σ w_k                 w: ${SCORED_KINDS.map((k) => `${KIND_SHORT[k]} ${META.weights[k].toFixed(2)}`).join(", ")}`}
        </pre>
        <p className="sos-note" style={{ marginTop: 10 }}>
          P95 is taken over the whole country for national and state layers and over the metro
          itself for metro layers; every hex also carries the nationally scored value. The log
          compresses the top so one medical tower does not flatten the rest of the map. The neighbour
          term smooths single-listing noise. Empty hexes are not drawn. Weights are a published
          judgment call, revisited each quarter.
        </p>
        <p className="sos-note" style={{ marginTop: 10 }}>
          The care layers are deliberately outside the formula. The index has meant &ldquo;metabolic
          infrastructure&rdquo; since v1 and adding a shockwave franchise or a draw site to it would
          change what every published hex means. Each hex instead carries a count of care listings
          (and, in the downloadable rows, a per-layer sum of confidence) so they can be read
          alongside the score. If a care layer is ever weighted in, it will be a new, named index.
        </p>
      </Section>

      <Section title="Programmatic pages">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          A city gets a TRT page only with five or more TRT listings and a GLP-1 page only with eight
          or more GLP-1 listings. Below that it is reachable through the lookup and the state map but
          has no page of its own: a page with two rows is noise for readers and search engines alike.
          Current build: {META.cities_with_pages.trt} TRT city pages, {META.cities_with_pages.glp1} GLP-1 city pages.
        </p>
      </Section>

      <Section title="Prices">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          A listing shows a member price range only once three or more approved reports exist, as
          the interquartile range so one outlier cannot move it. Below three, the published range
          for the category is shown and attributed. Reports never include names, emails, or phone
          numbers; the API rejects them.
        </p>
      </Section>

      <Section title="Submissions and moderation">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          Members can report a price, a correction, a closure, or a missing business. Every report
          is created as pending and reaches the site only after a moderator approves it and the
          dataset is rebuilt. A report stores an account id and the form fields. IP addresses and
          user agents are never read or stored. Share your experience, don&apos;t prescribe to others.
        </p>
      </Section>

      <Section title="Snapshots">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          The dataset is rebuilt and frozen once a quarter. Openings, closings, counts per city, and
          median reported prices are appended to a time series. A business id is a hash of its
          name, address, and zip, so a move or rename reads as a closure plus an opening.
        </p>
      </Section>

      <Section title="Money">
        <p className="sos-prose" style={{ fontSize: 16 }}>
          There is no paid placement on the map. If sponsored pins or verified-pricing badges ever
          ship, they will be labelled, kept out of the ranking and the index, and described here
          first. Any paid relationship follows the directory rule: disclosed at the link, never
          changes a rank, a score, or a grade.
        </p>
      </Section>

      <Section title="Limits">
        <ul className="sos-note" style={{ ...ul, gap: 4 }}>
          <li>Registries lag; a clinic can close months before NPPES notices.</li>
          <li>Keyword match is exactly that. A wellness clinic&apos;s name is not a workup.</li>
          <li>Open Payments is a prescribing proxy, not a prescribing record. A name on one of its addresses is the organization registered there with NPPES, whatever its specialty; a registered legal business name can contain a practitioner&apos;s name, which is the business&apos;s own registration, not a person-level record.</li>
          <li>State board exports are manual, so &quot;licensed&quot; 503A rows grow state by state; until a state&apos;s file exists, its compounders appear as NPPES registry matches, FDA 503B facilities, or OpenStreetMap candidates. Public state license datasets that exist (Connecticut, Delaware) do not flag compounding.</li>
          <li>The gym layer is metro-only. A state hex&apos;s score outside a metro says nothing about gyms.</li>
          <li>Care layers built on names (shockwave, device suppliers, sex therapy, draw-site keywords) find what a business calls itself. A clinic that offers shockwave under a wellness name is missed; a med-spa that names it is found. Inside the 20 metros a street search fills some of the gap.</li>
          <li>An implant listing is a device-maker payment record at a practice address, which says the practice has a relationship with an implant maker, not which surgeon operates or how often. Ask the practice; the AUA erectile dysfunction guideline is the standard to hold them to.</li>
          <li>Endocrinology and urology appear in two places: as specialties in the care layers, and as lower-confidence candidates in the TRT layer. That is the same record read two ways, not two businesses.</li>
          <li>Hexes with care listings but no metabolic listings score 0 and are not drawn; the lookup still lists them.</li>
          <li>About one registry row in ten sits at its zip centroid rather than its street; those rows say so.</li>
        </ul>
      </Section>

      <p className="sos-note" style={{ marginTop: 32 }}>
        Current build: {KINDS.filter((k) => kindCount(k) > 0).map((k) => `${KIND_SHORT[k]} ${kindCount(k).toLocaleString("en-US")}`).join(" · ")}
        {CARE_KINDS.some((k) => kindCount(k) === 0) ? ` · care layers not yet in this build: ${CARE_KINDS.filter((k) => kindCount(k) === 0).map((k) => KIND_SHORT[k]).join(", ")}` : ""} ·{" "}
        {META.states} states · {META.metros} metros · {META.geocoded.toLocaleString("en-US")} rows at street level.
        Pipeline: standalone Python scripts in the repository&apos;s /etl directory. Hex layers: compact JSON
        under /data/nearme/ (us, states, metros; one row per hex; CC BY-NC 4.0). <Link href="/near-me">Back to the lookup</Link> · <Link href="/map">the map</Link>.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 30 }}>
      <h2 className="sos-h2" style={{ marginBottom: 12 }}>{title}</h2>
      {children}
    </section>
  );
}

const ul: React.CSSProperties = { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 };
