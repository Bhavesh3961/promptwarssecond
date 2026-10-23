"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  SubmissionItem,
  subscribeToSubmissions,
  updateSubmissionStatus,
} from "@/lib/firestore";
import {
  Database,
  ExternalLink,
  Plus,
  RefreshCw,
  Download,
  AlertTriangle,
  Layers,
} from "lucide-react";

export default function AdminPage() {
  const { t } = useLanguage();
  const [items, setItems] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("All");

  useEffect(() => {
    const unsubscribe = subscribeToSubmissions((data) => {
      setItems(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: SubmissionItem["status"]) => {
    try {
      await updateSubmissionStatus(id, newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: "medical" }),
      });
      if (!res.ok) throw new Error("Seed failed");
    } catch (err) {
      console.error(err);
      alert("Failed to inject records.");
    } finally {
      setSeeding(false);
    }
  };

  const criticalCount = items.filter((i) => i.priority === "Critical" || i.priority === "High").length;
  const dispatchedCount = items.filter((i) => i.status === "Units Dispatched").length;
  const resolvedCount = items.filter((i) => i.status === "Resolved").length;

  const filteredItems = items.filter((item) => {
    if (filterPriority === "All") return true;
    return item.priority === filterPriority;
  });

  const getStatusLabel = (status: SubmissionItem["status"]) => {
    switch (status) {
      case "Pending":
        return t("statusPending");
      case "Triage Verified":
        return t("statusTriageVerified");
      case "Units Dispatched":
        return t("statusUnitsDispatched");
      case "Resolved":
        return t("statusResolved");
      default:
        return status;
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>WebSocket Live Stream: submissions/</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {t("navAdmin")}
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {t("heroSubtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/export?format=csv"
            download
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono rounded-xl border border-zinc-300 dark:border-zinc-800 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-zinc-500" />
            <span>{t("exportCsv")}</span>
          </a>

          <button
            type="button"
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-semibold rounded-xl transition-colors disabled:opacity-50 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{seeding ? "Injecting..." : t("seedIncidents")}</span>
          </button>
        </div>
      </header>

      <section aria-label="Incident Metrics" className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] text-zinc-500 uppercase tracking-wider">{t("totalIntakes")}</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{items.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] text-red-500 uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            {t("criticalTriage")}
          </span>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{criticalCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] text-blue-500 uppercase tracking-wider">{t("unitsDispatched")}</span>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{dispatchedCount}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
          <span className="text-[11px] text-emerald-500 uppercase tracking-wider">{t("protocolResolved")}</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{resolvedCount}</div>
        </div>
      </section>

      <section aria-label="Dispatch Queue" className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/40 shadow-xs">
        <div className="px-5 py-3.5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-zinc-700 dark:text-zinc-300 flex items-center gap-2 font-semibold">
              <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t("actionOutputTitle")}</span>
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-zinc-500">{t("filterPriority")}:</span>
              {["All", "Critical", "High", "Medium", "Low"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFilterPriority(lvl)}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    filterPriority === lvl
                      ? "bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-950 font-bold"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          <span className="text-zinc-500 font-mono">{filteredItems.length} records</span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-zinc-500 text-xs font-mono space-y-2">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-600 dark:text-emerald-400" />
            <div>Synchronizing Cloud Firestore sockets...</div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <p className="text-zinc-500 text-xs font-mono">No matching records found.</p>
            <button
              type="button"
              onClick={handleSeed}
              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-mono font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {t("seedIncidents")}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-zinc-950/70 text-zinc-600 dark:text-zinc-400 font-mono uppercase text-[10px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-5">{t("incidentDirective")}</th>
                  <th className="py-3 px-5">{t("targetSystem")}</th>
                  <th className="py-3 px-5">{t("actionProtocol")}</th>
                  <th className="py-3 px-5">{t("priorityLevel")}</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800/60 font-sans">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-zinc-850/50 transition-colors">
                    <td className="py-3.5 px-5 max-w-xs">
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</div>
                      {item.rawInput && (
                        <div className="text-[11px] text-zinc-500 font-mono line-clamp-1 mt-0.5 italic">
                          &ldquo;{item.rawInput}&rdquo;
                        </div>
                      )}
                      <div className="text-[10px] text-zinc-400 font-mono mt-1">
                        By: {item.userName || "Field Responder"}
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="text-emerald-700 dark:text-emerald-400 font-medium text-xs flex items-center gap-1 font-mono">
                        <Layers className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.structuredAction?.targetSystem || item.category}</span>
                      </div>
                      {item.structuredAction?.urgencyScore && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {t("urgencyScore")}: {item.structuredAction.urgencyScore}/10
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 max-w-sm">
                      <p className="text-zinc-700 dark:text-zinc-300 text-xs line-clamp-2">
                        {item.structuredAction?.actionRequired || item.description}
                      </p>
                      {item.structuredAction?.resources && item.structuredAction.resources.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.structuredAction.resources.slice(0, 2).map((res, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-700 dark:text-zinc-300 font-mono">
                              {res}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-5 font-mono text-[11px]">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                            item.priority === "Critical"
                              ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                          }`}
                        >
                          {item.priority}
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                              item.status === "Units Dispatched"
                                ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                                : item.status === "Resolved"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : item.status === "Triage Verified"
                                ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {getStatusLabel(item.status)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-right space-x-2 font-mono">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item.id!, e.target.value as SubmissionItem["status"])
                        }
                        aria-label={`Update status for ${item.title}`}
                        className="bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Pending">{t("statusPending")}</option>
                        <option value="Triage Verified">{t("statusTriageVerified")}</option>
                        <option value="Units Dispatched">{t("statusUnitsDispatched")}</option>
                        <option value="Resolved">{t("statusResolved")}</option>
                      </select>

                      <Link
                        href={`/verify/${item.id}`}
                        target="_blank"
                        className="inline-flex items-center p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 rounded transition-colors"
                        title={t("openDocketBtn")}
                        aria-label={`${t("openDocketBtn")} for ${item.title}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
