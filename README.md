# volum-admin

Primary reference implementation for our admin dashboards. Upstream provenance and attribution are recorded in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

Reuse the shell, navigation, tables, forms, overlays, themes, and responsive patterns. Business modules are examples: dashboard metrics, tasks, users, app connections, and chats use demo data. The ordinary `_authenticated` layout is **not an authentication guard**. Clerk is an optional, separate integration; its user table still uses demo data.

## Run locally

Use Node.js 24 and pnpm with the committed lockfile:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

No credentials are needed for the ordinary demo pages. Clerk routes show setup guidance when no publishable key is configured. Never put private credentials into Vite client environment variables.

With pnpm versions that require dependency build approval, review the reported packages and their lifecycle scripts before allowing individual builds. Do not disable the policy globally. A blocked install is not a successful installation.

## Checks

```sh
pnpm lint
pnpm build
pnpm test
pnpm format:check
```

Tests use Vitest browser mode and Playwright Chromium. The declared Playwright version needs its matching browser binary. The upstream `test:browser:install` script also installs OS dependencies; inspect it before use. For a user-local browser download only, use `pnpm exec playwright install chromium`.

## Development dictionary

[DEVELOPMENT-MAP.xml](DEVELOPMENT-MAP.xml) is the canonical page/section inventory, not an execution queue. It maps URL patterns to route files, component owners, shared sections, fields, dialogs, data sources, and known implementation gaps. Its vocabulary is defined inside the XML.

- Start with the page URL, then locate its section and source file.
- Shared sections are defined once and referenced by ID.
- `demo` means a UI example, not persisted business behavior.
- `local` means browser-local behavior; `provider` means optional Clerk behavior.
- `placeholder`, `disabled`, and `missing` are explicitly incomplete.
- Update the map in the same change as a route or section change.
- Source code wins if the map drifts; do not edit `src/routeTree.gen.ts` by hand.

Agent instructions: [AGENTS.md](AGENTS.md).

## Structure

| Path                               | Responsibility                                       |
| ---------------------------------- | ---------------------------------------------------- |
| `src/routes/`                      | TanStack Router route definitions and URL validation |
| `src/features/`                    | Page composition, forms, tables, demo data           |
| `src/components/layout/`           | Sidebar, header, navigation, workspace switcher      |
| `src/components/data-table/`       | Reusable table controls                              |
| `src/components/ui/`               | Locally owned shadcn/Radix primitives                |
| `src/context/`                     | Theme, font, direction, layout, search preferences   |
| `src/hooks/use-table-url-state.ts` | Table search and pagination URL state                |
| `src/styles/theme.css`             | Light/dark semantic tokens                           |
| `src/stores/auth-store.ts`         | Demo client auth state, not server authorization     |

Stack: React 19, TypeScript, Vite 8, Tailwind 4, TanStack Router/Query/Table v8, React Hook Form, Zod, Zustand, Recharts, and optional Clerk. Package versions are owned by `package.json` and `pnpm-lock.yaml`.

## Pattern maintenance

Preserve the existing density, responsive navigation, keyboard behavior, and light/dark themes. Rebranding currently uses the existing Command mark; a distinct logo is not yet designed. Keep provider logos and library names accurate.

Some UI primitives have upstream RTL/custom modifications: scroll-area, sonner, separator, alert-dialog, calendar, command, dialog, dropdown-menu, select, table, sheet, sidebar, and switch. Inspect local differences before replacing components through the shadcn CLI.

New operational modules need their own roles, permissions, lifecycle, API, loading/error states, and persistence contracts. Existing demo actions and success toasts are not those contracts. Terms/privacy links and several dashboard actions are not implemented; see the map.

## Upstream provenance

Baseline: `e16c87f213a5ba5e45964e9b67c792105ec74d26` (upstream package version 2.2.1).
The root LICENSE file has been replaced by [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md), preserving the original copyright and permission notice in full. Rebranding does not remove that notice.

Repository: [ongkipro/volum-admin](https://github.com/ongkipro/volum-admin) (private). This linked worktree uses the `volum` remote for this repository; `origin` still belongs to the upstream clone and is not a push target for Volum work. No production hostname or deployment target has been assigned.
