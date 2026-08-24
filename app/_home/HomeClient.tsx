"use client";

import {
  InfiniteView,
  PaginationView,
  PokedexHeader,
  type ViewMode,
} from "@/features/pokemon";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface HomeClientProps {
  mode: ViewMode;
  initialPage: number;
}

export function HomeClient({ mode, initialPage }: HomeClientProps) {
  const router = useRouter();

  const handleModeChange = useCallback(
    (next: ViewMode) => {
      if (next === mode) return;
      const params = new URLSearchParams();
      params.set("view", next);
      if (next === "pagination" && initialPage > 1) {
        params.set("page", String(initialPage));
      }
      router.replace(`/?${params.toString()}`, { scroll: false });
    },
    [mode, initialPage, router],
  );

  return (
    <div
      className={`flex-1 min-h-0 ${
        mode === "pagination" ? "bg-page-pagination" : "bg-page-infinite"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <PokedexHeader mode={mode} onModeChange={handleModeChange} />
        <main>
          {mode === "pagination" ? <PaginationView /> : <InfiniteView />}
        </main>
      </div>
    </div>
  );
}
