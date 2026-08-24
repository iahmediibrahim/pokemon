export function capitalize(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function kebabToSpaces(s: string): string {
  return s.replace(/-/g, " ");
}

export function padNumber(value: number, length = 3): string {
  return String(value).padStart(length, "0");
}

export function formatMetric(decimeters: number, unit = "m"): string {
  return `${(decimeters / 10).toFixed(1)} ${unit}`;
}

export function formatKilograms(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}

export function padId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

export function clamp0100(n: number): number {
  return Math.max(0, Math.min(100, n));
}

export function typeLabel(name: string): string {
  return capitalize(kebabToSpaces(name));
}

export type DebouncedFn<T extends (...args: never[]) => unknown> = T & {
  cancel: () => void;
  flush: () => void;
};

export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  waitMs: number,
): DebouncedFn<T> {
  let t: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  const debounced = ((...args: Parameters<T>) => {
    lastArgs = args;
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      t = null;
      const a = lastArgs;
      lastArgs = null;
      if (a) fn(...a);
    }, waitMs);
  }) as DebouncedFn<T>;
  debounced.cancel = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    lastArgs = null;
  };
  debounced.flush = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    const a = lastArgs;
    lastArgs = null;
    if (a) fn(...a);
  };
  return debounced;
}
