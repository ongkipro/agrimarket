import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { CommoditiesExplorer } from '@/features/commodities'

const commoditiesSearchSchema = z.object({
  crop: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/commodities/')({
  validateSearch: commoditiesSearchSchema,
  component: CommoditiesExplorer,
})
