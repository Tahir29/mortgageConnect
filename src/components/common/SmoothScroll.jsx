"use client";

import { ReactLenis } from "lenis/react";

/**
 * Site-wide smooth scrolling.
 *
 * Mounted once in the root layout so every page inherits it, and so other
 * components can reach the instance with `useLenis()` rather than each
 * managing their own scrolling.
 *
 * Notes on the options:
 *  - `lerp` controls how closely the viewport follows the wheel. Lower is
 *    smoother but laggier; this sits deliberately on the responsive side
 *    because the site is a comparison tool, not a showcase.
 *  - Touch devices are left on native scrolling. Interpolating momentum
 *    scroll on a phone fights the platform and feels broken, and it would
 *    also interfere with the mobile filter sheet.
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
      {children}
    </ReactLenis>
  );
}
