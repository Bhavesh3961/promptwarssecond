import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      aiEngine: {
        provider: "Google Gemini",
        configured: Boolean(process.env.GEMINI_API_KEY),
      },
    },
  });
}
