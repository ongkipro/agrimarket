import { createFileRoute } from '@tanstack/react-router'
import { AgroClimateExplorer } from '@/features/climate'

export const Route = createFileRoute('/_authenticated/climate/')({
  component: AgroClimateExplorer,
})
