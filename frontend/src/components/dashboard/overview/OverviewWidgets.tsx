import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MiniBar } from "../ui";
import { overviewMetrics, blindspots, externalEvents } from "../../../data/mockData";

const ease = [0.22, 1, 0.36, 1] as const;

export function OverviewHero({
  action,
}: {
  action?: ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"
    >
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <p className="kicker">Cognitive Command Room</p>
          <span className="flex items-center gap-1.5 rounded-full bg-attention px-2.5 py-0.5 text-[10px] font-medium">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
            Twin live
          </span>
        </div>
        <h1 className="font-serif text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
          Como a empresa está <span className="italic text-ink-soft">pensando</span>?
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
          Visão consolidada de atenção, esforço e realidade — a MODO revela o modo
          operacional sem tomar decisões por você.
        </p>
      </div>

      <div className="space-y-4">
        <ModeSpotlight />
        {action}
      </div>
    </motion.header>
  );
}

export function ModeSpotlight() {
  return (
    <div className="rounded-xl border border-attention bg-gradient-to-br from-attention/80 to-attention/30 p-5 shadow-card">
      <p className="kicker mb-2">Current Mode</p>
      <p className="font-serif text-xl font-medium italic leading-snug tracking-tight">
        {overviewMetrics.currentMode}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Detectado a partir de reuniões, OKRs, decisões e sinais externos das últimas
        4 semanas.
      </p>
    </div>
  );
}

type MetricTone = "attention" | "align" | "gap" | "info";

const METRIC_STYLES: Record<
  MetricTone,
  { border: string; bg: string; bar: string; value: string }
> = {
  attention: {
    border: "border-attention",
    bg: "bg-attention/25",
    bar: "#E8B83A",
    value: "text-ink",
  },
  align: {
    border: "border-align-soft",
    bg: "bg-align-soft/30",
    bar: "#5C8266",
    value: "text-align-ink",
  },
  gap: {
    border: "border-gap-soft",
    bg: "bg-gap-soft/35",
    bar: "#C05B3C",
    value: "text-gap-ink",
  },
  info: {
    border: "border-line",
    bg: "bg-white",
    bar: "#5D7F9C",
    value: "text-info-ink",
  },
};

export function OverviewMetrics() {
  const items = [
    {
      label: "Attention Gap",
      value: `${overviewMetrics.attentionGap}%`,
      numeric: overviewMetrics.attentionGap,
      hint: "Acima do intervalo saudável",
      tone: "attention" as MetricTone,
    },
    {
      label: "Decision Alignment",
      value: `${overviewMetrics.decisionAlignment}%`,
      numeric: overviewMetrics.decisionAlignment,
      hint: "C-level → execução",
      tone: "align" as MetricTone,
    },
    {
      label: "Strategic Drift",
      value: `${overviewMetrics.strategicDrift}%`,
      numeric: overviewMetrics.strategicDrift,
      hint: "Intenção vs. ação real",
      tone: "gap" as MetricTone,
    },
    {
      label: "External Influence",
      value: `${overviewMetrics.externalInfluenceScore}`,
      numeric: overviewMetrics.externalInfluenceScore,
      hint: "Score composto / 100",
      tone: "info" as MetricTone,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06, ease }}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {items.map((m) => {
        const s = METRIC_STYLES[m.tone];
        return (
          <div
            key={m.label}
            className={`rounded-xl border p-5 shadow-card ${s.border} ${s.bg}`}
          >
            <p className="kicker mb-2">{m.label}</p>
            <p className={`metric-serif text-3xl ${s.value}`}>{m.value}</p>
            <div className="mt-3">
              <MiniBar value={m.numeric} color={s.bar} />
            </div>
            <p className="mt-2 text-[11px] text-ink-mute">{m.hint}</p>
          </div>
        );
      })}
    </motion.div>
  );
}

export function AERDimensions() {
  const dims = [
    {
      key: "Attention",
      value: 100 - overviewMetrics.attentionGap,
      sub: "Para onde a liderança olha",
      to: "/dashboard/attention",
      color: "#E8B83A",
      track: "#F4E9C8",
    },
    {
      key: "Effort",
      value: overviewMetrics.decisionAlignment,
      sub: "Onde a organização age de fato",
      to: "/dashboard/alignment",
      color: "#5C8266",
      track: "#DFEADD",
    },
    {
      key: "Reality",
      value: overviewMetrics.externalInfluenceScore,
      sub: "O que o ambiente externo exige",
      to: "/dashboard/influence",
      color: "#5D7F9C",
      track: "#DCE7F0",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease }}
      className="grid divide-y divide-line overflow-hidden rounded-xl border border-line bg-white md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      {dims.map((d) => (
        <Link
          key={d.key}
          to={d.to}
          className="group px-6 py-5 transition-colors hover:bg-surface/60"
        >
          <p className="font-serif text-lg font-medium tracking-tight">{d.key}</p>
          <p className="mt-0.5 text-[11px] text-ink-mute">{d.sub}</p>
          <p className="metric-serif mt-3 text-2xl">{d.value}%</p>
          <div className="mt-2 h-1.5 w-full rounded-full" style={{ backgroundColor: d.track }}>
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ width: `${d.value}%`, backgroundColor: d.color }}
            />
          </div>
          <span className="mt-3 inline-block text-[11px] font-medium text-ink-mute group-hover:text-attention-strong">
            Explorar →
          </span>
        </Link>
      ))}
    </motion.div>
  );
}

export function OverviewSignals() {
  const topBlindspots = [...blindspots]
    .sort((a, b) => b.blindspotScore - a.blindspotScore)
    .slice(0, 3);
  const topEvents = [...externalEvents]
    .sort((a, b) => b.impactScore - a.impactScore)
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.14, ease }}
      className="grid gap-4 lg:grid-cols-2"
    >
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-line bg-surface/40 px-5 py-3">
          <div>
            <p className="kicker">Blindspots críticos</p>
            <p className="text-xs text-ink-soft">Alta relevância externa · baixa atenção interna</p>
          </div>
          <Link to="/dashboard/influence" className="text-[11px] font-medium text-ink-mute hover:text-ink">
            Ver todos →
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {topBlindspots.map((b) => (
            <li key={b.topic} className="flex items-center gap-4 px-5 py-4">
              <span className="metric-serif w-10 shrink-0 text-lg text-gap-ink">
                {b.blindspotScore}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{b.topic}</p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-ink-mute">Externo</p>
                    <MiniBar value={b.externalRelevance} color="#C05B3C" />
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-mute">Interno</p>
                    <MiniBar value={b.internalAttention} color="#E8B83A" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-line bg-surface/40 px-5 py-3">
          <div>
            <p className="kicker">Sinais externos</p>
            <p className="text-xs text-ink-soft">Eventos que moldam decisões agora</p>
          </div>
          <Link to="/dashboard/influence" className="text-[11px] font-medium text-ink-mute hover:text-ink">
            Influence Map →
          </Link>
        </div>
        <ul className="divide-y divide-line">
          {topEvents.map((ev) => (
            <li key={ev.id} className="px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-mute">
                    {ev.sector}
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug">{ev.title}</p>
                  <p className="mt-1 text-[11px] text-ink-mute">{ev.location}</p>
                </div>
                <span
                  className={`shrink-0 text-sm font-semibold ${
                    ev.impactScore >= 85 ? "text-gap-ink" : "text-ink"
                  }`}
                >
                  {ev.impactScore}
                </span>
              </div>
              <MiniBar
                value={ev.impactScore}
                color={ev.impactScore >= 85 ? "#C05B3C" : "#E8B83A"}
              />
            </li>
          ))}
        </ul>
        <div className="border-t border-line bg-surface/30 px-5 py-3">
          <Link
            to="/dashboard/market-map"
            className="text-[11px] font-medium text-ink-soft hover:text-ink"
          >
            Comparar com Market Map →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function OverviewModuleGrid({
  modules,
}: {
  modules: { to: string; label: string; description: string; tag?: string }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m, i) => (
        <motion.div
          key={m.to}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 + i * 0.04, ease }}
        >
          <Link
            to={m.to}
            className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 transition-all hover:border-attention hover:shadow-float"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-serif text-lg font-medium">{m.label}</span>
              {m.tag && (
                <span className="rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-ink-mute">
                  {m.tag}
                </span>
              )}
            </div>
            <p className="flex-1 text-xs leading-relaxed text-ink-soft">{m.description}</p>
            <span className="mt-4 text-[11px] font-medium text-ink-mute group-hover:text-attention-strong">
              Abrir →
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
