"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WaIcon } from "@/lib/helper";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/ctaBanner-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-foreground/88" />
        <div className="absolute inset-0 bg-linear-to-r from-foreground via-foreground/80 to-foreground" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-75 rounded-full opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #C9A84C 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-site relative z-10 text-center">
        <div className={visible
          ? "opacity-100 translate-y-0 transition-all duration-700"
          : "opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-semibold text-white leading-tight max-w-3xl mx-auto">
            Ready to Find Your{" "}
            <span className="text-accent">Perfect</span>
            <br />
            Mortgage Agent?
          </h2>
          <p className="mt-6 text-white/55 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Join thousands of UAE residents who found their trusted mortgage professional through our platform — completely free, no sign-up required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <Link
              href="/our-agents"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-foreground font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.25)] hover:bg-brand-gold-light hover:shadow-[0_4px_36px_rgba(201,168,76,0.6)] transition-all duration-300"
            >
              Browse All Agents
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-sm tracking-wide hover:border-white/60 hover:bg-white/8 transition-all duration-300"
            >
              <WaIcon />
              WhatsApp Us Now
            </a>
          </div>
          <p className="mt-8 text-white/30 text-xs tracking-widest uppercase">Free to use · No registration · Instant access</p>
        </div>
      </div>
    </section>
  );
}
