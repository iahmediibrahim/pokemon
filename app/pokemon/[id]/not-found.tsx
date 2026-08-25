import { Button } from "@/components/ui/Button";
import { ChevronLeftIcon } from "@/components/ui/icons";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flex-1 bg-page-detail">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-purple-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-10 w-10"
            aria-hidden
          >
            <path
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">
          Pokémon not found
        </h2>
        <p className="text-zinc-500 max-w-md mb-8">
          The Pokémon you are looking for doesn&apos;t exist in the National
          Pokédex. Check the ID in the URL or head back to the list.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
            >
              Back to Pokédex
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
