import Link from "next/link";
import { MorseSOS } from "@/components/MorseSOS";
import { articles } from "@/lib/articles";
import { liveTools } from "@/lib/tools";

/**
 * The signal rail: what this site is, in instrument voice. Figures come from
 * the article and tool data at build time; the promise is copy. The homepage
 * shows it under the hero; the hub pages close with it so the trust line is
 * on the page a search visitor lands on.
 */
export function SignalRail({ className }: { className?: string }) {
  return (
    <div className={["sos-home__rail", className].filter(Boolean).join(" ")}>
      <MorseSOS />
      <span>
        <b>{articles.length}</b>{" "}
        articles, every claim graded
      </span>
      <span>
        <b>{liveTools.length}</b>{" "}
        private tools, nothing leaves your browser
      </span>
      <span className="sos-home__rail-note">
        Nothing sold, no supplements, ever. Every source named, every
        referral fee disclosed.{" "}
        <Link href="/methodology" className="sos-home__more">
          The standard →
        </Link>
      </span>
    </div>
  );
}
