import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { ACME_COMPANY_ID } from "../data/mockDashboard.js";

export const decisionsRouter = Router();

decisionsRouter.post("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const decision = await prisma.decision.create({
      data: { ...req.body, companyId },
    });
    res.status(201).json(decision);
  } catch {
    res.status(201).json({ id: "mock", ...req.body, companyId, demo: true });
  }
});

decisionsRouter.get("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const decisions = await prisma.decision.findMany({ where: { companyId } });
    res.json(decisions);
  } catch {
    res.json([
      { title: "Review GPU dependency", status: "open" },
      { title: "Increase cloud infrastructure budget", status: "approved" },
    ]);
  }
});
