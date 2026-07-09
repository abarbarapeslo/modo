import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WorldMap, project } from "./WorldMap";
import { SectionCard, StatBadge, influenceColor } from "./ui";
import { attentionSources, type AttentionSource } from "../../data/mockData";

/**
 * Attention Map — de onde vêm as influências que moldam as decisões da empresa.
 * Cada hotspot é uma fonte externa citada em reuniões e ligada a decisões internas.
 */
export default function AttentionMap() {
  const [selected, setSelected] = useState<AttentionSource | null>(
    attentionSources[0]
  );

  return (
    <SectionCard
      kicker="Attention Map"
      title="De onde vêm as influências"
      metric={`${attentionSources.length} fontes ativas`}
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative rounded-xl border border-line bg-white p-2">
          <WorldMap>
            {attentionSources.map((s) => {
              const [x, y] = project(s.coordinates);
              const r = 4 + (s.influenceScore / 100) * 8;
              const color = influenceColor(s.influenceScore);
              const active = selected?.source === s.source;
              return (
                <g
                  key={s.source}
                  onClick={() => setSelected(s)}
                  className="cursor-pointer"
                >
                  <circle cx={x} cy={y} r={r * 2.2} fill={color} opacity={0.16} filter="url(#soft-halo)" />
                  <circle
                    cx={x}
                    cy={y}
                    r={r}
                    fill={color}
                    opacity={active ? 0.95 : 0.6}
                    stroke={active ? "#1E1D1A" : "white"}
                    strokeWidth={active ? 1.5 : 1}
                  />
                </g>
              );
            })}
          </WorldMap>
          <div className="flex items-center gap-4 px-3 pb-2 pt-1 text-[10px] text-ink-mute">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-info-ink opacity-70" /> baixa influência
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-attention-strong opacity-80" /> moderada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gap-ink opacity-80" /> crítica
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.aside
              key={selected.source}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-line bg-surface p-5"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-serif text-lg font-medium">{selected.source}</h4>
                  <p className="text-xs text-ink-mute">{selected.location}</p>
                </div>
                <StatBadge tone={selected.influenceScore >= 85 ? "gap" : "attention"}>
                  {selected.influenceScore}/100
                </StatBadge>
              </div>

              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="kicker">Tema</dt>
                  <dd className="mt-0.5">{selected.topic}</dd>
                </div>
                <div>
                  <dt className="kicker">Setor</dt>
                  <dd className="mt-0.5">{selected.sector}</dd>
                </div>
                <div>
                  <dt className="kicker">Presença em reuniões</dt>
                  <dd className="mt-0.5">{selected.mentionedInMeetings} reuniões recentes</dd>
                </div>
                <div>
                  <dt className="kicker">Decisões internas impactadas</dt>
                  <dd className="mt-1.5 space-y-1.5">
                    {selected.relatedDecisions.length > 0 ? (
                      selected.relatedDecisions.map((d) => (
                        <p key={d} className="rounded-lg border border-line bg-white px-3 py-1.5 text-xs">
                          {d}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs italic text-ink-mute">
                        Nenhuma decisão registrada ainda.
                      </p>
                    )}
                  </dd>
                </div>
              </dl>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </SectionCard>
  );
}
