import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const paddings = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

export function Card({
  children,
  padding = "md",
  hoverable = false,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-[--radius-card] border border-black/[0.06] dark:border-white/[0.08] shadow-[--shadow-card] ${
        hoverable
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-card-hover]"
          : ""
      } ${paddings[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
