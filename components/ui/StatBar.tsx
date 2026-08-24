interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  accent?: "default" | "fire" | "water" | "grass";
}

const accentFill: Record<NonNullable<StatBarProps["accent"]>, string> = {
  default: "bg-zinc-900",
  fire: "bg-[color:var(--color-type-fire)]",
  water: "bg-[color:var(--color-type-water)]",
  grass: "bg-[color:var(--color-type-grass)]",
};

export function StatBar({
  label,
  value,
  maxValue = 255,
  accent = "default",
}: StatBarProps) {
  const pct = Math.max(0, Math.min(100, (value / maxValue) * 100));
  return (
    <div className="flex items-center gap-4 py-1.5">
      <div className="w-24 flex-shrink-0 text-sm font-medium text-zinc-700">
        {label}
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={label}
          style={{ ["--stat-fill" as string]: `${pct}%` }}
        >
          <div
            className={`absolute inset-y-0 left-0 w-[var(--stat-fill)] ${accentFill[accent]} rounded-full transition-[width] duration-500`}
          />
        </div>
        <div className="w-10 text-right text-sm tabular-nums text-zinc-700">
          {value}
        </div>
      </div>
    </div>
  );
}
