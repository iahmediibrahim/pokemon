"use client";

import type { ReactNode } from "react";
import { Button } from "../Button";
import { ErrorState } from "../ErrorState";
import { LoadingSpinner } from "../LoadingSpinner";
import { Skeleton } from "../Skeleton";

export interface InfiniteLoadMoreViewProps<T> {
  items: T[];
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage?: boolean;
  isError: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onLoadMore: () => void;
  skeletonCount?: number;
  renderItem: (item: T, index: number) => ReactNode;
  gridClassName?: string;
  getItemKey?: (item: T, index: number) => string | number;
  emptyMessage?: string;
  loadMoreLabel?: string;
  loadingMoreLabel?: string;
  loadedCountLabel?: (count: number) => ReactNode;
  endMessage?: string;
}

const defaultLoadedCountLabel = (count: number): ReactNode => (
  <>
    Showing{" "}
    <span className="tabular-nums font-semibold text-zinc-700">{count}</span>{" "}
    items
  </>
);

export function InfiniteLoadMoreView<T>({
  items,
  hasNextPage,
  isLoading,
  isFetchingNextPage = false,
  isError,
  errorMessage,
  onRetry,
  onLoadMore,
  skeletonCount = 10,
  renderItem,
  gridClassName = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
  getItemKey = (_, i) => i,
  emptyMessage = "No items found.",
  loadMoreLabel = "Load More",
  loadingMoreLabel = "Loading more…",
  loadedCountLabel = defaultLoadedCountLabel,
  endMessage = "You've reached the end!",
}: InfiniteLoadMoreViewProps<T>) {
  if (isError) {
    return <ErrorState message={errorMessage} onRetry={onRetry} compact />;
  }

  if (isLoading && items.length === 0) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full" rounded="md" />
        ))}
      </div>
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
      <div className={gridClassName}>
        {items.map((item, i) => (
          <div key={getItemKey(item, i)}>{renderItem(item, i)}</div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 pt-4">
        {hasNextPage ? (
          <Button
            variant="outline"
            size="md"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
            isLoading={isFetchingNextPage}
          >
            {isFetchingNextPage ? loadingMoreLabel : loadMoreLabel}
          </Button>
        ) : (
          <p className="text-sm text-zinc-500">{endMessage}</p>
        )}

        {items.length > 0 && (
          <p className="text-xs font-medium text-zinc-500" aria-live="polite">
            {loadedCountLabel(items.length)}
          </p>
        )}

        {isFetchingNextPage && (
          <LoadingSpinner label={loadingMoreLabel} tone="brand" />
        )}
      </div>
    </div>
  );
}
