// Nom canonique avec accent ; on corrige les fautes de frappe type "Fraance" pour éviter des écarts SSR/CSR.
export const DEFAULT_BRAND_NAME = "Désamiantage-France";
export const DEFAULT_PRIMARY_COLOR = "#0E7490";

const brandNameFromEnv =
  process.env.NEXT_PUBLIC_BRAND_NAME ??
  process.env.BRAND_NAME ??
  DEFAULT_BRAND_NAME;

const primaryColorFromEnv =
  process.env.NEXT_PUBLIC_PRIMARY_COLOR ??
  process.env.PRIMARY_COLOR ??
  DEFAULT_PRIMARY_COLOR;

const normalizedBrandName = (brandNameFromEnv || "").normalize("NFC").replace(/Fraance/gi, "France");
const isDesamiantageFrance =
  normalizedBrandName.replace(/é/gi, "e").toLowerCase() === "desamiantage-france";

export const BRAND_NAME = isDesamiantageFrance ? DEFAULT_BRAND_NAME : normalizedBrandName || DEFAULT_BRAND_NAME;
export const BRAND_PRIMARY_COLOR = primaryColorFromEnv;

export const brand = {
  name: BRAND_NAME,
  primaryColor: BRAND_PRIMARY_COLOR,
};

export type BrandConfig = typeof brand;
