"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Volume2,
  VolumeX,
  X,
  Waves,
  Stethoscope,
  Flame,
  Building2,
  PhoneCall,
} from "lucide-react";
import { NDMA_HAZARD_GUIDES } from "@/lib/cap-protocol";

interface NdmaDosDontsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultHazard?: "flood" | "medical" | "fire" | "quake";
}

const HAZARD_ICON_MAP = {
  flood: Waves,
  medical: Stethoscope,
  fire: Flame,
  quake: Building2,
};

export default function NdmaDosDontsModal({
  isOpen,
  onClose,
  defaultHazard = "flood",
}: NdmaDosDontsModalProps) {
  const { t, currentLanguage } = useLanguage();
  const [activeHazardId, setActiveHazardId] = useState<"flood" | "medical" | "fire" | "quake">(defaultHazard);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!isOpen) return null;

  const currentHazard = NDMA_HAZARD_GUIDES.find((h) => h.id === activeHazardId) || NDMA_HAZARD_GUIDES[0];
  const langKey = currentLanguage in currentHazard.dos ? currentLanguage : "en";
  const activeDos = currentHazard.dos[langKey as keyof typeof currentHazard.dos] || currentHazard.dos.en;
  const activeDonts = currentHazard.donts[langKey as keyof typeof currentHazard.donts] || currentHazard.donts.en;

  const handleSpeakGuide = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const narrationText = `${t(currentHazard.nameKey)}. ${t("dosTitle")}: ${activeDos.join(". ")}. ${t("dontsTitle")}: ${activeDonts.join(". ")}`;

    const utterance = new SpeechSynthesisUtterance(narrationText);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
              <span>NDMA SACHET Standard • Verified Life-Saving Protocols</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {t("ndmaGuideTitle")}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Official Indian government civil defense instructions for immediate survival before first responders reach the site.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (isSpeaking && typeof window !== "undefined") {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
              onClose();
            }}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {NDMA_HAZARD_GUIDES.map((h) => {
            const Icon = HAZARD_ICON_MAP[h.id] || Waves;
            const isSelected = h.id === activeHazardId;
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => {
                  if (isSpeaking && typeof window !== "undefined") {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                  setActiveHazardId(h.id);
                }}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-2 ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 shadow-xs"
                    : "bg-slate-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isSelected
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                  {t(h.nameKey)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">Direct Helpline:</span>
            <a
              href={`tel:${currentHazard.helplineNum}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shadow-xs hover:bg-emerald-700"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{currentHazard.helpline}</span>
            </a>
          </div>

          <button
            type="button"
            onClick={handleSpeakGuide}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isSpeaking
                ? "bg-rose-600 text-white border border-rose-700 animate-pulse"
                : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800"
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isSpeaking ? t("stopAudioBtn") : t("readAloudBtn")}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-800 space-y-3">
            <div className="flex items-center gap-2 font-black text-emerald-900 dark:text-emerald-200 text-sm uppercase tracking-wide">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t("dosTitle")}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              {activeDos.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border-2 border-rose-300 dark:border-rose-800 space-y-3">
            <div className="flex items-center gap-2 font-black text-rose-900 dark:text-rose-200 text-sm uppercase tracking-wide">
              <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{t("dontsTitle")}</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              {activeDonts.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 font-mono">
          <span>Source: NDMA & Civil Defence Guidelines (sachet.ndma.gov.in)</span>
          <button
            type="button"
            onClick={() => {
              if (isSpeaking && typeof window !== "undefined") {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold hover:bg-zinc-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
