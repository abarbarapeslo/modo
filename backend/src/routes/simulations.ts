import { Router } from "express";
import { z } from "zod";
import { optionalAuth } from "../middleware/auth.js";
import { simulateScenario } from "../services/reimagineService.js";
import { prisma } from "../lib/prisma.js";
import { ACME_COMPANY_ID } from "../data/mockDashboard.js";

export const simulationsRouter = Router();

const schema = z.object({
  companyId: z.string().optional(),
  scenarioPrompt: z.string().min(10),
});

simulationsRouter.post("/reimagine", optionalAuth, async (req, res) => {
  try {
    const body = schema.parse(req.body);
    const companyId = body.companyId ?? req.user?.companyId ?? ACME_COMPANY_ID;
    const userId = req.user?.userId ?? "demo-user";

    const result = await simulateScenario(companyId, body.scenarioPrompt, userId);

    try {
      await prisma.simulation.create({
        data: {
          prompt: body.scenarioPrompt,
          result: result as object,
          confidenceScore: result.confidenceScore,
          companyId,
          userId,
        },
      });
    } catch {
      // DB offline — still return result
    }

    res.json({
      projectedImplications: result.projectedImplications,
      projectedAttentionShift: result.projectedAttentionShift,
      impactedDepartments: result.impactedDepartments,
      financialRisk: result.financialRisk,
      operationalRisk: result.operationalRisk,
      alignmentImpact: result.alignmentImpact,
      strategicRecommendation: result.strategicRecommendation,
      confidenceScore: result.confidenceScore,
    });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    res.status(500).json({ error: "Simulation failed" });
  }
});
