export function isPositiveIntegerString(value: unknown): boolean {
  if (typeof value !== "string") return false;
  if (value.length === 0) return false;
  if (!/^\d+$/.test(value)) return false;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0;
}
