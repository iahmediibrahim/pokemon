const BASE_URL = "https://pokeapi.co/api/v2";

interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { retries = 2, retryDelay = 1000, ...fetchOptions } = options;
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        throw new ApiError(
          `Request failed with status ${response.status}`,
          response.status
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      if (attempt < retries && !(error instanceof ApiError && error.status && error.status >= 400 && error.status < 500)) {
        await delay(retryDelay * Math.pow(2, attempt));
        continue;
      }
      break;
    }
  }

  if (lastError instanceof ApiError) {
    throw lastError;
  }
  throw new ApiError(
    lastError instanceof Error ? lastError.message : "Unknown network error"
  );
}

export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? parseInt(matches[1], 10) : 0;
}

export function buildSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
