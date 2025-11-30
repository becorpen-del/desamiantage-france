import { NextResponse } from "next/server";

import { MIN_SUBMIT_DELAY_MS } from "@/lib/utils";
import { containsBannedWord, leadSchema, scoreLead } from "@/lib/validators";

import type { NextRequest } from "next/server";

const RATE_LIMIT_WINDOW_MS = 15_000;
const rateLimiter = new Map<string, number>();

function isRateLimited(ip: string): boolean {
  if (!ip) {
    return false;
  }

  const now = Date.now();
  const lastRequest = rateLimiter.get(ip);
  if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimiter.set(ip, now);

  // Clean up old entries
  for (const [key, value] of rateLimiter.entries()) {
    if (now - value > RATE_LIMIT_WINDOW_MS * 4) {
      rateLimiter.delete(key);
    }
  }

  return false;
}

async function verifyRecaptcha(token: string | null | undefined, remoteIp: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret || !token) {
    return true;
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp ?? "",
    });

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = (await response.json()) as { success: boolean; score?: number };

    return Boolean(data.success && (data.score ?? 0) > 0.5);
  } catch (error) {
    console.error("Erreur reCAPTCHA", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 25_000) {
      return NextResponse.json({ error: "Payload trop volumineux." }, { status: 413 });
    }

    const payload = (await request.json()) as unknown;
    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload invalide", details: parsed.error.flatten() },
        { status: 422 },
      );
    }

    const lead = parsed.data;

    if (lead.honeypot && lead.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const elapsed = Date.now() - lead.submitDelay;
    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      return NextResponse.json({ error: "Soumission trop rapide" }, { status: 429 });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "";
    const userAgent = request.headers.get("user-agent") ?? "";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
    }

    if (containsBannedWord(lead.nom) || containsBannedWord(lead.description)) {
      return NextResponse.json({ error: "Contenu refusé." }, { status: 400 });
    }

    const recaptchaOk = await verifyRecaptcha(lead.recaptchaToken, ip);

    if (!recaptchaOk) {
      return NextResponse.json({ error: "Vérification reCAPTCHA échouée" }, { status: 400 });
    }

    const webhookUrl = process.env.SHEETS_WEBHOOK_URL;
    const leadForExport = { ...lead } as Record<string, unknown>;
    delete leadForExport.honeypot;
    delete leadForExport.recaptchaToken;
    delete leadForExport.submitDelay;
    const leadScore = scoreLead(lead);
    const payloadForSheets = {
      ...leadForExport,
      utm: lead.utm ?? {},
      gclid: lead.gclid ?? "",
      leadScore,
      userAgent,
      ip,
    };

    if (!webhookUrl) {
      console.warn("SHEETS_WEBHOOK_URL non configuré");
    } else {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadForSheets),
      });

      if (!response.ok) {
        console.error("Webhook Sheets en erreur", response.status);
        return NextResponse.json(
          { error: "Impossible d'enregistrer la demande" },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true, leadScore });
  } catch (error) {
    console.error("Erreur API lead", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
