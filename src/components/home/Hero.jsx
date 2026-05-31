"use client";

import Link from "next/link";
import { WaIcon } from "../../lib/helper";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div
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
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-accent/30 bg-accent/10 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-medium tracking-widest uppercase">UAE's Premier Mortgage Platform</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-center text-white font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl animate-fade-in-up">
          Find Your{" "}
          <span className="relative inline-block">
            <span className="text-accent">Trusted</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
              <path d="M0 6 Q50 1 100 5 Q150 9 200 4" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>
          </span>{" "}
          <br className="hidden sm:block" />
          Mortgage Agent in UAE
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-center text-white/60 text-base md:text-lg max-w-2xl leading-relaxed animate-fade-in-up animation-delay-200">
          Discover top mortgage professionals across the UAE and connect instantly with experienced local agents — whether you're buying, refinancing, or exploring loan options.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 animate-fade-in-up animation-delay-300">
          <Link
            href="/our-agents"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-foreground font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.4)] hover:bg-brand-gold-light hover:shadow-[0_4px_36px_rgba(201,168,76,0.6)] transition-all duration-300"
          >
            Browse All Agents
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          >
            <WaIcon />
            Talk to Us
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-fade-in animation-delay-700">
          <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-0.5 h-12 bg-white/20 rounded-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-white to-transparent rounded-full animate-scroll-down" />
          </div>
        </div>
      </div>
    </section>
  );
}
