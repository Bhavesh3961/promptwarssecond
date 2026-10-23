import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DOMAIN_SEEDS } from "@/lib/domainSeeds";

export async function POST(req: NextRequest) {
  try {
    const { domain = "medical" } = await req.json().catch(() => ({ domain: "medical" }));
    const seeds = DOMAIN_SEEDS[domain] || DOMAIN_SEEDS.medical;

    const colRef = collection(db, "submissions");
    const ids: string[] = [];

    for (const item of seeds) {
      const docRef = await addDoc(colRef, {
        ...item,
        createdAt: serverTimestamp(),
      });
      ids.push(docRef.id);
    }

    return NextResponse.json({
      success: true,
      domain,
      insertedCount: ids.length,
      insertedIds: ids,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to seed records";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
