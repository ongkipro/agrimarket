import { AlertTriangle, Info, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function NationalAgronomicAlerts() {
  const alerts = [
    {
      type: 'policy',
      icon: Info,
      title: 'Permentan No. 10 / 2022 Input Subsidy Realignment',
      badge: 'Regulatory Catalyst',
      badgeVariant: 'default',
      description:
        'Subsidized fertilizer restricted strictly to Padi, Jagung, and Kedelai (Urea & NPK only). Horticultural crops (Cabai, Bawang Merah, Kentang, Tomat) and Perkebunan (Kelapa Sawit) now rely 100% on commercial private inputs, creating an immediate Rp 42.8 Trillion commercial addressable market expansion.',
    },
    {
      type: 'weather',
      icon: AlertTriangle,
      title: 'La Nina Transition & Pest Warning (Subround 1 - 2)',
      badge: 'Agronomic Risk',
      badgeVariant: 'secondary',
      description:
        'Elevated precipitation increases anthracnose (patek) risk on Cabai and Phytophthora infestans on Kentang & Tomat in highland clusters (Dieng, Pangalengan). Recommend increased stocking of protective copper & systemic strobilurin fungicides.',
    },
    {
      type: 'credit',
      icon: ShieldAlert,
      title: 'Farmer Yarnen Credit Exposure (Pay-at-Harvest)',
      badge: 'Commercial Governance',
      badgeVariant: 'outline',
      description:
        'ST2023 indicates 68-74% of horticulture farmers depend on kiosks for 90-120 day unsecured credit. Agronomist sales teams must enforce strict 60-day tempo ceilings and prioritize kiosk networks with working capital backing.',
    },
  ]

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      {alerts.map((alert) => {
        const Icon = alert.icon
        return (
          <Card key={alert.title} className='border shadow-xs'>
            <CardHeader className='pb-2'>
              <div className='flex items-center justify-between'>
                <Badge variant='outline' className='text-[10px] font-medium'>
                  {alert.badge}
                </Badge>
                <Icon className='h-4 w-4 text-muted-foreground' />
              </div>
              <CardTitle className='text-sm font-semibold mt-2'>{alert.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-xs text-muted-foreground leading-relaxed'>{alert.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
