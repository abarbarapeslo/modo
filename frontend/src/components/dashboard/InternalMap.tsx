import { SectionCard, heatColor } from "./ui";
import {
  internalHeat,
  organizationalHeatIndex,
  internalMapDiagnosis,
} from "../../data/mockData";

/**
 * Internal Map — mapa de calor da empresa: onde se concentram verba, reuniões,
 * atenção executiva, urgência e esforço operacional.
 */
export default function InternalMap() {
  const sorted = [...internalHeat].sort((a, b) => b.heat - a.heat);

  return (
    <SectionCard
      kicker="Internal Map"
      title="Onde a energia realmente está"
      metric={`Organizational Heat Index: ${organizationalHeatIndex}`}
    >
      <div className="grid grid-cols-3 gap-3">
        {sorted.map((item, i) => (
          <div
            key={item.area}
            className="relative flex flex-col justify-between rounded-xl border border-line p-4 transition-transform hover:-translate-y-0.5"
            style={{
              backgroundColor: heatColor(item.heat),
              minHeight: i < 3 ? 120 : 96,
              gridColumn: i === 0 ? "span 2" : undefined,
            }}
          >
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold">{item.area}</p>
              <span className="font-serif text-2xl font-light">{item.heat}</span>
            </div>
            <div className="mt-3 h-1 w-full rounded-full bg-white/60">
              <div
                className="h-1 rounded-full bg-ink/70"
                style={{ width: `${item.heat}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-ink-mute">
        <span>Combina:</span>
        {["verba", "reuniões", "atenção executiva", "urgência", "headcount", "decisões", "conflitos", "projetos", "follow-ups"].map(
          (t) => (
            <span key={t} className="rounded-full bg-surface px-2 py-0.5">
              {t}
            </span>
          )
        )}
      </div>

      <p className="mt-4 rounded-xl bg-attention px-4 py-3 text-xs leading-relaxed text-ink">
        <span className="font-semibold">Diagnóstico: </span>
        {internalMapDiagnosis}
      </p>
    </SectionCard>
  );
}
