import type { PokemonType } from "@/lib/types";
import type { PokemonTypeName } from "@/features/pokemon/components/TypeBadge";

export interface PokemonCardVM {
  id: number;
  name: string;
  displayName: string;
  paddedId: string;
  spriteUrl: string;
  primaryType: PokemonTypeName;
  secondaryType?: PokemonTypeName;
}

export interface PokemonTypeVM {
  name: PokemonTypeName;
  label: string;
}

export interface PokemonStatVM {
  name: string;
  label: string;
  baseValue: number;
  maxValue: number;
  percentage: number;
}

export interface PokemonAbilityVM {
  name: string;
  label: string;
  isHidden: boolean;
}

export interface PokemonDetailVM {
  id: number;
  name: string;
  displayName: string;
  paddedId: string;
  spriteUrl: string | null;
  officialArtworkUrl: string | null;
  heightMeters: number;
  heightDisplay: string;
  weightKilograms: number;
  weightDisplay: string;
  types: PokemonTypeVM[];
  typeNames: PokemonTypeName[];
  baseStats: PokemonStatVM[];
  abilities: PokemonAbilityVM[];
  baseExperience: number | null;
  baseExperienceDisplay: string;
  primaryType: PokemonTypeName;
}
