import type { ReactNode } from "react";

export function SectionCard({
  kicker,
  title,
  metric,
  children,
  className = "",
}: {
  kicker: string;
  title: string;
  metric?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`card p-6 ${className}`}>
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="kicker mb-1">{kicker}</p>
          <h3 className="font-serif text-xl font-medium tracking-tight">{title}</h3>
        </div>
        {metric && (
          <span className="rounded-full bg-surface px-3 py-1 text-[11px] font-medium text-ink-soft">
            {metric}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}

export function StatBadge({
  tone,
  children,
}: {
  tone: "attention" | "info" | "align" | "gap" | "mute";
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    attention: "bg-attention text-ink",
    info: "bg-info-soft text-info-ink",
    align: "bg-align-soft text-align-ink",
    gap: "bg-gap-soft text-gap-ink",
    mute: "bg-surface text-ink-mute",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function MiniBar({
  value,
  color = "#E8B83A",
  track = "#EEEDE8",
}: {
  value: number;
  color?: string;
  track?: string;
}) {
  return (
    <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: track }}>
      <div
        className="h-1.5 rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function heatColor(value: number): string {
  // 0 → mist, 100 → strong attention yellow shifting to soft orange at extremes
  if (value >= 85) return "#E8B83A";
  if (value >= 70) return "#EFD37A";
  if (value >= 55) return "#F4E9C8";
  if (value >= 40) return "#EEEDE8";
  return "#F6F5F1";
}

export function influenceColor(score: number): string {
  if (score >= 85) return "#C05B3C"; // crítica
  if (score >= 65) return "#E8B83A"; // moderada-alta
  if (score >= 45) return "#EFD37A"; // moderada
  return "#5D7F9C"; // baixa (azul suave)
}
