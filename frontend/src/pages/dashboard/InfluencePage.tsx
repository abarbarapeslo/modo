import InfluenceMap from "../../components/dashboard/InfluenceMap";
import BlindspotRadar from "../../components/dashboard/BlindspotRadar";
import AttentionMap from "../../components/dashboard/AttentionMap";

export default function InfluencePage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="kicker mb-3">Influence</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          O que o mundo está <span className="italic">mudando</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Sinais externos, setores monitorados e pontos cegos entre realidade
          e atenção interna.
        </p>
      </header>
      <InfluenceMap />
      <div className="grid gap-8 xl:grid-cols-2">
        <AttentionMap />
        <BlindspotRadar />
      </div>
    </div>
  );
}
