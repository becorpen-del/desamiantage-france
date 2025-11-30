type BenefitItem = {
  title: string;
  description: string;
};

type BenefitsProps = {
  title: string;
  intro: string;
  items: BenefitItem[];
};

export function Benefits({ title, intro, items }: BenefitsProps) {
  return (
    <section className="bg-white py-16" aria-labelledby="benefits-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <h2 id="benefits-title" className="text-3xl font-semibold text-slate-900">
            {title}
          </h2>
          <p className="text-lg text-slate-600">{intro}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map(item => (
            <article key={item.title} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm shadow-slate-100/70">
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
