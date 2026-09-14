# Contributing to volum-admin

Read [README.md](../README.md), [AGENTS.md](../AGENTS.md), and the affected entries in [DEVELOPMENT-MAP.xml](../DEVELOPMENT-MAP.xml) before changing code.

## Local development

Use the existing local checkout or an approved repository URL. Create a feature worktree, then install dependencies with the committed lockfile:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Keep contributions within the agreed scope. Reuse the existing components and preserve keyboard access, responsive behavior, and both themes. Update the development map when routes or sections change.

## Verification

```sh
pnpm lint
pnpm format:check
pnpm build
pnpm test
```

Run the relevant tests for the change. For visible changes, inspect affected pages in a real browser and include the viewport, scenario, and result. Report any checks that could not run and why.

## Pull requests and issues

Use the [pull request template](PULL_REQUEST_TEMPLATE.md). Describe the problem, resulting behavior, and verification. Report bugs with reproducible steps and expected behavior; propose features with the operator job and desired outcome.

Use the [volum-admin issue tracker](https://github.com/ongkipro/volum-admin/issues). No external support or discussion destination is configured.

Follow the [Code of Conduct](CODE_OF_CONDUCT.md). Preserve [third-party notices](../THIRD-PARTY-NOTICES.md). Commit and push only when authorized by the repository owner.
