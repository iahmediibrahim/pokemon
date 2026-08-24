"use client";

import { getPokemonById } from "@/features/pokemon/api/pokemon";
import type { PokemonDetail } from "@/features/pokemon/model/api-contracts";
import { toDetailVM } from "@/features/pokemon/model/transformers";
import type { PokemonDetailVM } from "@/features/pokemon/model/view-models";
import { useQuery } from "@tanstack/react-query";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonDetailOptions {
  id: number | string | null | undefined;
  enabled?: boolean;
}

export interface UsePokemonDetailResult {
  detail: PokemonDetailVM | undefined;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
}

export function usePokemonDetail({
  id,
  enabled = true,
}: UsePokemonDetailOptions): UsePokemonDetailResult {
  const query = useQuery<PokemonDetail>({
    queryKey: pokemonQueryKeys.detailById(id ?? "placeholder"),
    queryFn: () => getPokemonById(id!),
    enabled: !!id && enabled,
    staleTime: 10 * 60 * 1000,
  });

  const detail = query.data ? toDetailVM(query.data) : undefined;

  return {
    detail,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
