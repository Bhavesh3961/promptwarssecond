"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { FULL_NDMA_EVENTS, FullHazardEvent } from "@/lib/ndma-dos-donts-full";
import { LanguageCode } from "@/locales";
import {
  Search,
  BookOpen,
  Volume2,
  VolumeX,
  Printer,
  CheckSquare,
  Square,
  PhoneCall,
  ArrowRight,
  Sparkles,
  ChevronUp,
  X,
  Shield,
} from "lucide-react";

const SCREENSHOT_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "mr", label: "मराठी" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "as", label: "অসমীয়া" },
  { code: "kha", label: "khasi" },
  { code: "ach", label: "A·chik" },
];

const PHASE_LABELS: Record<string, Record<string, string>> = {
  before: {
    en: "BEFORE",
    hi: "आपदा से पहले",
    bn: "দুর্যোগের পূর্বে",
    mr: "आपत्तीपूर्वी",
    ta: "பேரிடருக்கு முன்",
    te: "విపత్తుకు ముందు",
    gu: "આપત્તિ પહેલાં",
    kn: "ವಿಪತ್ತಿಗೆ ಮುನ್ನ",
  },
  during: {
    en: "DURING",
    hi: "आपदा के दौरान",
    bn: "দুর্যোগ চলাকালীন",
    mr: "आपत्तीच्या वेळी",
    ta: "பேரிடரின் போது",
    te: "విపత్తు సమయంలో",
    gu: "આપત્તિ દરમિયાન",
    kn: "ವಿಪತ್ತಿನ ಸಮಯದಲ್ಲಿ",
  },
  after: {
    en: "AFTER",
    hi: "आपदा के बाद",
    bn: "দুর্যোগের পরে",
    mr: "आपत्तीनंतर",
    ta: "பேரிடருக்குப் பின்",
    te: "విపత్తు తర్వాత",
    gu: "આપત્તિ પછી",
    kn: "ವಿಪತ್ತಿನ ನಂತರ",
  },
};

export default function NdmaDosDontsPage() {
  const router = useRouter();
  const { setLanguage, currentLanguage } = useLanguage();

  const [activeEventId, setActiveEventId] = useState<string>("cyclones");
  const [activeLangCode, setActiveLangCode] = useState<string>(currentLanguage || "en");
  const [activePhase, setActivePhase] = useState<"before" | "during" | "after">("before");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const savedChecks = localStorage.getItem("ndma_safety_checklist");
      if (savedChecks) {
        setCheckedItems(JSON.parse(savedChecks));
      }
    } catch {}
  }, []);

  const toggleCheckItem = (itemKey: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [itemKey]: !prev[itemKey] };
      try {
        localStorage.setItem("ndma_safety_checklist", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleSelectLanguage = (code: string) => {
    setActiveLangCode(code);
    if (["en", "hi", "bn", "mr", "ta", "te", "gu", "kn"].includes(code)) {
      setLanguage(code as LanguageCode);
    }
  };

  const currentEvent: FullHazardEvent = useMemo(() => {
    return FULL_NDMA_EVENTS.find((e) => e.id === activeEventId) || FULL_NDMA_EVENTS[0];
  }, [activeEventId]);

  const activeContent = useMemo(() => {
    const eventContent = currentEvent.content;
    if (eventContent[activeLangCode]) {
      return eventContent[activeLangCode];
    }
    if (eventContent[currentLanguage]) {
      return eventContent[currentLanguage];
    }
    return eventContent.en || { before: [], during: [], after: [] };
  }, [currentEvent, activeLangCode, currentLanguage]);

  const activePoints = useMemo(() => {
    return activeContent[activePhase] || [];
  }, [activeContent, activePhase]);

  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return activePoints;
    const q = searchQuery.toLowerCase();
    return activePoints.filter((pt) => pt.toLowerCase().includes(q));
  }, [activePoints, searchQuery]);

  const midPoint = Math.ceil(filteredPoints.length / 2);
  const leftPagePoints = filteredPoints.slice(0, midPoint);
  const rightPagePoints = filteredPoints.slice(midPoint);





  const handleSpeak = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const phaseTitle = PHASE_LABELS[activePhase]?.[activeLangCode] || activePhase.toUpperCase();
    const textToRead = `${currentEvent.nameKey}. ${phaseTitle}. ${filteredPoints.join(". ")}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const langMap: Record<string, string> = {
      en: "en-IN",
      hi: "hi-IN",
      bn: "bn-IN",
      mr: "mr-IN",
      ta: "ta-IN",
      te: "te-IN",
      gu: "gu-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      or: "or-IN",
      pa: "pa-IN",
      as: "as-IN",
    };
    utterance.lang = langMap[activeLangCode] || "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleBridgeToAction = (instructionText: string) => {
    const promptText = `NDMA Hazard Action Protocol: ${currentEvent.nameKey} (${activePhase.toUpperCase()}): ${instructionText}. Trigger emergency response and resource allocation.`;
    router.push(`/?prompt=${encodeURIComponent(promptText)}&category=disaster`);
  };

  const highlightMatch = (text: string) => {
    if (!searchQuery.trim()) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark
              key={index}
              className="bg-amber-300 dark:bg-amber-800 text-slate-900 dark:text-white px-0.5 rounded font-bold"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const phaseName = PHASE_LABELS[activePhase]?.[activeLangCode] || activePhase.toUpperCase();
  const hazardDisplayName = currentEvent.names[activeLangCode] || currentEvent.names.en || currentEvent.nameKey;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 relative">
      <div className="fixed left-2 bottom-6 z-40 flex flex-col items-center gap-2 print:hidden">
        <a
          href="https://x.com/ndmaindia"
          target="_blank"
          rel="noreferrer"
          title="NDMA India on X"
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform"
        >
          <span className="font-sans text-sm font-extrabold">𝕏</span>
        </a>

        <a
          href="https://facebook.com/ndma.india"
          target="_blank"
          rel="noreferrer"
          title="NDMA India on Facebook"
          className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center text-sm font-bold shadow-md hover:scale-110 transition-transform"
        >
          f
        </a>

        <a
          href="https://youtube.com/@NDMAIndia"
          target="_blank"
          rel="noreferrer"
          title="NDMA India YouTube"
          className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold shadow-md hover:scale-110 transition-transform"
        >
          ▶
        </a>

        <button
          type="button"
          onClick={scrollToTop}
          title="Back to Top"
          className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center shadow-md hover:bg-slate-50 transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
          <span className="text-[8px] font-black uppercase leading-none">TOP</span>
        </button>
      </div>

      <div className="fixed right-3 bottom-6 z-40 print:hidden">
        <a
          href={`tel:${currentEvent.helplinePhone || "112"}`}
          title={`Call Emergency Helpline: ${currentEvent.helpline}`}
          className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all ring-4 ring-blue-400/30"
        >
          <PhoneCall className="w-5 h-5 animate-pulse" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              NDMA Disaster Safety Protocols
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Official Do&apos;s and Don&apos;ts guidelines for rapid civil defense and survival
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Events:</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search"
                className="pl-8 pr-7 py-1.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs w-48 sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {FULL_NDMA_EVENTS.map((evt) => {
              const isSelected = evt.id === activeEventId;
              return (
                <button
                  key={evt.id}
                  type="button"
                  onClick={() => {
                    setActiveEventId(evt.id);
                    setSearchQuery("");
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                    isSelected
                      ? "bg-emerald-700 text-white ring-2 ring-emerald-500 shadow-sm"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {evt.nameKey}
                </button>
              );
            })}
          </div>
        </div>

        <div className="py-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {SCREENSHOT_LANGUAGES.map((langItem) => {
            const isSelected = activeLangCode === langItem.code;
            return (
              <button
                key={langItem.code}
                type="button"
                onClick={() => handleSelectLanguage(langItem.code)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-emerald-700 text-white ring-2 ring-emerald-400 shadow-xs"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {langItem.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-2 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5">
              {(["before", "during", "after"] as const).map((ph) => {
                const isCurrent = activePhase === ph;
                const label = PHASE_LABELS[ph]?.[activeLangCode] || ph.toUpperCase();
                return (
                  <button
                    key={ph}
                    type="button"
                    onClick={() => setActivePhase(ph)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                      isCurrent
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                type="button"
                onClick={handleSpeak}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  isSpeaking
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? "Stop Voice" : "Listen Guide"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 transition-colors"
                title="Print or export PDF booklet"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-2xl p-4 sm:p-7 min-h-[460px] flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none hidden md:block bg-gradient-to-r from-transparent via-slate-200/50 dark:via-slate-800/60 to-transparent border-x border-slate-200/40 dark:border-slate-800/40 shadow-inner" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div className="pr-0 md:pr-4 flex flex-col">
                <div className="text-center pb-3 border-b-2 border-slate-300 dark:border-slate-700 mb-4">
                  <h2 className="text-lg font-black tracking-widest uppercase text-slate-900 dark:text-white">
                    {currentEvent.nameKey.toUpperCase()}
                  </h2>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 border-b-2 border-blue-600 pb-0.5">
                    {phaseName} {currentEvent.nameKey.toUpperCase()}
                  </span>
                </div>

                {leftPagePoints.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center italic">
                    No matching survival steps for query &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  <ul className="space-y-3 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                    {leftPagePoints.map((pt, idx) => {
                      const itemKey = `${activeEventId}-${activePhase}-${idx}`;
                      const isDone = !!checkedItems[itemKey];
                      return (
                        <li key={idx} className="flex items-start gap-2.5 group">
                          <button
                            type="button"
                            onClick={() => toggleCheckItem(itemKey)}
                            className="mt-0.5 text-blue-600 hover:text-blue-800 shrink-0"
                            title="Mark as completed checklist step"
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <span className={isDone ? "line-through text-slate-400" : ""}>
                              {highlightMatch(pt)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleBridgeToAction(pt)}
                              className="ml-2 text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 underline font-bold print:hidden"
                              title="Bridge to AI Command Center"
                            >
                              ⚡ Bridge Action
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="pl-0 md:pl-4 flex flex-col border-t md:border-t-0 pt-4 md:pt-0 border-slate-200 dark:border-slate-800">
                <div className="text-center pb-3 border-b-2 border-slate-300 dark:border-slate-700 mb-4 hidden md:block">
                  <h2 className="text-lg font-black tracking-widest uppercase text-slate-900 dark:text-white">
                    {currentEvent.nameKey.toUpperCase()}
                  </h2>
                </div>

                <div className="mb-3 hidden md:block">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    ACTION PROTOCOLS (CONT.)
                  </span>
                </div>

                {rightPagePoints.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center italic">
                    {leftPagePoints.length === 0 ? "" : "All matching steps shown on left page."}
                  </p>
                ) : (
                  <ul className="space-y-3 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                    {rightPagePoints.map((pt, idx) => {
                      const itemKey = `${activeEventId}-${activePhase}-${midPoint + idx}`;
                      const isDone = !!checkedItems[itemKey];
                      return (
                        <li key={idx} className="flex items-start gap-2.5 group">
                          <button
                            type="button"
                            onClick={() => toggleCheckItem(itemKey)}
                            className="mt-0.5 text-blue-600 hover:text-blue-800 shrink-0"
                            title="Mark as completed checklist step"
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <span className={isDone ? "line-through text-slate-400" : ""}>
                              {highlightMatch(pt)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleBridgeToAction(pt)}
                              className="ml-2 text-[10px] text-blue-600 hover:text-blue-700 dark:text-blue-400 underline font-bold print:hidden"
                              title="Bridge to AI Command Center"
                            >
                              ⚡ Bridge Action
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  National Disaster Management Authority (NDMA)
                </span>
                <span>•</span>
                <span>Official Civil Defense Manual</span>
              </div>
              <div className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                Emergency Helpline: {currentEvent.helplinePhone} / 112
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Emergency Direct Hotlines</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">24x7 Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:112"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 transition-colors flex flex-col"
              >
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">National Emergency</span>
                <span className="font-mono font-bold text-sm text-emerald-600">112</span>
              </a>
              <a
                href="tel:1078"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 transition-colors flex flex-col"
              >
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">NDRF Disaster Helpline</span>
                <span className="font-mono font-bold text-sm text-blue-600">1078</span>
              </a>
              <a
                href="tel:1070"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 transition-colors flex flex-col"
              >
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">State Relief Control</span>
                <span className="font-mono font-bold text-sm text-amber-600">1070</span>
              </a>
              <a
                href="tel:108"
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-emerald-500 transition-colors flex flex-col"
              >
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Medical Trauma Ambulance</span>
                <span className="font-mono font-bold text-sm text-red-600">108</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Official NDMA Evacuation Go-Bag</span>
            </div>
            <ul className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Waterproof pouch for Aadhaar, property deeds & IDs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>20L drinking water & 3-day dry high-calorie rations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Battery torch, spare alkaline cells & manual radio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Trauma bandage kit, antiseptic & chronic prescriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Loud whistle for acoustic location by rescue marshals</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Universal Bridge Integration</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
              Need immediate emergency action on the ground? Send this disaster scenario directly to our verified life-saving dispatch protocol.
            </p>
            <button
              type="button"
              onClick={() => {
                const text = `Urgent evacuation and emergency assistance needed for ${hazardDisplayName} in our sector. Requesting SDRF / NDRF coordination immediately.`;
                router.push(`/?prompt=${encodeURIComponent(text)}&category=disaster`);
              }}
              className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>⚡ Launch AI Bridge for {currentEvent.nameKey}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
