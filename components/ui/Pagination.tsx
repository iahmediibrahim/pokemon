"use client";

import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  itemsShown?: number;
  totalItems?: number;
}

function pageNumbers(
  current: number,
  total: number,
  siblingCount = 1,
  boundaryCount = 1
): (number | "ellipsis-start" | "ellipsis-end")[] {
  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = [];
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(total - 1, current + siblingCount);

  for (let i = 1; i <= boundaryCount; i++) pages.push(i);
  if (left > boundaryCount + 1) pages.push("ellipsis-start");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - boundaryCount) pages.push("ellipsis-end");
  for (let i = total - boundaryCount + 1; i <= total; i++) {
    if (i > boundaryCount) pages.push(i);
  }

  return Array.from(new Set(pages)).filter((p) =>
    typeof p === "number" ? p >= 1 && p <= total : true
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
  itemsShown,
  totalItems,
}: PaginationProps) {
  const pages = pageNumbers(currentPage, totalPages, siblingCount, boundaryCount);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
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
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "ellipsis-start" || p === "ellipsis-end") {
              return (
                <span
                  key={`${p}-${idx}`}
                  className="inline-flex h-9 w-9 items-center justify-center text-sm text-zinc-500"
                  aria-hidden
                >
                  …
                </span>
              );
            }
            const isActive = p === currentPage;
            return (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex h-9 min-w-[36px] items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-zinc-700 hover:bg-black/5"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          Next
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M9 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      {(itemsShown !== undefined || totalItems !== undefined) && (
        <p className="text-xs text-zinc-500">
          Page <span className="font-medium text-zinc-700">{currentPage}</span> of{" "}
          <span className="font-medium text-zinc-700">{totalPages}</span>
          {itemsShown !== undefined && (
            <>
              {" "}
              (<span className="font-medium text-zinc-700">{itemsShown}</span> Pokémon shown)
            </>
          )}
        </p>
      )}
    </div>
  );
}
