import { createFileRoute } from '@tanstack/react-router'
import { MixMatchView } from '@/features/products/mix-match-view'

export const Route = createFileRoute('/_authenticated/products/mix-match')({
  component: MixMatchView,
})
