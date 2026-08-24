import { Skeleton } from "@/components/ui/Skeleton";

const STAT_LABEL_WIDTHS = [
  "w-20",
  "w-24",
  "w-28",
  "w-20",
  "w-24",
  "w-28",
] as const;

const STAT_BAR_WIDTHS = [
  "w-[40%]",
  "w-[55%]",
  "w-[65%]",
  "w-[45%]",
  "w-[75%]",
  "w-[90%]",
] as const;

export function PokemonDetailSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white border border-black/[0.04] shadow-[0_10px_40px_-12px_rgb(0_0_0_/_0.12)] animate-pulse"
      aria-busy="true"
      role="status"
      aria-label="Loading Pokémon details"
    >
      <div className="bg-gradient-to-r from-zinc-200 via-fuchsia-100 to-pink-100 px-6 py-8 text-center">
        <div className="mx-auto w-48">
          <Skeleton className="mx-auto h-8 w-40 rounded-lg" />
          <Skeleton className="mx-auto mt-3 h-4 w-16 rounded" />
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div className="space-y-6 flex flex-col">
          <div className="flex items-center justify-center">
            <div className="relative h-56 w-56 sm:h-64 sm:w-64 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <Skeleton className="h-40 w-40 sm:h-48 sm:w-48 rounded-3xl" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-7 w-20 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <Skeleton className="h-3 w-16 rounded mb-3" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4">
              <Skeleton className="h-3 w-16 rounded mb-3" />
              <Skeleton className="h-6 w-20 rounded" />
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <div>
            <Skeleton className="h-5 w-28 rounded mb-5" />
            <ul className="space-y-4">
              {STAT_LABEL_WIDTHS.map((labelW, i) => (
                <li key={i}>
                  <div className="flex items-center justify-between mb-1.5 gap-3">
                    <Skeleton className={`h-3.5 rounded ${labelW}`} />
                    <Skeleton className="h-3.5 w-8 rounded" />
                  </div>
                  <Skeleton
                    className={`h-2 rounded-full ${STAT_BAR_WIDTHS[i]}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Skeleton className="h-5 w-24 rounded mb-4" />
            <div className="flex flex-wrap gap-2 items-center">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>
          </div>

          <div>
            <Skeleton className="h-5 w-36 rounded mb-3" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
