import "../src/lib/env.js";
import { getDatabaseUrl } from "../src/lib/env.js";
import { PrismaClient, UserRole, FlowStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  ACME_COMPANY_ID,
  overviewMetrics,
  attentionSources,
  externalEvents,
  internalHeat,
  resourceVsAttention,
  blindspots,
  decisionFlowNodes,
  decisionFlowEdges,
  cLevelPriorities,
  departments,
} from "../src/data/mockDashboard.js";

const prisma = new PrismaClient({
  datasources: { db: { url: getDatabaseUrl() } },
});

async function main() {
  const company = await prisma.company.upsert({
    where: { id: ACME_COMPANY_ID },
    update: {
      name: "Acme Electronics",
      declaredStrategy: "Expandir produto premium.",
      currentMode: overviewMetrics.currentMode,
    },
    create: {
      id: ACME_COMPANY_ID,
      name: "Acme Electronics",
      declaredStrategy: "Expandir produto premium.",
      currentMode: overviewMetrics.currentMode,
    },
  });

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { companyId_name: { companyId: company.id, name: dept } },
      update: {},
      create: { name: dept, companyId: company.id },
    });
  }

  const passwordHash = await bcrypt.hash("modo123", 10);
  await prisma.user.upsert({
    where: { email: "demo@modo.ai" },
    update: {},
    create: {
      email: "demo@modo.ai",
      passwordHash,
      name: "Helena Duarte",
      role: UserRole.EXECUTIVE,
      companyId: company.id,
    },
  });

  for (const src of attentionSources) {
    await prisma.influenceSource.create({
      data: {
        source: src.source,
        location: src.location,
        coordinates: src.coordinates,
        topic: src.topic,
        sector: src.sector,
        influenceScore: src.influenceScore,
        mentionedInMeetings: src.mentionedInMeetings,
        relatedDecisions: src.relatedDecisions,
        companyId: company.id,
      },
    });
  }

  for (const evt of externalEvents) {
    await prisma.externalSignal.create({
      data: {
        title: evt.title,
        sector: evt.sector,
        impactScore: evt.impactScore,
        affectedAreas: evt.affectedAreas,
        companyId: company.id,
      },
    });
  }

  for (const h of internalHeat) {
    await prisma.attentionScore.create({
      data: { metric: `heat:${h.area}`, value: h.heat, companyId: company.id },
    });
  }

  for (const t of resourceVsAttention) {
    await prisma.attentionTopic.create({
      data: {
        topic: t.theme,
        attention: t.attention,
        budget: t.budget,
        execution: t.execution,
        externalImportance: t.externalImportance,
        diagnosis: t.diagnosis,
        companyId: company.id,
      },
    });
  }

  for (const b of blindspots) {
    await prisma.insight.create({
      data: {
        type: "blindspot",
        title: b.topic,
        body: `External relevance ${b.externalRelevance}, internal attention ${b.internalAttention}`,
        confidence: b.blindspotScore,
        companyId: company.id,
      },
    });
  }

  for (const n of decisionFlowNodes) {
    await prisma.decisionFlowNode.upsert({
      where: { companyId_nodeId: { companyId: company.id, nodeId: n.id } },
      update: {},
      create: {
        nodeId: n.id,
        label: n.label,
        detail: n.detail,
        layer: n.layer,
        status: (n.status === "no-evidence"
          ? FlowStatus.NO_EVIDENCE
          : n.status === "misaligned"
            ? FlowStatus.MISALIGNED
            : n.status === "partial"
              ? FlowStatus.PARTIAL
              : FlowStatus.ALIGNED),
        companyId: company.id,
      },
    });
  }

  for (const e of decisionFlowEdges) {
    await prisma.decisionFlowEdge.create({
      data: { sourceId: e.source, targetId: e.target, companyId: company.id },
    });
  }

  for (const objective of cLevelPriorities) {
    await prisma.oKR.create({
      data: { objective, quarter: "Q3 2026", companyId: company.id },
    });
  }

  console.log("Seed complete — Acme Electronics ready.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
