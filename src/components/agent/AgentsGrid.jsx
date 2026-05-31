"use client";

import { useState, useMemo, useEffect } from "react";
import { agents } from "@/lib/helper";
import { AgentCard } from "@/components/common";
import { FilterBar, EmptyState } from "@/components/agent";

export default function AgentsGrid() {
  const [search, setSearch]       = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation]   = useState("");
  const [company, setCompany]     = useState("");
  const [language, setLanguage]   = useState("");
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const hasFilters = !!(search || specialty || location || company || language);

  const filtered = useMemo(() => {
    return agents.filter((agent) => {
      const q = search.toLowerCase();
      const matchSearch    = !search    || agent.name.toLowerCase().includes(q) || agent.company.toLowerCase().includes(q) || agent.role.toLowerCase().includes(q) || agent.languages.some((l) => l.toLowerCase().includes(q));
      const matchSpecialty = !specialty || agent.specialty === specialty;
      const matchLocation  = !location  || agent.location  === location;
      const matchCompany   = !company   || agent.company   === company;
      const matchLanguage  = !language  || agent.languages.includes(language);
      return matchSearch && matchSpecialty && matchLocation && matchCompany && matchLanguage;
    });
  }, [search, specialty, location, company, language]);

  const clearAll = () => {
    setSearch("");
    setSpecialty("");
    setLocation("");
    setCompany("");
    setLanguage("");
  };

  return (
    <>
      <FilterBar
        search={search}       setSearch={setSearch}
        specialty={specialty} setSpecialty={setSpecialty}
        location={location}   setLocation={setLocation}
        company={company}     setCompany={setCompany}
        language={language}   setLanguage={setLanguage}
        totalResults={filtered.length}
        onClear={clearAll}
        hasFilters={hasFilters}
      />

      <section className="section-padding bg-brand-cream">
        <div className="container-site">
          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} visible={visible} />
                ))}
              </div>

              <div className="mt-14 text-center">
                <p className="text-gray-400 text-sm">
                  Showing all{" "}
                  <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                  verified {filtered.length === 1 ? "agent" : "agents"}
                  {hasFilters ? " matching your filters" : " on our platform"}.
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Can't find the right agent?{" "}
                  <a href="/contact-us" className="text-accent font-medium hover:underline">
                    Contact us
                  </a>{" "}
                  and we'll help you find the best match.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
