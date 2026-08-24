"use client";

import type { ReactNode } from "react";
import { Skeleton } from "../Skeleton";

const DEFAULT_GRID =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4";

export interface ListSkeletonGridProps {
  count?: number;
  gridClassName?: string;
  renderSkeleton?: (index: number) => ReactNode;
  ariaLive?: "polite" | "off" | "assertive";
}

export function ListSkeletonGrid({
  count = 10,
  gridClassName = DEFAULT_GRID,
  renderSkeleton,
  ariaLive = "polite",
}: ListSkeletonGridProps) {
  return (
    <div
      className={gridClassName}
      role="status"
      aria-busy="true"
      aria-live={ariaLive}
    >
      {Array.from({ length: Math.max(0, count) }).map((_, i) =>
        renderSkeleton ? (
          <span key={i} className="contents">
            {renderSkeleton(i)}
          </span>
        ) : (
          <Skeleton
            key={i}
            className="aspect-[3/4] w-full"
            rounded="md"
            aria-hidden="true"
          />
        ),
      )}
    </div>
  );
}
