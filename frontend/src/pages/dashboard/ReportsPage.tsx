import { overviewMetrics, modeTimeline, openLoops } from "../../data/mockData";

export default function ReportsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header>
        <p className="kicker mb-3">Reports</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          Relatórios <span className="italic">executivos</span>
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          Resumos agregados para board e liderança — exportáveis e rastreáveis.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          { title: "Attention Gap Report", value: `${overviewMetrics.attentionGap}%` },
          { title: "Decision Alignment", value: `${overviewMetrics.decisionAlignment}%` },
          { title: "Strategic Drift", value: `${overviewMetrics.strategicDrift}%` },
          { title: "Open Loop Index", value: `${openLoops.length} loops ativos` },
        ].map((r) => (
          <div key={r.title} className="card p-6">
            <p className="kicker mb-2">{r.title}</p>
            <p className="metric-serif text-2xl">{r.value}</p>
            <button className="mt-4 text-xs font-medium text-ink-soft underline-offset-2 hover:underline">
              Exportar PDF
            </button>
          </div>
        ))}
      </div>

      <section className="card p-6">
        <p className="kicker mb-4">Evolução do modo — últimos 6 meses</p>
        <div className="space-y-3">
          {modeTimeline.map((m) => (
            <div key={m.month} className="flex items-center justify-between border-b border-line pb-3 last:border-0">
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
