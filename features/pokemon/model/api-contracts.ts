// ============================================================================
// PokéAPI wire contracts (DTOs = Data Transfer Objects)
//
// These shapes describe exactly what the PokéAPI JSON payloads look like,
// with zero presentation logic. They are returned by the feature's API layer
// (`features/pokemon/api/*`) and consumed by pure transformers that turn them
// into ViewModels for the UI layer.
//
// ============================================================================

export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  base_experience: number | null;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

// ============================================================================
// Internal DTOs (produced by the feature layer, not PokéAPI directly)
// ============================================================================

export interface PokemonWithSprite extends PokemonListItem {
  id: number;
  officialArtwork: string;
}

export interface PokemonListResponseWithSprites {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonWithSprite[];
}
