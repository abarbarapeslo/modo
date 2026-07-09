import { motion, AnimatePresence } from "framer-motion";
import type { MarketHeatPoint } from "../../data/marketMapMockData";
import { heatColor } from "./MarketLegend";

export default function MarketRegionTooltip({
  point,
  onClose,
}: {
  point: MarketHeatPoint | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {point && (
        <motion.aside
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-4 z-20 max-w-sm rounded-2xl border border-line bg-white p-5 shadow-float"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-serif text-lg font-medium">{point.country}</h4>
              <p className="text-xs text-ink-mute">{point.region}</p>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
              style={{ backgroundColor: `${heatColor(point.heatScore)}33`, color: "#1E1D1A" }}
            >
              {point.heatScore}/100
            </span>
          </div>

          <dl className="space-y-3 text-xs">
            <div>
              <dt className="kicker">Drivers</dt>
              <dd className="mt-1 space-y-0.5 text-ink-soft">
                {point.drivers.map((d) => (
                  <p key={d}>· {d}</p>
                ))}
              </dd>
            </div>
            {point.signals.length > 0 && (
              <div>
                <dt className="kicker">Sinais recentes</dt>
                <dd className="mt-1 space-y-0.5 text-ink-soft">
                  {point.signals.map((s) => (
                    <p key={s}>· {s}</p>
                  ))}
                </dd>
              </div>
            )}
            <div>
              <dt className="kicker">Riscos</dt>
              <dd className="mt-1 text-ink-soft">{point.risks.join(" · ")}</dd>
            </div>
            <div>
              <dt className="kicker">Oportunidades</dt>
              <dd className="mt-1 text-ink-soft">{point.opportunities.join(" · ")}</dd>
            </div>
            {point.futureSources && (
              <div>
                <dt className="kicker">Fontes futuras</dt>
                <dd className="mt-1 text-ink-mute">{point.futureSources.join(", ")}</dd>
              </div>
            )}
          </dl>

          <button
            onClick={onClose}
            className="mt-4 text-[11px] text-ink-mute hover:text-ink"
          >
            Fechar
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
