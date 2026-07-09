import InfluenceMap from "../../components/dashboard/InfluenceMap";
import BlindspotRadar from "../../components/dashboard/BlindspotRadar";
import AttentionMap from "../../components/dashboard/AttentionMap";
import { PageHero } from "../../components/dashboard/platform/PlatformLayout";

export default function InfluencePage() {
  return (
    <div className="space-y-8">
      <PageHero
        kicker="Influence · External Layer"
        title={
          <>
            O que o mundo está <span className="italic">mudando</span>
          </>
        }
        description="Sinais externos, setores monitorados e pontos cegos entre realidade e atenção interna."
      />
      <InfluenceMap />
      <div className="grid gap-6 xl:grid-cols-2">
        <AttentionMap />
        <BlindspotRadar />
      </div>
    </div>
  );
}
