export const DEFAULT_BRAND_NAME = "Desamiant'Pro";
export const DEFAULT_PRIMARY_COLOR = "#0E7490";

export const brand = {
  name: process.env.BRAND_NAME ?? DEFAULT_BRAND_NAME,
  primaryColor: process.env.PRIMARY_COLOR ?? DEFAULT_PRIMARY_COLOR,
};

export type BrandConfig = typeof brand;
