<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot instructions — Desamiantage-Fraance monorepo

Goal: Give an AI coding agent the minimal, concrete knowledge to be productive in this monorepo (build/run/test, major boundaries, patterns, and exact file locations to change).

Quick summary
- Monorepo with two apps: `apps/next-leads` (Next.js 14, recommended) and `apps/static-leads` (static HTML + Netlify forms).
- Shared utilities live in `packages/shared` and are imported as `@desamiant/shared`.
- Root scripts delegate to `scripts/stack-run.mjs` and respect `STACK=next|static`.

Essential commands (run from repo root)
- Install: `npm install` (monorepo uses plain npm). Root `package.json` scripts route commands to the active stack.
- Start dev (recommended): `STACK=next npm run dev` or target workspace directly:`npm run dev --workspace apps/next-leads`.
- Build: `npm run build` (routes to the chosen stack). For Next only: `npm run build --workspace apps/next-leads`.
- Lint: `npm run lint` (uses root script router).
- Tests (Next): `npm run test --workspace apps/next-leads` or inside the app `cd apps/next-leads && npm run test` (uses Vitest).

Big picture architecture (what changes affect what)
- Frontend: `apps/next-leads` is the Next.js app using the App Router. UI lives under `apps/next-leads/app/` and reusable UI in `apps/next-leads/components/`.
- Data & config: `apps/next-leads/lib/` contains city data (`lib/cities.ts`), SEO helpers, and API wiring.
- API: the lead intake endpoint is under `apps/next-leads/app/api/lead` (server-side validation, scoring, and Google Sheets webhook).
- Shared logic: `packages/shared` contains shared validators (Zod), constants, scoring and anti-spam logic used by both apps.
- Integration: Google Sheets webhook implemented in `apps-script/Code.gs` — deploy and put its URL in `.env` as `SHEETS_WEBHOOK_URL`.

Project-specific conventions (do these, or your changes will break flows)
- Always preserve Zod schemas in `packages/shared/validators.ts`. Both client and server expect the same shapes.
- Env-driven stack: the root scripts use `STACK` (see `scripts/stack-run.mjs`). When changing startup logic, respect the stack router.
- Transpiled shared package: `apps/next-leads/next.config.mjs` lists `transpilePackages: ["@desamiant/shared"]`. If you change exports/paths in `packages/shared`, update `next.config.mjs` and the `exports` in `packages/shared/package.json`.
- Tests & aliases: Vitest resolves aliases configured in `apps/next-leads/vitest.config.ts` (e.g., `@/lib`, `@/components`, `@shared`). Keep those aliases in sync if you move files.
- Tailwind + globals: global styles live in `apps/next-leads/styles/globals.css` and are used across the app — prefer Tailwind utilities.

Key files to inspect before editing
- Startup/router: `scripts/stack-run.mjs`
- Next app entry & routes: `apps/next-leads/app/` (layout, page.tsx, API routes under `app/api`)
- City & sitemap source: `apps/next-leads/lib/cities.ts` and `apps/next-leads/lib/sitemap.ts`
- Shared logic: `packages/shared/index.ts`, `packages/shared/validators.ts`, `packages/shared/antiSpam.ts`
- Vitest config: `apps/next-leads/vitest.config.ts` and `apps/next-leads/vitest.setup.ts` (test environment & aliases)
- Next config (env & redirects): `apps/next-leads/next.config.mjs`
- Google Sheets integration: `apps-script/Code.gs`

Common concrete tasks & examples
- Add a new city route: modify `apps/next-leads/lib/cities.ts` to include the city (slug, name, cp, dept). The app and sitemap regenerate from this file.
- Update form validation: update Zod schema in `packages/shared/validators.ts` and adjust any client-side mirrors in `apps/next-leads/components/ContactForm.tsx`.
- Change lead processing: modify server logic under `apps/next-leads/app/api/lead/*` and ensure tests in `apps/next-leads` still pass (`npm run test --workspace apps/next-leads`).
- Wire a new env var: add to `apps/next-leads/next.config.mjs` under `env:` so it's exposed properly. Rebuild after changes.

Pitfalls & gotchas
- Env changes require restart/rebuild (Next compiles env at build time). If you add a `NEXT_PUBLIC_` variable, ensure it is declared in `next.config.mjs` or present at build time.
- Shared package is imported via a file reference in `apps/next-leads/package.json` (`"@desamiant/shared": "file:../../packages/shared"`). When changing `packages/shared` exports, keep `package.json` `exports` and `main/types` fields coherent.
- Tests assume jsdom environment and aliases from `vitest.config.ts`. Running Vitest from a different cwd without the config will fail.

How to validate changes quickly
- Run unit tests for the Next app: `npm run test --workspace apps/next-leads`.
- Start dev with stack set: `STACK=next npm run dev` and exercise forms (submit and check Google Sheet row). Use `SHEETS_WEBHOOK_URL` pointing to `apps-script/Code.gs` deployment.

If you are an AI editing code
- Only change files listed above when necessary. When adding exports or changing shared schemas, update tests and `vitest.config.ts` aliases if needed.
- Add a short rationale in your PR comment: which stack you targeted (next|static), which files changed, and how you validated (tests/dev run/manual form submission).

Questions or missing info
- If you need runtime secrets or the deployed Apps Script URL, ask the human — those are not in the repo.

End of file.
