import { apiFetch, buildSpriteUrl, extractIdFromUrl } from "./client";
import type {
  PokemonDetail,
  PokemonListResponse,
  PokemonWithSprite,
} from "../types";

export async function getPokemonList(
  limit = 10,
  offset = 0
): Promise<PokemonListResponse> {
  return apiFetch<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
}

export async function getPokemonListWithSprites(
  limit = 10,
  offset = 0
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonWithSprite[];
}> {
  const response = await getPokemonList(limit, offset);
  return {
    ...response,
    results: response.results.map((pokemon) => {
      const id = extractIdFromUrl(pokemon.url);
      return {
        ...pokemon,
        id,
        sprite: buildSpriteUrl(id),
      };
    }),
  };
}

export async function getPokemonById(
  id: number | string
): Promise<PokemonDetail> {
  return apiFetch<PokemonDetail>(`/pokemon/${id}`);
}
