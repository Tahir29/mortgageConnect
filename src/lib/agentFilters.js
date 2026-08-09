import { agents } from "@/lib/helper";

/** Shape of the filter state, and the "nothing selected" value. */
export const EMPTY_FILTERS = {
  search: "",
  specialty: "",
  location: "",
  company: "",
  language: "",
};

// Options are derived from the data so they can never list a value nothing matches.
export const specialties = [...new Set(agents.map((a) => a.specialty))].sort();
export const locations = [...new Set(agents.map((a) => a.location))].sort();
export const companies = [...new Set(agents.map((a) => a.company))].sort();
export const languages = [...new Set(agents.flatMap((a) => a.languages))].sort();

/**
 * The single definition of "does this agent match?" — used by the grid, the
 * mobile sheet, and the per-option counts, so all three always agree.
 */
export function matchesFilters(agent, filters) {
  const { search, specialty, location, company, language } = filters;
  const q = search.trim().toLowerCase();

  const matchSearch =
    !q ||
    agent.name.toLowerCase().includes(q) ||
    agent.company.toLowerCase().includes(q) ||
    agent.role.toLowerCase().includes(q) ||
    agent.languages.some((l) => l.toLowerCase().includes(q));

  return (
    matchSearch &&
    (!specialty || agent.specialty === specialty) &&
    (!location || agent.location === location) &&
    (!company || agent.company === company) &&
    (!language || agent.languages.includes(language))
  );
}

export function filterAgents(filters) {
  return agents.filter((agent) => matchesFilters(agent, filters));
}

/**
 * Number of active filters — selected facets plus a non-blank search.
 *
 * Search is trimmed here for the same reason `matchesFilters` trims it: a
 * whitespace-only query narrows nothing, so it must not be reported as active.
 */
export function activeFilterCount(filters) {
  const { search, ...facets } = filters;
  return Object.values(facets).filter(Boolean).length + (search.trim() ? 1 : 0);
}

// Derived from the count so "is anything active?" and "how many are active?"
// can never disagree.
export function hasActiveFilters(filters) {
  return activeFilterCount(filters) > 0;
}

/**
 * How many agents would remain if `value` were selected for `key`, with every
 * other active filter still applied. Lets the sheet show live counts and grey
 * out options that would return nothing.
 */
export function countForOption(filters, key, value) {
  return agents.filter((agent) => matchesFilters(agent, { ...filters, [key]: value })).length;
}

/** The facet groups rendered in the mobile sheet, in order. */
export const FILTER_GROUPS = [
  { key: "location", label: "Location", plural: "Locations", options: locations },
  { key: "language", label: "Language", plural: "Languages", options: languages },
  { key: "company", label: "Company", plural: "Companies", options: companies },
];
