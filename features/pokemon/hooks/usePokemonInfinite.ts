"use client";

import { getPokemonListWithSprites } from "@/features/pokemon/api/pokemon";
import { toCardVM } from "@/features/pokemon/model/transformers";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import type { PokemonWithSprite } from "@/lib/types";
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from "@tanstack/react-query";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonInfiniteOptions {
  pageSize?: number;
  enabled?: boolean;
}

export interface UsePokemonInfiniteResult {
  pokemons: PokemonWithSprite[];
  cards: PokemonCardVM[];
  totalCount: number;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  fetchNextPage: () => Promise<unknown>;
  refetch: () => Promise<unknown>;
}

type ListResponse = Awaited<ReturnType<typeof getPokemonListWithSprites>>;
type PageKey = ReturnType<typeof pokemonQueryKeys.listInfinite>;

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

  const pokemons: PokemonWithSprite[] =
    query.data?.pages.flatMap((page) => page.results) ?? [];
  const cards: PokemonCardVM[] = pokemons.map((p) => toCardVM(p));

  return {
    pokemons,
    cards,
    totalCount: query.data?.pages[0]?.count ?? 0,
    hasNextPage: query.hasNextPage ?? false,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
