import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SectionCard } from "./ui";
import { attentionBudget } from "../../data/mockData";

/**
 * Attention Budget — a atenção da liderança tratada como orçamento cognitivo:
 * alocação real do trimestre versus alocação recomendada pela MODO.
 */
export default function AttentionBudget() {
  const data = attentionBudget.filter((b) => b.actual > 0 || b.recommended > 0);

  return (
    <SectionCard
      kicker="Attention Budget"
      title="Para onde foi a atenção da liderança"
      metric="Este trimestre"
    >
      <div className="h-96 rounded-xl border border-line bg-white p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 40, bottom: 0 }} barGap={2}>
            <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: "#8F8D83" }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="topic"
              width={100}
              tick={{ fontSize: 11, fill: "#57554E" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "#F6F5F1" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E4E3DC",
                fontSize: 12,
                boxShadow: "0 8px 24px rgba(30,29,26,0.08)",
              }}
              formatter={(v: number) => `${v}%`}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar name="Alocação real" dataKey="actual" fill="#1E1D1A" radius={[0, 4, 4, 0]} barSize={9} />
            <Bar name="Recomendado pela MODO" dataKey="recommended" fill="#E8B83A" radius={[0, 4, 4, 0]} barSize={9} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Leitura da MODO: </span>
        Credit conditions e supply chain têm recomendação relevante e alocação real
        próxima de zero — os dois maiores deslocamentos entre atenção e realidade.
      </p>
    </SectionCard>
  );
}
