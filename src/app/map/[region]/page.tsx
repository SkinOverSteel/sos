import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HexMap } from "@/components/nearme/HexMap";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CITIES, KINDS, KIND_LABELS, META, METROS, STATES, citiesWithPages, metroBySlug, miiBand, stateByCode } from "@/lib/nearme";
import cityCenters from "@/data/nearme/city-centers.json";
import stateBoxes from "@/data/nearme/state-boxes.json";

const CITY_CENTERS = cityCenters as unknown as Record<string, [number, number]>;
const STATE_BOXES = stateBoxes as Record<string, { south: number; west: number; north: number; east: number }>;

/**
 * /map/{region}: a metro (street scale, scored against itself) or a state
 * (county scale, scored nationally). Metro slugs and two-letter state codes
 * never collide.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [...METROS.map((m) => ({ region: m.slug })), ...STATES.map((s) => ({ region: s.slug }))];
}

type Params = Promise<{ region: string }>;

function resolve(region: string) {
  const metro = metroBySlug(region);
  if (metro) return { kind: "metro" as const, metro, state: undefined };
  const state = stateByCode(region);
  if (state) return { kind: "state" as const, metro: undefined, state };
  return null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { region } = await params;
  const r = resolve(region);
  if (!r) return {};
  const name = r.metro ? r.metro.name : r.state!.name;
  const total = r.metro ? r.metro.total : r.state!.total;
  return {
    title: `${name} metabolic infrastructure map`,
    description: `${name} on a hex grid: ${total} testosterone clinics, GLP-1 prescribers, compounding pharmacies, and gyms from public registries, scored 0–100 per hex. Businesses only.`,
    alternates: { canonical: `/map/${region}` },
  };
}

export default async function RegionMapPage({ params }: { params: Params }) {
  const { region } = await params;
  const r = resolve(region);
  if (!r) notFound();
  const name = r.metro ? r.metro.name : r.state!.name;
  const counts = r.metro ? r.metro.counts : r.state!.counts;
  const total = r.metro ? r.metro.total : r.state!.total;
  const cityPool = r.metro
    ? CITIES.filter((c) => r.metro!.states.includes(c.state)).filter((c) => c.total >= 5)
    : CITIES.filter((c) => c.state === r.state!.state);
  const labels = cityPool
    .slice()
    .sort((a, b) => b.total - a.total)
    .slice(0, r.metro ? 14 : 10)
    .map((c) => ({ name: c.city, ...cityCenter(c.state, c.city) }))
    .filter((c) => c.lat !== 0);
  const bbox = r.metro ? r.metro.bbox : stateBox(r.state!.state);
  const trtCities = citiesWithPages("trt", r.state?.state).filter((c) => !r.metro || r.metro.states.includes(c.state)).slice(0, 30);
  const glpCities = citiesWithPages("glp1", r.state?.state).filter((c) => !r.metro || r.metro.states.includes(c.state)).slice(0, 30);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Metabolic Infrastructure Index, ${name}`,
    url: `${SITE.url}/map/${region}`,
    license: "https://creativecommons.org/licenses/by-nc/4.0/",
    creator: { "@id": `${SITE.url}/#org` },
    temporalCoverage: META.built,
    spatialCoverage: name,
    distribution: (r.metro ? [7, 8, 9] : [6, 7]).map((res) => ({
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: `${SITE.url}/data/nearme/${r.metro ? "metros" : "states"}/${region}/hex-r${res}.json`,
    })),
  };

  return (
    <div className="sos-container" style={{ maxWidth: 1040 }}>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="sos-note" style={{ marginBottom: 14 }}>
        <Link href="/" style={{ color: "var(--sos-text-md)" }}>Home</Link> › <Link href="/map" style={{ color: "var(--sos-text-md)" }}>Map</Link> › {name}
      </nav>
      <p className="sos-kicker" style={{ marginBottom: 14 }}>
        {r.metro ? "Metro" : "State"} · <b>MII {r.metro ? r.metro.mii_us : r.state!.mii_us}</b> · {miiBand(r.metro ? r.metro.mii_us : r.state!.mii_us)} at its core, scored nationally · {META.built}
      </p>
      <h1 className="sos-h1" style={{ marginBottom: 18 }}>{name}</h1>
      <p className="sos-prose" style={{ marginBottom: 22, maxWidth: "64ch" }}>
        {total} listed businesses on a hex grid.{" "}
        {r.metro
          ? "Scored against this metro's own distribution, so the brightest hex is this metro's densest, and the grid refines to street scale as you zoom."
          : "Scored against the national distribution, so a bright hex here is bright anywhere. The gym layer covers the mapped metros only; elsewhere the three registry layers carry the score."}
      </p>

      <HexMap
        key={region}
        region={r.metro ? `metros/${region}` : `states/${region}`}
        resolutions={r.metro ? [7, 8, 9] : [6, 7]}
        bbox={bbox}
        labels={labels}
        height={560}
        initialZoom={1}
        national={!r.metro}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginTop: 22 }}>
        <div className="sos-card sos-card--deep">
          <h2 className="sos-h2" style={{ marginBottom: 10 }}>In the dataset</h2>
          <ul className="sos-note" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
            {KINDS.map((k) => (
              <li key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{KIND_LABELS[k]}</span>
                <span style={{ color: "var(--sos-text-hi)" }}>{counts[k] ?? 0}</span>
              </li>
            ))}
          </ul>
        </div>
        {trtCities.length > 0 && (
          <div className="sos-card sos-card--deep">
            <h2 className="sos-h2" style={{ marginBottom: 10 }}>TRT by city</h2>
            <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
              {trtCities.map((c) => (
                <Link key={`${c.state}-${c.slug}`} href={`/trt/${c.state.toLowerCase()}/${c.slug}`} style={{ color: "var(--sos-text-md)" }}>{c.city}{r.metro && r.metro.states.length > 1 ? `, ${c.state}` : ""}</Link>
              ))}
            </p>
          </div>
        )}
        {glpCities.length > 0 && (
          <div className="sos-card sos-card--deep">
            <h2 className="sos-h2" style={{ marginBottom: 10 }}>GLP-1 by city</h2>
            <p className="sos-note" style={{ display: "flex", flexWrap: "wrap", gap: "4px 12px" }}>
              {glpCities.map((c) => (
                <Link key={`${c.state}-${c.slug}`} href={`/glp1/${c.state.toLowerCase()}/${c.slug}`} style={{ color: "var(--sos-text-md)" }}>{c.city}{r.metro && r.metro.states.length > 1 ? `, ${c.state}` : ""}</Link>
              ))}
            </p>
          </div>
        )}
      </div>

      <p className="sos-note" style={{ marginTop: 28 }}>
        {r.state && r.state.metros.length > 0 && (
          <>Street-scale metros in {name}: {r.state.metros.map((s, i) => <span key={s}>{i ? ", " : ""}<Link href={`/map/${s}`}>{metroBySlug(s)?.name ?? s}</Link></span>)}. </>
        )}
        <Link href="/near-me">Look up a zip</Link> · <Link href="/near-me/methodology">how the map is built</Link> · not for use in housing, lending, or insurance decisions.
      </p>
    </div>
  );
}

/** Median listing coordinate per city, exported by the ETL for map labels. */
function cityCenter(state: string, city: string): { lat: number; lon: number } {
  const hit = CITY_CENTERS[`${state}/${city}`];
  return hit ? { lat: hit[0], lon: hit[1] } : { lat: 0, lon: 0 };
}

function stateBox(state: string) {
  return STATE_BOXES[state] ?? { south: 24, west: -125, north: 50, east: -66 };
}
