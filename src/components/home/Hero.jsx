"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { WaIcon } from "../../lib/helper";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/config";

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        // Entrance. Runs on load rather than on scroll — the hero is already
        // in view, so there is nothing to trigger on.
        const badge = q("[data-hero-badge]");
        const title = q("[data-hero-title]");
        const sub = q("[data-hero-sub]");
        const buttons = q("[data-hero-cta] > *");
        const scrollCue = q("[data-hero-scroll]");
        const underline = q("[data-hero-underline]")[0];

        // Deliberately `set` + `to` with explicit end values rather than
        // `from`. A `from` tween captures the element's current value as its
        // destination, and `ScrollTrigger.refresh()` — fired by the Lenis
        // bridge just after this runs — can invalidate it while it is still
        // sitting at its start state. It then re-records that hidden state as
        // the destination and the element animates from invisible to
        // invisible, which is exactly how the hero buttons disappeared.
        gsap.set([...badge, ...title, ...sub, ...buttons], { autoAlpha: 0, y: 20 });
        gsap.set(badge, { scale: 0.94 });
        gsap.set(scrollCue, { autoAlpha: 0 });

        if (underline) {
          const length = underline.getTotalLength();
          gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to(badge, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6 })
          .to(title, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.35");

        if (underline) {
          tl.to(underline, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.25");
        }

        tl.to(sub, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.5")
          .to(buttons, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.4")
          // 0.4 matches the resting opacity its class already sets.
          .to(scrollCue, { autoAlpha: 0.4, duration: 0.6 }, "-=0.2");

        // Background drifts slower than the content as the hero scrolls away,
        // which is what reads as depth.
        gsap.to(q("[data-hero-bg]"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div
          data-hero-bg
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/60" />
        <div className="absolute inset-0 bg-linear-to-r from-[#060e1f]/80 via-transparent to-[#060e1f]/40" />
        <div
          className="absolute -top-40 -right-40 w-150 h-150 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center container-site pt-28 pb-20 md:pt-40 md:pb-28">

        {/* Badge */}
        <div data-hero-badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-accent/30 bg-accent/10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-medium tracking-widest uppercase">UAE&apos;s Premier Mortgage Platform</span>
        </div>

        {/* Headline */}
        <h1 data-hero-title className="font-display text-center text-white font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl">
          Find Your{" "}
          <span className="relative inline-block">
            <span className="text-accent">Trusted</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
              <path data-hero-underline d="M0 6 Q50 1 100 5 Q150 9 200 4" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </span>{" "}
          <br className="hidden sm:block" />
          Mortgage Agent in UAE
        </h1>

        {/* Subheadline */}
        <p data-hero-sub className="mt-6 text-center text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
          Discover top mortgage professionals across the UAE and connect instantly with experienced local agents — whether you&apos;re buying, refinancing, or exploring loan options.
        </p>

        {/* CTA Buttons */}
        <div data-hero-cta className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link
            href="/our-agents"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-foreground font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.4)] hover:bg-brand-gold-light hover:shadow-[0_4px_36px_rgba(201,168,76,0.6)] transition-all duration-300"
          >
            Browse All Agents
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          >
            <WaIcon />
            Talk to Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div data-hero-scroll className="absolute bottom-10 left-1/2 -translate-x-1/2 md:flex flex-col items-center gap-2 opacity-40 hidden">
          <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-12 bg-white/20 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white to-transparent rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  );
}
