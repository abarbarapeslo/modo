import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { ACME_COMPANY_ID } from "../data/mockDashboard.js";

export const demandsRouter = Router();

demandsRouter.post("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const demand = await prisma.internalDemand.create({ data: { ...req.body, companyId } });
    res.status(201).json(demand);
  } catch {
    res.status(201).json({ id: "mock", ...req.body, demo: true });
  }
});

demandsRouter.get("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const demands = await prisma.internalDemand.findMany({ where: { companyId } });
    res.json(demands);
  } catch {
    res.json([
      { title: "Supplier diversification", department: "Operations", urgency: "high" },
      { title: "LATAM pricing review", department: "Finance", urgency: "medium" },
    ]);
  }
});
