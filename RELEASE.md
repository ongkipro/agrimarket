# Release Manifest — agrimarket

Release-ID: REL-20260914-01
Base: 40aee91
Environment: production
Declared-Risk: R1
Rollback-Ref: 40aee91
Rollback-Command: git reset --hard 40aee91 && vercel --prod
Backup-Proof: NOT_REQUIRED
Status: DEPLOYED
Live-URL: https://agrimarket-five.vercel.app
Deployment-ID: dpl_ALBcTTfifktfjUX6q6vd1HMXyhFS
Target-Git-Ref: refs/heads/main
Verified-By: project-check --full

## Contract

This file defines the current release boundary. It is repository truth for release-specific metadata and MUST describe only the release currently being prepared.

- `Base` is the last deployed/accepted commit and must be an ancestor of `HEAD`.
- `Declared-Risk` is the human/agent-declared release risk (`R0`–`R4`).
- `Rollback-Ref` is the commit to restore if deployment fails; normally it equals `Base`.
- `Rollback-Command` is an explicit supported repository/runbook command, not an assertion such as `true`. Do not put secrets here.
- `Backup-Proof` is `NOT_REQUIRED` unless migration risk requires a structured `backup://`, `snapshot://`, or artifact reference.
- Set `Status: READY` only after the release scope is frozen for production gating.
