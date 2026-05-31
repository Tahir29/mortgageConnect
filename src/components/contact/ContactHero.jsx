"use client";

import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="relative h-[70vh] md:h-[45vh] min-h-90 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/50" />
        <div
          className="absolute -top-20 -right-20 w-100 h-100 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #060e1f, transparent)" }}
        />
      </div>

      <div className="container-site relative z-10 pt-24">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <span>/</span>
            <span className="text-accent">Contact Us</span>
          </div>
          <div className="gold-rule mb-5" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Get In Touch</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight">
            We&apos;re Here to{" "}
            <span className="text-accent">Help You</span>
          </h1>
          <p className="mt-4 text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
            Have a question about mortgage options, agents, or our platform? Reach out — our team typically responds within a few hours.
          </p>
        </div>
      </div>
    </section>
  );
}
