import { ErrorState } from "@/components/ui";
import type { PokemonWithSprite } from "@/features/pokemon/model/api-contracts";
import type { ReactNode } from "react";
import { PokemonCard } from "./PokemonCard";
import { PokemonCardGridSkeleton } from "./PokemonCardSkeleton";

interface PokemonGridProps {
  pokemons: PokemonWithSprite[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  skeletonCount?: number;
  children?: ReactNode;
}

export function PokemonGrid({
  pokemons,
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  skeletonCount = 10,
  children,
}: PokemonGridProps) {
  if (isError) {
    return (
      <ErrorState
        message={errorMessage}
        onRetry={onRetry}
        compact={!!onRetry}
      />
    );
  }

  if (isLoading && pokemons.length === 0) {
    return <PokemonCardGridSkeleton count={skeletonCount} />;
  }

  if (pokemons.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-zinc-500">
        No Pokémon found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((p, i) => (
          <PokemonCard key={`${p.id}-${i}`} pokemon={p} priority={i < 4} />
        ))}
      </div>
      {children}
    </div>
  );
}
