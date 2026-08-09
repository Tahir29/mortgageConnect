"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Single registration point for GSAP plugins.
 *
 * Components import gsap and ScrollTrigger from here rather than from the
 * package directly, so registration is guaranteed to have happened before any
 * animation code runs, regardless of module evaluation order.
 *
 * `registerPlugin` is idempotent, so importing this from many components is
 * safe.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
