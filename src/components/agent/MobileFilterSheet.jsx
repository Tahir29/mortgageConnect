"use client";

import { useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { SlidersHorizontal, X, Search, Check } from "lucide-react";
import {
  EMPTY_FILTERS,
  FILTER_GROUPS,
  activeFilterCount,
  countForOption,
  filterAgents,
} from "@/lib/agentFilters";

/**
 * Mobile-only filter entry point.
 *
 * The desktop FilterBar is too tall for a phone once the fixed header is also on
 * screen, so below `md` it is hidden and replaced by this: a floating pill that
 * opens a bottom sheet. Selections inside the sheet are staged in `draft` and
 * only pushed to the page when "Apply" is tapped, so the grid doesn't churn
 * underneath while the user is still choosing.
 */
export default function MobileFilterSheet({ filters, onApply }) {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const [activeGroup, setActiveGroup] = useState(FILTER_GROUPS[0].key);

  const appliedCount = activeFilterCount(filters);
  const draftCount = activeFilterCount(draft);
  const draftResults = filterAgents(draft).length;

  // Staging starts from whatever is currently applied, so reopening the sheet
  // never silently discards the user's existing selection.
  const openSheet = () => {
    setDraft(filters);
    setActiveGroup(FILTER_GROUPS[0].key);
    setOpen(true);
  };

  const closeSheet = () => setOpen(false);

  // Lock the page behind the sheet and wire up Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // `overflow: hidden` alone doesn't stop Lenis — it keeps driving scroll
    // position from wheel/touch events, so the page would still move behind
    // the sheet. Lenis has to be paused explicitly.
    lenis?.stop();

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  const setDraftValue = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  // Single-select per group, matching the desktop dropdowns: tapping the
  // selected option again clears it.
  const toggleOption = (key, value) =>
    setDraft((d) => ({ ...d, [key]: d[key] === value ? "" : value }));

  const applyAndClose = () => {
    onApply(draft);
    setOpen(false);
  };

  const clearDraft = () => setDraft({ ...EMPTY_FILTERS });

  const group = FILTER_GROUPS.find((g) => g.key === activeGroup) ?? FILTER_GROUPS[0];

  return (
    <>
      {/* Floating trigger — hidden while the sheet is open */}
      <div
        className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-300
          ${open ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}
      >
        <button
          type="button"
          onClick={openSheet}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex items-center gap-2.5 pl-5 pr-4 py-3.5 rounded-full bg-foreground text-white shadow-[0_8px_32px_rgba(10,22,40,0.45)] active:scale-95 transition-transform duration-150"
        >
          <SlidersHorizontal size={15} className="text-accent" />
          <span className="text-sm font-semibold tracking-wide">Filter</span>
          {appliedCount > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-foreground text-[11px] font-bold flex items-center justify-center">
              {appliedCount}
            </span>
          )}
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={closeSheet}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sheet — `inert` keeps the closed sheet out of the tab order and the
          accessibility tree while it stays mounted for the slide transition. */}
      <div
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Filter agents"
        inert={!open}
        className={`md:hidden fixed inset-x-0 bottom-0 z-50 h-[88vh] bg-white rounded-t-3xl overflow-hidden
          flex flex-col shadow-[0_-8px_40px_rgba(10,22,40,0.25)]
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Grab handle */}
        <div className="pt-3 pb-1 flex justify-center shrink-0">
          <span className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
          <h2 className="font-display text-xl font-semibold text-foreground">Filters</h2>
          <button
            type="button"
            onClick={closeSheet}
            aria-label="Close filters"
            className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-foreground transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-gray-100 shrink-0">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              inputMode="search"
              placeholder="Search name, company..."
              value={draft.search}
              onChange={(e) => setDraftValue("search", e.target.value)}
              className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-200 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200"
            />
            {draft.search && (
              <button
                type="button"
                onClick={() => setDraftValue("search", "")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Two-pane body: groups on the left, options on the right */}
        <div className="flex-1 flex min-h-0">
          <div
            role="tablist"
            aria-orientation="vertical"
            className="w-1/3 shrink-0 bg-brand-cream overflow-y-auto border-r border-gray-100"
          >
            {FILTER_GROUPS.map((g) => {
              const selected = activeGroup === g.key;
              return (
                <button
                  key={g.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveGroup(g.key)}
                  className={`w-full text-left px-4 py-4 text-sm transition-colors duration-200 relative
                    ${selected
                      ? "bg-white text-foreground font-semibold"
                      : "text-gray-500 hover:text-foreground"}`}
                >
                  {selected && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />}
                  <span className="flex items-center gap-1.5">
                    {g.label}
                    {draft[g.key] && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                  </span>
                </button>
              );
            })}
          </div>

          <div role="tabpanel" aria-label={group.label} className="flex-1 overflow-y-auto">
            <div role="radiogroup" aria-label={group.label}>
            <button
              type="button"
              role="radio"
              aria-checked={!draft[group.key]}
              onClick={() => setDraftValue(group.key, "")}
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 border-b border-gray-50 text-left"
            >
              <span className={`text-sm ${!draft[group.key] ? "text-foreground font-semibold" : "text-gray-400"}`}>
                All {group.plural}
              </span>
              {!draft[group.key] && <Check size={15} className="text-accent shrink-0" />}
            </button>

            {group.options.map((option) => {
              const selected = draft[group.key] === option;
              // Count reflects the other active filters, so it previews the real result.
              const count = countForOption(draft, group.key, option);
              const empty = count === 0 && !selected;

              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  disabled={empty}
                  onClick={() => toggleOption(group.key, option)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 border-b border-gray-50 text-left transition-colors duration-150
                    ${selected ? "bg-accent/5" : ""}
                    ${empty ? "opacity-40" : "active:bg-gray-50"}`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className={`w-4.5 h-4.5 rounded-sm border flex items-center justify-center shrink-0 transition-colors duration-150
                        ${selected ? "bg-accent border-accent" : "border-gray-300"}`}
                    >
                      {selected && <Check size={11} className="text-foreground" strokeWidth={3} />}
                    </span>
                    <span className={`text-sm truncate ${selected ? "text-foreground font-semibold" : "text-gray-700"}`}>
                      {option}
                    </span>
                  </span>
                  <span className="text-gray-400 text-xs shrink-0">({count})</span>
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 grid grid-cols-2 gap-3 px-5 pt-4 border-t border-gray-100 bg-white"
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={clearDraft}
            disabled={draftCount === 0}
            className="py-3.5 rounded-full bg-brand-cream text-foreground text-sm font-semibold tracking-wide disabled:opacity-40 transition-opacity duration-200"
          >
            CLEAR ALL
          </button>
          <button
            type="button"
            onClick={applyAndClose}
            className="py-3.5 rounded-full bg-foreground text-white text-sm font-semibold tracking-wide active:scale-95 transition-transform duration-150"
          >
            {draftResults === 0 ? "NO MATCHES" : `SHOW ${draftResults}`}
          </button>
        </div>
      </div>
    </>
  );
}
