"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonListWithSprites } from "@/lib/api/pokemon";
import type { PokemonWithSprite } from "@/lib/types";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonListOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export interface UsePokemonListResult {
  pokemons: PokemonWithSprite[];
  count: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
  isLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
}

export function usePokemonList({
  page = 1,
  pageSize = 10,
  enabled = true,
}: UsePokemonListOptions = {}): UsePokemonListResult {
  const offset = (page - 1) * pageSize;

  const query = useQuery({
    queryKey: pokemonQueryKeys.listPaginated(page, pageSize),
    queryFn: () => getPokemonListWithSprites(pageSize, offset),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
    enabled,
  });

  const count = query.data?.count ?? 0;
  const totalPages = Math.ceil(count / pageSize);

  return {
    pokemons: query.data?.results ?? [],
    count,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    totalPages,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
