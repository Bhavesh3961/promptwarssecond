"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getSubmissionById, SubmissionItem } from "@/lib/firestore";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, ArrowLeft, Printer, AlertTriangle, Layers, BookOpen, ShieldAlert } from "lucide-react";
import NdmaDosDontsModal from "@/components/NdmaDosDontsModal";

export default function VerifyPage() {
  const params = useParams();
  const id = params?.id as string;
  const { t } = useLanguage();

  const [data, setData] = useState<SubmissionItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [dosDontsOpen, setDosDontsOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      const res = await getSubmissionById(id);
      setData(res);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-md mx-auto my-24 text-center space-y-2 font-mono text-xs text-zinc-500">
        <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div>Verifying cryptographic record in Firestore...</div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="max-w-md mx-auto my-20 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center space-y-3 font-mono shadow-sm">
        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Record Not Found</h2>
        <p className="text-xs text-zinc-500">
          Document [{id}] was not located in Firestore index.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold"
        >
          <ArrowLeft className="w-3 h-3" /> Back
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto my-12 px-4 space-y-4">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> {t("certReturnBtn")}
      </Link>

      <article className="bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
        <header className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block">
                {t("certVerifiedBadge")}
              </span>
              <h1 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {t("certVerifiedTitle")}
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            title={t("certPrintBtn")}
            aria-label={t("certPrintBtn")}
          >
            <Printer className="w-4 h-4" />
          </button>
        </header>

        <section aria-label="QR Certificate" className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="bg-white p-2.5 rounded-xl shrink-0 shadow-xs border border-zinc-200">
            <QRCodeSVG
              value={typeof window !== "undefined" ? window.location.href : ""}
              size={96}
              level="H"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left font-mono text-xs">
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-semibold">
              {t("certDocKey")}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold break-all select-all">
              {data.id}
            </span>
            <div className="pt-1.5 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold">
                {data.category}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
                Status: {data.status}
              </span>
              {data.structuredAction?.urgencyScore && (
                <span className="px-2 py-0.5 rounded-md text-[10px] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-semibold">
                  Score: {data.structuredAction.urgencyScore}/10
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md text-[10px] bg-zinc-100 dark:bg-zinc-800 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                CAP v1.2
              </span>
            </div>
          </div>
        </section>

        <section aria-label="Docket Specifications" className="space-y-3.5 text-xs divide-y divide-zinc-200 dark:divide-zinc-800">
          <div className="pt-2">
            <span className="text-zinc-500 font-mono text-[10px] uppercase font-semibold block">
              {t("incidentDirective")}
            </span>
            <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mt-0.5">{data.title}</p>
          </div>

          {data.rawInput && (
            <div className="pt-3">
              <span className="text-zinc-500 font-mono text-[10px] uppercase font-semibold block">
                {t("certOriginalInput")}
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 font-mono text-[11px] leading-relaxed mt-0.5 italic">
                &ldquo;{data.rawInput}&rdquo;
              </p>
            </div>
          )}

          {data.structuredAction && (
            <div className="pt-3 space-y-2">
              <span className="text-zinc-500 font-mono text-[10px] uppercase font-semibold block">
                {t("certCompiledAction")}
              </span>
              <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-1.5">
                <div className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px] font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 shrink-0" />
                  Target: {data.structuredAction.targetSystem}
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 font-sans text-xs">
                  {data.structuredAction.actionRequired}
                </p>
                {data.structuredAction.resources && data.structuredAction.resources.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {data.structuredAction.resources.map((res, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono text-zinc-700 dark:text-zinc-300">
                        {res}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="pt-3 grid grid-cols-2 gap-4 font-mono text-[11px]">
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-semibold block">
                {t("certOperator")}
              </span>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium mt-0.5">{data.userName}</p>
              <p className="text-zinc-500 text-[10px]">{data.userEmail}</p>
            </div>
            <div>
              <span className="text-zinc-500 text-[10px] uppercase font-semibold block">
                {t("certLedger")}
              </span>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">ITU-T X.1303 / NDMA CAP</p>
              <p className="text-zinc-500 text-[10px]">Audit Status: Verified</p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
              <span>NDMA SACHET Survival Standards</span>
            </span>
            <button
              type="button"
              onClick={() => setDosDontsOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-100"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t("ndmaDosDontsBtn")}</span>
            </button>
          </div>
        </section>
      </article>

      <NdmaDosDontsModal
        isOpen={dosDontsOpen}
        onClose={() => setDosDontsOpen(false)}
        defaultHazard="medical"
      />
    </main>
  );
}
