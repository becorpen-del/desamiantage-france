type PriceRange = {
  title: string;
  range: string;
  description: string;
  includes: string[];
};

type PriceRangesProps = {
  title: string;
  disclaimer: string;
  items: PriceRange[];
};

export function PriceRanges({ title, disclaimer, items }: PriceRangesProps) {
  return (
    <section className="bg-white py-16" aria-labelledby="prices-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-3">
          <h2 id="prices-title" className="text-3xl font-semibold text-slate-900">
            {title}
          </h2>
          <p className="text-sm text-slate-500">{disclaimer}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {items.map(item => (
            <article key={item.title} className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm shadow-slate-100/60">
              <header>
                <p className="text-sm font-semibold uppercase tracking-wide text-brand">{item.title}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{item.range}</p>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
              </header>
              <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-slate-600">
                {item.includes.map(include => (
                  <li key={include} className="flex gap-2">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-brand/70" aria-hidden />
                    <span>{include}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
