"use client";

import type { ReactNode } from "react";
import { ErrorState } from "../ErrorState";
import { Pagination } from "../Pagination";
import { ListSkeletonGrid } from "./ListSkeletonGrid";

export interface PaginatedListViewProps<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsShown?: number;
  isLoading: boolean;
  isFetching?: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onPageChange: (page: number) => void;
  skeletonCount?: number;
  renderItem: (item: T, index: number) => ReactNode;
  gridClassName?: string;
  getItemKey?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  fetchingLabel?: string;
}

export function PaginatedListView<T>({
  items,
  currentPage,
  totalPages,
  totalItems,
  itemsShown,
  isLoading,
  isFetching = false,
  isError,
  errorMessage,
  onRetry,
  onPageChange,
  skeletonCount = 10,
  renderItem,
  gridClassName = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
  getItemKey = (_, i) => i,
  emptyMessage = "No items found.",
  fetchingLabel = "Loading…",
}: PaginatedListViewProps<T>) {
  if (isError) {
    return <ErrorState message={errorMessage} onRetry={onRetry} compact />;
  }

  if (isLoading && items.length === 0) {
    return (
      <ListSkeletonGrid count={skeletonCount} gridClassName={gridClassName} />
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-zinc-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <div className={gridClassName}>
          {items.map((item, i) => (
            <div key={getItemKey(item, i)}>{renderItem(item, i)}</div>
          ))}
        </div>
        {isFetching && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur">
              <svg
                className="h-3.5 w-3.5 animate-spin text-zinc-400"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              {fetchingLabel}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          itemsShown={itemsShown ?? items.length}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
