"use client";

import { useRef, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { FILTER_GROUPS, countForOption } from "@/lib/agentFilters";

// ─── Dropdown ─────────────────────────────────────────────────
function FilterDropdown({ group, filters, onChange }) {
  const { key, label, plural, options } = group;
  const value = filters[key];

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (opt) => {
    onChange(key, opt);
    setOpen(false);
    triggerRef.current?.focus();
  };

  // Escape closes the list and hands focus back to the trigger.
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div ref={ref} onKeyDown={handleKeyDown} className="relative flex-1 min-w-37.5">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
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
        <div
          role="listbox"
          aria-label={label}
          className="absolute top-full left-0 right-0 mt-1.5 z-30 bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden max-h-80 overflow-y-auto"
        >
          <button
            type="button"
            role="option"
            aria-selected={value === ""}
            onClick={() => select("")}
            className="w-full text-left px-4 py-3 text-sm text-gray-400 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none cursor-pointer border-b border-gray-100"
          >
            All {plural}
          </button>
          {options.map((opt) => {
            const selected = value === opt;
            // Counts reflect the other active filters, matching the mobile sheet:
            // an option that would return nothing is shown as 0 and disabled.
            const count = countForOption(filters, key, opt);
            const empty = count === 0 && !selected;

            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={empty}
                onClick={() => select(opt)}
                className={`w-full flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors duration-150 focus:outline-none
                  ${selected
                    ? "bg-accent/10 text-foreground font-semibold"
                    : "text-gray-700"}
                  ${empty
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-50 focus:bg-gray-50"}`}
              >
                <span className="truncate">{opt}</span>
                <span className="text-gray-400 text-xs shrink-0">({count})</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────
export default function FilterBar({ filters, setFilter, totalResults, onClear, hasFilters }) {
  const activePills = FILTER_GROUPS.filter((g) => filters[g.key]).map((g) => ({
    key: g.key,
    label: filters[g.key],
  }));

  return (
    <div className="hidden md:block bg-white border-b border-gray-100 sticky top-15 z-20 shadow-[0_4px_24px_rgba(10,22,40,0.06)]">
      <div className="container-site py-4">

        {/* Row 1 — search + dropdowns */}
        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative md:w-64 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search name, company..."
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilter("search", "")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Dropdowns — same groups, in the same order, as the mobile sheet */}
          <div className="flex flex-wrap gap-3 flex-1">
            {FILTER_GROUPS.map((group) => (
              <FilterDropdown
                key={group.key}
                group={group}
                filters={filters}
                onChange={setFilter}
              />
            ))}
          </div>

          {/* Clear all */}
          {hasFilters && (
            <button
              type="button"
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

            {activePills.map((pill) => (
              <span
                key={pill.key}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-foreground text-[10px] font-semibold"
              >
                {pill.label}
                <button
                  type="button"
                  onClick={() => setFilter(pill.key, "")}
                  aria-label={`Remove ${pill.label} filter`}
                  className="text-accent hover:text-foreground transition-colors"
                >
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
