import { createFileRoute } from '@tanstack/react-router'
import { AttractivenessMatrix } from '@/features/matrix'

export const Route = createFileRoute('/_authenticated/matrix/')({
  component: AttractivenessMatrix,
})
