import crypto from "crypto";

interface CacheEntry {
  output: unknown;
  tokenSaved: number;
  expiresAt: number;
}

const store = new Map<string, CacheEntry>();

export function hashInput(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex").slice(0, 16);
}

export function getCached(key: string): unknown | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.output;
}

export function setCache(key: string, output: unknown, tokenSaved = 0, ttlMs = 3600_000) {
  store.set(key, { output, tokenSaved, expiresAt: Date.now() + ttlMs });
}

export async function withSemanticCache<T>(
  companyId: string,
  task: string,
  input: string,
  compute: () => Promise<T>
): Promise<{ result: T; cacheHit: boolean; tokenSaved: number }> {
  const key = `${companyId}:${task}:${hashInput(input)}`;
  const cached = getCached(key);
  if (cached) return { result: cached as T, cacheHit: true, tokenSaved: 500 };

  const result = await compute();
  setCache(key, result, 500);
  return { result, cacheHit: false, tokenSaved: 0 };
}
