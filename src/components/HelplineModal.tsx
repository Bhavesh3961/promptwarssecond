"use client";

import { useLanguage } from "@/context/LanguageContext";
import { PhoneCall, X } from "lucide-react";
import { OFFICIAL_HELPLINES } from "@/lib/cap-protocol";

interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelplineModal({ isOpen, onClose }: HelplineModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-bold">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Unified Helplines • Government of India</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {t("allHelplinesBtn")}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Direct tap-to-call directory of all national and state emergency services verified under NDMA and ERSS-112.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {OFFICIAL_HELPLINES.map((item) => (
            <a
              key={item.number}
                href={`tel:${item.number}`}
                className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 transition-all flex items-start gap-3.5 group shadow-2xs hover:shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shrink-0 shadow-xs ${item.badgeColor}`}>
                  {item.number}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                      {item.name}
                    </h3>
                    <PhoneCall className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-600 shrink-0" />
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                    {item.agency}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </a>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 font-mono">
          <span>Standard: Emergency Response Support System (ERSS)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold hover:bg-zinc-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
