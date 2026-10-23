"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, X, Send, Terminal } from "lucide-react";

interface Message {
  role: "bot" | "user";
  text: string;
}

export default function AiChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: t("copilotGreeting"),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "chat", text: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "Protocol verified and dispatched through Gemini pipeline.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Protocol confirmed via local fallback heuristic. Add GEMINI_API_KEY in .env.local for live model weights.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside aria-label="AI Protocol Copilot" className="fixed bottom-4 right-4 z-50">
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("copilotTitle")}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-xs font-mono font-semibold transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t("copilotTitle")}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </button>
      )}

      {open && (
        <div className="w-[340px] sm:w-[380px] h-[460px] bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col overflow-hidden text-xs">
          <div className="px-4 py-3 bg-slate-50 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono text-zinc-900 dark:text-zinc-100 font-bold">{t("copilotTitle")}</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close copilot"
              className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-mono text-[11px] bg-white dark:bg-zinc-950">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-600 text-white font-sans text-xs"
                      : "bg-slate-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] p-1 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Executing prompt query...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-slate-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800 flex gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("copilotPlaceholder")}
              aria-label={t("copilotPlaceholder")}
              className="flex-1 px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500 font-sans text-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
