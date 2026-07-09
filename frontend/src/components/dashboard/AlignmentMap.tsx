import { useState } from "react";
import { SectionCard } from "./ui";
import {
  departments,
  alignmentEdges,
  crossFunctionalAlignmentScore,
  type AlignmentLevel,
} from "../../data/mockData";

const LEVEL_STYLE: Record<AlignmentLevel, { stroke: string; width: number; dash?: string; label: string }> = {
  high: { stroke: "#5C8266", width: 2.5, label: "Alto alinhamento" },
  medium: { stroke: "#E8B83A", width: 1.8, label: "Médio alinhamento" },
  low: { stroke: "#C05B3C", width: 1.4, label: "Baixo alinhamento" },
  none: { stroke: "#C9C7BE", width: 1, dash: "3 4", label: "Pouca evidência" },
};

const W = 640;
const H = 420;

// 3×3 grid of department zones
function zonePosition(index: number): { x: number; y: number } {
  const col = index % 3;
  const row = Math.floor(index / 3);
  return { x: 60 + col * 200, y: 46 + row * 130 };
}

/**
 * Alignment Map — áreas da empresa como zonas; linhas mostram o nível de
 * alinhamento entre elas com base em decisões conectadas.
 */
export default function AlignmentMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  const centers = new Map(
    departments.map((d, i) => {
      const { x, y } = zonePosition(i);
      return [d, { cx: x + 60, cy: y + 34 }];
    })
  );

  const isDimmed = (edge: (typeof alignmentEdges)[number]) =>
    hovered !== null && edge.from !== hovered && edge.to !== hovered;

  return (
    <SectionCard
      kicker="Alignment Map"
      title="Onde o alinhamento se rompe"
      metric={`Cross-Functional Alignment: ${crossFunctionalAlignmentScore}%`}
    >
      <div className="rounded-xl border border-line bg-white p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* edges */}
          {alignmentEdges.map((e) => {
            const a = centers.get(e.from)!;
            const b = centers.get(e.to)!;
            const s = LEVEL_STYLE[e.level];
            const mx = (a.cx + b.cx) / 2;
            const my = (a.cy + b.cy) / 2 - 24;
            return (
              <path
                key={`${e.from}-${e.to}`}
                d={`M ${a.cx} ${a.cy} Q ${mx} ${my} ${b.cx} ${b.cy}`}
                fill="none"
                stroke={s.stroke}
                strokeWidth={s.width}
                strokeDasharray={s.dash}
                opacity={isDimmed(e) ? 0.12 : 0.75}
                className="transition-opacity"
              />
            );
          })}

          {/* zones */}
          {departments.map((d, i) => {
            const { x, y } = zonePosition(i);
            const active = hovered === d;
            const connections = alignmentEdges.filter(
              (e) => e.from === d || e.to === d
            );
            const shared = connections.reduce((s, e) => s + e.sharedDecisions, 0);
            return (
              <g
                key={d}
                onMouseEnter={() => setHovered(d)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                <rect
                  x={x}
                  y={y}
                  width={120}
                  height={68}
                  rx={14}
                  fill={active ? "#F4E9C8" : "#F6F5F1"}
                  stroke={active ? "#E8B83A" : "#E4E3DC"}
                  strokeWidth={1.2}
                  className="transition-colors"
                />
                <text x={x + 60} y={y + 32} textAnchor="middle" fontSize="13" fontWeight="600" fill="#1E1D1A">
                  {d}
                </text>
                <text x={x + 60} y={y + 50} textAnchor="middle" fontSize="9" fill="#8F8D83">
                  {shared} decisões conectadas
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {Object.values(LEVEL_STYLE).map((s) => (
          <span key={s.label} className="flex items-center gap-2 text-[11px] text-ink-soft">
            <span
              className="inline-block h-0.5 w-6 rounded-full"
              style={{ backgroundColor: s.stroke, opacity: 0.85 }}
            />
            {s.label}
          </span>
        ))}
      </div>

      <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Leitura da MODO: </span>
        Sales e Product possuem muitas decisões conectadas — linha forte. Marketing e
        Finance seguem desalinhados. Legal quase nunca aparece em decisões de Product.
      </p>
    </SectionCard>
  );
}
