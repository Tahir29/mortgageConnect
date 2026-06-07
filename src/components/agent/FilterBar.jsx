"use client";

import { useRef, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { agents } from "@/lib/helper";

// ─── Derive filter options from data ──────────────────────────
export const specialties = [...new Set(agents.map((a) => a.specialty))].sort();
export const locations   = [...new Set(agents.map((a) => a.location))].sort();
export const companies   = [...new Set(agents.map((a) => a.company))].sort();
export const languages   = [...new Set(agents.flatMap((a) => a.languages))].sort();

// ─── Dropdown ─────────────────────────────────────────────────
function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex-1 min-w-37.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200
          ${value
            ? "border-accent bg-accent/5 text-foreground"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"}`}
      >
        <span className="flex-1 text-left truncate">{value || label}</span>
        <ChevronDown
          size={14}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
          <div
            onClick={() => { onChange(""); setOpen(false); }}
            className="px-4 py-3 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
          >
            All {label}s
          </div>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors duration-150
                ${value === opt
                  ? "bg-accent/10 text-foreground font-semibold"
                  : "text-gray-700 hover:bg-gray-50"}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────
export default function FilterBar({
  search, setSearch,
  specialty, setSpecialty,
  location, setLocation,
  company, setCompany,
  language, setLanguage,
  totalResults,
  onClear,
  hasFilters,
}) {
  return (
    <div className="bg-white border-b border-gray-100 sticky top-15 z-20 shadow-[0_4px_24px_rgba(10,22,40,0.06)]">
      <div className="container-site py-4">

        {/* Row 1 — search + dropdowns */}
        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative md:w-64 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200"
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

          {/* Four dropdowns */}
          <div className="flex flex-wrap gap-3 flex-1">
            {/* <FilterDropdown label="Specialty" options={specialties} value={specialty} onChange={setSpecialty} /> */}
            <FilterDropdown label="Location"  options={locations}   value={location}  onChange={setLocation}  />
            <FilterDropdown label="Language"  options={languages}   value={language}  onChange={setLanguage}  />
            <FilterDropdown label="Company"   options={companies}   value={company}   onChange={setCompany}   />
          </div>

          {/* Clear all */}
          {hasFilters && (
            <button
              onClick={onClear}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-all duration-200 shrink-0"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        {/* Row 2 — results count + active pills */}
        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-foreground">{totalResults}</span>{" "}
              {totalResults === 1 ? "agent" : "agents"}
            </span>

            {[
              specialty && { label: specialty, clear: () => setSpecialty("") },
              location  && { label: location,  clear: () => setLocation("") },
              language  && { label: language,  clear: () => setLanguage("") },
              company   && { label: company,   clear: () => setCompany("") },
            ].filter(Boolean).map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-foreground text-[10px] font-semibold"
              >
                {pill.label}
                <button onClick={pill.clear} className="text-accent hover:text-foreground transition-colors">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <SlidersHorizontal size={12} />
            <span className="hidden sm:inline">All results are verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
