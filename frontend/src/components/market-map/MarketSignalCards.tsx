import type { MarketSignal } from "../../data/marketMapMockData";
import { influenceColor } from "../dashboard/ui";

export default function MarketSignalCards({ signals }: { signals: MarketSignal[] }) {
  if (signals.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center text-sm text-ink-mute">
        Nenhum sinal recente para este mercado.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="kicker">Recent market signals</p>
      {signals.map((s) => (
        <article
          key={s.id}
          className="rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-card"
        >
          <div className="mb-2 flex items-start justify-between gap-3">
            <h4 className="text-sm font-semibold leading-snug">{s.title}</h4>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-ink"
              style={{ backgroundColor: `${influenceColor(s.impactScore)}44` }}
            >
              {s.impactScore}
            </span>
          </div>
          <p className="text-xs text-ink-mute">
            Sector: {s.sector} · {s.timestamp}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">{s.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {s.affectedRegions.map((r) => (
              <span key={r} className="rounded-full bg-info-soft px-2 py-0.5 text-[10px] text-info-ink">
                {r}
              </span>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-ink-mute">
            Áreas: {s.affectedDepartments.join(", ")}
          </p>
        </article>
      ))}
    </div>
  );
}
