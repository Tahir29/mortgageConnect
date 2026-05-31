"use client";

import { Target, Eye } from "lucide-react";
import { useVisible } from "@/hooks/useVisible";

export default function MissionVision() {
  const [ref, visible] = useVisible(0.15);

  return (
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">
        <div className={visible ? "text-center mb-14 opacity-100 translate-y-0 transition-all duration-700" : "text-center mb-14 opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">What Drives Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
            Our Mission &amp; Vision
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div
            style={{ transitionDelay: "0ms" }}
            className={visible ? "group relative bg-foreground rounded-3xl p-10 overflow-hidden opacity-100 translate-y-0 transition-all duration-700" : "group relative bg-foreground rounded-3xl p-10 overflow-hidden opacity-0 translate-y-10 transition-all duration-700"}
          >
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
            />
            <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/25 flex items-center justify-center mb-7">
              <Target size={26} className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-white/55 text-base leading-relaxed">
              To streamline the home-financing journey by connecting individuals and families with top-tier mortgage experts — instantly, transparently, and free of charge. We eliminate confusion and create a marketplace where quality speaks for itself.
            </p>
            <div className="mt-8 h-px bg-linear-to-r from-accent/40 to-transparent" />
            <p className="mt-6 text-accent text-xs font-semibold tracking-widest uppercase">Driven by transparency</p>
          </div>

          {/* Vision */}
          <div
            style={{ transitionDelay: "120ms" }}
            className={visible ? "group relative bg-white rounded-3xl p-10 border border-gray-100 shadow-[0_4px_24px_rgba(10,22,40,0.08)] overflow-hidden opacity-100 translate-y-0 transition-all duration-700" : "group relative bg-white rounded-3xl p-10 border border-gray-100 overflow-hidden opacity-0 translate-y-10 transition-all duration-700"}
          >
            <div
              className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-5 pointer-events-none"
              style={{ background: "radial-gradient(circle, #0A1628 0%, transparent 70%)" }}
            />
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-7">
              <Eye size={26} className="text-accent" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Our Vision</h3>
            <p className="text-gray-500 text-base leading-relaxed">
              A UAE where every homebuyer has fast, honest access to the right broker — so that dreams of homeownership become reality without stress or delay. We envision a mortgage ecosystem built on trust, recognition, and empowerment.
            </p>
            <div className="mt-8 h-px bg-linear-to-r from-accent/40 to-transparent" />
            <p className="mt-6 text-accent text-xs font-semibold tracking-widest uppercase">Powered by trust</p>
          </div>
        </div>
      </div>
    </section>
  );
}