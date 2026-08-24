"use client";

import { getPokemonById } from "@/features/pokemon/api/pokemon";
import { toDetailVM } from "@/features/pokemon/model/transformers";
import type {
  PokemonAbilityVM,
  PokemonDetailVM,
  PokemonStatVM,
} from "@/features/pokemon/model/view-models";
import type { PokemonDetail } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePokemonDetailOptions {
  id: number | string | null | undefined;
  enabled?: boolean;
}

export interface UsePokemonDetailResult {
  pokemon: PokemonDetail | undefined;
  detail: PokemonDetailVM | undefined;
  heightMeters: number;
  weightKilograms: number;
  typeNames: string[];
  spriteUrl: string | null;
  officialArtworkUrl: string | null;
  baseStats: PokemonStatVM[];
  abilities: PokemonAbilityVM[];
  baseExperience: number | null;
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
  const detail = pokemon ? toDetailVM(pokemon) : undefined;

  return {
    pokemon,
    detail,
    heightMeters: detail?.heightMeters ?? 0,
    weightKilograms: detail?.weightKilograms ?? 0,
    typeNames: detail?.typeNames.map(String) ?? [],
    spriteUrl: detail?.spriteUrl ?? null,
    officialArtworkUrl: detail?.officialArtworkUrl ?? null,
    baseStats: detail?.baseStats ?? [],
    abilities: detail?.abilities ?? [],
    baseExperience: detail?.baseExperience ?? null,
    isLoading: query.isLoading,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
