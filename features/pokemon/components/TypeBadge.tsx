import type { PokemonTypeName } from "@/features/pokemon/model/api-contracts";
import type { PokemonTypeVM } from "@/features/pokemon/model/view-models";

type TypeBadgeType = PokemonTypeName | string | PokemonTypeVM;

interface TypeBadgeProps {
  type: TypeBadgeType;
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

function resolveType(type: TypeBadgeType): {
  name: PokemonTypeName;
  label: string;
} {
  if (typeof type === "object") {
    return { name: type.name as PokemonTypeName, label: type.label };
  }
  const name = type.toLowerCase() as PokemonTypeName;
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  return { name, label };
}

export function getTypeColorVar(type: string): string {
  return (
    TYPE_COLOR_VAR[type.toLowerCase() as PokemonTypeName] ??
    TYPE_COLOR_VAR.normal
  );
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const { name, label } = resolveType(type);
  const colorVar = getTypeColorVar(name);
  const styleVars = {
    ["--tb-bg" as string]: `color-mix(in srgb, var(${colorVar}) 12%, transparent)`,
    ["--tb-text" as string]: `var(${colorVar})`,
    ["--tb-border" as string]: `color-mix(in srgb, var(${colorVar}) 35%, transparent)`,
  } satisfies React.CSSProperties;

  return (
    <span
      className="inline-flex items-center rounded-full border border-[color:var(--tb-border)] bg-[color:var(--tb-bg)] text-[color:var(--tb-text)] px-3 py-1 text-xs font-semibold capitalize"
      style={styleVars}
      role="img"
      aria-label={`${label} type`}
    >
      {label}
    </span>
  );
}
