export function isPositiveIntegerString(value: unknown): boolean {
  if (typeof value !== "string") return false;
  if (value.length === 0) return false;
  if (!/^\d+$/.test(value)) return false;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0;
}

function firstString(
  raw: string | string[] | undefined | null,
): string | undefined {
  return Array.isArray(raw) ? raw[0] : (raw ?? undefined);
}

export function parsePositiveInt(
  raw: string | string[] | undefined | null,
  options: { min?: number; max?: number; default?: number } = {},
): number {
  const { min = 1, default: fallback = 1 } = options;
  const { max } = options;
  const v = firstString(raw);
  if (!v) return fallback;
  const n = Number.parseInt(v, 10);
  if (!Number.isFinite(n)) return fallback;
  if (n < min) return fallback;
  if (max !== undefined && n > max) return max;
  return n;
}

export function parsePageParam(
  raw: string | string[] | undefined | null,
  options: { maxPage?: number; default?: number } = {},
): number {
  return parsePositiveInt(raw, {
    min: 1,
    max: Number.isFinite(options.maxPage) ? options.maxPage : undefined,
    default: options.default ?? 1,
  });
}

export function parseEnum<T extends string>(
  raw: string | string[] | undefined | null,
  validValues: readonly T[],
  fallback: T,
): T {
  if (!validValues || !Array.isArray(validValues)) {
    return fallback;
  }
  const v = firstString(raw) as T | undefined;
  return v !== undefined && validValues.includes(v) ? v : fallback;
}
