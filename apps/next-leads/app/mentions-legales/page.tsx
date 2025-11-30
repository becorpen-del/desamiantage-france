import { getLegalMetadata } from "@/lib/seo";
import { getBrandName } from "@/lib/utils";

import type { Metadata } from "next";

export const metadata: Metadata = getLegalMetadata();

export default function LegalNoticePage() {
  const brandName = getBrandName();

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-6 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">Mentions légales</h1>
          <p className="text-sm text-slate-600">
            Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique, vous trouverez ci-dessous les informations concernant l’édition et l’hébergement du site {brandName}.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Éditeur</h2>
          <p className="text-sm text-slate-600">
            {brandName} – SAS au capital de 50 000 € – RCS Paris 910 123 456 – Siège social : 42 rue du Bâtiment, 75010 Paris – N° TVA Intracom FR 76 910123456.
          </p>
          <p className="text-sm text-slate-600">Directeur de la publication : Benjamin Legal.</p>
          <p className="text-sm text-slate-600">Contact : bonjour@desamiant-pro.fr – Tél. : 01 84 80 09 90.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Hébergement</h2>
          <p className="text-sm text-slate-600">
            Hébergeur : OVHcloud – SAS au capital de 10 174 560 € – RCS Lille Métropole 424 761 419 – 2 rue Kellermann, 59100 Roubaix – www.ovhcloud.com – Téléphone : 09 72 10 10 07.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Activité</h2>
          <p className="text-sm text-slate-600">
            {brandName} est une plateforme de mise en relation entre porteurs de projets de désamiantage et entreprises certifiées SS3/SS4. {brandName} ne réalise pas les travaux mais assure la qualification du besoin, la coordination documentaire et la traçabilité réglementaire (BSD, rapports, plans de retrait) entre le client et l’entreprise sélectionnée.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Propriété intellectuelle</h2>
          <p className="text-sm text-slate-600">
            L’ensemble des contenus (textes, visuels, maquettes) présents sur le site sont la propriété exclusive de {brandName}. Toute reproduction ou représentation totale ou partielle sans autorisation écrite est interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Données personnelles</h2>
          <p className="text-sm text-slate-600">
            Les demandes de devis donnent lieu à un traitement de données personnelles. Pour en savoir plus ou exercer vos droits, consultez notre politique de confidentialité ou écrivez à privacy@desamiant-pro.fr.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Médiation</h2>
          <p className="text-sm text-slate-600">
            En cas de litige non résolu, vous pouvez saisir gratuitement le médiateur de la consommation dont relève {brandName} : CM2C – 14 rue Saint-Jean, 75017 Paris – www.cm2c.net.
          </p>
        </section>
      </div>
    </div>
  );
}
