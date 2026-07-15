type Bucket = { tokens: number; updatedAt: number };

const buckets = new Map<string, Bucket>();

const CAPACITY = 12;
const REFILL_PER_MS = CAPACITY / (60 * 1000); // full refill each minute

/** In-memory IP token-bucket limiter (12 requests/min/IP). */
export function rateLimit(ip: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(ip) ?? { tokens: CAPACITY, updatedAt: now };

  const elapsed = now - existing.updatedAt;
  const tokens = Math.min(CAPACITY, existing.tokens + elapsed * REFILL_PER_MS);

  if (tokens < 1) {
    buckets.set(ip, { tokens, updatedAt: now });
    return { ok: false, remaining: 0 };
  }

  const next = { tokens: tokens - 1, updatedAt: now };
  buckets.set(ip, next);

  // opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [key, b] of buckets) {
      if (now - b.updatedAt > 5 * 60 * 1000) buckets.delete(key);
    }
  }

  return { ok: true, remaining: Math.floor(next.tokens) };
}
