import { createFileRoute } from '@tanstack/react-router'
import { AdsGrowthEngine } from '@/features/ads'

export const Route = createFileRoute('/_authenticated/ads/')({
  component: AdsGrowthEngine,
})
