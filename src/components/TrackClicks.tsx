"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * One delegated click listener for the whole app. Any element carrying
 * `data-track="event_name"` reports that event when clicked, with its other
 * `data-track-*` attributes as properties. Server components opt a link in by
 * adding attributes; nothing else needs to become a client component.
 *
 * What may be tracked: navigation clicks only, with properties that describe
 * the link (which surface, which listing). Never anything a member typed.
 * The Log and the appointment sheet promise that nothing is sent, so nothing
 * inside them carries `data-track`.
 */
export function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("[data-track]") as HTMLElement | null;
      if (!el) return;
      const name = el.dataset.track;
      if (!name) return;
      const props: Record<string, string> = { page: window.location.pathname };
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k !== "track" && k.startsWith("track") && v != null) {
          props[k.slice(5).toLowerCase()] = v;
        }
      }
      track(name, props);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
