import { heatColor } from "../../data/marketMapMockData";

export default function MarketLegend() {
  const items = [
    { label: "Baixa atividade", color: "#8FAFC4" },
    { label: "Moderada", color: "#EFD37A" },
    { label: "Alta atividade", color: "#E8B83A" },
    { label: "Crítica", color: "#D4915A" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 text-[10px] text-ink-mute">
      <span className="kicker">Heat intensity</span>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function heatRadius(score: number): number {
  return 6 + (score / 100) * 14;
}

export { heatColor };
