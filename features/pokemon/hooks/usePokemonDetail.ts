"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "@/lib/api/pokemon";
import type { PokemonDetail } from "@/lib/types";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonDetailOptions {
  id: number | string | null | undefined;
  enabled?: boolean;
}

export interface UsePokemonDetailResult {
  pokemon: PokemonDetail | undefined;
  heightMeters: number;
  weightKilograms: number;
  typeNames: string[];
  spriteUrl: string | null;
  isLoading: boolean;
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

  const pokemon = query.data;

  return {
    pokemon,
    heightMeters: pokemon ? pokemon.height / 10 : 0,
    weightKilograms: pokemon ? pokemon.weight / 10 : 0,
    typeNames: pokemon?.types.map((t) => t.type.name) ?? [],
    spriteUrl: pokemon?.sprites.front_default ?? pokemon?.sprites.other?.["official-artwork"]?.front_default ?? null,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
