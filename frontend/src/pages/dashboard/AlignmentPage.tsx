import AlignmentMap from "../../components/dashboard/AlignmentMap";
import DecisionFlow from "../../components/dashboard/DecisionFlow";
import InternalMap from "../../components/dashboard/InternalMap";
import OpenLoopsMap from "../../components/dashboard/OpenLoopsMap";
import { PageHero } from "../../components/dashboard/platform/PlatformLayout";

export default function AlignmentPage() {
  return (
    <div className="space-y-8">
      <PageHero
        kicker="Alignment · Org Layer"
        title={
          <>
            Onde o alinhamento se <span className="italic">rompe</span>
          </>
        }
        description="Conexões entre áreas, fluxo de decisões e loops abertos sem dono."
      />
      <AlignmentMap />
      <DecisionFlow />
      <div className="grid gap-6 xl:grid-cols-2">
        <InternalMap />
        <OpenLoopsMap />
      </div>
    </div>
  );
}
