import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import AttentionMap from "../../components/dashboard/AttentionMap";
import DecisionFlow from "../../components/dashboard/DecisionFlow";
import {
  OverviewHero,
  OverviewMetrics,
  AERDimensions,
  OverviewSignals,
  OverviewModuleGrid,
} from "../../components/dashboard/overview/OverviewWidgets";
import { PlatformSection } from "../../components/dashboard/platform/PlatformLayout";

const MODULES = [
  {
    to: "/dashboard/attention",
    label: "Attention",
    description: "Mapas de percepção, orçamento cognitivo e fingerprints de reunião.",
    tag: "Map",
  },
  {
    to: "/dashboard/influence",
    label: "Influence",
    description: "Sinais externos, setores monitorados e blindspots.",
    tag: "Map",
  },
  {
    to: "/dashboard/market-map",
    label: "Market Map",
    description: "Economic Digital Twin — calor de mercado vs. atenção interna.",
    tag: "Twin",
  },
  {
    to: "/dashboard/alignment",
    label: "Alignment",
    description: "Conexões entre áreas, fluxo de decisões e loops abertos.",
    tag: "Map",
  },
  {
    to: "/dashboard/drift",
    label: "Drift",
    description: "Desvio estratégico, DNA de decisão e evolução do modo.",
    tag: "Signal",
  },
  {
    to: "/dashboard/reports",
    label: "Reports",
    description: "Relatórios executivos exportáveis para board e liderança.",
    tag: "Intel",
  },
];

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export default function Overview() {
  const { can } = useUser();

  return (
    <div className="space-y-10 pb-4">
      <OverviewHero
        action={
          <Link
            to="/dashboard/reimagine"
            className="block w-full rounded-md bg-ink py-2.5 text-center text-xs font-semibold text-paper transition-opacity hover:opacity-85 lg:w-auto lg:px-6"
          >
            ✦ Reimagine
          </Link>
        }
      />

      <OverviewMetrics />

      <AERDimensions />

      {can("view:global-maps") ? (
        <>
          <PlatformSection
            kicker="Priority signals"
            title="O que exige atenção agora"
            description="Blindspots e eventos externos com maior distância entre relevância e foco interno."
          >
            <OverviewSignals />
          </PlatformSection>

          <PlatformSection
            kicker="Live snapshot"
            title="Twin cognitivo"
            description="Duas camadas centrais — de onde vêm as influências e como prioridades fluem na execução."
          >
            <motion.div {...fade} className="space-y-6">
              <AttentionMap />
              <DecisionFlow />
            </motion.div>
            <p className="text-center text-[11px] text-ink-mute">
              Mapas completos disponíveis nos módulos{" "}
              <Link to="/dashboard/attention" className="text-ink-soft underline-offset-2 hover:underline">
                Attention
              </Link>
              ,{" "}
              <Link to="/dashboard/alignment" className="text-ink-soft underline-offset-2 hover:underline">
                Alignment
              </Link>{" "}
              e{" "}
              <Link to="/dashboard/drift" className="text-ink-soft underline-offset-2 hover:underline">
                Drift
              </Link>
              .
            </p>
          </PlatformSection>
        </>
      ) : (
        <div className="rounded-xl border border-line bg-surface p-10 text-center">
          <p className="font-serif text-xl font-light">Visão limitada ao seu escopo</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            Alterne para Executive ou Leadership no header para ver o mapa cognitivo
            completo (demo).
          </p>
        </div>
      )}

      <PlatformSection
        kicker="Platform modules"
        title="Explorar a plataforma"
        description="Cada módulo ativa uma camada diferente do Cognitive Digital Twin."
      >
        <OverviewModuleGrid modules={MODULES} />
      </PlatformSection>
    </div>
  );
}
