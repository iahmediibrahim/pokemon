"use client";

import { SegmentedTabs } from "@/components/ui/SegmentedTabs";

import {
  DEFAULT_VIEW_MODE,
  VIEW_MODES,
  type ViewMode,
} from "@/features/pokemon/view-options";

export { DEFAULT_VIEW_MODE, VIEW_MODES };
export type { ViewMode };

export interface PokedexHeaderProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function PokedexHeader({ mode, onModeChange }: PokedexHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-6 mb-10">
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 text-amber-500"
            aria-hidden
          >
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
            Pokédex
          </h1>
        </div>
        <p className="mt-2 text-sm sm:text-base text-zinc-600 text-balance max-w-md mx-auto">
          Discover and explore Pokémon with{" "}
          {mode === "pagination" ? "page controls" : "infinite scroll"}
        </p>
      </div>
      <SegmentedTabs<ViewMode>
        label="Browse mode"
        value={mode}
        onChange={onModeChange}
        options={[
          { value: "pagination", label: "Page Controls" },
          { value: "infinite", label: "Infinite Scroll" },
        ]}
      />
    </div>
  );
}
