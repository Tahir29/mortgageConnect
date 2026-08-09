"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { bankLogos } from "@/lib/helper";
import { useVisible } from "@/hooks/useVisible";

/**
 * Bank logos are horizontal wordmarks — all 40px tall, but from 1.7:1 to 8.8:1
 * wide. `fill` + object-contain lets each one use the full width of its plate
 * and stop at its native 40px height, so nothing is squashed or upscaled.
 */
function BankLogo({ name, src }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-gray-400 font-bold text-sm tracking-wide">
        {name.split(" ").map((w) => w[0]).join("").slice(0, 3)}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
      className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
      onError={() => setFailed(true)}
    />
  );
}

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

        {/* Flex rather than grid so a partial last row centres instead of
            hanging off to the left — stays tidy for any number of banks. */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {bankLogos.map((bank, i) => (
            // Outer element owns the staggered entrance so its transition-delay
            // never leaks into the tile's hover response.
            <div
              key={bank.name}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`basis-[calc(50%_-_0.375rem)] sm:basis-[calc(33.333%_-_0.667rem)] lg:basis-[calc(20%_-_0.8rem)]
                transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <div
                className="group h-full flex flex-col items-center justify-center gap-4 px-4 py-6
                  rounded-2xl border border-gray-100 bg-white
                  hover:border-accent/40 hover:shadow-[0_8px_28px_rgba(10,22,40,0.10)] hover:-translate-y-0.5
                  transition-all duration-300"
              >
                <div className="relative w-full h-10 flex items-center justify-center">
                  <BankLogo name={bank.name} src={bank.src} />
                </div>
                {/* Fixed two-line box so names that wrap don't push their logo
                    out of line with the rest of the row. */}
                <span className="min-h-7 flex items-start justify-center text-gray-500 text-[11px] font-medium text-center leading-tight group-hover:text-foreground transition-colors duration-200">
                  {bank.name}
                </span>
              </div>
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
