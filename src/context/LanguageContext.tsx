"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import {
  LanguageCode,
  LanguageInfo,
  SUPPORTED_LANGUAGES,
  translations,
  TranslationDictionary,
} from "@/locales";

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLangInfo: LanguageInfo;
  supportedLanguages: LanguageInfo[];
  t: (key: keyof TranslationDictionary) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  currentLanguage: "en",
  setLanguage: () => {},
  currentLangInfo: SUPPORTED_LANGUAGES[0],
  supportedLanguages: SUPPORTED_LANGUAGES,
  t: (key: keyof TranslationDictionary) => translations.en[key] || "",
});

const STORAGE_KEY = "jansetu_preferred_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && translations[saved]) {
        setLanguageState(saved);
        document.documentElement.lang = saved;
      }
    } catch {}
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    if (translations[lang]) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {}
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    }
  };

  const currentLangInfo = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((item) => item.code === language) || SUPPORTED_LANGUAGES[0];
  }, [language]);

  const t = (key: keyof TranslationDictionary): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || "";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        currentLangInfo,
        supportedLanguages: SUPPORTED_LANGUAGES,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
