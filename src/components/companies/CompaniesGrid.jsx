"use client";

import { useState, useMemo } from "react";
import { Search, X, Building2 } from "lucide-react";
import { useVisible } from "@/hooks/useVisible";
import CompanyCard from "@/components/companies/CompanyCard";

export default function CompaniesGrid({ companies }) {
  const [ref, visible] = useVisible(0.05);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const allLocations = [...new Set(companies.flatMap((c) => c.locations))].sort();

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch = !search ||
        c.name.toLowerCase().includes(q) ||
        c.specialties.some((s) => s.toLowerCase().includes(q)) ||
        c.languages.some((l) => l.toLowerCase().includes(q));
      const matchLocation = !locationFilter || c.locations.includes(locationFilter);
      return matchSearch && matchLocation;
    });
  }, [search, locationFilter, companies]);

  return (
    <section ref={ref} className="section-padding bg-brand-cream">
      <div className="container-site">

        {/* Header */}
        <div className={visible
          ? "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 opacity-100 translate-y-0 transition-all duration-700"
          : "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 opacity-0 translate-y-8 transition-all duration-700"}>
          <div>
            <div className="gold-rule mb-4" />
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">Browse All</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Our Partner Companies
            </h2>
            <p className="mt-2 text-gray-500 text-sm max-w-md leading-relaxed">
              Each company is registered, verified, and operates with full compliance in the UAE.
            </p>
          </div>

          {/* Search + location filter */}
          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 w-52"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-500 focus:outline-none focus:border-accent transition-all duration-200 cursor-pointer"
            >
              <option value="">All Locations</option>
              {allLocations.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className={`text-xs text-gray-400 mb-6 transition-all duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          Showing{" "}
          <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "company" : "companies"}
          {(search || locationFilter) && " matching your filters"}
        </p>

        {/* Grid or empty */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
              <Building2 size={28} className="text-accent" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">No companies found</h3>
            <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setLocationFilter(""); }}
              className="px-5 py-2.5 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-brand-navy-light transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((company, i) => (
              <CompanyCard key={company.name} company={company} index={i} visible={visible} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
