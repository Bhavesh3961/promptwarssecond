"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Radio,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  X,
  Info,
} from "lucide-react";
import { OFFICIAL_CAP_ALERTS } from "@/lib/cap-protocol";

interface CapAlertTickerProps {
  onSelectAlert?: (alertText: string) => void;
}

export default function CapAlertTicker({ onSelectAlert }: CapAlertTickerProps) {
  const { t, currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFICIAL_CAP_ALERTS.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const activeAlert = OFFICIAL_CAP_ALERTS[currentIndex];
  const langKey = currentLanguage in activeAlert.summary ? currentLanguage : "en";
  const alertText = activeAlert.summary[langKey as keyof typeof activeAlert.summary] || activeAlert.summary.en;

  const handleSpeak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langVoiceMap: Record<string, string> = {
      en: "en-IN",
      hi: "hi-IN",
      bn: "bn-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      te: "te-IN",
      gu: "gu-IN",
      kn: "kn-IN",
    };
    utterance.lang = langVoiceMap[currentLanguage] || "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const severityBadgeClass =
    activeAlert.severity === "Red"
      ? "bg-red-600 text-white border-red-700 animate-pulse"
      : activeAlert.severity === "Orange"
      ? "bg-amber-500 text-white border-amber-600"
      : "bg-yellow-400 text-zinc-900 border-yellow-500";

  const severityLabel =
    activeAlert.severity === "Red"
      ? t("sachetSeverityRed")
      : activeAlert.severity === "Orange"
      ? t("sachetSeverityOrange")
      : t("sachetSeverityYellow");

  return (
    <>
      <div className="w-full rounded-2xl bg-gradient-to-r from-red-50 via-amber-50 to-orange-50 dark:from-red-950/40 dark:via-zinc-900 dark:to-amber-950/40 border-2 border-red-200 dark:border-red-900/60 p-2.5 sm:p-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide shadow-xs border bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>NDMA SACHET</span>
            </span>

            <span className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border shadow-xs ${severityBadgeClass}`}>
              {activeAlert.agency} • {severityLabel}
            </span>
          </div>

          <div className="flex-1 min-w-0 flex items-center gap-2">
            <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-100 truncate">
              <span className="font-bold text-zinc-900 dark:text-zinc-50 mr-1.5">[{activeAlert.area}]:</span>
              <span>{alertText}</span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => handleSpeak(alertText)}
              title={isSpeaking ? t("stopAudioBtn") : t("readAloudBtn")}
              className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                isSpeaking
                  ? "bg-rose-600 text-white border-rose-700 animate-pulse"
                  : "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700"
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden md:inline">{isSpeaking ? t("stopAudioBtn") : t("readAloudBtn")}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev - 1 + OFFICIAL_CAP_ALERTS.length) % OFFICIAL_CAP_ALERTS.length)}
              aria-label="Previous Alert"
              className="p-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % OFFICIAL_CAP_ALERTS.length)}
              aria-label="Next Alert"
              className="p-1 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-xs transition-colors"
            >
              {t("viewAllAlerts")}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>NDMA SACHET • ITU-T X.1303 CAP Feed</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  {t("sachetAlertsTitle")}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Official live emergency bulletins synchronized from NDMA, IMD, CWC, and State Disaster Management Authorities.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {OFFICIAL_CAP_ALERTS.map((alert) => {
                const itemLangKey = currentLanguage in alert.summary ? currentLanguage : "en";
                const itemText = alert.summary[itemLangKey as keyof typeof alert.summary] || alert.summary.en;
                const isItemRed = alert.severity === "Red";
                const isItemOrange = alert.severity === "Orange";

                return (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-2xl border-2 transition-all space-y-3 ${
                      isItemRed
                        ? "bg-red-50/70 dark:bg-red-950/30 border-red-300 dark:border-red-800"
                        : isItemOrange
                        ? "bg-amber-50/70 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800"
                        : "bg-yellow-50/70 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-800"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider ${
                            isItemRed
                              ? "bg-red-600 text-white"
                              : isItemOrange
                              ? "bg-amber-500 text-white"
                              : "bg-yellow-400 text-zinc-900"
                          }`}
                        >
                          {alert.severity} Alert
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">
                          {alert.agency} • {alert.id}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">{alert.time}</span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        {alert.area}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 mt-1 leading-relaxed">
                        {itemText}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs">
                      <span className="text-zinc-500 dark:text-zinc-400 font-mono">
                        Source: {alert.source}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSpeak(itemText)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-100 flex items-center gap-1.5"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t("readAloudBtn")}</span>
                        </button>

                        {onSelectAlert && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectAlert(`[${alert.area} - ${alert.agency} ${alert.severity} Alert]: ${itemText}`);
                              setModalOpen(false);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold hover:bg-zinc-800 dark:hover:bg-white"
                          >
                            Respond / SOS
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600" />
                <span>Protocol: ITU-T X.1303 / NDMA CAP v1.2</span>
              </span>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
