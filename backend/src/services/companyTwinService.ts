import {
  overviewMetrics,
  internalHeat,
  decisionDNA,
  openLoops,
  resourceVsAttention,
  modeTimeline,
  decisionFlowSummary,
} from "../data/mockDashboard.js";

export function calculateAttentionDistribution(_companyId: string) {
  const total = internalHeat.reduce((s, h) => s + h.heat, 0);
  return internalHeat.map((h) => ({
    area: h.area,
    pct: Math.round((h.heat / total) * 100),
  }));
}

export function calculateDecisionAlignment(_companyId: string) {
  return {
    score: overviewMetrics.decisionAlignment,
    flowAlignment: decisionFlowSummary.strategicAlignment,
    attentionGap: decisionFlowSummary.attentionGap,
  };
}

export function calculateStrategicDrift(_companyId: string) {
  return { score: overviewMetrics.strategicDrift, declaredStrategy: "Expandir produto premium." };
}

export function calculateDecisionDNA(_companyId: string) {
  return { ...decisionDNA, insight: "Your company reacts faster to internal urgency than to external market signals." };
}

export function calculateOpenLoops(_companyId: string) {
  return { index: 42, loops: openLoops };
}

export function calculateAttentionToResourceRatio(_companyId: string) {
  return resourceVsAttention.map((t) => ({
    ...t,
    ratio: t.budget > 0 ? t.attention / t.budget : t.attention,
  }));
}

export function calculateModeShift(_companyId: string) {
  return { score: 58, timeline: modeTimeline, insight: "The company shifted modes after the funding delay." };
}

export function getCompanyOverview(_companyId: string) {
  return overviewMetrics;
}
