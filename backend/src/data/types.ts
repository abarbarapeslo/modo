export type UserRole = "MANAGER" | "EXECUTIVE" | "LEADERSHIP";

export interface TranscriptAnalysisResult {
  themes: string[];
  decisionsMade: string[];
  pendingDecisions: string[];
  risks: string[];
  opportunities: string[];
  peopleMentioned: string[];
  companiesMentioned: string[];
  locations: string[];
  sectors: string[];
  externalInfluences: ExternalInfluence[];
  actions: { action: string; owner?: string; deadline?: string }[];
  openLoops: string[];
  okrsRelated: string[];
}

export interface ExternalInfluence {
  entity: string;
  type: string;
  personMentioned?: string;
  location?: string;
  sector?: string[];
  influenceScore: number;
  relatedInternalDecision?: string;
}

export interface ReimagineResult {
  projectedImplications: string[];
  projectedAttentionShift: Record<string, number>;
  impactedDepartments: string[];
  financialRisk: string;
  operationalRisk: string;
  alignmentImpact: string;
  strategicRecommendation: string;
  confidenceScore: number;
}
