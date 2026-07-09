import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SectionCard, StatBadge } from "./ui";
import {
  driftTimeline,
  declaredStrategy,
  driftDecisions,
  overviewMetrics,
} from "../../data/mockData";

/**
 * Strategic Drift Map — quando as decisões reais começam a se afastar
 * da estratégia declarada.
 */
export default function StrategicDriftMap() {
  return (
    <SectionCard
      kicker="Strategic Drift"
      title="Distância entre o dito e o feito"
      metric={`Strategic Drift: ${overviewMetrics.strategicDrift}%`}
    >
      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="kicker mb-1.5">Estratégia declarada</p>
          <p className="font-serif text-lg italic">“{declaredStrategy}”</p>
        </div>
        <div className="rounded-xl border border-line bg-white p-4">
          <p className="kicker mb-2">Decisões reais observadas</p>
          <div className="flex flex-wrap gap-1.5">
            {driftDecisions.map((d) => (
              <span
                key={d}
                className="rounded-full bg-gap-soft px-2.5 py-1 text-[11px] text-gap-ink"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-64 rounded-xl border border-line bg-white p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={driftTimeline} margin={{ top: 12, right: 16, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="driftFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8B83A" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#E8B83A" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8F8D83" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#8F8D83" }} axisLine={false} tickLine={false} unit="%" />
            <ReferenceLine y={10} stroke="#C05B3C" strokeDasharray="4 4" strokeWidth={1} label={{ value: "limiar de risco", fontSize: 10, fill: "#C05B3C", position: "insideTopRight" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E4E3DC",
                fontSize: 12,
                boxShadow: "0 8px 24px rgba(30,29,26,0.08)",
              }}
              formatter={(v: number) => [`${v}%`, "Drift"]}
              labelFormatter={(label) => {
                const p = driftTimeline.find((d) => d.month === label);
                return p?.event ? `${label} — ${p.event}` : label;
              }}
            />
            <Area
              type="monotone"
              dataKey="drift"
              stroke="#E8B83A"
              strokeWidth={2}
              fill="url(#driftFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <StatBadge tone="gap">Drift acima do limiar desde Abril</StatBadge>
        <p className="text-xs text-ink-mute">
          Eventos anotados aparecem no tooltip de cada mês.
        </p>
      </div>
    </SectionCard>
  );
}
