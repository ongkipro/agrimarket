import { createFileRoute } from '@tanstack/react-router'
import { SomSimulator } from '@/features/simulator'

export const Route = createFileRoute('/_authenticated/simulator/')({
  component: SomSimulator,
})
