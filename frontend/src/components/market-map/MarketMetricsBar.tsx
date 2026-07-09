import { useState } from "react";
import type { MarketMetrics } from "../../data/marketMapMockData";

type MetricItem = {
  key: string;
  label: string;
  value: string | number;
  hint?: string;
  highlight?: boolean;
  trend?: "up" | "down" | "neutral";
};

const TABS = [
  { id: "size", label: "Market Size" },
  { id: "pressure", label: "Market Pressure" },
  { id: "modo", label: "MODO Scores" },
] as const;

function trendArrow(t?: "up" | "down" | "neutral") {
  if (t === "up") return "↑";
  if (t === "down") return "↓";
  return "→";
}

function buildMetrics(m: MarketMetrics): Record<string, MetricItem[]> {
  return {
    size: [
      { key: "tam", label: "TAM", value: m.tam, hint: "Global opportunity", trend: "up" },
      { key: "sam", label: "SAM", value: m.sam, hint: "Serviceable market" },
      { key: "som", label: "SOM", value: m.som, hint: "Obtainable share" },
      { key: "cagr", label: "CAGR", value: m.cagr, hint: "2024–2030", highlight: true, trend: "up" },
      { key: "yoy", label: "Market Growth YoY", value: m.growthYoY, trend: "up" },
      { key: "maturity", label: "Market Maturity", value: m.maturity },
    ],
    pressure: [
      { key: "ci", label: "Competitive Intensity", value: m.competitiveIntensity, trend: "up" },
      { key: "dg", label: "Demand Growth", value: m.demandGrowth, trend: "up" },
      { key: "rp", label: "Regulatory Pressure", value: m.regulatoryPressure },
      { key: "ms", label: "Macro Sensitivity", value: m.macroSensitivity, trend: "up" },
      { key: "scr", label: "Supply Chain Risk", value: m.supplyChainRisk, trend: "up" },
    ],
    modo: [
      { key: "sfs", label: "Strategic Fit Score", value: m.strategicFitScore, highlight: true },
      { key: "mag", label: "Market Attention Gap", value: m.marketAttentionGap, hint: "High neglected opportunity", highlight: true, trend: "up" },
      { key: "nvs", label: "Neglected Variable", value: m.neglectedVariable ?? m.neglectedVariableScore, hint: m.neglectedVariable ? "High relevance, low internal attention" : undefined, highlight: true },
      { key: "ts", label: "Timing Score", value: m.timingScore, trend: "up" },
      { key: "fs", label: "Fragility Score", value: m.fragilityScore },
      { key: "sv", label: "Signal Velocity", value: m.signalVelocity, trend: "up" },
      { key: "meg", label: "Market Effort Gap", value: m.marketEffortGap ?? "—" },
      { key: "mrp", label: "Reality Pressure", value: m.marketRealityPressure ?? "—", trend: "up" },
    ],
  };
}

export default function MarketMetricsBar({ metrics }: { metrics: MarketMetrics | null }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("size");

  if (!metrics) {
    return (
      <div className="rounded-2xl border border-line bg-surface px-6 py-8 text-center">
        <p className="kicker mb-1">Market Metrics</p>
        <p className="text-sm text-ink-mute">Selecione um mercado para ver métricas.</p>
      </div>
    );
  }

  const groups = buildMetrics(metrics);
  const items = groups[tab];

  return (
    <section className="rounded-2xl border border-line bg-white shadow-card">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <p className="kicker">Market Metrics</p>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                tab === t.id
                  ? "bg-attention text-ink"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto p-4">
        {items.map((item) => (
          <div
            key={item.key}
            className={`min-w-[140px] shrink-0 rounded-xl border px-4 py-3 ${
              item.highlight ? "border-attention bg-attention/25" : "border-line bg-surface"
            }`}
          >
            <p className="text-[10px] font-medium uppercase tracking-wider text-ink-mute">
              {item.label}
            </p>
            <p className="mt-1 font-serif text-2xl font-light tracking-tight">
              {item.value}
              {typeof item.value === "number" && (
                <span className="ml-1 text-xs text-ink-mute">{trendArrow(item.trend)}</span>
              )}
            </p>
            {item.hint && (
              <p className="mt-1 text-[10px] text-ink-mute">{item.hint}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
