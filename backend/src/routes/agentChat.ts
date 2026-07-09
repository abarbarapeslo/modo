import { Router } from "express";
import { z } from "zod";
import { buildSystemPrompt } from "../ai/agentRules.js";
import { llmClient } from "../ai/llmClient.js";
import { optionalAuth } from "../middleware/auth.js";

export const agentChatRouter = Router();

const chatSchema = z.object({
  message: z.string().min(1).max(4000),
});

agentChatRouter.post("/chat", optionalAuth, async (req, res) => {
  try {
    const { message } = chatSchema.parse(req.body);
    const system = buildSystemPrompt({
      domains: ["attention", "finance", "risk", "product"],
      skills: ["analyze-transcript", "detect-blind-spots", "financial-check"],
    });

    const result = await llmClient.complete({
      task: "agent_chat",
      system: `${system}\n\nResponda em português, de forma estratégica e objetiva. Separe evidência, interpretação e recomendação quando aplicável.`,
      prompt: message,
      tokenEstimate: Math.ceil(message.length / 4) + 500,
      mock: () =>
        `[MODO] Recebi: "${message}". Conecte ANTHROPIC_API_KEY no backend para respostas com IA. Enquanto isso, explore o dashboard em /dashboard para ver o Cognitive Digital Twin.`,
      parse: (text) => text.trim(),
    });

    res.json({ reply: result.data, provider: result.provider });
  } catch (err) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    return res.status(500).json({ error: "Failed to process message" });
  }
});
