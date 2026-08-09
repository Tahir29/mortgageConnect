"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Keeps ScrollTrigger in step with Lenis.
 *
 * Rendered *inside* ReactLenis so it can read the instance through
 * `useLenis()`. That matters: ReactLenis constructs Lenis in an effect and
 * holds it in state, so a ref read from the parent is still undefined on the
 * first commit. Reading it from context instead means this wires up as soon as
 * the instance exists, and re-wires if it is ever recreated.
 *
 * ScrollTrigger updates on Lenis' scroll event rather than the browser's,
 * because Lenis moves the page on its own schedule — left on native events,
 * ScrollTrigger reads stale positions and pinned sections drift.
 */
function LenisScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const update = () => ScrollTrigger.update();
    lenis.on("scroll", update);

    // Stop GSAP skipping time after a slow frame, which would let the two
    // drift apart mid-scroll.
    gsap.ticker.lagSmoothing(0);

    // Trigger positions are first measured before webfonts and images settle.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", update);
      gsap.ticker.lagSmoothing(500, 33); // GSAP's default
    };
  }, [lenis]);

  return null;
}

/**
 * Site-wide smooth scrolling.
 *
 * Mounted once in the root layout so every page inherits it, and so other
 * components can reach the instance with `useLenis()`.
 *
 * Lenis drives its own rAF loop (`autoRaf` left on). Handing that job to
 * GSAP's ticker is the tighter integration, but it makes scrolling itself
 * depend on the bridge being wired — and when that failed, the page could not
 * be scrolled by wheel at all. Self-driving means scrolling always works even
 * if the GSAP side never initialises.
 *
 * Notes on the options:
 *  - `lerp` controls how closely the viewport follows the wheel. Lower is
 *    smoother but laggier; this sits deliberately on the responsive side
 *    because the site is a comparison tool, not a showcase.
 *  - Touch devices are left on native scrolling. Interpolating momentum
 *    scroll on a phone fights the platform and would interfere with the
 *    mobile filter sheet.
 */
export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        wheelMultiplier: 1,
        smoothWheel: true,
        // Native scrolling on touch — see note above.
        syncTouch: false,
        touchMultiplier: 1.5,
        // Falls back to native scrolling when the OS asks for reduced motion.
        // Stated explicitly rather than relying on the default, since this is
        // the accessibility contract for the whole site's scrolling.
        respectReducedMotion: true,
        // In-page anchor links go through Lenis instead of jumping, now that
        // `scroll-behavior: smooth` has been removed from globals.css.
        anchors: true,
      }}
    >
      <LenisScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
