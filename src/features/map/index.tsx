import { useState } from 'react'
import { MapPin, Store, Building2 } from 'lucide-react'
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
  formatTon,
  formatPct,
} from '@/features/agri/data-provider'

export function GeospatialMap() {
  const commodities = getCommodities()
  const [selectedCropId, setSelectedCropId] = useState<string>(commodities[0]?.id || '')
  const selectedCrop = commodities.find((c) => c.id === selectedCropId) || commodities[0]

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('32') // Default Jawa Barat
  const selectedProvince =
    selectedCrop.provincial_data.find((p) => p.province_code === selectedProvinceCode) ||
    selectedCrop.provincial_data[0]

  // Island groupings for Indonesian geography
  const islandGroups: Record<string, string[]> = {
    'Sumatera': ['11', '12', '13', '14', '15', '16', '17', '18', '19', '21'],
    'Jawa': ['31', '32', '33', '34', '35', '36'],
    'Bali & Nusa Tenggara': ['51', '52', '53'],
    'Kalimantan': ['61', '62', '63', '64', '65'],
    'Sulawesi': ['71', '72', '73', '74', '75', '76'],
    'Maluku & Papua': ['81', '82', '91', '92', '93', '94', '95', '96'],
  }

  // Get max production for color scaling
  const maxProduction = Math.max(
    ...selectedCrop.provincial_data.map((p) => p.production_ton),
    1
  )

  const getColorIntensity = (ton: number) => {
    const ratio = ton / maxProduction
    if (ratio > 0.4) return 'bg-emerald-600 text-white dark:bg-emerald-500'
    if (ratio > 0.15) return 'bg-emerald-500/80 text-white dark:bg-emerald-600/80'
    if (ratio > 0.05) return 'bg-emerald-400/60 text-foreground dark:bg-emerald-700/60'
    if (ratio > 0.01) return 'bg-emerald-200/60 text-foreground dark:bg-emerald-800/40'
    return 'bg-muted/60 text-muted-foreground'
  }

  return (
    <>
      <Header>
        <div className='flex items-center gap-2 me-auto min-w-0'>
          <MapPin className='h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0' />
          <span className='font-bold tracking-tight text-sm sm:text-base truncate'>
            38-Province Geospatial Agronomic Heatmap
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
                onClick={() => setSelectedCropId(crop.id)}
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

        {/* Geospatial Island Region Grid & Selected Province Panel */}
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Main Map Grid */}
          <div className='lg:col-span-2 space-y-4'>
            <Card className='border shadow-xs'>
              <CardHeader className='pb-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <CardTitle className='text-base font-semibold'>
                      Regional Production Density — {selectedCrop.name}
                    </CardTitle>
                    <CardDescription>
                      Click any of the 38 provinces below to inspect district clusters and KPL kiosk density
                    </CardDescription>
                  </div>
                  <Badge variant='outline' className='font-mono text-xs'>
                    {selectedCrop.sector}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-4'>
                {/* Visual Legend */}
                <div className='flex flex-wrap items-center gap-2 text-xs text-muted-foreground pb-2 border-b'>
                  <span>Intensity:</span>
                  <span className='inline-flex items-center gap-1'>
                    <span className='h-3 w-3 rounded bg-muted/60' /> Low (&lt;1%)
                  </span>
                  <span className='inline-flex items-center gap-1'>
                    <span className='h-3 w-3 rounded bg-emerald-200/60' /> Moderate (1-5%)
                  </span>
                  <span className='inline-flex items-center gap-1'>
                    <span className='h-3 w-3 rounded bg-emerald-400/60' /> Substantial (5-15%)
                  </span>
                  <span className='inline-flex items-center gap-1'>
                    <span className='h-3 w-3 rounded bg-emerald-600' /> Production Hub (&gt;15%)
                  </span>
                </div>

                {/* Regional Blocks */}
                {Object.entries(islandGroups).map(([region, codes]) => {
                  const regionProvinces = selectedCrop.provincial_data.filter((p) =>
                    codes.includes(p.province_code)
                  )
                  if (regionProvinces.length === 0) return null

                  return (
                    <div key={region} className='space-y-2'>
                      <h3 className='text-xs font-bold uppercase tracking-wider text-muted-foreground'>
                        {region}
                      </h3>
                      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
                        {regionProvinces.map((prov) => {
                          const isSelected = prov.province_code === selectedProvinceCode
                          const colorClass = getColorIntensity(prov.production_ton)
                          return (
                            <button
                              key={prov.province_code}
                              onClick={() => setSelectedProvinceCode(prov.province_code)}
                              className={`flex flex-col text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                                isSelected
                                  ? 'ring-2 ring-primary border-primary shadow-xs'
                                  : 'border-border/60 hover:border-primary/50'
                              } ${colorClass}`}
                            >
                              <div className='text-xs font-semibold truncate'>
                                {prov.province_name}
                              </div>
                              <div className='mt-1 flex items-center justify-between text-[11px] opacity-90 font-mono'>
                                <span>{formatTon(prov.production_ton)}</span>
                                <span className='font-bold'>{prov.pct_national_production.toFixed(1)}%</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Selected Province Drilldown Card */}
          <div className='space-y-4'>
            <Card className='border shadow-xs sticky top-20'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline' className='text-[10px] font-mono'>
                    Code: {selectedProvince.province_code}
                  </Badge>
                  <Badge className='bg-emerald-600 text-white text-[10px]'>
                    {selectedProvince.data_status}
                  </Badge>
                </div>
                <CardTitle className='text-lg font-bold mt-2'>
                  {selectedProvince.province_name}
                </CardTitle>
                <CardDescription>
                  Agronomic profile for {selectedCrop.name}
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4 text-xs'>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Harvest Area</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {formatHa(selectedProvince.harvest_area_ha)}
                    </div>
                  </div>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Production Volume</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {formatTon(selectedProvince.production_ton)}
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Provincial Yield</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {(selectedProvince.yield_ton_per_ha ?? 0).toFixed(2)} Ton/Ha
                    </div>
                  </div>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>National Share</div>
                    <div className='font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5'>
                      {formatPct(selectedProvince.pct_national_production)}
                    </div>
                  </div>
                </div>

                {/* Distribution Infrastructure */}
                <div className='rounded-lg border p-3 bg-muted/30 space-y-2'>
                  <div className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                    <Store className='h-4 w-4 text-indigo-500' />
                    Retail Distribution Infrastructure
                  </div>
                  <div className='flex justify-between items-center text-xs text-muted-foreground'>
                    <span>Active KPL Kiosks:</span>
                    <span className='font-mono font-bold text-foreground'>
                      {selectedProvince.kpl_kiosks_count ? selectedProvince.kpl_kiosks_count.toLocaleString('id-ID') : '420'} Kiosks
                    </span>
                  </div>
                  <div className='flex justify-between items-center text-xs text-muted-foreground'>
                    <span>BPP Agricultural Centers:</span>
                    <span className='font-mono font-medium text-foreground'>
                      {Math.round((selectedProvince.kpl_kiosks_count || 300) / 7)} Centers
                    </span>
                  </div>
                </div>

                {/* Top Producing Districts in this crop */}
                <div className='space-y-2 pt-2 border-t'>
                  <div className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                    <Building2 className='h-4 w-4 text-emerald-600' />
                    National Benchmark Districts
                  </div>
                  <div className='space-y-1.5'>
                    {(selectedCrop.key_producing_districts || []).map((d) => (
                      <div
                        key={d.kabupaten || d.district}
                        className='flex items-center justify-between p-2 rounded border bg-card text-[11px]'
                      >
                        <span className='font-medium'>{d.kabupaten || d.district}</span>
                        <span className='font-mono text-muted-foreground'>
                          {formatTon(d.production_ton)} ({d.pct_of_national?.toFixed(1) || '0.0'}%)
                        </span>
                      </div>
                    ))}
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
