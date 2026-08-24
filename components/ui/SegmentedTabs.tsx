"use client";

import { useId } from "react";
import { Button } from "./Button";

export interface TabOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedTabsProps<T extends string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
}

export function SegmentedTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: SegmentedTabsProps<T>) {
  const baseId = useId();
  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex items-center gap-2 p-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <Button
            key={opt.value}
            id={`${baseId}-${opt.value}`}
            role="tab"
            aria-selected={isActive}
            variant={isActive ? "primary" : "ghost"}
            size="sm"
            onClick={() => onChange(opt.value)}
            className={
              isActive
                ? "shadow-sm"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/60"
            }
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
