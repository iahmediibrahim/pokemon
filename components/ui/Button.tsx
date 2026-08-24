"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "disabled-ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-black text-white hover:bg-zinc-800 active:bg-zinc-900 rounded-[--radius-button]",
  secondary:
    "bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100 rounded-[--radius-button]",
  outline:
    "bg-transparent text-zinc-700 border border-zinc-300 hover:bg-zinc-50 rounded-[--radius-button]",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 rounded-[--radius-button]",
  "disabled-ghost":
    "bg-transparent text-zinc-400 rounded-[--radius-button]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-lg",
  lg: "h-12 px-6 text-base rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  isLoading,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
