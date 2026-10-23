"use client";

import { useEffect, useState } from "react";
import { Terminal, Download, Check, X, Activity } from "lucide-react";

export default function DevHUD() {
  const [open, setOpen] = useState(false);
  const [seedingDomain, setSeedingDomain] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerSeed = async (domain: string) => {
    setSeedingDomain(domain);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const data = await res.json();
      setSuccessMsg(`✓ Injected ${data.insertedCount} records for ${domain}`);
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch {
      alert("Failed to inject data.");
    } finally {
      setSeedingDomain(null);
    }
  };

  const domains = [
    { key: "medical", name: "Emergency Medical & Trauma" },
    { key: "disaster", name: "Disaster & Rescue Operations" },
    { key: "traffic", name: "Traffic & Evacuation Corridors" },
  ];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-2 left-2 z-40 w-3 h-3 rounded-full bg-zinc-800/40 hover:bg-emerald-500/60 transition-colors"
        title="Hidden Dev HUD (Ctrl+Shift+D)"
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs">
        <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-200">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">PromptWars Developer Command HUD</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-zinc-300">
          <div className="text-[11px] text-zinc-500">
            Hidden utility panel (Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">Cmd+Shift+D</kbd>). Use this to instantly populate live Firestore records.
          </div>

          {successMsg && (
            <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">
              1-Click Theme Population to Firestore
            </span>
            <div className="grid grid-cols-1 gap-1.5">
              {domains.map((d) => (
                <button
                  key={d.key}
                  onClick={() => triggerSeed(d.key)}
                  disabled={seedingDomain === d.key}
                  className="w-full px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg flex items-center justify-between transition-colors disabled:opacity-50 text-left"
                >
                  <span className="text-zinc-200">{d.name}</span>
                  <span className="text-[10px] text-emerald-400">
                    {seedingDomain === d.key ? "Injecting..." : "+ Seed 4 Records"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
            <a
              href="/api/export?format=csv"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg transition-colors text-[11px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export All as CSV</span>
            </a>

            <a
              href="/api/health"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 text-[11px]"
            >
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>View System Health API</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
