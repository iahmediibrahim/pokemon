interface LoadingSpinnerProps {
  label?: string;
  tone?: "default" | "brand" | "inverted";
  size?: "sm" | "md" | "lg";
}

const tones = {
  default: "text-zinc-500",
  brand: "text-brand-600",
  inverted: "text-white",
};

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export function LoadingSpinner({
  label,
  tone = "default",
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div className="inline-flex items-center gap-3" role="status" aria-live="polite">
      <svg
        className={`animate-spin ${tones[tone]} ${sizes[size]}`}
        viewBox="0 0 50 50"
        fill="none"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="3"
          strokeOpacity="0.25"
        />
        <path
          d="M45 25a20 20 0 00-20-20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="1"
        />
      </svg>
      {label && (
        <span className={`text-sm font-medium ${tones[tone]}`}>{label}</span>
      )}
    </div>
  );
}
