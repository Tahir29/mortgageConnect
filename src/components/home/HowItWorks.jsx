"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Search, LayoutList, MessageCircle, FileCheck } from "lucide-react";

const steps = [
  { icon: Search, title: "Search", description: "Filter agents by area, expertise, or language — find exactly who you need in seconds." },
  { icon: LayoutList, title: "Browse Profiles", description: "Review experience, languages, specialties, and ratings to shortlist the right professional." },
  { icon: MessageCircle, title: "Connect Instantly", description: "Reach out directly via WhatsApp or phone — no middleman, no waiting, no fees." },
  { icon: FileCheck, title: "Proceed", description: "Work directly with your chosen agent and move forward with your mortgage application confidently." },
];

export default function HowItWorks() {
  const root = useRef(null);

  useGSAP(
    () => {
      // Markup renders fully visible; GSAP sets the hidden start state at
      // runtime. If JS never runs, the content is still readable rather than
      // stranded at opacity-0.
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, isMobile, reduceMotion } = ctx.conditions;

          // Honour the OS preference: no motion, nothing hidden.
          if (reduceMotion) return;

          const header = root.current.querySelector("[data-hiw-header]");
          const line = root.current.querySelector("[data-hiw-line]");
          const stepEls = gsap.utils.toArray("[data-hiw-step]", root.current);

          if (isDesktop) {
            // Pinned: the section holds while the process plays out, so the
            // four steps are read in order rather than landing all at once.
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: root.current,
                start: "top top+=72", // clear the fixed header
                end: "+=1100",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            tl.from(header, { autoAlpha: 0, y: 40, duration: 1 })
              .from(line, { scaleX: 0, transformOrigin: "left center", duration: 3 }, 0.6)
              .from(
                stepEls,
                { autoAlpha: 0, y: 60, scale: 0.94, duration: 1.6, stagger: 1.1 },
                0.8
              )
              // Empty tween holding the finished state. Without it the last
              // step lands exactly as the pin releases, so the section is
              // whipped away the instant it completes. Steps now finish around
              // 88% of the pin, leaving a beat to read them.
              .to({}, { duration: 0.8 });

            return; // matchMedia reverts this context automatically
          }

          if (isMobile) {
            // No pinning on a phone — pinned sections fight momentum scroll.
            // Just a sequenced reveal as each part arrives.
            gsap.from(header, {
              autoAlpha: 0,
              y: 30,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: header, start: "top 85%" },
            });

            gsap.from(stepEls, {
              autoAlpha: 0,
              y: 40,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: { trigger: stepEls[0], start: "top 85%" },
            });
          }
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-padding bg-brand-cream overflow-hidden">
      <div className="container-site">

        {/* Header */}
        <div data-hiw-header className="text-center mb-16">
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Simple Process</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">How It Works</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From search to application — the entire process is transparent, fast, and completely free.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line desktop — drawn left to right as the section plays */}
          <div
            data-hiw-line
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-accent/30 to-transparent z-0"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                data-hiw-step
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border-2 border-accent/20 group-hover:border-accent/60 transition-all duration-300 flex items-center justify-center bg-white shadow-[0_4px_24px_rgba(10,22,40,0.08)]">
                    <div className="w-16 h-16 rounded-full bg-foreground group-hover:bg-accent transition-all duration-300 flex items-center justify-center">
                      <Icon size={24} className="text-accent group-hover:text-foreground transition-colors duration-300" />
                    </div>
                  </div>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent text-foreground text-[11px] font-bold flex items-center justify-center shadow-[0_4px_24px_rgba(201,168,76,0.25)]">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-50">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
