import type {
  PokemonAbility,
  PokemonDetail,
  PokemonStat,
  PokemonTypeName,
  PokemonWithSprite,
} from "@/features/pokemon/model/api-contracts";
import {
  capitalize,
  clamp0100,
  formatKilograms,
  formatMetric,
  kebabToSpaces,
  padId,
  typeLabel,
} from "@/shared/util/format";
import type {
  PokemonAbilityVM,
  PokemonCardVM,
  PokemonDetailVM,
  PokemonStatVM,
  PokemonTypeVM,
} from "./view-models";

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

const STAT_MAX: Record<string, number> = {
  hp: 255,
  attack: 255,
  defense: 255,
  "special-attack": 255,
  "special-defense": 255,
  speed: 255,
};

export function toTypeVM(raw: { type: { name: string } }): PokemonTypeVM {
  const name = raw.type.name as PokemonTypeName;
  return {
    name,
    label: typeLabel(raw.type.name),
  };
}

export function toStatVM(stat: PokemonStat): PokemonStatVM {
  const max = STAT_MAX[stat.stat.name] ?? 255;
  return {
    name: stat.stat.name,
    label: STAT_LABELS[stat.stat.name] ?? typeLabel(stat.stat.name),
    baseValue: stat.base_stat,
    maxValue: max,
    percentage: clamp0100((stat.base_stat / max) * 100),
  };
}

export function toAbilityVM(ability: PokemonAbility): PokemonAbilityVM {
  return {
    name: ability.ability.name,
    label: kebabToSpaces(ability.ability.name),
    isHidden: ability.is_hidden,
  };
}

export function toCardVM(p: PokemonWithSprite): PokemonCardVM {
  return {
    id: p.id,
    name: p.name,
    displayName: capitalize(p.name),
    paddedId: padId(p.id),
    officialArtworkUrl: p.officialArtwork,
    primaryType: "normal",
    secondaryType: undefined,
  };
}

export function toDetailVM(dto: PokemonDetail): PokemonDetailVM {
  const types: PokemonTypeVM[] = dto.types.map(toTypeVM);
  const typeNames = types.map((t) => t.name);
  const primaryType = typeNames[0] ?? ("normal" as PokemonTypeName);

  const officialArtwork =
    dto.sprites.other?.["official-artwork"]?.front_default ?? null;

  return {
    id: dto.id,
    name: dto.name,
    displayName: capitalize(dto.name),
    paddedId: padId(dto.id),
    spriteUrl: dto.sprites.front_default ?? null,
    officialArtworkUrl: officialArtwork ?? dto.sprites.front_default,
    heightMeters: dto.height / 10,
    heightDisplay: formatMetric(dto.height),
    weightKilograms: dto.weight / 10,
    weightDisplay: formatKilograms(dto.weight),
    types,
    typeNames,
    baseStats: dto.stats.map(toStatVM),
    abilities: dto.abilities.map(toAbilityVM),
    baseExperience: dto.base_experience,
    baseExperienceDisplay:
      dto.base_experience != null ? `${dto.base_experience} XP` : "—",
    primaryType,
  };
}
