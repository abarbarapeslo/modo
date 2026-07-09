import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { getToken } from "../lib/auth";

interface ChatMessage {
  role: "user" | "modo";
  text: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "modo",
      text: "Olá. Sou a MODO — sua inteligência estratégica. Pergunte sobre atenção organizacional, decisões, riscos ou sinais econômicos.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await api.chat(text, getToken() ?? undefined);
      setMessages((prev) => [...prev, { role: "modo", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "modo",
          text: "Não consegui contactar o backend. Verifique se o backend está ativo na porta 4000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-0px)] flex-col bg-paper text-ink">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex text-sm text-ink-soft transition-colors hover:text-ink"
        >
          ← Voltar ao dashboard
        </Link>

        <p className="kicker mb-2">Agente estratégico</p>
        <h1 className="font-serif text-3xl font-light tracking-tight">Chat MODO</h1>

        <div className="mt-8 flex flex-1 flex-col gap-4 overflow-y-auto rounded-2xl border border-line bg-white p-6 shadow-card">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "ml-auto bg-ink text-paper"
                  : "bg-surface text-ink"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
          {loading && (
            <p className="text-xs text-ink-mute">MODO está pensando…</p>
          )}
        </div>

        <form
          className="mt-4 flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre atenção, decisões, riscos…"
            className="flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm outline-none focus:border-ink-mute"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
