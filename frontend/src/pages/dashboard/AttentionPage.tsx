import AttentionMap from "../../components/dashboard/AttentionMap";
import AttentionTimeline from "../../components/dashboard/AttentionTimeline";
import AttentionBudget from "../../components/dashboard/AttentionBudget";
import MeetingFingerprint from "../../components/dashboard/MeetingFingerprint";
import ResourceVsAttention from "../../components/dashboard/ResourceVsAttention";
import { PageHero } from "../../components/dashboard/platform/PlatformLayout";

export default function AttentionPage() {
  return (
    <div className="space-y-8">
      <PageHero
        kicker="Attention · Map Layer"
        title={
          <>
            O que a empresa <span className="italic">percebe</span>
          </>
        }
        description="Mapas de atenção, orçamento cognitivo e fingerprints de reuniões — onde a organização realmente olha."
      />
      <AttentionMap />
      <div className="grid gap-6 xl:grid-cols-2">
        <AttentionTimeline />
        <AttentionBudget />
      </div>
      <ResourceVsAttention />
      <MeetingFingerprint />
    </div>
  );
}
