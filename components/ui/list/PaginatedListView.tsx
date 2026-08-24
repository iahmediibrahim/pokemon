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

  const showSkeletonOverlay = isFetching && !isLoading;

  return (
    <div className="flex flex-col gap-8">
      {showSkeletonOverlay ? (
        <ListSkeletonGrid count={skeletonCount} gridClassName={gridClassName} />
      ) : (
        <div className={gridClassName}>
          {items.map((item, i) => (
            <div key={getItemKey(item, i)}>{renderItem(item, i)}</div>
          ))}
        </div>
      )}

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
