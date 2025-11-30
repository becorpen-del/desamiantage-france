export const SERVICES = [
  { slug: "diagnostic-amiante", name: "Diagnostic amiante" },
  { slug: "desamiantage-batiment", name: "Désamiantage bâtiment" },
  { slug: "desamiantage-toiture", name: "Désamiantage toiture" },
  { slug: "desamiantage-industriel", name: "Désamiantage industriel" }
] as const;

export type Service = (typeof SERVICES)[number];

export const CITIES = [
  { city: "Paris", dept: "75", cp: "75000", neighbors: ["Boulogne-Billancourt", "Saint-Denis"] },
  { city: "Lyon", dept: "69", cp: "69000", neighbors: ["Villeurbanne", "Vénissieux"] },
  { city: "Bordeaux", dept: "33", cp: "33000", neighbors: ["Mérignac", "Pessac"] }
] as const;

export type City = (typeof CITIES)[number];
