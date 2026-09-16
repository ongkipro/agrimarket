import { useState } from 'react'
import {
  MapPin,
  Store,
  Building2,
  ArrowLeft,
  Search as SearchIcon,
  TrendingUp,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Filter,
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
  formatTon,
  formatPct,
} from '@/features/agri/data-provider'
import {
  getProvinceDistricts,
  getProvinceDistrictSummary,
  type DistrictDetailRecord,
  type DistrictStatus,
} from '@/features/agri/province-districts-data'

export function GeospatialMap() {
  const commodities = getCommodities()
  const [selectedCropId, setSelectedCropId] = useState<string>(commodities[0]?.id || '')
  const selectedCrop = commodities.find((c) => c.id === selectedCropId) || commodities[0]

  const [selectedProvinceCode, setSelectedProvinceCode] = useState<string>('32') // Default Jawa Barat
  const selectedProvince =
    selectedCrop.provincial_data.find((p) => p.province_code === selectedProvinceCode) ||
    selectedCrop.provincial_data[0]

  // View Mode: 'provinces' (National 38-Province Map) or 'districts' (Per-Kabupaten Drilldown)
  const [viewMode, setViewMode] = useState<'provinces' | 'districts'>('provinces')
  const [districtSearch, setDistrictSearch] = useState<string>('')
  const [districtSortBy, setDistrictSortBy] = useState<'production' | 'area' | 'yield' | 'name'>('production')
  const [showAllCards, setShowAllCards] = useState<boolean>(false)

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

  // District-level data and metrics for the currently selected province
  const provinceDistricts = getProvinceDistricts(selectedCrop.id, selectedProvince.province_code)
  const provinceSummary = getProvinceDistrictSummary(selectedCrop.id, selectedProvince.province_code)

  // Max district production for district cards color scaling
  const maxDistrictProd = Math.max(...provinceDistricts.map((d) => d.production_ton), 1)

  const getDistrictColorIntensity = (ton: number) => {
    const ratio = ton / maxDistrictProd
    if (ratio > 0.6) return 'bg-emerald-600 text-white dark:bg-emerald-500'
    if (ratio > 0.3) return 'bg-emerald-500/80 text-white dark:bg-emerald-600/80'
    if (ratio > 0.1) return 'bg-emerald-400/60 text-foreground dark:bg-emerald-700/60'
    if (ratio > 0.02) return 'bg-emerald-200/60 text-foreground dark:bg-emerald-800/40'
    return 'bg-muted/60 text-muted-foreground'
  }

  const handleProvinceClick = (code: string) => {
    setSelectedProvinceCode(code)
    setViewMode('districts')
    setDistrictSearch('')
    setShowAllCards(false)
  }

  // Filtered and sorted districts (supports searching regency name & sub-district clusters)
  const filteredDistricts = provinceDistricts
    .filter((d) => {
      const q = districtSearch.toLowerCase()
      return (
        d.kabupaten.toLowerCase().includes(q) ||
        (d.subdistrict_clusters && d.subdistrict_clusters.toLowerCase().includes(q))
      )
    })
    .sort((a, b) => {
      if (districtSortBy === 'production') return b.production_ton - a.production_ton
      if (districtSortBy === 'area') return b.harvest_area_ha - a.harvest_area_ha
      if (districtSortBy === 'yield') return b.yield_ton_per_ha - a.yield_ton_per_ha
      return a.kabupaten.localeCompare(b.kabupaten)
    })


  const renderStatusBadge = (status: DistrictStatus) => {
    switch (status) {
      case 'SENTRA_UTAMA_1':
        return (
          <Badge className='bg-emerald-600 text-white hover:bg-emerald-700 text-[10px] font-semibold'>
            Sentra Utama #1
          </Badge>
        )
      case 'SENTRA_UTAMA':
        return (
          <Badge className='bg-teal-600 text-white hover:bg-teal-700 text-[10px] font-medium'>
            Sentra Utama
          </Badge>
        )
      case 'SENTRA_PENYANGGA':
        return (
          <Badge variant='outline' className='border-emerald-600/50 text-emerald-700 dark:text-emerald-400 text-[10px]'>
            Sentra Penyangga
          </Badge>
        )
      case 'POTENSIAL':
        return (
          <Badge variant='secondary' className='text-[10px]'>
            Potensial
          </Badge>
        )
      case 'PENGEMBANGAN':
      default:
        return (
          <Badge variant='outline' className='text-muted-foreground text-[10px]'>
            Pengembangan
          </Badge>
        )
    }
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

      <Main className='space-y-6 min-w-0 max-w-full'>
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

        {/* View Mode Switcher Header & Breadcrumb */}
        <div className='flex flex-wrap items-center justify-between gap-3 bg-muted/30 p-3 rounded-lg border'>
          <div className='flex items-center gap-2 text-xs sm:text-sm font-medium'>
            <button
              onClick={() => setViewMode('provinces')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                viewMode === 'provinces'
                  ? 'bg-card font-bold text-foreground border-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground border-transparent'
              }`}
            >
              <Layers className='h-3.5 w-3.5 text-emerald-600' />
              <span>Peta 38 Provinsi</span>
            </button>
            <ChevronRight className='h-3.5 w-3.5 text-muted-foreground shrink-0' />
            <button
              onClick={() => setViewMode('districts')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                viewMode === 'districts'
                  ? 'bg-card font-bold text-emerald-600 dark:text-emerald-400 border-primary shadow-xs'
                  : 'text-muted-foreground hover:text-foreground border-transparent'
              }`}
            >
              <Building2 className='h-3.5 w-3.5 text-indigo-500' />
              <span>Rincian Kabupaten ({selectedProvince.province_name})</span>
            </button>
          </div>

          <div className='flex items-center gap-2'>
            {viewMode === 'districts' && (
              <button
                onClick={() => setViewMode('provinces')}
                className='inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 border cursor-pointer'
              >
                <ArrowLeft className='h-3.5 w-3.5' />
                <span>Kembali ke 38 Provinsi</span>
              </button>
            )}

            {/* Quick Province Select Dropdown */}
            <select
              value={selectedProvince.province_code}
              onChange={(e) => {
                setSelectedProvinceCode(e.target.value)
                setDistrictSearch('')
              }}
              aria-label='Pilih Provinsi'
              className='text-xs font-medium bg-card border rounded-md px-2.5 py-1 text-foreground cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-primary'
            >
              {selectedCrop.provincial_data.map((p) => (
                <option key={p.province_code} value={p.province_code}>
                  {p.province_name} ({formatPct(p.pct_national_production)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Geospatial Area & Dynamic Sidebar */}
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Main Visual Block (Column 1 & 2) */}
          <div className='lg:col-span-2 space-y-4 min-w-0'>
            {viewMode === 'provinces' ? (
              /* VIEW MODE 1: NATIONAL 38-PROVINCE HEATMAP GRID */
              <Card className='border shadow-xs'>
                <CardHeader className='pb-3'>
                  <div className='flex flex-wrap items-center justify-between gap-2'>
                    <div>
                      <CardTitle className='text-base font-semibold'>
                        Kepadatan Produksi 38 Provinsi — {selectedCrop.name}
                      </CardTitle>
                      <CardDescription>
                        Klik salah satu provinsi di bawah untuk langsung membuka rincian data per kabupaten
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
                    <span>Intensitas:</span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='h-3 w-3 rounded bg-muted/60' /> Rendah (&lt;1%)
                    </span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='h-3 w-3 rounded bg-emerald-200/60' /> Sedang (1-5%)
                    </span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='h-3 w-3 rounded bg-emerald-400/60' /> Signifikan (5-15%)
                    </span>
                    <span className='inline-flex items-center gap-1'>
                      <span className='h-3 w-3 rounded bg-emerald-600' /> Sentra Utama (&gt;15%)
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
                                onClick={() => handleProvinceClick(prov.province_code)}
                                className={`flex flex-col text-left p-2.5 rounded-lg border transition-all cursor-pointer group hover:shadow-xs ${
                                  isSelected
                                    ? 'ring-2 ring-primary border-primary shadow-xs'
                                    : 'border-border/60 hover:border-primary/50'
                                } ${colorClass}`}
                              >
                                <div className='text-xs font-semibold truncate flex items-center justify-between'>
                                  <span className='truncate'>{prov.province_name}</span>
                                  <ChevronRight className='h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0' />
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
            ) : (
              /* VIEW MODE 2: GRANULAR PER-KABUPATEN DRILLDOWN VIEW */
              <div className='space-y-4'>
                {/* Header Banner for Selected Province */}
                <Card className='border shadow-xs bg-linear-to-r from-emerald-500/10 via-card to-card'>
                  <CardHeader className='pb-3'>
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                      <div>
                        <div className='flex items-center gap-2'>
                          <button
                            onClick={() => setViewMode('provinces')}
                            className='text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer font-medium'
                          >
                            <ArrowLeft className='h-3 w-3' />
                            <span>Semua Provinsi</span>
                          </button>
                          <span className='text-muted-foreground'>/</span>
                          <Badge variant='outline' className='text-[10px] font-mono'>
                            Kode {selectedProvince.province_code}
                          </Badge>
                          <Badge className='bg-emerald-600 text-white text-[10px]'>
                            {selectedProvince.data_status}
                          </Badge>
                        </div>
                        <CardTitle className='text-lg font-bold mt-1.5 flex items-center gap-2'>
                          <span>Rincian Kabupaten: {selectedProvince.province_name}</span>
                          <span className='text-sm font-normal text-muted-foreground'>
                            ({selectedCrop.name})
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Klaster sentra produksi, produktivitas, dan estimasi jaringan kios KPL tingkat kabupaten/kota
                        </CardDescription>
                      </div>

                      <div className='text-right'>
                        <div className='text-xs text-muted-foreground'>Pangsa Nasional</div>
                        <div className='text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400'>
                          {formatPct(selectedProvince.pct_national_production)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Summary KPI Grid for Province */}
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs'>
                      <div className='rounded-lg border p-2.5 bg-card'>
                        <div className='text-muted-foreground text-[11px]'>Luas Panen Provinsi</div>
                        <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                          {formatHa(selectedProvince.harvest_area_ha)}
                        </div>
                      </div>
                      <div className='rounded-lg border p-2.5 bg-card'>
                        <div className='text-muted-foreground text-[11px]'>Total Produksi</div>
                        <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                          {formatTon(selectedProvince.production_ton)}
                        </div>
                      </div>
                      <div className='rounded-lg border p-2.5 bg-card'>
                        <div className='text-muted-foreground text-[11px]'>Produktivitas Rata-rata</div>
                        <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                          {(selectedProvince.yield_ton_per_ha ?? 0).toFixed(2)} Ton/Ha
                        </div>
                      </div>
                      <div className='rounded-lg border p-2.5 bg-card'>
                        <div className='text-muted-foreground text-[11px]'>Jaringan Kios KPL</div>
                        <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                          {(selectedProvince.kpl_kiosks_count || 420).toLocaleString('id-ID')} Kios
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kabupaten Visual Grid Cards */}
                <Card className='border shadow-xs'>
                  <CardHeader className='pb-3'>
                    <div className='flex flex-wrap items-center justify-between gap-2'>
                      <div>
                        <CardTitle className='text-sm font-semibold flex items-center gap-1.5'>
                          <Sparkles className='h-4 w-4 text-emerald-600' />
                          Peta Visual Kontribusi Kabupaten di {selectedProvince.province_name}
                        </CardTitle>
                        <CardDescription className='text-xs'>
                          Warna menunjukkan porsi kontribusi tonase kabupaten terhadap total provinsi
                        </CardDescription>
                      </div>
                      <span className='text-xs text-muted-foreground font-mono'>
                        {provinceDistricts.length} Kabupaten/Kota Terdata
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const displayedCards = showAllCards ? provinceDistricts : provinceDistricts.slice(0, 12)
                      return (
                        <>
                          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5'>
                            {displayedCards.map((d) => {
                              const colorClass = getDistrictColorIntensity(d.production_ton)
                              return (
                                <div
                                  key={d.kabupaten}
                                  className={`p-3 rounded-lg border transition-all ${colorClass}`}
                                >
                                  <div className='flex items-center justify-between gap-1'>
                                    <div className='font-semibold text-xs truncate'>{d.kabupaten}</div>
                                    {d.is_verified_hub && (
                                      <Badge className='bg-background/80 text-foreground text-[9px] px-1 py-0 h-4 shrink-0 font-mono'>
                                        BPS KSA
                                      </Badge>
                                    )}
                                  </div>
                                  <div className='mt-2 flex items-baseline justify-between text-xs font-mono'>
                                    <span className='font-bold text-sm'>{formatTon(d.production_ton)}</span>
                                    <span className='font-medium'>{d.pct_of_province.toFixed(1)}% Prov</span>
                                  </div>
                                  <div className='mt-1 pt-1.5 border-t border-current/20 flex items-center justify-between text-[11px] opacity-85 font-mono'>
                                    <span>{formatHa(d.harvest_area_ha)}</span>
                                    <span>{d.yield_ton_per_ha.toFixed(2)} T/Ha</span>
                                  </div>
                                  {d.subdistrict_clusters && (
                                    <div
                                      className='mt-1 text-[10px] opacity-85 truncate'
                                      title={`Sentra Kecamatan: ${d.subdistrict_clusters}`}
                                    >
                                      📍 {d.subdistrict_clusters}
                                    </div>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                          {provinceDistricts.length > 12 && (
                            <div className='mt-3 text-center'>
                              <button
                                type='button'
                                onClick={() => setShowAllCards(!showAllCards)}
                                className='inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 py-1 px-3 rounded-md border border-emerald-600/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer'
                              >
                                {showAllCards ? (
                                  <>
                                    <ChevronUp className='h-3.5 w-3.5' />
                                    <span>Ciutkan (Tampilkan Top 12)</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className='h-3.5 w-3.5' />
                                    <span>
                                      Tampilkan Seluruh {provinceDistricts.length} Kabupaten/Kota ({provinceDistricts.length - 12} Lainnya)
                                    </span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </CardContent>
                </Card>

                {/* Detailed Kabupaten Agronomic Data Table */}
                <Card className='border shadow-xs'>
                  <CardHeader className='pb-3'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <div>
                        <CardTitle className='text-sm font-semibold'>
                          Tabel Agronomis Kabupaten/Kota ({selectedProvince.province_name})
                        </CardTitle>
                        <CardDescription className='text-xs'>
                          Data komparatif luas panen, produksi, produktivitas, dan rekomendasi aksi komersial lapang
                        </CardDescription>
                      </div>

                      {/* Search & Sort Controls */}
                      <div className='flex flex-wrap items-center gap-2'>
                        <div className='relative'>
                          <SearchIcon className='absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground' />
                          <input
                            type='text'
                            placeholder='Cari kabupaten/kota...'
                            value={districtSearch}
                            onChange={(e) => setDistrictSearch(e.target.value)}
                            className='text-xs pl-8 pr-3 py-1.5 rounded-md border bg-card text-foreground focus:outline-hidden focus:ring-1 focus:ring-primary w-40 sm:w-48'
                          />
                        </div>

                        <div className='flex items-center gap-1 text-xs'>
                          <Filter className='h-3.5 w-3.5 text-muted-foreground' />
                          <select
                            value={districtSortBy}
                            onChange={(e) =>
                              setDistrictSortBy(
                                e.target.value as 'production' | 'area' | 'yield' | 'name'
                              )
                            }
                            aria-label='Urutkan data kabupaten'
                            className='text-xs bg-card border rounded-md px-2 py-1.5 text-foreground cursor-pointer focus:outline-hidden'
                          >
                            <option value='production'>Urut: Produksi Terbesar</option>
                            <option value='area'>Urut: Luas Panen Terbesar</option>
                            <option value='yield'>Urut: Produktivitas Tertinggi</option>
                            <option value='name'>Urut: Alfabetis (A-Z)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className='p-0 sm:p-6'>
                    <div className='w-full overflow-x-auto no-scrollbar'>
                      <table className='w-full text-xs text-left border-collapse min-w-[700px]'>
                        <thead>
                          <tr className='border-b bg-muted/40 text-muted-foreground text-[11px] font-semibold'>
                            <th className='py-2.5 px-3 w-8'>#</th>
                            <th className='py-2.5 px-3'>Kabupaten / Kota</th>
                            <th className='py-2.5 px-3'>Status Sentra</th>
                            <th className='py-2.5 px-3 text-right'>Luas Panen</th>
                            <th className='py-2.5 px-3 text-right'>Produksi</th>
                            <th className='py-2.5 px-3 text-right'>Yield (T/Ha)</th>
                            <th className='py-2.5 px-3 text-center'>Porsi Provinsi</th>
                            <th className='py-2.5 px-3 text-right'>Kios KPL</th>
                            <th className='py-2.5 px-3'>Rekomendasi Lapangan</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y'>
                          {filteredDistricts.length === 0 ? (
                            <tr>
                              <td colSpan={9} className='text-center py-6 text-muted-foreground'>
                                Tidak ditemukan kabupaten yang cocok dengan kata kunci &quot;{districtSearch}&quot;
                              </td>
                            </tr>
                          ) : (
                            filteredDistricts.map((d, idx) => (
                              <tr
                                key={d.kabupaten}
                                className='hover:bg-muted/30 transition-colors'
                              >
                                <td className='py-2.5 px-3 font-mono text-muted-foreground'>
                                  {idx + 1}
                                </td>
                                <td className='py-2.5 px-3 font-medium text-foreground'>
                                  <div className='flex items-center gap-1.5'>
                                    <span>{d.kabupaten}</span>
                                    {d.is_verified_hub && (
                                      <span
                                        title='Terverifikasi Sumber BPS KSA/SPH'
                                        className='inline-block h-1.5 w-1.5 rounded-full bg-emerald-500'
                                      />
                                    )}
                                  </div>
                                  {d.subdistrict_clusters && (
                                    <div
                                      className='text-[10px] text-muted-foreground font-normal mt-0.5 flex items-center gap-1'
                                      title={`Sentra Kecamatan: ${d.subdistrict_clusters}`}
                                    >
                                      <span className='text-emerald-600 dark:text-emerald-400 font-semibold shrink-0'>Kec:</span>
                                      <span className='truncate max-w-[200px]'>{d.subdistrict_clusters}</span>
                                    </div>
                                  )}
                                </td>
                                <td className='py-2.5 px-3'>
                                  {renderStatusBadge(d.status)}
                                </td>
                                <td className='py-2.5 px-3 text-right font-mono'>
                                  {formatHa(d.harvest_area_ha)}
                                </td>
                                <td className='py-2.5 px-3 text-right font-mono font-bold text-foreground'>
                                  {formatTon(d.production_ton)}
                                </td>
                                <td className='py-2.5 px-3 text-right font-mono'>
                                  {d.yield_ton_per_ha.toFixed(2)}
                                </td>
                                <td className='py-2.5 px-3 text-center'>
                                  <div className='flex items-center justify-center gap-1.5 font-mono'>
                                    <div className='w-14 bg-muted rounded-full h-1.5 overflow-hidden'>
                                      <div
                                        className='bg-emerald-600 h-full rounded-full'
                                        style={{ width: `${Math.min(100, d.pct_of_province)}%` }}
                                      />
                                    </div>
                                    <span className='text-[11px] font-semibold w-10 text-right'>
                                      {d.pct_of_province.toFixed(1)}%
                                    </span>
                                  </div>
                                </td>
                                <td className='py-2.5 px-3 text-right font-mono'>
                                  ~{d.kpl_kiosks_count}
                                </td>
                                <td className='py-2.5 px-3 text-[11px] text-muted-foreground truncate max-w-[200px]'>
                                  {d.commercial_action}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Selected Province Drilldown Card (Column 3) */}
          <div className='space-y-4 min-w-0'>
            <Card className='border shadow-xs sticky top-20'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <Badge variant='outline' className='text-[10px] font-mono'>
                    Kode: {selectedProvince.province_code}
                  </Badge>
                  <Badge className='bg-emerald-600 text-white text-[10px]'>
                    {selectedProvince.data_status}
                  </Badge>
                </div>
                <CardTitle className='text-lg font-bold mt-2'>
                  {selectedProvince.province_name}
                </CardTitle>
                <CardDescription>
                  Profil agronomis & sentra untuk {selectedCrop.name}
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-4 text-xs'>
                {/* 4 Core Provincial Stats */}
                <div className='grid grid-cols-2 gap-2'>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Luas Panen</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {formatHa(selectedProvince.harvest_area_ha)}
                    </div>
                  </div>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Volume Produksi</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {formatTon(selectedProvince.production_ton)}
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Produktivitas</div>
                    <div className='font-mono font-bold text-sm text-foreground mt-0.5'>
                      {(selectedProvince.yield_ton_per_ha ?? 0).toFixed(2)} Ton/Ha
                    </div>
                  </div>
                  <div className='rounded-md border p-2.5 bg-muted/20'>
                    <div className='text-muted-foreground text-[11px]'>Pangsa Nasional</div>
                    <div className='font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400 mt-0.5'>
                      {formatPct(selectedProvince.pct_national_production)}
                    </div>
                  </div>
                </div>

                {/* Pareto Concentration Card */}
                {provinceSummary && (
                  <div className='rounded-lg border p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 space-y-1.5'>
                    <div className='text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5'>
                      <TrendingUp className='h-4 w-4 text-emerald-600 shrink-0' />
                      Konsentrasi Pareto Sentra
                    </div>
                    <p className='text-xs text-muted-foreground leading-relaxed'>
                      Top 3 Kabupaten ({provinceSummary.top_districts.map((d: DistrictDetailRecord) => d.kabupaten.replace('Kab. ', '')).join(', ')})
                      menguasai <strong className='text-foreground font-mono'>{provinceSummary.top3_pareto_pct}%</strong> dari
                      total produksi {selectedProvince.province_name}.
                    </p>
                  </div>
                )}

                {/* Distribution Infrastructure */}
                <div className='rounded-lg border p-3 bg-muted/30 space-y-2'>
                  <div className='text-xs font-semibold text-foreground flex items-center gap-1.5'>
                    <Store className='h-4 w-4 text-indigo-500' />
                    Infrastruktur Distribusi & Kios
                  </div>
                  <div className='flex justify-between items-center text-xs text-muted-foreground'>
                    <span>Kios KPL Terdaftar:</span>
                    <span className='font-mono font-bold text-foreground'>
                      {(selectedProvince.kpl_kiosks_count || 420).toLocaleString('id-ID')} Kios
                    </span>
                  </div>
                  <div className='flex justify-between items-center text-xs text-muted-foreground'>
                    <span>Balai Penyuluhan (BPP):</span>
                    <span className='font-mono font-medium text-foreground'>
                      {Math.round((selectedProvince.kpl_kiosks_count || 300) / 7)} Balai
                    </span>
                  </div>
                  {provinceSummary && (
                    <div className='pt-1.5 border-t text-[11px] text-muted-foreground leading-relaxed'>
                      <strong className='text-foreground'>Rekomendasi Lapang:</strong>{' '}
                      {provinceSummary.agronomist_allocation_recommendation}
                    </div>
                  )}
                </div>

                {/* Top Producing Districts in this specific province */}
                <div className='space-y-2 pt-2 border-t'>
                  <div className='flex items-center justify-between text-xs font-semibold text-foreground'>
                    <span className='flex items-center gap-1.5'>
                      <Building2 className='h-4 w-4 text-emerald-600' />
                      Kabupaten Sentra Utama ({selectedProvince.province_name})
                    </span>
                    <span className='text-[10px] font-mono text-muted-foreground'>
                      Pangsa Prov
                    </span>
                  </div>
                  <div className='space-y-1.5'>
                    {(provinceDistricts.slice(0, 4) || []).map((d) => (
                      <div
                        key={d.kabupaten}
                        className='flex items-center justify-between p-2 rounded border bg-card text-[11px]'
                      >
                        <div className='flex items-center gap-1.5 min-w-0'>
                          <span className='font-medium truncate'>{d.kabupaten}</span>
                          {d.status === 'SENTRA_UTAMA_1' && (
                            <span className='h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0' />
                          )}
                        </div>
                        <span className='font-mono text-muted-foreground shrink-0'>
                          {formatTon(d.production_ton)} ({d.pct_of_province.toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggle Action Button */}
                <div className='pt-2'>
                  {viewMode === 'provinces' ? (
                    <button
                      onClick={() => setViewMode('districts')}
                      className='w-full py-2 px-3 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs'
                    >
                      <Building2 className='h-4 w-4' />
                      <span>Buka Rincian Kabupaten {selectedProvince.province_name} →</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setViewMode('provinces')}
                      className='w-full py-2 px-3 rounded-lg text-xs font-medium border bg-card text-foreground hover:bg-accent transition-all flex items-center justify-center gap-1.5 cursor-pointer'
                    >
                      <ArrowLeft className='h-4 w-4' />
                      <span>Kembali ke Peta 38 Provinsi</span>
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Main>
    </>
  )
}
