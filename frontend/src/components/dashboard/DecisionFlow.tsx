import { useMemo } from "react";
import ReactFlow, {
  Background,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { SectionCard, StatBadge } from "./ui";
import {
  decisionFlowNodes,
  decisionFlowEdges,
  decisionFlowSummary,
  type FlowStatus,
} from "../../data/mockData";

const STATUS_STYLE: Record<FlowStatus, { dot: string; border: string; label: string }> = {
  aligned: { dot: "#5C8266", border: "#DFEADD", label: "Alinhado" },
  partial: { dot: "#E8B83A", border: "#F4E9C8", label: "Parcial" },
  misaligned: { dot: "#C05B3C", border: "#F1DBD0", label: "Desalinhado" },
  "no-evidence": { dot: "#8F8D83", border: "#EEEDE8", label: "Sem evidência" },
};

const LAYERS = [
  "C-level priorities",
  "Company OKRs",
  "Department OKRs",
  "Team decisions",
  "Execution",
];

function ModoNode({ data }: NodeProps<{ label: string; detail: string; status: FlowStatus }>) {
  const s = STATUS_STYLE[data.status];
  return (
    <div
      className="w-56 rounded-xl border bg-white px-4 py-3 shadow-card"
      style={{ borderColor: s.border }}
    >
      <Handle type="target" position={Position.Top} className="!bg-line !border-none" />
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.dot }} />
        <p className="text-xs font-semibold leading-snug">{data.label}</p>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-ink-mute">{data.detail}</p>
      <Handle type="source" position={Position.Bottom} className="!bg-line !border-none" />
    </div>
  );
}

const nodeTypes = { modo: ModoNode };

/**
 * Decision Flow — organograma vivo: prioridades C-level → OKRs → decisões → execução.
 */
export default function DecisionFlow() {
  const { nodes, edges } = useMemo(() => {
    const byLayer = new Map<string, typeof decisionFlowNodes>();
    for (const n of decisionFlowNodes) {
      const arr = byLayer.get(n.layer) ?? [];
      arr.push(n);
      byLayer.set(n.layer, arr);
    }

    const nodes: Node[] = [];
    LAYERS.forEach((layer, li) => {
      const group = byLayer.get(layer) ?? [];
      const totalWidth = group.length * 260;
      group.forEach((n, i) => {
        nodes.push({
          id: n.id,
          type: "modo",
          position: { x: i * 260 - totalWidth / 2 + 130 + 400, y: li * 150 },
          data: { label: n.label, detail: n.detail, status: n.status },
        });
      });
    });

    const edges: Edge[] = decisionFlowEdges.map((e) => ({
      id: `${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      type: "smoothstep",
      style: { stroke: "#D8D6CE", strokeWidth: 1.4 },
    }));

    return { nodes, edges };
  }, []);

  return (
    <SectionCard
      kicker="Decision Flow"
      title="Como prioridades viram (ou não viram) execução"
      metric={`Decision Alignment: ${decisionFlowSummary.strategicAlignment}%`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {Object.entries(STATUS_STYLE).map(([k, v]) => (
          <span key={k} className="flex items-center gap-1.5 text-[11px] text-ink-soft">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: v.dot }} />
            {v.label}
          </span>
        ))}
        <span className="ml-auto">
          <StatBadge tone="gap">Attention Gap: {decisionFlowSummary.attentionGap}</StatBadge>
        </span>
      </div>

      <div className="h-[560px] overflow-hidden rounded-xl border border-line bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background color="#EEEDE8" gap={24} size={1.5} />
        </ReactFlow>
      </div>

      <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3 text-xs leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Leitura da MODO: </span>
        {decisionFlowSummary.example}
      </p>
    </SectionCard>
  );
}
