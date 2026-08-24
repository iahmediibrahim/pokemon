import { apiFetch, extractIdFromUrl } from "@shared/api/client";
import { POKEAPI_BASE_URL, buildSpriteUrl } from "./constants";

export type FetchOptions = RequestInit & {
  retries?: number;
  retryDelayMs?: number;
};

export function pokemonApiFetch<T>(
  endpoint: string,
  init: FetchOptions = {},
): Promise<T> {
  return apiFetch<T>(endpoint, {
    baseUrl: POKEAPI_BASE_URL,
    ...init,
  });
}

export { extractIdFromUrl, buildSpriteUrl };
