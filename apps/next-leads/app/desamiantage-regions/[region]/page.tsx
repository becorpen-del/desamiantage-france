/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { createMetadata, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { getBrandName, slugify } from "@/lib/utils";

import type { Metadata } from "next";

const brandName = getBrandName();

type Department = { name: string; price: string; cities: string[] };
type CityCard = { name: string; pop: string; price: string; demand?: string; cpc?: string; hot?: boolean };
type Region = {
  name: string;
  slug: string;
  companies: number;
  interventions: string;
  priceRange: string;
  departments: Department[];
  cities: CityCard[];
  neighbors: string[];
  note: string;
};

const regions: Region[] = [
  {
    name: "Île-de-France",
    slug: "ile-de-france",
    companies: 247,
    interventions: "43000 chantiers/an",
    priceRange: "50-70€/m²",
    note: "Coûts plus élevés en zone dense, logistique échafaudages et centres de traitement sollicités.",
    departments: [
      { name: "Paris (75)", price: "55-75€/m²", cities: ["Paris", "Boulogne-Billancourt"] },
      { name: "Hauts-de-Seine (92)", price: "50-70€/m²", cities: ["Nanterre", "Levallois-Perret"] },
      { name: "Seine-Saint-Denis (93)", price: "48-68€/m²", cities: ["Saint-Denis", "Montreuil"] },
      { name: "Val-de-Marne (94)", price: "48-68€/m²", cities: ["Créteil", "Vitry-sur-Seine"] },
      { name: "Yvelines (78)", price: "45-65€/m²", cities: ["Versailles", "Saint-Germain-en-Laye"] },
      { name: "Essonne (91)", price: "45-65€/m²", cities: ["Évry-Courcouronnes", "Massy"] },
      { name: "Val-d'Oise (95)", price: "45-62€/m²", cities: ["Cergy", "Argenteuil"] },
      { name: "Seine-et-Marne (77)", price: "42-60€/m²", cities: ["Meaux", "Melun"] },
    ],
    cities: [
      { name: "Paris", pop: "2,2M", price: "55-75€/m²", demand: "70 recherches/mois", cpc: "6,40€", hot: true },
      { name: "Boulogne-Billancourt", pop: "120k", price: "52-70€/m²" },
      { name: "Versailles", pop: "85k", price: "48-65€/m²" },
      { name: "Saint-Denis", pop: "113k", price: "48-68€/m²" },
      { name: "Nanterre", pop: "95k", price: "50-70€/m²" },
      { name: "Créteil", pop: "91k", price: "48-68€/m²" },
    ],
    neighbors: ["normandie", "centre-val-de-loire", "hauts-de-france"],
  },
  {
    name: "Auvergne-Rhône-Alpes",
    slug: "auvergne-rhone-alpes",
    companies: 198,
    interventions: "32000 chantiers/an",
    priceRange: "45-65€/m²",
    note: "Variations selon montagne/urbain, logistique nacelles en pente et météo.",
    departments: [
      { name: "Rhône (69)", price: "48-65€/m²", cities: ["Lyon", "Villeurbanne"] },
      { name: "Isère (38)", price: "45-62€/m²", cities: ["Grenoble", "Vienne"] },
      { name: "Haute-Savoie (74)", price: "50-70€/m²", cities: ["Annecy", "Thonon-les-Bains"] },
      { name: "Savoie (73)", price: "48-68€/m²", cities: ["Chambéry", "Albertville"] },
      { name: "Puy-de-Dôme (63)", price: "44-60€/m²", cities: ["Clermont-Ferrand", "Issoire"] },
    ],
    cities: [
      { name: "Lyon", pop: "522k", price: "48-65€/m²", demand: "60 recherches/mois", cpc: "4,10€", hot: true },
      { name: "Grenoble", pop: "158k", price: "46-63€/m²" },
      { name: "Clermont-Ferrand", pop: "146k", price: "44-60€/m²" },
      { name: "Annecy", pop: "130k", price: "50-70€/m²" },
      { name: "Saint-Étienne", pop: "172k", price: "44-60€/m²" },
      { name: "Chambéry", pop: "59k", price: "48-68€/m²" },
    ],
    neighbors: ["bourgogne-franche-comte", "provence-alpes-cote-d-azur", "occitanie", "nouvelle-aquitaine"],
  },
  {
    name: "Nouvelle-Aquitaine",
    slug: "nouvelle-aquitaine",
    companies: 156,
    interventions: "21000 chantiers/an",
    priceRange: "42-60€/m²",
    note: "Grandes distances vers centres de traitement, prise en compte du littoral Atlantique.",
    departments: [
      { name: "Gironde (33)", price: "45-62€/m²", cities: ["Bordeaux", "Mérignac"] },
      { name: "Pyrénées-Atlantiques (64)", price: "44-60€/m²", cities: ["Pau", "Bayonne"] },
      { name: "Haute-Vienne (87)", price: "40-55€/m²", cities: ["Limoges"] },
      { name: "Charente-Maritime (17)", price: "42-58€/m²", cities: ["La Rochelle", "Saintes"] },
      { name: "Dordogne (24)", price: "40-55€/m²", cities: ["Périgueux", "Bergerac"] },
    ],
    cities: [
      { name: "Bordeaux", pop: "254k", price: "45-62€/m²", demand: "30 recherches/mois", cpc: "6,40€", hot: true },
      { name: "Limoges", pop: "130k", price: "40-55€/m²" },
      { name: "Pau", pop: "76k", price: "44-60€/m²" },
      { name: "La Rochelle", pop: "76k", price: "42-58€/m²" },
      { name: "Poitiers", pop: "90k", price: "42-58€/m²" },
      { name: "Bayonne", pop: "52k", price: "44-60€/m²" },
    ],
    neighbors: ["occitanie", "centre-val-de-loire", "pays-de-la-loire"],
  },
  {
    name: "Occitanie",
    slug: "occitanie",
    companies: 144,
    interventions: "19000 chantiers/an",
    priceRange: "43-62€/m²",
    note: "Ample littoral et zones industrielles, contraintes de vent et chaleur estivale.",
    departments: [
      { name: "Haute-Garonne (31)", price: "44-62€/m²", cities: ["Toulouse", "Colomiers"] },
      { name: "Hérault (34)", price: "44-62€/m²", cities: ["Montpellier", "Béziers"] },
      { name: "Gard (30)", price: "43-60€/m²", cities: ["Nîmes", "Alès"] },
      { name: "Pyrénées-Orientales (66)", price: "42-58€/m²", cities: ["Perpignan"] },
      { name: "Aude (11)", price: "42-58€/m²", cities: ["Carcassonne", "Narbonne"] },
    ],
    cities: [
      { name: "Toulouse", pop: "498k", price: "44-62€/m²", demand: "40 recherches/mois" },
      { name: "Montpellier", pop: "300k", price: "44-62€/m²" },
      { name: "Nîmes", pop: "150k", price: "43-60€/m²" },
      { name: "Perpignan", pop: "120k", price: "42-58€/m²" },
      { name: "Béziers", pop: "78k", price: "44-60€/m²" },
      { name: "Narbonne", pop: "54k", price: "42-58€/m²" },
    ],
    neighbors: ["provence-alpes-cote-d-azur", "nouvelle-aquitaine", "auvergne-rhone-alpes"],
  },
  {
    name: "Provence-Alpes-Côte d'Azur",
    slug: "provence-alpes-cote-d-azur",
    companies: 131,
    interventions: "18500 chantiers/an",
    priceRange: "48-68€/m²",
    note: "Prix tirés vers le haut en zones littorales et montagneuses, forte coactivité urbaine.",
    departments: [
      { name: "Bouches-du-Rhône (13)", price: "48-68€/m²", cities: ["Marseille", "Aix-en-Provence"] },
      { name: "Alpes-Maritimes (06)", price: "50-70€/m²", cities: ["Nice", "Cannes"] },
      { name: "Var (83)", price: "48-66€/m²", cities: ["Toulon", "Fréjus"] },
      { name: "Vaucluse (84)", price: "45-62€/m²", cities: ["Avignon"] },
      { name: "Hautes-Alpes (05)", price: "50-70€/m²", cities: ["Gap", "Briançon"] },
    ],
    cities: [
      { name: "Marseille", pop: "870k", price: "48-68€/m²", demand: "50 recherches/mois" },
      { name: "Nice", pop: "340k", price: "50-70€/m²" },
      { name: "Toulon", pop: "180k", price: "48-66€/m²" },
      { name: "Avignon", pop: "90k", price: "45-62€/m²" },
      { name: "Cannes", pop: "74k", price: "50-70€/m²" },
      { name: "Aix-en-Provence", pop: "146k", price: "48-68€/m²" },
    ],
    neighbors: ["occitanie", "auvergne-rhone-alpes"],
  },
  {
    name: "Hauts-de-France",
    slug: "hauts-de-france",
    companies: 122,
    interventions: "17500 chantiers/an",
    priceRange: "40-58€/m²",
    note: "Présence d'anciens sites industriels, logistique facilitée vers la Belgique et centres régionaux.",
    departments: [
      { name: "Nord (59)", price: "40-58€/m²", cities: ["Lille", "Roubaix"] },
      { name: "Pas-de-Calais (62)", price: "40-56€/m²", cities: ["Arras", "Calais"] },
      { name: "Oise (60)", price: "42-58€/m²", cities: ["Beauvais", "Compiègne"] },
      { name: "Somme (80)", price: "42-58€/m²", cities: ["Amiens", "Abbeville"] },
      { name: "Aisne (02)", price: "42-56€/m²", cities: ["Soissons", "Laon"] },
    ],
    cities: [
      { name: "Lille", pop: "236k", price: "40-58€/m²", demand: "35 recherches/mois" },
      { name: "Amiens", pop: "134k", price: "42-58€/m²" },
      { name: "Roubaix", pop: "98k", price: "40-56€/m²" },
      { name: "Tourcoing", pop: "98k", price: "40-56€/m²" },
      { name: "Dunkerque", pop: "86k", price: "40-56€/m²" },
      { name: "Calais", pop: "73k", price: "40-56€/m²" },
    ],
    neighbors: ["ile-de-france", "normandie", "grand-est"],
  },
  {
    name: "Grand Est",
    slug: "grand-est",
    companies: 118,
    interventions: "16000 chantiers/an",
    priceRange: "42-60€/m²",
    note: "Sites industriels et tertiaires, météo hivernale à anticiper pour la mise hors d'eau.",
    departments: [
      { name: "Bas-Rhin (67)", price: "44-62€/m²", cities: ["Strasbourg", "Haguenau"] },
      { name: "Haut-Rhin (68)", price: "44-60€/m²", cities: ["Mulhouse", "Colmar"] },
      { name: "Marne (51)", price: "42-58€/m²", cities: ["Reims", "Châlons-en-Champagne"] },
      { name: "Moselle (57)", price: "42-60€/m²", cities: ["Metz", "Thionville"] },
      { name: "Meurthe-et-Moselle (54)", price: "42-58€/m²", cities: ["Nancy"] },
    ],
    cities: [
      { name: "Strasbourg", pop: "287k", price: "44-62€/m²", demand: "30 recherches/mois" },
      { name: "Reims", pop: "182k", price: "42-58€/m²" },
      { name: "Metz", pop: "116k", price: "42-60€/m²" },
      { name: "Nancy", pop: "104k", price: "42-58€/m²" },
      { name: "Mulhouse", pop: "108k", price: "44-60€/m²" },
      { name: "Colmar", pop: "70k", price: "44-60€/m²" },
    ],
    neighbors: ["bourgogne-franche-comte", "ile-de-france", "hauts-de-france"],
  },
  {
    name: "Bretagne",
    slug: "bretagne",
    companies: 86,
    interventions: "11000 chantiers/an",
    priceRange: "41-57€/m²",
    note: "Exposition saline sur le littoral, nombreux bâtiments tertiaires et agricoles.",
    departments: [
      { name: "Ille-et-Vilaine (35)", price: "41-57€/m²", cities: ["Rennes", "Saint-Malo"] },
      { name: "Finistère (29)", price: "41-56€/m²", cities: ["Brest", "Quimper"] },
      { name: "Morbihan (56)", price: "41-56€/m²", cities: ["Vannes", "Lorient"] },
      { name: "Côtes-d'Armor (22)", price: "40-55€/m²", cities: ["Saint-Brieuc"] },
    ],
    cities: [
      { name: "Rennes", pop: "222k", price: "41-57€/m²" },
      { name: "Brest", pop: "140k", price: "41-56€/m²" },
      { name: "Quimper", pop: "63k", price: "41-56€/m²" },
      { name: "Vannes", pop: "54k", price: "41-56€/m²" },
      { name: "Lorient", pop: "57k", price: "41-56€/m²" },
      { name: "Saint-Malo", pop: "46k", price: "41-56€/m²" },
    ],
    neighbors: ["pays-de-la-loire", "normandie"],
  },
  {
    name: "Pays de la Loire",
    slug: "pays-de-la-loire",
    companies: 94,
    interventions: "12500 chantiers/an",
    priceRange: "42-60€/m²",
    note: "Mix littoral/industriel, coûts stables, centres de traitement accessibles.",
    departments: [
      { name: "Loire-Atlantique (44)", price: "42-60€/m²", cities: ["Nantes", "Saint-Nazaire"] },
      { name: "Maine-et-Loire (49)", price: "42-58€/m²", cities: ["Angers", "Cholet"] },
      { name: "Sarthe (72)", price: "42-58€/m²", cities: ["Le Mans"] },
      { name: "Vendée (85)", price: "42-58€/m²", cities: ["La Roche-sur-Yon"] },
      { name: "Mayenne (53)", price: "40-55€/m²", cities: ["Laval"] },
    ],
    cities: [
      { name: "Nantes", pop: "320k", price: "42-60€/m²", demand: "25 recherches/mois" },
      { name: "Angers", pop: "155k", price: "42-58€/m²" },
      { name: "Le Mans", pop: "142k", price: "42-58€/m²" },
      { name: "Saint-Nazaire", pop: "70k", price: "42-60€/m²" },
      { name: "La Roche-sur-Yon", pop: "54k", price: "42-58€/m²" },
      { name: "Laval", pop: "49k", price: "40-55€/m²" },
    ],
    neighbors: ["bretagne", "centre-val-de-loire", "nouvelle-aquitaine", "normandie"],
  },
  {
    name: "Centre-Val de Loire",
    slug: "centre-val-de-loire",
    companies: 73,
    interventions: "9000 chantiers/an",
    priceRange: "42-59€/m²",
    note: "Patrimoine ancien et sites tertiaires, logistique facilitée vers IDF.",
    departments: [
      { name: "Loiret (45)", price: "42-60€/m²", cities: ["Orléans"] },
      { name: "Indre-et-Loire (37)", price: "42-58€/m²", cities: ["Tours"] },
      { name: "Eure-et-Loir (28)", price: "42-58€/m²", cities: ["Chartres"] },
      { name: "Cher (18)", price: "40-55€/m²", cities: ["Bourges"] },
      { name: "Indre (36)", price: "40-55€/m²", cities: ["Châteauroux"] },
      { name: "Loir-et-Cher (41)", price: "42-58€/m²", cities: ["Blois"] },
    ],
    cities: [
      { name: "Tours", pop: "136k", price: "42-58€/m²" },
      { name: "Orléans", pop: "115k", price: "42-60€/m²" },
      { name: "Chartres", pop: "38k", price: "42-58€/m²" },
      { name: "Bourges", pop: "64k", price: "40-55€/m²" },
      { name: "Blois", pop: "46k", price: "42-58€/m²" },
      { name: "Châteauroux", pop: "43k", price: "40-55€/m²" },
    ],
    neighbors: ["ile-de-france", "pays-de-la-loire", "nouvelle-aquitaine", "bourgogne-franche-comte", "normandie"],
  },
  {
    name: "Normandie",
    slug: "normandie",
    companies: 71,
    interventions: "9500 chantiers/an",
    priceRange: "41-58€/m²",
    note: "Ports et bâtiments logistiques, météo humide à intégrer pour la mise hors d'eau.",
    departments: [
      { name: "Seine-Maritime (76)", price: "41-58€/m²", cities: ["Rouen", "Le Havre"] },
      { name: "Calvados (14)", price: "41-57€/m²", cities: ["Caen"] },
      { name: "Manche (50)", price: "41-56€/m²", cities: ["Cherbourg"] },
      { name: "Eure (27)", price: "41-56€/m²", cities: ["Évreux"] },
      { name: "Orne (61)", price: "40-55€/m²", cities: ["Alençon"] },
    ],
    cities: [
      { name: "Rouen", pop: "113k", price: "41-58€/m²" },
      { name: "Caen", pop: "105k", price: "41-57€/m²" },
      { name: "Le Havre", pop: "168k", price: "41-58€/m²" },
      { name: "Cherbourg", pop: "79k", price: "41-56€/m²" },
      { name: "Évreux", pop: "48k", price: "41-56€/m²" },
      { name: "Alençon", pop: "26k", price: "40-55€/m²" },
    ],
    neighbors: ["ile-de-france", "bretagne", "pays-de-la-loire", "hauts-de-france"],
  },
  {
    name: "Bourgogne-Franche-Comté",
    slug: "bourgogne-franche-comte",
    companies: 64,
    interventions: "8500 chantiers/an",
    priceRange: "40-56€/m²",
    note: "Bâtiments tertiaires et industriels, hivers froids et zones rurales étendues.",
    departments: [
      { name: "Côte-d'Or (21)", price: "40-56€/m²", cities: ["Dijon"] },
      { name: "Doubs (25)", price: "42-56€/m²", cities: ["Besançon", "Montbéliard"] },
      { name: "Saône-et-Loire (71)", price: "40-55€/m²", cities: ["Chalon-sur-Saône"] },
      { name: "Nièvre (58)", price: "40-54€/m²", cities: ["Nevers"] },
      { name: "Territoire de Belfort (90)", price: "42-56€/m²", cities: ["Belfort"] },
    ],
    cities: [
      { name: "Dijon", pop: "159k", price: "40-56€/m²" },
      { name: "Besançon", pop: "117k", price: "42-56€/m²" },
      { name: "Nevers", pop: "32k", price: "40-54€/m²" },
      { name: "Belfort", pop: "46k", price: "42-56€/m²" },
      { name: "Chalon-sur-Saône", pop: "45k", price: "40-55€/m²" },
      { name: "Montbéliard", pop: "25k", price: "42-56€/m²" },
    ],
    neighbors: ["ile-de-france", "grand-est", "auvergne-rhone-alpes", "centre-val-de-loire"],
  },
  {
    name: "Corse",
    slug: "corse",
    companies: 19,
    interventions: "2500 chantiers/an",
    priceRange: "55-80€/m²",
    note: "Logistique insulaire, transport maritime des déchets et accès aux centres agréés.",
    departments: [
      { name: "Corse-du-Sud (2A)", price: "55-80€/m²", cities: ["Ajaccio", "Porto-Vecchio"] },
      { name: "Haute-Corse (2B)", price: "55-80€/m²", cities: ["Bastia", "Corte"] },
    ],
    cities: [
      { name: "Ajaccio", pop: "70k", price: "55-80€/m²" },
      { name: "Bastia", pop: "45k", price: "55-80€/m²" },
      { name: "Porto-Vecchio", pop: "12k", price: "55-80€/m²" },
      { name: "Corte", pop: "8k", price: "55-80€/m²" },
    ],
    neighbors: ["provence-alpes-cote-d-azur"],
  },
].filter(r => r.companies > 0);

const regionIndex = regions.reduce<Record<string, Region>>((acc, r) => {
  acc[r.slug] = r;
  return acc;
}, {});

export async function generateStaticParams() {
  return regions.map(region => ({ region: region.slug }));
}

export async function generateMetadata({ params }: { params: { region: string } }): Promise<Metadata> {
  const region = regionIndex[params.region];
  if (!region) return {};

  const title = `Désamiantage en ${region.name} : Entreprises certifiées et prix`;
  const description = `Trouvez une entreprise de désamiantage en ${region.name} : tarifs ${region.priceRange}, certifications Qualibat 1552, devis gratuits et annuaire régional.`;

  return createMetadata({
    title,
    description,
    path: `/desamiantage-${region.slug}`,
    openGraphType: "article",
  });
}

const faqBase = [
  {
    question: "Quel est le prix du désamiantage dans ma région ?",
    answer:
      "Le prix dépend du type de matériau (toiture, fibrociment, dalles) et des contraintes d'accès. Comptez généralement 40 à 80€/m², et jusqu'à 200-500€/m² en cas de confinement complexe ou de toiture très dégradée.",
  },
  {
    question: "Quelles certifications vérifier ?",
    answer:
      "Exigez la certification Qualibat 1552, des plans de retrait validés, une assurance RC pro et décennale incluant l'amiante, ainsi que la traçabilité BSD pour les déchets.",
  },
  {
    question: "Combien de temps pour lancer un chantier ?",
    answer:
      "Les déclarations DREETS/CARSAT prennent 2 à 4 semaines. Les travaux durent ensuite quelques jours à plusieurs semaines selon la surface, la hauteur et la coactivité.",
  },
  {
    question: "Peut-on rester dans le bâtiment pendant les travaux ?",
    answer:
      "En site occupé, l'entreprise organise un confinement strict, des circulations dédiées et des phases de travaux en horaires adaptés. Le reste du bâtiment peut rester accessible selon le plan de retrait.",
  },
];

const serviceBullets = [
  "Certification Qualibat 1552 et audits à jour",
  "Plans de retrait SS3/SS4 et mesures d'empoussièrement",
  "BSD numériques, photos de chantier et rapport de fin de travaux",
  "Gestion des accès, échafaudages, nacelles et centres de traitement",
];

export default function RegionPage({ params }: { params: { region: string } }) {
  const region = regionIndex[params.region];
  if (!region) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-semibold">Région inconnue</h1>
        <p className="mt-2 text-slate-500">Cette page n&apos;existe pas.</p>
      </main>
    );
  }

  const breadcrumbLd = getBreadcrumbJsonLd([
    { name: "Accueil", path: "/" },
    { name: "Désamiantage-France", path: "/desamiantage-france" },
    { name: region.name, path: `/desamiantage-${region.slug}` },
  ]);

  const faqLd = getFaqJsonLd(faqBase);

  const neighborLinks = region.neighbors
    .map(slug => regions.find(r => r.slug === slug))
    .filter(Boolean)
    .map(r => ({ name: r!.name, href: `/desamiantage-${r!.slug}/` }));

  const regionPath = `/desamiantage-${region.slug}/`;

  const cityPath = (city: string) => `${regionPath}${slugify(city)}/`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /> : null}

      <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
          <nav className="text-sm text-slate-300">
            <Link href="/desamiantage-france" className="hover:text-emerald-200">
              France
            </Link>{" "}
            › <span className="text-white font-semibold">{region.name}</span>
          </nav>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Désamiantage en {region.name} : Entreprises certifiées et prix
              </h1>
              <p className="text-lg text-slate-200">
                Trouvez une entreprise de désamiantage en {region.name} : devis gratuits, prix moyens {region.priceRange}, plans de retrait
                validés et traçabilité BSD. {brandName} sélectionne des sociétés certifiées Qualibat 1552 et coordonne vos chantiers toitures,
                fibrociment, dalles, conduits et sites industriels.
              </p>
              <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">Entreprises certifiées</p>
                  <p className="mt-1 text-xl font-semibold text-white">{region.companies}+</p>
                  <p className="text-slate-300">Réseau audité</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">Interventions/an</p>
                  <p className="mt-1 text-xl font-semibold text-white">{region.interventions}</p>
                  <p className="text-slate-300">Toitures, sols, conduits</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-200">Prix moyen</p>
                  <p className="mt-1 text-xl font-semibold text-white">{region.priceRange}</p>
                  <p className="text-slate-300">Selon accès et matériaux</p>
                </div>
              </div>
              <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
                <p className="font-semibold text-emerald-200">Carte régionale et villes</p>
                <p className="mt-2 text-slate-100">
                  Cliquez sur votre département ou votre ville pour accéder aux prix détaillés et aux entreprises de désamiantage locales.
                  Chaque fiche inclut un mini-formulaire pour obtenir 3 devis gratuits.
                </p>
                <p className="mt-2 text-slate-100">Spécificités locales : {region.note}</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                Service gratuit · {region.name}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white">Devis gratuit en {region.name}</h2>
              <p className="text-sm text-slate-300">Comparez trois devis d'entreprises certifiées proches de votre chantier.</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                <ContactForm />
              </div>
              <p className="mt-2 text-[11px] text-slate-400">✓ Sans engagement · ✓ Plan SS3/SS4 · ✓ BSD numérique</p>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <section id="prix" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Prix du désamiantage en {region.name}</h2>
              <span className="text-sm text-emerald-200">Tarifs moyens par département</span>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <table className="w-full text-sm text-slate-200">
                <thead className="bg-white/5 text-xs uppercase tracking-wide text-emerald-200">
                  <tr>
                    <th className="px-4 py-3 text-left">Département</th>
                    <th className="px-4 py-3 text-left">Prix au m²</th>
                    <th className="px-4 py-3 text-left">Villes principales</th>
                  </tr>
                </thead>
                <tbody>
                  {region.departments.map(dep => (
                    <tr key={dep.name} className="border-t border-white/5">
                      <td className="px-4 py-3 font-semibold text-white">{dep.name}</td>
                      <td className="px-4 py-3">{dep.price}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {dep.cities.map(city => (
                            <Link key={city} href={cityPath(city)} className="text-emerald-200 hover:text-emerald-100">
                              {city}
                            </Link>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Pourquoi les prix varient ?</p>
              <p className="mt-2 text-slate-100">
                La densité urbaine, la hauteur de travail, les accès (échafaudages, nacelles), la distance au centre de traitement et l'état
                des matériaux amiantés influencent le coût. Demandez un devis comparatif pour ajuster selon votre charpente, vos dalles ou vos
                conduits.
              </p>
              <a href="#cta-final" className="btn-cta mt-3 inline-flex">
                Obtenir 3 devis régionaux
              </a>
            </div>
          </section>

          <section id="villes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Trouvez une entreprise de désamiantage dans votre ville</h2>
              <span className="text-sm text-emerald-200">Sélection de villes prioritaires</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {region.cities.map(city => (
                <article key={city.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">{city.name}</div>
                    {city.hot ? <span className="rounded-full bg-amber-500/15 px-2 py-1 text-[11px] text-amber-100">Forte demande</span> : null}
                  </div>
                  <p className="text-xs text-slate-400">{city.pop} hab.</p>
                  <p className="mt-2 text-sm text-slate-200">Prix moyen : {city.price}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                    {city.demand ? <span className="rounded-full bg-white/10 px-2 py-1">{city.demand}</span> : null}
                    {city.cpc ? <span className="rounded-full bg-emerald-500/10 px-2 py-1">CPC {city.cpc}</span> : null}
                  </div>
                  <Link href={cityPath(city.name)} className="btn-secondary mt-3 inline-flex">
                    Voir les pros →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section id="specs" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Particularités du désamiantage en {region.name}</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Contexte réglementaire local</h3>
                <p className="mt-2 text-sm">
                  Les travaux suivent le Code du travail et le décret 2012-639. En {region.name}, les préfectures et mairies exigent des
                  déclarations pour les échafaudages, fermetures de voirie ou interventions en site occupé. Les plans de retrait sont transmis
                  à la DREETS et à la CARSAT, avec un délai de 15 à 30 jours selon l'urgence.
                </p>
                <p className="mt-2 text-sm">
                  Les centres de traitement agréés doivent être réservés à l'avance pour les bennes ADR ou les dépôts conditionnés. Les BSD
                  numériques attestent du transfert des déchets dangereux.
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Typologie de bâtiments</h3>
                <p className="mt-2 text-sm">
                  Immeubles anciens, logements sociaux, hangars industriels, bâtiments tertiaires et équipements publics requièrent des
                  méthodologies adaptées : confinement dynamique en coactivité, surtoiture provisoire, lignes de vie, filets anti-chute et
                  phasage de nuit ou week-end pour limiter l'impact.
                </p>
                <p className="mt-2 text-sm">
                  Pour les toitures fibrociment ou ardoises artificielles, le retrait complet reste la solution privilégiée. L'encapsulage
                  ponctuel peut être étudié mais n'exonère pas du suivi du DTA.
                </p>
              </article>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
              <h3 className="text-lg font-semibold text-white">Ce qu'une société de désamiantage fournit</h3>
              <ul className="mt-3 grid gap-2 md:grid-cols-2">
                {serviceBullets.map(item => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="entreprises" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Entreprises de désamiantage certifiées en {region.name}</h2>
            <p>
              {brandName} référence les entreprises de désamiantage locales en vérifiant leur certification Qualibat 1552, leurs assurances et
              leur expérience sur des chantiers similaires. Un chef de projet vous oriente vers 2 à 3 opérateurs adaptés (toiture, sols,
              industriels) et sécurise le phasage.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {region.cities.slice(0, 4).map(city => (
                <article key={city.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-lg font-semibold text-white">{city.name} et environs</h3>
                  <p className="mt-2 text-sm">Entreprises certifiées, devis sous 72h, accompagnement administratif et BSD.</p>
                  <Link href={cityPath(city.name)} className="btn-secondary mt-3 inline-flex">
                    Voir les entreprises →
                  </Link>
                </article>
              ))}
            </div>
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/10 p-5 text-sm text-emerald-100">
              <p className="font-semibold text-emerald-200">Accédez à l'annuaire</p>
              <p className="mt-2 text-slate-100">
                Filtrez par département et type de travaux (toiture, dalles, conduits). Les fiches intègrent certifications, assurances et
                exemples de chantiers.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="#cta-form" className="btn-cta">
                  Comparer les devis
                </a>
                <Link href="/entreprises-certifiees/" className="btn-secondary">
                  Voir les critères de certification
                </Link>
              </div>
            </div>
          </section>

          <section id="faq" className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">FAQ Désamiantage en {region.name}</h2>
            <div className="space-y-3">
              {faqBase.map(item => (
                <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/5 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                    {item.question}
                    <span className="text-xl transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-200">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="cta-final" className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">Trouvez votre entreprise de désamiantage en {region.name}</h2>
                <p>
                  Décrivez votre projet et recevez trois devis comparatifs d'entreprises certifiées Qualibat 1552. Nous validons les assurances,
                  la filière déchets et le plan de retrait avant lancement pour sécuriser le chantier.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Intervention sous 72h selon urgence</li>
                  <li>• Confinement adapté (statique/dynamique) et EPI/EPC conformes</li>
                  <li>• BSD numérique, mesures d'empoussièrement, dossier photo</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href="#cta-form" className="btn-cta">
                    Obtenir 3 devis gratuits
                  </a>
                  <Link href="/prix-desamiantage/" className="btn-secondary">
                    Voir les prix nationaux
                  </Link>
                  <Link href="/desamiantage-france" className="text-emerald-200 hover:text-emerald-100">
                    Retour à la carte France
                  </Link>
                </div>
                {neighborLinks.length ? (
                  <div className="text-sm text-slate-300">
                    Régions proches :{" "}
                    {neighborLinks.map((item, idx) => (
                      <span key={item.href}>
                        <Link href={item.href} className="text-emerald-200 hover:text-emerald-100">
                          {item.name}
                        </Link>
                        {idx < neighborLinks.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 shadow-lg shadow-emerald-500/10">
                <ContactForm />
                <p className="mt-2 text-[11px] text-slate-400">✓ Gratuit · ✓ Sans engagement · ✓ Entreprises auditées</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
