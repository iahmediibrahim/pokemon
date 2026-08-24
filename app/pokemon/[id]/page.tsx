import { buildOfficialArtworkUrl } from "@/features/pokemon/api/constants";
import { getPokemonById } from "@/features/pokemon/api/pokemon";
import { PokemonDetailClient } from "@/features/pokemon/components";
import { capitalize } from "@shared/util/format";
import { isPositiveIntegerString } from "@shared/util/validation";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const { id } = await params;
    const numericId = Number.parseInt(id, 10);
    const validId = isPositiveIntegerString(id) && Number.isFinite(numericId);

    if (!validId) {
      notFound();
    }

    const pokemon = await getPokemonById(numericId);
    const displayName = capitalize(pokemon.name);
    const imageUrl = buildOfficialArtworkUrl(pokemon.id);
    const typeList = pokemon.types
      .map((t) => capitalize(t.type.name))
      .join(", ");
    const heightM = (pokemon.height / 10).toFixed(1);
    const weightKg = (pokemon.weight / 10).toFixed(1);
    const description = `No. ${pokemon.id.toString().padStart(3, "0")} ${displayName}. Types: ${typeList}. Height: ${heightM}m, Weight: ${weightKg}kg.`;

    return {
      title: displayName,
      description,
      openGraph: {
        title: displayName,
        description,
        images: [
          {
            url: imageUrl,
            width: 475,
            height: 475,
            alt: `Official artwork of ${displayName}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: displayName,
        description,
        images: [imageUrl],
      },
    };
  } catch (err) {
    return {};
  }
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
