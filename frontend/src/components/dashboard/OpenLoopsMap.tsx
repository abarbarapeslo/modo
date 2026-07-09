import { SectionCard, StatBadge } from "./ui";
import { openLoops, openLoopIndex } from "../../data/mockData";

/**
 * Open Loops Map — temas recorrentes que nunca viram ação:
 * muitas menções, nenhum dono, nenhum orçamento.
 */
export default function OpenLoopsMap() {
  return (
    <SectionCard
      kicker="Open Loops"
      title="O que a empresa repete mas não resolve"
      metric={`Open Loop Index: ${openLoopIndex}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[10px] uppercase tracking-wider2 text-ink-mute">
              <th className="pb-3 pr-4 font-medium">Tema</th>
              <th className="pb-3 pr-4 font-medium">Menções</th>
              <th className="pb-3 pr-4 font-medium">Owner</th>
              <th className="pb-3 pr-4 font-medium">Budget</th>
              <th className="pb-3 pr-4 font-medium">Impacto</th>
              <th className="pb-3 font-medium">Recomendação</th>
            </tr>
          </thead>
          <tbody>
            {openLoops.map((loop) => (
              <tr key={loop.topic} className="border-b border-line/60 last:border-0">
                <td className="py-3.5 pr-4 font-medium">{loop.topic}</td>
                <td className="py-3.5 pr-4">
                  <span className="font-serif text-lg font-light">{loop.mentions}</span>
                  <span className="text-[10px] text-ink-mute">×</span>
                </td>
                <td className="py-3.5 pr-4">
                  {loop.owner ?? (
                    <StatBadge tone="gap">nenhum</StatBadge>
                  )}
                </td>
                <td className="py-3.5 pr-4 text-ink-soft">
                  {loop.budget ?? <span className="text-ink-mute">—</span>}
                </td>
                <td className="py-3.5 pr-4">
                  <StatBadge tone={loop.impact === "high" ? "gap" : loop.impact === "medium" ? "attention" : "mute"}>
                    {loop.impact}
                  </StatBadge>
                </td>
                <td className="py-3.5 text-xs text-ink-soft">{loop.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
