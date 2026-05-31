"use client";

import Link from "next/link";
import { Building2, Users, MapPin, Globe, MessageCircle } from "lucide-react";

export default function CompanyCard({ company, index, visible }) {
  const initials = company.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const primaryAgent = company.agents[0];

  return (
    <div
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group bg-white rounded-3xl overflow-hidden border border-gray-100
        shadow-[0_4px_24px_rgba(10,22,40,0.08)]
        hover:shadow-[0_16px_56px_rgba(10,22,40,0.14)]
        hover:border-[#C9A84C]/40
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {/* Top navy band */}
      <div className="relative h-32 bg-linear-to-br from-foreground to-brand-navy-light">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />

        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
          <Users size={11} className="text-accent" />
          <span className="text-white text-[11px] font-semibold">
            {company.agentCount} {company.agentCount === 1 ? "Agent" : "Agents"}
          </span>
        </div>

        <div className="absolute -bottom-8 left-6">
          <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg bg-accent flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <span className="text-foreground font-bold text-lg">{initials}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pt-12 px-6 pb-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-1 leading-tight">
          {company.name}
        </h3>
        <p className="text-accent text-xs font-medium tracking-wide mb-5">
          Mortgage Services Provider
        </p>

        <div className="space-y-2.5 mb-6">
          <div className="flex items-start gap-2.5 text-xs text-gray-500">
            <MapPin size={12} className="text-accent shrink-0 mt-0.5" />
            <span>{company.locations.join(", ")}</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-gray-500">
            <Globe size={12} className="text-accent shrink-0 mt-0.5" />
            <span>{company.languages.join(", ")}</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-gray-500">
            <Building2 size={12} className="text-accent shrink-0 mt-0.5" />
            <span>{company.specialties.join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {company.specialties.slice(0, 3).map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-foreground/5 text-foreground border border-foreground/10">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {company.agents.slice(0, 4).map((agent, i) => (
              <div key={agent.id} className="relative" style={{ zIndex: 10 - i }}>
                {agent.image ? (
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-8 h-8 rounded-full object-cover object-top border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-accent flex items-center justify-center">
                    <span className="text-foreground text-[9px] font-bold">
                      {agent.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {company.agents.length > 4 && (
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center" style={{ zIndex: 1 }}>
                <span className="text-gray-500 text-[9px] font-bold">+{company.agents.length - 4}</span>
              </div>
            )}
          </div>
          <span className="text-gray-400 text-xs">
            {company.agentCount} verified {company.agentCount === 1 ? "agent" : "agents"}
          </span>
        </div>

        <div className="h-px bg-gray-100 mb-5" />

        <div className="flex gap-2">
          <Link
            href={`/our-agents?company=${encodeURIComponent(company.name)}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-foreground text-white text-xs font-semibold hover:bg-brand-navy-light transition-all duration-200"
          >
            <Users size={12} />
            View Agents
          </Link>
          <a
            href={`https://wa.me/${primaryAgent.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-whatsapp/10 border border-whatsapp/25 text-whatsapp text-xs font-semibold hover:bg-whatsapp hover:text-white hover:border-whatsapp transition-all duration-200"
          >
            <MessageCircle size={12} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
