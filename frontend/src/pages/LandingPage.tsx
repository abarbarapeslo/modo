import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NoiseToClarity, DotsField } from "../components/landing/NoiseToClarity";
import {
  HeroCognitiveField,
  TwinInterfaceMock,
  EditorialImagePanel,
  PlatformStackVisual,
  SignalWaveform,
  MetricStrip,
} from "../components/landing/LandingVisuals";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, ease },
} as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <Hero />
      <MetricStripSection />
      <PlatformIntro />
      <FeatureShowcase />
      <OriginSection />
      <HowItWorksSection />
      <DarkManifesto />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------- nav */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/40 bg-paper/70 backdrop-blur-lg">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="inline-block h-2 w-2 rounded-full bg-attention-strong" />
          <span className="font-serif text-lg font-medium tracking-tight lg:text-xl">MODO</span>
        </Link>
        <nav className="hidden items-center gap-10 text-[13px] text-ink-soft md:flex">
          <a href="#plataforma" className="transition-colors hover:text-ink">
            Plataforma
          </a>
          <a href="#origem" className="transition-colors hover:text-ink">
            Origem
          </a>
          <a href="#como-funciona" className="transition-colors hover:text-ink">
            Como funciona
          </a>
          <a href="#governanca" className="transition-colors hover:text-ink">
            Governança
          </a>
        </nav>
        <Link
          to="/dashboard"
          className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition-opacity hover:opacity-85 lg:px-5 lg:py-2.5"
        >
          Descubra o seu MODO
        </Link>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden pt-14 lg:pt-16">
      <HeroCognitiveField className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
      <DotsField className="pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-16 lg:min-h-[calc(92vh-4rem)] lg:flex-row lg:items-center lg:gap-12 lg:pb-28 lg:pt-24">
        <div className="flex-1 lg:max-w-[52%]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="kicker mb-8"
          >
            Cognitive Digital Twin Platform
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="font-serif text-[2.75rem] font-light leading-[1.02] tracking-tight md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            Descubra o modo de{" "}
            <span className="italic text-ink-soft">pensar</span> de sua empresa.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease }}
            className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft lg:text-lg"
          >
            Não conseguimos prestar atenção em tudo o tempo todo. A MODO transforma
            reuniões, decisões, prioridades e sinais externos em clareza sobre como
            sua empresa realmente opera — sem tomar decisões por você.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/dashboard"
              className="rounded-full bg-attention-strong px-8 py-3.5 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
            >
              Descubra o seu MODO
            </Link>
            <a
              href="#plataforma"
              className="group flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Explorar a plataforma
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
          className="mt-16 flex-1 lg:mt-0"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-attention/30 blur-2xl" aria-hidden />
            <TwinInterfaceMock />
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-line/50 bg-paper/80">
        <SignalWaveform />
      </div>
    </section>
  );
}

/* -------------------------------------------------------- metric strip */

function MetricStripSection() {
  return (
    <section className="border-b border-line/70 bg-white">
      <div className="mx-auto max-w-7xl">
        <MetricStrip />
      </div>
    </section>
  );
}

/* ----------------------------------------------------- platform intro */

function PlatformIntro() {
  return (
    <section id="plataforma" className="relative overflow-hidden bg-ink text-paper">
      <DotsField className="pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <motion.div {...fadeUp}>
          <p className="mb-6 text-[11px] font-medium uppercase tracking-wider2 text-paper/50">
            A plataforma
          </p>
          <h2 className="font-serif text-4xl font-light leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]">
            Inteligência estratégica sobre{" "}
            <span className="italic text-attention-strong">atenção</span>, não automação.
          </h2>
          <p className="mt-8 max-w-md text-base leading-relaxed text-paper/65">
            Como o mundo observa o ambiente externo, a MODO observa o modo cognitivo da
            sua organização — mapeando para onde vai a atenção, onde o esforço se
            concentra e onde a realidade diverge da intenção.
          </p>
          <Link
            to="/dashboard"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-attention-strong transition-opacity hover:opacity-80"
          >
            Ver o twin ao vivo
            <span>→</span>
          </Link>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <PlatformStackVisual />
        </motion.div>
      </div>
      <div className="border-t border-paper/10 px-6 py-6">
        <SignalWaveform dark />
      </div>
    </section>
  );
}

/* --------------------------------------------------- feature showcase */

const features = [
  {
    kicker: "Attention Map",
    title: "De onde vêm as influências que moldam decisões.",
    text: "Hotspots de atenção cruzam reuniões, documentos e sinais externos. Veja quais fontes realmente orientam a liderança — e quais são apenas ruído.",
    variant: "attention" as const,
    label: "Mapa de influências · tempo real",
    reverse: false,
  },
  {
    kicker: "Decision Flow",
    title: "Como prioridades se transformam — ou se perdem — na execução.",
    text: "Do C-level à execução, cada camada revela alinhamento, desvio ou ausência de evidência. A distância entre intenção e ação fica visível.",
    variant: "flow" as const,
    label: "Fluxo de decisão · organograma vivo",
    reverse: true,
  },
  {
    kicker: "Reimagine",
    title: "Simule cenários antes de comprometer atenção e recursos.",
    text: "Consulte Digital Twins, teste hipóteses e discuta possibilidades com sua liderança — sem que a plataforma decida por você.",
    variant: "reimagine" as const,
    label: "Simulação de cenários · multi-twin",
    reverse: false,
  },
];

function FeatureShowcase() {
  return (
    <section className="border-t border-line/70">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <motion.div {...fadeUp} className="mb-20 max-w-2xl">
          <p className="kicker mb-6">O que a MODO revela</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Do ruído à <span className="italic">clareza</span>.
          </h2>
        </motion.div>

        <div className="space-y-24 lg:space-y-32">
          {features.map((f, i) => (
            <motion.div
              key={f.kicker}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                f.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p className="kicker mb-4">{f.kicker}</p>
                <h3 className="font-serif text-3xl font-light leading-snug tracking-tight md:text-4xl">
                  {f.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-ink-soft">{f.text}</p>
              </div>
              <EditorialImagePanel variant={f.variant} label={f.label} />
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Influence Map", text: "Eventos, setores e sinais externos que impactam seu negócio." },
            { title: "Alignment Map", text: "Onde há alinhamento entre áreas — e onde ele se rompe." },
            { title: "Internal Map", text: "Onde a empresa concentra energia, verba e atenção." },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="group rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-float"
            >
              <div className="mb-5 h-2 w-2 rounded-full bg-mist transition-colors group-hover:bg-attention-strong" />
              <h4 className="font-serif text-xl font-medium">{card.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- origem */

function OriginSection() {
  return (
    <section id="origem" className="border-t border-line/70 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <motion.div {...fadeUp}>
          <p className="kicker mb-6">A origem da ideia</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Nós não vemos tudo. Vemos aquilo a que prestamos{" "}
            <span className="italic">atenção</span>.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft">
            Toda empresa vive cercada por informação: reuniões, metas, urgências,
            indicadores, notícias e decisões diárias. Nenhuma organização consegue
            prestar atenção em tudo ao mesmo tempo. Com o tempo, surge um padrão — um
            modo de pensar, decidir e priorizar. A MODO existe para tornar esse padrão
            visível.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <NoiseToClarity />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- como funciona */

const steps = [
  {
    n: "01",
    title: "Conectar",
    text: "Reuniões, documentos, OKRs, CRMs, ERPs, projetos e fontes externas.",
  },
  {
    n: "02",
    title: "Observar",
    text: "A IA identifica temas, decisões, influências, prioridades e padrões de atenção.",
  },
  {
    n: "03",
    title: "Comparar",
    text: "Digital Twin Cognitivo vs. Digital Twin Econômico do ambiente externo.",
  },
  {
    n: "04",
    title: "Reimaginar",
    text: "Líderes simulam cenários e descobrem novas possibilidades de foco e alinhamento.",
  },
];

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="border-t border-line/70">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <p className="kicker mb-6">Como funciona</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Quatro movimentos, um <span className="italic">modo</span>.
          </h2>
        </motion.div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="group relative bg-paper p-8 lg:p-10"
            >
              <span className="font-serif text-4xl font-light text-ink-mute/60">{step.n}</span>
              <h3 className="mt-8 font-serif text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              <div className="absolute bottom-0 left-8 right-8 h-0.5 scale-x-0 bg-attention-strong transition-transform duration-500 group-hover:scale-x-100 lg:left-10 lg:right-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- dark manifesto */

function DarkManifesto() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <HeroCognitiveField className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:py-36">
        <motion.p
          {...fadeUp}
          className="font-serif text-2xl font-light leading-relaxed text-paper/80 md:text-3xl lg:text-[2rem] lg:leading-relaxed"
        >
          “A MODO transforma reuniões, OKRs, decisões, orçamentos e sinais de mercado
          em um modelo vivo da atenção organizacional. Ela mostra para onde sua empresa
          está olhando, onde está realmente agindo, para onde o mundo está se movendo —
          e onde a distância entre esses três pontos começa a se tornar{" "}
          <span className="bg-attention px-1.5 not-italic text-ink">perigosa</span>.”
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ governança */

const trustCards = [
  { title: "Permissões por cargo", text: "Cada camada da organização vê apenas o que deve ver." },
  { title: "Rastreamento de fontes", text: "Toda análise aponta para a reunião, documento ou sinal de origem." },
  { title: "Evidência por insight", text: "Nenhuma conclusão sem trilha de evidência auditável." },
  { title: "Privacidade e governança", text: "Anonimização, retenção configurável e controle total dos dados." },
  { title: "Integrações empresariais", text: "Conectores para reuniões, documentos, OKRs, CRMs e ERPs." },
  { title: "Controle de acesso", text: "Papéis, políticas e auditoria completa de quem viu o quê." },
];

function TrustSection() {
  return (
    <section id="governanca" className="border-t border-line/70 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <p className="kicker mb-6">Confiança e governança</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Clareza exige <span className="italic">confiança</span>.
          </h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.05 }}
              className="rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-ink-mute/40"
            >
              <h3 className="text-sm font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- cta final */

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-line/70">
      <DotsField className="pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center lg:py-40">
        <motion.h2
          {...fadeUp}
          className="font-serif text-5xl font-light leading-tight tracking-tight md:text-6xl"
        >
          Clareza para decidir <span className="italic">melhor</span>.
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          Entenda como sua empresa pensa, onde está colocando esforço e quais sinais
          ainda não está vendo.
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
          <Link
            to="/dashboard"
            className="mt-12 inline-block rounded-full bg-attention-strong px-10 py-4 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
          >
            Descubra o seu MODO
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="border-t border-line/70 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-attention-strong" />
          <span className="font-serif text-lg font-medium">MODO</span>
          <span className="ml-3 hidden text-xs text-ink-mute sm:inline">
            Quiet Intelligence · Attention — Effort — Reality
          </span>
        </div>
        <p className="text-xs text-ink-mute">© 2026 MODO. Nem toda empresa sabe como pensa.</p>
      </div>
    </footer>
  );
}
