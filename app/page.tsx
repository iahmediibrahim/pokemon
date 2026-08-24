import type { ViewMode } from "@/features/pokemon/components/PokedexHeader";
import { HomeClient } from "./_home/HomeClient";

const VALID_MODES: readonly ViewMode[] = ["pagination", "infinite"] as const;

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function parseMode(raw: string | string[] | undefined): ViewMode {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return VALID_MODES.includes(v as ViewMode) ? (v as ViewMode) : "infinite";
}

function parsePage(raw: string | string[] | undefined): number {
  const v = Array.isArray(raw) ? raw[0] : raw;
  const n = v ? Number.parseInt(v, 10) : 1;
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

export default async function Home(props: HomePageProps) {
  const sp = (await props.searchParams) ?? {};
  const mode = parseMode(sp.view);
  const initialPage = parsePage(sp.page);

  return <HomeClient mode={mode} initialPage={initialPage} />;
}
