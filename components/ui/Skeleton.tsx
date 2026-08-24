interface SkeletonProps {
  className?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const rounds = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({
  className = "h-4 w-24",
  rounded = "md",
}: SkeletonProps) {
  return (
    <div
      className={`bg-zinc-200/80 dark:bg-zinc-800 animate-pulse ${rounds[rounded]} ${className}`}
      aria-hidden
    />
  );
}
