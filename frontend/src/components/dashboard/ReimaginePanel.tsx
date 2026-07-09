import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reimagineMockResponse } from "../../data/mockData";

interface Message {
  role: "user" | "modo";
  text?: string;
  implications?: string[];
  confidence?: number;
}

/**
 * Reimagine — painel chat-like para simular mudanças estratégicas contra
 * o Company Twin + Economic Twin.
 */
export default function ReimaginePanel({
  open,
  onClose,
  initialPrompt,
}: {
  open: boolean;
  onClose: () => void;
  initialPrompt?: string;
}) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (open && initialPrompt) {
      setInput(initialPrompt);
    }
  }, [open, initialPrompt]);

  async function runSimulation(prompt: string) {
    if (!prompt.trim()) return;
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setInput("");
    setThinking(true);

    let implications = reimagineMockResponse.implications;
    let confidence = reimagineMockResponse.confidenceScore;
    try {
      const res = await fetch("/api/simulations/reimagine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId: "acme", scenarioPrompt: prompt }),
      });
      if (res.ok) {
        const data = await res.json();
        implications = data.projectedImplications ?? implications;
        confidence = data.confidenceScore ?? confidence;
      }
    } catch {
      // backend offline — keep local mock so the demo always works
    }

    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [...m, { role: "modo", implications, confidence }]);
    }, 900);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-[2px]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-xl flex-col border-l border-line bg-paper shadow-float"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 rounded-full border border-line bg-white px-3 py-1.5 text-xs text-ink-soft hover:text-ink"
            >
              Fechar
            </button>

            <div className="flex-1 space-y-4 overflow-y-auto px-6 pb-6 pt-14">
              {messages.length === 0 && (
                <div className="rounded-2xl border border-line bg-white p-5">
                  <p className="text-sm text-ink-soft">
                    Simule cenários contra o Digital Twin Cognitivo da empresa e o
                    Digital Twin Econômico do ambiente. Experimente:
                  </p>
                  <button
                    onClick={() => runSimulation(reimagineMockResponse.prompt)}
                    className="mt-4 w-full rounded-xl bg-surface px-4 py-3 text-left text-xs italic text-ink-soft transition-colors hover:bg-attention hover:text-ink"
                  >
                    “{reimagineMockResponse.prompt}”
                  </button>
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="ml-10 rounded-2xl rounded-tr-md bg-ink px-4 py-3 text-sm text-paper">
                    {m.text}
                  </div>
                ) : (
                  <div key={i} className="mr-6 rounded-2xl rounded-tl-md border border-line bg-white p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="kicker">Projected implications</p>
                      <span className="rounded-full bg-attention px-2.5 py-0.5 text-[10px] font-medium">
                        confidence {m.confidence}%
                      </span>
                    </div>
                    <ol className="space-y-2.5">
                      {m.implications?.map((imp, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                          <span className="font-serif text-ink">{j + 1}.</span>
                          {imp}
                        </li>
                      ))}
                    </ol>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                      {["Run Simulation", "Compare Scenario", "Export Board Memo", "Save Scenario"].map((b) => (
                        <button
                          key={b}
                          className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[11px] font-medium text-ink-soft transition-colors hover:bg-attention hover:text-ink"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}

              {thinking && (
                <div className="mr-6 flex items-center gap-2 rounded-2xl border border-line bg-white px-5 py-4 text-xs text-ink-mute">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-attention-strong" />
                  Consultando os Digital Twins…
                </div>
              )}
            </div>

            <footer className="border-t border-line bg-white px-6 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runSimulation(input);
                }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  title="Entrada por voz (em breve)"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-mute hover:text-ink"
                >
                  ◉
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Descreva um cenário para simular…"
                  className="h-10 flex-1 rounded-full border border-line bg-paper px-4 text-sm focus:border-attention-strong focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 rounded-full bg-attention-strong px-5 text-xs font-semibold text-ink transition-opacity hover:opacity-85"
                >
                  Simular
                </button>
              </form>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
