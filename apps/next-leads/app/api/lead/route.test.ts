import { beforeEach, describe, expect, it } from "vitest";

import { POST } from "./route";

const validPayload = {
  nom: "Claire Martin",
  email: "claire@example.com",
  telephone: "+33 6 45 67 89 10",
  codePostal: "75002",
  ville: "Paris",
  typeBatiment: "House",
  typePrestation: "diagnostic-amiante",
  description: "Diagnostic complet du rez-de-chaussée et des combles avant rénovation.",
  delai: "< 7 jours",
  consentement: true,
  submitDelay: Date.now() - 5000,
  utm: {
    source: "test",
    medium: "email",
    campaign: "demo",
    term: null,
    content: null,
  },
  gclid: null,
  honeypot: "",
};

beforeEach(() => {
  process.env.SHEETS_WEBHOOK_URL = "";
  process.env.RECAPTCHA_SECRET_KEY = "";
});

describe("POST /api/lead", () => {
  it("retourne 200 pour une demande valide", async () => {
    const request = new Request("http://localhost/api/lead", {
      method: "POST",
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request as any);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.ok).toBe(true);
    expect(typeof body.leadScore).toBe("number");
  });

  it("retourne 422 pour un payload invalide", async () => {
    const request = new Request("http://localhost/api/lead", {
      method: "POST",
      body: JSON.stringify({ nom: "X" }),
    });

    const response = await POST(request as any);
    expect(response.status).toBe(422);
  });
});
