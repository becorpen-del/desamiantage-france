import Link from "next/link";

import { cities } from "@/lib/cities";

const uniqueCities = Object.values(cities).filter(
  (city, index, list) => list.findIndex(item => item.name === city.name) === index,
);

export default function CityAreas() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {uniqueCities.map(city => (
        <li key={city.slug}>
          <Link
            href={`/${city.slug}`}
            className="block rounded-xl border p-4 hover:bg-slate-50"
            prefetch
          >
            Désamiantage {city.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
