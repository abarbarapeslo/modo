import AttentionMap from "../../components/dashboard/AttentionMap";
import AttentionTimeline from "../../components/dashboard/AttentionTimeline";
import AttentionBudget from "../../components/dashboard/AttentionBudget";
import MeetingFingerprint from "../../components/dashboard/MeetingFingerprint";
import ResourceVsAttention from "../../components/dashboard/ResourceVsAttention";

export default function AttentionPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="kicker mb-3">Attention</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          O que a empresa <span className="italic">percebe</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Mapas de atenção, orçamento cognitivo e fingerprints de reuniões —
          onde a organização realmente olha.
        </p>
      </header>
      <AttentionMap />
      <div className="grid gap-8 xl:grid-cols-2">
        <AttentionTimeline />
        <AttentionBudget />
      </div>
      <ResourceVsAttention />
      <MeetingFingerprint />
    </div>
  );
}
