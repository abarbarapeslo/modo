import { overviewMetrics, modeTimeline, openLoops } from "../../data/mockData";
import { PageHero } from "../../components/dashboard/platform/PlatformLayout";

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHero
        kicker="Intelligence · Reports"
        title={
          <>
            Relatórios <span className="italic">executivos</span>
          </>
        }
        description="Resumos agregados para board e liderança — exportáveis e rastreáveis."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Attention Gap Report", value: `${overviewMetrics.attentionGap}%` },
          { title: "Decision Alignment", value: `${overviewMetrics.decisionAlignment}%` },
          { title: "Strategic Drift", value: `${overviewMetrics.strategicDrift}%` },
          { title: "Open Loop Index", value: `${openLoops.length} loops ativos` },
        ].map((r) => (
          <div
            key={r.title}
            className="rounded-xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float"
          >
            <p className="kicker mb-2">{r.title}</p>
            <p className="metric-serif text-2xl">{r.value}</p>
            <button className="mt-4 text-xs font-medium text-ink-soft underline-offset-2 hover:text-ink hover:underline">
              Exportar PDF
            </button>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="border-b border-line bg-surface/40 px-6 py-4">
          <p className="kicker">Evolução do modo — últimos 6 meses</p>
        </div>
        <div className="space-y-0 p-6">
          {modeTimeline.map((m) => (
            <div
              key={m.month}
              className="flex items-center justify-between border-b border-line py-3 last:border-0"
            >
              <span className="text-sm font-medium">{m.month}</span>
              <span className="font-serif italic text-ink-soft">{m.mode}</span>
              <span className="text-xs text-ink-mute">{m.intensity}% intensity</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
