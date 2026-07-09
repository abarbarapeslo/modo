export type TaskType =
  | "entity_extraction"
  | "decision_extraction"
  | "summarization"
  | "simulation"
  | "classification"
  | "skip";

export interface RoutedContext {
  task: TaskType;
  relevantChunks: string[];
  useLlm: boolean;
  tokenEstimate: number;
  reason: string;
}

const ENTITY_PATTERNS = [
  /NVIDIA|Apple|TSMC|Banco Central|CEO da/i,
  /decidimos|vamos|precisamos|aprovar|revisar/i,
  /risco|oportunidade|urgente|orçamento/i,
];

export class ContextRouter {
  classifyTranscript(content: string): TaskType {
    const lower = content.toLowerCase();
    if (content.length < 80) return "skip";
    if (/simul|cenário|what if/i.test(content)) return "simulation";
    if (ENTITY_PATTERNS.some((p) => p.test(content))) return "entity_extraction";
    if (/resumo|summary/i.test(lower)) return "summarization";
    return "classification";
  }

  routeTranscript(content: string, existingSummary?: string): RoutedContext {
    const task = this.classifyTranscript(content);
    const chunks = this.chunkContent(content);
    const relevantChunks =
      task === "skip"
        ? []
        : chunks.filter((c) => ENTITY_PATTERNS.some((p) => p.test(c)));

    const useLlm = task !== "skip" && task !== "classification";
    const tokenEstimate = useLlm
      ? Math.ceil(relevantChunks.join(" ").length / 4)
      : 0;

    return {
      task,
      relevantChunks: existingSummary ? [existingSummary, ...relevantChunks.slice(0, 3)] : relevantChunks.slice(0, 5),
      useLlm,
      tokenEstimate,
      reason: existingSummary
        ? "Incremental summary available — sending delta only"
        : `Classified as ${task}`,
    };
  }

  private chunkContent(content: string, size = 600): string[] {
    const paragraphs = content.split(/\n\n+/);
    const chunks: string[] = [];
    let buf = "";
    for (const p of paragraphs) {
      if ((buf + p).length > size) {
        if (buf) chunks.push(buf.trim());
        buf = p;
      } else {
        buf += (buf ? "\n\n" : "") + p;
      }
    }
    if (buf) chunks.push(buf.trim());
    return chunks;
  }
}

export const contextRouter = new ContextRouter();
