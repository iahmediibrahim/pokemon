"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-emerald-50 to-sky-50 p-6">
      <ErrorState
        title="Something went wrong"
        message={error?.message?.includes("Request failed")
          ? "We couldn't load this page. Please try again."
          : "An unexpected error occurred. Please try again."}
        onRetry={retry}
      />
    </div>
  );
}
