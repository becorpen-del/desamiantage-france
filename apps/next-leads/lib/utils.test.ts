import { describe, expect, it } from "vitest";

import { slugify } from "./utils";

describe("slugify", () => {
  it("normalise les chaînes avec accents et espaces", () => {
    expect(slugify("Désamiantage Toiture")).toBe("desamiantage-toiture");
  });

  it("retire les caractères spéciaux", () => {
    expect(slugify("Diagnostic & Contrôle")).toBe("diagnostic-controle");
  });
});
