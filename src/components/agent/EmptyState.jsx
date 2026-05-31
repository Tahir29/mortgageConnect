"use client";

import { Users } from "lucide-react";

export default function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Users size={32} className="text-accent" />
      </div>
      <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
        No agents found
      </h3>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-8">
        No agents match your current filters. Try adjusting your search or clearing the filters.
      </p>
      <button
        onClick={onClear}
        className="px-6 py-3 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-brand-navy-light transition-all duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );
}
