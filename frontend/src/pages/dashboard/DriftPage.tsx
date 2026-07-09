import StrategicDriftMap from "../../components/dashboard/StrategicDriftMap";
import DecisionDNA from "../../components/dashboard/DecisionDNA";
import AttentionTimeline from "../../components/dashboard/AttentionTimeline";
import ResourceVsAttention from "../../components/dashboard/ResourceVsAttention";
import { PageHero } from "../../components/dashboard/platform/PlatformLayout";

export default function DriftPage() {
  return (
    <div className="space-y-8">
      <PageHero
        kicker="Drift · Signal Layer"
        title={
          <>
            Quando a estratégia <span className="italic">desvia</span>
          </>
        }
        description="Drift estratégico, DNA de decisão e mudanças de modo ao longo do tempo."
      />
      <StrategicDriftMap />
      <div className="grid gap-6 xl:grid-cols-2">
        <DecisionDNA />
        <AttentionTimeline />
      </div>
      <ResourceVsAttention />
    </div>
  );
}
