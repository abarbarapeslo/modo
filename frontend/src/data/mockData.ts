// ---------------------------------------------------------------------------
// MODO — mock data for Acme Electronics
// Mirrors the payloads served by /api/dashboard/* on the backend.
// ---------------------------------------------------------------------------

export const overviewMetrics = {
  attentionGap: 23,
  decisionAlignment: 78,
  strategicDrift: 12,
  externalInfluenceScore: 67,
  currentMode: "Expansion with operational stress",
};

// -- 1. Attention Map --------------------------------------------------------

export interface AttentionSource {
  source: string;
  location: string;
  coordinates: [number, number]; // [lon, lat]
  topic: string;
  sector: string;
  influenceScore: number;
  mentionedInMeetings: number;
  relatedDecisions: string[];
}

export const attentionSources: AttentionSource[] = [
  {
    source: "NVIDIA",
    location: "Santa Clara, USA",
    coordinates: [-121.9552, 37.3541],
    topic: "AI infrastructure",
    sector: "Semiconductors",
    influenceScore: 91,
    mentionedInMeetings: 4,
    relatedDecisions: [
      "Review GPU dependency",
      "Increase cloud infrastructure budget",
    ],
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
  {
    source: "European Central Bank",
    location: "Frankfurt, Germany",
    coordinates: [8.6821, 50.1109],
    topic: "Monetary policy",
    sector: "Finance",
    influenceScore: 48,
    mentionedInMeetings: 1,
    relatedDecisions: ["Hedge EUR revenue exposure"],
  },
  {
    source: "Apple",
    location: "Cupertino, USA",
    coordinates: [-122.0322, 37.323],
    topic: "Consumer hardware pricing",
    sector: "Consumer Electronics",
    influenceScore: 62,
    mentionedInMeetings: 3,
    relatedDecisions: ["Reposition premium line pricing"],
  },
  {
    source: "Port of Santos",
    location: "Santos, Brazil",
    coordinates: [-46.3336, -23.9608],
    topic: "Logistics disruption",
    sector: "Logistics",
    influenceScore: 55,
    mentionedInMeetings: 2,
    relatedDecisions: ["Review inbound freight contracts"],
  },
  {
    source: "Reserve Bank of India",
    location: "Mumbai, India",
    coordinates: [72.8777, 19.076],
    topic: "Emerging market demand",
    sector: "Finance",
    influenceScore: 34,
    mentionedInMeetings: 1,
    relatedDecisions: [],
  },
];

// -- 3. Influence Map (external events) --------------------------------------

export interface ExternalEvent {
  id: string;
  title: string;
  sector: string;
  location: string;
  coordinates: [number, number]; // [lon, lat]
  impactScore: number;
  affectedAreas: string[];
  suggestedDiscussion: string;
}

export const externalEvents: ExternalEvent[] = [
  {
    id: "rare-earth-china",
    title: "Rare earth export controls expand in China",
    sector: "Rare Earths",
    location: "Beijing, China",
    coordinates: [116.4074, 39.9042],
    impactScore: 91,
    affectedAreas: ["Procurement", "Finance", "Product"],
    suggestedDiscussion: "Next supply chain meeting",
  },
  {
    id: "semiconductor-q3",
    title: "Semiconductor supply tightness expected in Q3",
    sector: "Semiconductors",
    location: "Hsinchu, Taiwan",
    coordinates: [120.9675, 24.8138],
    impactScore: 89,
    affectedAreas: ["Product", "Operations"],
    suggestedDiscussion: "Procurement planning",
  },
  {
    id: "interest-rates",
    title: "Global interest rate volatility increases",
    sector: "Finance",
    location: "Washington D.C., USA",
    coordinates: [-77.0369, 38.9072],
    impactScore: 74,
    affectedAreas: ["Finance", "Sales"],
    suggestedDiscussion: "Pricing strategy review",
  },
  {
    id: "consumer-midrange",
    title: "Consumer demand shifts toward mid-range devices",
    sector: "Retail",
    location: "New York, USA",
    coordinates: [-74.006, 40.7128],
    impactScore: 66,
    affectedAreas: ["Marketing", "Product", "Sales"],
    suggestedDiscussion: "Quarterly portfolio review",
  },
  {
    id: "energy-manufacturing",
    title: "Energy cost pressure on manufacturing hubs",
    sector: "Energy",
    location: "Ruhr, Germany",
    coordinates: [7.0115, 51.4556],
    impactScore: 58,
    affectedAreas: ["Operations", "Finance"],
    suggestedDiscussion: "Operations cost committee",
  },
  {
    id: "asian-freight",
    title: "Asian freight lanes face congestion through August",
    sector: "Logistics",
    location: "Singapore",
    coordinates: [103.8198, 1.3521],
    impactScore: 52,
    affectedAreas: ["Operations", "Procurement"],
    suggestedDiscussion: "Logistics weekly",
  },
];

export const monitoringSchedule = [
  { day: "Segunda", sectors: "Mercado financeiro, câmbio, juros, consumo" },
  { day: "Terça", sectors: "Semicondutores, silício, terras raras, logística asiática" },
  { day: "Quarta", sectors: "China, Taiwan, EUA, regulação de exportação" },
  { day: "Quinta", sectors: "Varejo, concorrentes, comportamento do consumidor" },
  { day: "Sexta", sectors: "Energia, frete, cadeia de suprimentos" },
];

// -- 4. Alignment Map ---------------------------------------------------------

export type AlignmentLevel = "high" | "medium" | "low" | "none";

export interface AlignmentEdge {
  from: string;
  to: string;
  level: AlignmentLevel;
  sharedDecisions: number;
}

export const departments = [
  "Sales",
  "Product",
  "Marketing",
  "Finance",
  "Operations",
  "Engineering",
  "HR",
  "Legal",
  "Strategy",
];

export const alignmentEdges: AlignmentEdge[] = [
  { from: "Sales", to: "Product", level: "high", sharedDecisions: 14 },
  { from: "Product", to: "Engineering", level: "high", sharedDecisions: 18 },
  { from: "Sales", to: "Marketing", level: "medium", sharedDecisions: 7 },
  { from: "Marketing", to: "Finance", level: "low", sharedDecisions: 2 },
  { from: "Finance", to: "Operations", level: "medium", sharedDecisions: 6 },
  { from: "Strategy", to: "Product", level: "medium", sharedDecisions: 5 },
  { from: "Strategy", to: "Finance", level: "low", sharedDecisions: 3 },
  { from: "Operations", to: "Engineering", level: "medium", sharedDecisions: 8 },
  { from: "Legal", to: "Product", level: "none", sharedDecisions: 0 },
  { from: "HR", to: "Engineering", level: "low", sharedDecisions: 2 },
  { from: "Sales", to: "Finance", level: "low", sharedDecisions: 3 },
];

export const crossFunctionalAlignmentScore = 64;

// -- 5. Internal Map ----------------------------------------------------------

export interface AreaHeat {
  area: string;
  heat: number;
}

export const internalHeat: AreaHeat[] = [
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

export const organizationalHeatIndex = 60;
export const internalMapDiagnosis =
  "A empresa se descreve como product-led, mas sua atenção real está concentrada em Sales.";

// -- 6. Resource vs Attention -------------------------------------------------

export interface ThemeResource {
  theme: string;
  attention: number; // 0-100
  budget: number;
  execution: number;
  externalImportance: number;
  diagnosis: string;
}

export const resourceVsAttention: ThemeResource[] = [
  {
    theme: "AI Strategy",
    attention: 82,
    budget: 24,
    execution: 18,
    externalImportance: 90,
    diagnosis: "Symbolic attention without operational commitment.",
  },
  {
    theme: "Logistics",
    attention: 18,
    budget: 71,
    execution: 76,
    externalImportance: 84,
    diagnosis: "Operationally critical but strategically neglected.",
  },
  {
    theme: "LATAM Expansion",
    attention: 74,
    budget: 46,
    execution: 39,
    externalImportance: 68,
    diagnosis: "Declared priority losing traction in execution.",
  },
  {
    theme: "Talent Retention",
    attention: 31,
    budget: 28,
    execution: 33,
    externalImportance: 55,
    diagnosis: "Consistent but under-resourced relative to churn risk.",
  },
  {
    theme: "Premium Product Line",
    attention: 58,
    budget: 62,
    execution: 41,
    externalImportance: 61,
    diagnosis: "Budget committed, execution lagging behind discourse.",
  },
];

// -- 7. Blindspot Radar ---------------------------------------------------------

export interface Blindspot {
  topic: string;
  externalRelevance: number;
  internalAttention: number;
  blindspotScore: number;
}

export const blindspots: Blindspot[] = [
  { topic: "Rare earth supply risk", externalRelevance: 91, internalAttention: 12, blindspotScore: 79 },
  { topic: "Currency volatility", externalRelevance: 84, internalAttention: 21, blindspotScore: 63 },
  { topic: "Energy cost pressure", externalRelevance: 77, internalAttention: 9, blindspotScore: 68 },
  { topic: "Export regulation", externalRelevance: 72, internalAttention: 18, blindspotScore: 54 },
  { topic: "Credit conditions", externalRelevance: 69, internalAttention: 25, blindspotScore: 44 },
  { topic: "Labor market shifts", externalRelevance: 51, internalAttention: 15, blindspotScore: 36 },
];

// -- 8. Strategic Drift ----------------------------------------------------------

export interface DriftPoint {
  month: string;
  drift: number;
  event?: string;
}

export const declaredStrategy = "Expandir produto premium.";

export const driftTimeline: DriftPoint[] = [
  { month: "Jan", drift: 4 },
  { month: "Feb", drift: 6 },
  { month: "Mar", drift: 9, event: "Descontos agressivos aprovados" },
  { month: "Apr", drift: 11, event: "Foco em volume nas metas de Sales" },
  { month: "May", drift: 15, event: "Corte de 12% no roadmap premium" },
  { month: "Jun", drift: 12, event: "Verba de vendas ampliada" },
];

export const driftDecisions = [
  "Descontos agressivos",
  "Foco em volume",
  "Clientes de baixa margem",
  "Cortes em produto",
  "Aumento de verba em vendas",
];

// -- 9. Decision DNA ---------------------------------------------------------------

export const decisionDNA = {
  reactive: 71,
  dataLed: 42,
  founderLed: 66,
  customerLed: 28,
  riskAware: 19,
  longTerm: 33,
};

export const decisionDNAInsight =
  "Your company reacts faster to internal urgency than to external market signals.";

// -- 12. Attention Timeline ----------------------------------------------------------

export interface ModePeriod {
  month: string;
  mode: string;
  intensity: number;
}

export const modeTimeline: ModePeriod[] = [
  { month: "Jan", mode: "Product-led", intensity: 62 },
  { month: "Feb", mode: "Fundraising-led", intensity: 74 },
  { month: "Mar", mode: "Crisis-reactive", intensity: 88 },
  { month: "Apr", mode: "Competitor-focused", intensity: 69 },
  { month: "May", mode: "Cost-cutting mode", intensity: 71 },
  { month: "Jun", mode: "Expansion mode", intensity: 77 },
];

export const modeShiftScore = 58;
export const modeTimelineInsight =
  "The company shifted from Expansion Mode to Defensive Mode after the funding delay.";

// -- 13. Meeting Fingerprint ------------------------------------------------------------

export const meetingFingerprint = {
  meeting: "Weekly Leadership Sync",
  date: "2026-07-06",
  attentionDistribution: [
    { topic: "Sales", pct: 32 },
    { topic: "Product", pct: 21 },
    { topic: "Finance", pct: 18 },
    { topic: "Operations", pct: 14 },
    { topic: "Marketing", pct: 11 },
    { topic: "Talent", pct: 4 },
    { topic: "Regulation", pct: 0 },
  ],
  decisionsMade: 3,
  openLoops: 7,
  externalReferences: ["NVIDIA", "Banco Central", "Apple", "China export controls"],
  okrAlignment: 61,
};

// -- 14. Open Loops -----------------------------------------------------------------------

export interface OpenLoop {
  topic: string;
  mentions: number;
  owner: string | null;
  budget: string | null;
  impact: "high" | "medium" | "low";
  recommendation: string;
}

export const openLoops: OpenLoop[] = [
  {
    topic: "Improve onboarding",
    mentions: 11,
    owner: null,
    budget: null,
    impact: "high",
    recommendation: "Assign owner before next leadership meeting.",
  },
  {
    topic: "Supplier diversification plan",
    mentions: 8,
    owner: null,
    budget: null,
    impact: "high",
    recommendation: "Escalate to Operations leadership with deadline.",
  },
  {
    topic: "Pricing model revision",
    mentions: 6,
    owner: "Finance",
    budget: null,
    impact: "medium",
    recommendation: "Schedule dedicated working session with Sales.",
  },
  {
    topic: "Internal AI tooling",
    mentions: 5,
    owner: null,
    budget: null,
    impact: "medium",
    recommendation: "Define scope before allocating engineering time.",
  },
  {
    topic: "Employer branding",
    mentions: 4,
    owner: "HR",
    budget: "Pending",
    impact: "low",
    recommendation: "Revisit next quarter unless attrition rises.",
  },
];

export const openLoopIndex = 42;

// -- 15. Attention Budget --------------------------------------------------------------------

export interface BudgetSlice {
  topic: string;
  actual: number;
  recommended: number;
}

export const attentionBudget: BudgetSlice[] = [
  { topic: "Growth", actual: 34, recommended: 22 },
  { topic: "Operations", actual: 22, recommended: 18 },
  { topic: "Fundraising", actual: 17, recommended: 0 },
  { topic: "Product", actual: 11, recommended: 12 },
  { topic: "Talent", actual: 8, recommended: 10 },
  { topic: "Regulation", actual: 3, recommended: 9 },
  { topic: "Macroeconomy", actual: 2, recommended: 0 },
  { topic: "Credit conditions", actual: 0, recommended: 15 },
  { topic: "Supply chain", actual: 0, recommended: 14 },
  { topic: "Other", actual: 3, recommended: 0 },
];

// -- Reimagine ---------------------------------------------------------------------------------

export const reimagineMockResponse = {
  prompt:
    "What happens if we allocate $100,000 more to marketing to launch the new product in São Paulo and Mexico?",
  implications: [
    "Marketing attention increases from 18% to 31%.",
    "Product may become a bottleneck in 6 weeks.",
    "Sales alignment improves if LATAM messaging is adopted.",
    "Finance risk increases because CAC may rise under current credit conditions.",
    "Recommended condition: shift $20,000 to customer research before campaign launch.",
  ],
  confidenceScore: 72,
};

// -- Decision Flow (React Flow) -------------------------------------------------------------------

export type FlowStatus = "aligned" | "partial" | "misaligned" | "no-evidence";

export interface FlowNodeData {
  id: string;
  label: string;
  detail: string;
  layer: string;
  status: FlowStatus;
}

export const decisionFlowNodes: FlowNodeData[] = [
  { id: "c1", label: "LATAM expansion", detail: "C-level priority — CEO, Jan 2026", layer: "C-level priorities", status: "aligned" },
  { id: "c2", label: "AI-enabled product launch", detail: "C-level priority — CPO, Feb 2026", layer: "C-level priorities", status: "partial" },
  { id: "o1", label: "Enter 3 LATAM markets", detail: "Company OKR — Q3 target", layer: "Company OKRs", status: "partial" },
  { id: "o2", label: "Ship AI assistant v1", detail: "Company OKR — Q3 target", layer: "Company OKRs", status: "partial" },
  { id: "d1", label: "Marketing: local campaigns", detail: "Focado apenas em campanhas Brasil", layer: "Department OKRs", status: "misaligned" },
  { id: "d2", label: "Product: US-first features", detail: "Roadmap prioriza mercado americano", layer: "Department OKRs", status: "misaligned" },
  { id: "d3", label: "Sales: Brazil pipeline only", detail: "Nenhuma negociação em México/Colômbia", layer: "Department OKRs", status: "partial" },
  { id: "t1", label: "Finance cuts intl. budget", detail: "Orçamento internacional reduzido em 30%", layer: "Team decisions", status: "misaligned" },
  { id: "t2", label: "Eng hires ML team", detail: "3 contratações aprovadas", layer: "Team decisions", status: "aligned" },
  { id: "e1", label: "Execution evidence", detail: "2 de 9 iniciativas LATAM ativas", layer: "Execution", status: "no-evidence" },
  { id: "e2", label: "AI beta shipped", detail: "Beta com 40 clientes", layer: "Execution", status: "aligned" },
];

export const decisionFlowEdges: { source: string; target: string }[] = [
  { source: "c1", target: "o1" },
  { source: "c2", target: "o2" },
  { source: "o1", target: "d1" },
  { source: "o1", target: "d2" },
  { source: "o1", target: "d3" },
  { source: "o2", target: "d2" },
  { source: "d1", target: "t1" },
  { source: "d3", target: "t1" },
  { source: "d2", target: "t2" },
  { source: "t1", target: "e1" },
  { source: "t2", target: "e2" },
];

export const decisionFlowSummary = {
  strategicAlignment: 42,
  attentionGap: "High",
  example:
    "CEO define “Expandir para América Latina”, mas Marketing foca campanhas locais, Produto prioriza features para os EUA, Sales negocia apenas com o Brasil e Finance corta o orçamento internacional.",
};
