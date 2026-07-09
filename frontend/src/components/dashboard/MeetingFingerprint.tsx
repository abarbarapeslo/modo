import { SectionCard, MiniBar, StatBadge } from "./ui";
import { meetingFingerprint } from "../../data/mockData";

/**
 * Meeting Fingerprint — cada reunião como um artefato cognitivo:
 * onde a atenção foi gasta, o que foi decidido, o que ficou em aberto.
 */
export default function MeetingFingerprint() {
  const fp = meetingFingerprint;

  return (
    <SectionCard
      kicker="Meeting Fingerprint"
      title={fp.meeting}
      metric={fp.date}
    >
      <div className="mb-6 grid grid-cols-3 gap-3">
        <Stat label="Decisions made" value={fp.decisionsMade} />
        <Stat label="Open loops" value={fp.openLoops} warn />
        <Stat label="OKR alignment" value={`${fp.okrAlignment}%`} />
      </div>

      <p className="kicker mb-3">Attention distribution</p>
      <div className="space-y-2.5">
        {fp.attentionDistribution.map((a) => (
          <div key={a.topic} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs text-ink-soft">{a.topic}</span>
            <MiniBar
              value={a.pct}
              color={a.pct === 0 ? "#C05B3C" : a.pct >= 25 ? "#E8B83A" : "#57554E"}
            />
            <span className={`w-10 text-right text-xs font-medium ${a.pct === 0 ? "text-gap-ink" : ""}`}>
              {a.pct}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="kicker mb-2">External references</p>
        <div className="flex flex-wrap gap-1.5">
          {fp.externalReferences.map((r) => (
            <StatBadge key={r} tone="info">
              {r}
            </StatBadge>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function Stat({ label, value, warn }: { label: string; value: number | string; warn?: boolean }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3 text-center">
      <p className={`font-serif text-2xl font-light ${warn ? "text-gap-ink" : ""}`}>{value}</p>
      <p className="mt-0.5 text-[10px] text-ink-mute">{label}</p>
    </div>
  );
}
