import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-sky-50 p-6">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-zinc-900 text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-12 w-12"
            aria-hidden
          >
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">
          Page not found
        </h1>
        <p className="text-zinc-500 max-w-sm mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button
            variant="primary"
            size="md"
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
            Back to Pokédex
          </Button>
        </Link>
      </div>
    </div>
  );
}
