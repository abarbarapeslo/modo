import { Router } from "express";
import { optionalAuth } from "../middleware/auth.js";
import * as marketMap from "../services/marketMapService.js";

export const marketMapRouter = Router();

marketMapRouter.get("/markets", optionalAuth, (_req, res) => {
  res.json({ markets: marketMap.getAvailableMarkets(), futureSources: marketMap.FUTURE_MARKET_SOURCES });
});

marketMapRouter.get("/markets/:marketId", optionalAuth, (req, res) => {
  const market = marketMap.getMarketById(req.params.marketId);
  if (!market) return res.status(404).json({ error: "Market not found" });
  res.json(market);
});

marketMapRouter.get("/markets/:marketId/heatmap", optionalAuth, (req, res) => {
  const data = marketMap.getMarketHeatMap(req.params.marketId);
  if (!data) return res.status(404).json({ error: "Market not found" });
  res.json(data);
});

marketMapRouter.get("/markets/:marketId/metrics", optionalAuth, (req, res) => {
  const data = marketMap.getMarketMetrics(req.params.marketId);
  if (!data) return res.status(404).json({ error: "Market not found" });
  res.json(data);
});

marketMapRouter.get("/markets/:marketId/signals", optionalAuth, (req, res) => {
  const data = marketMap.getMarketSignals(req.params.marketId);
  if (!data) return res.status(404).json({ error: "Market not found" });
  res.json(data);
});

marketMapRouter.get("/markets/:marketId/attention-gap", optionalAuth, (req, res) => {
  const companyId = req.user?.companyId ?? "acme-electronics";
  const data = marketMap.calculateMarketAttentionGap(companyId, req.params.marketId);
  if (!data) return res.status(404).json({ error: "Market not found" });
  res.json(data);
});
