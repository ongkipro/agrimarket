import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Circle,
  CheckCircle,
  AlertCircle,
  Timer,
  HelpCircle,
  CircleOff,
} from 'lucide-react'

export const labels = [
  {
    value: 'demoplot',
    label: 'Demoplot & Riset',
  },
  {
    value: 'kios_kpl',
    label: 'Kios KPL & Audit',
  },
  {
    value: 'opt_hama',
    label: 'Tanggap OPT & Hama',
  },
  {
    value: 'distribusi',
    label: 'Distribusi & Logistik',
  },
  {
    value: 'ads_leads',
    label: 'Digital Leads Meta/Google',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    label: 'Backlog',
    value: 'backlog' as const,
    icon: HelpCircle,
  },
  {
    label: 'Todo',
    value: 'todo' as const,
    icon: Circle,
  },
  {
    label: 'In Progress',
    value: 'in progress' as const,
    icon: Timer,
  },
  {
    label: 'Done',
    value: 'done' as const,
    icon: CheckCircle,
  },
  {
    label: 'Canceled',
    value: 'canceled' as const,
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low' as const,
    icon: ArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium' as const,
    icon: ArrowRight,
  },
  {
    label: 'High',
    value: 'high' as const,
    icon: ArrowUp,
  },
  {
    label: 'Critical',
    value: 'critical' as const,
    icon: AlertCircle,
  },
]
