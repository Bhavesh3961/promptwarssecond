import { NextRequest, NextResponse } from "next/server";
import { validateProblemInput } from "@/lib/input-validator";

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  hi: "Hindi (हिन्दी)",
  bn: "Bengali (বাংলা)",
  mr: "Marathi (मराठी)",
  ta: "Tamil (தமிழ்)",
  te: "Telugu (తెలుగు)",
  gu: "Gujarati (ગુજરાતી)",
  kn: "Kannada (ಕನ್ನಡ)",
};

export async function POST(req: NextRequest) {
  try {
    const {
      text = "",
      domain = "general",
      language = "en",
      imageBase64 = null,
      imageMimeType = "image/jpeg",
    } = await req.json();

    const cleanText = (text || "").trim().slice(0, 1000);

    const validation = validateProblemInput(cleanText, !!imageBase64, language);
    if (!validation.isValid) {
      return NextResponse.json({
        isConversational: true,
        isRejected: true,
        reply: validation.reason,
        timestamp: new Date().toISOString(),
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }
    const langName = LANGUAGE_NAMES[language] || "English";

    const systemInstruction = `You are the Universal Bridge AI Engine for Societal Benefit.
Your job: Take messy real-world inputs (doctor handwriting, traffic roadblocks, storm damage, emergency voice transcripts, screenshots) and translate them into verified machine actions.
CRITICAL CONSTRAINTS:
1. Brevity: Keep the human 'reply' under 30 words (maximum 2-3 short bullet points). NO long paragraphs.
2. Language: Formulate the 'reply' in ${langName} script.
3. Machine Action: Produce a structured action manifest for downstream execution.

Respond ONLY with valid JSON matching this schema:
{
  "isConversational": false,
  "reply": "Ultra-short guidance in ${langName} (max 2 bullet points, under 30 words)",
  "actionManifest": {
    "directiveTitle": "Short directive name (under 6 words)",
    "domain": "Healthcare" | "Traffic & Transit" | "Disaster & Weather" | "Civic Infrastructure" | "Public Safety",
    "priority": "Critical" | "High" | "Medium" | "Low",
    "urgencyScore": 1-10,
    "targetSystem": "Target system (e.g. Hospital FHIR EHR, ITMS Green Corridor, ITU-T CAP Alert, Municipal Public Works)",
    "immediateAction": "Exact operational command to execute",
    "resources": ["Resource 1", "Resource 2"],
    "executionState": "proposed"
  }
}`;

    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];
    parts.push({
      text: `${systemInstruction}\n\nIncident Domain Context: ${domain}\nInput: "${cleanText || "Analyze the uploaded photo/screenshot for emergency societal action."}"`,
    });

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      parts.push({
        inlineData: {
          mimeType: imageMimeType || "image/jpeg",
          data: cleanBase64,
        },
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.15,
            maxOutputTokens: 600,
          },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: "Gemini API error", details: errText }, { status: 502 });
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(rawText);

    if (parsed.actionManifest) {
      parsed.actionManifest.verificationHash = "SIG-" + Math.random().toString(36).substring(2, 9).toUpperCase();
      parsed.actionManifest.timestamp = new Date().toISOString();
      parsed.actionManifest.executionState = "proposed";
    }
    parsed.timestamp = new Date().toISOString();

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: msg,
      },
      { status: 500 }
    );
  }
}
