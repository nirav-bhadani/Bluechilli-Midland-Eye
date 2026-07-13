"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Site-wide smooth scrolling (Lenis) — headless, no layout wrapper. Disabled
 * when the user prefers reduced motion. Add `data-lenis-prevent` to any inner
 * scroll area (modals, menus) to keep native scrolling there.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
