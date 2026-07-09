import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../middleware/auth.js";
import { ACME_COMPANY_ID } from "../data/mockDashboard.js";

export const authRouter = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  companyName: z.string().optional(),
});

authRouter.post("/register", async (req, res) => {
  try {
    const body = registerSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(body.password, 10);

    try {
      const company = body.companyName
        ? await prisma.company.create({ data: { name: body.companyName } })
        : await prisma.company.findFirst() ??
          await prisma.company.create({ data: { name: "Acme Electronics", id: ACME_COMPANY_ID } });

      const user = await prisma.user.create({
        data: {
          email: body.email,
          passwordHash,
          name: body.name,
          role: "EXECUTIVE",
          companyId: company.id,
        },
      });

      const token = signToken({
        userId: user.id,
        companyId: user.companyId,
        role: user.role,
        email: user.email,
      });

      return res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch {
      // DB offline — demo token
      const token = signToken({
        userId: "demo-user",
        companyId: ACME_COMPANY_ID,
        role: "EXECUTIVE",
        email: body.email,
      });
      return res.status(201).json({
        token,
        user: { id: "demo-user", email: body.email, name: body.name, role: "EXECUTIVE" },
        demo: true,
      });
    }
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: "Registration failed" });
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

authRouter.post("/login", async (req, res) => {
  try {
    const body = loginSchema.parse(req.body);

    try {
      const user = await prisma.user.findUnique({ where: { email: body.email } });
      if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = signToken({
        userId: user.id,
        companyId: user.companyId,
        role: user.role,
        email: user.email,
      });
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } catch {
      // Demo login when DB offline
      if (body.email === "demo@modo.ai" && body.password === "modo123") {
        const token = signToken({
          userId: "demo-user",
          companyId: ACME_COMPANY_ID,
          role: "EXECUTIVE",
          email: body.email,
        });
        return res.json({ token, user: { id: "demo-user", email: body.email, name: "Helena Duarte", role: "EXECUTIVE" }, demo: true });
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: "Login failed" });
  }
});
