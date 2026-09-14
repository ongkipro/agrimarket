import { useState } from 'react'
import {
  Sliders,
  DollarSign,
  AlertTriangle,
  Store,
  PieChart as PieIcon,
  Sprout,
  ShieldAlert,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  getCommodities,
  formatHa,
  formatPct,
  calculateDynamicSOM,
} from '@/features/agri/data-provider'

export function SomSimulator() {
  const commodities = getCommodities()
  const [selectedCropId, setSelectedCropId] = useState<string>(commodities[0]?.id || '')
  const selectedCrop = commodities.find((c) => c.id === selectedCropId) || commodities[0]

  // Interactive slider states
  const [salesReps, setSalesReps] = useState<number>(selectedCrop?.som_internal_capacity?.year1_sales_reps || 20)
  const [targetKiosksPerRep, setTargetKiosksPerRep] = useState<number>(25)
  const [avgSalesPerKioskMillion, setAvgSalesPerKioskMillion] = useState<number>(75)
  const [tempoCreditLimitBillion, setTempoCreditLimitBillion] = useState<number>(
    selectedCrop?.som_internal_capacity?.year1_tempo_limit_billion_idr || 15
  )
  const [subroundSeasonality, setSubroundSeasonality] = useState<number>(1.2)

  const somResult = calculateDynamicSOM(selectedCrop, {
    salesReps,
    targetKiosksPerRep,
    avgSalesPerKioskSeasonMillion: avgSalesPerKioskMillion,
    tempoCreditLimitBillion,
    subroundSeasonality,
  })

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <Sliders className='h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            Dynamic SOM Internal Capacity Simulation Engine
          </span>
        </div>
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Commodity Selector Pills */}
        <div className='overflow-x-auto pb-1 no-scrollbar'>
          <div className='flex items-center gap-2 min-w-max'>
            {commodities.map((crop) => (
              <button
                key={crop.id}
                onClick={() => {
                  setSelectedCropId(crop.id)
                  setSalesReps(crop?.som_internal_capacity?.year1_sales_reps || 20)
                  setTempoCreditLimitBillion(crop?.som_internal_capacity?.year1_tempo_limit_billion_idr || 15)
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  crop.id === selectedCrop.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-card text-foreground hover:bg-accent border-border'
                }`}
              >
                <span>{crop.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Crop Title Banner */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b'>
          <div>
            <h1 className='text-xl font-bold tracking-tight'>
              SOM Commercial Model: {selectedCrop.name}
            </h1>
            <p className='text-xs text-muted-foreground'>
              Simulate realizable revenue run-rate, kiosk coverage, and market penetration under varying sales team size and credit limits.
            </p>
          </div>
          <Badge variant='outline' className='self-start sm:self-auto font-mono text-xs'>
            National SAM: Rp {selectedCrop.sam.total_input_market_value_trillion_idr.toFixed(2)} Triliun
          </Badge>
        </div>

        {/* Simulation Dashboard Grid */}
        <div className='grid gap-6 lg:grid-cols-12'>
          {/* Controls Panel (5 Cols) */}
          <div className='lg:col-span-5 space-y-4'>
            <Card className='border shadow-xs'>
              <CardHeader className='pb-3'>
                <CardTitle className='text-sm font-semibold'>
                  Commercial Capacity Input Parameters
                </CardTitle>
                <CardDescription>
                  Adjust operational variables to calculate realizable SOM capture
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-5 text-xs'>
                {/* 1. Sales Agronomists */}
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold'>
                    <span>Field Agronomists (Sales Reps):</span>
                    <span className='font-mono text-primary font-bold text-sm'>{salesReps} Reps</span>
                  </div>
                  <input
                    type='range'
                    min='5'
                    max='150'
                    step='5'
                    value={salesReps}
                    onChange={(e) => setSalesReps(Number(e.target.value))}
                    className='w-full accent-primary cursor-pointer h-11 sm:h-7 py-2 touch-none'
                  />
                  <div className='flex justify-between text-[10px] text-muted-foreground'>
                    <span>5 Reps (Pilot)</span>
                    <span>150 Reps (National Force)</span>
                  </div>
                </div>

                {/* 2. Target Kiosks per Rep */}
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold'>
                    <span>Kiosks Managed per Agronomist:</span>
                    <span className='font-mono text-primary font-bold text-sm'>{targetKiosksPerRep} Kiosks</span>
                  </div>
                  <input
                    type='range'
                    min='10'
                    max='60'
                    step='5'
                    value={targetKiosksPerRep}
                    onChange={(e) => setTargetKiosksPerRep(Number(e.target.value))}
                    className='w-full accent-primary cursor-pointer h-11 sm:h-7 py-2 touch-none'
                  />
                  <div className='flex justify-between text-[10px] text-muted-foreground'>
                    <span>10 Kiosks (Deep engagement)</span>
                    <span>60 Kiosks (Broad distribution)</span>
                  </div>
                </div>

                {/* 3. Average Sales per Kiosk per Season */}
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold'>
                    <span>Avg. Sales per Kiosk / Season:</span>
                    <span className='font-mono text-primary font-bold text-sm'>
                      Rp {avgSalesPerKioskMillion} Juta
                    </span>
                  </div>
                  <input
                    type='range'
                    min='10'
                    max='300'
                    step='10'
                    value={avgSalesPerKioskMillion}
                    onChange={(e) => setAvgSalesPerKioskMillion(Number(e.target.value))}
                    className='w-full accent-primary cursor-pointer h-11 sm:h-7 py-2 touch-none'
                  />
                  <div className='flex justify-between text-[10px] text-muted-foreground'>
                    <span>Rp 10M (Small kiosks)</span>
                    <span>Rp 300M (Main distributors)</span>
                  </div>
                </div>

                {/* 4. Tempo Credit Facility Limit */}
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold'>
                    <span>Tempo Working Capital Credit Limit:</span>
                    <span className='font-mono text-primary font-bold text-sm'>
                      Rp {tempoCreditLimitBillion} Miliar
                    </span>
                  </div>
                  <input
                    type='range'
                    min='2'
                    max='50'
                    step='2'
                    value={tempoCreditLimitBillion}
                    onChange={(e) => setTempoCreditLimitBillion(Number(e.target.value))}
                    className='w-full accent-primary cursor-pointer h-11 sm:h-7 py-2 touch-none'
                  />
                  <div className='flex justify-between text-[10px] text-muted-foreground'>
                    <span>Rp 2 Miliar</span>
                    <span>Rp 50 Miliar</span>
                  </div>
                </div>

                {/* 5. Subround Seasonality Multiplier */}
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold'>
                    <span>Seasonality Demand Index:</span>
                    <span className='font-mono text-primary font-bold text-sm'>{subroundSeasonality.toFixed(1)}x</span>
                  </div>
                  <input
                    type='range'
                    min='0.8'
                    max='2.0'
                    step='0.1'
                    value={subroundSeasonality}
                    onChange={(e) => setSubroundSeasonality(Number(e.target.value))}
                    className='w-full accent-primary cursor-pointer h-11 sm:h-7 py-2 touch-none'
                  />
                  <div className='flex justify-between text-[10px] text-muted-foreground'>
                    <span>0.8x (Off-season)</span>
                    <span>1.2x (Normal)</span>
                    <span>2.0x (Peak Panen Raya)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel (7 Cols) */}
          <div className='lg:col-span-7 space-y-4'>
            {/* Real-time Telemetry Cards */}
            <div className='grid gap-3 sm:grid-cols-2'>
              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span className='text-xs uppercase font-medium'>Projected Realizable Revenue</span>
                    <DollarSign className='h-4 w-4 text-emerald-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
                    Rp {somResult.constrainedRevenueBillion.toFixed(2)} Miliar
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Annual commercial SOM run-rate
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span className='text-xs uppercase font-medium'>Attainable Market Share (vs SAM)</span>
                    <PieIcon className='h-4 w-4 text-indigo-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
                    {formatPct(somResult.marketSharePct)}
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Of national qualified input market
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span className='text-xs uppercase font-medium'>Retail Kiosks Activated</span>
                    <Store className='h-4 w-4 text-blue-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold font-mono text-foreground'>
                    {somResult.totalKiosksTargeted.toLocaleString('id-ID')} Kiosks
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Across priority distribution corridors
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between text-muted-foreground'>
                    <span className='text-xs uppercase font-medium'>Attainable Hectares</span>
                    <Sprout className='h-4 w-4 text-amber-600' />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold font-mono text-foreground'>
                    {formatHa(somResult.attainableHectares)}
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Direct farmer acreage treated
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Credit Ceiling Constraint Meter */}
            <Card className='border shadow-xs'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-semibold flex items-center justify-between'>
                  <span>Working Capital Credit Utilization</span>
                  <span className='font-mono text-xs'>
                    {somResult.tempoCreditUtilizationPct.toFixed(1)}% Used
                  </span>
                </CardTitle>
                <CardDescription>
                  Ratio of sales turnover against allowable revolving tempo credit exposure
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-3 text-xs'>
                <div className='h-3 w-full rounded-full bg-muted overflow-hidden'>
                  <div
                    className={`h-full rounded-full transition-all ${
                      somResult.tempoCreditUtilizationPct > 90
                        ? 'bg-rose-500'
                        : somResult.tempoCreditUtilizationPct > 70
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, somResult.tempoCreditUtilizationPct)}%` }}
                  />
                </div>

                {somResult.isWorkingCapitalConstrained ? (
                  <div className='flex items-start gap-2 rounded-md border border-rose-200 bg-rose-50 p-3 text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300'>
                    <AlertTriangle className='h-4 w-4 shrink-0 mt-0.5' />
                    <div>
                      <div className='font-semibold'>Working Capital Constraint Triggered!</div>
                      <div className='mt-0.5 text-[11px] leading-relaxed'>
                        Unconstrained sales demand (Rp {somResult.grossSalesPotentialBillion.toFixed(2)} Miliar) exceeds the max credit ceiling supported by your Rp {tempoCreditLimitBillion} Miliar tempo line. Increase working capital or tighten dealer collection terms to capture full field demand.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 text-muted-foreground text-[11px]'>
                    <ShieldAlert className='h-3.5 w-3.5 text-emerald-600' />
                    <span>Credit risk within safe working capital boundary limits.</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Year 1 vs Year 3 Benchmark Comparison */}
            <Card className='border shadow-xs'>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-semibold'>
                  3-Year Strategic Trajectory Benchmarks ({selectedCrop.name})
                </CardTitle>
                <CardDescription className='text-[11px]'>
                  Harmonized operational capacity model comparing Year 1 ground launch with Year 3 corporate market penetration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs'>
                  <div className='rounded-md border p-3 bg-muted/20 space-y-1'>
                    <div className='text-muted-foreground font-semibold flex items-center justify-between'>
                      <span>Year 1 Baseline Target</span>
                      <Badge variant='outline' className='text-[9px] font-mono'>Operational Launch</Badge>
                    </div>
                    <div className='font-mono font-bold text-sm text-foreground'>
                      Rp {selectedCrop?.som_internal_capacity?.year1_projected_revenue_billion_idr || 15} Miliar
                    </div>
                    <div className='text-[11px] text-muted-foreground'>
                      Penetration: {formatHa(selectedCrop?.som_internal_capacity?.year1_penetration_ha || 15000)} ({selectedCrop?.som_internal_capacity?.year1_sales_reps || 20} reps / {((selectedCrop?.som_internal_capacity?.year1_sales_reps || 20) * 25).toLocaleString()} kiosks)
                    </div>
                    <div className='text-[10px] text-muted-foreground italic pt-0.5'>
                      *Calibrated directly from initial sales force capacity (Sales Reps × 25 Kiosks × Rp 75M × 1.2 Seasonality)
                    </div>
                  </div>

                  <div className='rounded-md border p-3 bg-muted/20 space-y-1'>
                    <div className='text-muted-foreground font-semibold flex items-center justify-between'>
                      <span>Year 3 Strategic Ambition</span>
                      <Badge variant='outline' className='text-[9px] font-mono text-indigo-600 dark:text-indigo-400'>Scaled Expansion</Badge>
                    </div>
                    <div className='font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400'>
                      {selectedCrop?.som_internal_capacity?.year3_target_market_share_pct || 8.5}% Target Share
                    </div>
                    <div className='text-[11px] text-muted-foreground'>
                      Projected Revenue: Rp {(((selectedCrop?.sam?.total_input_market_value_trillion_idr || 1) * 1000 * (selectedCrop?.som_internal_capacity?.year3_target_market_share_pct || 8.5)) / 100).toFixed(1)} Miliar
                    </div>
                    <div className='text-[10px] text-muted-foreground italic pt-0.5'>
                      *Multi-region distributor network & corporate account capture across full SAM
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
