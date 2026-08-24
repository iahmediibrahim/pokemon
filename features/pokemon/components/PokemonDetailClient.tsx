"use client";

import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import {
  PokemonDetailPanel,
  PokemonDetailSkeleton,
} from "@/features/pokemon/components";
import { usePokemonDetail } from "@/features/pokemon/hooks/usePokemonDetail";
import Link from "next/link";
import { useCallback } from "react";

function BackButton() {
  return (
    <Link href="/" className="inline-flex">
      <Button
        variant="secondary"
        size="md"
        aria-label="Back to List"
        leftIcon={
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M15 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      >
        Back to List
      </Button>
    </Link>
  );
}

interface PokemonDetailClientProps {
  id: string;
}

export function PokemonDetailClient({ id }: PokemonDetailClientProps) {
  const { detail, isPending, isError, error, refetch } = usePokemonDetail({
    id,
  });

  const handleRetry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return (
    <div className="flex-1 bg-page-detail">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>

        {isPending ? (
          <PokemonDetailSkeleton />
        ) : isError ? (
          <ErrorState
            title="Could not load Pokémon"
            message={error?.message ?? "Please check the ID and try again."}
            onRetry={handleRetry}
          />
        ) : detail ? (
          <PokemonDetailPanel detail={detail} />
        ) : null}
      </div>
    </div>
  );
}
