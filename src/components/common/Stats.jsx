"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const stats = [
  { value: 5, suffix: "+", label: "Verified Agents" },
  { value: 7,   suffix: "",  label: "Emirates Covered" },
  { value: 10,  suffix: "+", label: "Partner Banks" },
  { value: 98,  suffix: "%", label: "Client Satisfaction" },
];

export default function Stats() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Under reduced motion nothing runs, and the markup already carries the
      // real figures — so the numbers are simply correct rather than stuck at 0.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counters = gsap.utils.toArray("[data-stat-value]", root.current);

        counters.forEach((el, i) => {
          const target = Number(el.dataset.statTarget);
          const counter = { value: 0 };

          gsap.to(counter, {
            value: target,
            // Was 2s, which had finished being interesting long before it
            // finished counting.
            duration: 1.1,
            ease: "power2.out",
            delay: i * 0.08,
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
            scrollTrigger: {
              trigger: root.current,
              start: "top 82%",
              once: true,
              // Reset to zero only as the band is reached, so a no-JS or
              // pre-hydration render never shows a 0.
              onEnter: () => {
                el.textContent = "0";
              },
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-foreground relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/60" />
        <div className="absolute inset-0 bg-linear-to-r from-[#060e1f]/80 via-transparent to-[#060e1f]/40" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="container-site py-14 z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:divide-x md:divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4">
              <span className="text-3xl md:text-4xl font-bold font-display text-accent tabular-nums">
                {/* Rendered at its real value; GSAP zeroes it on enter and
                    counts up, so crawlers and no-JS visitors see the figure. */}
                <span data-stat-value data-stat-target={stat.value}>{stat.value}</span>
                {stat.suffix}
              </span>
              <span className="text-white/50 text-xs md:text-sm mt-1.5 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
