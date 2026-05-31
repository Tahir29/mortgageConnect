"use client";

import { useVisible } from "@/hooks/useVisible";

export default function CompanyStats({ companies }) {
  const [ref, visible] = useVisible(0.3);

  const totalAgents     = companies.reduce((sum, c) => sum + c.agentCount, 0);
  const totalLocations  = [...new Set(companies.flatMap((c) => c.locations))].length;
  const totalSpecialties = [...new Set(companies.flatMap((c) => c.specialties))].length;

  const stats = [
    { value: companies.length, suffix: "",  label: "Partner Companies" },
    { value: totalAgents,      suffix: "+", label: "Total Agents" },
    { value: totalLocations,   suffix: "",  label: "Emirates Covered" },
    { value: totalSpecialties, suffix: "",  label: "Specialties" },
  ];

  return (
    <section ref={ref} className="bg-foreground relative overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-[#060e1f] via-foreground to-[#0d1e3a]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#060e1f] via-transparent to-[#060e1f]/60" />
        <div className="absolute inset-0 bg-linear-to-r from-[#060e1f]/80 via-transparent to-[#060e1f]/40" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(201,168,76,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <div className="container-site py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`flex flex-col items-center text-center transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <span className="text-3xl md:text-4xl font-bold font-display text-accent px-4">
                {stat.value}{stat.suffix}
              </span>
              <span className="text-white/50 text-xs md:text-sm mt-1.5 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
