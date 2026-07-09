export function compressPrompt(text: string, maxTokens = 800): string {
  const maxChars = maxTokens * 4;
  if (text.length <= maxChars) return text;

  const sentences = text.split(/(?<=[.!?])\s+/);
  let out = "";
  for (const s of sentences) {
    if ((out + s).length > maxChars) break;
    out += (out ? " " : "") + s;
  }
  return out || text.slice(0, maxChars);
}

export function stripBoilerplate(text: string): string {
  return text
    .replace(/^(Speaker \d:|Participante \d:)\s*/gim, "")
    .replace(/\[(?:inaudível|silêncio|risos)\]/gi, "")
    .trim();
}
