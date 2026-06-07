"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { agents } from "@/lib/helper"
import AgentCard from "../common/AgentCard";
import Link from "next/link";

export default function FeaturedAgents() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-site">
        <div className={visible
          ? "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 opacity-100 translate-y-0 transition-all duration-700"
          : "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 opacity-0 translate-y-8 transition-all duration-700"}>
          <div>
            <div className="gold-rule mb-4" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Meet the Experts</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">Featured Agents</h2>
            <p className="mt-3 text-gray-500 max-w-md text-base leading-relaxed">Handpicked professionals with proven track records across the UAE.</p>
          </div>
          <Link href="/our-agents" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-foreground text-foreground text-sm font-semibold shrink-0 hover:bg-foreground hover:text-white transition-all duration-300">
            View All Agents
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.slice(0, 3).map((agent, i) => (
            <AgentCard key={i} agent={agent} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
