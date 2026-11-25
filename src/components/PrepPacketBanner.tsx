"use client";

import Link from "next/link";

type Props = {
  visible: boolean;
  label?: string;
};

export function PrepPacketBanner({
  visible,
  label = "Added to your Clinician Prep Packet",
}: Props) {
  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="no-print mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-current/20 bg-black/[0.03] px-4 py-3 text-sm"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-2 w-2 rounded-full bg-emerald-600"
        />
        <span>
          <strong>{label}</strong> — saved locally on this device.
        </span>
      </div>
      <Link
        href="/prep-packet"
        className="font-semibold underline underline-offset-4 hover:opacity-80"
      >
        Review or add more items →
      </Link>
    </div>
  );
}
