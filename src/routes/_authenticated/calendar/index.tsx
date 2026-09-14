import { createFileRoute } from '@tanstack/react-router'
import { CroppingCalendar } from '@/features/calendar'

export const Route = createFileRoute('/_authenticated/calendar/')({
  component: CroppingCalendar,
})
