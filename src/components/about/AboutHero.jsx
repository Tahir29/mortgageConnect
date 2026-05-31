"use client";

import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative h-[80vh] md:h-[55vh] min-h-105 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/40" />
        <div
          className="absolute top-0 right-0 w-125 h-125 rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
        />
      </div>

      <div className="container-site relative z-10 pt-24">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-accent transition-colors duration-200">Home</Link>
            <span>/</span>
            <span className="text-accent">About Us</span>
          </div>
          <div className="gold-rule mb-5" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold text-white leading-tight max-w-2xl">
            Building Trust in UAE&apos;s{" "}
            <span className="text-accent">Mortgage Market</span>
          </h1>
          <p className="mt-5 text-white/55 text-base md:text-lg max-w-xl leading-relaxed">
            We created Mortgage Connect because finding the right mortgage advisor in the UAE should be simple, transparent, and completely free.
          </p>
        </div>
      </div>
    </section>
  );
}
