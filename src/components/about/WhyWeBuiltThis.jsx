"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useVisible } from "@/hooks/useVisible";

export default function WhyWeBuiltThis() {
  const [ref, visible] = useVisible(0.1);

  return (
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Images collage */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 -translate-y-10 transition-all duration-700"}>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/images/about/whyWeBuilt1.jpg"
                alt="Dubai real estate"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg"
              />
              <img
                src="/images/about/whyWeBuilt2.jpg"
                alt="UAE skyline"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg mt-8"
              />
              <img
                src="/images/about/whyWeBuilt3.jpg"
                alt="Meeting"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg -mt-8"
              />
              <img
                src="/images/about/whyWeBuilt4.jpg"
                alt="Finance"
                className="rounded-2xl object-cover w-full aspect-square shadow-lg"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700 delay-150" : "opacity-0 translate-y-10 transition-all duration-700 delay-150"}>
            <div className="gold-rule mb-5" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">The Problem We Solve</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-6">
              Why We Built Mortgage Connect
            </h2>
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
              <p>
                The UAE mortgage market has always been fragmented. Clients looking for a mortgage advisor had no structured, transparent way to compare professionals — they relied on word-of-mouth, random referrals, or walking into a bank blind.
              </p>
              <p>
                Mortgage brokers, on the other hand, had no platform to showcase their credentials, build a verified reputation, or reach the right clients at the right time.
              </p>
              <p>
                Mortgage Connect UAE bridges that gap. We are not a brokerage — we are an identity and selection platform that gives brokers a professional presence and gives clients the clarity, choice, and confidence to make the right decision.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "UAE&apos;s first structured mortgage broker marketplace",
                "Verified profiles — only compliant, registered professionals",
                "Direct contact — no commissions, no sign-up required",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-foreground" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-foreground text-sm font-medium" dangerouslySetInnerHTML={{ __html: point }} />
                </div>
              ))}
            </div>

            <Link
              href="/our-agents"
              className="group mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-white font-semibold text-sm tracking-wide hover:bg-brand-navy-light transition-all duration-300"
            >
              Browse Our Agents
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}