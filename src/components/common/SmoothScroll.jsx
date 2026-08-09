"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Site-wide smooth scrolling, and the bridge between Lenis and ScrollTrigger.
 *
 * Mounted once in the root layout so every page inherits it, and so other
 * components can reach the instance with `useLenis()`.
 *
 * The two libraries have to share a clock. Left alone, Lenis runs its own rAF
 * loop and ScrollTrigger runs off native scroll events; because Lenis moves the
 * page on its own schedule, ScrollTrigger reads stale positions and pinned
 * sections visibly jitter. So:
 *
 *   - `autoRaf: false` stops Lenis driving itself,
 *   - GSAP's ticker drives `lenis.raf` instead, so both advance on one frame,
 *   - `ScrollTrigger.update` runs on Lenis' scroll event rather than the
 *     browser's, so triggers evaluate against the interpolated position,
 *   - `lagSmoothing(0)` stops GSAP skipping time after a slow frame, which
 *     would otherwise desync the two.
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
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const drive = (time) => lenis.raf(time * 1000); // GSAP ticker is in seconds
    gsap.ticker.add(drive);
    gsap.ticker.lagSmoothing(0);

    // Positions are measured before webfonts and images settle, which would
    // otherwise leave every trigger a few pixels off.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(drive);
      gsap.ticker.lagSmoothing(500, 33); // restore GSAP's default
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.12,
        wheelMultiplier: 1,
        smoothWheel: true,
        // Driven by GSAP's ticker instead — see above.
        autoRaf: false,
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
      {children}
    </ReactLenis>
  );
}
