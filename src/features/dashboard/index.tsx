import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Download, Sliders, MapPin, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { MacroKpiCards } from './components/macro-kpi-cards'
import { SectoralBreakdown } from './components/sectoral-breakdown'
import { CommodityQuickTable } from './components/commodity-quick-table'
import { NationalAgronomicAlerts } from './components/national-agronomic-alerts'
import { getDataset } from '@/features/agri/data-provider'

export function Dashboard() {
  const dataset = getDataset()
  const [downloading, setDownloading] = useState(false)

  const handleExportJson = () => {
    setDownloading(true)
    const blob = new Blob([JSON.stringify(dataset, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `agrimarket-indonesia-master-dataset-2024.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setTimeout(() => setDownloading(false), 800)
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <TopNav links={topNav} className='me-auto' />
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Main Content ===== */}
      <Main className='space-y-6'>
        {/* Title & Quick Actions */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <div className='flex items-center gap-2'>
              <h1 className='text-2xl font-bold tracking-tight'>Agrimarket Executive Telemetry</h1>
              <span className='inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'>
                <Sparkles className='mr-1 h-3 w-3' /> BPS 2024 Verified
              </span>
            </div>
            <p className='text-xs text-muted-foreground mt-0.5'>
              National market sizing (TAM), qualified input commercial addressability (SAM), and internal capture capability (SOM) across 13 strategic crops.
            </p>
          </div>
          <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto'>
            <Button variant='outline' size='sm' className='min-h-[44px] sm:min-h-9 flex-1 sm:flex-initial justify-center' asChild>
              <Link to='/simulator'>
                <Sliders className='mr-1.5 h-3.5 w-3.5' />
                SOM Simulator
              </Link>
            </Button>
            <Button variant='outline' size='sm' className='min-h-[44px] sm:min-h-9 flex-1 sm:flex-initial justify-center' asChild>
              <Link to='/map'>
                <MapPin className='mr-1.5 h-3.5 w-3.5' />
                Geospatial Map
              </Link>
            </Button>
            <Button size='sm' onClick={handleExportJson} disabled={downloading} className='min-h-[44px] sm:min-h-9 flex-1 sm:flex-initial justify-center'>
              <Download className='mr-1.5 h-3.5 w-3.5' />
              {downloading ? 'Exporting...' : 'Export Dataset'}
            </Button>
          </div>
        </div>

        {/* 1. Macro KPI Telemetry Cards */}
        <MacroKpiCards />

        {/* 2. Sectoral Breakdown (TAM vs SAM + Input Market Pie) */}
        <SectoralBreakdown />

        {/* 3. 13 Strategic Commodities Matrix */}
        <CommodityQuickTable />

        {/* 4. Strategic Agronomic Alerts & Macro Drivers */}
        <div className='space-y-2'>
          <h2 className='text-sm font-semibold tracking-tight text-foreground'>
            Strategic Market Catalysts & Agronomic Intelligence
          </h2>
          <NationalAgronomicAlerts />
        </div>
      </Main>
    </>
  )
}

const topNav = [
  {
    title: 'Overview',
    href: '/',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Commodities',
    href: '/commodities',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Geospatial Map',
    href: '/map',
    isActive: false,
    disabled: false,
  },
  {
    title: 'SOM Simulator',
    href: '/simulator',
    isActive: false,
    disabled: false,
  },
  {
    title: 'Matrix',
    href: '/matrix',
    isActive: false,
    disabled: false,
  },
  {
    title: 'BPS Ledger',
    href: '/audit',
    isActive: false,
    disabled: false,
  },
]
