/**
 * Newsletter / waitlist signup -> Buttondown.
 *
 * The API key is read server-side only (never shipped to the client). Buttondown's
 * default double opt-in is left ON: the subscriber gets a confirmation email and
 * stays `unactivated` until they click it. That's the honest, consented way to
 * build a list, and it means a stray POST can't silently add someone.
 *
 * Enable by setting BUTTONDOWN_API_KEY in the environment. The homepage form only
 * renders when the key is present (see src/app/page.tsx), so with no key this route
 * is never called in normal use; the 503 below is just belt-and-suspenders.
 */
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    return Response.json({ error: "Signup isn't configured yet." }, { status: 503 });
  }

  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${key}`,
        "Content-Type": "application/json",
      },
      // No `type: "regular"` -> keep Buttondown's double opt-in (confirmation email).
      body: JSON.stringify({ email_address: email }),
    });
  } catch {
    return Response.json(
      { error: "Couldn't reach the list. Try again shortly." },
      { status: 502 },
    );
  }

  if (res.ok) {
    return Response.json({ ok: true }, { status: 200 });
  }

  // An already-subscribed address is a success from the visitor's point of view.
  let detail = "";
  try {
    const err = await res.json();
    detail = String(err?.code ?? err?.detail ?? "");
  } catch {
    /* non-JSON error body */
  }
  if (res.status === 400 && /already|exists|subscribed/i.test(detail)) {
    return Response.json({ ok: true, already: true }, { status: 200 });
  }

  return Response.json(
    { error: "Couldn't add you right now. Try again shortly." },
    { status: 502 },
  );
}
