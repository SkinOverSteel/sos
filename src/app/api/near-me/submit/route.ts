import postgres from "postgres";

/**
 * Near Me member reports -> moderation queue (table nearme_submissions,
 * schema in etl/schema.sql). Every row is created with status "pending" and
 * is published only after moderate.py approve + export + a rebuild.
 *
 * Privacy, by construction: the row stores an account id and the form fields
 * only. The request's IP and user agent are never read, let alone stored, and
 * there is no email field. Set DATABASE_URL (Postgres) to enable; without it
 * the route answers 503 and the form reports that honestly.
 */
export const dynamic = "force-dynamic";

const KINDS = new Set(["trt", "glp1", "pharmacy", "gym"]);
const TYPES = new Set(["price", "new", "closed", "correction"]);
const PII = /\b[\w.+-]+@[\w-]+\.[\w.]+\b|\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/; // emails, phone numbers

let sql: ReturnType<typeof postgres> | null = null;
function db() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  sql ??= postgres(url, { max: 1, ssl: url.includes("localhost") ? false : "require" });
  return sql;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const conn = db();
  if (!conn) {
    return Response.json({ error: "Reports aren't open yet. The dataset still updates from public registries." }, { status: 503 });
  }
  let b: Record<string, unknown>;
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const accountId = str(b.accountId, 64);
  const kind = str(b.kind, 16);
  const reportType = str(b.reportType, 16);
  const poiId = str(b.poiId, 24) || null;
  const businessName = str(b.businessName, 120) || null;
  const city = str(b.city, 60) || null;
  const zip = str(b.zip, 5) || null;
  const includes = str(b.includes, 120) || null;
  const note = str(b.note, 500) || null;
  const monthlyUsd = typeof b.monthlyUsd === "number" && Number.isFinite(b.monthlyUsd) ? Math.round(b.monthlyUsd) : null;

  if (!accountId || !KINDS.has(kind) || !TYPES.has(reportType)) {
    return Response.json({ error: "Missing fields." }, { status: 400 });
  }
  if (!poiId && !businessName) {
    return Response.json({ error: "Name the business." }, { status: 400 });
  }
  if (zip && !/^\d{5}$/.test(zip)) {
    return Response.json({ error: "Zip must be 5 digits." }, { status: 400 });
  }
  if (reportType === "price" && (monthlyUsd === null || monthlyUsd < 0 || monthlyUsd >= 10000)) {
    return Response.json({ error: "Enter a monthly price under $10,000." }, { status: 400 });
  }
  if (PII.test(`${note ?? ""} ${includes ?? ""} ${businessName ?? ""}`)) {
    return Response.json({ error: "Leave out emails and phone numbers." }, { status: 400 });
  }

  try {
    await conn`
      insert into nearme_submissions
        (id, created_at, account_id, kind, poi_id, business_name, city, zip, report_type, monthly_usd, includes, note, status)
      values
        (${crypto.randomUUID()}, ${new Date().toISOString()}, ${accountId}, ${kind}, ${poiId}, ${businessName}, ${city}, ${zip},
         ${reportType}, ${monthlyUsd}, ${includes}, ${note}, 'pending')`;
  } catch {
    return Response.json({ error: "Couldn't save that. Try again shortly." }, { status: 502 });
  }
  return Response.json({ ok: true, status: "pending" }, { status: 202 });
}
