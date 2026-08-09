'use client'

import { useVisible } from "@/hooks/useVisible";
import { contactInfo } from '@/lib/helper'
import { ArrowRight, Clock } from "lucide-react";

export default function InfoCards() {
  const [ref, visible] = useVisible(0.1);

  return (
    <section ref={ref} className="bg-white py-16">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item, i) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group flex flex-col p-7 rounded-3xl border-2 border-gray-100
                  hover:border-accent/40 hover:shadow-[0_8px_40px_rgba(10,22,40,0.10)]
                  transition-all duration-300
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300
                  ${item.whatsapp
                    ? "bg-whatsapp/10 group-hover:bg-whatsapp"
                    : "bg-foreground group-hover:bg-accent"}`}>
                  <Icon size={20} className={item.whatsapp
                    ? "text-whatsapp group-hover:text-white transition-colors duration-300"
                    : "text-accent group-hover:text-foreground transition-colors duration-300"} />
                </div>

                <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase mb-2">{item.title}</p>
                <p className="text-foreground font-semibold text-sm leading-snug mb-1">{item.value}</p>
                <p className="text-gray-400 text-xs leading-relaxed flex-1">{item.sub}</p>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-accent group-hover:gap-2.5 transition-all duration-200">
                  {item.cta}
                  <ArrowRight size={12} />
                </div>
              </a>
            );
          })}
        </div>

        {/* Office hours strip */}
        <div className="mt-6 flex items-center gap-3 px-6 py-4 rounded-2xl bg-brand-cream border border-accent/15">
          <Clock size={15} className="text-accent shrink-0" />
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-foreground">Office Hours:</span>{" "}
            Sunday – Thursday, 9:00 AM – 6:00 PM GST &nbsp;·&nbsp; Friday & Saturday: Closed
          </p>
        </div>
      </div>
    </section>
  );
}