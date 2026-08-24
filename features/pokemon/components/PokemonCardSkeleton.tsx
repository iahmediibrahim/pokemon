import { Card, Skeleton } from "@/components/ui";
import { ListSkeletonGrid } from "@/components/ui/list";

export function PokemonCardSkeleton() {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="aspect-square bg-zinc-100 p-3">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>
      <div className="px-3 py-3 flex flex-col items-center gap-1.5">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-3 w-12 rounded" />
      </div>
    </Card>
  );
}

export function PokemonCardGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <ListSkeletonGrid
      count={count}
      gridClassName="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      renderSkeleton={(i) => <PokemonCardSkeleton key={i} />}
    />
  );
}
