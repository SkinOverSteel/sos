"use client";

import { useEffect, useRef } from "react";

/**
 * A thin copper line at the top of the viewport that tracks how far down the
 * page the reader has scrolled. Writes the 0–1 fraction to a CSS custom
 * property (--p) that globals.css turns into a scaleX, so the paint stays off
 * the main thread. The global prefers-reduced-motion rule drops the easing;
 * the bar itself is a quiet progress cue, not motion for its own sake.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="sos-progress" aria-hidden="true" />;
}
