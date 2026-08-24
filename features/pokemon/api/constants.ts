export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
export const SPRITE_CDN_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export function buildSpriteUrl(id: number): string {
  return `${SPRITE_CDN_BASE}/${id}.png`;
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGES_SANE = 2000;
