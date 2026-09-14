import { createFileRoute } from '@tanstack/react-router'
import { DistributionNetwork } from '@/features/distribution'

export const Route = createFileRoute('/_authenticated/distribution/')({
  component: DistributionNetwork,
})
