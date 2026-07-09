const API_BASE = import.meta.env.VITE_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { token?: string },
): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.token) headers.set("Authorization", `Bearer ${init.token}`);
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error ?? res.statusText, res.status);
  }

  return res.json() as Promise<T>;
}

export const api = {
  health: () => apiFetch<{ status: string; service: string; agents: unknown }>("/api/health"),

  login: (email: string, password: string) =>
    apiFetch<{ token: string; user: { id: string; email: string; name: string; role: string }; demo?: boolean }>(
      "/api/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) },
    ),

  chat: (message: string, token?: string) =>
    apiFetch<{ reply: string; provider: string }>("/api/agent/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
      token,
    }),

  reimagine: (scenarioPrompt: string, token?: string) =>
    apiFetch<{ projectedImplications: string[]; confidenceScore: number }>(
      "/api/simulations/reimagine",
      {
        method: "POST",
        body: JSON.stringify({ companyId: "acme-electronics", scenarioPrompt }),
        token,
      },
    ),
};
