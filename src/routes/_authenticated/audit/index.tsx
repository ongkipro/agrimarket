import { createFileRoute } from '@tanstack/react-router'
import { AuditLedger } from '@/features/audit'

export const Route = createFileRoute('/_authenticated/audit/')({
  component: AuditLedger,
})
