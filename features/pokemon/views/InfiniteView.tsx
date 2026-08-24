"use client";

import { InfiniteLoadMoreView } from "@/components/ui/list/InfiniteLoadMoreView";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { usePokemonInfinite } from "@/features/pokemon/hooks/usePokemonInfinite";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";

const PAGE_SIZE = 20;

export function InfiniteView() {
  const {
    cards,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
    fetchNextPage,
    refetch,
  } = usePokemonInfinite({ pageSize: PAGE_SIZE });

  return (
    <InfiniteLoadMoreView<PokemonCardVM>
      items={cards}
      hasNextPage={hasNextPage}
      isLoading={isPending}
      isFetchingNextPage={isFetchingNextPage}
      isError={isError}
      errorMessage={error?.message}
      onRetry={refetch}
      skeletonCount={PAGE_SIZE}
      getItemKey={(p) => p.id}
      renderItem={(p, i) => <PokemonCard pokemon={p} priority={i < 4} />}
      emptyMessage="No Pokémon found."
      loadMoreLabel="Load More"
      loadingMoreLabel="Loading more Pokémon…"
      loadedCountLabel={(count) => (
        <>
          Showing{" "}
          <span className="tabular-nums font-semibold text-zinc-700">
            {count}
          </span>{" "}
          Pokémon
        </>
      )}
      endMessage="You've reached the end!"
      onLoadMore={() => fetchNextPage()}
    />
  );
}
