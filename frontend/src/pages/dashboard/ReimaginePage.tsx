import { useOutletContext, Link } from "react-router-dom";
import { reimagineMockResponse } from "../../data/mockData";

interface DashboardContext {
  openReimagine: () => void;
}

export default function ReimaginePage() {
  const { openReimagine } = useOutletContext<DashboardContext>();

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
      <Link
        to="/dashboard"
        className="inline-flex text-sm text-ink-soft transition-colors hover:text-ink"
      >
        ← Voltar ao dashboard
      </Link>

      <header>
        <p className="kicker mb-3">Reimagine</p>
        <h1 className="font-serif text-4xl font-light tracking-tight">
          Simule o <span className="italic">próximo modo</span>
        </h1>
        <p className="mt-4 text-sm text-ink-soft">
          Converse com os Digital Twins para explorar cenários estratégicos antes
          de comprometer recursos reais.
        </p>
      </header>

      <div className="card p-8">
        <p className="text-sm text-ink-soft">
          Exemplo de pergunta para simular:
        </p>
        <blockquote className="mt-4 border-l-2 border-attention-strong pl-4 font-serif text-lg italic">
          “{reimagineMockResponse.prompt}”
        </blockquote>
        <button
          onClick={openReimagine}
          className="mt-8 rounded-full bg-attention-strong px-7 py-3 text-sm font-semibold text-ink shadow-card transition-transform hover:-translate-y-0.5"
        >
          Abrir painel Reimagine
        </button>
      </div>
    </div>
  );
}
