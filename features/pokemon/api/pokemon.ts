import type {
  PokemonDetail,
  PokemonListResponse,
  PokemonListResponseWithSprites,
} from "@/features/pokemon/model/api-contracts";
import {
  buildOfficialArtworkUrl,
  extractIdFromUrl,
  pokemonApiFetch,
} from "./client";

export async function getPokemonList(
  limit = 10,
  offset = 0,
): Promise<PokemonListResponse> {
  return pokemonApiFetch<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`,
  );
}

export async function getPokemonListWithSprites(
  limit = 10,
  offset = 0,
): Promise<PokemonListResponseWithSprites> {
  const response = await getPokemonList(limit, offset);
  return {
    ...response,
    results: response.results.map((pokemon) => {
      const id = extractIdFromUrl(pokemon.url);
      return {
        ...pokemon,
        id,
        officialArtwork: buildOfficialArtworkUrl(id),
      };
    }),
  };
}

export async function getPokemonById(
  id: number | string,
): Promise<PokemonDetail> {
  return pokemonApiFetch<PokemonDetail>(`/pokemon/${id}`);
}
