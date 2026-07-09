import { SectionCard } from "./ui";
import {
  modeTimeline,
  modeShiftScore,
  modeTimelineInsight,
} from "../../data/mockData";

/**
 * Attention Timeline — como o modo da empresa muda mês a mês.
 */
export default function AttentionTimeline() {
  return (
    <SectionCard
      kicker="Attention Timeline"
      title="Como o modo muda no tempo"
      metric={`Mode Shift Score: ${modeShiftScore}`}
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-[9px] h-px bg-line" />
        <div className="grid grid-cols-3 gap-y-8 md:grid-cols-6">
          {modeTimeline.map((m, i) => {
            const current = i === modeTimeline.length - 1;
            return (
              <div key={m.month} className="relative flex flex-col items-start pr-4">
                <span
                  className={`relative z-10 h-[18px] w-[18px] rounded-full border-4 border-paper ${
                    current ? "bg-attention-strong" : "bg-ink-mute"
                  }`}
                />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider2 text-ink-mute">
                  {m.month}
                </p>
                <p className={`mt-1 text-sm leading-snug ${current ? "font-semibold" : "text-ink-soft"}`}>
                  {m.mode}
                </p>
                <div className="mt-2 h-1 w-full max-w-[80px] rounded-full bg-mist">
                  <div
                    className={`h-1 rounded-full ${current ? "bg-attention-strong" : "bg-ink-mute/60"}`}
                    style={{ width: `${m.intensity}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-8 rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Insight: </span>
        {modeTimelineInsight}
      </p>
    </SectionCard>
  );
}
