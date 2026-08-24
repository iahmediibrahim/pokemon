"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { pokemonQueryKeys } from "./query-keys";

export interface PokemonInvalidators {
  invalidateAll: () => Promise<void>;
  invalidateLists: () => Promise<void>;
  invalidatePaginatedLists: () => Promise<void>;
  invalidateInfiniteLists: () => Promise<void>;
  invalidateAllDetails: () => Promise<void>;
  invalidateDetail: (id: number | string) => Promise<void>;
  resetAll: () => Promise<void>;
  resetLists: () => Promise<void>;
  resetDetails: () => Promise<void>;
  refetchLists: () => Promise<void>;
  refetchDetail: (id: number | string) => Promise<void>;
}

export function usePokemonInvalidators(): PokemonInvalidators {
  const queryClient = useQueryClient();

  const invalidateAll = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: pokemonQueryKeys.all });
  }, [queryClient]);

  const invalidateLists = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: pokemonQueryKeys.lists() });
  }, [queryClient]);

  const invalidatePaginatedLists = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: pokemonQueryKeys.allPaginatedLists(),
    });
  }, [queryClient]);

  const invalidateInfiniteLists = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: pokemonQueryKeys.allInfiniteLists(),
    });
  }, [queryClient]);

  const invalidateAllDetails = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: pokemonQueryKeys.details() });
  }, [queryClient]);

  const invalidateDetail = useCallback(
    async (id: number | string) => {
      await queryClient.invalidateQueries({
        queryKey: pokemonQueryKeys.detailById(id),
      });
    },
    [queryClient],
  );

  const resetAll = useCallback(async () => {
    await queryClient.resetQueries({ queryKey: pokemonQueryKeys.all });
  }, [queryClient]);

  const resetLists = useCallback(async () => {
    await queryClient.resetQueries({ queryKey: pokemonQueryKeys.lists() });
  }, [queryClient]);

  const resetDetails = useCallback(async () => {
    await queryClient.resetQueries({ queryKey: pokemonQueryKeys.details() });
  }, [queryClient]);

  const refetchLists = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: pokemonQueryKeys.lists() });
  }, [queryClient]);

  const refetchDetail = useCallback(
    async (id: number | string) => {
      await queryClient.refetchQueries({
        queryKey: pokemonQueryKeys.detailById(id),
        exact: true,
      });
    },
    [queryClient],
  );

  return {
    invalidateAll,
    invalidateLists,
    invalidatePaginatedLists,
    invalidateInfiniteLists,
    invalidateAllDetails,
    invalidateDetail,
    resetAll,
    resetLists,
    resetDetails,
    refetchLists,
    refetchDetail,
  } as const;
}
