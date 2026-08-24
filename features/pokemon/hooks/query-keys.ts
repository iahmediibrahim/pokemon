export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  listPaginated: (page: number, pageSize: number) =>
    [...pokemonQueryKeys.lists(), "paginated", { page, pageSize }] as const,
  listInfinite: (pageSize: number) =>
    [...pokemonQueryKeys.lists(), "infinite", { pageSize }] as const,
  details: () => [...pokemonQueryKeys.all, "detail"] as const,
  detailById: (id: number | string) =>
    [...pokemonQueryKeys.details(), id] as const,
} as const;

export type PokemonQueryKeys = typeof pokemonQueryKeys;
