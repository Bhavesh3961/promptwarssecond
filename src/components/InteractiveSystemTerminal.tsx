"use client";

import { useState } from "react";
import {
  Car,
  Stethoscope,
  CloudRain,
  Zap,
  CheckCircle2,
  QrCode,
  Power,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface ActionManifestData {
  directiveTitle: string;
  domain: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  urgencyScore: number;
  targetSystem: string;
  immediateAction: string;
  resources: string[];
  verificationHash?: string;
  timestamp?: string;
  executionState?: "proposed" | "executing" | "executed" | "cancelled";
  ticketId?: string;
  executedAt?: string;
}

interface TerminalProps {
  manifest: ActionManifestData;
  onExecute: (ticketId: string) => void;
  onCancel: () => void;
}

export default function InteractiveSystemTerminal({
  manifest,
  onExecute,
  onCancel,
}: TerminalProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executed, setExecuted] = useState(manifest.executionState === "executed");
  const [ticketId, setTicketId] = useState(manifest.ticketId || "");
  const [copied, setCopied] = useState(false);

  const [trafficSignals, setTrafficSignals] = useState([
    { name: "Junction 1: Toll Plaza", status: "red", label: "Congested (8 min delay)" },
    { name: "Junction 2: Express Corridor", status: "red", label: "Heavy Flow" },
    { name: "Junction 3: Hospital Flyover", status: "red", label: "Signal Locked Red" },
    { name: "Junction 4: ER Emergency Gate", status: "green", label: "Clear" },
  ]);

  const [icuBeds, setIcuBeds] = useState([
    { id: "Bed 01", state: "Occupied (Trauma Pt)" },
    { id: "Bed 02", state: "Sanitizing" },
    { id: "Bed 03", state: "Available" },
    { id: "Bed 04", state: "Occupied (Cardiac Pt)" },
  ]);
  const [bedLocked, setBedLocked] = useState(false);

  const waterLevel = 206.14;
  const [cellAlertSent, setCellAlertSent] = useState(false);

  const [breakerActive, setBreakerActive] = useState(true);
  const [voltage, setVoltage] = useState(11000);

  const domainLower = (manifest.domain || "").toLowerCase();
  const isTraffic = domainLower.includes("traffic") || domainLower.includes("transit") || domainLower.includes("mobility");
  const isMedical = domainLower.includes("health") || domainLower.includes("medical");
  const isDisaster = domainLower.includes("disaster") || domainLower.includes("weather") || domainLower.includes("climate") || domainLower.includes("flood");
  const isCivic = domainLower.includes("civic") || domainLower.includes("power") || domainLower.includes("infrastructure");

  const playChirp = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  };

  const handleExecute = async () => {
    setIsExecuting(true);
    playChirp();

    try {
      const res = await fetch("/api/execute-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionManifest: manifest }),
      });
      const data = await res.json();
      const newTicketId = data.ticketId || `DISP-${Math.floor(100000 + Math.random() * 900000)}`;

      if (isTraffic) {
        setTrafficSignals([
          { name: "Junction 1: Toll Plaza", status: "green", label: "Toll Barrier Lifted • Fast-Track" },
          { name: "Junction 2: Express Corridor", status: "green", label: "Green Corridor Active" },
          { name: "Junction 3: Hospital Flyover", status: "green", label: "Traffic Diverted to Left" },
          { name: "Junction 4: ER Emergency Gate", status: "green", label: "Priority Docking Armed" },
        ]);
      } else if (isMedical) {
        setBedLocked(true);
        setIcuBeds((prev) =>
          prev.map((b) => (b.id === "Bed 03" ? { id: "Bed 03", state: "LOCKED & RESERVED (Emergency Anaphylaxis Pt)" } : b))
        );
      } else if (isDisaster) {
        setCellAlertSent(true);
      } else if (isCivic) {
        setBreakerActive(false);
        setVoltage(0);
      }

      setTicketId(newTicketId);
      setExecuted(true);
      onExecute(newTicketId);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6", "#f59e0b"],
      });
    } catch {
      alert("Failed to reach destination system gateway.");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyProof = () => {
    const proofText = JSON.stringify(
      {
        ticketId: ticketId || manifest.ticketId,
        directive: manifest.directiveTitle,
        system: manifest.targetSystem,
        status: "CONFIRMED_ACTIVE",
        signature: manifest.verificationHash,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    );
    navigator.clipboard.writeText(proofText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 p-4 sm:p-5 flex flex-col gap-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-xs font-black uppercase text-emerald-400 tracking-wider">
            Live Machine Interface: {manifest.targetSystem}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            {manifest.priority} Priority
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            Sig: {manifest.verificationHash}
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-sm sm:text-base font-extrabold text-white">
          {manifest.directiveTitle}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          {manifest.immediateAction}
        </p>
      </div>

      {isTraffic && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-emerald-400" />
              <span>ITMS Signal Corridor Route (Toll Plaza ➔ Apollo ER)</span>
            </span>
            <span className={`font-mono text-[11px] font-bold ${executed ? "text-emerald-400" : "text-amber-400"}`}>
              {executed ? "● GREEN WAVE LOCKED" : "○ SIGNALS ARMED"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {trafficSignals.map((sig, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                  sig.status === "green"
                    ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-200"
                    : "bg-red-950/30 border-red-900/60 text-red-200"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`w-3 h-3 rounded-full shrink-0 ${
                      sig.status === "green" ? "bg-emerald-500 shadow-sm shadow-emerald-500" : "bg-red-500"
                    }`}
                  />
                  <div className="truncate">
                    <p className="font-bold truncate">{sig.name}</p>
                    <p className="text-[10px] opacity-80 truncate">{sig.label}</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase">
                  {sig.status}
                </span>
              </div>
            ))}
          </div>

          {executed && (
            <div className="p-2.5 rounded-lg bg-emerald-900/20 border border-emerald-700/40 text-[11px] text-emerald-300 flex items-center justify-between font-mono">
              <span>Vehicle Speed: 72 km/h</span>
              <span>Corridor ETA: 8 mins</span>
              <span>Viability: Safe</span>
            </div>
          )}
        </div>
      )}

      {isMedical && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-blue-400" />
              <span>Pediatric ICU Bed Telemetry (Apollo Hospital Central)</span>
            </span>
            <span className={`font-mono text-[11px] font-bold ${bedLocked ? "text-emerald-400" : "text-amber-400"}`}>
              {bedLocked ? "● BED #03 RESERVED" : "○ STANDBY"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {icuBeds.map((bed, idx) => {
              const isLockedBed = bed.id === "Bed 03" && bedLocked;
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex flex-col gap-1 transition-all ${
                    isLockedBed
                      ? "bg-emerald-950/50 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50"
                      : "bg-slate-900 border-slate-800 text-slate-400"
                  }`}
                >
                  <span className="font-mono font-black text-[11px]">{bed.id}</span>
                  <span className="text-[10px] leading-tight font-medium">
                    {bed.state}
                  </span>
                </div>
              );
            })}
          </div>

          {bedLocked && (
            <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/60 text-[11px] text-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-blue-400" />
                <span className="font-mono">FHIR EHR Admission Pass #QR-84920 Generated</span>
              </div>
              <span className="font-mono font-bold text-emerald-400">Ventilator Armed</span>
            </div>
          )}
        </div>
      )}

      {isDisaster && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span>CWC River Gauge & ITU-T CAP Broadcaster</span>
            </span>
            <span className="font-mono text-red-400 font-bold">
              Level: {waterLevel}m (Danger: 205.80m)
            </span>
          </div>

          <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/60 text-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-300">Cell Broadcast Siren Simulator</span>
              <span className={`font-mono text-[10px] ${cellAlertSent ? "text-emerald-400" : "text-slate-400"}`}>
                {cellAlertSent ? "TRANSMITTED TO 42 TOWERS" : "PENDING BROADCAST"}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              [CIVIL EMERGENCY]: Evacuate river floodplains immediately. Rising waters breach danger threshold. 2 NDRF rescue dinghies deployed to Sector 18.
            </p>
          </div>
        </div>
      )}

      {isCivic && (
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-slate-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Municipal SCADA Power Substation Switch</span>
            </span>
            <span className={`font-mono text-[11px] font-bold ${breakerActive ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
              {breakerActive ? `● LIVE SPARKING (${voltage}V)` : "○ DE-ENERGIZED (0V SAFE)"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-200">Substation Feeder 4B (Main Bazar School)</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                Current: {breakerActive ? "142 Amps (Fault detected)" : "0.0 Amps (Isolated)"}
              </p>
            </div>
            <div className={`px-2.5 py-1 rounded font-mono font-black text-xs ${breakerActive ? "bg-red-600 text-white" : "bg-emerald-600 text-white"}`}>
              {breakerActive ? "BREAKER CLOSED" : "TRIPPED SAFE"}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {executed ? (
          <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-xs text-emerald-200 block">
                  Action Executed & Confirmed Active
                </span>
                <span className="font-mono text-[10px] text-emerald-400/80">
                  Ticket: {ticketId || manifest.ticketId} • Telemetry ACK in 38ms
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyProof}
              className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-100 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Proof JSON"}</span>
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleExecute}
              disabled={isExecuting}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
            >
              {isExecuting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Power className="w-4 h-4" />
              )}
              <span>{isExecuting ? "Transmitting Action..." : "Authorize & Execute Live Machine Action"}</span>
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="py-3 px-4 rounded-xl border border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-900 text-xs font-bold transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
