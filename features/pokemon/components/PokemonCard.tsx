"use client";

import { Card } from "@/components/ui";
import { usePrefetchPokemonDetail } from "@/features/pokemon/hooks/usePrefetchPokemon";
import type { PokemonCardVM } from "@/features/pokemon/model/view-models";
import { getTypeColorVar } from "@/features/pokemon/components/TypeBadge";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

export interface PokemonCardProps {
  pokemon: PokemonCardVM;
  priority?: boolean;
}

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const { prefetch, cancel } = usePrefetchPokemonDetail();
  const { id, spriteUrl, displayName, paddedId, primaryType } = pokemon;
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
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full opacity-25"
              role="img"
              aria-label={`${displayName} sprite unavailable`}
            >
              <g fill="currentColor" className="text-zinc-700">
                <circle cx="50" cy="50" r="38" fillOpacity="0" />
                <path d="M50 14c-19.9 0-36 16.1-36 36 0 9.2 3.4 17.6 9.1 24L9 93l19-14.1c6.4 4.6 14.3 7.1 22 7.1 19.9 0 36-16.1 36-36S69.9 14 50 14zm0 64c-15.5 0-28-12.5-28-28S34.5 22 50 22s28 12.5 28 28-12.5 28-28 28z" />
                <circle cx="39" cy="43" r="5" />
                <circle cx="61" cy="43" r="5" />
                <path d="M37 58c2 5 7 8 13 8s11-3 13-8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
            </svg>
          ) : (
            <div className="relative h-full w-full">
              <Image
                src={spriteUrl}
                alt={`${displayName} sprite`}
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
