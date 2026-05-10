import { NextResponse } from "next/server";
import { AUDIENCES, WORK_MODES, type AssessmentPayload } from "@/lib/assessment";
import { appendAssessmentRow } from "@/lib/google-sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isStr(v: unknown, max = 5000): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= max;
}

function validate(input: unknown): AssessmentPayload | { error: string } {
  if (!input || typeof input !== "object") return { error: "Invalid body" };
  const r = input as Record<string, unknown>;
  if (!isStr(r.audience, 64) || !AUDIENCES.includes(r.audience as never))
    return { error: "audience" };
  if (!isStr(r.workMode, 32) || !WORK_MODES.includes(r.workMode as never))
    return { error: "workMode" };
  const commitment = Number(r.commitment);
  if (!Number.isInteger(commitment) || commitment < 1 || commitment > 10)
    return { error: "commitment" };
  if (!isStr(r.email, 320) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email))
    return { error: "email" };
  for (const k of [
    "challenge",
    "duration",
    "triedBefore",
    "successPicture",
    "cost",
    "source",
    "nextStep",
  ] as const) {
    if (!isStr(r[k])) return { error: k };
  }
  return {
    audience: r.audience as AssessmentPayload["audience"],
    challenge: r.challenge as string,
    duration: r.duration as string,
    triedBefore: r.triedBefore as string,
    successPicture: r.successPicture as string,
    cost: r.cost as string,
    commitment,
    workMode: r.workMode as AssessmentPayload["workMode"],
    source: r.source as string,
    nextStep: r.nextStep as string,
    email: r.email as string,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validate(body);
  if ("error" in result) {
    return NextResponse.json(
      { error: `Invalid field: ${result.error}` },
      { status: 422 }
    );
  }

  const payload: AssessmentPayload = {
    ...result,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };

  // Best-effort Sheets write. Stub returns "not-configured" until creds exist.
  const append = await appendAssessmentRow(payload);
  if (!append.ok && append.reason === "error") {
    console.error("[assessment] sheets append failed", append.message);
  }

  return NextResponse.json({
    ok: true,
    persisted: append.ok,
    pending: !append.ok && append.reason === "not-configured",
  });
}
