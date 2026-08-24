import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "success" | "error" | "warning" | "brand";
  children: ReactNode;
}

const tones = {
  default: "bg-zinc-100 text-zinc-700 border-zinc-200",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-amber-100 text-amber-800 border-amber-200",
  brand: "bg-brand-50 text-brand-600 border-brand-100",
};

export function Badge({
  tone = "default",
  className = "",
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
