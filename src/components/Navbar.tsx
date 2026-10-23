"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import {
  LogOut,
  User as UserIcon,
  PhoneCall,
  Menu,
  X,
  MessageSquare,
  Radio,
  LifeBuoy,
  BookOpen,
} from "lucide-react";

const NAV_LOCALIZED: Record<string, Record<string, string>> = {
  bridge: {
    en: "Universal Bridge",
    hi: "यूनिवर्सल ब्रिज",
    bn: "ইউনিভার্সাল ব্রিজ",
    mr: "युनिव्हर्सल सेतू",
    ta: "யுனிவர்சல் பாலம்",
    te: "యూనివర్సల్ బ్రిడ్జ్",
    gu: "યુનિવર્સલ બ્રિજ",
    kn: "ಯುನಿವರ್ಸಲ್ ಸೇತುವೆ",
  },
  sos: {
    en: "1-Tap SOS",
    hi: "1-टैप सहायता",
    bn: "১-ট্যাপ জরুরি",
    mr: "१-टॅप मदत",
    ta: "1-தட்டு SOS",
    te: "1-ట్యాప్ అత్యవసరం",
    gu: "૧-ટેપ મદદ",
    kn: "1-ಟ್ಯಾಪ್ ತುರ್ತು",
  },
  alerts: {
    en: "Alerts",
    hi: "सचेत अलर्ट",
    bn: "সতর্কবার্তা",
    mr: "आपत्ती इशारे",
    ta: "எச்சரிக்கைகள்",
    te: "హెచ్చరికలు",
    gu: "ચેતવણીઓ",
    kn: "ಎಚ್ಚರಿಕೆಗಳು",
  },
  dosDonts: {
    en: "Dos & Don'ts",
    hi: "क्या करें / न करें",
    bn: "কী করবেন / না",
    mr: "काय करावे / नये",
    ta: "செய்ய / கூடாதவை",
    te: "చేయవలసినవి / వద్దు",
    gu: "શું કરવું / ન કરવું",
    kn: "ಮಾಡಬೇಕಾದ್ದು / ಬೇಡ",
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { t, currentLanguage, language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeLang = currentLanguage || language || "en";

  const navLinks = [
    {
      href: "/",
      label: NAV_LOCALIZED.bridge[activeLang] || "Universal Bridge",
      icon: MessageSquare,
    },
    {
      href: "/sos",
      label: NAV_LOCALIZED.sos[activeLang] || "1-Tap SOS",
      icon: LifeBuoy,
    },
    {
      href: "/alerts",
      label: NAV_LOCALIZED.alerts[activeLang] || "Alerts",
      icon: Radio,
    },
    {
      href: "/dos-donts",
      label: NAV_LOCALIZED.dosDonts[activeLang] || "Dos & Don'ts",
      icon: BookOpen,
    },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="AapdaSetu Emblem"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base leading-tight">
                AapdaSetu
              </span>
            </div>
          </Link>

          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const IconComp = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    active
                      ? "text-slate-900 dark:text-white bg-slate-200/70 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <ThemeToggle />

          <a
            href="tel:112"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>112</span>
          </a>

          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-8 h-8 rounded-full ring-1 ring-slate-300 dark:ring-slate-700 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium flex items-center justify-center text-xs">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => logout()}
                className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title={t("signOut")}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>{t("signIn")}</span>
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 glass-card border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            const IconComp = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl font-medium text-xs flex items-center justify-between ${
                  active
                    ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconComp className="w-4 h-4" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
          <a
            href="tel:112"
            className="mt-2 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Dial 112</span>
          </a>
        </div>
      )}
    </header>
  );
}
