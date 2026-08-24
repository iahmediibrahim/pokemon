"use client";

import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load the data. Please try again.",
  onRetry,
  compact = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center text-center ${
        compact ? "py-6" : "py-16"
      } px-6`}
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
          <path
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-zinc-900 mb-1">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-5">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
