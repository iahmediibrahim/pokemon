export const pokemonQueryKeys = {
  all: ["pokemon"] as const,

  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  allPaginatedLists: () => [...pokemonQueryKeys.lists(), "paginated"] as const,
  allInfiniteLists: () => [...pokemonQueryKeys.lists(), "infinite"] as const,

  listPaginated: (page: number, pageSize: number) =>
    [...pokemonQueryKeys.allPaginatedLists(), { page, pageSize }] as const,
  listInfinite: (pageSize: number) =>
    [...pokemonQueryKeys.allInfiniteLists(), { pageSize }] as const,

  details: () => [...pokemonQueryKeys.all, "detail"] as const,
  detailById: (id: number | string) =>
    [...pokemonQueryKeys.details(), id] as const,
} as const;

export type PokemonQueryKeyAll = (typeof pokemonQueryKeys)["all"];
export type PokemonQueryKeyListsRoot = ReturnType<
  (typeof pokemonQueryKeys)["lists"]
>;
export type PokemonQueryKeyListsAllPaginated = ReturnType<
  (typeof pokemonQueryKeys)["allPaginatedLists"]
>;
export type PokemonQueryKeyListsAllInfinite = ReturnType<
  (typeof pokemonQueryKeys)["allInfiniteLists"]
>;
export type PokemonQueryKeyListsPaginated = ReturnType<
  (typeof pokemonQueryKeys)["listPaginated"]
>;
export type PokemonQueryKeyListsInfinite = ReturnType<
  (typeof pokemonQueryKeys)["listInfinite"]
>;
export type PokemonQueryKeyDetailsRoot = ReturnType<
  (typeof pokemonQueryKeys)["details"]
>;
export type PokemonQueryKeyDetailsById = ReturnType<
  (typeof pokemonQueryKeys)["detailById"]
>;

export type PokemonQueryKeys = typeof pokemonQueryKeys;
