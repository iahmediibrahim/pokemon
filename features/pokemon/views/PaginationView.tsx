"use client";

import { PaginatedListView } from "@/components/ui/list/PaginatedListView";
import { PokemonCard } from "@/features/pokemon/components/PokemonCard";
import { usePokemonList } from "@/features/pokemon/hooks/usePokemonList";
import type { PokemonWithSprite } from "@/features/pokemon/model/api-contracts";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 20;
const MAX_SANE_PAGE = 2000;

function parsePage(raw: string | null): number {
  const n = raw ? Number.parseInt(raw, 10) : 1;
  if (!Number.isFinite(n)) return 1;
  return Math.min(MAX_SANE_PAGE, Math.max(1, n));
}

function currentPageFromUrl(): number {
  if (typeof window === "undefined") return 1;
  return parsePage(new URLSearchParams(window.location.search).get("page"));
}

export function PaginationView() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPage(currentPageFromUrl());
    setMounted(true);
    const onPop = () => setPage(currentPageFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const {
    pokemons,
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
      const params = new URLSearchParams(window.location.search);
      params.set("view", "pagination");
      params.set("page", String(next));
      setPage(next);
      router.replace(`/?${params.toString()}`, { scroll: false });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [page, router],
  );

  return (
    <PaginatedListView<PokemonWithSprite>
      items={mounted ? pokemons : pokemons}
      currentPage={page}
      totalPages={totalPages}
      totalItems={count}
      itemsShown={Math.min(page * PAGE_SIZE, count)}
      isLoading={isPending || !mounted}
      isFetching={isFetching && !isPending}
      isError={mounted ? isError : false}
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
