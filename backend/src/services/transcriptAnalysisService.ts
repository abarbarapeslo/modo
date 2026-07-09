import { contextRouter } from "../ai/contextRouter.js";
import { stripBoilerplate, compressPrompt } from "../ai/promptCompressor.js";
import { withSemanticCache } from "../ai/semanticCache.js";
import { llmClient } from "../ai/llmClient.js";
import { buildTranscriptPrompt } from "../ai/prompts.js";
import { mergeIntoSnapshot } from "../ai/memorySnapshots.js";
import type { TranscriptAnalysisResult } from "../data/types.js";

function mockAnalyze(content: string): TranscriptAnalysisResult {
  const hasNvidia = /NVIDIA|nvidia/i.test(content);
  const hasBcb = /Banco Central|juros|taxa/i.test(content);

  return {
    themes: [
      ...(hasNvidia ? ["AI infrastructure"] : []),
      ...(hasBcb ? ["Interest rates", "Credit conditions"] : []),
      "Operational efficiency",
    ].filter(Boolean),
    decisionsMade: [
      "Review cloud infrastructure budget",
      "Increase component buffer stock",
    ],
    pendingDecisions: ["Supplier diversification plan", "Pricing model revision"],
    risks: ["Semiconductor supply tightness", "Currency volatility"],
    opportunities: ["LATAM expansion", "AI-enabled product launch"],
    peopleMentioned: hasNvidia ? ["CEO of NVIDIA"] : [],
    companiesMentioned: [
      ...(hasNvidia ? ["NVIDIA"] : []),
      ...(hasBcb ? ["Banco Central do Brasil"] : []),
    ],
    locations: hasNvidia ? ["Santa Clara, California, USA"] : [],
    sectors: hasNvidia
      ? ["AI Infrastructure", "Semiconductors", "Cloud Computing"]
      : ["Finance"],
    externalInfluences: hasNvidia
      ? [
          {
            entity: "NVIDIA",
            type: "Company",
            personMentioned: "CEO of NVIDIA",
            location: "Santa Clara, California, USA",
            sector: ["AI Infrastructure", "Semiconductors", "Cloud Computing"],
            influenceScore: 91,
            relatedInternalDecision: "Review cloud infrastructure budget",
          },
        ]
      : [],
    actions: [
      { action: "Map rare-earth exposure", owner: "Operations" },
      { action: "Schedule pricing review", deadline: "Q3" },
    ],
    openLoops: ["Improve onboarding", "Internal AI tooling"],
    okrsRelated: ["Enter 3 LATAM markets", "Ship AI assistant v1"],
  };
}

function parseTranscriptJson(text: string): TranscriptAnalysisResult {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced?.[1]?.trim() ?? text.trim();
  return JSON.parse(raw) as TranscriptAnalysisResult;
}

export async function analyzeTranscript(
  companyId: string,
  content: string
): Promise<TranscriptAnalysisResult> {
  const cleaned = stripBoilerplate(content);
  const routed = contextRouter.routeTranscript(cleaned);

  const { result } = await withSemanticCache(
    companyId,
    "transcript_analysis",
    cleaned,
    async () => {
      if (!routed.useLlm) {
        return mockAnalyze(cleaned);
      }

      const compressed = compressPrompt(routed.relevantChunks.join("\n\n"));
      const { system, prompt } = buildTranscriptPrompt(compressed);

      const response = await llmClient.complete({
        task: routed.task,
        system,
        prompt,
        tokenEstimate: routed.tokenEstimate,
        mock: () => mockAnalyze(cleaned),
        parse: parseTranscriptJson,
      });

      mergeIntoSnapshot(companyId, {
        summary: `Analyzed transcript: ${response.data.themes?.slice(0, 3).join(", ") ?? "general"}`,
        topics: response.data.themes ?? [],
        tokenEstimate: response.tokenEstimate,
      });

      if (response.provider === "anthropic") {
        console.log(`[MODO] Transcript analyzed via Anthropic (${response.tokenEstimate} tokens)`);
      }

      return response.data;
    }
  );

  return result;
}
