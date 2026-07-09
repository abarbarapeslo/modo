import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SectionCard, StatBadge } from "./ui";
import { blindspots } from "../../data/mockData";

/**
 * Blindspot Radar — temas com alta relevância externa e baixa atenção interna.
 * A distância entre as duas linhas é o ponto cego.
 */
export default function BlindspotRadar() {
  const data = blindspots.map((b) => ({
    topic: b.topic,
    "Relevância externa": b.externalRelevance,
    "Atenção interna": b.internalAttention,
  }));

  const top = [...blindspots].sort((a, b) => b.blindspotScore - a.blindspotScore);

  return (
    <SectionCard
      kicker="Blindspot Radar"
      title="O que deveria estar no radar"
      metric={`Maior Blindspot Score: ${top[0].blindspotScore}`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="h-80 rounded-xl border border-line bg-white p-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="72%">
              <PolarGrid stroke="#EEEDE8" />
              <PolarAngleAxis
                dataKey="topic"
                tick={{ fontSize: 10, fill: "#57554E" }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Relevância externa"
                dataKey="Relevância externa"
                stroke="#C05B3C"
                fill="#C05B3C"
                fillOpacity={0.12}
                strokeWidth={1.6}
              />
              <Radar
                name="Atenção interna"
                dataKey="Atenção interna"
                stroke="#1E1D1A"
                fill="#1E1D1A"
                fillOpacity={0.08}
                strokeWidth={1.6}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2.5">
          {top.map((b) => (
            <div
              key={b.topic}
              className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3"
            >
              <div>
                <p className="text-xs font-semibold">{b.topic}</p>
                <p className="text-[10px] text-ink-mute">
                  externo {b.externalRelevance} · interno {b.internalAttention}
                </p>
              </div>
              <StatBadge tone={b.blindspotScore >= 65 ? "gap" : "attention"}>
                {b.blindspotScore}
              </StatBadge>
            </div>
          ))}
          <p className="pt-1 text-[11px] leading-relaxed text-ink-mute">
            Cruzamento de sinais externos, histórico da empresa, setor, localização,
            concorrentes, cadeia produtiva e dados macroeconômicos.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
