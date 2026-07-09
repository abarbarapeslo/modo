const BUDGETS: Record<string, number> = {
  entity_extraction: 1200,
  decision_extraction: 1500,
  summarization: 800,
  simulation: 2000,
  classification: 400,
};

export function getTokenBudget(task: string): number {
  return BUDGETS[task] ?? 1000;
}

export function withinBudget(estimate: number, task: string): boolean {
  return estimate <= getTokenBudget(task);
}

export function logTokenUsage(task: string, estimate: number, cacheHit: boolean) {
  console.log(
    `[RTK] task=${task} tokens≈${estimate} cacheHit=${cacheHit} budget=${getTokenBudget(task)}`
  );
}
