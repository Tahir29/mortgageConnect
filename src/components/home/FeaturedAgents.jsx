"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";
import { agents } from "@/lib/helper";
import AgentCard from "../common/AgentCard";

const FEATURED_COUNT = 8;
const featured = agents.slice(0, FEATURED_COUNT);

export default function FeaturedAgents() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, isMobile, reduceMotion } = ctx.conditions;

          // Reduced motion keeps the layout but skips the choreography. The
          // desktop track stays scrollable by hand via overflow-x.
          if (reduceMotion) return;

          const header = root.current.querySelector("[data-agents-header]");
          const viewport = root.current.querySelector("[data-agents-viewport]");
          const track = root.current.querySelector("[data-agents-track]");
          const cards = gsap.utils.toArray("[data-agent-card]", root.current);

          if (isDesktop) {
            gsap.from(header, {
              autoAlpha: 0,
              y: 30,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: root.current, start: "top 75%" },
            });

            // Horizontal travel is measured, not guessed, so it works for any
            // number of cards and re-measures on resize.
            const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top top+=72", // clear the fixed header
                // The extra 500px holds the pin after the track finishes, so
                // the last cards come to rest and can actually be clicked
                // rather than sliding out from under the cursor.
                end: () => "+=" + (distance() + 500),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            return;
          }

          if (isMobile) {
            // No pinning on a phone. Cards stack vertically and each lifts in
            // as it arrives.
            gsap.from(header, {
              autoAlpha: 0,
              y: 30,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: root.current, start: "top 80%" },
            });

            ScrollTrigger.batch(cards, {
              start: "top 88%",
              once: true,
              onEnter: (batch) =>
                gsap.from(batch, {
                  autoAlpha: 0,
                  y: 48,
                  duration: 0.6,
                  ease: "power2.out",
                  stagger: 0.12,
                }),
            });
          }
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-padding bg-white">
      <div className="container-site">
        <div
          data-agents-header
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="gold-rule mb-4" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Meet the Experts</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">Featured Agents</h2>
            <p className="mt-3 text-gray-500 max-w-md text-base leading-relaxed">
              Handpicked professionals with proven track records across the UAE.
            </p>
          </div>
          <Link href="/our-agents" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-foreground text-foreground text-sm font-semibold shrink-0 hover:bg-foreground hover:text-white transition-all duration-300">
            View All Agents
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/*
          One markup, two layouts: a stacked grid up to lg, a horizontal track
          above it. `display: flex` at lg simply supersedes the grid, so no
          !important is needed — the grid-template rules just stop applying.
        */}
        <div data-agents-viewport className="lg:overflow-hidden">
          <div
            data-agents-track
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:flex lg:flex-row lg:w-max"
          >
            {featured.map((agent, i) => (
              // GSAP animates this wrapper rather than AgentCard itself, whose
              // own CSS transition would otherwise fight the tween.
              <div key={agent.id} data-agent-card className="shrink-0 lg:w-90">
                <AgentCard agent={agent} index={i} visible />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
