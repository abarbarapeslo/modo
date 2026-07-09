import { useState, useMemo } from "react";
import {
  markets,
  SUGGESTED_MARKETS,
  getMarketByNameOrId,
  WATCH_SCHEDULE_EXAMPLE,
  type Market,
  type WatchMode,
} from "../../data/marketMapMockData";

export default function MarketSelectorPanel({
  selectedId,
  onSelect,
  watchMode,
  onWatchModeChange,
}: {
  selectedId: string | null;
  onSelect: (market: Market) => void;
  watchMode: WatchMode;
  onWatchModeChange: (mode: WatchMode) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (!q) return SUGGESTED_MARKETS;
    return SUGGESTED_MARKETS.filter((name) =>
      name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(q)
    );
  }, [query]);

  function handlePick(name: string) {
    const market = getMarketByNameOrId(name);
    if (market) onSelect(market);
  }

  return (
    <aside className="flex w-full shrink-0 flex-col rounded-2xl border border-line bg-white p-6 shadow-card lg:w-80">
      <p className="kicker mb-2">Market selection</p>
      <h3 className="font-serif text-xl font-medium leading-snug tracking-tight">
        Em que mercado você quer prestar atenção hoje?
      </h3>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        A MODO ativa um mapa de calor para o mercado escolhido e cruza sinais globais,
        crescimento, risco, inovação, demanda e pressão competitiva.
      </p>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar mercado…"
        className="mt-5 h-10 w-full rounded-full border border-line bg-paper px-4 text-sm focus:border-attention-strong focus:outline-none"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {filtered.map((name) => {
          const market = getMarketByNameOrId(name);
          const active = market?.id === selectedId;
          const available = Boolean(market);
          return (
            <button
              key={name}
              onClick={() => available && handlePick(name)}
              disabled={!available}
              title={available ? undefined : "Dados completos em breve"}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-attention-strong bg-attention text-ink"
                  : available
                    ? "border-line bg-surface text-ink-soft hover:border-attention-strong hover:text-ink"
                    : "border-line bg-paper text-ink-mute opacity-50"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <p className="kicker mb-3">Watch Mode</p>
        <div className="flex gap-2">
          {(["BUDGET_CONSCIOUS", "ALWAYS_ON"] as WatchMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onWatchModeChange(mode)}
              className={`flex-1 rounded-lg border px-2 py-2 text-[10px] font-medium transition-colors ${
                watchMode === mode
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-surface text-ink-soft hover:text-ink"
              }`}
            >
              {mode === "BUDGET_CONSCIOUS" ? "Budget-Conscious" : "Always-On"}
            </button>
          ))}
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-ink-mute">
          {watchMode === "BUDGET_CONSCIOUS"
            ? "A MODO alterna mercados analisados conforme prioridade e orçamento."
            : "Monitoramento contínuo de todos os mercados críticos."}
        </p>
        {watchMode === "BUDGET_CONSCIOUS" && (
          <ul className="mt-3 space-y-1 text-[10px] text-ink-mute">
            {WATCH_SCHEDULE_EXAMPLE.map((s) => (
              <li key={s.day}>
                <span className="font-medium text-ink-soft">{s.day}:</span> {s.focus}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-auto pt-6 text-[10px] text-ink-mute">
        {markets.length} mercados com heat layer completo · {SUGGESTED_MARKETS.length} sugeridos
      </p>
    </aside>
  );
}
