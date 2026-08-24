import { ErrorState } from "@/components/ui";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import type { ReactNode } from "react";
import { PokemonCard } from "./PokemonCard";
import { PokemonCardGridSkeleton } from "./PokemonCardSkeleton";

interface PokemonGridProps {
  cards: PokemonCardVM[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  skeletonCount?: number;
  children?: ReactNode;
}

export function PokemonGrid({
  cards,
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

  if (isLoading && cards.length === 0) {
    return <PokemonCardGridSkeleton count={skeletonCount} />;
  }

  if (cards.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-zinc-500">
        No Pokémon found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((p, i) => (
          <PokemonCard key={`${p.id}-${i}`} pokemon={p} priority={i < 4} />
        ))}
      </div>
      {children}
    </div>
  );
}
