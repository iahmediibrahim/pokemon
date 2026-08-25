"use client";

import { PaginatedListView } from "@/components/ui/list/PaginatedListView";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import { parsePageParam } from "@/shared/util/validation";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

const PAGE_SIZE = 20;
const MAX_SANE_PAGE = 2000;

export function PaginationView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parsePageParam(searchParams.get("page"), {
    maxPage: MAX_SANE_PAGE,
  });
  const [isNavigating, startTransition] = useTransition();

  const {
    cards,
    count,
    totalPages,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = usePokemonList({ page, pageSize: PAGE_SIZE });

  const handlePageChange = useCallback(
    (next: number) => {
      if (next === page) return;
      const params = new URLSearchParams(searchParams);
      params.set("view", "pagination");
      params.set("page", String(next));
      startTransition(() => {
        router.replace(`/?${params.toString()}`, { scroll: false });
      });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [page, router, searchParams],
  );

  return (
    <PaginatedListView<PokemonCardVM>
      items={cards}
      currentPage={page}
      totalPages={totalPages}
      totalItems={count}
      itemsShown={Math.min(page * PAGE_SIZE, count)}
      isLoading={isPending}
      isFetching={isFetching || isNavigating}
      isError={isError}
      errorMessage={error?.message}
      onRetry={refetch}
      skeletonCount={PAGE_SIZE}
      getItemKey={(p) => p.id}
      renderItem={(p, i) => <PokemonCard pokemon={p} priority={i < 4} />}
      emptyMessage="No Pokémon found."
      fetchingLabel="Loading page…"
      onPageChange={handlePageChange}
    />
  );
}
