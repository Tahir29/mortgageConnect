"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bankLogos } from "@/lib/helper";
import { useVisible } from "@/hooks/useVisible";

export default function BankPartners() {
  const [ref, visible] = useVisible(0.1);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-site">

        <div className={visible
          ? "text-center mb-12 opacity-100 translate-y-0 transition-all duration-700"
          : "text-center mb-12 opacity-0 translate-y-8 transition-all duration-700"}>
          <div className="gold-rule mx-auto mb-4" />
          <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Banking Network</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Banks Our Companies Work With
          </h2>
          <p className="mt-3 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
            Our partner companies have established relationships with all major UAE lenders — giving you access to the widest range of mortgage products.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {bankLogos.map((bank, i) => (
            <div
              key={bank.name}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100
                hover:border-accent/40 hover:shadow-[0_4px_20px_rgba(10,22,40,0.08)]
                bg-white transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div className="w-14 h-14 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-accent/5 transition-colors duration-300">
                <img
                  src={bank.src}
                  alt={bank.name}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="hidden w-10 h-10 items-center justify-center">
                  <span className="text-foreground font-bold text-xs text-center leading-tight">
                    {bank.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                  </span>
                </div>
              </div>
              <span className="text-foreground text-[11px] font-semibold text-center leading-tight group-hover:text-accent transition-colors duration-200">
                {bank.name}
              </span>
            </div>
          ))}
        </div>

        {/* Register CTA */}
        <div className={`mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-7 rounded-3xl bg-foreground relative overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div
            className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
          />
          <div>
            <h3 className="font-display text-xl font-semibold text-white mb-1">
              Are You a Mortgage Company?
            </h3>
            <p className="text-white/50 text-sm">
              List your company on Mortgage Connect and get discovered by thousands of UAE homebuyers.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-foreground font-semibold text-sm tracking-wide hover:bg-brand-gold-light shadow-[0_4px_24px_rgba(201,168,76,0.25)] hover:shadow-[0_4px_36px_rgba(201,168,76,0.5)] transition-all duration-300 shrink-0"
          >
            Get Listed
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}
