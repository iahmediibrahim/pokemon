import {
  DEFAULT_VIEW_MODE,
  VIEW_MODES,
  type ViewMode,
} from "@/features/pokemon/view-options";
import { parseEnum, parsePageParam } from "@/shared/util/validation";
import { HomeClient } from "./_home/HomeClient";

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home(props: HomePageProps) {
  const sp = (await props.searchParams) ?? {};
  const mode = parseEnum<ViewMode>(sp.view, VIEW_MODES, DEFAULT_VIEW_MODE);
  const initialPage = parsePageParam(sp.page);

  return <HomeClient mode={mode} initialPage={initialPage} />;
}
