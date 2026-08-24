export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelayMs?: number;
  baseUrl?: string;
}

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    retries = 2,
    retryDelayMs = 1000,
    baseUrl,
    headers,
    ...fetchOptions
  } = options;

  const url =
    endpoint.startsWith("http") || !baseUrl
      ? endpoint
      : `${baseUrl.replace(/\/$/, "")}${
          endpoint.startsWith("/") ? endpoint : `/${endpoint}`
        }`;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        throw new ApiError(
          `Request failed with status ${response.status}`,
          response.status,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
      const isClientError =
        error instanceof ApiError &&
        error.status &&
        error.status >= 400 &&
        error.status < 500;
      if (attempt < retries && !isClientError) {
        await delay(retryDelayMs * Math.pow(2, attempt));
        continue;
      }
      break;
    }
  }

  if (lastError instanceof ApiError) {
    throw lastError;
  }
  throw new ApiError(
    lastError instanceof Error ? lastError.message : "Unknown network error",
  );
}

export function extractIdFromUrl(url: string): number {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? Number.parseInt(matches[1], 10) : 0;
}
