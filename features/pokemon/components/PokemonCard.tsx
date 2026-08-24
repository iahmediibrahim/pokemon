"use client";

import { Card } from "@/components/ui";
import { usePrefetchPokemonDetail } from "@/features/pokemon/hooks/usePrefetchPokemon";
import type { PokemonWithSprite } from "@/lib/types";
import { capitalize, padId } from "@shared/util/format";
import Image from "next/image";
import Link from "next/link";

export interface PokemonCardProps {
  pokemon: PokemonWithSprite;
  priority?: boolean;
}

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const { prefetch, cancel } = usePrefetchPokemonDetail();
  const id = pokemon.id;

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-[--radius-card]"
      aria-label={`View ${pokemon.name} details`}
      onMouseEnter={() => prefetch(id)}
      onMouseLeave={() => cancel()}
      onFocus={() => prefetch(id)}
      onBlur={() => cancel()}
    >
      <Card hoverable padding="none" className="overflow-hidden">
        <div className="aspect-square bg-zinc-100 relative flex items-center justify-center p-3">
          <div className="relative h-full w-full">
            <Image
              src={pokemon.sprite}
              alt={`${pokemon.name} sprite`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
              priority={priority}
              className="object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="font-semibold text-sm text-zinc-900 truncate">
            {capitalize(pokemon.name)}
          </p>
          <p className="mt-0.5 text-xs font-medium text-zinc-400 tabular-nums">
            {padId(pokemon.id)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
