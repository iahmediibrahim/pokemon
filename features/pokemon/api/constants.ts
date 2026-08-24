export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";
const SPRITES_ROOT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const OFFICIAL_ARTWORK_BASE = `${SPRITES_ROOT}/other/official-artwork` as const;

export function buildOfficialArtworkUrl(id: number): string {
  return `${OFFICIAL_ARTWORK_BASE}/${id}.png`;
}

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGES_SANE = 2000;
