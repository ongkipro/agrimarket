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

      {/* ===== Hero Homepage (Full-Width Background) ===== */}
      <section className='relative w-full border-b border-border/60 bg-gradient-to-b from-emerald-500/10 via-muted/20 to-background dark:from-emerald-950/30 dark:via-background dark:to-background overflow-hidden'>
        {/* Ambient Subtle Emerald Radial Glow */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(16,185,129,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(16,185,129,0.22),rgba(0,0,0,0))]' />
        {/* Subtle Precision Grid Backdrop */}
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:28px_28px]' />

        <div className='relative px-4 py-6 sm:px-6 sm:py-8 min-w-0 max-w-full @7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='max-w-3xl space-y-2'>
              <div className='flex flex-wrap items-center gap-2'>
                <span className='inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs'>
                  <Sparkles className='mr-1 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400' /> BPS 2024 Verified
                </span>
                <span className='inline-flex items-center rounded-md bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 shadow-xs'>
                  514 Districts Census
                </span>
                <span className='inline-flex items-center rounded-md bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 shadow-xs'>
                  Gate-0 Zero-Delta
                </span>
              </div>
              <h1 className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                Agrimarket Executive Telemetry
              </h1>
              <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
                National agricultural market sizing (TAM), qualified input commercial addressability (SAM), and realizable capture capability (SOM) across 13 strategic crops and 38 provinces.
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 w-full lg:w-auto shrink-0 pt-1 lg:pt-0'>
              <Button variant='outline' size='sm' className='min-h-[40px] sm:min-h-9 flex-1 sm:flex-initial justify-center shadow-xs' asChild>
                <Link to='/simulator'>
                  <Sliders className='mr-1.5 h-3.5 w-3.5 text-primary' />
                  SOM Simulator
                </Link>
              </Button>
              <Button variant='outline' size='sm' className='min-h-[40px] sm:min-h-9 flex-1 sm:flex-initial justify-center shadow-xs' asChild>
                <Link to='/map'>
                  <MapPin className='mr-1.5 h-3.5 w-3.5 text-emerald-600' />
                  Geospatial Map
                </Link>
              </Button>
              <Button size='sm' onClick={handleExportJson} disabled={downloading} className='min-h-[40px] sm:min-h-9 flex-1 sm:flex-initial justify-center shadow-xs'>
                <Download className='mr-1.5 h-3.5 w-3.5' />
                {downloading ? 'Exporting...' : 'Export Master JSON'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <Main className='space-y-6 pt-6'>

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
