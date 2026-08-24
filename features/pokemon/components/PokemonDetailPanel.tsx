import { StatBar } from "@/components/ui/StatBar";
import type { PokemonDetailVM } from "@/features/pokemon/model/view-models";
import Image from "next/image";
import { TypeBadge } from "./TypeBadge";

interface PokemonDetailPanelProps {
  detail: PokemonDetailVM;
}

export function PokemonDetailPanel({ detail }: PokemonDetailPanelProps) {
  const {
    displayName,
    paddedId,
    name,
    officialArtworkUrl,
    spriteUrl,
    types,
    heightDisplay,
    weightDisplay,
    baseStats,
    abilities,
    baseExperienceDisplay,
  } = detail;
  const imageUrl = officialArtworkUrl ?? spriteUrl;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.12)] border border-black/[0.04]">
      <div className="bg-gradient-to-r from-[color:var(--color-brand-500)] via-fuchsia-500 to-pink-500 text-white px-6 py-8 text-center">
        <div className="inline-flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
          </svg>
          <h1 className="text-3xl font-bold tracking-tight">{displayName}</h1>
        </div>
        <p className="mt-2 text-sm text-white/80 tabular-nums">{paddedId}</p>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10 lg:gap-12">
        <div className="flex flex-col items-center gap-6">
          <div className="relative h-64 w-64 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={`${name} official artwork`}
                fill
                priority
                sizes="256px"
                className="object-contain p-4"
              />
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {types.map((t) => (
              <TypeBadge key={t.name} type={t} />
            ))}
          </div>

          <div className="grid grid-cols-2 w-full max-w-sm gap-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path
                    d="M6 3v7a6 6 0 0012 0V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="4"
                    y1="21"
                    x2="20"
                    y2="21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Height
              </div>
              <div className="mt-1 text-xl font-bold text-zinc-900 tabular-nums">
                {heightDisplay}
              </div>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-500">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path
                    d="M12 3a3 3 0 013 3v1h4a2 2 0 012 2v9a3 3 0 01-3 3H6a3 3 0 01-3-3V9a2 2 0 012-2h4V6a3 3 0 013-3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                Weight
              </div>
              <div className="mt-1 text-xl font-bold text-zinc-900 tabular-nums">
                {weightDisplay}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <section>
            <h2 className="mb-2 text-lg font-bold text-zinc-900">Base Stats</h2>
            <div className="divide-y divide-zinc-100">
              {baseStats.map((stat) => (
                <StatBar
                  key={stat.name}
                  label={stat.label}
                  value={stat.baseValue}
                  maxValue={stat.maxValue}
                  percentage={stat.percentage}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-zinc-900">Abilities</h2>
            <ul className="flex flex-wrap gap-2">
              {abilities.map((a) => (
                <li key={a.name} className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium capitalize text-zinc-700">
                    {a.label}
                  </span>
                  {a.isHidden && (
                    <span className="text-[11px] text-zinc-400">(Hidden)</span>
                  )}
                </li>
              ))}
              {abilities.length === 0 && (
                <li className="text-sm text-zinc-400">No abilities listed</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-zinc-900">
              Base Experience
            </h2>
            <p className="text-2xl font-bold text-[color:var(--color-brand-500)] tabular-nums">
              {baseExperienceDisplay}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
