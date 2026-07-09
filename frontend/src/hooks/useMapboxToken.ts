import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

let cached: string | null | undefined;
let inflight: Promise<string | null> | null = null;

async function fetchMapboxToken(): Promise<string | null> {
  if (cached !== undefined) return cached;
  if (inflight) return inflight;

  inflight = apiFetch<{ token: string | null }>("/api/config/mapbox-token")
    .then((res) => {
      cached = res.token?.trim() || null;
      return cached;
    })
    .catch(() => {
      cached = null;
      return null;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function useMapboxToken() {
  const [token, setToken] = useState<string | null>(cached ?? null);
  const [loading, setLoading] = useState(cached === undefined);

  useEffect(() => {
    let active = true;
    fetchMapboxToken().then((t) => {
      if (active) {
        setToken(t);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { token, loading };
}
