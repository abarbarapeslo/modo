import AlignmentMap from "../../components/dashboard/AlignmentMap";
import DecisionFlow from "../../components/dashboard/DecisionFlow";
import InternalMap from "../../components/dashboard/InternalMap";
import OpenLoopsMap from "../../components/dashboard/OpenLoopsMap";

export default function AlignmentPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <p className="kicker mb-3">Alignment</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          Onde o alinhamento se <span className="italic">rompe</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-ink-soft">
          Conexões entre áreas, fluxo de decisões e loops abertos sem dono.
        </p>
      </header>
      <AlignmentMap />
      <DecisionFlow />
      <div className="grid gap-8 xl:grid-cols-2">
        <InternalMap />
        <OpenLoopsMap />
      </div>
    </div>
  );
}
