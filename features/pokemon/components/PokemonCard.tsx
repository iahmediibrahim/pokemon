"use client";

import { Card } from "@/components/ui";
import { PokemonSilhouette } from "@/features/pokemon/components/PokemonSilhouette";
import { getTypeColorVar } from "@/features/pokemon/components/TypeBadge";
import { usePrefetchPokemonDetail } from "@/features/pokemon/hooks/usePrefetchPokemon";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface PokemonCardProps {
  pokemon: PokemonCardVM;
  priority?: boolean;
}

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const { prefetch, cancel } = usePrefetchPokemonDetail();
  const { id, officialArtworkUrl, displayName, paddedId, primaryType } =
    pokemon;
  const [imageErrored, setImageErrored] = useState(false);

  const handleImageError = useCallback(() => {
    setImageErrored(true);
  }, []);

  const typeColorVar = getTypeColorVar(primaryType);
  const cardBgStyle = {
    backgroundImage: `radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(${typeColorVar}) 18%, transparent) 0%, color-mix(in srgb, var(${typeColorVar}) 8%, transparent) 60%, transparent 100%)`,
    backgroundColor: `color-mix(in srgb, var(${typeColorVar}) 6%, #fafafa)`,
  } satisfies React.CSSProperties;

  return (
    <Link
      href={`/pokemon/${id}`}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 rounded-[--radius-card]"
      aria-label={`View ${displayName} details`}
      onMouseEnter={() => prefetch(id)}
      onMouseLeave={() => cancel()}
      onFocus={() => prefetch(id)}
      onBlur={() => cancel()}
    >
      <Card hoverable padding="none" className="overflow-hidden">
        <div
          className="aspect-square relative flex items-center justify-center p-3"
          style={cardBgStyle}
          aria-hidden="true"
        >
          {imageErrored ? (
            <PokemonSilhouette label={`${displayName} artwork unavailable`} />
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={officialArtworkUrl}
                alt={`${displayName} official artwork`}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                priority={priority}
                onError={handleImageError}
                className="object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_6px_8px_rgba(0,0,0,0.08)]"
              />
            </div>
          )}
        </div>
        <div className="px-3 py-3 text-center">
          <p className="font-semibold text-sm text-zinc-900 truncate">
            {displayName}
          </p>
          <p className="mt-0.5 text-xs font-medium text-zinc-400 tabular-nums">
            {paddedId}
          </p>
        </div>
      </Card>
    </Link>
  );
}
