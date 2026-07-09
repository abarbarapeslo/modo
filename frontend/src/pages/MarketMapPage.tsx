import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import MarketHeatMap from "../components/market-map/MarketHeatMap";
import MarketSelectorPanel from "../components/market-map/MarketSelectorPanel";
import MarketMetricsBar from "../components/market-map/MarketMetricsBar";
import MarketSignalCards from "../components/market-map/MarketSignalCards";
import {
  getAskModoResponse,
  type Market,
  type WatchMode,
} from "../data/marketMapMockData";

interface DashboardContext {
  openReimagine: (prompt?: string) => void;
}

const QUICK_QUESTIONS = [
  "Por que este mercado está aquecido?",
  "O que nossa empresa está ignorando neste mercado?",
  "Quais regiões deveríamos acompanhar?",
  "Este mercado combina com nossos OKRs?",
  "Quais variáveis podem afetar nossa entrada?",
];

export default function MarketMapPage() {
  const { openReimagine } = useOutletContext<DashboardContext>();
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(false);
  const [watchMode, setWatchMode] = useState<WatchMode>("BUDGET_CONSCIOUS");
  const [askOpen, setAskOpen] = useState(false);
  const [askResponse, setAskResponse] = useState<string | null>(null);

  const selectMarket = useCallback((m: Market) => {
    setLoading(true);
    setAskResponse(null);
    setTimeout(() => {
      setMarket(m);
      setLoading(false);
    }, 380);
  }, []);

  function handleAskModo(question?: string) {
    if (!market) return;
    setAskOpen(true);
    setAskResponse(getAskModoResponse(market));
    if (question) {
      openReimagine(`[Market Map: ${market.name}] ${question}`);
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <p className="kicker">Economic Digital Twin</p>
            <span className="rounded-full bg-attention px-2.5 py-0.5 text-[10px] font-medium">
              Market Map
            </span>
          </div>
          <h1 className="font-serif text-4xl font-light tracking-tight">Market Map</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Veja onde cada mercado está aquecido no mundo — e compare esses sinais com a
            atenção da sua empresa. Cada mercado ativa uma camada diferente do Economic
            Digital Twin da MODO.
          </p>
        </div>

        {market && (
          <button
            onClick={() => handleAskModo()}
            className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-paper transition-opacity hover:opacity-85"
          >
            Ask MODO about this market
          </button>
        )}
      </header>

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <MarketHeatMap market={market} loading={loading} />
          <MarketMetricsBar metrics={market?.metrics ?? null} />
          {market && <MarketSignalCards signals={market.signals} />}
        </div>

        <MarketSelectorPanel
          selectedId={market?.id ?? null}
          onSelect={selectMarket}
          watchMode={watchMode}
          onWatchModeChange={setWatchMode}
        />
      </div>

      <AnimatePresence>
        {askOpen && market && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/15"
              onClick={() => setAskOpen(false)}
            />
            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed bottom-8 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 rounded-2xl border border-line bg-white p-6 shadow-float"
            >
              <p className="kicker mb-2">MODO · {market.name}</p>
              <p className="font-serif text-lg italic leading-relaxed text-ink-soft">
                {askResponse}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAskModo(q)}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-[11px] text-ink-soft hover:bg-attention hover:text-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setAskOpen(false)}
                className="mt-4 text-xs text-ink-mute hover:text-ink"
              >
                Fechar
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
