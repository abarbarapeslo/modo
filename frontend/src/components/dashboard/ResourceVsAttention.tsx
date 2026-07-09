import { SectionCard, MiniBar, StatBadge } from "./ui";
import { resourceVsAttention } from "../../data/mockData";

/**
 * Resource vs Attention — compara discurso (atenção) e esforço real
 * (orçamento, execução) tema a tema.
 */
export default function ResourceVsAttention() {
  return (
    <SectionCard
      kicker="Resource vs Attention"
      title="Discurso versus esforço real"
      metric="Attention-to-Resource Ratio"
    >
      <div className="space-y-4">
        {resourceVsAttention.map((t) => {
          const ratio = t.attention / Math.max(1, (t.budget + t.execution) / 2);
          const critical = ratio > 2 || (t.externalImportance > 75 && t.attention < 30);
          return (
            <article
              key={t.theme}
              className="rounded-xl border border-line bg-white p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold">{t.theme}</h4>
                <StatBadge tone={critical ? "gap" : "mute"}>
                  ratio {ratio.toFixed(1)}×
                </StatBadge>
              </div>
              <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                <Row label="Attention" value={t.attention} color="#E8B83A" />
                <Row label="Budget" value={t.budget} color="#57554E" />
                <Row label="Execution" value={t.execution} color="#5D7F9C" />
                <Row label="External importance" value={t.externalImportance} color="#C05B3C" />
              </div>
              <p className="mt-4 border-t border-line pt-3 text-xs italic text-ink-soft">
                “{t.diagnosis}”
              </p>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}

function Row({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 shrink-0 text-[11px] text-ink-mute">{label}</span>
      <MiniBar value={value} color={color} />
      <span className="w-8 text-right text-[11px] font-medium">{value}</span>
    </div>
  );
}
