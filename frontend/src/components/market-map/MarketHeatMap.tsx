import { useState, useMemo } from "react";
import InteractiveWorldMap from "../maps/InteractiveWorldMap";
import MarketLegend, { heatColor } from "./MarketLegend";
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

  const activePoint =
    selected ??
    (hovered ? market?.heatPoints.find((p) => p.id === hovered) ?? null : null);

  const mapPoints = useMemo(
    () =>
      (market?.heatPoints ?? []).map((p) => ({
        id: p.id,
        coordinates: p.coordinates,
        score: p.heatScore,
        color: heatColor(p.heatScore),
        visible: !!market,
      })),
    [market]
  );

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

      <div className="relative min-h-[380px] flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/60">
            <span className="flex items-center gap-2 text-xs text-ink-mute">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
              Ativando heat layer…
            </span>
          </div>
        )}

        <InteractiveWorldMap
          points={mapPoints}
          selectedId={activePoint?.id ?? null}
          onSelect={(id) => {
            const point = market?.heatPoints.find((p) => p.id === id);
            if (point) setSelected(point);
          }}
          onHover={setHovered}
          minHeight={380}
          fitToMarkers={!!market}
          dimmed={loading}
          overlay={
            !market && !loading ? (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-paper/30">
                <p className="max-w-xs rounded-xl border border-line bg-white/90 px-5 py-4 text-center text-sm text-ink-mute shadow-card backdrop-blur-sm">
                  O mapa está neutro. Escolha um mercado no painel lateral para ver onde o mundo
                  está aquecido.
                </p>
              </div>
            ) : undefined
          }
        />

        <MarketRegionTooltip point={activePoint} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}
