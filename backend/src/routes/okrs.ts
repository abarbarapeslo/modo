import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { ACME_COMPANY_ID, cLevelPriorities } from "../data/mockDashboard.js";

export const okrsRouter = Router();

okrsRouter.post("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const okr = await prisma.oKR.create({ data: { ...req.body, companyId } });
    res.status(201).json(okr);
  } catch {
    res.status(201).json({ id: "mock", ...req.body, demo: true });
  }
});

okrsRouter.get("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const okrs = await prisma.oKR.findMany({ where: { companyId } });
    res.json(okrs);
  } catch {
    res.json(cLevelPriorities.map((objective, i) => ({ id: String(i), objective, quarter: "Q3 2026" })));
  }
});
