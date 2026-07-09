import { useState } from "react";
import { motion } from "framer-motion";
import { WorldMap, project } from "../dashboard/WorldMap";
import MarketLegend, { heatColor, heatRadius } from "./MarketLegend";
import MarketRegionTooltip from "./MarketRegionTooltip";
import type { Market, MarketHeatPoint } from "../../data/marketMapMockData";

export default function MarketHeatMap({
  market,
  loading,
}: {
  market: Market | null;
  loading?: boolean;
}) {
  const [selected, setSelected] = useState<MarketHeatPoint | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const activePoint = selected ?? (hovered ? market?.heatPoints.find((p) => p.id === hovered) ?? null : null);

  return (
    <div className="relative flex flex-1 flex-col rounded-2xl border border-line bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          {market ? (
            <>
              <p className="kicker mb-0.5">Economic Digital Twin</p>
              <h2 className="font-serif text-2xl font-light tracking-tight">
                {market.name} <span className="italic">Market Twin</span>
              </h2>
            </>
          ) : (
            <>
              <p className="kicker mb-0.5">Global heat layer</p>
              <h2 className="font-serif text-xl font-light text-ink-soft">
                Selecione um mercado para ativar o mapa de calor.
              </h2>
            </>
          )}
        </div>
        <MarketLegend />
      </div>

      <div className={`relative min-h-[340px] flex-1 transition-opacity ${loading ? "opacity-40" : ""}`}>
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <span className="flex items-center gap-2 text-xs text-ink-mute">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
              Ativando heat layer…
            </span>
          </div>
        )}

        <WorldMap>
          {market?.heatPoints.map((p) => {
            const [x, y] = project(p.coordinates);
            const r = heatRadius(p.heatScore);
            const color = heatColor(p.heatScore);
            const active = activePoint?.id === p.id;
            return (
              <g
                key={p.id}
                className="cursor-pointer"
                onClick={() => setSelected(p)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={r * 2.5}
                  fill={color}
                  opacity={market ? 0.18 : 0}
                  filter="url(#soft-halo)"
                />
                <motion.circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={color}
                  initial={false}
                  animate={{ opacity: market ? (active ? 0.95 : 0.65) : 0 }}
                  transition={{ duration: 0.4 }}
                  stroke={active ? "#1E1D1A" : "white"}
                  strokeWidth={active ? 1.5 : 1}
                />
              </g>
            );
          })}
        </WorldMap>

        {!market && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="max-w-xs text-center text-sm text-ink-mute">
              O mapa está neutro. Escolha um mercado no painel lateral para ver onde o mundo está aquecido.
            </p>
          </div>
        )}
      </div>

      <MarketRegionTooltip point={activePoint} onClose={() => setSelected(null)} />
    </div>
  );
}
