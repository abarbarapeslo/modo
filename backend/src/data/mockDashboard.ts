// Shared mock payloads for Acme Electronics — used when DB is offline or for seed reference.

export const ACME_COMPANY_ID = "acme-electronics";

export const overviewMetrics = {
  attentionGap: 23,
  decisionAlignment: 78,
  strategicDrift: 12,
  externalInfluenceScore: 67,
  currentMode: "Expansion with operational stress",
};

export const attentionSources = [
  {
    source: "NVIDIA",
    location: "Santa Clara, USA",
    coordinates: [-121.9552, 37.3541],
    topic: "AI infrastructure",
    sector: "Semiconductors",
    influenceScore: 91,
    mentionedInMeetings: 4,
    relatedDecisions: ["Review GPU dependency", "Increase cloud infrastructure budget"],
  },
  {
    source: "Banco Central do Brasil",
    location: "Brasília, Brazil",
    coordinates: [-47.8825, -15.7942],
    topic: "Interest rates",
    sector: "Finance",
    influenceScore: 76,
    mentionedInMeetings: 3,
    relatedDecisions: ["Reevaluate credit-sensitive demand"],
  },
  {
    source: "TSMC",
    location: "Hsinchu, Taiwan",
    coordinates: [120.9675, 24.8138],
    topic: "Semiconductor supply",
    sector: "Semiconductors",
    influenceScore: 89,
    mentionedInMeetings: 5,
    relatedDecisions: ["Diversify chip suppliers", "Increase component buffer stock"],
  },
  {
    source: "Ministry of Commerce (China)",
    location: "Beijing, China",
    coordinates: [116.4074, 39.9042],
    topic: "Rare earth export controls",
    sector: "Rare Earths",
    influenceScore: 84,
    mentionedInMeetings: 2,
    relatedDecisions: ["Map rare-earth exposure in supply chain"],
  },
];

export const externalEvents = [
  {
    title: "Rare earth export controls expand in China",
    sector: "Rare Earths",
    impactScore: 91,
    affectedAreas: ["Procurement", "Finance", "Product"],
    suggestedDiscussion: "Next supply chain meeting",
  },
  {
    title: "Semiconductor supply tightness expected in Q3",
    sector: "Semiconductors",
    impactScore: 89,
    affectedAreas: ["Product", "Operations"],
    suggestedDiscussion: "Procurement planning",
  },
  {
    title: "Global interest rate volatility increases",
    sector: "Finance",
    impactScore: 74,
    affectedAreas: ["Finance", "Sales"],
    suggestedDiscussion: "Pricing strategy review",
  },
];

export const monitoringSchedule = [
  { day: "Segunda", sectors: "Mercado financeiro, câmbio, juros, consumo" },
  { day: "Terça", sectors: "Semicondutores, silício, terras raras, logística asiática" },
  { day: "Quarta", sectors: "China, Taiwan, EUA, regulação de exportação" },
  { day: "Quinta", sectors: "Varejo, concorrentes, comportamento do consumidor" },
  { day: "Sexta", sectors: "Energia, frete, cadeia de suprimentos" },
];

export const departments = [
  "Sales", "Product", "Marketing", "Finance", "Operations",
  "Engineering", "HR", "Legal", "Strategy",
];

export const alignmentEdges = [
  { from: "Sales", to: "Product", level: "high", sharedDecisions: 14 },
  { from: "Product", to: "Engineering", level: "high", sharedDecisions: 18 },
  { from: "Sales", to: "Marketing", level: "medium", sharedDecisions: 7 },
  { from: "Marketing", to: "Finance", level: "low", sharedDecisions: 2 },
  { from: "Legal", to: "Product", level: "none", sharedDecisions: 0 },
];

export const crossFunctionalAlignmentScore = 64;

export const organizationalHeatIndex = 60;
export const internalMapDiagnosis =
  "A empresa se descreve como product-led, mas sua atenção real está concentrada em Sales.";

export const internalHeat = [
  { area: "Product", heat: 92 },
  { area: "Engineering", heat: 88 },
  { area: "Sales", heat: 75 },
  { area: "Marketing", heat: 62 },
  { area: "Operations", heat: 58 },
  { area: "Finance", heat: 54 },
  { area: "HR", heat: 41 },
  { area: "Strategy", heat: 37 },
  { area: "Legal", heat: 31 },
];

export const resourceVsAttention = [
  {
    theme: "AI Strategy",
    attention: 82, budget: 24, execution: 18, externalImportance: 90,
    diagnosis: "Symbolic attention without operational commitment.",
  },
  {
    theme: "Logistics",
    attention: 18, budget: 71, execution: 76, externalImportance: 84,
    diagnosis: "Operationally critical but strategically neglected.",
  },
];

export const blindspots = [
  { topic: "Rare earth supply risk", externalRelevance: 91, internalAttention: 12, blindspotScore: 79 },
  { topic: "Currency volatility", externalRelevance: 84, internalAttention: 21, blindspotScore: 63 },
  { topic: "Energy cost pressure", externalRelevance: 77, internalAttention: 9, blindspotScore: 68 },
];

export const declaredStrategy = "Expandir produto premium.";
export const driftTimeline = [
  { month: "Jan", drift: 4 },
  { month: "Feb", drift: 6 },
  { month: "Mar", drift: 9, event: "Descontos agressivos aprovados" },
  { month: "Apr", drift: 11, event: "Foco em volume nas metas de Sales" },
  { month: "May", drift: 15, event: "Corte de 12% no roadmap premium" },
  { month: "Jun", drift: 12, event: "Verba de vendas ampliada" },
];

export const decisionDNA = {
  reactive: 71, dataLed: 42, founderLed: 66,
  customerLed: 28, riskAware: 19, longTerm: 33,
};
export const decisionDNAInsight =
  "Your company reacts faster to internal urgency than to external market signals.";

export const modeShiftScore = 58;
export const modeTimelineInsight =
  "The company shifted from Expansion Mode to Defensive Mode after the funding delay.";

export const modeTimeline = [
  { month: "Jan", mode: "Product-led", intensity: 62 },
  { month: "Feb", mode: "Fundraising-led", intensity: 74 },
  { month: "Mar", mode: "Crisis-reactive", intensity: 88 },
  { month: "Apr", mode: "Competitor-focused", intensity: 69 },
  { month: "May", mode: "Cost-cutting mode", intensity: 71 },
  { month: "Jun", mode: "Expansion mode", intensity: 77 },
];

export const meetingFingerprint = {
  meeting: "Weekly Leadership Sync",
  date: "2026-07-06",
  attentionDistribution: [
    { topic: "Sales", pct: 32 }, { topic: "Product", pct: 21 },
    { topic: "Finance", pct: 18 }, { topic: "Talent", pct: 4 },
    { topic: "Regulation", pct: 0 },
  ],
  decisionsMade: 3,
  openLoops: 7,
  externalReferences: ["NVIDIA", "Banco Central", "Apple", "China export controls"],
  okrAlignment: 61,
};

export const openLoopIndex = 42;

export const openLoops = [
  {
    topic: "Improve onboarding", mentions: 11, owner: null, budget: null,
    impact: "high", recommendation: "Assign owner before next leadership meeting.",
  },
  {
    topic: "Supplier diversification plan", mentions: 8, owner: null, budget: null,
    impact: "high", recommendation: "Escalate to Operations leadership with deadline.",
  },
];

export const attentionBudget = [
  { topic: "Growth", actual: 34, recommended: 22 },
  { topic: "Operations", actual: 22, recommended: 18 },
  { topic: "Credit conditions", actual: 0, recommended: 15 },
  { topic: "Supply chain", actual: 0, recommended: 14 },
];

export const decisionFlowNodes = [
  { id: "c1", label: "LATAM expansion", detail: "C-level priority", layer: "C-level priorities", status: "aligned" },
  { id: "o1", label: "Enter 3 LATAM markets", detail: "Company OKR", layer: "Company OKRs", status: "partial" },
  { id: "d1", label: "Marketing: local campaigns", detail: "Brasil only", layer: "Department OKRs", status: "misaligned" },
  { id: "e1", label: "Execution evidence", detail: "2 de 9 iniciativas", layer: "Execution", status: "no-evidence" },
];

export const decisionFlowEdges = [
  { source: "c1", target: "o1" },
  { source: "o1", target: "d1" },
  { source: "d1", target: "e1" },
];

export const decisionFlowSummary = {
  strategicAlignment: 42,
  attentionGap: "High",
};

export const cLevelPriorities = [
  "LATAM expansion",
  "Improve operational efficiency",
  "Launch new AI-enabled product",
  "Reduce supply chain exposure",
  "Increase enterprise revenue",
];

export const externalSignalsList = [
  "NVIDIA AI infrastructure comment",
  "Banco Central interest rate change",
  "Rare earth export controls",
  "Semiconductor supply tightness",
  "Consumer demand shift",
  "Energy cost pressure",
  "Logistics disruption",
];
