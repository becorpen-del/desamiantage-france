import { describe, expect, it } from "vitest";

import { leadSchema } from "./validators";

const basePayload = {
  nom: "Jean Dupont",
  email: "jean@example.com",
  telephone: "+33 6 12 34 56 78",
  codePostal: "75001",
  ville: "Paris",
  typeBatiment: "House" as const,
  typePrestation: "diagnostic-amiante",
  description: "Inspection complète de la maison avec repérage des cloisons et de la toiture.",
  delai: "< 7 jours" as const,
  consentement: true as const,
  submitDelay: Date.now(),
  utm: {},
  gclid: null,
};

describe("leadSchema", () => {
  it("valide une charge utile complète", () => {
    const result = leadSchema.safeParse(basePayload);
    expect(result.success).toBe(true);
  });

  it("rejette un email invalide", () => {
    const result = leadSchema.safeParse({ ...basePayload, email: "invalid" });
    expect(result.success).toBe(false);
  });

  it("impose une description minimale", () => {
    const result = leadSchema.safeParse({ ...basePayload, description: "Trop court" });
    expect(result.success).toBe(false);
  });

  it("rejette un numéro de téléphone trop court", () => {
    const result = leadSchema.safeParse({ ...basePayload, telephone: "0612" });
    expect(result.success).toBe(false);
  });
});
