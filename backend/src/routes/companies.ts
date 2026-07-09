import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { ACME_COMPANY_ID, cLevelPriorities } from "../data/mockDashboard.js";

export const companiesRouter = Router();

companiesRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, declaredStrategy } = req.body;
    const company = await prisma.company.create({
      data: { name, declaredStrategy },
    });
    res.status(201).json(company);
  } catch {
    res.status(201).json({ id: ACME_COMPANY_ID, name: req.body.name ?? "Acme Electronics", demo: true });
  }
});

companiesRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.params.id },
      include: { departments: true },
    });
    if (!company) return res.status(404).json({ error: "Not found" });
    res.json(company);
  } catch {
    res.json({
      id: req.params.id,
      name: "Acme Electronics",
      declaredStrategy: "Expandir produto premium.",
      currentMode: "Expansion with operational stress",
      departments: ["Sales", "Product", "Marketing", "Finance", "Operations", "Engineering", "HR", "Legal", "Strategy"],
      cLevelPriorities,
      demo: true,
    });
  }
});
