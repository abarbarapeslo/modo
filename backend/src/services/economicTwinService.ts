import {
  externalEvents,
  externalSignalsList,
  blindspots,
  attentionSources,
  monitoringSchedule,
  overviewMetrics,
} from "../data/mockDashboard.js";
import { ibgeAdapter } from "../external/adapters/ibgeAdapter.js";
import { bcbAdapter } from "../external/adapters/bcbAdapter.js";
import { newsAdapter } from "../external/adapters/newsAdapter.js";
import { sectorSignalsAdapter } from "../external/adapters/sectorSignalsAdapter.js";

export function getRelevantExternalSignals(_companyId: string) {
  return externalEvents;
}

export function detectSectorTriggers(_companyId: string) {
  return sectorSignalsAdapter.getTriggers();
}

export function calculateExternalInfluenceScore(_companyId: string) {
  return { score: overviewMetrics.externalInfluenceScore, sources: attentionSources.length };
}

export function recommendSectorsToMonitor(_companyId: string) {
  return monitoringSchedule;
}

export async function compareExternalRealityWithInternalAttention(_companyId: string) {
  const [ibge, bcb, news] = await Promise.all([
    ibgeAdapter.fetchIndicators(),
    bcbAdapter.fetchIndicators(),
    newsAdapter.fetchHeadlines(),
  ]);

  return {
    blindspots,
    externalSignals: externalSignalsList,
    macroIndicators: { ibge, bcb },
    news,
    gap: overviewMetrics.attentionGap,
  };
}

export function getInfluenceMap(_companyId: string) {
  return {
    events: externalEvents,
    schedule: monitoringSchedule,
    score: overviewMetrics.externalInfluenceScore,
  };
}
