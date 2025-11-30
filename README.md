# Desamiantage-Fraance – Générateur de leads désamiantage

Plateforme front/back prête pour capter et revendre des leads « désamiantage » en France. Deux variantes livrées dans un monorepo : Next.js 14 (stack recommandée) et fallback statique Tailwind + Netlify Forms. Le site est pensé SEO-first (architecture scalable par services/villes) et conversion-led (formulaire riche, scoring, envoi Google Sheets).

## Sommaire
1. [Architecture & prérequis](#architecture--prérequis)
2. [Choisir la stack](#choisir-la-stack)
3. [Variables d'environnement](#variables-denvironnement)
4. [Pipeline Google Sheets](#pipeline-google-sheets)
5. [Lancer le projet en local](#lancer-le-projet-en-local)
6. [Formulaire & anti-spam](#formulaire--anti-spam)
7. [Tracking & analytics](#tracking--analytics)
8. [SEO technique](#seo-technique)
9. [Templates services & villes](#templates-services--villes)
10. [Variante statique (Netlify)](#variante-statique-netlify)
11. [Tests & qualité](#tests--qualité)
12. [Déploiement](#déploiement)
13. [Vérifications post-setup](#vérifications-post-setup)
14. [Roadmap SEO post-lancement](#roadmap-seo-post-lancement)

---

## Architecture & prérequis
```
.
├─ apps/
│  ├─ next-leads/            # Next.js 14 (App Router, Tailwind, API Routes)
│  └─ static-leads/          # HTML + Tailwind CLI + Netlify Forms
├─ packages/
│  └─ shared/                # Brand, constantes (services/villes), zod validators, scoring
├─ apps-script/Code.gs       # Webhook Google Sheets prêt à l’emploi
├─ scripts/stack-run.mjs     # Router npm selon STACK (next | static)
├─ .env.example              # Base de configuration
└─ README.md
```
**Prérequis :** Node.js ≥ 18 (20 LTS recommandé), npm ≥ 8, compte Google (Sheets + reCAPTCHA v3).

---

## Choisir la stack
1. Copiez `.env.example` → `.env`.
2. Positionnez `STACK=next` (par défaut) ou `STACK=static` selon l'environnement.
3. Toutes les commandes npm utilisent `scripts/stack-run.mjs` pour viser la bonne app :
   ```bash
   npm install
   npm run dev        # selon STACK
   npm run build
   npm run lint
   npm run test       # uniquement Next.js
   ```
   Pour cibler directement un workspace :
   ```bash
   npm run dev --workspace apps/next-leads
   npm run dev --workspace apps/static-leads
   ```

---

## Variables d'environnement
Mettre à jour `.env` :

| Variable | Description |
| --- | --- |
| `STACK` | `next` ou `static` |
| `BRAND_NAME` | Nom de marque (utilisé partout) |
| `PRIMARY_COLOR` | Couleur principale (hex) |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (https://...) |
| `GA_ID` / `GTM_ID` | Identifiants Google Analytics 4 / Tag Manager (optionnel) |
| `SHEETS_WEBHOOK_URL` | URL de l'Apps Script Google Sheets (obligatoire pour l'envoi) |
| `RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY` | Clés reCAPTCHA v3 (optionnel mais recommandé) |
| `HONEYPOT_FIELD_NAME` | Nom du champ honeypot (par défaut `_company`) |
| `MIN_SUBMIT_DELAY_MS` | Délai minimum avant soumission (2500 ms par défaut) |

Les variables `BRAND_NAME`, `PRIMARY_COLOR`, `NEXT_PUBLIC_SITE_URL` sont exposées au front. Recompilez après toute modification.

---

## Pipeline Google Sheets
1. Créez un Google Sheet et notez son **ID** (dans l’URL).
2. Dans **Extensions → Apps Script**, collez `apps-script/Code.gs` et remplacez `YOUR_SHEET_ID`.
3. Déployez : **Déployer → Nouvelle version → Application web** (exécuter en tant que vous, accessible à « Toute personne disposant du lien »).
4. Copiez l’URL de déploiement dans `.env` (`SHEETS_WEBHOOK_URL`).
5. Le script ajoute automatiquement les en-têtes suivants :
   `timestamp, nom, email, telephone, codePostal, ville, typeBatiment, typePrestation, description, delai, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, leadScore, userAgent, ip`.
6. Testez depuis `npm run dev` : soumettez le formulaire et vérifiez l’apparition de la ligne dans l’onglet `Leads`.

---

## Lancer le projet en local
### Variante Next.js (recommandée)
```bash
npm install
STACK=next npm run dev    # http://localhost:3000/desamiantage/paris
```
Fonctions incluses :
- Landing page locale `/desamiantage/paris` (App Router, Tailwind, JSON-LD multi-schémas).
- Template dynamique `/desamiantage/[city]` généré depuis `lib/cities.ts` (SSG + canoniques).
- Formulaire sticky (#devis) : validation Zod, reCAPTCHA v3, délai anti-spam, tracking UTM/GCLID.
- API `/api/lead` : rate-limit IP 15 s, honeypot, score lead, webhook Google Sheets.
- Sitemap `/sitemap.xml` et robots.txt alimentés par les villes déclarées.
- Sticky CTA mobile « Demander un devis ».

### Variante statique (fallback Netlify)
```bash
npm run dev --workspace apps/static-leads   # build + watch (dist/)
```
- Formulaire Netlify Forms (`data-netlify`) + honeypot.
- Progressive enhancement : JS intercepte la soumission, applique validation/anti-spam et POSTe vers `data-webhook` (copiez l’URL Apps Script).
- Fallback garanti si JS désactivé (soumission Netlify).

---

## Formulaire & anti-spam
**Champs obligatoires (Next & static) :**
- `nom`, `email`, `telephone`, `codePostal`, `ville`, `typeBatiment`, `typePrestation`, `description`, `delai`, `consentement`.
- `utm` (source/medium/campaign/term/content) capturés automatiquement + `gclid`.
- Champs cachés : `HONEYPOT_FIELD_NAME` (par défaut `_company`) et `submitDelay` (timestamp initial).

**Validation (client + serveur) :**
- Zod (`packages/shared/validators.ts`) assure la cohérence côté Next ; la version statique réplique les règles en JS.
- Téléphone : 10-15 chiffres (FR ou international).
- Description : 20–800 caractères.
- Liste noire de mots (`packages/shared/antiSpam.ts`).
- Délai mini (`MIN_SUBMIT_DELAY_MS`) entre ouverture du formulaire et envoi.
- reCAPTCHA v3 déclenché automatiquement si les clés sont présentes.

**Lead scoring (serveur)** : +2 téléphone valide, +1 si code postal conforme à une ville connue, +1 description ≥ 50 caractères, −2 si mots bannis. Le score est envoyé à Sheets (`leadScore`) et déclenche l’événement GA `lead_submitted` côté front.

---

## Tracking & analytics
- Tracking UTM/gclid stocké en `localStorage` et renvoyé vers Sheets.
- `NEXT_PUBLIC_GA_ID`/`NEXT_PUBLIC_GTM_ID` injectent gtag/GTM dans `app/layout.tsx`.
- Événement GA `lead_submitted` déclenché à chaque succès.
- Bannière cookies simple (consentement localStorage) gérée côté Next & static.

---

## SEO technique
- **Sitemaps split** :
  - `/sitemap.xml` (index) → `/sitemap-pages.xml`, `/sitemap-services.xml`, `/sitemap-villes.xml`, `/sitemap-blog.xml`.
  - Les villes sont pour l’instant `indexed: false` (noindex) et non listées tant que le contenu n’est pas enrichi.
- **Robots** : `/api/**` bloqué, host + sitemap déclarés.
- **JSON-LD** : Organisation, Service, LocalBusiness (villes), Breadcrumb, FAQ.
- **Pages** : templates Home, Services, Service détail (~400+ mots), Devis, Contact, Mentions légales, Politique de confidentialité.
- **Performance visée** : Tailwind pur, images minimales, CTA sticky, `<noscript>` GTM.

---

## Templates services & villes
- Données source dans `apps/next-leads/lib/cities.ts`. Ajoutez-y de nouvelles entrées (`slug`, `name`, `cp`, `dept`, `neighbors`, `neighborhoods`) pour générer routes, sitemap et JSON-LD.
- Ajustez le contenu dynamique directement dans `app/desamiantage/[city]/page.tsx` si vous avez besoin d'un storytelling plus poussé par ville.
- Pages ville : livrées en noindex (< 700 mots). Enrichissez à 800–1000 mots et retirez la balise `noindex` dans `generateMetadata` avant d’actualiser le sitemap.

---

## Variante statique (Netlify)
- Formulaire principal aligné avec la version Next (mêmes champs, validation JS, scoring côté Apps Script uniquement).
- `data-webhook` doit être remplacé par l’URL Apps Script.
- Les champs cachés `data-submit-delay` et `data-utm-*` sont remplis automatiquement.
- Progression : si `fetch` échoue, l’utilisateur reste informé et peut réessayer ou passer par Netlify (JS off).
- Build Netlify recommandé :
  ```text
  Build command : npm run build
  Publish dir  : dist
  ```

---

## Tests & Qualité
- Vitest (Next) :
  ```bash
  npm run test --workspace apps/next-leads
  ```
  - `lib/validators.test.ts` : email, téléphone, CP, description.
  - `app/api/lead/route.test.ts` : test d’intégration POST /api/lead.
- ESLint / Prettier configurés au niveau monorepo et app Next.
- TypeScript strict + validation runtime (zod).

---

## Déploiement
### Next.js → Vercel (recommandé)
1. Reliez le repo et sélectionnez `apps/next-leads` comme dossier.
2. Configurez les variables d’environnement (préfixez par `NEXT_PUBLIC_` si nécessaire).
3. Assurez-vous que `SHEETS_WEBHOOK_URL`, `RECAPTCHA_*`, `BRAND_NAME`, `PRIMARY_COLOR`, `NEXT_PUBLIC_SITE_URL` sont définis.
4. Activez la protection des routes API si besoin (middleware côté Vercel facultatif).

### Static → Netlify
1. Pointez sur `apps/static-leads`.
2. Build command `npm run build`, publish `dist`.
3. Renseignez `data-webhook` directement dans le HTML ou via variables d’environnement Netlify (remplacement au build si besoin).
4. Forms : Netlify capture automatiquement les soumissions (fallback sans JS) et la version JS envoie aussi vers Google Sheets.

---

## Vérifications post-setup
- Soumission formulaire Next.js → réponse `{ ok: true }` et nouvelle ligne dans Google Sheets (vérifiez `leadScore`, `utm_*`, `gclid`, `userAgent`).
- Cookie banner, reCAPTCHA, événement GA `lead_submitted` actifs.
- Sitemap accessible (`/sitemap.xml`) et robots.txt correct.
- Pages villes en noindex (jusqu’à enrichissement complet).
- Tests Vitest au vert (`npm run test --workspace apps/next-leads`).
- Variante statique : testez `npm run build --workspace apps/static-leads` puis ouvrez `dist/` pour vérifier le formulaire (success message) et le fallback Netlify.

---

## Roadmap SEO post-lancement
1. Connecter Google Search Console + Bing Webmaster, soumettre `https://votre-domaine/sitemap.xml`.
2. Publier 4 fiches services complètes (900–1200 mots chacune) + 10 pages villes majeures (800–1000 mots). Retirer `noindex` et inclure ces URLs au sitemap villes lorsque prêtes.
3. Mettre en ligne 5 articles TOFU (ex. reconnaître l’amiante, obligations légales, coûts moyens, procédures). Réserver `/blog/[slug]` déjà prêt.
4. Campagne de netlinking : 5 citations locales (pages jaunes pro, CCI, annuaires BTP) + 3 articles invités thématiques.
5. Suivi hebdo : analyser impressions/CTR dans GSC, optimiser balises title/meta sur les pages faibles, enrichir FAQ/sections.
6. Scalabilité : importer lot de villes dans `apps/next-leads/lib/cities.ts` (script ou CSV), regénérer le sitemap, vérifier le contenu avant mise en index.

---

Questions ou évolutions : mettez à jour les constantes partagées, enrichissez les gabarits et pensez à adapter les tests si vous modifiez la structure du formulaire ou de l’API.
