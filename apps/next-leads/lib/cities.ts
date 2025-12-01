export type CityKey = "paris" | "bordeaux" | "lyon" | "toulouse" | "nantes" | "marseille";

export const cities: Record<
  CityKey,
  {
    name: string;
    slug: CityKey;
    deptCode: string;
    geoPlacename: string;
    canonical: string;
    prosCount: number;
    priceAvgM2: string;
    responseDelay: string;
    postalFallback: string;
  }
> = {
  paris: {
    name: "Paris",
    slug: "paris",
    deptCode: "FR-75",
    geoPlacename: "Paris",
    canonical: "https://www.desamiantage-pro.fr/paris/",
    prosCount: 20,
    priceAvgM2: "50€/m²",
    responseDelay: "24h",
    postalFallback: "75000",
  },
  bordeaux: {
    name: "Bordeaux",
    slug: "bordeaux",
    deptCode: "FR-33",
    geoPlacename: "Bordeaux",
    canonical: "https://www.desamiantage-pro.fr/bordeaux/",
    prosCount: 12,
    priceAvgM2: "45€/m²",
    responseDelay: "24h",
    postalFallback: "33000",
  },
  lyon: {
    name: "Lyon",
    slug: "lyon",
    deptCode: "FR-69",
    geoPlacename: "Lyon",
    canonical: "https://www.desamiantage-pro.fr/lyon/",
    prosCount: 15,
    priceAvgM2: "45€/m²",
    responseDelay: "24h",
    postalFallback: "69000",
  },
  toulouse: {
    name: "Toulouse",
    slug: "toulouse",
    deptCode: "FR-31",
    geoPlacename: "Toulouse",
    canonical: "https://www.desamiantage-pro.fr/toulouse/",
    prosCount: 10,
    priceAvgM2: "43€/m²",
    responseDelay: "24h",
    postalFallback: "31000",
  },
  nantes: {
    name: "Nantes",
    slug: "nantes",
    deptCode: "FR-44",
    geoPlacename: "Nantes",
    canonical: "https://www.desamiantage-pro.fr/nantes/",
    prosCount: 9,
    priceAvgM2: "42€/m²",
    responseDelay: "24h",
    postalFallback: "44000",
  },
  marseille: {
    name: "Marseille",
    slug: "marseille",
    deptCode: "FR-13",
    geoPlacename: "Marseille",
    canonical: "https://www.desamiantage-pro.fr/marseille/",
    prosCount: 14,
    priceAvgM2: "48€/m²",
    responseDelay: "24h",
    postalFallback: "13000",
  },
};

export const cityList: CityKey[] = ["paris", "bordeaux", "lyon", "toulouse", "nantes", "marseille"];
