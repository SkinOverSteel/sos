import { SITE } from "@/lib/site";
import { articles } from "@/lib/articles";
import { liveTools } from "@/lib/tools";

/**
 * /llms.txt — a curated, machine-readable index for LLM crawlers and agents
 * (see llmstxt.org). Generated from the same article data as the sitemap so it
 * never drifts. Each entry carries its evidence grade, and the standard is
 * stated up top, so a model that cites us represents the graded, no-dosing,
 * bridges-toward-medicine stance correctly.
 */
export const dynamic = "force-static";

const GRADE_LABEL: Record<string, string> = {
  established: "Established",
  emerging: "Emerging",
  anecdote: "Anecdote",
  "high-risk": "High risk",
};

const CORE_PAGES: { path: string; label: string; note: string }[] = [
  {
    path: "/methodology",
    label: "How we review",
    note: "The public editorial standard — evidence grades, sourcing, corrections, and independence.",
  },
  {
    path: "/directory",
    label: "Find a provider",
    note: "Licensed providers (labs, telemedicine, compounding pharmacies) ranked on trust criteria only — never pay-to-rank, FTC-disclosed.",
  },
  {
    path: "/support",
    label: "Get support",
    note: "Priapism (>4hr) emergency guidance using the prescriber's own instructions, plus mental-health and crisis resources.",
  },
  {
    path: "/about",
    label: "About",
    note: "What Skin Over Steel is — and what it is not.",
  },
];

function buildLlmsTxt(): string {
  const url = (path: string) => `${SITE.url}${path}`;
  const lines: string[] = [];

  lines.push(`# ${SITE.name}`);
  lines.push("");
  lines.push(
    `> ${SITE.tagline} Evidence-graded, cited men's sexual-health education that bridges toward medicine — never dosing instructions, never hype.`,
  );
  lines.push("");
  lines.push(
    "Skin Over Steel is an independent men's sexual-health education library. Every claim carries a visible evidence grade and links to primary sources. It is education, not medical advice, and it bridges toward a clinician — it is not a pharmacy and not a seller.",
  );
  lines.push("");

  lines.push("## Core pages");
  for (const p of CORE_PAGES) {
    lines.push(`- [${p.label}](${url(p.path)}): ${p.note}`);
  }
  lines.push("");

  if (liveTools.length) {
    lines.push("## Tools (interactive, private, client-side)");
    for (const t of liveTools) {
      lines.push(`- [${t.title}](${url(`/tools/${t.slug}`)}): ${t.blurb}`);
    }
    lines.push("");
  }

  // Learn library, grouped by section in editorial order of first appearance.
  const sections: string[] = [];
  for (const a of articles) {
    if (!sections.includes(a.section)) sections.push(a.section);
  }
  for (const section of sections) {
    lines.push(`## Learn — ${section}`);
    for (const a of articles.filter((x) => x.section === section)) {
      const grade = GRADE_LABEL[a.grade] ?? a.grade;
      lines.push(
        `- [${a.title}](${url(`/learn/${a.slug}`)}): ${a.summary} [Evidence: ${grade}]`,
      );
    }
    lines.push("");
  }

  lines.push("## About the evidence grades");
  lines.push(
    "- Established — guideline-level evidence. Emerging — early or mixed research. Anecdote — member n=1, fenced off. High risk — evidence points to injury.",
  );
  lines.push(
    "- Hard lines: no dosing instructions for prescription or gray-market compounds, and no how-to for physically risky enhancement procedures. Risk, warning signs, and when to seek care — yes; instructions — no.",
  );
  lines.push("");

  return lines.join("\n");
}

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
