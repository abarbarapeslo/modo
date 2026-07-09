import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "./env.js";

export const prisma = new PrismaClient({
  datasources: {
    db: { url: getDatabaseUrl() },
  },
});

export async function connectDb() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected");
  } catch (err) {
    console.warn("Database unavailable — serving mock payloads:", (err as Error).message);
  }
}
