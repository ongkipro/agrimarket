import { useState } from 'react'
import {
  TrendingUp,
  Filter,
} from 'lucide-react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
  formatIDR,
} from '@/features/agri/data-provider'

export function AttractivenessMatrix() {
  const commodities = getCommodities()
  const [selectedSector, setSelectedSector] = useState<string>('ALL')
  const [sortField, setSortField] = useState<'score' | 'market' | 'intensity' | 'conversion'>('score')

  // Calculate composite attractiveness score (0 - 100)
  const scoredCommodities = commodities.map((crop) => {
    // Market potential score (0 - 35 pts, based on total input market value)
    const marketScore = Math.min(35, (crop.sam.total_input_market_value_trillion_idr / 80) * 35)

    // Intensity score (0 - 30 pts, based on spending per ha)
    const intensityScore = Math.min(30, (crop.sam.input_spending_per_ha_idr / 50_000_000) * 30)

    // Conversion score (0 - 20 pts, based on SAM conversion %)
    const conversionScore = (crop.sam.conversion_rate_pct / 100) * 20

    // Affordability/solvency score (0 - 15 pts, based on R3 driver)
    const solvencyScore = crop.sam.drivers.r3_economic_affordability * 15

    const compositeScore = Math.round(marketScore + intensityScore + conversionScore + solvencyScore)

    let tier: 'Tier 1 Priority' | 'Tier 2 High Margin' | 'Tier 3 Volume' | 'Tier 4 Niche'
    if (compositeScore >= 80) tier = 'Tier 1 Priority'
    else if (compositeScore >= 65) tier = 'Tier 2 High Margin'
    else if (compositeScore >= 50) tier = 'Tier 3 Volume'
    else tier = 'Tier 4 Niche'

    return {
      ...crop,
      compositeScore,
      tier,
      intensityMillionPerHa: Number((crop.sam.input_spending_per_ha_idr / 1_000_000).toFixed(1)),
      marketValueTrillion: crop.sam.total_input_market_value_trillion_idr,
    }
  })

  const filteredCrops =
    selectedSector === 'ALL'
      ? scoredCommodities
      : scoredCommodities.filter((c) => c.sector === selectedSector)

  const sortedCrops = [...filteredCrops].sort((a, b) => {
    if (sortField === 'score') return b.compositeScore - a.compositeScore
    if (sortField === 'market') return b.marketValueTrillion - a.marketValueTrillion
    if (sortField === 'intensity') return b.intensityMillionPerHa - a.intensityMillionPerHa
    return b.sam.conversion_rate_pct - a.sam.conversion_rate_pct
  })

  const sectors = ['ALL', ...Array.from(new Set(commodities.map((c) => c.sector)))]

  // Chart data for scatter plot
  const scatterColors = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#14b8a6', '#d946ef', '#eab308', '#64748b']

  const scatterData = scoredCommodities.map((c, i) => ({
    name: c.name,
    x: c.intensityMillionPerHa,
    y: c.marketValueTrillion,
    z: c.compositeScore,
    color: scatterColors[i % scatterColors.length],
  }))

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <TrendingUp className='h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            13-Commodity Strategic Attractiveness Matrix
          </span>
        </div>
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Header Description & Sector Filter Pills */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h1 className='text-xl font-bold tracking-tight'>
              Market Attractiveness & Portfolio Prioritization
            </h1>
            <p className='text-xs text-muted-foreground mt-0.5'>
              Multi-criteria ranking evaluating total market size, per-hectare chemical intensity, and commercial qualification rates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className='flex flex-wrap items-center gap-1.5'>
            <Filter className='h-3.5 w-3.5 text-muted-foreground mr-1' />
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                  selectedSector === sec
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground hover:bg-muted border-border'
                }`}
              >
                {sec === 'ALL' ? 'All Sectors' : sec.replace('Hortikultura ', 'Horti ')}
              </button>
            ))}
          </div>
        </div>

        {/* Scatter Plot: Input Intensity vs Total Market Size */}
        <Card className='border shadow-xs'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle className='text-sm font-semibold'>
                  Attractiveness Scatter Plot: Chemical Intensity vs Input Market Size
                </CardTitle>
                <CardDescription>
                  X-Axis: Input Spend Intensity (Million IDR/Ha) | Y-Axis: Total Annual SAM Potential (Trillion IDR)
                </CardDescription>
              </div>
              <Badge variant='outline' className='text-xs'>
                13 Crops Mapped
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className='h-[320px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                  <XAxis
                    type='number'
                    dataKey='x'
                    name='Input Spend'
                    unit='M/Ha'
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    type='number'
                    dataKey='y'
                    name='Market Size'
                    unit='T'
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ZAxis type='number' dataKey='z' range={[60, 400]} name='Score' />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(val: unknown, name: unknown) => [
                      name === 'Input Spend'
                        ? `Rp ${String(val)} Juta/Ha`
                        : name === 'Market Size'
                        ? `Rp ${String(val)} Triliun`
                        : `${String(val)} Pts`,
                      String(name),
                    ]}
                    content={({ payload }) => {
                      if (!payload || payload.length === 0) return null
                      const data = payload[0].payload
                      return (
                        <div className='rounded-lg border bg-card p-2.5 shadow-md text-xs space-y-1'>
                          <div className='font-bold text-foreground'>{data.name}</div>
                          <div className='text-muted-foreground'>
                            Intensity: <span className='font-mono font-semibold'>Rp {data.x} Juta/Ha</span>
                          </div>
                          <div className='text-muted-foreground'>
                            Market Size: <span className='font-mono font-semibold'>Rp {data.y} Triliun</span>
                          </div>
                          <div className='text-emerald-600 font-bold'>
                            Score: {data.z}/100
                          </div>
                        </div>
                      )
                    }}
                  />
                  <Scatter data={scatterData}>
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Multi-Criteria Scoring Table */}
        <Card className='border shadow-xs'>
          <CardHeader className='flex flex-row items-center justify-between pb-3'>
            <div>
              <CardTitle className='text-sm font-semibold'>
                Comprehensive Commodity Attractiveness Scorecard
              </CardTitle>
              <CardDescription>
                Ranked by composite attractiveness scoring engine (0 - 100)
              </CardDescription>
            </div>
            <div className='flex items-center gap-1 text-xs'>
              <span className='text-muted-foreground mr-1'>Sort:</span>
              <button
                onClick={() => setSortField('score')}
                className={`px-2 py-1 rounded border text-[11px] cursor-pointer ${
                  sortField === 'score' ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
              >
                Score
              </button>
              <button
                onClick={() => setSortField('market')}
                className={`px-2 py-1 rounded border text-[11px] cursor-pointer ${
                  sortField === 'market' ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
              >
                Market (IDR)
              </button>
              <button
                onClick={() => setSortField('intensity')}
                className={`px-2 py-1 rounded border text-[11px] cursor-pointer ${
                  sortField === 'intensity' ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
              >
                Spend / Ha
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='text-[11px] text-muted-foreground sm:hidden mb-2'>
              ← Geser tabel ke kanan untuk melihat rincian SAM & Skor →
            </div>
            <div className='w-full overflow-x-auto rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-muted/50 text-xs font-semibold'>
                    <TableHead className='w-[60px] text-center'>Rank</TableHead>
                    <TableHead className='sticky left-0 bg-background z-20 border-r shadow-xs min-w-[130px]'>Commodity</TableHead>
                    <TableHead>Sector</TableHead>
                    <TableHead className='text-right'>Input Spend / Ha</TableHead>
                    <TableHead className='text-right'>Total Input SAM</TableHead>
                    <TableHead className='text-right'>SAM %</TableHead>
                    <TableHead className='text-right'>TAM Footprint</TableHead>
                    <TableHead className='text-center'>Strategic Tier</TableHead>
                    <TableHead className='text-right'>Score / 100</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCrops.map((crop, index) => (
                    <TableRow key={crop.id} className='hover:bg-muted/40 transition-colors text-xs'>
                      <TableCell className='text-center font-bold font-mono text-muted-foreground'>
                        #{index + 1}
                      </TableCell>
                      <TableCell className='font-semibold text-foreground sticky left-0 bg-background z-10 border-r shadow-xs min-w-[130px] py-3 sm:py-2.5'>
                        {crop.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant='outline' className='text-[10px] font-normal'>
                          {crop.sector.replace('Hortikultura ', '')}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right font-mono'>
                        {formatIDR(crop.sam.input_spending_per_ha_idr, 'compact')}/Ha
                      </TableCell>
                      <TableCell className='text-right font-mono font-semibold text-indigo-600 dark:text-indigo-400'>
                        Rp {crop.marketValueTrillion.toFixed(2)} T
                      </TableCell>
                      <TableCell className='text-right font-mono font-medium text-emerald-600 dark:text-emerald-400'>
                        {formatPct(crop.sam.conversion_rate_pct)}
                      </TableCell>
                      <TableCell className='text-right font-mono text-muted-foreground'>
                        {formatHa(crop.tam.harvest_area_ha)}
                      </TableCell>
                      <TableCell className='text-center'>
                        <Badge
                          variant='outline'
                          className={`text-[10px] font-semibold ${
                            crop.tier === 'Tier 1 Priority'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                              : crop.tier === 'Tier 2 High Margin'
                              ? 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
                              : crop.tier === 'Tier 3 Volume'
                              ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {crop.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right font-bold text-sm font-mono'>
                        <span
                          className={`inline-block px-2 py-0.5 rounded ${
                            crop.compositeScore >= 80
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : crop.compositeScore >= 65
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {crop.compositeScore}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}
