"use client";

import { debounce, type DebouncedFn } from "@shared/util/format";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { getPokemonById } from "../api";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePrefetchPokemonDetailOptions {
  debounceMs?: number;
  prefetchRoute?: boolean;
}

export interface UsePrefetchPokemonDetailResult {
  prefetch: (id: number) => void;
  cancel: () => void;
}

export function usePrefetchPokemonDetail(
  options: UsePrefetchPokemonDetailOptions = {},
): UsePrefetchPokemonDetailResult {
  const { debounceMs = 120, prefetchRoute = true } = options;
  const queryClient = useQueryClient();
  const router = useRouter();

  const doPrefetch = useCallback(
    (id: number) => {
      if (!id) return;
      const key = pokemonQueryKeys.detailById(id);
      if (queryClient.getQueryData(key)) return;

      getPokemonById(id)
        .then((data) => {
          queryClient.setQueryData(key, data, { updatedAt: Date.now() });
        })
        .catch(() => undefined);

      if (prefetchRoute) {
        try {
          router.prefetch(`/pokemon/${id}`);
        } catch {
          // silent — route prefetch is best-effort
        }
      }
    },
    [queryClient, router, prefetchRoute],
  );

  const debouncedPrefetch = useMemo<DebouncedFn<(id: number) => void>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => debounce(doPrefetch as any, debounceMs),
    [doPrefetch, debounceMs],
  );

  useEffect(() => {
    return () => debouncedPrefetch.cancel();
  }, [debouncedPrefetch]);

  return {
    prefetch: debouncedPrefetch,
    cancel: debouncedPrefetch.cancel,
  };
}
