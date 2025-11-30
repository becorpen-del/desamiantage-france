import type { FaqItem } from "@/lib/seo";

type FAQProps = {
  title: string;
  intro?: string;
  items: FaqItem[];
};

export function FAQ({ title, intro, items }: FAQProps) {
  return (
    <section className="bg-white py-16" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl px-6">
        <div className="space-y-4">
          <h2 id="faq-title" className="text-3xl font-semibold text-slate-900">
            {title}
          </h2>
          {intro ? <p className="text-lg text-slate-600">{intro}</p> : null}
        </div>
        <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm">
          {items.map(item => (
            <details key={item.question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-slate-50 px-6 py-5 text-lg font-semibold text-slate-900 transition hover:bg-slate-100">
                <span>{item.question}</span>
                <span className="text-2xl text-brand transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="bg-white px-6 py-5 text-sm leading-6 text-slate-600">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
