import { createFileRoute } from '@tanstack/react-router'
import { GeospatialMap } from '@/features/map'

export const Route = createFileRoute('/_authenticated/map/')({
  component: GeospatialMap,
})
