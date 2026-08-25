import { PokemonDetailClient } from "@/features/pokemon/components";
import type { PokemonDetail } from "@/features/pokemon/model/api-contracts";
import { toDetailVM } from "@/features/pokemon/model/transformers";
import { isPositiveIntegerString } from "@/shared/util/validation";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PokemonDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!isPositiveIntegerString(id)) {
    notFound();
  }
  const numericId = Number.parseInt(id, 10);

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${numericId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      return {};
    }
    const dto = (await res.json()) as PokemonDetail;
    const detail = toDetailVM(dto);
    const typeList = detail.types.map((t) => t.label).join(", ");
    const imageUrl =
      detail.officialArtworkUrl ??
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${detail.id}.png`;
    const description = `${detail.paddedId} ${detail.displayName}. Types: ${typeList}. Height: ${detail.heightDisplay}, Weight: ${detail.weightDisplay}.`;

    return {
      title: detail.displayName,
      description,
      openGraph: {
        title: detail.displayName,
        description,
        images: [
          {
            url: imageUrl,
            width: 475,
            height: 475,
            alt: `Official artwork of ${detail.displayName}`,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: detail.displayName,
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
