import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { overviewMetrics } from "../../data/mockData";
import AttentionMap from "../../components/dashboard/AttentionMap";
import DecisionFlow from "../../components/dashboard/DecisionFlow";
import InfluenceMap from "../../components/dashboard/InfluenceMap";
import AlignmentMap from "../../components/dashboard/AlignmentMap";
import InternalMap from "../../components/dashboard/InternalMap";
import ResourceVsAttention from "../../components/dashboard/ResourceVsAttention";
import BlindspotRadar from "../../components/dashboard/BlindspotRadar";
import StrategicDriftMap from "../../components/dashboard/StrategicDriftMap";
import DecisionDNA from "../../components/dashboard/DecisionDNA";
import AttentionTimeline from "../../components/dashboard/AttentionTimeline";
import MeetingFingerprint from "../../components/dashboard/MeetingFingerprint";
import OpenLoopsMap from "../../components/dashboard/OpenLoopsMap";
import AttentionBudget from "../../components/dashboard/AttentionBudget";

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

function MetricCard({
  label,
  value,
  description,
  tone = "default",
}: {
  label: string;
  value: string;
  description: string;
  tone?: "default" | "attention" | "align" | "gap";
}) {
  const tones = {
    default: "border-line bg-white",
    attention: "border-attention bg-attention/30",
    align: "border-align-soft bg-align-soft/40",
    gap: "border-gap-soft bg-gap-soft/40",
  };
  return (
    <div className={`rounded-2xl border p-5 shadow-card ${tones[tone]}`}>
      <p className="kicker mb-2">{label}</p>
      <p className="metric-serif text-3xl">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}

export default function Overview() {
  const { can } = useUser();

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      <motion.header {...fade}>
        <p className="kicker mb-3">Cognitive Command Room</p>
        <h1 className="font-serif text-4xl font-light tracking-tight md:text-5xl">
          Como a empresa está <span className="italic">pensando</span>?
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
          A MODO compara atenção, esforço e realidade externa para revelar o modo
          operacional atual de {overviewMetrics.currentMode.toLowerCase()}.
        </p>
      </motion.header>

      <motion.div
        {...fade}
        transition={{ ...fade.transition, delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        <MetricCard
          label="Attention Gap"
          value={`${overviewMetrics.attentionGap}%`}
          description="Diferença entre atenção atual e oportunidades externas."
          tone="attention"
        />
        <MetricCard
          label="Decision Alignment"
          value={`${overviewMetrics.decisionAlignment}%`}
          description="Coerência entre prioridades C-level, OKRs e execução."
          tone="align"
        />
        <MetricCard
          label="Strategic Drift"
          value={`${overviewMetrics.strategicDrift}%`}
          description="Desvio entre estratégia declarada e decisões reais."
          tone="gap"
        />
        <MetricCard
          label="External Influence"
          value={`${overviewMetrics.externalInfluenceScore}/100`}
          description="Força dos sinais externos impactando decisões internas."
        />
        <div className="rounded-2xl border border-attention bg-attention/30 p-5 shadow-card sm:col-span-2 xl:col-span-1">
          <p className="kicker mb-2">Current Mode</p>
          <p className="font-serif text-lg italic leading-snug">{overviewMetrics.currentMode}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-soft">
            Modo atual detectado pela MODO.
          </p>
        </div>
      </motion.div>

      {can("view:global-maps") && (
        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="space-y-8">
          <AttentionMap />
          <DecisionFlow />
          <div className="grid gap-8 xl:grid-cols-2">
            <InfluenceMap />
            <AlignmentMap />
          </div>
          <InternalMap />
          <ResourceVsAttention />
          <div className="grid gap-8 xl:grid-cols-2">
            <BlindspotRadar />
            <StrategicDriftMap />
          </div>
          {can("view:decision-dna") && <DecisionDNA />}
          <AttentionTimeline />
          <div className="grid gap-8 xl:grid-cols-2">
            <MeetingFingerprint />
            <OpenLoopsMap />
          </div>
          <AttentionBudget />
        </motion.div>
      )}

      {!can("view:global-maps") && (
        <div className="rounded-2xl border border-line bg-surface p-8 text-center">
          <p className="font-serif text-xl">Visão limitada ao seu escopo</p>
          <p className="mt-2 text-sm text-ink-soft">
            Sua camada de permissão mostra insights da sua área. Alterne para
            Alterne para Executive ou Leadership no header para ver o mapa cognitivo completo (demo).
          </p>
        </div>
      )}
    </div>
  );
}
