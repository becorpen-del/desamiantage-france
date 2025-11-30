import { getBrandName } from "@/lib/utils";

import { CtaButton, type CtaHref } from "./CtaButton";

type HeroStat = {
  label: string;
  value: string;
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  bullets: string[];
  stats: HeroStat[];
  primaryCta: {
    label: string;
    href: CtaHref;
    trackingLabel?: string;
  };
  secondaryCta: {
    label: string;
    href: CtaHref;
    trackingLabel?: string;
  };
  asideTitle?: string;
  asideDescription?: string;
};

const brandName = getBrandName();
const defaultAsideTitle = "Vos garanties sur le terrain";
const defaultAsideDescription =
  "Gestion complète des obligations diagnostic (DTA, DAAT), plans de retrait et suivi empoussièrement pour copropriétés, ERP et sites industriels.";

export function Hero({
  eyebrow,
  title,
  description,
  bullets,
  stats,
  primaryCta,
  secondaryCta,
  asideTitle,
  asideDescription,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-slate-50">
      <div className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex-1">
          {eyebrow ? (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1 text-sm font-semibold text-brand">
              {eyebrow}
            </span>
          ) : (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-1 text-sm font-semibold text-brand">
              {brandName} · Interventions certifiées
            </span>
          )}
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-200">{description}</p>
          <ul className="mt-6 space-y-3 text-base text-slate-200/90">
            {bullets.map(item => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-brand" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <CtaButton {...primaryCta} />
            <CtaButton variant="secondary" {...secondaryCta} />
          </div>
        </div>
        <aside className="flex w-full max-w-xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold text-white">{asideTitle ?? defaultAsideTitle}</h2>
          <p className="text-sm leading-6 text-slate-200">{asideDescription ?? defaultAsideDescription}</p>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stats.map(stat => (
              <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-200/80">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
