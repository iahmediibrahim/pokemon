"use client";

import { useEffect } from "react";
import {
  usePokemonList,
  usePokemonInfinite,
  usePokemonDetail,
} from "@/features/pokemon";

export default function Home() {
  const list = usePokemonList({ page: 1, pageSize: 5 });
  const infinite = usePokemonInfinite({ pageSize: 5 });
  const detail = usePokemonDetail({ id: 25 });

  useEffect(() => {
    if (list.pokemons.length > 0) {
      console.log("📋 [usePokemonList] Page 1 (limit=5):", {
        pokemons: list.pokemons,
        count: list.count,
        totalPages: list.totalPages,
        hasNextPage: list.hasNextPage,
        hasPrevPage: list.hasPrevPage,
      });
    }
    if (list.error) {
      console.error("❌ [usePokemonList] Error:", list.error);
    }
  }, [list.pokemons, list.count, list.totalPages, list.hasNextPage, list.hasPrevPage, list.error, list.isPending]);

  useEffect(() => {
    if (infinite.pokemons.length > 0) {
      console.log("♾️  [usePokemonInfinite]:", {
        pokemons: infinite.pokemons,
        totalCount: infinite.totalCount,
        hasNextPage: infinite.hasNextPage,
      });
    }
    if (infinite.error) {
      console.error("❌ [usePokemonInfinite] Error:", infinite.error);
    }
  }, [infinite.pokemons, infinite.totalCount, infinite.hasNextPage, infinite.error, infinite.isPending]);

  useEffect(() => {
    if (detail.pokemon) {
      console.log(
        "🔎 [usePokemonDetail] #25:",
        {
          name: detail.pokemon.name,
          heightMeters: detail.heightMeters,
          weightKilograms: detail.weightKilograms,
          typeNames: detail.typeNames,
          spriteUrl: detail.spriteUrl,
        },
        detail.pokemon
      );
    }
    if (detail.error) {
      console.error("❌ [usePokemonDetail] Error:", detail.error);
    }
  }, [detail.pokemon, detail.heightMeters, detail.weightKilograms, detail.typeNames, detail.spriteUrl, detail.error, detail.isPending]);

  const loadingCount = [list.isPending, infinite.isPending, detail.isPending].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-foreground p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Pokémon API Test — Console Log</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          Open your browser DevTools console to inspect the API responses.
        </p>

        <section className="space-y-6">
          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg">
                usePokemonList <span className="text-sm text-zinc-500">(page 1, limit 5)</span>
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  list.isPending
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                    : list.isError
                    ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
              >
                {list.isPending
                  ? "Loading"
                  : list.isError
                  ? "Error"
                  : `Success · ${list.count} total · ${list.totalPages} pages`}
              </span>
            </div>
            {list.pokemons.length > 0 && (
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 font-mono">
                {list.pokemons.map((p) => (
                  <li key={p.id}>
                    #{p.id} {p.name}
                  </li>
                ))}
              </ul>
            )}
            {list.error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                {list.error.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg">
                usePokemonInfinite <span className="text-sm text-zinc-500">(page 0, limit 5)</span>
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  infinite.isPending
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                    : infinite.isError
                    ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
              >
                {infinite.isPending
                  ? "Loading"
                  : infinite.isError
                  ? "Error"
                  : `Success · hasNextPage=${String(infinite.hasNextPage)}`}
              </span>
            </div>
            {infinite.pokemons.length > 0 && (
              <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 font-mono">
                {infinite.pokemons.map((p) => (
                  <li key={p.id}>
                    #{p.id} {p.name}
                  </li>
                ))}
              </ul>
            )}
            {infinite.error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                {infinite.error.message}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg">
                usePokemonDetail <span className="text-sm text-zinc-500">(#25 pikachu)</span>
              </h2>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  detail.isPending
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"
                    : detail.isError
                    ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                }`}
              >
                {detail.isPending
                  ? "Loading"
                  : detail.isError
                  ? "Error"
                  : detail.pokemon
                  ? `Success · ${detail.pokemon.name}`
                  : "Idle"}
              </span>
            </div>
            {detail.pokemon && (
              <div className="flex gap-5 items-center">
                <img
                  src={detail.spriteUrl ?? ""}
                  alt={detail.pokemon.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 bg-zinc-100 dark:bg-zinc-900 rounded-lg"
                />
                <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm font-mono">
                  <dt className="text-zinc-500">Name</dt>
                  <dd>{detail.pokemon.name}</dd>
                  <dt className="text-zinc-500">Height</dt>
                  <dd>{detail.heightMeters} m</dd>
                  <dt className="text-zinc-500">Weight</dt>
                  <dd>{detail.weightKilograms} kg</dd>
                  <dt className="text-zinc-500">Types</dt>
                  <dd>{detail.typeNames.join(", ")}</dd>
                </dl>
              </div>
            )}
            {detail.error && (
              <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                {detail.error.message}
              </p>
            )}
          </div>
        </section>

        {loadingCount > 0 && (
          <p className="mt-6 text-center text-sm text-zinc-500">
            {loadingCount} / 3 queries still loading…
          </p>
        )}
      </div>
    </div>
  );
}
