interface PokemonSilhouetteProps {
  label?: string;
  className?: string;
}

export function PokemonSilhouette({
  label = "Pokémon artwork unavailable",
  className = "h-full w-full opacity-25 text-zinc-700",
}: PokemonSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={label}
    >
      <g fill="currentColor">
        <path d="M50 14c-19.9 0-36 16.1-36 36 0 9.2 3.4 17.6 9.1 24L9 93l19-14.1c6.4 4.6 14.3 7.1 22 7.1 19.9 0 36-16.1 36-36S69.9 14 50 14zm0 64c-15.5 0-28-12.5-28-28S34.5 22 50 22s28 12.5 28 28-12.5 28-28 28z" />
        <circle cx="39" cy="43" r="5" />
        <circle cx="61" cy="43" r="5" />
        <path
          d="M37 58c2 5 7 8 13 8s11-3 13-8"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
