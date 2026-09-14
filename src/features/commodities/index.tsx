import { useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'
import {
  Sprout,
  Calendar,
  Layers,
  DollarSign,
  Users,
  BookOpen,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  formatTon,
  formatPct,
  formatIDR,
} from '@/features/agri/data-provider'

const route = getRouteApi('/_authenticated/commodities/')

export function CommoditiesExplorer() {
  const commodities = getCommodities()
  const search = route.useSearch()
  const [userSelectedCropId, setUserSelectedCropId] = useState<string | null>(null)

  const selectedCropId =
    (userSelectedCropId && commodities.some((c) => c.id === userSelectedCropId)
      ? userSelectedCropId
      : search.crop && commodities.some((c) => c.id === search.crop)
        ? search.crop
        : commodities[0]?.id) || ''

  const setSelectedCropId = (id: string) => setUserSelectedCropId(id)

  const selectedCrop = commodities.find((c) => c.id === selectedCropId) || commodities[0]

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <Sprout className='h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            Commodity Deep Explorer (13 Strategic Crops)
          </span>
        </div>
        <div className='ms-auto flex items-center gap-2 shrink-0'>
          <Search className='hidden sm:flex' />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='space-y-6'>
        {/* Commodity Selector Horizontal Pills */}
        <div className='overflow-x-auto pb-1 no-scrollbar'>
          <div className='flex items-center gap-2 min-w-max'>
            {commodities.map((crop) => {
              const isSelected = crop.id === selectedCrop.id
              return (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-card text-foreground hover:bg-accent border-border'
                  }`}
                >
                  <span>{crop.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-sm ${
                      isSelected
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {crop.sector.replace('Hortikultura ', '')}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Crop Header Banner */}
        <Card className='border bg-card shadow-xs'>
          <CardContent className='p-4 sm:p-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                  <h1 className='text-2xl font-bold tracking-tight text-foreground'>
                    {selectedCrop.name}
                  </h1>
                  <span className='text-sm text-muted-foreground italic'>
                    ({selectedCrop.scientific_name})
                  </span>
                  <Badge variant='outline' className='text-xs'>
                    {selectedCrop.sector}
                  </Badge>
                </div>
                <p className='text-xs text-muted-foreground mt-1'>
                  Sizing pasar komoditas nasional: permodelan berjenjang TAM, SAM, SOM, kurva tanam subround BPS, dan valuasi saprodi per hektar.
                </p>
              </div>

              <div className='grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium'>
                <div className='rounded-md border bg-muted/40 p-2 text-center min-w-0 sm:min-w-[110px]'>
                  <div className='text-muted-foreground text-[10px] sm:text-[11px]'>Farm-Gate Price</div>
                  <div className='font-bold text-xs sm:text-sm text-foreground truncate'>
                    Rp {selectedCrop.tam.farmgate_price_idr_per_kg.toLocaleString('id-ID')}/kg
                  </div>
                </div>
                <div className='rounded-md border bg-muted/40 p-2 text-center min-w-0 sm:min-w-[110px]'>
                  <div className='text-muted-foreground text-[10px] sm:text-[11px]'>National Yield</div>
                  <div className='font-bold text-xs sm:text-sm text-foreground truncate'>
                    {selectedCrop.tam.yield_ton_per_ha.toFixed(2)} Ton/Ha
                  </div>
                </div>
                <div className='rounded-md border bg-muted/40 p-2 text-center min-w-0 sm:min-w-[120px]'>
                  <div className='text-muted-foreground text-[10px] sm:text-[11px]'>Input Spend / Ha</div>
                  <div className='font-bold text-xs sm:text-sm text-foreground truncate'>
                    {formatIDR(selectedCrop.sam.input_spending_per_ha_idr, 'compact')}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6 Modul Analisis Agronomi */}
        <Tabs defaultValue='funnel' className='space-y-4'>
          <div className='w-full overflow-x-auto no-scrollbar pb-1'>
            <TabsList className='inline-flex w-max min-w-full sm:min-w-0 justify-start sm:justify-center h-auto p-1 bg-muted/70 gap-1'>
            <TabsTrigger value='funnel' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <Layers className='mr-1.5 h-3.5 w-3.5' /> Funnel & Economics
            </TabsTrigger>
            <TabsTrigger value='provinces' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <Sprout className='mr-1.5 h-3.5 w-3.5' /> 38-Provinces & Districts
            </TabsTrigger>
            <TabsTrigger value='subrounds' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <Calendar className='mr-1.5 h-3.5 w-3.5' /> Subrounds (SR 1-3)
            </TabsTrigger>
            <TabsTrigger value='inputs' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <DollarSign className='mr-1.5 h-3.5 w-3.5' /> Input Decomposition
            </TabsTrigger>
            <TabsTrigger value='typology' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <Users className='mr-1.5 h-3.5 w-3.5' /> Typology & Prices
            </TabsTrigger>
            <TabsTrigger value='playbook' className='text-xs py-2 shrink-0 whitespace-nowrap'>
              <BookOpen className='mr-1.5 h-3.5 w-3.5' /> GTM Playbook
            </TabsTrigger>
          </TabsList>
          </div>

          {/* TAB 1: FUNNEL & FARM ECONOMICS */}
          <TabsContent value='funnel' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xs text-muted-foreground uppercase'>
                    Total Agronomic Footprint (TAM)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {formatHa(selectedCrop.tam.harvest_area_ha)}
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Gross Production: {formatTon(selectedCrop.tam.production_ton)}
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xs text-muted-foreground uppercase'>
                    Farm-Gate Value (TAM Output)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    Rp {selectedCrop.tam.gross_output_value_trillion_idr.toFixed(2)} Triliun
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    National farmer gross sales realization
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xs text-muted-foreground uppercase'>
                    Qualified SAM Footprint
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
                    {formatHa(selectedCrop.sam.eligible_area_ha)}
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    {formatPct(selectedCrop.sam.conversion_rate_pct)} addressability conversion
                  </p>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-xs text-muted-foreground uppercase'>
                    Addressable Input Market (SAM)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
                    Rp {selectedCrop.sam.total_input_market_value_trillion_idr.toFixed(2)} Triliun
                  </div>
                  <p className='text-xs text-muted-foreground mt-1'>
                    Annual fertilizer & agrochemical potential
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sequential Drivers Funnel Breakdown */}
            <Card className='border shadow-xs'>
              <CardHeader>
                <CardTitle className='text-sm font-semibold'>
                  Sequential Multi-Driver TAM-to-SAM Conversion Funnel (R₁ → R₄)
                </CardTitle>
                <CardDescription>
                  Step-by-step mathematical filtering from total physical acreage to commercially addressable input market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4'>
                  <div className='rounded-lg border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>R₁: Commercial Orientation</div>
                    <div className='text-xl font-bold text-foreground mt-1'>
                      {formatPct(selectedCrop.sam.drivers.r1_commercial_orientation * 100, 1)}
                    </div>
                    <p className='text-[11px] text-muted-foreground mt-0.5'>
                      Share of production sold for cash (non-subsistence)
                    </p>
                  </div>
                  <div className='rounded-lg border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>R₂: Input Addressability</div>
                    <div className='text-xl font-bold text-foreground mt-1'>
                      {formatPct(selectedCrop.sam.drivers.r2_purchased_input_addressability * 100, 1)}
                    </div>
                    <p className='text-[11px] text-muted-foreground mt-0.5'>
                      Adoption rate of purchased manufactured inputs
                    </p>
                  </div>
                  <div className='rounded-lg border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>R₃: Economic Affordability</div>
                    <div className='text-xl font-bold text-foreground mt-1'>
                      {formatPct(selectedCrop.sam.drivers.r3_economic_affordability * 100, 1)}
                    </div>
                    <p className='text-[11px] text-muted-foreground mt-0.5'>
                      Farmer liquidity and purchasing power index
                    </p>
                  </div>
                  <div className='rounded-lg border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>R₄: Channel Serviceability</div>
                    <div className='text-xl font-bold text-foreground mt-1'>
                      {formatPct(selectedCrop.sam.drivers.r4_channel_serviceability * 100, 1)}
                    </div>
                    <p className='text-[11px] text-muted-foreground mt-0.5'>
                      Physical dealer & kiosk logistics coverage
                    </p>
                  </div>
                </div>

                <div className='rounded-md border p-4 bg-accent/20'>
                  <div className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                    Compound Conversion Formula
                  </div>
                  <div className='font-mono text-xs bg-background p-2.5 rounded border'>
                    SAM = TAM ({formatHa(selectedCrop.tam.harvest_area_ha)}) × [R₁ ({selectedCrop.sam.drivers.r1_commercial_orientation}) × R₂ ({selectedCrop.sam.drivers.r2_purchased_input_addressability}) × R₃ ({selectedCrop.sam.drivers.r3_economic_affordability}) × R₄ ({selectedCrop.sam.drivers.r4_channel_serviceability})] = <span className='font-bold text-emerald-600 dark:text-emerald-400'>{formatHa(selectedCrop.sam.eligible_area_ha)}</span> ({formatPct(selectedCrop.sam.conversion_rate_pct)})
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: 38-PROVINCE & DISTRICT MICRO DATA */}
          <TabsContent value='provinces' className='space-y-4'>
            {/* Top Producing Districts Card */}
            <Card className='border shadow-xs'>
              <CardHeader>
                <CardTitle className='text-sm font-semibold'>
                  Top Producing Kabupaten (District Centers of Gravity)
                </CardTitle>
                <CardDescription>
                  Key micro-producing clusters driving the majority of national production and input demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                  {(selectedCrop.key_producing_districts || []).map((district) => (
                    <div key={district.kabupaten || district.district} className='rounded-lg border p-3 bg-muted/30'>
                      <div className='font-semibold text-sm text-foreground'>{district.kabupaten || district.district}</div>
                      <div className='mt-2 space-y-1 text-xs'>
                        <div className='flex justify-between text-muted-foreground'>
                          <span>Harvest Area:</span>
                          <span className='font-mono font-medium text-foreground'>{formatHa(district.harvest_area_ha)}</span>
                        </div>
                        <div className='flex justify-between text-muted-foreground'>
                          <span>Production:</span>
                          <span className='font-mono font-medium text-foreground'>{formatTon(district.production_ton)}</span>
                        </div>
                        <div className='flex justify-between text-muted-foreground'>
                          <span>Yield:</span>
                          <span className='font-mono font-medium text-foreground'>{district.yield_ton_per_ha.toFixed(2)} Ton/Ha</span>
                        </div>
                        <div className='flex justify-between text-muted-foreground pt-1 border-t border-border/50'>
                          <span>National Share:</span>
                          <span className='font-mono font-bold text-emerald-600 dark:text-emerald-400'>{district.pct_of_national.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full 38-Province Table */}
            <Card className='border shadow-xs'>
              <CardHeader>
                <CardTitle className='text-sm font-semibold'>
                  38-Province Ingestion Ledger ({selectedCrop.name})
                </CardTitle>
                <CardDescription>
                  Complete official provincial breakdown with data integrity verification badges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='text-[11px] text-muted-foreground sm:hidden mb-2'>
                  ← Geser tabel ke kanan untuk melihat rincian 38 provinsi →
                </div>
                <div className='rounded-md border overflow-x-auto max-h-[500px] overflow-y-auto'>
                  <Table>
                    <TableHeader className='sticky top-0 bg-card z-20'>
                      <TableRow className='bg-muted/50 text-xs font-semibold'>
                        <TableHead className='w-[60px]'>Code</TableHead>
                        <TableHead className='sticky left-0 bg-background z-20 border-r shadow-xs min-w-[120px]'>Provinsi</TableHead>
                        <TableHead className='text-right'>Harvest Area (Ha)</TableHead>
                        <TableHead className='text-right'>Production (Ton)</TableHead>
                        <TableHead className='text-right'>Yield (Ton/Ha)</TableHead>
                        <TableHead className='text-right'>Share %</TableHead>
                        <TableHead className='text-center'>Data Status</TableHead>
                        <TableHead className='text-center'>Kiosks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedCrop.provincial_data.map((prov) => (
                        <TableRow key={prov.province_code} className='hover:bg-muted/40 transition-colors'>
                          <TableCell className='font-mono text-xs text-muted-foreground'>
                            {prov.province_code}
                          </TableCell>
                          <TableCell className='font-semibold text-xs text-foreground sticky left-0 bg-background z-10 border-r shadow-xs min-w-[120px]'>
                            {prov.province_name}
                          </TableCell>
                          <TableCell className='text-right font-mono text-xs'>
                            {formatHa(prov.harvest_area_ha)}
                          </TableCell>
                          <TableCell className='text-right font-mono text-xs'>
                            {formatTon(prov.production_ton)}
                          </TableCell>
                          <TableCell className='text-right font-mono text-xs'>
                            {prov.yield_ton_per_ha.toFixed(2)}
                          </TableCell>
                          <TableCell className='text-right font-mono text-xs font-semibold'>
                            {prov.pct_national_production.toFixed(2)}%
                          </TableCell>
                          <TableCell className='text-center'>
                            <Badge variant='outline' className='text-[10px] font-medium bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'>
                              {prov.data_status}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-center font-mono text-xs text-muted-foreground'>
                            {prov.kpl_kiosks_count ? prov.kpl_kiosks_count.toLocaleString('id-ID') : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: SUBROUNDS & SEASONAL CALENDAR */}
          <TabsContent value='subrounds' className='space-y-4'>
            <div className='grid gap-4 lg:grid-cols-3'>
              <Card className='lg:col-span-2 border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>
                    Subround Production Distribution ({selectedCrop.name})
                  </CardTitle>
                  <CardDescription>
                    Triannual production volume percentage breakdown (BPS KSA & SPH Methodology)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='h-[260px] w-full'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <BarChart
                        data={[
                          { name: 'SR 1 (Jan - Apr)', pct: selectedCrop.subrounds.sr1_jan_apr_pct },
                          { name: 'SR 2 (Mei - Agu)', pct: selectedCrop.subrounds.sr2_may_aug_pct },
                          { name: 'SR 3 (Sep - Des)', pct: selectedCrop.subrounds.sr3_sep_dec_pct },
                        ]}
                      >
                        <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke='#888888' fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                        <Tooltip
                          formatter={(val: unknown) => [`${String(val)}%`, 'Production Share']}
                          contentStyle={{
                            backgroundColor: 'var(--card)',
                            borderColor: 'var(--border)',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar dataKey='pct' fill='#10b981' radius={[6, 6, 0, 0]}>
                          <Cell fill='#10b981' />
                          <Cell fill='#3b82f6' />
                          <Cell fill='#f59e0b' />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>Agronomic Timing & Risks</CardTitle>
                  <CardDescription>Critical seasonal windows for input deployment</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='rounded-md border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>Peak Planting Window</div>
                    <div className='text-sm font-bold text-foreground mt-0.5'>
                      {selectedCrop.subrounds.peak_planting_window}
                    </div>
                  </div>
                  <div className='rounded-md border p-3 bg-muted/30'>
                    <div className='text-xs font-semibold text-muted-foreground'>Peak Harvest (Panen Raya)</div>
                    <div className='text-sm font-bold text-foreground mt-0.5'>
                      {selectedCrop.subrounds.peak_harvest_window}
                    </div>
                  </div>
                  <div className='rounded-md border p-3 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'>
                    <div className='text-xs font-semibold text-rose-700 dark:text-rose-400'>Critical Pest / Disease Threat</div>
                    <div className='text-xs font-medium text-rose-900 dark:text-rose-200 mt-0.5'>
                      {selectedCrop.subrounds.critical_pest_window}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: INPUT DECOMPOSITION */}
          <TabsContent value='inputs' className='space-y-4'>
            <div className='grid gap-4 lg:grid-cols-2'>
              <Card className='border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>
                    Input Expenditure Breakdown per Hectare
                  </CardTitle>
                  <CardDescription>
                    Total annual budget: {formatIDR(selectedCrop.sam.input_spending_per_ha_idr, 'compact')} / Ha
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {Object.entries(selectedCrop.input_decomposition).map(([key, item]) => {
                      const labels: Record<string, string> = {
                        npk_compound_fertilizer: 'NPK Compound Fertilizer',
                        foliar_calcium_micro_nutrients: 'Foliar, Calcium & Micro-Nutrients',
                        fungicides: 'Fungicides',
                        insecticides: 'Insecticides',
                        herbicides: 'Herbicides',
                        certified_seeds: 'Certified Seeds / Seedlings',
                      }
                      return (
                        <div key={key} className='space-y-1 text-xs'>
                          <div className='flex justify-between font-medium'>
                            <span>{labels[key] || key}</span>
                            <span className='font-mono'>
                              {formatIDR(item.cost_idr, 'compact')} ({item.pct}%)
                            </span>
                          </div>
                          <div className='h-2 w-full rounded-full bg-muted overflow-hidden'>
                            <div
                              className='h-full bg-primary rounded-full'
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className='border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>
                    Market Opportunity by Chemical & Nutrient Category
                  </CardTitle>
                  <CardDescription>
                    National addressable category sizing for {selectedCrop.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2.5'>
                    {Object.entries(selectedCrop.input_decomposition).map(([key, item]) => {
                      const categoryValueBillion =
                        (selectedCrop.sam.total_input_market_value_trillion_idr * 1000 * item.pct) / 100
                      const labels: Record<string, string> = {
                        npk_compound_fertilizer: 'NPK Compound Fertilizer',
                        foliar_calcium_micro_nutrients: 'Foliar, Calcium & Micro-Nutrients',
                        fungicides: 'Fungicides',
                        insecticides: 'Insecticides',
                        herbicides: 'Herbicides',
                        certified_seeds: 'Certified Seeds / Seedlings',
                      }
                      return (
                        <div key={key} className='flex items-center justify-between p-2 rounded-md border bg-muted/20 text-xs'>
                          <span className='font-medium text-foreground'>{labels[key] || key}</span>
                          <span className='font-bold text-indigo-600 dark:text-indigo-400 font-mono'>
                            Rp {categoryValueBillion.toFixed(1)} Miliar
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 5: FARMER TYPOLOGY & PRICES */}
          <TabsContent value='typology' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Card className='border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>
                    ST2023 Farmer Landholding Typology
                  </CardTitle>
                  <CardDescription>BPS Sensus Pertanian 2023 farm scale segmentation</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-2 text-xs'>
                    <div className='flex justify-between font-medium'>
                      <span>Petani Gurem (&lt; 0.5 Ha)</span>
                      <span className='font-mono font-bold'>
                        {selectedCrop.farmer_typology.gurem_less_than_half_ha_pct}%
                      </span>
                    </div>
                    <div className='h-2 rounded-full bg-muted overflow-hidden'>
                      <div
                        className='h-full bg-amber-500 rounded-full'
                        style={{ width: `${selectedCrop.farmer_typology.gurem_less_than_half_ha_pct}%` }}
                      />
                    </div>
                  </div>

                  <div className='space-y-2 text-xs'>
                    <div className='flex justify-between font-medium'>
                      <span>Petani Menengah (0.5 - 2.0 Ha)</span>
                      <span className='font-mono font-bold'>
                        {selectedCrop.farmer_typology.menengah_half_to_two_ha_pct}%
                      </span>
                    </div>
                    <div className='h-2 rounded-full bg-muted overflow-hidden'>
                      <div
                        className='h-full bg-emerald-500 rounded-full'
                        style={{ width: `${selectedCrop.farmer_typology.menengah_half_to_two_ha_pct}%` }}
                      />
                    </div>
                  </div>

                  <div className='space-y-2 text-xs'>
                    <div className='flex justify-between font-medium'>
                      <span>Petani Besar / Korporasi (&gt; 2.0 Ha)</span>
                      <span className='font-mono font-bold'>
                        {selectedCrop.farmer_typology.korporasi_more_than_two_ha_pct}%
                      </span>
                    </div>
                    <div className='h-2 rounded-full bg-muted overflow-hidden'>
                      <div
                        className='h-full bg-blue-500 rounded-full'
                        style={{ width: `${selectedCrop.farmer_typology.korporasi_more_than_two_ha_pct}%` }}
                      />
                    </div>
                  </div>

                  <div className='rounded-md border p-3 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900'>
                    <div className='text-xs font-semibold text-rose-700 dark:text-rose-400'>
                      Yarnen (Bayar Panen) Credit Reliance
                    </div>
                    <div className='text-xl font-bold text-rose-900 dark:text-rose-200 mt-1'>
                      {selectedCrop.farmer_typology.credit_yarnen_dependency_pct}%
                    </div>
                    <p className='text-[11px] text-rose-700 dark:text-rose-300 mt-0.5'>
                      Percentage of farmers relying on store credit until harvest
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Price Disparity Ladder */}
              <Card className='border shadow-xs'>
                <CardHeader>
                  <CardTitle className='text-sm font-semibold'>
                    Price Ladder & Farmer's Share Margin
                  </CardTitle>
                  <CardDescription>
                    Price formation from farm-gate to wholesale to consumer retail
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    <div className='rounded-md border p-3 bg-muted/20'>
                      <div className='text-xs text-muted-foreground'>Farm-Gate Price (Tingkat Petani)</div>
                      <div className='text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono'>
                        Rp {selectedCrop.price_ladder.farm_gate_idr_per_kg.toLocaleString('id-ID')}/kg
                      </div>
                    </div>

                    <div className='rounded-md border p-3 bg-muted/20'>
                      <div className='text-xs text-muted-foreground'>Wholesale Price (Pasar Induk)</div>
                      <div className='text-lg font-bold text-blue-600 dark:text-blue-400 font-mono'>
                        Rp {selectedCrop.price_ladder.wholesale_pasar_induk_idr_per_kg.toLocaleString('id-ID')}/kg
                      </div>
                    </div>

                    <div className='rounded-md border p-3 bg-muted/20'>
                      <div className='text-xs text-muted-foreground'>Retail Price (Konsumen Akhir)</div>
                      <div className='text-lg font-bold text-amber-600 dark:text-amber-400 font-mono'>
                        Rp {selectedCrop.price_ladder.retail_consumer_idr_per_kg.toLocaleString('id-ID')}/kg
                      </div>
                    </div>

                    <div className='rounded-md border p-3 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900'>
                      <div className='text-xs font-semibold text-indigo-700 dark:text-indigo-400'>
                        Farmer's Share of Final Value
                      </div>
                      <div className='text-xl font-bold text-indigo-900 dark:text-indigo-200 mt-0.5'>
                        {selectedCrop.price_ladder.farmer_share_pct}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 6: GTM PLAYBOOK */}
          <TabsContent value='playbook' className='space-y-4'>
            <Card className='border shadow-xs'>
              <CardHeader>
                <CardTitle className='text-sm font-semibold'>
                  Commercial Go-To-Market Strategy ({selectedCrop.name})
                </CardTitle>
                <CardDescription>
                  Proven distribution and penetration playbook for commercial agrochemical & fertilizer brands
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 text-xs leading-relaxed'>
                <div className='rounded-lg border p-4 bg-muted/30'>
                  <h4 className='font-bold text-foreground text-sm mb-1'>1. KPL Dealer Network Channel Strategy</h4>
                  <p className='text-muted-foreground'>
                    Prioritize top tier-1 distributors in key hubs ({(selectedCrop.key_producing_districts || []).map(d => d.kabupaten || d.district).slice(0, 3).join(', ')}). Maintain a maximum 60-day tempo credit limit and enforce 1:1 matching collateral on consignment stock to mitigate yarnen harvest failure defaults.
                  </p>
                </div>

                <div className='rounded-lg border p-4 bg-muted/30'>
                  <h4 className='font-bold text-foreground text-sm mb-1'>2. Product Formulation & Packaging Recommendations</h4>
                  <p className='text-muted-foreground'>
                    Formulations must be tailored to the crop's dominant pest cycle ({selectedCrop.subrounds.critical_pest_window}). Offer high-efficiency packaging (250ml and 500ml for vegetable crops, 1L and 5L for estate crops) to align with farmer seasonal cashflow constraints.
                  </p>
                </div>

                <div className='rounded-lg border p-4 bg-muted/30'>
                  <h4 className='font-bold text-foreground text-sm mb-1'>3. Field Demonstration (Demplot) Protocol</h4>
                  <p className='text-muted-foreground'>
                    Establish minimum 2 demonstration plots per target subdistrict 4 weeks prior to peak planting ({selectedCrop.subrounds.peak_planting_window}). Conduct farmer gathering sessions (Temu Lapang) showing quantitative side-by-side yield and cost-per-kg advantages.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
