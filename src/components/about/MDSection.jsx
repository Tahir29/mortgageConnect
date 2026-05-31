"use client";

import { Quote } from "lucide-react";
import { useVisible } from "@/hooks/useVisible";

export default function MDSection() {
  const [ref, visible] = useVisible(0.1);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700" : "opacity-0 -translate-y-10 transition-all duration-700"}>
            <div className="relative">
              {/* Gold frame decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-accent/20" />
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(10,22,40,0.15)]">
                <img
                  src="/images/Ehsan-Jamshidzadeh.jpg"
                  alt="Ehsan Jamshidzadeh — Managing Director"
                  className="w-full object-cover object-top aspect-4/5"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div className="hidden w-full aspect-4/5 bg-foreground items-center justify-center">
                  <span className="text-accent font-display text-6xl font-bold">EJ</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-accent text-foreground px-5 py-3 rounded-2xl shadow-[0_8px_24px_rgba(201,168,76,0.4)]">
                <p className="font-bold text-sm">Managing Director</p>
                <p className="text-[10px] font-medium opacity-80 tracking-wide">Mortgage Connect UAE</p>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className={visible ? "opacity-100 translate-y-0 transition-all duration-700 delay-100" : "opacity-0 translate-y-10 transition-all duration-700 delay-100"}>
            <div className="gold-rule mb-5" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">MD Speaks</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight mb-6">
              Ehsan Jamshidzadeh
            </h2>

            {/* Quote block */}
            <div className="relative pl-6 mb-8 border-l-2 border-accent">
              <Quote size={28} className="text-accent/20 absolute -top-2 -left-1" />
              <p className="text-foreground text-lg font-display font-medium leading-relaxed italic">
                "Mortgage Connect UAE is not a brokerage — it's an identity and selection platform, allowing the market to operate with clarity, trust, and accountability."
              </p>
            </div>

            <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
              <p>
                Ehsan is the Managing Director of Mortgage Connect UAE, the first-of-its-kind mortgage marketplace platform in the UAE designed to give a professional identity and visibility to genuine, registered mortgage brokers operating in the market.
              </p>
              <p>
                With deep insight into the UAE mortgage ecosystem, Ehsan identified a critical gap: clients had no transparent way to identify, compare, or choose mortgage brokers based on credibility, experience, and real feedback.
              </p>
              <p>
                Under his leadership, Mortgage Connect UAE has been positioned as the first platform in the UAE that brings multiple verified mortgage brokers onto a single, structured digital marketplace — enabling clients to choose their preferred mortgage broker independently, review broker profiles, and engage only with registered, genuine, and compliant brokers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {["Transparency", "Trust", "Zero Fees", "UAE-Focused"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-xs font-semibold bg-foreground/5 text-foreground border border-foreground/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}