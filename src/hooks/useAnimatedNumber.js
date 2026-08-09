"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Eases a number toward its target instead of snapping to it.
 *
 * Used for the calculator's derived figures so a slider drag reads as one
 * connected movement rather than digits strobing at frame rate.
 *
 * While dragging, the target changes faster than the tween completes, so each
 * change re-tweens from wherever the display currently is — the number trails
 * smoothly and settles once the input stops.
 *
 * Returns the target unchanged when the user prefers reduced motion.
 */
export function useAnimatedNumber(target, duration = 400) {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    // Indirect setState so the value is always mirrored into the ref, which is
    // what the next tween starts from.
    const apply = (value) => {
      displayRef.current = value;
      setDisplay(value);
    };

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !Number.isFinite(target)) {
      apply(target);
      return;
    }

    const from = displayRef.current;
    const delta = target - from;

    // Sub-currency-unit differences aren't worth a frame loop.
    if (Math.abs(delta) < 0.5) {
      apply(target);
      return;
    }

    const startedAt = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      apply(progress === 1 ? target : from + delta * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return display;
}
