"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HexMap } from "@/components/nearme/HexMap";
import { SubmitReport } from "@/components/nearme/SubmitReport";
import {
  KINDS,
  KIND_LABELS,
  PUBLISHED_PRICE,
  SOURCE_LABELS,
  confidenceLabel,
  lookupZip,
  nearest,
  priceLabel,
  titleCase,
  type Kind,
  type Ranked,
} from "@/lib/nearme";

/**
 * /near-me: zip -> the four listing types nearest to it, ranked by distance,
 * with a price range per listing (member reports once there are three, the
 * published range until then). The zip is resolved to a ZCTA centroid in the
 * browser from a bundled table; nothing is sent anywhere. The URL hash keeps
 * the zip so a result can be shared without a server round-trip.
 */

const SHORT: Record<Kind, string> = { trt: "TRT", glp1: "GLP-1", pharmacy: "Rx", gym: "Gym" };

export function NearMeTool() {
  const [zip, setZip] = useState("");
  const [query, setQuery] = useState<{ zip: string; lat: number; lon: number; city: string } | null>(null);
  const [err, setErr] = useState("");
  const [report, setReport] = useState<Ranked | null>(null);

  // Pick up ?zip= (home-page form) or #zip= (shared link) once mounted. The
  // read happens in a frame callback, so hydration renders the empty form and
  // the lookup runs as a separate update.
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

  function run(z: string) {
    const hit = lookupZip(z);
    if (!hit) {
      setErr(/^\d{5}$/.test(z) ? "That zip isn't in the Dallas–Fort Worth dataset yet." : "Enter a 5-digit zip.");
      setQuery(null);
      return;
    }
    setErr("");
    setQuery({ zip: z, ...hit });
    window.history.replaceState(null, "", `#zip=${z}`);
  }

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
          <label className="sos-label" htmlFor="nm-zip">
            Zip code · DFW
          </label>
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
        <button type="submit" className="sos-btn sos-btn--primary" style={{ border: 0, cursor: "pointer" }}>
          Find
        </button>
        {err && (
          <p role="alert" className="sos-note" style={{ flexBasis: "100%", color: "var(--sos-copper)", margin: 0 }}>
            {err}
          </p>
        )}
      </form>

      <HexMap focus={query ? { lat: query.lat, lon: query.lon } : null} height={360} initialZoom={query ? 3 : 1} />

      {query && (
        <div style={{ marginTop: 28 }}>
          <p className="sos-kicker" style={{ marginBottom: 18 }}>
            Near {query.zip} · <b>{query.city}</b> · within 25 mi
          </p>
          {KINDS.map((k) => (
            <KindList key={k} kind={k} lat={query.lat} lon={query.lon} onReport={setReport} />
          ))}
          <p className="sos-note" style={{ marginTop: 24 }}>
            Listings are businesses from public registries (NPI, CMS Open Payments, state pharmacy
            licensing, OpenStreetMap), matched by specialty or name. A listing here is not an
            endorsement, and a prescriber appearing here is not a recommendation to use one. See{" "}
            <Link href="/near-me/methodology">how the map is built</Link>.
          </p>
        </div>
      )}

      {report && <SubmitReport poi={report} onClose={() => setReport(null)} />}
    </div>
  );
}

function KindList({
  kind,
  lat,
  lon,
  onReport,
}: {
  kind: Kind;
  lat: number;
  lon: number;
  onReport: (p: Ranked) => void;
}) {
  const list = nearest(lat, lon, kind);
  const pub = PUBLISHED_PRICE[kind];
  return (
    <section style={{ marginBottom: 30 }}>
      <h2 className="sos-h2" style={{ marginBottom: 4 }}>
        {KIND_LABELS[kind]}
      </h2>
      <p className="sos-note" style={{ marginBottom: 12 }}>
        Published range ${pub.low}–${pub.high}{pub.unit} ·{" "}
        <Link href={pub.href}>{pub.source}</Link>
      </p>
      {list.length === 0 ? (
        <p className="sos-note">Nothing within 25 miles in the current dataset.</p>
      ) : (
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {list.map((p, i) => {
            const price = priceLabel(p);
            return (
              <li
                key={p.id}
                className="sos-card"
                style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, alignItems: "start" }}
              >
                <span style={{ fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-lo)", paddingTop: 2 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: "var(--sos-serif)", fontSize: 16.5, color: "var(--sos-text-hi)", margin: 0 }}>
                    {titleCase(p.n)}
                  </p>
                  <p className="sos-note" style={{ margin: "2px 0 0" }}>
                    {[p.a && titleCase(p.a), p.c, p.z].filter(Boolean).join(" · ")}
                  </p>
                  <p className="sos-note" style={{ margin: "4px 0 0", color: price.member ? "var(--sos-text-md)" : "var(--sos-text-lo)" }}>
                    {price.member ? "Members report " : "No member reports yet · "}
                    {price.text}
                    {" · "}
                    <button type="button" onClick={() => onReport(p)} style={linkBtn}>
                      report a price
                    </button>
                  </p>
                </div>
                <div style={{ textAlign: "right", fontFamily: "var(--sos-mono)", fontSize: 12, color: "var(--sos-text-md)", whiteSpace: "nowrap" }}>
                  <div style={{ color: "var(--sos-text-hi)", fontSize: 14 }}>{p.miles < 10 ? p.miles.toFixed(1) : Math.round(p.miles)} mi</div>
                  <div style={{ color: "var(--sos-text-lo)", fontSize: 11, letterSpacing: "0.04em" }} title={`${SOURCE_LABELS[p.s] ?? p.s} · confidence ${p.cf}`}>
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
