import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "json";

    const colRef = collection(db, "submissions");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    if (format === "csv") {
      const headers = ["ID", "Title", "Category", "Priority", "Status", "Target System", "Action Required", "Operator", "Email"];
      const rows = items.map((raw) => {
        const i = raw as {
          id: string;
          title?: string;
          category?: string;
          priority?: string;
          status?: string;
          structuredAction?: { targetSystem?: string; actionRequired?: string };
          userName?: string;
          userEmail?: string;
        };
        return [
          `"${i.id}"`,
          `"${(i.title || "").replace(/"/g, '""')}"`,
          `"${i.category || ""}"`,
          `"${i.priority || ""}"`,
          `"${i.status || ""}"`,
          `"${(i.structuredAction?.targetSystem || "").replace(/"/g, '""')}"`,
          `"${(i.structuredAction?.actionRequired || "").replace(/"/g, '""')}"`,
          `"${i.userName || ""}"`,
          `"${i.userEmail || ""}"`,
        ];
      });

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="nexuscore-export-${Date.now()}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      count: items.length,
      timestamp: new Date().toISOString(),
      data: items,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to export data";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
