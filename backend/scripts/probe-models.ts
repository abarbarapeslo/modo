import Anthropic from "@anthropic-ai/sdk";
import "dotenv/config";

const client = new Anthropic();
const models = [
  "claude-sonnet-5",
  "claude-sonnet-4-6",
  "claude-sonnet-4-5",
  "claude-haiku-4-5",
  "claude-3-5-sonnet-latest",
];

async function main() {
  for (const model of models) {
    try {
      const r = await client.messages.create({
        model,
        max_tokens: 20,
        messages: [{ role: "user", content: "Say OK" }],
      });
      const text = r.content[0].type === "text" ? r.content[0].text : "";
      console.log(`✓ ${model}: ${text}`);
      return;
    } catch (e: unknown) {
      const err = e as { status?: number; message?: string };
      console.log(`✗ ${model}: ${err.status ?? err.message?.slice(0, 100)}`);
    }
  }
}

main();
