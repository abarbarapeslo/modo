import { Router } from "express";
import { getAgentRulesSummary, getAgentRules, getSkills } from "../ai/agentRules.js";

export const agentsRouter = Router();

agentsRouter.get("/rules", (_req, res) => {
  const summary = getAgentRulesSummary();
  const agents = getAgentRules().map(({ id, domain, name }) => ({ id, domain, name }));
  const skills = getSkills().map(({ id, name }) => ({ id, name }));
  res.json({ ...summary, agents, skills });
});
