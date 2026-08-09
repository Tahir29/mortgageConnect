"use client";

import { useEffect, useRef, useState } from "react";
import { Search, LayoutList, MessageCircle, FileCheck } from "lucide-react";

const steps = [
  { icon: Search, title: "Search", description: "Filter agents by area, expertise, or language — find exactly who you need in seconds." },
  { icon: LayoutList, title: "Browse Profiles", description: "Review experience, languages, specialties, and ratings to shortlist the right professional." },
  { icon: MessageCircle, title: "Connect Instantly", description: "Reach out directly via WhatsApp or phone — no middleman, no waiting, no fees." },
  { icon: FileCheck, title: "Proceed", description: "Work directly with your chosen agent and move forward with your mortgage application confidently." },
];

export default function HowItWorks() {
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
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">

        {/* Header */}
        <div className={visible ? "text-center mb-16 opacity-100 translate-y-0 transition-all duration-700" : "text-center mb-16 opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Simple Process</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">How It Works</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            From search to application — the entire process is transparent, fast, and completely free.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line desktop */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-linear-to-r from-transparent via-accent/30 to-transparent z-0" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                style={{ transitionDelay: `${i * 120}ms` }}
                className={visible
                  ? "relative z-10 flex flex-col items-center text-center group opacity-100 translate-y-0 transition-all duration-700"
                  : "relative z-10 flex flex-col items-center text-center group opacity-0 translate-y-10 transition-all duration-700"}
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
