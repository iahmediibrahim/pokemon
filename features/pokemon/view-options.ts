export type ViewMode = "pagination" | "infinite";

export const VIEW_MODES: readonly ViewMode[] = [
  "pagination",
  "infinite",
] as const;

export const DEFAULT_VIEW_MODE: ViewMode = "infinite";
