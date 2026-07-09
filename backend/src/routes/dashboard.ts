import { Router } from "express";
import { optionalAuth } from "../middleware/auth.js";
import { ACME_COMPANY_ID } from "../data/mockDashboard.js";
import * as companyTwin from "../services/companyTwinService.js";
import * as economicTwin from "../services/economicTwinService.js";
import {
  attentionSources,
  alignmentEdges,
  departments,
  internalHeat,
  resourceVsAttention,
  blindspots,
  driftTimeline,
  decisionDNA,
  decisionDNAInsight,
  modeTimeline,
  modeShiftScore,
  modeTimelineInsight,
  meetingFingerprint,
  attentionBudget,
  decisionFlowNodes,
  decisionFlowEdges,
  decisionFlowSummary,
  crossFunctionalAlignmentScore,
  organizationalHeatIndex,
  internalMapDiagnosis,
} from "../data/mockDashboard.js";

export const dashboardRouter = Router();

function companyId(req: { user?: { companyId: string }; query: { companyId?: string } }) {
  return req.user?.companyId ?? (req.query.companyId as string) ?? ACME_COMPANY_ID;
}

dashboardRouter.get("/overview", optionalAuth, (req, res) => {
  res.json(companyTwin.getCompanyOverview(companyId(req)));
});

dashboardRouter.get("/attention-map", optionalAuth, (req, res) => {
  res.json({ sources: attentionSources, companyId: companyId(req) });
});

dashboardRouter.get("/decision-flow", optionalAuth, (req, res) => {
  res.json({
    nodes: decisionFlowNodes,
    edges: decisionFlowEdges,
    summary: decisionFlowSummary,
    alignment: companyTwin.calculateDecisionAlignment(companyId(req)),
  });
});

dashboardRouter.get("/influence-map", optionalAuth, (req, res) => {
  res.json(economicTwin.getInfluenceMap(companyId(req)));
});

dashboardRouter.get("/alignment-map", optionalAuth, (req, res) => {
  res.json({
    departments,
    edges: alignmentEdges,
    score: crossFunctionalAlignmentScore,
  });
});

dashboardRouter.get("/internal-map", optionalAuth, (req, res) => {
  res.json({
    heat: internalHeat,
    index: organizationalHeatIndex,
    diagnosis: internalMapDiagnosis,
    distribution: companyTwin.calculateAttentionDistribution(companyId(req)),
  });
});

dashboardRouter.get("/strategic-drift", optionalAuth, (req, res) => {
  const drift = companyTwin.calculateStrategicDrift(companyId(req));
  res.json({
    ...drift,
    timeline: driftTimeline,
  });
});

dashboardRouter.get("/decision-dna", optionalAuth, (req, res) => {
  res.json({ ...decisionDNA, insight: decisionDNAInsight });
});

dashboardRouter.get("/blindspots", optionalAuth, async (req, res) => {
  const comparison = await economicTwin.compareExternalRealityWithInternalAttention(companyId(req));
  res.json({ blindspots, external: comparison });
});

dashboardRouter.get("/open-loops", optionalAuth, (req, res) => {
  res.json(companyTwin.calculateOpenLoops(companyId(req)));
});

dashboardRouter.get("/attention-budget", optionalAuth, (req, res) => {
  res.json({
    budget: attentionBudget,
    modeTimeline,
    modeShiftScore,
    insight: modeTimelineInsight,
    fingerprint: meetingFingerprint,
  });
});

// Extra endpoints for resource vs attention
dashboardRouter.get("/resource-vs-attention", optionalAuth, (req, res) => {
  res.json({
    themes: resourceVsAttention,
    ratio: companyTwin.calculateAttentionToResourceRatio(companyId(req)),
  });
});

dashboardRouter.get("/attention-timeline", optionalAuth, (req, res) => {
  res.json(companyTwin.calculateModeShift(companyId(req)));
});
