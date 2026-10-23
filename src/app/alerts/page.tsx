"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { OFFICIAL_CAP_ALERTS, CapAlertItem } from "@/lib/cap-protocol";
import {
  Radio,
  Volume2,
  VolumeX,
  FileCode,
  Send,
  Clock,
} from "lucide-react";

export default function AlertsPage() {
  const router = useRouter();
  const { t, currentLanguage } = useLanguage();
  const [selectedAlert, setSelectedAlert] = useState<CapAlertItem>(OFFICIAL_CAP_ALERTS[0]);
  const [severityFilter, setSeverityFilter] = useState<string>("All");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [viewJson, setViewJson] = useState(false);

  const filteredAlerts = OFFICIAL_CAP_ALERTS.filter((alert) => {
    if (severityFilter === "All") return true;
    return alert.severity === severityFilter;
  });

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.92;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  const handleBridgeAction = (alert: CapAlertItem) => {
    const text = alert.summary[currentLanguage] || alert.summary.en;
    sessionStorage.setItem("emergency_bridge_input", text);
    sessionStorage.setItem("emergency_bridge_type", "disaster");
    router.push("/");
  };

  return (
    <main className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>ITU-T X.1303 CAP v1.2 / NDMA SACHET Live Broadcast</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            National Early Warning Bulletins
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Live official disaster alerts aggregated from Central Water Commission (CWC), India Meteorological Department (IMD), and NDMA with native multi-dialect voice broadcasts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-mono">Filter:</span>
          {["All", "Red", "Orange", "Yellow"].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                severityFilter === sev
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 flex flex-col gap-3">
          {filteredAlerts.map((alert) => {
            const isSelected = selectedAlert.id === alert.id;
            const text = alert.summary[currentLanguage] || alert.summary.en;

            return (
              <div
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={`p-4 rounded-2xl glass-card cursor-pointer transition-all border ${
                  isSelected
                    ? "border-slate-900 dark:border-white shadow-md bg-white dark:bg-slate-800/90"
                    : "border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        alert.severity === "Red"
                          ? "bg-red-600 animate-pulse"
                          : alert.severity === "Orange"
                          ? "bg-amber-500"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400">
                      {alert.agency}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      alert.severity === "Red"
                        ? "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300"
                        : alert.severity === "Orange"
                        ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300"
                        : "bg-yellow-100 dark:bg-yellow-950/60 text-yellow-800 dark:text-yellow-300"
                    }`}
                  >
                    {alert.severity} Alert
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                  {t(alert.hazardKey)} — {alert.area}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {text}
                </p>

                <div className="flex items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10px] font-mono text-slate-400">
                  <span>{alert.area}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {selectedAlert.id} • {selectedAlert.agency}
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {t(selectedAlert.hazardKey)} Alert Bulletin
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleSpeak(selectedAlert.summary[currentLanguage] || selectedAlert.summary.en)}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
                  isSpeaking
                    ? "bg-red-600 text-white border-red-700 animate-pulse"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                }`}
                title="Broadcast Read-Aloud"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeaking ? t("stopAudioBtn") : t("readAloudBtn")}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 block uppercase">Severity</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {selectedAlert.severity}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 block uppercase">Agency</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {selectedAlert.agency}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 block uppercase">Jurisdiction</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block truncate">
                  {selectedAlert.area}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <span className="text-[10px] text-slate-500 block uppercase">Recency</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {selectedAlert.time}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
                Official Alert Bulletin (Civilian Warning):
              </span>
              <p className="text-sm text-slate-900 dark:text-white leading-relaxed">
                {selectedAlert.summary[currentLanguage] || selectedAlert.summary.en}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setViewJson(!viewJson)}
                className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5"
              >
                <FileCode className="w-4 h-4" />
                <span>{viewJson ? "Hide CAP JSON" : "Inspect Raw ITU-T CAP JSON"}</span>
              </button>

              <button
                type="button"
                onClick={() => handleBridgeAction(selectedAlert)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Bridge to Action Manifest</span>
              </button>
            </div>

            {viewJson && (
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] overflow-x-auto max-h-60 border border-slate-800 leading-relaxed">
                {JSON.stringify(selectedAlert, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
