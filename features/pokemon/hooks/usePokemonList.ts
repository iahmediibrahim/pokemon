"use client";

import { getPokemonListWithSprites } from "@/features/pokemon/api/pokemon";
import { toCardVM } from "@/features/pokemon/model/transformers";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import { useQuery } from "@tanstack/react-query";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonListOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export interface UsePokemonListResult {
  cards: PokemonCardVM[];
  count: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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

  const cards: PokemonCardVM[] = (query.data?.results ?? []).map((p) =>
    toCardVM(p),
  );
  const count = query.data?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return {
    cards,
    count,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
