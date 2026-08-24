export type { PokemonTypeName } from "@/features/pokemon/model/api-contracts";
import type { PokemonTypeName } from "@/features/pokemon/model/api-contracts";

interface TypeBadgeProps {
  type: PokemonTypeName | string;
}

const TYPE_COLOR_VAR: Record<PokemonTypeName, string> = {
  normal: "--color-type-normal",
  fire: "--color-type-fire",
  water: "--color-type-water",
  electric: "--color-type-electric",
  grass: "--color-type-grass",
  ice: "--color-type-ice",
  fighting: "--color-type-fighting",
  poison: "--color-type-poison",
  ground: "--color-type-ground",
  flying: "--color-type-flying",
  psychic: "--color-type-psychic",
  bug: "--color-type-bug",
  rock: "--color-type-rock",
  ghost: "--color-type-ghost",
  dragon: "--color-type-dragon",
  dark: "--color-type-dark",
  steel: "--color-type-steel",
  fairy: "--color-type-fairy",
};

export function getTypeColorVar(type: string): string {
  return (
    TYPE_COLOR_VAR[type.toLowerCase() as PokemonTypeName] ??
    TYPE_COLOR_VAR.normal
  );
}

function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const key = type.toLowerCase() as PokemonTypeName;
  const colorVar = getTypeColorVar(key);
  const style = {
    backgroundColor: `color-mix(in srgb, var(${colorVar}) 12%, transparent)`,
    color: `var(${colorVar})`,
    borderColor: `color-mix(in srgb, var(${colorVar}) 35%, transparent)`,
  };

  return (
    <span
      className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize"
      style={style}
      role="img"
      aria-label={`${type} type`}
    >
      {titleCase(type)}
    </span>
  );
}
