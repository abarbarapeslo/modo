import "./lib/env.js";
import express from "express";
import cors from "cors";
import { connectDb } from "./lib/prisma.js";
import { authRouter } from "./routes/auth.js";
import { companiesRouter } from "./routes/companies.js";
import { meetingsRouter } from "./routes/meetings.js";
import { decisionsRouter } from "./routes/decisions.js";
import { okrsRouter } from "./routes/okrs.js";
import { demandsRouter } from "./routes/demands.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { simulationsRouter } from "./routes/simulations.js";
import { marketMapRouter } from "./routes/marketMap.js";
import { agentsRouter } from "./routes/agents.js";
import { agentChatRouter } from "./routes/agentChat.js";
import { llmClient } from "./ai/llmClient.js";
import { getAgentRulesSummary } from "./ai/agentRules.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

app.use(cors({ origin: [FRONTEND_ORIGIN], credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "modo-backend",
    version: "0.1.0",
    llmProvider: llmClient.activeProvider,
    agents: getAgentRulesSummary(),
  });
});

app.use("/api/auth", authRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/meetings", meetingsRouter);
app.use("/api/decisions", decisionsRouter);
app.use("/api/okrs", okrsRouter);
app.use("/api/internal-demands", demandsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/simulations", simulationsRouter);
app.use("/api/market-map", marketMapRouter);
app.use("/api/agents", agentsRouter);
app.use("/api/agent", agentChatRouter);

await connectDb();

app.listen(PORT, () => {
  console.log(`MODO backend listening on http://localhost:${PORT}`);
});
