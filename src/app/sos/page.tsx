"use client";

import { useState, useEffect } from "react";
import {
  PhoneCall,
  Navigation,
  MapPin,
  Copy,
  Check,
  AlertCircle,
  Shield,
  Ambulance,
  Flame,
  Radio,
  Car,
} from "lucide-react";
import {
  getEmergencyContactsForLocation,
  RegionEmergencyData,
  EmergencyContact,
} from "@/lib/emergency-contacts";

export default function SosPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [data, setData] = useState<RegionEmergencyData>(() =>
    getEmergencyContactsForLocation(null, null)
  );

  const detectLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocError("GPS not supported. Showing Pan-India helplines.");
      return;
    }

    setLocating(true);
    setLocError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setData(getEmergencyContactsForLocation(lat, lng));
        setLocating(false);
      },
      () => {
        setLocError("Location access denied or unavailable. Showing Pan-India helplines.");
        setLocating(false);
        setData(getEmergencyContactsForLocation(null, null));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  const copyCoordinates = () => {
    if (!coords) return;
    const text = `SOS Emergency Location: ${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)} (${data.regionName})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (cat: EmergencyContact["category"]) => {
    switch (cat) {
      case "medical":
        return <Ambulance className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case "police":
        return <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "fire":
        return <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "disaster":
        return <Radio className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "traffic":
        return <Car className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <PhoneCall className="w-5 h-5 text-red-600 dark:text-red-400" />;
    }
  };

  return (
    <main className="min-h-screen py-6 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-3xl glass-card border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Emergency Helplines
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>{data.regionName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {coords && (
            <button
              type="button"
              onClick={copyCoordinates}
              className="px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy GPS"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={detectLocation}
            disabled={locating}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? "animate-spin text-emerald-400" : ""}`} />
            <span>{locating ? "Locating..." : "Refresh Location"}</span>
          </button>
        </div>
      </div>

      {locError && (
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{locError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {data.contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.telUri}
            className={`p-4 rounded-3xl border transition-all flex items-center justify-between gap-3 group focus:outline-none ${
              contact.isPrimary
                ? "bg-red-500 text-white border-red-600 shadow-lg hover:bg-red-600 hover:scale-[1.01]"
                : "glass-card text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01]"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                  contact.isPrimary
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {getCategoryIcon(contact.category)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold truncate">{contact.name}</h3>
                  {contact.isPrimary && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-white/25 rounded font-black uppercase">
                      Primary
                    </span>
                  )}
                </div>
                <p
                  className={`text-xs mt-0.5 truncate ${
                    contact.isPrimary ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {contact.desc}
                </p>
              </div>
            </div>

            <div
              className={`px-3 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shrink-0 ${
                contact.isPrimary
                  ? "bg-white text-red-600 shadow-xs"
                  : "bg-slate-900 text-white dark:bg-white dark:text-slate-900 group-hover:bg-red-600 group-hover:text-white transition-colors"
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{contact.phone}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
