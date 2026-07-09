import { Router } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma.js";
import { authMiddleware } from "../middleware/auth.js";
import { analyzeTranscript } from "../services/transcriptAnalysisService.js";
import { meetingFingerprint, ACME_COMPANY_ID } from "../data/mockDashboard.js";

export const meetingsRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

meetingsRouter.post("/upload-transcript", authMiddleware, upload.single("file"), async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  const content =
    req.file?.buffer.toString("utf-8") ??
    (req.body.content as string) ??
    "";

  if (!content) return res.status(400).json({ error: "No transcript content" });

  const analysis = await analyzeTranscript(companyId, content);

  try {
    const meeting = await prisma.meeting.create({
      data: {
        title: req.body.title ?? "Uploaded meeting",
        companyId,
        transcript: {
          create: { content, analysis: analysis as object, analyzedAt: new Date() },
        },
      },
      include: { transcript: true },
    });
    return res.status(201).json({ meeting, analysis });
  } catch {
    return res.status(201).json({
      meeting: { id: "mock-meeting", title: req.body.title ?? "Uploaded meeting" },
      analysis,
      demo: true,
    });
  }
});

meetingsRouter.get("/", authMiddleware, async (req, res) => {
  const companyId = req.user?.companyId ?? ACME_COMPANY_ID;
  try {
    const meetings = await prisma.meeting.findMany({
      where: { companyId },
      orderBy: { date: "desc" },
      take: 20,
    });
    res.json(meetings);
  } catch {
    res.json([{ id: "1", title: "Weekly Leadership Sync", date: "2026-07-06" }]);
  }
});

meetingsRouter.get("/:id/fingerprint", authMiddleware, async (_req, res) => {
  res.json(meetingFingerprint);
});
