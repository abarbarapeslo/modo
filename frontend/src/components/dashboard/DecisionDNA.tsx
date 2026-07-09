import { SectionCard, MiniBar } from "./ui";
import { decisionDNA, decisionDNAInsight } from "../../data/mockData";

const TRAITS: { key: keyof typeof decisionDNA; label: string; pair: [string, string] }[] = [
  { key: "reactive", label: "Reactive", pair: ["Preditiva", "Reativa"] },
  { key: "dataLed", label: "Data-led", pair: ["Intuição", "Dados"] },
  { key: "founderLed", label: "Founder-led", pair: ["Descentralizada", "Fundador"] },
  { key: "customerLed", label: "Customer-led", pair: ["Interna", "Cliente"] },
  { key: "riskAware", label: "Risk-aware", pair: ["Tolerante a risco", "Orientada a risco"] },
  { key: "longTerm", label: "Long-term", pair: ["Curto prazo", "Longo prazo"] },
];

/**
 * Decision DNA — o perfil cognitivo da empresa: como ela tende a decidir.
 */
export default function DecisionDNA() {
  return (
    <SectionCard kicker="Decision DNA" title="Como a empresa decide">
      <div className="space-y-5">
        {TRAITS.map((t) => {
          const value = decisionDNA[t.key];
          return (
            <div key={t.key}>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-xs font-semibold">{t.label}</span>
                <span className="font-serif text-lg font-light">{value}</span>
              </div>
              <MiniBar
                value={value}
                color={value >= 60 ? "#E8B83A" : value >= 35 ? "#57554E" : "#C9C7BE"}
              />
              <div className="mt-1 flex justify-between text-[10px] text-ink-mute">
                <span>{t.pair[0]}</span>
                <span>{t.pair[1]}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 rounded-xl bg-attention px-4 py-3 text-xs leading-relaxed text-ink">
        <span className="font-semibold">Insight: </span>
        {decisionDNAInsight}
      </p>
    </SectionCard>
  );
}
