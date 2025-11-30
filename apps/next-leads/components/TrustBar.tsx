import Image from "next/image";

type TrustItem = {
  title: string;
  description: string;
  icon?: string;
};

type TrustBarProps = {
  items: TrustItem[];
};

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="bg-slate-900 py-12 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Certifications et garanties
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Des équipes auditées et assurées pour vos chantiers sensibles</h2>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
            {items.map(item => (
              <div key={item.title} className="rounded-2xl bg-white/5 p-5">
                {item.icon ? (
                  <div className="mb-4 flex items-center gap-3">
                    <div className="relative h-8 w-8">
                      <Image src={item.icon} alt="" fill className="object-contain" />
                    </div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                ) : (
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                )}
                <p className="mt-2 text-sm text-slate-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
