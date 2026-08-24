"use client";

import { getPokemonListWithSprites } from "@/features/pokemon/api/pokemon";
import { toCardVM } from "@/features/pokemon/model/transformers";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import type { PokemonQueryKeyListsInfinite } from "./query-keys";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonInfiniteOptions {
  pageSize?: number;
  enabled?: boolean;
}

export interface UsePokemonInfiniteResult {
  cards: PokemonCardVM[];
  totalCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
}

type ListResponse = Awaited<ReturnType<typeof getPokemonListWithSprites>>;
type PageKey = PokemonQueryKeyListsInfinite;

export function usePokemonInfinite({
  pageSize = 10,
  enabled = true,
}: UsePokemonInfiniteOptions = {}): UsePokemonInfiniteResult {
  const query = useInfiniteQuery<
    ListResponse,
    Error,
    { pages: ListResponse[]; pageParams: number[] },
    PageKey,
    number
  >({
    queryKey: pokemonQueryKeys.listInfinite(pageSize),
    queryFn: async ({ pageParam }: QueryFunctionContext<PageKey, number>) => {
      return getPokemonListWithSprites(pageSize, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      const nextOffset = allPages.length * pageSize;
      return nextOffset < lastPage.count ? nextOffset : undefined;
    },
    staleTime: 5 * 60 * 1000,
    enabled,
  });

  const cards: PokemonCardVM[] = (query.data?.pages ?? []).flatMap((page) =>
    page.results.map((p) => toCardVM(p)),
  );

  return {
    cards,
    totalCount: query.data?.pages[0]?.count ?? 0,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
