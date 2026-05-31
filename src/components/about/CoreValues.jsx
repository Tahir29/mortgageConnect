"use client";

import { ShieldCheck, Zap, MapPin, BadgeDollarSign } from "lucide-react";
import { useVisible } from "@/hooks/useVisible";

const values = [
  { icon: ShieldCheck, title: "Verified Agents", description: "Every professional is screened and approved before listing — you only deal with trusted, compliant brokers." },
  { icon: Zap, title: "Instant Contact", description: "Call or WhatsApp any agent directly from their profile. No forms, no delays, no middlemen." },
  { icon: MapPin, title: "Wide Coverage", description: "Agents across all seven emirates — Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah and UAQ." },
  { icon: BadgeDollarSign, title: "Zero Fees", description: "No sign-up, no commission, no hidden charges. The platform is completely free for every borrower." },
];

export default function CoreValues() {
  const [ref, visible] = useVisible(0.15);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-site">

        <div className={visible ? "text-center mb-14 opacity-100 translate-y-0 transition-all duration-700" : "text-center mb-14 opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">What We Stand For</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">Our Core Values</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">
            Everything we build is guided by these four principles — they&apos;re not just words, they&apos;re our operating standard.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={visible
                  ? "group flex flex-col p-8 rounded-3xl border-2 border-gray-100 hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(10,22,40,0.10)] transition-all duration-300 opacity-100 translate-y-0"
                  : "group flex flex-col p-8 rounded-3xl border-2 border-gray-100 transition-all duration-300 opacity-0 translate-y-10"}
              >
                <div className="w-14 h-14 rounded-2xl bg-foreground group-hover:bg-accent transition-colors duration-300 flex items-center justify-center mb-6">
                  <Icon size={24} className="text-accent group-hover:text-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{val.description}</p>
                <div className="mt-6 h-0.5 w-8 bg-accent rounded-full group-hover:w-16 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}