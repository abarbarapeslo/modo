import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { NoiseToClarity, DotsField } from "../components/landing/NoiseToClarity";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Nav />
      <Hero />
      <OriginSection />
      <RevealSection />
      <HowItWorksSection />
      <ManifestoBand />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ----------------------------------------------------------------- nav */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-attention-strong" />
          <span className="font-serif text-xl font-medium tracking-tight">MODO</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#origem" className="transition-colors hover:text-ink">Origem</a>
          <a href="#revela" className="transition-colors hover:text-ink">O que revela</a>
          <a href="#como-funciona" className="transition-colors hover:text-ink">Como funciona</a>
          <a href="#governanca" className="transition-colors hover:text-ink">Governança</a>
        </nav>
        <Link
          to="/dashboard"
          className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-85"
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
    <section className="relative overflow-hidden">
      <DotsField className="pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 pb-28 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-32">
        <div>
          <motion.p {...fadeUp} className="kicker mb-6">
            Cognitive Digital Twin Platform
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
            className="font-serif text-5xl font-light leading-[1.06] tracking-tight md:text-6xl lg:text-7xl"
          >
            Descubra o modo de{" "}
            <span className="italic">pensar</span> de sua empresa.
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Não conseguimos prestar atenção em tudo o tempo todo. A MODO
            transforma reuniões, decisões, prioridades e sinais externos em
            clareza sobre como sua empresa realmente opera.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/dashboard"
              className="rounded-full bg-attention-strong px-7 py-3.5 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
            >
              Descubra o seu MODO
            </Link>
            <a
              href="#como-funciona"
              className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              Ver como funciona
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroCard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroCard() {
  return (
    <div className="card relative p-8 shadow-float">
      <div className="mb-8 flex items-center justify-between">
        <span className="kicker">Acme Electronics</span>
        <span className="flex items-center gap-1.5 rounded-full bg-attention px-3 py-1 text-[11px] font-medium text-ink">
          <span className="h-1.5 w-1.5 rounded-full bg-attention-strong" />
          Live twin
        </span>
      </div>

      <div className="space-y-7">
        <div>
          <p className="kicker mb-1.5">Attention Gap</p>
          <div className="flex items-baseline gap-3">
            <span className="metric-serif text-4xl">23%</span>
            <span className="text-xs text-gap-ink">acima do saudável</span>
          </div>
          <div className="mt-3 h-1 w-full rounded-full bg-mist">
            <div className="h-1 w-[23%] rounded-full bg-attention-strong" />
          </div>
        </div>

        <div className="border-t border-line pt-6">
          <p className="kicker mb-2">Decision DNA</p>
          <div className="flex flex-wrap gap-2">
            {["Reactive 71", "Founder-led 66", "Data-led 42"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-line pt-6">
          <p className="kicker mb-1.5">Current Mode</p>
          <p className="font-serif text-lg italic leading-snug">
            “Expansion with operational stress”
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- origem */

function OriginSection() {
  return (
    <section id="origem" className="border-t border-line/70 bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-28 lg:grid-cols-2">
        <motion.div {...fadeUp}>
          <p className="kicker mb-6">A origem da ideia</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Nós não vemos tudo. Vemos aquilo a que prestamos{" "}
            <span className="italic">atenção</span>.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink-soft">
            Toda empresa vive cercada por informação: reuniões, metas,
            urgências, indicadores, notícias, mudanças de mercado e decisões
            diárias. Mas nenhuma organização consegue prestar atenção em tudo
            ao mesmo tempo. Com o tempo, surge um padrão: um modo de pensar,
            decidir e priorizar. A MODO existe para tornar esse padrão
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

/* -------------------------------------------------------------- revela */

const revealCards = [
  {
    title: "Attention Map",
    text: "De onde vêm as influências que moldam decisões.",
  },
  {
    title: "Decision Flow",
    text: "Como prioridades se transformam — ou se perdem — na execução.",
  },
  {
    title: "Influence Map",
    text: "Quais eventos, setores e sinais externos impactam seu negócio.",
  },
  {
    title: "Alignment Map",
    text: "Onde há alinhamento entre áreas — e onde ele se rompe.",
  },
  {
    title: "Internal Map",
    text: "Onde a empresa concentra energia, verba e atenção.",
  },
  {
    title: "Reimagine",
    text: "Simule mudanças e discuta cenários com seus Digital Twins.",
  },
];

function RevealSection() {
  return (
    <section id="revela" className="border-t border-line/70">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <p className="kicker mb-6">O que a MODO revela</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Do ruído à <span className="italic">clareza</span>.
          </h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {revealCards.map((card, i) => (
            <motion.div
              key={card.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="card group p-7 transition-shadow hover:shadow-float"
            >
              <div className="mb-6 h-2 w-2 rounded-full bg-mist transition-colors group-hover:bg-attention-strong" />
              <h3 className="font-serif text-xl font-medium tracking-tight">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- como funciona */

const steps = [
  {
    n: "01",
    title: "Conectar",
    text: "A MODO se conecta a reuniões, documentos, OKRs, CRMs, ERPs, projetos e fontes externas.",
  },
  {
    n: "02",
    title: "Observar",
    text: "A IA identifica temas, decisões, influências, prioridades, recursos e padrões de atenção.",
  },
  {
    n: "03",
    title: "Comparar",
    text: "A plataforma compara o Digital Twin Cognitivo da empresa com o Digital Twin Econômico do ambiente externo.",
  },
  {
    n: "04",
    title: "Reimaginar",
    text: "Líderes simulam cenários e descobrem novas possibilidades de foco, alinhamento e ação.",
  },
];

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="border-t border-line/70 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <motion.div {...fadeUp} className="mb-16 max-w-2xl">
          <p className="kicker mb-6">Como funciona</p>
          <h2 className="font-serif text-4xl font-light leading-tight tracking-tight md:text-5xl">
            Quatro movimentos, um <span className="italic">modo</span>.
          </h2>
        </motion.div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="bg-paper p-8"
            >
              <span className="font-serif text-3xl font-light text-ink-mute">
                {step.n}
              </span>
              <h3 className="mt-6 font-serif text-xl font-medium">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ manifesto */

function ManifestoBand() {
  return (
    <section className="border-t border-line/70">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <motion.p
          {...fadeUp}
          className="font-serif text-2xl font-light leading-relaxed text-ink-soft md:text-3xl"
        >
          “A MODO transforma reuniões, OKRs, decisões, orçamentos e sinais de
          mercado em um modelo vivo da atenção organizacional. Ela mostra para
          onde sua empresa está olhando, onde está realmente agindo, para onde
          o mundo está se movendo — e onde a distância entre esses três pontos
          começa a se tornar{" "}
          <span className="bg-attention px-1 not-italic text-ink">perigosa</span>.”
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
      <div className="mx-auto max-w-6xl px-6 py-28">
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
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <h3 className="text-sm font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {card.text}
              </p>
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
      <DotsField className="pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
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
          Entenda como sua empresa pensa, onde está colocando esforço e quais
          sinais ainda não está vendo.
        </motion.p>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
          <Link
            to="/dashboard"
            className="mt-12 inline-block rounded-full bg-attention-strong px-9 py-4 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-attention-strong" />
          <span className="font-serif text-lg font-medium">MODO</span>
          <span className="ml-3 text-xs text-ink-mute">
            Quiet Intelligence · Attention — Effort — Reality
          </span>
        </div>
        <p className="text-xs text-ink-mute">
          © 2026 MODO. Nem toda empresa sabe como pensa.
        </p>
      </div>
    </footer>
  );
}
