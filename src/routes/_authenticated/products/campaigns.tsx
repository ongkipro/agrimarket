import { createFileRoute } from '@tanstack/react-router'
import { CampaignsView } from '@/features/products/campaigns-view'

export const Route = createFileRoute('/_authenticated/products/campaigns')({
  component: CampaignsView,
})
