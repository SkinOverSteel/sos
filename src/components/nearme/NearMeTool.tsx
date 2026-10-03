"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HexMap, US_VIEW, type Bbox } from "@/components/nearme/HexMap";
import { SubmitReport } from "@/components/nearme/SubmitReport";
import {
  KINDS,
  KIND_LABELS,
  PUBLISHED_PRICE,
  confidenceLabel,
  fetchPoolFor,
  fetchZip,
  locationLabel,
  metroFor,
  nearest,
  priceLabel,
  sourceLabel,
  titleCase,
  type Kind,
  type Poi,
  type Ranked,
  type ZipHit,
} from "@/lib/nearme";

/**
 * /near-me: any US zip -> the four listing types nearest to it, ranked by
 * distance, with a price range per listing (member reports once there are
 * three, the published range until then). The zip resolves against a sharded
 * public table and the candidate pool is the zip's state (plus a metro's other
 * states at a border); nothing about the member is sent anywhere. The URL
 * hash keeps the zip so a result can be shared.
 */

const SHORT: Record<Kind, string> = { trt: "TRT", glp1: "GLP-1", pharmacy: "Rx", gym: "Gym" };

export function NearMeTool() {
  const [zip, setZip] = useState("");
  const [hit, setHit] = useState<ZipHit | null>(null);
  const [pool, setPool] = useState<Poi[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [report, setReport] = useState<Ranked | null>(null);

  async function run(z: string) {
    if (!/^\d{5}$/.test(z)) {
      setErr("Enter a 5-digit zip.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      const h = await fetchZip(z);
      if (!h) {
        setErr("That zip isn't in the table.");
        setHit(null);
        return;
      }
      const p = await fetchPoolFor(h);
      setHit(h);
      setPool(p);
      window.history.replaceState(null, "", `#zip=${z}`);
    } catch {
      setErr("Couldn't load the dataset. Try again.");
    } finally {
      setBusy(false);
    }
  }

  // Pick up ?zip= (home-page form) or #zip= (shared link) once mounted.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const m = (window.location.search + window.location.hash).match(/zip=(\d{5})/);
      if (m) {
        setZip(m[1]);
        run(m[1]);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const metro = hit ? metroFor(hit.lat, hit.lon) : undefined;
  const region = metro ? `metros/${metro.slug}` : hit ? `states/${hit.state.toLowerCase()}` : "us";
  const resolutions = metro ? [7, 8, 9] : hit ? [6, 7] : [4, 5];
  const bbox: Bbox = metro ? metro.bbox : hit ? stateBox(hit) : US_VIEW;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(zip.trim());
        }}
        style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 18 }}
      >
        <div style={{ flex: "1 1 180px", maxWidth: 240 }}>
          <label className="sos-label" htmlFor="nm-zip">Zip code · US</label>
          <input
            id="nm-zip"
            className="sos-field"
            inputMode="numeric"
            pattern="[0-9]{5}"
            maxLength={5}
            placeholder="75201"
            autoComplete="postal-code"
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <button type="submit" className="sos-btn sos-btn--primary" disabled={busy} style={{ border: 0, cursor: "pointer" }}>
          {busy ? "Loading" : "Find"}
        </button>
        {err && (
          <p role="alert" className="sos-note" style={{ flexBasis: "100%", color: "var(--sos-copper)", margin: 0 }}>{err}</p>
        )}
      </form>

      <HexMap
        key={region}
        region={region}
        resolutions={resolutions}
        bbox={bbox}
        focus={hit ? { lat: hit.lat, lon: hit.lon } : null}
        height={360}
        initialZoom={hit ? (metro ? 3 : 2) : 1}
        national={!metro}
      />

      {hit && (
        <div style={{ marginTop: 28 }}>
          <p className="sos-kicker" style={{ marginBottom: 18 }}>
            Near {hit.zip} · <b>{hit.city}, {hit.state}</b>{metro ? ` · ${metro.name}` : ""} · within 25 mi
          </p>
          {KINDS.map((k) => (
            <KindList key={k} kind={k} pool={pool} lat={hit.lat} lon={hit.lon} inMetro={!!metro} onReport={setReport} />
          ))}
          <p className="sos-note" style={{ marginTop: 24 }}>
            Listings are businesses from public registries (NPI, CMS Open Payments, FDA and state
            pharmacy licensing, OpenStreetMap), matched by specialty or name. A listing here is not an
            endorsement, and a prescriber appearing here is not a recommendation to use one. See{" "}
            <Link href="/near-me/methodology">how the map is built</Link>.
          </p>
        </div>
      )}

      {report && <SubmitReport poi={report} onClose={() => setReport(null)} />}
    </div>
  );
}

function stateBox(h: ZipHit): Bbox {
  // A ~3° window around the zip: enough to show the state layer's context.
  return { south: h.lat - 1.5, north: h.lat + 1.5, west: h.lon - 2, east: h.lon + 2 };
}

function KindList({ kind, pool, lat, lon, inMetro, onReport }: { kind: Kind; pool: Poi[]; lat: number; lon: number; inMetro: boolean; onReport: (p: Ranked) => void }) {
  const list = nearest(pool, lat, lon, kind);
  const pub = PUBLISHED_PRICE[kind];
  return (
    <section style={{ marginBottom: 30 }}>
      <h2 className="sos-h2" style={{ marginBottom: 4 }}>{KIND_LABELS[kind]}</h2>
      <p className="sos-note" style={{ marginBottom: 12 }}>
        Published range ${pub.low}–${pub.high}{pub.unit} · <Link href={pub.href}>{pub.source}</Link>
      </p>
      {list.length === 0 ? (
        <p className="sos-note">
          {kind === "gym" && !inMetro
            ? "The gym layer covers the 20 mapped metros only, so far."
            : "Nothing within 25 miles in the current dataset."}
        </p>
      ) : (
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((p, i) => {
            const price = priceLabel(p);
            const loc = locationLabel(p);
            return (
              <li key={p.id} className="sos-card" style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, alignItems: "start" }}>
                <span style={{ fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-lo)", paddingTop: 2 }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--sos-serif)", fontSize: 16.5, color: "var(--sos-text-hi)", margin: 0 }}>{titleCase(p.n)}</p>
                  <p className="sos-note" style={{ margin: "2px 0 0" }}>
                    {[p.a && titleCase(p.a), p.c, p.z].filter(Boolean).join(" · ")}{loc ? ` · ${loc}` : ""}
                  </p>
                  <p className="sos-note" style={{ margin: "4px 0 0", color: price.member ? "var(--sos-text-md)" : "var(--sos-text-lo)" }}>
                    {price.member ? "Members report " : "No member reports yet · "}
                    {price.text}
                    {" · "}
                    <button type="button" onClick={() => onReport(p)} style={linkBtn}>report a price</button>
                  </p>
                </div>
                <div style={{ textAlign: "right", fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-md)", whiteSpace: "nowrap" }}>
                  <div style={{ color: "var(--sos-text-hi)", fontSize: 14 }}>{p.miles < 10 ? p.miles.toFixed(1) : Math.round(p.miles)} mi</div>
                  <div style={{ color: "var(--sos-text-lo)", fontSize: 11, letterSpacing: "0.04em" }} title={`${sourceLabel(p.s)} · confidence ${p.cf}`}>
                    {SHORT[kind]} · {confidenceLabel(p.cf)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}

const linkBtn: React.CSSProperties = {
  background: "none",
  border: 0,
  padding: 0,
  font: "inherit",
  color: "var(--sos-copper)",
  cursor: "pointer",
  textDecoration: "underline",
};
