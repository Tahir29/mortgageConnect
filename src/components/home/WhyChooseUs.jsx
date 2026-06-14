"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Zap, MapPin, BadgeDollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: ShieldCheck, title: "Verified Agents", description: "Every professional on our platform is screened, verified, and approved before listing. You deal with only trusted experts." },
  { icon: Zap, title: "Instant Contact", description: "Call or WhatsApp directly from any agent profile. No forms, no waiting — connect in seconds." },
  { icon: MapPin, title: "Wide Coverage", description: "Agents across all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ." },
  { icon: BadgeDollarSign, title: "Zero Fees", description: "No sign-up costs, no commission, no middleman. The platform is completely free for borrowers." },
];

const badges = [
  { value: "5+", label: "Active Agents" },
  { value: "7", label: "Emirates" },
  { value: "Free", label: "Always" },
];

export default function WhyChooseUs() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-foreground overflow-hidden relative">
      <div
        className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className={visible ? "opacity-100 translate-x-0 transition-all duration-700" : "opacity-0 -translate-x-10 transition-all duration-700"}>
            <div className="gold-rule mb-4" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Why Mortgage Connect</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
              The Smarter Way to Find a{" "}
              <span className="text-accent">Mortgage Expert</span>
            </h2>
            <p className="mt-6 text-white/50 text-base leading-relaxed max-w-md">
              We built Mortgage Connect because finding a reliable, commission-free mortgage advisor in the UAE shouldn&apos;t be complicated. It should be instant, transparent, and free.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              {badges.map((badge) => (
                <div key={badge.label} className="flex flex-col items-center px-6 py-4 rounded-2xl border border-white/10 bg-white/5 min-w-[90px]">
                  <span className="text-2xl font-bold font-display text-accent">{badge.value}</span>
                  <span className="text-white/40 text-xs mt-1">{badge.label}</span>
                </div>
              ))}
            </div>
            <Link
              href="/our-agents"
              className="group mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-foreground font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.25)] hover:bg-brand-gold-light hover:shadow-[0_4px_36px_rgba(201,168,76,0.5)] transition-all duration-300"
            >
              Get Started — It&apos;s Free
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  style={{ transitionDelay: `${i * 100}ms` }}
                  className={visible
                    ? "group flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 opacity-100 translate-x-0"
                    : "group flex items-start gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 opacity-0 translate-x-10"}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 group-hover:bg-accent/25 transition-colors duration-300">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
