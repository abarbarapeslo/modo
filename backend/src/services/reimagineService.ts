import { calculateAttentionDistribution, getCompanyOverview } from "./companyTwinService.js";
import { compareExternalRealityWithInternalAttention } from "./economicTwinService.js";
import { llmClient } from "../ai/llmClient.js";
import { buildReimaginePrompt } from "../ai/prompts.js";
import { withSemanticCache } from "../ai/semanticCache.js";
import type { ReimagineResult } from "../data/types.js";
import { overviewMetrics, blindspots } from "../data/mockDashboard.js";

function mockSimulate(scenarioPrompt: string, externalGap: number): ReimagineResult {
  const isMarketing = /marketing|campanha|launch|lançamento/i.test(scenarioPrompt);
  const isLatam = /latam|mexico|são paulo|sao paulo|brasil/i.test(scenarioPrompt);

  const implications = isMarketing && isLatam
    ? [
        "Marketing attention increases from 18% to 31%.",
        "Product may become a bottleneck in 6 weeks.",
        "Sales alignment improves if LATAM messaging is adopted.",
        "Finance risk increases because CAC may rise under current credit conditions.",
        "Recommended condition: shift $20,000 to customer research before campaign launch.",
      ]
    : [
        "Attention shifts toward the scenario theme by ~12%.",
        "Operations capacity should be reviewed within 4 weeks.",
        "External signals suggest monitoring credit conditions closely.",
        "Cross-functional alignment may improve if OKRs are updated.",
      ];

  return {
    projectedImplications: implications,
    projectedAttentionShift: {
      Marketing: isMarketing ? 31 : 18,
      Product: isMarketing ? 24 : 21,
      Finance: 18,
    },
    impactedDepartments: isLatam ? ["Marketing", "Sales", "Product", "Finance"] : ["Strategy", "Operations"],
    financialRisk: externalGap > 20 ? "Elevated under current credit conditions" : "Moderate",
    operationalRisk: "Product bottleneck possible within 6 weeks",
    alignmentImpact: isLatam ? "Improves if LATAM messaging adopted" : "Neutral pending OKR update",
    strategicRecommendation: implications[implications.length - 1] ?? "Review with leadership team",
    confidenceScore: 72,
  };
}

function parseReimagineJson(text: string): ReimagineResult {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  let raw = fenced?.[1]?.trim() ?? text.trim();
  const start = raw.search(/\{/);
  if (start > 0) raw = raw.slice(start);
  try {
    return JSON.parse(raw) as ReimagineResult;
  } catch {
    const lastBrace = raw.lastIndexOf("}");
    if (lastBrace > 0) return JSON.parse(raw.slice(0, lastBrace + 1)) as ReimagineResult;
    throw new Error("Invalid reimagine JSON");
  }
}

export async function simulateScenario(
  companyId: string,
  scenarioPrompt: string,
  _userId?: string
): Promise<ReimagineResult> {
  const attention = calculateAttentionDistribution(companyId);
  const external = await compareExternalRealityWithInternalAttention(companyId);
  const overview = getCompanyOverview(companyId);
  const fallback = () => mockSimulate(scenarioPrompt, external.gap);

  const { result } = await withSemanticCache(
    companyId,
    "reimagine",
    scenarioPrompt,
    async () => {
      const { system, prompt } = buildReimaginePrompt(scenarioPrompt, {
        attention,
        blindspots: blindspots.map((b) => b.topic),
        currentMode: overview.currentMode,
        externalGap: external.gap,
      });

      const response = await llmClient.complete({
        task: "simulation",
        system,
        prompt,
        tokenEstimate: Math.ceil(prompt.length / 4),
        mock: fallback,
        parse: parseReimagineJson,
      });

      if (response.provider === "anthropic") {
        console.log(`[MODO] Reimagine simulation via Anthropic (${response.tokenEstimate} tokens)`);
      }

      return response.data;
    }
  );

  return result;
}
