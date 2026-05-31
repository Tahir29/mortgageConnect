"use client";

import Link from "next/link";
import { ArrowRight, Home, Users, Phone } from "lucide-react";

const quickLinks = [
  { label: "Back to Home", href: "/", icon: Home },
  { label: "Browse Agents", href: "/our-agents", icon: Users },
  { label: "Contact Us", href: "/contact-us", icon: Phone },
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A1628]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-background.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e1f] via-[#0A1628]/90 to-[#0A1628]" />
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
      <div className="relative z-10 container-site flex flex-col items-center text-center px-6 py-24">

        {/* 404 */}
        <div className="animate-fade-in-up">
          <div className="relative mb-6 select-none">
            <span className="font-display font-bold text-[160px] md:text-[220px] leading-none text-white/5 pointer-events-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-7xl md:text-9xl text-white/10 blur-sm">404</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-6xl md:text-8xl text-accent">404</span>
            </div>
          </div>
        </div>

        <div className="gold-rule mx-auto mb-6" />

        <h1 className="font-display text-3xl md:text-5xl font-semibold text-white mb-4 max-w-xl">
          Page Not Found
        </h1>

        <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed mb-12">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-[#0A1628] font-semibold text-sm tracking-wide shadow-[0_4px_24px_rgba(201,168,76,0.35)] hover:bg-brand-gold-light hover:shadow-[0_4px_36px_rgba(201,168,76,0.55)] transition-all duration-300"
          >
            <Home size={15} />
            Go to Homepage
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/our-agents"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            <Users size={15} />
            Browse Agents
          </Link>
        </div>

        {/* Quick links */}
        <div className="w-full max-w-sm">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-5">Or jump to</p>
          <div className="flex flex-col gap-2">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:border-[#C9A84C]/40 hover:bg-white/8 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={14} className="text-accent" />
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                  </div>
                  <ArrowRight size={13} className="text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
