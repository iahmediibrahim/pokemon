import { PokemonDetailClient } from "@/features/pokemon/components";
import { isPositiveIntegerString } from "@shared/util/validation";
import { notFound } from "next/navigation";

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = await params;

  if (!isPositiveIntegerString(id)) {
    notFound();
  }

  return <PokemonDetailClient id={id} />;
}
