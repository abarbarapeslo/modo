import StrategicDriftMap from "../../components/dashboard/StrategicDriftMap";
import DecisionDNA from "../../components/dashboard/DecisionDNA";
import AttentionTimeline from "../../components/dashboard/AttentionTimeline";
import ResourceVsAttention from "../../components/dashboard/ResourceVsAttention";

export default function DriftPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="kicker mb-3">Drift</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          Quando a estratégia <span className="italic">desvia</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Drift estratégico, DNA de decisão e mudanças de modo ao longo do tempo.
        </p>
      </header>
      <StrategicDriftMap />
      <div className="grid gap-8 xl:grid-cols-2">
        <DecisionDNA />
        <AttentionTimeline />
      </div>
      <ResourceVsAttention />
    </div>
  );
}
