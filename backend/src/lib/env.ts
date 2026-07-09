import dotenv from "dotenv";
import path from "node:path";

const rootEnv = path.resolve(process.cwd(), "../.env");
const localEnv = path.resolve(process.cwd(), ".env");

dotenv.config({ path: rootEnv });
dotenv.config({ path: localEnv, override: true });

export function getDatabaseUrl(): string {
  if (process.env.DATABASE_URL?.trim()) {
    return process.env.DATABASE_URL.trim();
  }

  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST ?? "localhost";
  const port = process.env.POSTGRES_PORT ?? "5432";
  const database = process.env.POSTGRES_DB ?? "modo";

  if (!user || !password) {
    throw new Error(
      "Missing database config. Set DATABASE_URL or POSTGRES_USER + POSTGRES_PASSWORD in .env",
    );
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);

  return `postgresql://${encodedUser}:${encodedPassword}@${host}:${port}/${database}`;
}
