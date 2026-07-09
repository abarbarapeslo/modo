import { buildSystemPrompt } from "./agentRules.js";

const TRANSCRIPT_JSON_SCHEMA = `Return ONLY valid JSON matching this schema:
{
  "themes": string[],
  "decisionsMade": string[],
  "pendingDecisions": string[],
  "risks": string[],
  "opportunities": string[],
  "peopleMentioned": string[],
  "companiesMentioned": string[],
  "locations": string[],
  "sectors": string[],
  "externalInfluences": [{
    "entity": string,
    "type": string,
    "personMentioned"?: string,
    "location"?: string,
    "sector"?: string[],
    "influenceScore": number,
    "relatedInternalDecision"?: string
  }],
  "actions": [{ "action": string, "owner"?: string, "deadline"?: string }],
  "openLoops": string[],
  "okrsRelated": string[]
}`;

function transcriptSystemPrompt(): string {
  const agentContext = buildSystemPrompt({
    domains: ["attention", "risk"],
    skills: ["analyze-transcript", "extract-decisions", "detect-blind-spots"],
  });

  return `${agentContext}

You are MODO, an enterprise cognitive analyst.
Extract structured intelligence from meeting transcripts.
${TRANSCRIPT_JSON_SCHEMA}`;
}

export function buildTranscriptPrompt(content: string): { system: string; prompt: string } {
  return {
    system: transcriptSystemPrompt(),
    prompt: `Analyze this meeting transcript and return JSON only:\n\n${content}`,
  };
}

const REIMAGINE_SYSTEM = `You are MODO Reimagine — a strategic scenario simulator.
Given company context and a scenario prompt, project implications.
Return ONLY valid JSON:
{
  "projectedImplications": string[],
  "projectedAttentionShift": Record<string, number>,
  "impactedDepartments": string[],
  "financialRisk": string,
  "operationalRisk": string,
  "alignmentImpact": string,
  "strategicRecommendation": string,
  "confidenceScore": number
}`;

function reimagineSystemPrompt(): string {
  const agentContext = buildSystemPrompt({
    domains: ["attention", "finance", "risk"],
    skills: ["financial-check", "risk-review", "detect-blind-spots"],
  });

  return `${agentContext}\n\n${REIMAGINE_SYSTEM}`;
}

export function buildReimaginePrompt(
  scenarioPrompt: string,
  context: {
    attention: { area: string; pct: number }[];
    blindspots: string[];
    currentMode: string;
    externalGap: number;
  }
): { system: string; prompt: string } {
  return {
    system: reimagineSystemPrompt(),
    prompt: `Company context:
- Current mode: ${context.currentMode}
- Attention gap vs external reality: ${context.externalGap}%
- Attention distribution: ${JSON.stringify(context.attention)}
- Known blindspots: ${context.blindspots.join(", ")}

Scenario to simulate:
"${scenarioPrompt}"

Project strategic implications as JSON only. Keep each implication under 120 characters. Max 5 implications.`,
  };
}
