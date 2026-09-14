# volum-admin — agent instructions

## Purpose and boundaries

This repository owns our primary reusable admin UI pattern. Display and package name: `volum-admin`. Use English for code, documentation, and product copy. Preserve the current shell and component conventions; business-specific requirements need explicit scope.

This is a UI reference with demo data, not a completed backend application. Never represent mock actions, client auth state, or the `_authenticated` directory name as real authentication, authorization, tenant isolation, or persistence.

## Read before editing

1. Read `README.md` and the affected entries in `DEVELOPMENT-MAP.xml`.
2. Inspect route, page, shared components, schema, handlers, and all callers.
3. Check the repository root, base HEAD, and dirty paths. Preserve existing work.
4. Work in a feature worktree. Do not commit, push, deploy, or change remotes without user authorization.

The source is authoritative. The XML is the sole page/section dictionary; keep it aligned with code. If product planning is added, extend existing repository documents and keep `TASKS.md` as the sole execution queue.

## Change rules

- Reuse `src/components/ui`, `layout`, and `data-table` before adding helpers or dependencies.
- Keep TanStack Table code compatible with the installed v8 API.
- Route files belong in `src/routes`; feature composition belongs in `src/features`.
- Let the router plugin regenerate `src/routeTree.gen.ts`.
- Use semantic tokens from `src/styles/theme.css`; retain light/dark and RTL behavior.
- Route visual changes through a designer/vision capability before the first visual edit. Report inability to start that capability.
- Keep accessible names, keyboard focus, validation, error recovery, and confirmations intact.
- Never replace an optional provider integration with invented auth behavior.
- Preserve `THIRD-PARTY-NOTICES.md` and upstream provenance.
- Do not read secret files or use real customer data for demo verification.

## Verification

Use the package scripts: lint, build, relevant tests, format check. Do not approve lifecycle scripts automatically or weaken environment policies. If pnpm fails before a script starts, report that separately from the check result.

For browser-visible changes, open affected routes in a real browser and inspect the rendered result. Check narrow/wide layouts when text or structure could change width; verify both themes when theme or preview assets change. Use the installed Playwright runner and local origin. Never claim a build proves the UI works.

Record commands, outcomes, limitations, and changed files in the handoff. Keep runtime artifacts out of tracked source unless they are intentional reference assets. Never auto-update screenshots to conceal an unexplained regression.
