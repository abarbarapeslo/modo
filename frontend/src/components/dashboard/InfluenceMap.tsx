import { useState } from "react";
import { SectionCard, StatBadge, MiniBar } from "./ui";
import {
  externalEvents,
  monitoringSchedule,
  overviewMetrics,
} from "../../data/mockData";

type MonitorMode = "budget" | "always";

/**
 * Influence Map — eventos externos e setores que podem influenciar a empresa,
 * com monitoramento Always-On ou Budget-Conscious (setores alternados por dia).
 */
export default function InfluenceMap() {
  const [mode, setMode] = useState<MonitorMode>("budget");

  return (
    <SectionCard
      kicker="Influence Map"
      title="O que está acontecendo lá fora"
      metric={`External Influence Score: ${overviewMetrics.externalInfluenceScore}/100`}
    >
      <div className="mb-5 flex items-center gap-2">
        <button
          onClick={() => setMode("budget")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            mode === "budget"
              ? "bg-ink text-paper"
              : "border border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          Budget-Conscious
        </button>
        <button
          onClick={() => setMode("always")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
            mode === "always"
              ? "bg-ink text-paper"
              : "border border-line bg-white text-ink-soft hover:text-ink"
          }`}
        >
          Always-On
        </button>
      </div>

      {mode === "budget" ? (
        <div className="mb-6 grid gap-2 md:grid-cols-5">
          {monitoringSchedule.map((d) => (
            <div key={d.day} className="rounded-xl border border-line bg-surface p-3">
              <p className="text-[11px] font-semibold">{d.day}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-soft">{d.sectors}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-6 rounded-xl bg-info-soft px-4 py-3 text-xs text-info-ink">
          Monitoramento contínuo de todos os setores relevantes: finanças, semicondutores,
          terras raras, logística, regulação, varejo, energia e cadeia de suprimentos.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {externalEvents.map((ev) => (
          <article
            key={ev.title}
            className="flex flex-col rounded-xl border border-line bg-white p-5 transition-shadow hover:shadow-card"
          >
            <div className="mb-3 flex items-center justify-between">
              <StatBadge tone="mute">{ev.sector}</StatBadge>
              <span
                className={`text-sm font-semibold ${
                  ev.impactScore >= 85 ? "text-gap-ink" : ev.impactScore >= 65 ? "text-ink" : "text-ink-soft"
                }`}
              >
                {ev.impactScore}
              </span>
            </div>
            <h4 className="text-sm font-semibold leading-snug">{ev.title}</h4>
            <div className="mt-3">
              <MiniBar
                value={ev.impactScore}
                color={ev.impactScore >= 85 ? "#C05B3C" : "#E8B83A"}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ev.affectedAreas.map((a) => (
                <span key={a} className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-ink-soft">
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-3 text-[11px] text-ink-mute">
              Sugerido para: <span className="text-ink-soft">{ev.suggestedDiscussion}</span>
            </p>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
