/**
 * Where the Near Me data shards live.
 *
 * The ETL writes them to public/data/nearme. In production they are served
 * from Vercel Blob under the same relative paths (scripts/upload-nearme-data.mjs
 * uploads them), and NEXT_PUBLIC_NEARME_DATA_BASE points at that store,
 * e.g. https://<store>.public.blob.vercel-storage.com/data/nearme. Unset, the
 * app reads the local copies, so dev and CI keep working without a token.
 *
 * Isomorphic on purpose: the browser and the build both use dataUrl().
 */
export const DATA_BASE = (process.env.NEXT_PUBLIC_NEARME_DATA_BASE ?? "/data/nearme").replace(/\/$/, "");

export function dataUrl(path: string): string {
  return `${DATA_BASE}/${path.replace(/^\//, "")}`;
}

/** Absolute URL for structured-data downloads (relative when served locally). */
export function dataDownloadUrl(siteUrl: string, path: string): string {
  const u = dataUrl(path);
  return u.startsWith("http") ? u : `${siteUrl}${u}`;
}
