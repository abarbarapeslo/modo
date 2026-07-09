import { marketMapData, findMarket } from "../data/marketMapMock.js";
import { overviewMetrics } from "../data/mockDashboard.js";

export function getAvailableMarkets() {
  return marketMapData.map(({ id, name, description, category }) => ({
    id, name, description, category,
  }));
}

export function getMarketById(marketId: string) {
  return findMarket(marketId) ?? null;
}

export function getMarketHeatMap(marketId: string) {
  const market = findMarket(marketId);
  if (!market) return null;
  return { marketId, name: market.name, heatPoints: market.heatPoints };
}

export function getMarketMetrics(marketId: string) {
  const market = findMarket(marketId);
  if (!market) return null;
  return { marketId, metrics: market.metrics };
}

export function getMarketSignals(marketId: string) {
  const market = findMarket(marketId);
  if (!market) return null;
  return { marketId, signals: market.signals };
}

export function calculateMarketHeatScore(marketId: string, regionId: string) {
  const market = findMarket(marketId);
  const point = market?.heatPoints.find((p) => p.id === regionId);
  return point?.heatScore ?? 0;
}

export function calculateMarketAttentionGap(_companyId: string, marketId: string) {
  const market = findMarket(marketId);
  if (!market) return null;
  return {
    marketAttentionGap: market.metrics.marketAttentionGap,
    companyAttentionGap: overviewMetrics.attentionGap,
    delta: market.metrics.marketAttentionGap - overviewMetrics.attentionGap,
    neglectedVariable: market.metrics.neglectedVariable,
  };
}

/** Future adapters: IBGE, BCB, ComexStat, World Bank, IMF, GDELT, etc. */
export const FUTURE_MARKET_SOURCES = [
  "IBGE", "Banco Central", "Receita Federal/CNPJ", "ComexStat",
  "World Bank", "IMF", "OECD", "UN Comtrade", "GDELT", "NewsAPI",
  "OpenAlex", "Google Trends", "ANP", "ANEEL", "CVM", "B3", "SEC/EDGAR",
];
