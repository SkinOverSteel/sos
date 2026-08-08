/**
 * Liveness endpoint for uptime monitors.
 * Returns 200 + JSON so a monitor pings a real app signal, not just the
 * homepage HTML. Deliberately dynamic (never cached) so each ping executes.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      status: "ok",
      service: "skinoversteel",
      env: process.env.VERCEL_ENV ?? "development",
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local",
      region: process.env.VERCEL_REGION ?? null,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: { "Cache-Control": "no-store, must-revalidate" },
    },
  );
}
