"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals a section once it approaches the viewport.
 *
 * Two deliberate behaviours:
 *
 *  - `rootMargin` fires the reveal ~200px *before* the element scrolls into
 *    view, so the entrance has finished by the time the user is looking at it.
 *    Content should never be mid-fade while being read.
 *  - If the user prefers reduced motion, or IntersectionObserver isn't
 *    available, content is shown immediately rather than left at opacity-0
 *    waiting for an animation that will never run.
 */
export function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const reveal = () => setVisible(true);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion) {
      reveal();
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect(); // reveal is one-way; stop observing
        }
      },
      { threshold, rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
