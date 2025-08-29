// Minimal fetch helper for Electron + Vite + React (TypeScript)

/** JSON-serializable value */
export type Json =
  | Record<string, unknown>
  | unknown[]
  | string
  | number
  | boolean
  | null;

/** Normalized API error */
export type ApiError = {
  status: number;
  statusText: string;
  message: string;
  body?: unknown;
};

/** Configure the API base URL via VITE_API_BASE or default to localhost */
export const API_BASE: string =
  (import.meta as any).env?.VITE_API_BASE?.toString?.() || "http://localhost:4000";

/**
 * apiFetch
 * - Injects Authorization header if token is provided
 * - Sends/receives JSON by default
 * - Supports query parameters
 * - Adds a safety timeout via AbortSignal.timeout (Node/Electron supported)
 */
export async function apiFetch<T = unknown>(
  path: string,
  opts: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    token?: string | null;
    query?: Record<string, string | number | boolean | undefined>;
    body?: Json;
    headers?: Record<string, string>;
    timeoutMS?: number; // default 15000
  } = {}
): Promise<T> {
  const {
    method = "GET",
    token,
    query,
    body,
    headers = {},
    timeoutMS = 15000,
  } = opts;

  const url = buildUrl(API_BASE, path, query);

  const hasJsonBody =
    body !== undefined && body !== null && method !== "GET";

  const init: RequestInit = {
    method,
    headers: {
      ...(hasJsonBody ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(hasJsonBody ? { body: JSON.stringify(body) } : {}),
    // Abort fetch after timeoutMS to prevent hangs
    // If running on an older environment without AbortSignal.timeout,
    // swap to a custom AbortController (polyfill if needed).
    signal:
      typeof AbortSignal !== "undefined" &&
      typeof (AbortSignal as any).timeout === "function"
        ? (AbortSignal as any).timeout(timeoutMS)
        : undefined,
  };

  const res = await fetch(url, init);

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");

  const parsed = isJson ? await tryParseJson(res) : await res.text();

  if (!res.ok) {
    throw normalizeError(res, parsed);
  }

  return parsed as T;
}

/** Build a URL from base + path with optional query parameters */
function buildUrl(
  base: string,
  path: string,
  query?: Record<string, string | number | boolean | undefined>
) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(cleanBase + cleanPath);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined) continue;
      url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

/** Safely parse JSON; return text on failure */
async function tryParseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (text.length === 0) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** Create a user-friendly ApiError object */
function normalizeError(res: Response, data: unknown): ApiError {
  return {
    status: res.status,
    statusText: res.statusText,
    message: inferMessage(res.status, data),
    body: data,
  };
}

/** Best-effort message extraction */
function inferMessage(status: number, data: unknown): string {
  if (typeof data === "string" && data.trim().length) return data;
  if (data && typeof data === "object" && "message" in (data as any)) {
    const m = (data as any).message;
    if (typeof m === "string") return m;
  }
  if (status === 401) return "Unauthorized";
  if (status === 403) return "Forbidden";
  if (status === 404) return "Not found";
  if (status >= 500) return "Server error";
  return "Request failed";
}
