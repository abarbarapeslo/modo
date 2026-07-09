export interface MemorySnapshotData {
  summary: string;
  topics: string[];
  tokenEstimate: number;
}

const snapshots = new Map<string, MemorySnapshotData>();

export function getMemorySnapshot(companyId: string): MemorySnapshotData | undefined {
  return snapshots.get(companyId);
}

export function saveMemorySnapshot(companyId: string, data: MemorySnapshotData) {
  snapshots.set(companyId, data);
}

export function mergeIntoSnapshot(
  companyId: string,
  delta: { summary: string; topics: string[]; tokenEstimate: number }
) {
  const existing = snapshots.get(companyId);
  if (!existing) {
    saveMemorySnapshot(companyId, delta);
    return;
  }
  saveMemorySnapshot(companyId, {
    summary: `${existing.summary}\n${delta.summary}`.slice(-4000),
    topics: [...new Set([...existing.topics, ...delta.topics])].slice(0, 20),
    tokenEstimate: existing.tokenEstimate + delta.tokenEstimate,
  });
}
