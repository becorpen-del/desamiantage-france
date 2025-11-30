type ProcessStep = {
  title: string;
  subtitle?: string;
  description: string;
  deliverables: string[];
};

type ProcessProps = {
  title: string;
  intro: string;
  steps: ProcessStep[];
};

export function Process({ title, intro, steps }: ProcessProps) {
  return (
    <section className="bg-slate-50 py-16" aria-labelledby="process-title">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl space-y-4">
          <h2 id="process-title" className="text-3xl font-semibold text-slate-900">
            {title}
          </h2>
          <p className="text-lg text-slate-600">{intro}</p>
        </div>
        <ol className="mt-12 space-y-6">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/70">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <header className="max-w-xl">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                    Étape {index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                  {step.subtitle ? (
                    <p className="mt-1 text-sm text-slate-500">{step.subtitle}</p>
                  ) : null}
                </header>
                <div className="max-w-2xl text-sm leading-6 text-slate-600">
                  <p>{step.description}</p>
                  <ul className="mt-4 grid gap-2">
                    {step.deliverables.map(item => (
                      <li key={item} className="flex gap-2 text-slate-600">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full bg-brand/70" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
