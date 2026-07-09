import { useMemo } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ hero field */

export function HeroCognitiveField({ className = "" }: { className?: string }) {
  const { nodes, links } = useMemo(() => {
    let seed = 11;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const nodes = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: 8 + rand() * 84,
      y: 10 + rand() * 80,
      r: 1.2 + rand() * 2.8,
      hot: rand() > 0.88,
    }));
    const links: { x1: number; y1: number; x2: number; y2: number; o: number }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 14 && rand() > 0.55) {
          links.push({
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            o: 0.08 + (1 - d / 14) * 0.22,
          });
        }
      }
    }
    return { nodes, links };
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="hero-glow" cx="65%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#E8B83A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FDFCF9" stopOpacity="0" />
        </radialGradient>
        <filter id="hero-blur">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <rect width="100" height="100" fill="url(#hero-glow)" />
      {links.map((l, i) => (
        <motion.line
          key={`l${i}`}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#1E1D1A"
          strokeWidth="0.15"
          initial={{ opacity: 0 }}
          animate={{ opacity: l.o }}
          transition={{ duration: 1.2, delay: i * 0.008 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r={n.r / 3}
          fill={n.hot ? "#E8B83A" : "#1E1D1A"}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: n.hot ? 0.95 : 0.25 + (n.r / 4) * 0.35,
            scale: 1,
          }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.02 }}
        />
      ))}
      {nodes.filter((n) => n.hot).map((n, i) => (
        <motion.circle
          key={`h${i}`}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="#E8B83A"
          filter="url(#hero-blur)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------- twin interface */

export function TwinInterfaceMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-white shadow-float">
      <div className="flex items-center gap-2 border-b border-line bg-surface/80 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-attention-strong" />
        <span className="text-[11px] font-medium uppercase tracking-wider2 text-ink-mute">
          Cognitive Digital Twin
        </span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-attention px-2.5 py-0.5 text-[10px] font-medium">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
          Live
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-b border-line p-5 lg:border-b-0 lg:border-r">
          <p className="kicker mb-3">Attention topology</p>
          <svg viewBox="0 0 320 200" className="w-full" aria-hidden>
            <defs>
              <linearGradient id="topo-a" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DCE7F0" />
                <stop offset="100%" stopColor="#F4E9C8" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3, 4, 5, 6].map((col) => {
                const v = Math.sin(col * 0.9 + row * 0.7) * 0.5 + 0.5;
                const size = 8 + v * 14;
                const hot = v > 0.72;
                return (
                  <motion.circle
                    key={`${row}-${col}`}
                    cx={28 + col * 44}
                    cy={24 + row * 30}
                    r={size / 2}
                    fill={hot ? "#E8B83A" : "#EEEDE8"}
                    stroke={hot ? "#1E1D1A" : "#E4E3DC"}
                    strokeWidth="0.5"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: hot ? 0.95 : 0.55, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (row * 7 + col) * 0.02, duration: 0.35 }}
                  />
                );
              })
            )}
            <motion.path
              d="M 40 160 Q 120 120, 200 140 T 280 90"
              fill="none"
              stroke="#5D7F9C"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4 }}
            />
          </svg>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="kicker mb-1">Attention Gap</p>
            <p className="metric-serif text-3xl text-gap-ink">23%</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-mist">
              <motion.div
                className="h-full rounded-full bg-gap-ink"
                initial={{ width: 0 }}
                whileInView={{ width: "23%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface p-3">
            <p className="kicker mb-2">Current Mode</p>
            <p className="font-serif text-sm italic leading-snug">
              Expansion with operational stress
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Reactive 71", "Founder-led 66", "Data-led 42"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-white px-2.5 py-1 text-[10px] text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- attention globe */

export function AttentionGlobe({ className = "" }: { className?: string }) {
  const points = useMemo(() => {
    const pts: { x: number; y: number; s: number; c: string }[] = [];
    let seed = 23;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 32; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = rand() * Math.PI;
      const x = 50 + Math.sin(phi) * Math.cos(theta) * 38;
      const y = 50 + Math.sin(phi) * Math.sin(theta) * 22 + Math.cos(phi) * 18;
      const score = rand();
      pts.push({
        x,
        y,
        s: 2 + score * 4,
        c: score > 0.75 ? "#E8B83A" : score > 0.45 ? "#5D7F9C" : "#8F8D83",
      });
    }
    return pts;
  }, []);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <radialGradient id="globe-fill" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#F6F5F1" />
          <stop offset="100%" stopColor="#EEEDE8" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="52" rx="42" ry="28" fill="url(#globe-fill)" stroke="#E4E3DC" strokeWidth="0.5" />
      {[20, 35, 50, 65, 80].map((x) => (
        <ellipse
          key={x}
          cx="50"
          cy="52"
          rx={Math.abs(x - 50) * 0.85}
          ry="28"
          fill="none"
          stroke="#E4E3DC"
          strokeWidth="0.3"
          opacity="0.7"
        />
      ))}
      <ellipse cx="50" cy="52" rx="42" ry="28" fill="none" stroke="#E4E3DC" strokeWidth="0.3" />
      {[38, 52, 66].map((y) => (
        <line key={y} x1="8" y1={y} x2="92" y2={y} stroke="#E4E3DC" strokeWidth="0.25" opacity="0.5" />
      ))}
      {points.map((p, i) => (
        <motion.g key={i}>
          <circle cx={p.x} cy={p.y} r={p.s * 1.8} fill={p.c} opacity="0.15" />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={p.s / 3}
            fill={p.c}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

/* --------------------------------------------------------- decision flow viz */

export function DecisionFlowViz() {
  const layers = [
    { label: "C-level priorities", status: "aligned" },
    { label: "Company OKRs", status: "partial" },
    { label: "Department OKRs", status: "partial" },
    { label: "Team decisions", status: "misaligned" },
    { label: "Execution", status: "no-evidence" },
  ];
  const colors: Record<string, string> = {
    aligned: "#5C8266",
    partial: "#E8B83A",
    misaligned: "#C05B3C",
    "no-evidence": "#8F8D83",
  };

  return (
    <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl border border-line bg-white p-6">
      <div className="absolute inset-0 opacity-40">
        <svg viewBox="0 0 400 320" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          {layers.map((_, i) =>
            i < layers.length - 1 ? (
              <motion.line
                key={i}
                x1="200"
                y1={48 + i * 56}
                x2="200"
                y2={48 + (i + 1) * 56}
                stroke="#E4E3DC"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              />
            ) : null
          )}
        </svg>
      </div>
      <div className="relative space-y-4">
        {layers.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="mx-auto flex max-w-xs items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 shadow-card"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: colors[layer.status] }}
            />
            <span className="text-xs font-medium">{layer.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- platform stack */

export function PlatformStackVisual() {
  const layers = [
    { label: "Reimagine", sub: "Simulação de cenários", tone: "attention" },
    { label: "Maps", sub: "Attention · Influence · Alignment", tone: "info" },
    { label: "Digital Twin", sub: "Modelo cognitivo vivo", tone: "ink" },
    { label: "Integrações", sub: "Reuniões · OKRs · CRM · ERP", tone: "surface" },
  ];

  return (
    <div className="relative flex h-full min-h-[360px] flex-col justify-end gap-2 p-2">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-xl border border-line px-6 py-5 ${
            layer.tone === "attention"
              ? "bg-attention"
              : layer.tone === "info"
                ? "bg-info-soft"
                : layer.tone === "ink"
                  ? "bg-ink text-paper"
                  : "bg-surface"
          }`}
          style={{ marginLeft: `${i * 12}px`, marginRight: `${(layers.length - 1 - i) * 12}px` }}
        >
          <p className="font-serif text-lg font-medium">{layer.label}</p>
          <p
            className={`mt-1 text-xs ${
              layer.tone === "ink" ? "text-paper/70" : "text-ink-soft"
            }`}
          >
            {layer.sub}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------- signal waveform */

export function SignalWaveform({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "#FDFCF9" : "#1E1D1A";
  const muted = dark ? "rgba(253,252,249,0.2)" : "#E4E3DC";
  const accent = "#E8B83A";

  return (
    <svg viewBox="0 0 800 120" className="w-full" aria-hidden>
      <line x1="0" y1="60" x2="800" y2="60" stroke={muted} strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const x = 40 + i * 64;
        const h = 20 + Math.sin(i * 1.3) * 18 + (i % 3) * 8;
        return (
          <motion.rect
            key={i}
            x={x}
            y={60 - h / 2}
            width="3"
            height={h}
            rx="1.5"
            fill={i === 5 || i === 9 ? accent : stroke}
            opacity={i === 5 || i === 9 ? 0.95 : 0.25 + (h / 50) * 0.35}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            style={{ transformOrigin: `${x + 1.5}px 60px` }}
          />
        );
      })}
      <motion.path
        d="M 0 60 Q 100 20, 200 55 T 400 45 T 600 70 T 800 40"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.3 }}
      />
    </svg>
  );
}

/* -------------------------------------------------------- full bleed panel */

export function EditorialImagePanel({
  variant,
  label,
}: {
  variant: "attention" | "flow" | "reimagine";
  label: string;
}) {
  const gradients: Record<string, string> = {
    attention: "from-info-soft via-paper to-attention",
    flow: "from-align-soft via-surface to-info-soft",
    reimagine: "from-attention via-paper to-gap-soft",
  };

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[variant]} lg:aspect-auto lg:min-h-[420px]`}
    >
      <div className="absolute inset-0 opacity-30">
        <HeroCognitiveField className="h-full w-full" />
      </div>

      {variant === "attention" && (
        <div className="absolute inset-4 flex items-center justify-center">
          <AttentionGlobe className="h-full max-h-[340px] w-full max-w-[340px]" />
        </div>
      )}

      {variant === "flow" && (
        <div className="absolute inset-6">
          <DecisionFlowViz />
        </div>
      )}

      {variant === "reimagine" && (
        <div className="absolute inset-6 flex items-center">
          <div className="w-full space-y-3">
            {["Cenário A: Foco em retenção", "Cenário B: Expansão LATAM", "Cenário C: Corte de custos"].map(
              (s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`rounded-xl border px-5 py-4 ${
                    i === 1
                      ? "border-attention-strong bg-attention shadow-float"
                      : "border-line bg-white/80"
                  }`}
                >
                  <p className="text-sm font-medium">{s}</p>
                  <p className="mt-1 text-xs text-ink-soft">
                    {i === 0 && "Attention gap −8% · alinhamento +12%"}
                    {i === 1 && "Simulação ativa · 3 twins consultados"}
                    {i === 2 && "Esforço realocado · risco operacional +4%"}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-paper/90 to-transparent px-6 pb-5 pt-16">
        <p className="kicker">{label}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- metric strip */

export function MetricStrip() {
  const metrics = [
    { value: "Attention", label: "Para onde olha" },
    { value: "Effort", label: "Onde age de fato" },
    { value: "Reality", label: "O que o mundo exige" },
  ];

  return (
    <div className="grid divide-y divide-line/40 md:grid-cols-3 md:divide-x md:divide-y-0">
      {metrics.map((m, i) => (
        <motion.div
          key={m.value}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="px-8 py-10 text-center md:py-14"
        >
          <p className="font-serif text-3xl font-light tracking-tight md:text-4xl">{m.value}</p>
          <p className="mt-2 text-sm text-ink-soft">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
