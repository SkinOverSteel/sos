import type { Metadata } from "next";
import { PrepPacketView } from "@/components/PrepPacketView";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clinician Prep Packet — Patient Visit Summary",
  description:
    "Combine your SHIM score, calculated Free/Bioavailable Testosterone, medications, and clinician questions into a private, printable 1-page summary.",
  alternates: { canonical: `${SITE.url}/prep-packet` },
};

export default function PrepPacketPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="no-print mb-8">
        <p className="sos-kicker">Clinician Prep Packet</p>
        <h1 className="text-3xl font-bold tracking-tight mt-1">
          Patient Visit Summary
        </h1>
        <p className="mt-2 text-base opacity-80">
          Your browser-private tools combined into one printable, 1-page
          clinical summary. Nothing is uploaded or stored on any server.
        </p>
      </header>

      <PrepPacketView />
    </main>
  );
}
