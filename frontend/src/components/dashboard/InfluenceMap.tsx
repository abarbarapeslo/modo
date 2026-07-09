import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InteractiveWorldMap from "../maps/InteractiveWorldMap";
import { SectionCard, StatBadge, MiniBar, influenceColor } from "./ui";
import {
  externalEvents,
  monitoringSchedule,
  overviewMetrics,
  type ExternalEvent,
} from "../../data/mockData";

type MonitorMode = "budget" | "always";

/**
 * Influence Map — eventos externos e setores que podem influenciar a empresa,
 * com monitoramento Always-On ou Budget-Conscious (setores alternados por dia).
 */
export default function InfluenceMap() {
  const [mode, setMode] = useState<MonitorMode>("budget");
  const [selected, setSelected] = useState<ExternalEvent | null>(externalEvents[0]);

  const mapPoints = useMemo(
    () =>
      externalEvents.map((ev) => ({
        id: ev.id,
        coordinates: ev.coordinates,
        score: ev.impactScore,
        color: influenceColor(ev.impactScore),
      })),
    []
  );

  const legend = (
    <div className="flex flex-wrap items-center gap-4 text-[10px] text-ink-mute">
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-info-ink opacity-70" /> impacto baixo
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-attention-strong opacity-80" /> impacto moderado
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-gap-ink opacity-80" /> impacto crítico
      </span>
    </div>
  );

  return (
    <SectionCard
      kicker="Influence Map"
      title="O que está acontecendo lá fora"
      metric={`External Influence Score: ${overviewMetrics.externalInfluenceScore}/100`}
    >
      <div className="mb-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <InteractiveWorldMap
          points={mapPoints}
          selectedId={selected?.id ?? null}
          onSelect={(id) => {
            const ev = externalEvents.find((e) => e.id === id);
            if (ev) setSelected(ev);
          }}
          minHeight={360}
          footer={legend}
        />

        <AnimatePresence mode="wait">
          {selected && (
            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <StatBadge tone="mute">{selected.sector}</StatBadge>
                  <h4 className="mt-2 font-serif text-lg font-medium leading-snug">
                    {selected.title}
                  </h4>
                  <p className="mt-1 text-xs text-ink-mute">{selected.location}</p>
                </div>
                <StatBadge tone={selected.impactScore >= 85 ? "gap" : "attention"}>
                  {selected.impactScore}/100
                </StatBadge>
              </div>
              <MiniBar
                value={selected.impactScore}
                color={selected.impactScore >= 85 ? "#C05B3C" : "#E8B83A"}
              />
              <div className="mt-4 flex flex-wrap gap-1.5">
                {selected.affectedAreas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-white px-2.5 py-0.5 text-[10px] text-ink-soft ring-1 ring-line"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-ink-mute">
                Sugerido para:{" "}
                <span className="text-ink-soft">{selected.suggestedDiscussion}</span>
              </p>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

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
        {externalEvents.map((ev) => {
          const active = selected?.id === ev.id;
          return (
            <article
              key={ev.id}
              onClick={() => setSelected(ev)}
              className={`flex cursor-pointer flex-col rounded-xl border bg-white p-5 transition-shadow hover:shadow-card ${
                active ? "border-attention-strong shadow-card ring-1 ring-attention" : "border-line"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <StatBadge tone="mute">{ev.sector}</StatBadge>
                <span
                  className={`text-sm font-semibold ${
                    ev.impactScore >= 85
                      ? "text-gap-ink"
                      : ev.impactScore >= 65
                        ? "text-ink"
                        : "text-ink-soft"
                  }`}
                >
                  {ev.impactScore}
                </span>
              </div>
              <h4 className="text-sm font-semibold leading-snug">{ev.title}</h4>
              <p className="mt-1 text-[11px] text-ink-mute">{ev.location}</p>
              <div className="mt-3">
                <MiniBar
                  value={ev.impactScore}
                  color={ev.impactScore >= 85 ? "#C05B3C" : "#E8B83A"}
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {ev.affectedAreas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-ink-soft"
                  >
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-auto pt-3 text-[11px] text-ink-mute">
                Sugerido para: <span className="text-ink-soft">{ev.suggestedDiscussion}</span>
              </p>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
