"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

export default function PokemonDetailError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("[Pokemon Detail Error]", error);
  }, [error]);

  const handleGoHome = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex-1 bg-page-detail">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <Button
            variant="secondary"
            size="md"
            onClick={handleGoHome}
            aria-label="Back to List"
            leftIcon={
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                aria-hidden
              >
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
        </div>

        <ErrorState
          title="Could not load Pokémon"
          message={
            error?.message?.includes("status 404")
              ? "This Pokémon doesn't exist. Check the ID and try again."
              : error?.message?.includes("Request failed")
                ? "We couldn't reach the server. Please try again."
                : "Something went wrong while loading this Pokémon."
          }
          onRetry={retry}
        />
      </div>
    </div>
  );
}
