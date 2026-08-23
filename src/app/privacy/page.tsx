import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Skin Over Steel collects, and what it doesn't. The self-check tools run entirely in your browser; we set no tracking cookies and sell nothing; the only personal data we hold is an email you give us for the waitlist.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "August 22, 2026";
const CONTACT = "privacy@skinoversteel.com";

export default function PrivacyPage() {
  return (
    <div className="sos-container">
      <p className="sos-kicker" style={{ marginBottom: "14px" }}>
        Privacy
      </p>
      <h1 className="sos-h1" style={{ marginBottom: "16px" }}>
        What we collect, and what we don&apos;t
      </h1>
      <p className="sos-note" style={{ marginBottom: "32px" }}>
        Skin Over Steel&apos;s privacy policy. Last updated {UPDATED}.
      </p>

      <div className="sos-card sos-card--deep" style={{ marginBottom: "8px" }}>
        <p className="sos-prose" style={{ fontSize: "16px" }}>
          The short version: the self-check tools run entirely in your browser, so
          your answers never reach us. We set no advertising or tracking cookies,
          and we sell nothing. The only personal information we hold is your email
          address, and only if you hand it to us to join the waitlist.
        </p>
      </div>

      <Section title="The tools never send us your answers">
        <p className="sos-prose">
          The erectile-function self-check and the free-testosterone calculator
          run completely in your browser. What you enter stays on your device: it
          is not transmitted to us, logged, or stored, and nothing measures your
          responses. Close the tab and it is gone. If you print or save the
          clinician summary, that copy lives on your device, not ours.
        </p>
      </Section>

      <Section title="The waitlist, and your email">
        <p className="sos-prose">
          If you join the waitlist for The Vault, we collect one thing: the email
          address you enter. We use double opt-in, so you receive a confirmation
          email and are added only once you click it. That keeps anyone else from
          signing you up, which matters on a subject like this one.
        </p>
        <p className="sos-prose" style={{ marginTop: "16px" }}>
          We use your email only to tell you when The Vault opens and to send the
          occasional update. We do not sell, rent, or share your address, and you
          can unsubscribe from any email in one click. The list is handled by{" "}
          <a href="https://buttondown.com" target="_blank" rel="noopener noreferrer">
            Buttondown
          </a>
          , a United States email provider that processes it on our behalf and
          never for their own purposes. Our legal basis is your consent, which you
          can withdraw whenever you like.
        </p>
      </Section>

      <Section title="Analytics and server logs">
        <p className="sos-prose">
          We use privacy-friendly, aggregate analytics (Vercel Analytics) to see
          which pages get read. It is cookieless, it does not follow you across
          other sites, and it does not build a profile of you. Like any website,
          our host also keeps standard server logs, including IP addresses, to run
          and protect the site; those are kept briefly and are not used to
          identify you.
        </p>
      </Section>

      <Section title="Leaving the site: the provider directory">
        <p className="sos-prose">
          When you click through to a lab, pharmacy, or telemedicine provider from
          the directory, you leave Skin Over Steel and land on their site, under
          their privacy practices rather than ours. Some of those links are
          affiliate links, disclosed as such, which may carry a referral tag so
          the provider knows the visit came from us. We send them no information
          about you; the click is simply you visiting them. A paid relationship
          never moves a ranking or an evidence grade.
        </p>
      </Section>

      <Section title="What we do not do">
        <ul className="sos-prose" style={list}>
          <li>We do not sell, rent, or trade your personal information. Ever.</li>
          <li>We set no advertising or cross-site tracking cookies.</li>
          <li>
            We do not collect health information. The tools are built so that we
            could not, even if we wanted to.
          </li>
          <li>We do not buy email lists, or add anyone who did not opt in.</li>
          <li>
            We do not run accounts or a community yet. If that changes, this
            policy will be updated first.
          </li>
        </ul>
      </Section>

      <Section title="Your choices and rights">
        <p className="sos-prose">
          You can unsubscribe from the waitlist at any time using the link in any
          email. You can also ask us to show you, correct, or delete the email we
          hold for you. Write to{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a> and we will take care of it.
          We honor these requests wherever you live, including the access and
          deletion rights under the GDPR (Europe and the UK) and the CCPA/CPRA
          (California).
        </p>
      </Section>

      <Section title="Where your data is handled">
        <p className="sos-prose">
          Skin Over Steel is operated from the United States, and our providers
          (Vercel for hosting and analytics, Buttondown for email) process data in
          the United States. If you sign up from outside the US, you are asking us
          to hold your email here.
        </p>
      </Section>

      <Section title="Age">
        <p className="sos-prose">
          This is adult health education, and it is not directed at anyone under
          18. Please do not submit your email if you are under 18.
        </p>
      </Section>

      <Section title="Changes, and how to reach us">
        <p className="sos-prose">
          If we change this policy, we will update the date at the top and flag
          anything material. Questions about privacy, or a request about your data,
          go to <a href={`mailto:${CONTACT}`}>{CONTACT}</a>; a postal address is
          available on request.
        </p>
      </Section>
    </div>
  );
}

const list: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  fontSize: "16px",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <h2 className="sos-h2" style={{ marginBottom: "16px" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
