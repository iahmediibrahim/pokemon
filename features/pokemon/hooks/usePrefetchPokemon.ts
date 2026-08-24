"use client";

import { debounce, type DebouncedFn } from "@shared/util/format";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { getPokemonById } from "../api";
import { pokemonQueryKeys } from "./query-keys";

export interface UsePrefetchPokemonDetailOptions {
  staleTimeMs?: number;
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
  const {
    staleTimeMs = 10 * 60 * 1000,
    debounceMs = 120,
    prefetchRoute = true,
  } = options;
  const queryClient = useQueryClient();
  const router = useRouter();

  const doPrefetch = useCallback(
    (id: number) => {
      if (!id) return;
      queryClient
        .prefetchQuery({
          queryKey: pokemonQueryKeys.detailById(id),
          queryFn: () => getPokemonById(id),
          staleTime: staleTimeMs,
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
    [queryClient, router, staleTimeMs, prefetchRoute],
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

export function usePrefetchPokemonDetails(
  options: Omit<UsePrefetchPokemonDetailOptions, "debounceMs"> = {},
): (ids: number[]) => void {
  const { staleTimeMs = 10 * 60 * 1000, prefetchRoute = true } = options;
  const queryClient = useQueryClient();
  const router = useRouter();

  return useCallback(
    (ids: number[]) => {
      ids.forEach((id) => {
        if (!id) return;
        queryClient
          .prefetchQuery({
            queryKey: pokemonQueryKeys.detailById(id),
            queryFn: () => getPokemonById(id),
            staleTime: staleTimeMs,
          })
          .catch(() => undefined);
        if (prefetchRoute) {
          try {
            router.prefetch(`/pokemon/${id}`);
          } catch {
            // silent
          }
        }
      });
    },
    [queryClient, router, staleTimeMs, prefetchRoute],
  );
}
