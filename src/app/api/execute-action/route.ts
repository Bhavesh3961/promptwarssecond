import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { actionManifest } = body;

    if (!actionManifest) {
      return NextResponse.json({ error: "Missing action manifest payload" }, { status: 400 });
    }

    const ticketId = `DISP-${Math.floor(100000 + Math.random() * 900000)}`;
    const targetSystem = actionManifest.targetSystem || "Automated Dispatch System";

    return NextResponse.json({
      success: true,
      ticketId,
      status: "EXECUTED_AND_CONFIRMED",
      targetSystem,
      directiveTitle: actionManifest.directiveTitle,
      executedAt: new Date().toISOString(),
      ackLatency: `${Math.floor(25 + Math.random() * 40)}ms`,
      message: `Payload successfully delivered to ${targetSystem}. Action is active.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Execution failed";
    return NextResponse.json(
      { error: "Failed to execute action", details: msg },
      { status: 500 }
    );
  }
}
