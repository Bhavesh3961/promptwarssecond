"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { LanguageCode } from "@/locales";

export default function LanguageSelector() {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="lang-select" className="sr-only">
        Select Language
      </label>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 text-xs font-medium shadow-xs">
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <select
          id="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="bg-transparent text-zinc-800 dark:text-zinc-200 text-xs font-medium focus:outline-none cursor-pointer pr-1"
        >
          {supportedLanguages.map((l) => (
            <option
              key={l.code}
              value={l.code}
              className="bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 py-1"
            >
              {l.nativeName} ({l.name})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
