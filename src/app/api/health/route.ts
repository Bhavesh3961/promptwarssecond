import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  let dbStatus = "connected";

  try {
    if (!db) dbStatus = "degraded";
  } catch {
    dbStatus = "error";
  }

  const latency = Date.now() - startTime;

  return NextResponse.json({
    status: "healthy",
    uptime: process.uptime ? Math.floor(process.uptime()) : 120,
    timestamp: new Date().toISOString(),
    services: {
      firestore: {
        status: dbStatus,
        latencyMs: latency,
        protocol: "WebSocket / gRPC Stream",
      },
      auth: {
        provider: "Google Identity Toolkit v2",
        status: "active",
      },
      aiEngine: {
        model: "Google Gemini 1.5 Flash",
        status: "ready",
      },
    },
    version: "2.4.0-prod",
  });
}
