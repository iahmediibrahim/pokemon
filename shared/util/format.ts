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
