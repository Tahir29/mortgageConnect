"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { AgentCard } from "@/components/common";
import { FilterBar, EmptyState, MobileFilterSheet } from "@/components/agent";
import {
  EMPTY_FILTERS,
  FILTER_GROUPS,
  filterAgents,
  hasActiveFilters,
} from "@/lib/agentFilters";

export default function AgentsGrid({ initialCompany = "" }) {
  const [filters, setFilters] = useState({ ...EMPTY_FILTERS, company: initialCompany });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const hasFilters = hasActiveFilters(filters);
  const filtered = useMemo(() => filterAgents(filters), [filters]);

  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));
  const clearAll = () => setFilters({ ...EMPTY_FILTERS });

  // Chips shown above the grid on mobile, where the desktop filter bar (which
  // has its own chip row) is hidden.
  const activeChips = [
    ...(filters.search.trim() ? [{ key: "search", label: `"${filters.search.trim()}"` }] : []),
    ...FILTER_GROUPS.filter((g) => filters[g.key]).map((g) => ({
      key: g.key,
      label: filters[g.key],
    })),
  ];

  return (
    <>
      <FilterBar
        filters={filters}
        setFilter={setFilter}
        totalResults={filtered.length}
        onClear={clearAll}
        hasFilters={hasFilters}
      />

      <MobileFilterSheet filters={filters} onApply={setFilters} />

      <section className="section-padding bg-brand-cream">
        <div className="container-site">

          {/* Mobile-only result summary + active chips */}
          <div className="md:hidden mb-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                Showing{" "}
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "agent" : "agents"}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-red-500 text-xs font-medium shrink-0"
                >
                  Clear all
                </button>
              )}
            </div>

            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {activeChips.map((chip) => (
                  <span
                    key={chip.key}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/25 text-foreground text-[11px] font-semibold max-w-full"
                  >
                    <span className="truncate">{chip.label}</span>
                    <button
                      type="button"
                      onClick={() => setFilter(chip.key, "")}
                      aria-label={`Remove ${chip.label} filter`}
                      className="text-accent shrink-0"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <EmptyState onClear={clearAll} />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} visible={visible} />
                ))}
              </div>

              {/* Extra bottom room on mobile so the floating pill never covers a card */}
              <div className="mt-14 pb-16 md:pb-0 text-center">
                <p className="text-gray-400 text-sm">
                  Showing all{" "}
                  <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                  verified {filtered.length === 1 ? "agent" : "agents"}
                  {hasFilters ? " matching your filters" : " on our platform"}.
                </p>
                <p className="text-gray-400 text-xs mt-2">
                  Can&apos;t find the right agent?{" "}
                  <Link href="/contact-us" className="text-accent font-medium hover:underline">
                    Contact us
                  </Link>{" "}
                  and we&apos;ll help you find the best match.
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
